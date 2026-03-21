import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const fmt = (v: number) =>
  v.toLocaleString("de-DE", { maximumFractionDigits: 0 });

const BASE = "https://altersvorsorge-rechner.com";

function footerHtml(email: string) {
  const unsub = `${BASE}/unsubscribe?email=${encodeURIComponent(email)}`;
  return `
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px;">
    <table style="width:100%;text-align:center;">
      <tr>
        <td>
          <p style="font-size:12px;color:#6B7280;margin:0 0 8px;">
            <a href="${BASE}" style="color:#6B7280;text-decoration:none;font-weight:500;">altersvorsorge-rechner.com</a>
            &nbsp;·&nbsp;
            <a href="${BASE}/impressum" style="color:#6B7280;text-decoration:none;">Impressum</a>
            &nbsp;·&nbsp;
            <a href="${BASE}/datenschutz" style="color:#6B7280;text-decoration:none;">Datenschutz</a>
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

function wrapHtml(body: string, email: string) {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1a1a2e;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    ${body}
    ${footerHtml(email)}
  </div>
</body>
</html>`;
}

function mail1Html(email: string) {
  return wrapHtml(`
    <h1 style="font-size:22px;font-weight:bold;color:#1B4FD8;margin:0 0 24px;">
      Der häufigste Fehler bei der Altersvorsorge
    </h1>
    <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px;">
      Was passiert, wenn man 10 Jahre später mit dem Sparen anfängt? Die Zahlen sind erstaunlich:
    </p>

    <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
      <tr>
        <td style="padding:12px 16px;background:#1B4FD8;color:#fff;font-weight:bold;border-radius:8px 0 0 0;">Szenario</td>
        <td style="padding:12px 16px;background:#1B4FD8;color:#fff;font-weight:bold;text-align:center;">Anna (25&nbsp;J.)</td>
        <td style="padding:12px 16px;background:#1B4FD8;color:#fff;font-weight:bold;text-align:center;border-radius:0 8px 0 0;">Ben (35&nbsp;J.)</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:14px;color:#666;">Monatlicher Beitrag</td>
        <td style="padding:12px 16px;font-size:14px;text-align:center;">150&nbsp;€</td>
        <td style="padding:12px 16px;font-size:14px;text-align:center;">150&nbsp;€</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;background:#f4f6fa;font-size:14px;color:#666;">Ansparzeit</td>
        <td style="padding:12px 16px;background:#f4f6fa;font-size:14px;text-align:center;">42 Jahre</td>
        <td style="padding:12px 16px;background:#f4f6fa;font-size:14px;text-align:center;">32 Jahre</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:14px;color:#666;font-weight:bold;">Kapital mit 67</td>
        <td style="padding:12px 16px;font-size:16px;font-weight:bold;text-align:center;color:#1B4FD8;">~538.000&nbsp;€</td>
        <td style="padding:12px 16px;font-size:16px;font-weight:bold;text-align:center;">~255.000&nbsp;€</td>
      </tr>
    </table>

    <div style="background:#eef2ff;border-radius:12px;padding:20px;margin:0 0 24px;">
      <p style="font-size:15px;line-height:1.6;margin:0;color:#333;">
        <strong>Der Unterschied: 283.000&nbsp;€</strong> — nur weil Anna 10 Jahre früher angefangen hat.
        Der Zinseszins-Effekt belohnt vor allem eines: <strong>früh anfangen</strong>.
      </p>
    </div>

    <a href="${BASE}/rechner" style="display:inline-block;background:#1B4FD8;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:600;">
      Jetzt berechnen →
    </a>
  `, email);
}

function mail2Html(email: string) {
  return wrapHtml(`
    <h1 style="font-size:22px;font-weight:bold;color:#1B4FD8;margin:0 0 24px;">
      Altersvorsorgedepot 2027 — was du jetzt tun solltest
    </h1>
    <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 24px;">
      Das Altersvorsorgedepot ist für 2027 geplant und könnte die private Altersvorsorge grundlegend verändern.
      Hier sind 4 konkrete Schritte, die du jetzt schon angehen kannst:
    </p>

    <div style="margin:0 0 24px;">
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 12px;">
        <strong>1. Rentenlücke berechnen</strong><br>
        Finde heraus, wie viel dir im Alter fehlt. Unser
        <a href="${BASE}/rentenluecken-rechner" style="color:#1B4FD8;text-decoration:underline;">Rentenlückenrechner</a>
        zeigt es dir in 2 Minuten.
      </p>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 12px;">
        <strong>2. Sparrate festlegen</strong><br>
        Auch kleine Beträge ab 50&nbsp;€/Monat machen einen großen Unterschied — vor allem wenn du früh anfängst.
      </p>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 12px;">
        <strong>3. Depot eröffnen</strong><br>
        Eröffne schon jetzt ein kostenloses Wertpapierdepot bei einem günstigen Broker und starte mit einem ETF-Sparplan.
      </p>
      <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 12px;">
        <strong>4. Informiert bleiben</strong><br>
        Das Gesetzgebungsverfahren läuft noch. In unserem
        <a href="${BASE}/blog/altersvorsorgedepot-2027" style="color:#1B4FD8;text-decoration:underline;">Ratgeber zum Altersvorsorgedepot 2027</a>
        findest du alle aktuellen Infos.
      </p>
    </div>

    <div style="background:#eef2ff;border-radius:12px;padding:20px;margin:0 0 24px;">
      <p style="font-size:14px;line-height:1.6;margin:0;color:#333;">
        <strong>Gut zu wissen:</strong> Das Altersvorsorgedepot soll bis zu 540&nbsp;€ Grundzulage
        plus 300&nbsp;€ je Kind pro Jahr bieten. Angaben basieren auf dem aktuellen Gesetzentwurf — Änderungen möglich.
      </p>
    </div>

    <a href="${BASE}/rechner" style="display:inline-block;background:#1B4FD8;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:600;">
      Jetzt berechnen →
    </a>
  `, email);
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

    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check suppression list
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: suppressed } = await supabase
      .from("suppressed_emails")
      .select("id")
      .eq("email", email)
      .limit(1);

    if (suppressed && suppressed.length > 0) {
      return new Response(JSON.stringify({ success: true, skipped: "suppressed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const now = new Date();
    const day3 = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const day7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Schedule Mail 1 (Day 3)
    const res1 = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Altersvorsorge-Rechner <info@mail.altersvorsorge-rechner.com>",
        reply_to: "info@altersvorsorge-rechner.com",
        to: [email],
        subject: "Der häufigste Fehler bei der Altersvorsorge",
        html: mail1Html(email),
        scheduled_at: day3.toISOString(),
      }),
    });

    if (!res1.ok) {
      console.error("Resend schedule mail 1 error:", res1.status, await res1.text());
    }

    // Schedule Mail 2 (Day 7)
    const res2 = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Altersvorsorge-Rechner <info@mail.altersvorsorge-rechner.com>",
        reply_to: "info@altersvorsorge-rechner.com",
        to: [email],
        subject: "Altersvorsorgedepot 2027 — was du jetzt tun solltest",
        html: mail2Html(email),
        scheduled_at: day7.toISOString(),
      }),
    });

    if (!res2.ok) {
      console.error("Resend schedule mail 2 error:", res2.status, await res2.text());
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("schedule-followup-emails error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
