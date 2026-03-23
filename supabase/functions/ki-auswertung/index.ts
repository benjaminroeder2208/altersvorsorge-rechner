import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiter per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // max requests
const RATE_WINDOW_MS = 60_000; // per minute

function getAllowedPublicKeys() {
  return new Set(
    [Deno.env.get("SUPABASE_ANON_KEY"), Deno.env.get("SUPABASE_PUBLISHABLE_KEY")].filter(
      (value): value is string => Boolean(value),
    ),
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Auth: verify public key matches
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

    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicKey) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const {
      birth_year,
      monthly_contribution,
      monthly_payout,
      total_capital,
      subsidies,
      tax_benefits,
      retirement_age,
      return_assumption,
      children,
      income_bracket,
    } = body;

    // Input validation
    if (typeof birth_year !== "number" || birth_year < 1930 || birth_year > 2010) {
      return new Response(JSON.stringify({ error: "Invalid birth_year" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (typeof monthly_contribution !== "number" || monthly_contribution < 0 || monthly_contribution > 10000) {
      return new Response(JSON.stringify({ error: "Invalid monthly_contribution" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (typeof retirement_age !== "number" || retirement_age < 60 || retirement_age > 75) {
      return new Response(JSON.stringify({ error: "Invalid retirement_age" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (typeof return_assumption !== "number" || return_assumption < 0 || return_assumption > 15) {
      return new Response(JSON.stringify({ error: "Invalid return_assumption" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (typeof children !== "number" || children < 0 || children > 20) {
      return new Response(JSON.stringify({ error: "Invalid children" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const validBrackets = [
      "bis 17.000 €",
      "17.000 – 37.000 €",
      "37.000 – 57.000 €",
      "über 57.000 €",
    ];
    if (typeof income_bracket !== "string" || income_bracket.length > 50) {
      return new Response(JSON.stringify({ error: "Invalid income_bracket" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const currentYear = new Date().getFullYear();
    const currentAge = currentYear - birth_year;

    const userPrompt = `Nutzer-Situation:
- Geburtsjahr: ${birth_year}
- Aktuelles Alter: ${currentAge} Jahre (berechnet)
- Renteneintritt mit: ${retirement_age} Jahren
- Monatlicher Sparbeitrag: ${monthly_contribution} €
- Erwartete monatliche Auszahlung: ${monthly_payout} €
- Berechnetes Gesamtkapital: ${total_capital} €
- Staatliche Förderung: ${subsidies} €
- Steuerersparnis: ${tax_benefits} €
- Renditeerwartung: ${return_assumption} % p.a.
- Kinder: ${children}
- Einkommensklasse: ${income_bracket}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        system:
          "Du bist ein freundlicher, sachlicher Altersvorsorge-Assistent auf altersvorsorge-rechner.com. Du gibst keine Anlageberatung, sondern allgemeine Orientierung. Antworte auf Deutsch in 3–4 Sätzen, verständlich ohne Fachjargon. Erwähne konkret die Rentenlücke, die empfohlene Sparrate und das Altersvorsorgedepot 2027 wenn es zur Situation passt. Das Altersvorsorgedepot ist für 2027 geplant (noch kein beschlossenes Gesetz). Weise darauf hin wenn du es erwähnst.",
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Anthropic API error:", response.status, errBody);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const analyse =
      data.content?.[0]?.text ?? "Analyse konnte nicht erstellt werden.";

    return new Response(JSON.stringify({ analyse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
