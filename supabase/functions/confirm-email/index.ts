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
    if (!token) {
      return new Response(JSON.stringify({ error: "Token required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: lead, error: findError } = await supabase
      .from("simulation_leads")
      .select("*")
      .eq("confirmation_token", token)
      .maybeSingle();

    if (findError || !lead) {
      await supabase.from("security_audit_log").insert({
        event_type: "email_confirmation_failed",
        ip_address: clientIp,
        details: { reason: "invalid_token" },
      });
      return new Response(JSON.stringify({ error: "invalid_token" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (lead.confirmed) {
      return new Response(JSON.stringify({ status: "already_confirmed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const createdAt = new Date(lead.created_at).getTime();
    const now = Date.now();
    if (now - createdAt > 48 * 60 * 60 * 1000) {
      await supabase.from("security_audit_log").insert({
        event_type: "email_confirmation_expired",
        email: lead.email,
        ip_address: clientIp,
        details: { lead_id: lead.id },
      });
      return new Response(JSON.stringify({ error: "token_expired" }), {
        status: 410,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { error: updateError } = await supabase
      .from("simulation_leads")
      .update({ confirmed: true })
      .eq("id", lead.id);

    if (updateError) throw updateError;

    // Audit log: successful confirmation
    await supabase.from("security_audit_log").insert({
      event_type: "email_confirmed",
      email: lead.email,
      ip_address: clientIp,
      details: { lead_id: lead.id },
    });

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      // Get or create unsubscribe token for this email
      const { data: existingUnsub } = await supabase
        .from("email_unsubscribe_tokens")
        .select("token")
        .eq("email", lead.email)
        .maybeSingle();

      let unsubToken: string;
      if (existingUnsub) {
        unsubToken = existingUnsub.token;
      } else {
        unsubToken = crypto.randomUUID();
        await supabase.from("email_unsubscribe_tokens").insert({ email: lead.email, token: unsubToken });
      }

      await supabase.functions.invoke("send-lead-email", {
        body: {
          email: lead.email,
          total_capital: Math.round(lead.calculated_capital),
          monthly_payout: Math.round(lead.monthly_payout),
          subsidies: Math.round(lead.total_subsidies ?? 0),
          monthly_contribution: lead.monthly_contribution,
          pdf_base64: lead.pdf_base64 ?? null,
          embed_source: lead.embed_source ?? null,
          unsub_token: unsubToken,
        },
      }).catch((e: unknown) =>
        console.error("send-lead-email error:", e));

      await supabase.functions.invoke("schedule-followup-emails", {
        body: {
          email: lead.email,
          embed_source: lead.embed_source ?? null,
          unsub_token: unsubToken,
        },
      }).catch((e: unknown) =>
        console.error("schedule-followup error:", e));
    }

    return new Response(
      JSON.stringify({ status: "confirmed", email: lead.email }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("confirm-email error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
