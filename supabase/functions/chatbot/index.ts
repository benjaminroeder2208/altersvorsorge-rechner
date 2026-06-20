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

const SYSTEM_PROMPT = `Du bist ein freundlicher, sachlicher Altersvorsorge-Assistent auf altersvorsorge-rechner.com. Du hilfst Nutzern bei Fragen zur Altersvorsorge — verständlich, ohne Fachjargon, ohne konkrete Anlageberatung zu geben. Antworte immer auf Deutsch in 3-5 Sätzen.

ALTERSVORSORGEDEPOT:
- Start: 1. Januar 2027 — Gesetz wurde am 27. März 2026 vom Bundestag beschlossen (Altersvorsorgereformgesetz)
- Kein Garantiezwang (größter Unterschied zu Riester)
- Vollständige ETF/Fonds-Investition möglich
- Effektivkostendeckel 1,5% p.a. — NUR für das Standardprodukt
- Mindestbeitrag für Förderung: 120€/Jahr
- Maximaler Eigenbeitrag: 1.800€/Jahr
- Auszahlung frühestens ab 65 Jahren
- 30% Einmalentnahme zu Beginn möglich, restliche 70% als monatliche Rente bis mind. 85
- Zulagenantrag erfolgt automatisch
- Besteuerung nachgelagert (im Alter)
- Maximal 2 geförderte Verträge

FÖRDERUNG (beschlossene Fassung):
- Grundzulage: 50% auf Eigenbeiträge bis 360€/Jahr (max. 180€) + 25% auf 360–1.800€/Jahr (max. 360€) = max. 540€/Jahr — ab 2027
- Berufseinsteiger-Bonus: einmalig +200€ für unter 25-Jährige, automatisch, kein Antrag nötig
- Kinderzulage: 100% der Eigenbeiträge, max. 300€ pro Kind/Jahr. Volle 300€ bereits ab 300€/Jahr (25€/Monat) — kein hoher Beitrag nötig
- Steuervorteil: Eigenbeiträge + Zulagen als Sonderausgaben absetzbar
- Beispiel 150€/Monat, 1 Kind, 2027: Grundzulage 540€ + Kinderzulage 300€ = 840€ Zulagen/Jahr
- Selbstständige: voll förderberechtigt (Einkünfte § 15 oder § 18 EStG, Steuererklärung abgegeben)
- Mittelbar berechtigte Ehegatten: Grundzulage max. 175€/Jahr

RENTENLÜCKE:
- Gesetzliche Rente: ca. 48-50% des letzten Brutto
- Typische Lücke: 800-1.600€/Monat
- Ursachen: Demografischer Wandel, sinkendes Rentenniveau, Inflation
- Rentenpunkt 2024: ca. 39€/Monat

VERGLEICHE:
Depot vs. Riester:
- Riester: 175€ Grundzulage fix, Beitragsgarantie, oft hohe Kosten
- Depot: prozentuale Förderung, kein Garantiezwang, automatischer Antrag
- Riester lohnt noch: günstige Altverträge, Wohn-Riester, kurz vor Rente
- Nicht überstürzt kündigen

Depot vs. ETF-Sparplan:
- ETF-Sparplan: jederzeit verfügbar, 25% Abgeltungsteuer laufend
- Depot: bis 65 gebunden, Förderung, Steuer erst im Alter
- Kombination oft die klügste Lösung

BETRIEBLICHE ALTERSVORSORGE (bAV):
- Entgeltumwandlung steuer- und sozialabgabenfrei bis 4% BBG (2026: ~302€/Monat)
- Arbeitgeberzuschuss: mind. 15% Pflicht
- Empfehlung: bAV + Depot kombinieren

SELBSTSTÄNDIGE:
- Jetzt förderberechtigt für das Altersvorsorgedepot (§ 10a Abs. 1 Satz 5 EStG neue Fassung)
- Zusätzliche Optionen: Rürup, ETF, freiwillige GRV
- Strategie: Rürup + ETF + Depot

ZINSESZINS:
- Anna (25J, 150€/Mon, 7% p.a.) → 538.000€ mit 67 (ohne Förderung)
- Ben (35J, 150€/Mon, 7% p.a.) → 255.000€ mit 67
- Unterschied: 283.000€ durch 10 Jahre Aufschub
- Mit Depot-Förderung: Anna → ~620.000€
- Auch mit 50 sinnvoll: 300€/Mon → ~115.000€ = ~460€ Zusatzrente/Monat

VERHALTENSREGELN:
- Nenne nie konkrete Produkte, Fonds, ETFs oder Anbieter mit Namen
- Das Gesetz ist beschlossen — weise nicht mehr auf Entwurfsstatus hin
- Schließe jede Antwort mit passendem Link:
  Rechner → [Jetzt berechnen](/)
  Rentenlücke → [Rentenlücke berechnen](/rentenluecken-rechner)
  Depot → [Mehr erfahren](/blog/altersvorsorgedepot-2027)
  Vergleiche → [ETF vs. Depot](/altersvorsorgedepot-vs-etf-sparplan)
  bAV → [bAV erklärt](/blog/betriebliche-altersvorsorge)
  Selbstständige → [Vorsorge für Selbstständige](/blog/altersvorsorge-selbststaendige)
  Beschlossen → [Was jetzt gilt](/blog/altersvorsorgedepot-beschlossen)
- Letzter Satz jeder Antwort immer: 'Dies ist keine Anlageberatung.'`;

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

    // Auth: verify anon key matches
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const apikey = req.headers.get("apikey");
    const auth = req.headers.get("Authorization");

    const validApiKey = apikey && anonKey && apikey === anonKey;
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
    const { messages, calculatorContext } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Input validation: cap message count and length
    if (messages.length > 20) {
      return new Response(JSON.stringify({ error: "Too many messages (max 20)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    for (const m of messages) {
      if (typeof m.content !== "string" || m.content.length > 2000) {
        return new Response(JSON.stringify({ error: "Message too long (max 2000 chars)" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    let systemPrompt = SYSTEM_PROMPT;

    if (calculatorContext) {
      const ctx = calculatorContext;
      const contextBlock = `Der Nutzer hat folgende Berechnung durchgeführt:
Monatlicher Beitrag: ${ctx.monthly_contribution}€,
Kapital mit ${ctx.retirement_age}: ${ctx.total_capital}€,
Monatliche Auszahlung: ${ctx.monthly_payout}€,
Staatliche Förderung gesamt: ${ctx.subsidies}€,
Kinder: ${ctx.children}.
Beziehe dich auf diese Zahlen wenn es passt.

`;
      systemPrompt = contextBlock + systemPrompt;
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 400,
        system: systemPrompt,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Anthropic API error:", response.status, errBody);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text ?? "Entschuldigung, ich konnte keine Antwort generieren.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Chatbot error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
