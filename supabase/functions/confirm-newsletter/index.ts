import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DEFAULT_APP_URL = "https://altersvorsorge-rechner.lovable.app";
const TOKEN_TTL_HOURS = 48;

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

    const { token } = await req.json().catch(() => ({}));
    if (!token || typeof token !== "string") {
      return new Response(JSON.stringify({ error: "invalid_token" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: sub } = await supabase
      .from("newsletter_subscriptions")
      .select("id, email, status, created_at, confirmation_token, pdf_base64, subscribed_to_newsletter")
      .eq("confirmation_token", token)
      .maybeSingle();

    if (!sub) {
      return new Response(JSON.stringify({ status: "not_found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (sub.status === "confirmed") {
      return new Response(JSON.stringify({ status: "already_confirmed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ageMs = Date.now() - new Date(sub.created_at).getTime();
    if (ageMs > TOKEN_TTL_HOURS * 3600 * 1000) {
      return new Response(JSON.stringify({ error: "token_expired" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { error: updErr } = await supabase
      .from("newsletter_subscriptions")
      .update({
        status: "confirmed",
        confirmed_at: new Date().toISOString(),
        confirmation_token: null,
      })
      .eq("id", sub.id);
    if (updErr) throw updErr;

    // Send PDF email
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey && sub.pdf_base64) {
      const appBaseUrl = getAppBaseUrl(req);
      const { data: unsub } = await supabase
        .from("email_unsubscribe_tokens")
        .select("token")
        .eq("email", sub.email)
        .maybeSingle();
      const unsubUrl = unsub
        ? `${appBaseUrl}/unsubscribe?token=${encodeURIComponent(unsub.token)}`
        : `${appBaseUrl}/unsubscribe`;

      const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1a1a2e;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <h1 style="font-size:22px;font-weight:bold;color:#1B4FD8;margin:0 0 20px;">
      Hier ist deine Altersvorsorge-Checkliste
    </h1>
    <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px;">
      Vielen Dank für die Bestätigung! Im Anhang findest du die kostenlose
      Checkliste mit 3 konkreten Szenarien für deine Altersvorsorge.
    </p>
    ${sub.subscribed_to_newsletter ? `
    <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px;">
      Außerdem schicken wir dir wöchentlich kompakte Tipps und News rund um
      Altersvorsorge, ETFs und das neue Altersvorsorgedepot.
    </p>` : ""}
    <p style="font-size:14px;line-height:1.6;color:#555;margin:24px 0 0;">
      Du kannst jederzeit deinen persönlichen Bedarf mit dem Rechner durchspielen:
      <br><a href="${appBaseUrl}" style="color:#1B4FD8;">altersvorsorge-rechner.com</a>
    </p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px;">
    <p style="font-size:12px;color:#6B7280;margin:0 0 8px;text-align:center;">
      <a href="${appBaseUrl}" style="color:#6B7280;text-decoration:none;font-weight:500;">altersvorsorge-rechner.com</a>
      &nbsp;·&nbsp;<a href="${appBaseUrl}/impressum" style="color:#6B7280;text-decoration:none;">Impressum</a>
      &nbsp;·&nbsp;<a href="${appBaseUrl}/datenschutz" style="color:#6B7280;text-decoration:none;">Datenschutz</a>
    </p>
    <p style="font-size:11px;color:#9CA3AF;margin:0 0 8px;text-align:center;">
      <a href="${unsubUrl}" style="color:#9CA3AF;text-decoration:underline;">Vom Newsletter abmelden</a>
    </p>
  </div>
</body></html>`;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: "Altersvorsorge-Rechner <info@mail.altersvorsorge-rechner.com>",
          reply_to: "info@altersvorsorge-rechner.com",
          to: [sub.email],
          subject: "Deine Altersvorsorge-Checkliste (PDF)",
          html,
          attachments: [
            {
              filename: "altersvorsorge-checkliste.pdf",
              content: sub.pdf_base64,
            },
          ],
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Resend (delivery) error:", res.status, errText);
        await supabase.from("email_send_log").insert({
          template_name: "newsletter-checklist-delivery",
          recipient_email: sub.email,
          status: "failed",
          error_message: `Resend ${res.status}: ${errText.slice(0, 500)}`,
          message_id: `newsletter-deliver-${sub.id}`,
        });
      } else {
        const resData = await res.json();
        await supabase.from("email_send_log").insert({
          template_name: "newsletter-checklist-delivery",
          recipient_email: sub.email,
          status: "sent",
          message_id: `newsletter-deliver-${sub.id}`,
          metadata: { resend_id: resData?.id ?? null },
        });
      }
    }

    return new Response(JSON.stringify({ status: "confirmed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("confirm-newsletter error:", err);
    return new Response(JSON.stringify({ error: "internal_error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
