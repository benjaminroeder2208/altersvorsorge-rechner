import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function footerHtml(email: string) {
  const unsub = `https://altersvorsorge-rechner.com/unsubscribe?email=${encodeURIComponent(email)}`;
  return `
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px;">
    <table style="width:100%;text-align:center;">
      <tr>
        <td>
          <p style="font-size:12px;color:#6B7280;margin:0 0 8px;">
            <a href="https://altersvorsorge-rechner.com" style="color:#6B7280;text-decoration:none;font-weight:500;">altersvorsorge-rechner.com</a>
            &nbsp;·&nbsp;
            <a href="https://altersvorsorge-rechner.com/impressum" style="color:#6B7280;text-decoration:none;">Impressum</a>
            &nbsp;·&nbsp;
            <a href="https://altersvorsorge-rechner.com/datenschutz" style="color:#6B7280;text-decoration:none;">Datenschutz</a>
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

    const confirmUrl = `https://altersvorsorge-rechner.com/confirm?token=${encodeURIComponent(token)}`;

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
    ${footerHtml(email)}
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
      return new Response(JSON.stringify({ error: "Email send failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
