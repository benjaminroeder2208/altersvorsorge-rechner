import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DEFAULT_APP_URL = "https://altersvorsorge-rechner.lovable.app";

function getAllowedPublicKeys() {
  return new Set(
    [Deno.env.get("SUPABASE_ANON_KEY"), Deno.env.get("SUPABASE_PUBLISHABLE_KEY")].filter(
      (v): v is string => Boolean(v),
    ),
  );
}

function getAppBaseUrl(req: Request) {
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      const parsed = new URL(origin);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") return parsed.origin;
    } catch {
      // ignore
    }
  }
  return DEFAULT_APP_URL;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const allowedPublicKeys = getAllowedPublicKeys();
    const apikey = req.headers.get("apikey");
    const auth = req.headers.get("Authorization");
    const validApiKey = Boolean(apikey && allowedPublicKeys.has(apikey));
    const validBearer = auth?.startsWith("Bearer ") && auth.length > 10;
    if (!validApiKey && !validBearer) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const email = (body?.email ?? "").toString().trim().toLowerCase();
    const subscribedToNewsletter = body?.subscribed_to_newsletter !== false;
    const pdfBase64 = typeof body?.pdf_base64 === "string" ? body.pdf_base64 : null;
    const source = typeof body?.source === "string" ? body.source.slice(0, 80) : "newsletter_landing";
    const dsgvo = body?.dsgvo_accepted === true;

    if (!email || email.length > 320 || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: "invalid_email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!dsgvo) {
      return new Response(JSON.stringify({ error: "dsgvo_required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (pdfBase64 && pdfBase64.length > 2_000_000) {
      return new Response(JSON.stringify({ error: "pdf_too_large" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Existing subscription? (check first so we can detect re-subscribe intent)
    const { data: existing } = await supabase
      .from("newsletter_subscriptions")
      .select("id, status, confirmation_token")
      .ilike("email", email)
      .maybeSingle();

    const isResubscribe = existing?.status === "unsubscribed";

    // Check suppression list — but allow if this is an explicit re-subscribe
    const { data: suppressed } = await supabase
      .from("suppressed_emails")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (suppressed && !isResubscribe) {
      return new Response(JSON.stringify({ status: "suppressed" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // If re-subscribe, lift the suppression so future sends go through
    if (isResubscribe && suppressed) {
      const { error: delErr } = await supabase
        .from("suppressed_emails")
        .delete()
        .eq("email", email);
      if (delErr) {
        console.error("Failed to remove suppression for re-subscribe:", delErr);
        // Non-fatal: subscription update below still proceeds; sender will retry next cycle
      } else {
        await supabase.from("security_audit_log").insert({
          event_type: "newsletter_resubscribe",
          email,
          details: { source, removed_suppression: true },
        });
      }
    }

    let token: string;
    if (existing) {
      if (existing.status === "confirmed") {
        return new Response(JSON.stringify({ status: "already_confirmed" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // refresh token + pdf (covers pending AND unsubscribed → reactivate to pending)
      token = crypto.randomUUID();
      const { error: updErr } = await supabase
        .from("newsletter_subscriptions")
        .update({
          confirmation_token: token,
          subscribed_to_newsletter: subscribedToNewsletter,
          pdf_base64: pdfBase64,
          source,
          status: "pending",
          confirmed_at: null,
        })
        .eq("id", existing.id);
      if (updErr) throw updErr;
    } else {
      // Insert pending (no token via RLS), then patch token via service role
      const { data: inserted, error: insErr } = await supabase
        .from("newsletter_subscriptions")
        .insert({
          email,
          subscribed_to_newsletter: subscribedToNewsletter,
          source,
          status: "pending",
        })
        .select("id")
        .single();
      if (insErr) throw insErr;

      token = crypto.randomUUID();
      const { error: tokErr } = await supabase
        .from("newsletter_subscriptions")
        .update({ confirmation_token: token, pdf_base64: pdfBase64 })
        .eq("id", inserted.id);
      if (tokErr) throw tokErr;
    }

    // Generate or reuse unsubscribe token
    const { data: existingUnsub } = await supabase
      .from("email_unsubscribe_tokens")
      .select("token")
      .eq("email", email)
      .maybeSingle();
    let unsubToken: string;
    if (existingUnsub) {
      unsubToken = existingUnsub.token;
    } else {
      unsubToken = crypto.randomUUID();
      await supabase.from("email_unsubscribe_tokens").insert({ email, token: unsubToken });
    }

    // Send confirmation email
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const appBaseUrl = getAppBaseUrl(req);
    const confirmUrl = `${appBaseUrl}/confirm?token=${encodeURIComponent(token)}&type=newsletter`;
    const unsubUrl = `${appBaseUrl}/unsubscribe?token=${encodeURIComponent(unsubToken)}`;

    const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1a1a2e;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <h1 style="font-size:22px;font-weight:bold;color:#1B4FD8;margin:0 0 24px;">
      Bitte bestätige deine E-Mail-Adresse
    </h1>
    <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px;">
      Danke für dein Interesse an der Altersvorsorge-Checkliste!
    </p>
    <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px;">
      Bitte bestätige kurz deine E-Mail-Adresse. Direkt danach erhältst du die
      kostenlose Checkliste mit 3 Szenarien als PDF${subscribedToNewsletter ? " und ab nächster Woche unsere Newsletter-Tipps zur Altersvorsorge" : ""}.
    </p>
    <a href="${confirmUrl}" style="display:inline-block;background:#1B4FD8;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:600;margin:0 0 24px;">
      Jetzt bestätigen →
    </a>
    <p style="font-size:13px;line-height:1.6;color:#666;margin:16px 0 0;">
      Der Link ist 48 Stunden gültig.
    </p>
    <p style="font-size:13px;line-height:1.6;color:#999;margin:8px 0 0;">
      Falls du dich nicht angemeldet hast, kannst du diese Mail ignorieren.
    </p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px;">
    <p style="font-size:12px;color:#6B7280;margin:0 0 8px;text-align:center;">
      <a href="${appBaseUrl}" style="color:#6B7280;text-decoration:none;font-weight:500;">altersvorsorge-rechner.com</a>
      &nbsp;·&nbsp;<a href="${appBaseUrl}/impressum" style="color:#6B7280;text-decoration:none;">Impressum</a>
      &nbsp;·&nbsp;<a href="${appBaseUrl}/datenschutz" style="color:#6B7280;text-decoration:none;">Datenschutz</a>
    </p>
    <p style="font-size:11px;color:#9CA3AF;margin:0 0 8px;text-align:center;">
      <a href="${unsubUrl}" style="color:#9CA3AF;text-decoration:underline;">Von diesem Newsletter abmelden</a>
    </p>
  </div>
</body></html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: "Altersvorsorge-Rechner <info@mail.altersvorsorge-rechner.com>",
        reply_to: "info@altersvorsorge-rechner.com",
        to: [email],
        subject: "Bestätige deine E-Mail für die Altersvorsorge-Checkliste",
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", res.status, errText);
      await supabase.from("email_send_log").insert({
        template_name: "newsletter-confirmation",
        recipient_email: email,
        status: "failed",
        error_message: `Resend ${res.status}: ${errText.slice(0, 500)}`,
        message_id: `newsletter-confirm-${token}`,
      });
      return new Response(JSON.stringify({ error: "email_send_failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resData = await res.json();
    await supabase.from("email_send_log").insert({
      template_name: "newsletter-confirmation",
      recipient_email: email,
      status: "sent",
      message_id: `newsletter-confirm-${token}`,
      metadata: { resend_id: resData?.id ?? null, source },
    });

    return new Response(JSON.stringify({ status: isResubscribe ? "resubscribe_pending" : "pending" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("newsletter-signup error:", err);
    return new Response(JSON.stringify({ error: "internal_error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
