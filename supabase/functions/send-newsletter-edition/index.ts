import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DEFAULT_APP_URL = "https://altersvorsorge-rechner.lovable.app";

function getAppBaseUrl(req: Request) {
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      const u = new URL(origin);
      if (u.protocol === "https:" || u.protocol === "http:") return u.origin;
    } catch {}
  }
  return DEFAULT_APP_URL;
}

function buildEmailHtml(opts: {
  subject: string;
  preheader: string | null;
  bodyHtml: string;
  unsubUrl: string;
  appBaseUrl: string;
}) {
  const { subject, preheader, bodyHtml, unsubUrl, appBaseUrl } = opts;
  return `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1a1a2e;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</div>` : ""}
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="font-size:15px;line-height:1.6;color:#1a1a2e;">
      ${bodyHtml}
    </div>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px;">
    <p style="font-size:12px;color:#6B7280;margin:0 0 8px;text-align:center;">
      <a href="${appBaseUrl}" style="color:#6B7280;text-decoration:none;font-weight:500;">altersvorsorge-rechner.com</a>
      &nbsp;·&nbsp;<a href="${appBaseUrl}/impressum" style="color:#6B7280;text-decoration:none;">Impressum</a>
      &nbsp;·&nbsp;<a href="${appBaseUrl}/datenschutz" style="color:#6B7280;text-decoration:none;">Datenschutz</a>
    </p>
    <p style="font-size:11px;color:#9CA3AF;margin:0 0 8px;text-align:center;">
      <a href="${unsubUrl}" style="color:#9CA3AF;text-decoration:underline;">Newsletter abbestellen</a>
    </p>
  </div>
