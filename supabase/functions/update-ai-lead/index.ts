// Edge Function: update-ai-lead
// Server-side update for ai_assistant_leads (replaces public UPDATE RLS policy)

import { createClient } from "npm:@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://altersvorsorge-rechner.com",
  "https://www.altersvorsorge-rechner.com",
  "https://altersvorsorge-rechner.lovable.app",
];

function corsHeadersFor(origin: string | null): Record<string, string> {
  const isLovablePreview =
    !!origin &&
    /^https:\/\/[a-z0-9-]+\.(lovable\.app|lovableproject\.com|lovable\.dev)$/i.test(
      origin,
    );
  const isAllowed =
    !!origin && (ALLOWED_ORIGINS.includes(origin) || isLovablePreview);
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : ALLOWED_ORIGINS[0],
    "Vary": "Origin",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

type UpdateBody = {
  session_id?: unknown;
  ergebnis_kapital?: unknown;
  email?: unknown;
  newsletter_opt_in?: unknown;
};

Deno.serve(async (req) => {
  const cors = corsHeadersFor(req.headers.get("origin"));
  const json = (b: unknown, s = 200) =>
    new Response(JSON.stringify(b), {
      status: s,
      headers: { ...cors, "Content-Type": "application/json" },
    });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: UpdateBody;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  // Validate session_id
  const sessionId =
    typeof body.session_id === "string" ? body.session_id.trim() : "";
  if (
    !sessionId ||
    sessionId.length < 8 ||
    sessionId.length > 128 ||
    !/^[A-Za-z0-9_-]+$/.test(sessionId)
  ) {
    return json({ error: "Invalid session_id" }, 400);
  }

  // Whitelist of updatable fields with validation
  const patch: Record<string, unknown> = {};

  if (body.ergebnis_kapital !== undefined) {
    const n = Number(body.ergebnis_kapital);
    if (!Number.isFinite(n) || n < 0 || n > 1_000_000_000) {
      return json({ error: "Invalid ergebnis_kapital" }, 400);
    }
    patch.ergebnis_kapital = Math.round(n);
  }

  if (body.email !== undefined) {
    if (typeof body.email !== "string") {
      return json({ error: "Invalid email" }, 400);
    }
    const email = body.email.trim().toLowerCase();
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Invalid email" }, 400);
    }
    patch.email = email;
  }

  if (body.newsletter_opt_in !== undefined) {
    if (typeof body.newsletter_opt_in !== "boolean") {
      return json({ error: "Invalid newsletter_opt_in" }, 400);
    }
    patch.newsletter_opt_in = body.newsletter_opt_in;
  }

  if (Object.keys(patch).length === 0) {
    return json({ error: "No updatable fields supplied" }, 400);
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { error } = await supabase
      .from("ai_assistant_leads")
      .update(patch)
      .eq("session_id", sessionId);
    if (error) {
      console.error("Update failed:", error);
      return json({ error: "Update failed" }, 500);
    }
    return json({ ok: true });
  } catch (e) {
    console.error("Function error:", e);
    return json({ error: "Internal error" }, 500);
  }
});
