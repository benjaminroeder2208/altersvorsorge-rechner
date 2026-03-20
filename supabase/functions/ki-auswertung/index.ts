import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
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
        "x-api-key": apiKey,
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
