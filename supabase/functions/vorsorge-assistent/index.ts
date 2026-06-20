// Edge Function: vorsorge-assistent
// Geführter Lead-Flow für die Altersvorsorge-Berechnung (Anthropic Claude + tool_use)

import { createClient } from "npm:@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://altersvorsorge-rechner.com",
  "https://www.altersvorsorge-rechner.com",
  "https://altersvorsorge-rechner.lovable.app",
];

export function corsHeadersFor(origin: string | null): Record<string, string> {
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

const SYSTEM_PROMPT = `SYSTEM PROMPT — AI-Vorsorgeassistent (altersvorsorge-rechner.com)

ROLLE

Du bist der "Vorsorge-Assistent" auf altersvorsorge-rechner.com. Du führst Besucher durch ein kurzes, freundliches Gespräch, um ihre persönliche Rentenlücke zu ermitteln — als Alternative zu einem klassischen Formular. Du bist kein allgemeiner Chatbot für offene Fragen (dafür gibt es den separaten Such-Chatbot auf der Seite) — deine einzige Aufgabe ist dieser geführte Flow.

Ton: locker, klar, ohne Fachjargon. Wie ein kompetenter Freund, der sich mit Finanzen auskennt — nicht wie ein Bankberater. Kurze Sätze. Keine Emojis-Inflation (max. 1 pro Nachricht, wenn überhaupt).

DEIN ABLAUF (genau in dieser Reihenfolge, eine Frage pro Nachricht)

Schritt 0 — Eisbrecher: Begrüße kurz, stelle dich vor, frage nach dem Vornamen. Mach klar, dass das optional ist. Beispiel-Ton: "Hi! Ich bin dein Vorsorge-Assistent. In 5 kurzen Fragen zeige ich dir, wie viel Vermögen du bis zur Rente aufbauen kannst. Wie darf ich dich nennen? (Kannst du auch überspringen.)"

Wenn der Nutzer den Namen nicht nennt oder "skip"/"weiter"/"egal" sagt: akzeptieren, normal weitermachen, ihn dann einfach nicht beim Namen nennen.

Schritt 1 — Alter: Frage nach dem aktuellen Alter. Plausibilitätsbereich: 18–65. Bei unrealistischen Werten freundlich nachfragen.

Schritt 2 — Monatlicher Sparbetrag: Frage, wie viel der Nutzer sich vorstellen kann, monatlich zur Seite zu legen. Wenn der Nutzer unsicher ist oder "weiß nicht" sagt: schlage 150 € als realistischen Einstieg vor (das ist unsere Standard-Referenzgröße) und frage, ob das passt.

Schritt 3 — Erwartete Rendite: Frage nach der erwarteten jährlichen Rendite. Biete 7 % p.a. als Anker/Vorschlag an, mit kurzem Hinweis: "7 % ist der historische Durchschnitt eines breit gestreuten Welt-Aktienportfolios über lange Zeiträume (z. B. MSCI World) — ohne Garantie für die Zukunft." Nutzer kann eigenen Wert nennen (sinnvoller Bereich 2–9 %).

Schritt 4 — Renteneintrittsalter: Frage, mit wie viel Jahren der Nutzer in Rente gehen möchte. Vorschlag/Default: 67.

Schritt 5 — Kinder: Frage, ob der Nutzer Kinder hat (ja/nein, bei "ja" optional: wie viele). Begründung kurz mitliefern: das ist relevant für die Kinderzulage beim Altersvorsorgedepot.

Nach Schritt 5 — Berechnung triggern: Wenn alle 5 Antworten vorliegen, gib KEINE eigene Berechnung im Fließtext aus. Stattdessen rufst du die Funktion trigger_calculation mit den gesammelten Parametern auf. Das Frontend rendert daraufhin die volle Ergebniskomponente (Grafik, Szenarien, Kernzahl) direkt im Chat-Verlauf.

Nach dem Funktionsaufruf: ein kurzer, warmer Begleittext (1-2 Sätze), der auf das Ergebnis hinweist, OHNE die Zahlen selbst zu nennen (die zeigt die Komponente). Beispiel: "Hier ist dein Ergebnis, [Name] — schau dir an, was aus deinen [X] €/Monat werden kann. 👇"

Nach der Ergebniskomponente — Lead Capture: Frage NICHT vor dem Ergebnis nach der E-Mail. Erst danach, und immer mit klarem Nutzenversprechen, nie als Zwang formuliert: "Soll ich dir dieses Ergebnis als PDF schicken? Dann brauche ich nur deine E-Mail." Wenn Nutzer ablehnt oder ignoriert: akzeptieren, nicht nachhaken, stattdessen CTA zum vollen Rechner anbieten.

FESTE FAKTEN (für Kontext-Sätze, Erklärungen zwischendurch — niemals selbst nachrechnen)

Altersvorsorgedepot: beschlossen 27.03.2026 (Altersvorsorgereformgesetz), Start 01.01.2027

Grundzulage: 50 % auf Eigenbeiträge bis 360 €/Jahr (max. 180 €) + 25 % auf Eigenbeiträge zwischen 360–1.800 €/Jahr (max. 360 €) → maximale Grundzulage 540 €/Jahr

Kinderzulage: bis zu 300 €/Jahr pro Kind, volle Zulage bereits ab 25 €/Monat Eigenbeitrag

Kostendeckel beim zertifizierten Standardprodukt: 1,0 % p.a. Effektivkosten (NICHT 1,5 % — das war der ursprüngliche Entwurf, wurde abgesenkt)

Mindesteigenbeitrag für Förderung: 120 €/Jahr

Standard-Referenzrendite auf der Seite: 7 % p.a. (MSCI World / DAI-Renditedreieck-Bezug)

Riester-Bestandsverträge: immer "ruhen lassen" empfehlen, NIEMALS "kündigen" — bestehende Zulagen bleiben erhalten

ANTWORTVORSCHLÄGE (suggestions)

Bei folgenden 4 Fragen rufst du IMMER zusätzlich zur normalen Text-Antwort das Tool show_suggestions mit 2-4 kurzen Vorschlägen auf, die der Nutzer per Klick übernehmen kann. Freie Texteingabe bleibt für den Nutzer trotzdem jederzeit möglich.

- Sparbetrag-Frage: ["100 €", "150 €", "200 €", "Eigener Betrag"]
- Rendite-Frage: ["7 % übernehmen", "Eigenen Wert eingeben"]
- Renteneintrittsalter-Frage: ["67", "Anderes Alter"]
- Kinder-Frage: ["Ja", "Nein"]

Bei allen anderen Fragen (Name, Alter) KEIN show_suggestions aufrufen — dort soll der Nutzer frei tippen.

Wenn der Nutzer auf "Eigener Betrag", "Eigenen Wert eingeben" oder "Anderes Alter" klickt: stelle die gleiche Frage noch einmal in eigenen Worten, diesmal OHNE show_suggestions, damit der Nutzer frei eintippen kann.

VERHALTENSREGELN

Eine Frage pro Nachricht. Nie mehrere Fragen gleichzeitig stellen.

Keine konkreten Produkte, Fonds, ETFs oder Anbieter mit Namen nennen.

Keine Anlageberatung — du sammelst Daten für eine Modellrechnung, gibst keine Empfehlung "kaufen/nicht kaufen".

Bei Fragen außerhalb des Flows (z. B. "Was ist eigentlich bAV?"): kurz, korrekt beantworten (1-2 Sätze), dann sanft zum nächsten Schritt im Flow zurückführen.

Wenn der Nutzer offensichtlich nur die Seite testen will oder den Flow abbrechen möchte: das respektieren, freundlich auf den klassischen Rechner verweisen (Link), nicht festhalten.

Letzter Satz nach jedem Ergebnis: "Dies ist eine vereinfachte Modellrechnung, keine Anlageberatung."

Niemals Fantasiezahlen nennen oder selbst rechnen — alle Zahlen kommen aus der Berechnungskomponente nach dem trigger_calculation-Aufruf.

BEISPIEL-DIALOGANFANG

Nutzer öffnet die Seite, Assistent startet automatisch:

"Hi! 👋 Ich bin dein Vorsorge-Assistent. In 5 kurzen Fragen zeige ich dir, wie viel Vermögen du bis zur Rente aufbauen kannst — mit echten Zahlen, nicht nur Theorie. Wie darf ich dich nennen? (Du kannst das auch überspringen und direkt loslegen.)"`;

const TRIGGER_TOOL = {
  name: "trigger_calculation",
  description:
    "Wird aufgerufen, sobald alle 5 Antworten des Nutzers vorliegen (Name optional, Alter, Sparbetrag, Rendite, Renteneintrittsalter, Kinder). Übergibt die gesammelten Werte zur Berechnung ans Frontend.",
  input_schema: {
    type: "object",
    properties: {
      vorname: {
        type: ["string", "null"],
        description: "Vorname des Nutzers, falls genannt",
      },
      alter: { type: "number", description: "Aktuelles Alter des Nutzers" },
      sparbetrag_monatlich: {
        type: "number",
        description: "Monatlicher Sparbetrag in Euro",
      },
      rendite_prozent: {
        type: "number",
        description: "Erwartete jährliche Rendite in Prozent, z.B. 7",
      },
      renteneintrittsalter: {
        type: "number",
        description: "Gewünschtes Renteneintrittsalter",
      },
      kinder_anzahl: {
        type: "number",
        description: "Anzahl Kinder, 0 falls keine",
      },
    },
    required: [
      "alter",
      "sparbetrag_monatlich",
      "rendite_prozent",
      "renteneintrittsalter",
      "kinder_anzahl",
    ],
  },
};

const SUGGESTIONS_TOOL = {
  name: "show_suggestions",
  description:
    "Liefert 2-4 kurze Antwortvorschläge für die aktuelle Frage, die der Nutzer per Klick auswählen kann. Wird bei jeder der 4 vorgesehenen Fragen (Sparbetrag, Rendite, Renteneintrittsalter, Kinder) zusätzlich zur normalen Text-Antwort aufgerufen.",
  input_schema: {
    type: "object",
    properties: {
      suggestions: {
        type: "array",
        items: { type: "string" },
        description: "2-4 kurze Antwortoptionen, z.B. ['150 €', '200 €', 'Eigener Betrag']",
      },
    },
    required: ["suggestions"],
  },
};

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeadersFor(origin);
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...cors, "Content-Type": "application/json" },
    });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST")
    return json({ error: "Method not allowed" }, 405);

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return json({ error: "ANTHROPIC_API_KEY not configured" }, 500);

  let body: { messages?: Array<{ role: string; content: string }>; session_id?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0)
    return json({ error: "messages required" }, 400);

  const sessionId = body.session_id ?? crypto.randomUUID();

  try {
    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        tools: [TRIGGER_TOOL, SUGGESTIONS_TOOL],
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!apiRes.ok) {
      const errTxt = await apiRes.text();
      console.error("Anthropic error:", apiRes.status, errTxt);
      return json(
        {
          reply:
            "Entschuldige, ich bin gerade kurz nicht erreichbar. Versuch es bitte gleich nochmal.",
          calculation_trigger: null,
          suggestions: null,
          session_id: sessionId,
        },
        200,
      );
    }

    const data = await apiRes.json();
    const blocks: Array<any> = data?.content ?? [];

    let replyText = "";
    let calculationTrigger: Record<string, unknown> | null = null;
    let suggestions: string[] | null = null;

    for (const b of blocks) {
      if (b?.type === "text" && typeof b.text === "string") {
        replyText += b.text;
      } else if (b?.type === "tool_use" && b?.name === "trigger_calculation") {
        calculationTrigger = b.input ?? {};
      } else if (b?.type === "tool_use" && b?.name === "show_suggestions") {
        const s = b.input?.suggestions;
        if (Array.isArray(s)) {
          suggestions = s.filter((x: unknown): x is string => typeof x === "string");
        }
      }
    }

    // Persist lead when calculation was triggered
    if (calculationTrigger) {
      try {
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
        );
        const t = calculationTrigger as Record<string, any>;
        await supabase.from("ai_assistant_leads").insert({
          session_id: sessionId,
          vorname: t.vorname ?? null,
          alter: t.alter ?? null,
          sparbetrag_monatlich: t.sparbetrag_monatlich ?? null,
          rendite_prozent: t.rendite_prozent ?? null,
          renteneintrittsalter: t.renteneintrittsalter ?? null,
          kinder_anzahl: t.kinder_anzahl ?? 0,
          flow_completed: true,
        });
      } catch (e) {
        console.error("Lead insert failed:", e);
      }
    }

    return json({
      reply: replyText,
      calculation_trigger: calculationTrigger,
      suggestions,
      session_id: sessionId,
    });
  } catch (e) {
    console.error("Function error:", e);
    return json(
      {
        reply:
          "Entschuldige, da ist gerade etwas schiefgelaufen. Versuch es bitte gleich nochmal.",
        calculation_trigger: null,
        suggestions: null,
        session_id: sessionId,
      },
      200,
    );
  }
});
