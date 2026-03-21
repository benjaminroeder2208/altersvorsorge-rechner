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

    // Find lead by token
    const { data: lead, error: findError } = await supabase
      .from("simulation_leads")
      .select("*")
      .eq("confirmation_token", token)
      .maybeSingle();

    if (findError || !lead) {
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

    // Check 48h expiry
    const createdAt = new Date(lead.created_at).getTime();
    const now = Date.now();
    if (now - createdAt > 48 * 60 * 60 * 1000) {
      return new Response(JSON.stringify({ error: "token_expired" }), {
        status: 410,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Confirm
    const { error: updateError } = await supabase
      .from("simulation_leads")
      .update({ confirmed: true })
      .eq("id", lead.id);

    if (updateError) throw updateError;

    // Trigger send-lead-email
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      // Call send-lead-email
      await supabase.functions.invoke("send-lead-email", {
        body: {
          email: lead.email,
          total_capital: Math.round(lead.calculated_capital),
          monthly_payout: Math.round(lead.monthly_payout),
          subsidies: 0, // not stored in leads table
          monthly_contribution: lead.monthly_contribution,
        },
      }).catch((e: unknown) => console.error("send-lead-email error:", e));

      // Schedule follow-ups
      await supabase.functions.invoke("schedule-followup-emails", {
        body: { email: lead.email },
      }).catch((e: unknown) => console.error("schedule-followup error:", e));
    }

    return new Response(JSON.stringify({ status: "confirmed", email: lead.email }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("confirm-email error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
