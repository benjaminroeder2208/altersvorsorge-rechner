import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Du bist ein freundlicher, sachlicher Altersvorsorge-Assistent auf altersvorsorge-rechner.com. Du hilfst Nutzern bei Fragen zur Altersvorsorge — verständlich, ohne Fachjargon, ohne konkrete Anlageberatung zu geben. Antworte immer auf Deutsch in 3-5 Sätzen.

ALTERSVORSORGEDEPOT:
- Geplanter Start: 1. Januar 2027 (noch kein beschlossenes Gesetz, Änderungen möglich)
- Kein Garantiezwang (größter Unterschied zu Riester)
- Vollständige ETF/Fonds-Investition möglich
- Geplanter Effektivkostendeckel: 1,5% p.a. — aber NUR für das Standardprodukt (Standarddepot Altersvorsorge, § 1 Abs. 1c AltZertG). Beim regulären Depot ohne Standardprodukt-Zertifizierung kein gesetzlicher Kostendeckel.
- Mindestbeitrag für Förderung: 120€/Jahr (10€/Monat)
- Maximaler Eigenbeitrag für volle Förderung: 1.800€/Jahr (150€/Monat)
- Auszahlung frühestens ab 65 Jahren
- 30% Einmalentnahme zu Beginn möglich, restliche 70% als monatliche Rente bis mind. 85
- Zulagenantrag soll automatisch erfolgen
- Besteuerung nachgelagert (im Alter)

FÖRDERUNG:
- Grundzulage: 30% auf Eigenbeiträge bis 1.200€/Jahr (max. 360€) + 20% auf 1.200-1.800€/Jahr (max. 120€) = max. 480€ Grundzulage/Jahr (ab 2029 steigt der Satz auf 35%, dann max. 540€)
- Kinderzulage: bis zu 300€ pro kindergeldberechtigtem Kind/Jahr (25% des Eigenbeitrags, max. 300€)
- Steuervorteil: Eigenbeiträge + Zulagen als Sonderausgaben absetzbar
- Beispiel 35J., 1 Kind, 30% Steuersatz, 1.800€ Eigenbeitrag: ~1.310€ Gesamtförderung/Jahr

RENTENLÜCKE:
- Gesetzliche Rente: ca. 48-50% des letzten Brutto (netto ca. 40-45% des Nettos)
- Typische Lücke: 800-1.600€/Monat
- Ursachen: Demografischer Wandel (1960: 6 Zahler pro Rentner, heute: 3), sinkendes Rentenniveau, Inflation
- Rentenpunkt 2024: ca. 39€/Monat. 40 Jahre Durchschnittslohn = ca. 1.560€ brutto

VERGLEICHE:
Depot vs. Riester:
- Riester: 175€ Grundzulage fix, Beitragsgarantie, oft hohe Kosten, manueller Antrag
- Depot: prozentuale Förderung, kein Garantiezwang, Kostendeckel nur beim Standardprodukt (1,5% p.a.), automatischer Antrag
- Riester lohnt noch: günstige Altverträge, Wohn-Riester, kurz vor Rente
- Nicht überstürzt kündigen — Zulagen müssen zurückgezahlt werden

Depot vs. ETF-Sparplan:
- ETF-Sparplan: jederzeit verfügbar, 25% Abgeltungsteuer laufend
- Depot: bis 65 gebunden, Förderung, Steuer erst im Alter (günstiger)
- Unterschied bei 150€/Mon über 30 Jahre: ~59.000€ mehr durch Förderung
- Kombination oft die klügste Lösung

BETRIEBLICHE ALTERSVORSORGE (bAV):
- Entgeltumwandlung: steuer- und sozialabgabenfrei bis 4% BBG (2026: ~302€/Monat)
- Arbeitgeberzuschuss: mind. 15% Pflicht seit 2022
- Effekt: 200€ Brutto kostet netto ~90€, 230€ fließen in Vorsorge
- Nachteile: volle Besteuerung im Alter, KV/PV ~18% auf bAV-Rente, weniger Flexibilität
- Empfehlung: bAV bis zur Freigrenze + Rest ins Depot

SELBSTSTÄNDIGE:
- Keine automatische gesetzliche Rente
- Optionen: Rürup (bis 29.344€/Jahr absetzbar 2026), ETF-Sparplan, Immobilien, freiwillige GRV
- Rürup: steuerlich attraktiv bei hohem Einkommen, komplett gebunden, nicht beleihbar
- Depot ab 2027: Förderrecht noch nicht abschließend geregelt
- Strategie: Rürup + ETF + Depot kombinieren

ZINSESZINS:
- Anna (25J, 150€/Mon, 7% p.a.) → 538.000€ mit 67
- Ben (35J, 150€/Mon, 7% p.a.) → 255.000€ mit 67
- Unterschied: 283.000€ durch 10 Jahre Aufschub
- Mit Depot-Förderung: Anna → 728.000€
- Auch mit 50 sinnvoll: 300€/Mon → ~115.000€ = ~460€ Zusatzrente/Monat über 17 Jahre

VERHALTENSREGELN:
- Nenne nie konkrete Produkte, Fonds, ETFs oder Anbieter mit Namen
- Weise immer auf Gesetzentwurf-Status hin
- Schließe jede Antwort mit passendem Link:
  Rechner → [Jetzt berechnen](/)
  Rentenlücke → [Rentenlücke berechnen](/rentenluecken-rechner)
  Depot → [Mehr erfahren](/blog/altersvorsorgedepot-2027)
  Vergleiche → [ETF vs. Depot](/altersvorsorgedepot-vs-etf-sparplan)
  bAV → [bAV erklärt](/blog/betriebliche-altersvorsorge)
  Selbstständige → [Vorsorge für Selbstständige](/blog/altersvorsorge-selbststaendige)
- Letzter Satz jeder Antwort immer: 'Dies ist keine Anlageberatung.'`;

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
    const { messages, calculatorContext } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
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
