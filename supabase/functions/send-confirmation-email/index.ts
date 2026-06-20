import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const rateLimitMap = new Map<string, number[]>();
function checkRateLimit(ip: string, maxReqs = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(t => now - t < windowMs);
  if (timestamps.length >= maxReqs) return false;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DEFAULT_APP_URL = "https://altersvorsorge-rechner.lovable.app";

function getAllowedPublicKeys() {
  return new Set(
    [Deno.env.get("SUPABASE_ANON_KEY"), Deno.env.get("SUPABASE_PUBLISHABLE_KEY")].filter(
      (value): value is string => Boolean(value),
    ),
  );
}

function getAppBaseUrl(req: Request) {
  const origin = req.headers.get("origin");

  if (origin) {
    try {
      const parsed = new URL(origin);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.origin;
      }
    } catch {
      // Ignore malformed origin and fall back to published app URL.
    }
  }

  return DEFAULT_APP_URL;
}

function footerHtml(baseUrl: string, unsubToken: string) {
  const unsub = `${baseUrl}/unsubscribe?token=${encodeURIComponent(unsubToken)}`;
  return `
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px;">
    <table style="width:100%;text-align:center;">
      <tr>
        <td>
          <p style="font-size:12px;color:#6B7280;margin:0 0 8px;">
            <a href="${baseUrl}" style="color:#6B7280;text-decoration:none;font-weight:500;">altersvorsorge-rechner.com</a>
            &nbsp;·&nbsp;
            <a href="${baseUrl}/impressum" style="color:#6B7280;text-decoration:none;">Impressum</a>
            &nbsp;·&nbsp;
            <a href="${baseUrl}/datenschutz" style="color:#6B7280;text-decoration:none;">Datenschutz</a>
          </p>
          <p style="font-size:11px;color:#9CA3AF;margin:0 0 8px;">
            <a href="${unsub}" style="color:#9CA3AF;text-decoration:underline;">Von diesem Newsletter abmelden</a>
          </p>
          <p style="font-size:10px;color:#D1D5DB;margin:0;">
            Alle Angaben basieren auf dem aktuellen Gesetzentwurf. Keine Anlageberatung.
          </p>
        </td>
      </tr>
    </table>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Public endpoint: authorization is enforced via the confirmation_token
    // lookup below (single-use token stored in simulation_leads).

    // Rate limit
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { email, token } = await req.json();
    if (!email || !token) {
      return new Response(JSON.stringify({ error: "Email and token required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify token exists in simulation_leads
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: lead } = await supabase
      .from("simulation_leads")
      .select("id")
      .eq("confirmation_token", token)
      .eq("confirmed", false)
      .maybeSingle();

    if (!lead) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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

    const appBaseUrl = getAppBaseUrl(req);
    const confirmUrl = `${appBaseUrl}/confirm?token=${encodeURIComponent(token)}`;

    const htmlBody = `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1a1a2e;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <h1 style="font-size:22px;font-weight:bold;color:#1B4FD8;margin:0 0 24px;">
      Bitte bestätige deine E-Mail-Adresse
    </h1>
    <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px;">
      Hallo,
    </p>
    <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px;">
      du hast gerade deine Altersvorsorge-Auswertung auf altersvorsorge-rechner.com berechnet.
      Bitte bestätige deine E-Mail-Adresse um deine persönliche Auswertung zu erhalten.
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
    ${footerHtml(appBaseUrl, unsubToken)}
  </div>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Altersvorsorge-Rechner <info@mail.altersvorsorge-rechner.com>",
        reply_to: "info@altersvorsorge-rechner.com",
        to: [email],
        subject: "Bitte bestätige deine E-Mail-Adresse",
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", res.status, errText);
      await supabase.from("email_send_log").insert({
        template_name: "confirmation-email",
        recipient_email: email,
        status: "failed",
        error_message: `Resend ${res.status}: ${errText.slice(0, 500)}`,
        message_id: `confirm-${token}`,
      });
      return new Response(JSON.stringify({ error: "Email send failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resData = await res.json();
    await supabase.from("email_send_log").insert({
      template_name: "confirmation-email",
      recipient_email: email,
      status: "sent",
      message_id: `confirm-${token}`,
      metadata: { resend_id: resData?.id ?? null },
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-confirmation-email error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
