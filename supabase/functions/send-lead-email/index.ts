import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const fmt = (v: number) =>
  v.toLocaleString("de-DE", { maximumFractionDigits: 0 });

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

    const { email, total_capital, monthly_payout, subsidies, monthly_contribution } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const htmlBody = `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1a1a2e;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <h1 style="font-size:22px;font-weight:bold;color:#1B4FD8;margin:0 0 24px;">
      Deine Altersvorsorge-Auswertung
    </h1>
    <p style="font-size:15px;line-height:1.6;margin:0 0 24px;color:#333;">
      Hier sind deine persönlichen Ergebnisse aus dem Altersvorsorge-Rechner:
    </p>

    <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
      <tr>
        <td style="padding:12px 16px;background:#f4f6fa;border-radius:8px 8px 0 0;font-size:14px;color:#666;">Berechnetes Gesamtkapital</td>
        <td style="padding:12px 16px;background:#f4f6fa;border-radius:8px 8px 0 0;font-size:16px;font-weight:bold;text-align:right;">${fmt(total_capital)} €</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:14px;color:#666;">Monatliche Auszahlung</td>
        <td style="padding:12px 16px;font-size:16px;font-weight:bold;text-align:right;">${fmt(monthly_payout)} € / Monat</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;background:#f4f6fa;font-size:14px;color:#666;">Staatliche Förderung</td>
        <td style="padding:12px 16px;background:#f4f6fa;font-size:16px;font-weight:bold;text-align:right;color:#1B4FD8;">${fmt(subsidies)} €</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;border-radius:0 0 8px 8px;font-size:14px;color:#666;">Dein monatlicher Beitrag</td>
        <td style="padding:12px 16px;border-radius:0 0 8px 8px;font-size:16px;font-weight:bold;text-align:right;">${fmt(monthly_contribution)} €</td>
      </tr>
    </table>

    <div style="background:#eef2ff;border-radius:12px;padding:20px;margin:0 0 24px;">
      <p style="font-size:14px;line-height:1.6;margin:0;color:#333;">
        <strong>Gut zu wissen:</strong> Das Altersvorsorgedepot soll ab 2027 starten und bietet bis zu 540 € Grundzulage
        plus 300 € je Kind pro Jahr. Die Angaben basieren auf dem aktuellen Gesetzentwurf — Änderungen sind möglich.
      </p>
    </div>

    <a href="https://altersvorsorge-rechner.com/rechner" style="display:inline-block;background:#1B4FD8;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:600;">
      Erneut berechnen →
    </a>

    ${footerHtml(email)}
  </div>
</body>
</html>`;

    // Send results email to user
    const userMailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Altersvorsorge-Rechner <info@mail.altersvorsorge-rechner.com>",
        reply_to: "info@altersvorsorge-rechner.com",
        to: [email],
        subject: "Deine Altersvorsorge-Auswertung",
        html: htmlBody,
      }),
    });

    if (!userMailRes.ok) {
      const errText = await userMailRes.text();
      console.error("Resend error (user):", userMailRes.status, errText);
    }

    // Send notification to site owner
    const notifRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Altersvorsorge-Rechner <info@mail.altersvorsorge-rechner.com>",
        to: ["info@altersvorsorge-rechner.com"],
        subject: "Neue Auswertung gespeichert",
        html: `<p>Neue Lead-Eintragung:</p>
<ul>
<li>E-Mail: ${email}</li>
<li>Gesamtkapital: ${fmt(total_capital)} €</li>
<li>Monatliche Auszahlung: ${fmt(monthly_payout)} €</li>
<li>Staatliche Förderung: ${fmt(subsidies)} €</li>
<li>Monatlicher Beitrag: ${fmt(monthly_contribution)} €</li>
</ul>`,
      }),
    });

    if (!notifRes.ok) {
      const errText = await notifRes.text();
      console.error("Resend error (notification):", notifRes.status, errText);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-lead-email error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