</body></html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const editionId: string | undefined = body?.edition_id;
    const triggeredByCron: boolean = body?.cron === true;
    const testMode: boolean = body?.test === true;
    const testEmailOverride: string | undefined = body?.test_email;

    const adminClient = createClient(supabaseUrl, serviceKey);

    // Auth: cron path uses service role secret in the body to authenticate;
    // user path requires an admin JWT.
    let adminEmail: string | null = null;
    if (triggeredByCron) {
      const cronSecret = body?.cron_secret;
      if (!cronSecret || cronSecret !== serviceKey) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (testMode) {
        return new Response(JSON.stringify({ error: "test mode requires admin auth" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const userClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      const { data: userData, error: userErr } = await userClient.auth.getUser();
      if (userErr || !userData?.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { data: isAdmin } = await adminClient.rpc("has_role", {
        _user_id: userData.user.id,
        _role: "admin",
      });
      if (!isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      adminEmail = userData.user.email ?? null;
    }

    // Resolve target editions
    let editionIds: string[] = [];
    if (editionId) {
      editionIds = [editionId];
    } else if (triggeredByCron) {
      const { data: due } = await adminClient
        .from("newsletter_editions")
        .select("id")
        .eq("status", "scheduled")
        .lte("scheduled_at", new Date().toISOString())
        .order("scheduled_at", { ascending: true })
        .limit(3);
      editionIds = (due ?? []).map((d) => d.id);
    } else {
      return new Response(JSON.stringify({ error: "edition_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (editionIds.length === 0) {
      return new Response(JSON.stringify({ status: "no_editions_due" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const appBaseUrl = getAppBaseUrl(req);

    // Test mode: send a single preview email to the admin and exit early.
    if (testMode) {
      const recipient = (testEmailOverride || adminEmail || "").toLowerCase().trim();
      if (!recipient) {
        return new Response(
          JSON.stringify({ error: "no_admin_email", details: "Admin user has no email on file." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const targetId = editionIds[0];
      const { data: edition, error: fetchErr } = await adminClient
        .from("newsletter_editions")
        .select("subject, preheader, html_content")
        .eq("id", targetId)
        .maybeSingle();
      if (fetchErr || !edition) {
        return new Response(JSON.stringify({ error: "edition_not_found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Reuse-or-create unsub token so the preview link works just like prod.
      let unsubToken: string;
      const { data: existingTok } = await adminClient
        .from("email_unsubscribe_tokens")
        .select("token")
        .eq("email", recipient)
        .maybeSingle();
      if (existingTok) {
        unsubToken = existingTok.token;
      } else {
        unsubToken = crypto.randomUUID();
        await adminClient
          .from("email_unsubscribe_tokens")
          .insert({ email: recipient, token: unsubToken });
      }
      const unsubUrl = `${appBaseUrl}/unsubscribe?token=${encodeURIComponent(unsubToken)}`;

      const html = buildEmailHtml({
        subject: edition.subject,
        preheader: edition.preheader,
        bodyHtml: edition.html_content,
        unsubUrl,
        appBaseUrl,
      });

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Altersvorsorge-Rechner <info@mail.altersvorsorge-rechner.com>",
            reply_to: "info@altersvorsorge-rechner.com",
            to: [recipient],
            subject: `[TEST] ${edition.subject}`,
            html,
            headers: {
              "List-Unsubscribe": `<${unsubUrl}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          }),
        });
        if (!res.ok) {
          const errTxt = await res.text();
          return new Response(
            JSON.stringify({
              status: "test_failed",
              recipient,
              error: `Resend ${res.status}: ${errTxt.slice(0, 300)}`,
            }),
            { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }
        const data = await res.json();
        return new Response(
          JSON.stringify({
            status: "test_sent",
            recipient,
            resend_message_id: data?.id ?? null,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      } catch (e) {
        return new Response(
          JSON.stringify({
            status: "test_failed",
            recipient,
            error: String((e as Error).message ?? e).slice(0, 300),
          }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    const results: Array<Record<string, unknown>> = [];

    for (const id of editionIds) {
      const result = await sendEdition(id);
      results.push(result);
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

    async function sendEdition(id: string) {
      // Fetch + lock edition by transitioning state
      const { data: edition, error: fetchErr } = await adminClient
        .from("newsletter_editions")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (fetchErr || !edition) {
        return { id, error: "edition_not_found" };
      }
      if (!["draft", "scheduled"].includes(edition.status)) {
        return { id, status: "skipped", reason: `current_status=${edition.status}` };
      }

      // Atomic transition to "sending"
      const { data: locked, error: lockErr } = await adminClient
        .from("newsletter_editions")
        .update({ status: "sending" })
        .eq("id", id)
        .in("status", ["draft", "scheduled"])
        .select("id")
        .maybeSingle();
      if (lockErr || !locked) {
        return { id, status: "skipped", reason: "could_not_lock" };
      }

      // Build recipient list: confirmed subscribers, opted in, not suppressed, not unsubscribed
      const { data: subs, error: subsErr } = await adminClient
        .from("newsletter_subscriptions")
        .select("email")
        .eq("status", "confirmed")
        .eq("subscribed_to_newsletter", true)
        .limit(1000);

      if (subsErr) {
        await adminClient
          .from("newsletter_editions")
          .update({ status: "failed" })
          .eq("id", id);
        return { id, error: "fetch_subscribers_failed", details: subsErr.message };
      }

      const candidateEmails = Array.from(
        new Set((subs ?? []).map((s) => s.email.toLowerCase().trim())),
      );

      // Load suppression list once
      const { data: suppressed } = await adminClient
        .from("suppressed_emails")
        .select("email");
      const suppressedSet = new Set(
        (suppressed ?? []).map((s) => s.email.toLowerCase().trim()),
      );

      let success = 0;
      let failed = 0;
      let skipped = 0;
      const recipientRows: Array<Record<string, unknown>> = [];

      for (const email of candidateEmails) {
        if (suppressedSet.has(email)) {
          skipped++;
          recipientRows.push({
            edition_id: id,
            email,
            status: "skipped_suppressed",
          });
          continue;
        }

        // Lookup or create unsubscribe token
        let unsubToken: string;
        const { data: existingTok } = await adminClient
          .from("email_unsubscribe_tokens")
          .select("token")
          .eq("email", email)
          .maybeSingle();
        if (existingTok) {
          unsubToken = existingTok.token;
        } else {
          unsubToken = crypto.randomUUID();
          await adminClient
            .from("email_unsubscribe_tokens")
            .insert({ email, token: unsubToken });
        }
        const unsubUrl = `${appBaseUrl}/unsubscribe?token=${encodeURIComponent(unsubToken)}`;

        const html = buildEmailHtml({
          subject: edition.subject,
          preheader: edition.preheader,
          bodyHtml: edition.html_content,
          unsubUrl,
          appBaseUrl,
        });

        try {
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
              subject: edition.subject,
              html,
              headers: {
                "List-Unsubscribe": `<${unsubUrl}>`,
                "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
              },
            }),
          });

          if (!res.ok) {
            const errTxt = await res.text();
            console.error(`Resend ${res.status} for ${email}: ${errTxt}`);
            failed++;
            recipientRows.push({
              edition_id: id,
              email,
              status: "failed",
              error_message: `Resend ${res.status}: ${errTxt.slice(0, 300)}`,
            });
          } else {
            const data = await res.json();
            success++;
            recipientRows.push({
              edition_id: id,
              email,
              status: "sent",
              resend_message_id: data?.id ?? null,
              sent_at: new Date().toISOString(),
            });
          }
        } catch (e) {
          console.error(`Network error sending to ${email}`, e);
          failed++;
          recipientRows.push({
            edition_id: id,
            email,
            status: "failed",
            error_message: String((e as Error).message ?? e).slice(0, 300),
          });
        }

        // Small delay to smooth out bursts (~5 emails/sec → safe under default Resend limits)
        await sleep(200);
      }

      // Bulk insert recipient log (chunked at 200 to stay under URL limits)
      for (let i = 0; i < recipientRows.length; i += 200) {
        const chunk = recipientRows.slice(i, i + 200);
        const { error: insErr } = await adminClient
          .from("newsletter_edition_recipients")
          .insert(chunk);
        if (insErr) {
          console.error("Recipient log insert failed:", insErr);
        }
      }

      const finalStatus = failed > 0 && success === 0 ? "failed" : "sent";
      await adminClient
        .from("newsletter_editions")
        .update({
          status: finalStatus,
          sent_at: new Date().toISOString(),
          recipient_count: candidateEmails.length,
          success_count: success,
          failed_count: failed,
        })
        .eq("id", id);

      return {
        id,
        status: finalStatus,
        recipient_count: candidateEmails.length,
        success,
        failed,
        skipped,
      };
    }
  } catch (err) {
    console.error("send-newsletter-edition error:", err);
    return new Response(JSON.stringify({ error: "internal_error", details: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
