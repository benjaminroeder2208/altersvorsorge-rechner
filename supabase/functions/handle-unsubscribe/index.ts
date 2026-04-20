import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  try {
    const { token } = await req.json();
    if (!token || typeof token !== "string") {
      return new Response(JSON.stringify({ error: "Token required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Validate token
    const { data: row } = await supabase
      .from("email_unsubscribe_tokens")
      .select("email, used_at")
      .eq("token", token)
      .maybeSingle();

    if (!row) {
      await supabase.from("security_audit_log").insert({
        event_type: "unsubscribe_failed",
        ip_address: clientIp,
        details: { reason: "invalid_token" },
      });
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (row.used_at) {
      return new Response(JSON.stringify({ status: "already_unsubscribed", email: row.email }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mark token as used
    await supabase
      .from("email_unsubscribe_tokens")
      .update({ used_at: new Date().toISOString() })
      .eq("token", token);

    // Add to suppression list (ignore duplicate)
    const { error } = await supabase.from("suppressed_emails").insert({
      email: row.email,
      reason: "unsubscribe",
    });

    if (error && !error.message.includes("duplicate")) {
      console.error("Suppression insert error:", error);
      return new Response(JSON.stringify({ error: "Failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mark any newsletter subscriptions for this email as unsubscribed
    const { error: nlErr } = await supabase
      .from("newsletter_subscriptions")
      .update({ status: "unsubscribed", subscribed_to_newsletter: false })
      .ilike("email", row.email)
      .neq("status", "unsubscribed");

    if (nlErr) {
      console.error("Newsletter unsubscribe update error:", nlErr);
      // Non-fatal: suppression list already prevents future sends
    }

    // Cancel scheduled follow-up emails via Resend API
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      const { data: scheduled } = await supabase
        .from("scheduled_followup_emails")
        .select("id, resend_message_id")
        .eq("email", row.email)
        .eq("cancelled", false);

      if (scheduled && scheduled.length > 0) {
        for (const msg of scheduled) {
          try {
            const cancelRes = await fetch(
              `https://api.resend.com/emails/${msg.resend_message_id}/cancel`,
              {
                method: "POST",
                headers: { Authorization: `Bearer ${resendKey}` },
              }
            );
            if (cancelRes.ok) {
              await supabase
                .from("scheduled_followup_emails")
                .update({ cancelled: true })
                .eq("id", msg.id);
              console.log(`Cancelled scheduled email ${msg.resend_message_id}`);
            } else {
              console.error(`Failed to cancel ${msg.resend_message_id}:`, cancelRes.status);
            }
          } catch (e) {
            console.error(`Error cancelling ${msg.resend_message_id}:`, e);
          }
        }
      }
    }

    // Audit log: successful unsubscribe
    await supabase.from("security_audit_log").insert({
      event_type: "email_unsubscribed",
      email: row.email,
      ip_address: clientIp,
      details: { reason: "user_request" },
    });

    return new Response(JSON.stringify({ success: true, email: row.email }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("handle-unsubscribe error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
