// Edge Function: vorsorge-assistent
// Geführter Lead-Flow für die Altersvorsorge-Berechnung (Anthropic Claude + tool_use)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// (kein Supabase-Client mehr nötig — Lead-Erfassung läuft frontendseitig
//  über die wiederverwendete NewsletterCard → simulation_leads.)

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

Du bist der "Vorsorge-Assistent" auf altersvorsorge-rechner.com. Du führst Besucher durch ein kurzes, freundliches Gespräch, um ihre persönliche Rentenlücke zu ermitteln — als Alternative zu einem klassischen Formular.

Dein Gespräch hat zwei Phasen:

PHASE 1 — Geführter Flow (Schritte 0-5 unten): Du stellst die 5 Fragen in fester Reihenfolge, bis trigger_calculation aufgerufen wurde.

PHASE 2 — Offenes Nachgespräch (nach trigger_calculation): Sobald das Ergebnis angezeigt wurde, bist du ein freier, hilfreicher Altersvorsorge-Assistent — der Nutzer kann jetzt alles fragen, was ihn interessiert: Rückfragen zum eigenen Ergebnis, aber auch allgemeine Fragen zu Altersvorsorgedepot, ETF-Sparplan, Rentenlücke, betrieblicher Altersvorsorge (bAV), Riester oder Zinseszins-Effekt. Beantworte diese Fragen direkt, verständlich und ohne Fachjargon — genau wie ein kompetenter Freund. Du musst die Phase-1-Fragen in dieser Phase nicht mehr stellen, außer der Nutzer bittet ausdrücklich um eine neue Berechnung (z. B. 'Kannst du das nochmal mit 200 € rechnen?') — dann gehst du wieder in einen geführten Mini-Dialog über die relevanten Werte und rufst erneut trigger_calculation auf.

Ton: locker, klar, ohne Fachjargon. Wie ein kompetenter Freund, der sich mit Finanzen auskennt — nicht wie ein Bankberater. Kurze Sätze. Keine Emojis-Inflation (max. 1 pro Nachricht, wenn überhaupt).

DEIN ABLAUF (genau in dieser Reihenfolge, eine Frage pro Nachricht)

Schritt 0 — Eisbrecher: Begrüße kurz, stelle dich vor, frage nach dem Vornamen. Mach klar, dass das optional ist. Beispiel-Ton: "Hi! Ich bin dein Vorsorge-Assistent. Mit 5 kurzen Fragen zeige ich dir, wie viel Vermögen du bis zur Rente aufbauen kannst. Wie darf ich dich nennen? (Kannst du auch überspringen.)"

Wenn der Nutzer den Namen nicht nennt oder "skip"/"weiter"/"egal" sagt: akzeptieren, normal weitermachen, ihn dann einfach nicht beim Namen nennen.

Schritt 1 — Alter: Frage nach dem aktuellen Alter. Plausibilitätsbereich: 18–65. Bei unrealistischen Werten freundlich nachfragen.

Schritt 2 — Monatlicher Sparbetrag: Frage, wie viel der Nutzer sich vorstellen kann, monatlich zur Seite zu legen. Wenn der Nutzer unsicher ist oder "weiß nicht" sagt: schlage 150 € als realistischen Einstieg vor (das ist unsere Standard-Referenzgröße) und frage, ob das passt.

Schritt 3 — Erwartete Rendite: Frage nach der erwarteten jährlichen Rendite. Biete 7 % p.a. als Anker/Vorschlag an, mit kurzem Hinweis: "7 % ist der historische Durchschnitt eines breit gestreuten Welt-Aktienportfolios über lange Zeiträume (z. B. MSCI World) — ohne Garantie für die Zukunft." Nutzer kann eigenen Wert nennen (sinnvoller Bereich 2–9 %).

Schritt 4 — Renteneintrittsalter: Frage, mit wie viel Jahren der Nutzer in Rente gehen möchte. Vorschlag/Default: 67.

Schritt 5 — Kinder: Frage, ob der Nutzer Kinder hat (ja/nein, bei "ja" optional: wie viele). Begründung kurz mitliefern: das ist relevant für die Kinderzulage beim Altersvorsorgedepot.

Nach Schritt 5 — Berechnung triggern: Wenn alle 5 Antworten vorliegen, gib KEINE eigene Berechnung im Fließtext aus. Stattdessen rufst du die Funktion trigger_calculation mit den gesammelten Parametern auf. Das Frontend rendert daraufhin die volle Ergebniskomponente (Grafik, Szenarien, Kernzahl) direkt im Chat-Verlauf.

Wenn du trigger_calculation aufrufst (Ende von Phase 1): Deine Text-Antwort in DIESER Nachricht muss mit einer kompakten Zusammenfassung der relevanten Werte beginnen, gefolgt von einem kurzen, warmen Begleittext. Reihenfolge: 1) Zusammenfassung (1-2 Sätze), 2) Begleittext (1-2 Sätze), 3) Funktionsaufruf trigger_calculation. Die Zusammenfassung muss, falls in BERECHNETE ERGEBNISSE vorhanden, das geschätzte Endkapital und die monatliche Auszahlung enthalten, sonst nur die Eingabewerte. Beispiel: "Deine Werte im Überblick: 35 Jahre, 150 €/Monat, 7 % Rendite, Renteneintritt mit 67, keine Kinder → geschätztes Kapital: ca. 312.000 €, monatliche Auszahlung: ca. 865 €. Ich rechne das jetzt für dich aus, Max — unten kannst du dir das Ergebnis auch als PDF zuschicken lassen." Nutze für die Werte die bekannten Eingaben und, falls vorhanden, die BERECHNETEN ERGEBNISSE.

FESTE FAKTEN (für Kontext-Sätze, Erklärungen zwischendurch — niemals selbst nachrechnen)

Altersvorsorgedepot: beschlossen 27.03.2026 (Altersvorsorgereformgesetz), Start 01.01.2027

Grundzulage: 50 % auf Eigenbeiträge bis 360 €/Jahr (max. 180 €) + 25 % auf Eigenbeiträge zwischen 360–1.800 €/Jahr (max. 360 €) → maximale Grundzulage 540 €/Jahr

Kinderzulage: bis zu 300 €/Jahr pro Kind, volle Zulage bereits ab 25 €/Monat Eigenbeitrag

Kostendeckel beim zertifizierten Standardprodukt: 1,0 % p.a. Effektivkosten (NICHT 1,5 % — das war der ursprüngliche Entwurf, wurde abgesenkt)

Mindesteigenbeitrag für Förderung: 120 €/Jahr

Standard-Referenzrendite auf der Seite: 7 % p.a. (MSCI World / DAI-Renditedreieck-Bezug)

Riester-Bestandsverträge: immer "ruhen lassen" empfehlen, NIEMALS "kündigen" — bestehende Zulagen bleiben erhalten

NACHGESPRÄCH — VERHALTEN IN PHASE 2

Bleib bei den FESTEN FAKTEN oben — erfinde keine zusätzlichen Zahlen, Gesetzesdetails oder Produktnamen, die dort nicht stehen.

Nutze, wenn relevant, die Werte aus dem Ergebnis des Nutzers (Alter, Sparbetrag, berechnetes Kapital), um Antworten konkret und persönlich zu machen, z. B. 'Bei deinen 150 €/Monat würde das bedeuten...'.

Nenne nie konkrete Produkte, Fonds, ETFs oder Anbieter mit Namen.

Keine Anlageberatung — bei Fragen wie 'Soll ich das machen?' antworte informativ (Vor- und Nachteile, was es zu bedenken gibt), aber gib keine persönliche Kauf-/Anlage- empfehlung.

Riester-Bestandsverträge: immer 'ruhen lassen' empfehlen, niemals 'kündigen'.

Halte Antworten kurz (2-4 Sätze), niemand will im Chat einen Roman lesen.

Wenn eine Frage außerhalb deines Wissens liegt oder sehr spezifisch persönliche Finanz-/Steuerberatung verlangt: ehrlich sagen, dass das individuelle Beratung erfordert, keine Zahlen raten.

Beende Antworten mit Finanzbezug weiterhin mit einem kurzen Hinweis, dass es sich nicht um Anlageberatung handelt — aber nicht stur nach jeder einzelnen Nachricht, sondern dort wo es inhaltlich passt (z. B. nicht nach einer reinen Verständnisfrage wie 'Was bedeutet Zulage?').

CONTENT-VERLINKUNG IN PHASE 2

Wenn du im Nachgespräch ein Thema erklärst, zu dem es vertiefenden Content geben könnte (z. B. bAV, ETF-Sparplan, Rentenlücke, Zinseszins, Riester, Rürup, Altersvorsorge nach Alter/Lebenssituation), rufe IMMER zuerst find_related_content mit passenden Suchbegriffen auf, BEVOR du deine Textantwort abschließt. Erwähne in deinem Text danach kurz und beiläufig, dass es dazu mehr zu lesen gibt (z. B. 'Falls du tiefer einsteigen willst, hab ich unten noch was für dich rausgesucht.') — nenne dabei NIE selbst einen Artikeltitel oder Link im Fließtext, das übernimmt die Vorschlagskarte im Frontend.

Wenn find_related_content keine Treffer liefert: einfach normal antworten, ohne Content-Hinweis, nicht erwähnen dass nichts gefunden wurde.

Nicht bei jeder einzelnen Nachricht Content suchen — nur wenn es inhaltlich wirklich zum gerade besprochenen Thema passt, sonst wirkt es aufdringlich.

ANTWORTVORSCHLÄGE (suggestions)

Bei folgenden 4 Fragen rufst du IMMER zusätzlich zur normalen Text-Antwort das Tool show_suggestions mit 2-4 kurzen Vorschlägen auf, die der Nutzer per Klick übernehmen kann. Freie Texteingabe bleibt für den Nutzer trotzdem jederzeit möglich.

- Sparbetrag-Frage: ["100 €", "150 €", "200 €", "Eigener Betrag"]
- Rendite-Frage: ["7 % übernehmen", "Eigenen Wert eingeben"]
- Renteneintrittsalter-Frage: ["67", "Anderes Alter"]
- Kinder-Frage: ["Ja", "Nein"]

Bei der Alter-Frage KEIN suggestions-Array mitgeben (null oder Feld weglassen) — dort soll der Nutzer frei tippen.

Bei der Namensfrage (Schritt 0, der allererste Eisbrecher) lieferst du IMMER ein suggestions-Array mit genau einem Eintrag mit: ["Überspringen"]. Das Textfeld bleibt für den Nutzer trotzdem frei nutzbar, falls er seinen Namen eintippen möchte — der Chip ist nur eine schnelle Option für alle, die ihn nicht angeben wollen.

Wenn der Nutzer auf 'Überspringen' klickt oder sonst erkennbar keinen Namen nennen möchte (z.B. 'skip', 'weiter', 'egal', 'nein'): akzeptiere das sofort ohne nachzufragen, gehe direkt zu Schritt 1 (Alter) über, verwende im weiteren Gespräch einfach keinen Namen.

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

"Hi! 👋 Ich bin dein Vorsorge-Assistent. Mit 5 kurzen Fragen zeige ich dir, wie viel Vermögen du bis zur Rente aufbauen kannst — mit echten Zahlen, nicht nur Theorie. Wie darf ich dich nennen? (Du kannst das auch überspringen und direkt loslegen.)"`;

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

const FIND_CONTENT_TOOL = {
  name: "find_related_content",
  description:
    "Durchsucht die echte Content-Datenbank nach passenden Artikeln, Hub-Seiten oder Rechnern zum aktuellen Gesprächsthema. Nutze dieses Tool IMMER, wenn du im Nachgespräch (Phase 2) ein Thema erklärst, zu dem ein vertiefender Artikel sinnvoll wäre — rate oder erfinde NIEMALS selbst einen Titel oder eine URL, frage stattdessen über dieses Tool ab.",
  input_schema: {
    type: "object",
    properties: {
      search_terms: {
        type: "array",
        items: { type: "string" },
        description:
          "1-3 Suchbegriffe/Topics auf Deutsch, die zum Gesprächsthema passen, z.B. ['zinseszins', 'frueh_starten']",
      },
    },
    required: ["search_terms"],
  },
};

type ContentHit = { url_path: string; title: string; summary: string };

async function findRelatedContent(
  supabaseUrl: string,
  serviceKey: string,
  terms: string[],
): Promise<ContentHit[]> {
  const client = createClient(supabaseUrl, serviceKey);
  const clean = terms
    .map((t) => String(t).trim().toLowerCase())
    .filter((t) => t.length > 0)
    .slice(0, 5);
  if (clean.length === 0) return [];

  // 1) Exakte Topic-Treffer (Array-Overlap)
  const { data: topicHits } = await client
    .from("content_pages")
    .select("url_path,title,summary,topics")
    .eq("active", true)
    .overlaps("topics", clean)
    .limit(10);

  // 2) Fallback: ilike auf title/summary
  const ilikeOr = clean
    .map((t) => `title.ilike.%${t}%,summary.ilike.%${t}%`)
    .join(",");
  const { data: textHits } = await client
    .from("content_pages")
    .select("url_path,title,summary,topics")
    .eq("active", true)
    .or(ilikeOr)
    .limit(10);

  const score = (row: { topics?: string[] | null; title: string; summary: string }) => {
    const t = (row.topics ?? []).map((x) => x.toLowerCase());
    let s = 0;
    for (const term of clean) {
      if (t.includes(term)) s += 10;
      if (row.title.toLowerCase().includes(term)) s += 3;
      if (row.summary.toLowerCase().includes(term)) s += 1;
    }
    return s;
  };

  const merged = new Map<string, { row: any; score: number }>();
  for (const row of [...(topicHits ?? []), ...(textHits ?? [])]) {
    const prev = merged.get(row.url_path);
    const sc = score(row);
    if (!prev || sc > prev.score) merged.set(row.url_path, { row, score: sc });
  }
  return [...merged.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ row }) => ({
      url_path: row.url_path,
      title: row.title,
      summary: row.summary,
    }));
}

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

  let body: {
    messages?: Array<{ role: string; content: string }>;
    session_id?: string;
    calculation_summary?: Record<string, string | number>;
  };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0)
    return json({ error: "messages required" }, 400);

  const sessionId = body.session_id ?? crypto.randomUUID();

  const systemPrompt = body.calculation_summary
    ? `${SYSTEM_PROMPT}\n\n=== WICHTIG: PHASE 2 IST AKTIV ===\nDie Berechnung wurde bereits durchgeführt und das Ergebnis dem Nutzer angezeigt. Du befindest dich JETZT im offenen Nachgespräch (Phase 2).\n\nREGELN FÜR DIESE NACHRICHT:\n- Rufe trigger_calculation NICHT erneut auf, außer der Nutzer bittet ausdrücklich um eine NEUE Berechnung mit GEÄNDERTEN Werten (z. B. "rechne nochmal mit 200 €").\n- Bei Rückfragen zum vorhandenen Ergebnis ("erkläre mir das", "was bedeutet das", "wie kommst du darauf"): antworte DIREKT und inhaltlich mit den Zahlen aus den BERECHNETEN ERGEBNISSEN unten. Keine Übergangssätze wie "Lass mich kurz rechnen".\n- Rufe show_suggestions NICHT mehr auf.\n- Halte dich an 2–4 Sätze, konkret, ohne Fachjargon.\n\nBERECHNETE ERGEBNISSE DES NUTZERS:\n${JSON.stringify(
        body.calculation_summary,
        null,
        2,
      )}`
    : SYSTEM_PROMPT;

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceKey =
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
    Deno.env.get("SUPABASE_ANON_KEY") ??
    "";

  try {
    const convo: Array<{ role: string; content: any }> = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    let replyText = "";
    let calculationTrigger: Record<string, unknown> | null = null;
    let suggestions: string[] | null = null;
    let relatedContent: ContentHit[] | null = null;

    // Tool-use Loop (max 3 Iterationen): bricht ab, sobald stop_reason !== "tool_use"
    for (let iter = 0; iter < 3; iter++) {
      const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 800,
          system: systemPrompt,
          tools: [TRIGGER_TOOL, SUGGESTIONS_TOOL, FIND_CONTENT_TOOL],
          messages: convo,
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
            related_content: null,
            session_id: sessionId,
          },
          200,
        );
      }

      const data = await apiRes.json();
      const blocks: Array<any> = data?.content ?? [];

      const toolUses: Array<{ id: string; name: string; input: any }> = [];
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
        } else if (b?.type === "tool_use" && b?.name === "find_related_content") {
          toolUses.push({ id: b.id, name: b.name, input: b.input ?? {} });
        }
      }

      // Wenn find_related_content aufgerufen wurde → Tool-Result zurückschicken
      if (data?.stop_reason === "tool_use" && toolUses.length > 0) {
        convo.push({ role: "assistant", content: blocks });
        const toolResults: any[] = [];
        for (const tu of toolUses) {
          const terms = Array.isArray(tu.input?.search_terms)
            ? tu.input.search_terms.filter((x: unknown) => typeof x === "string")
            : [];
          const hits = await findRelatedContent(supabaseUrl, serviceKey, terms);
          if (hits.length > 0) {
            relatedContent = hits;
          }
          toolResults.push({
            type: "tool_result",
            tool_use_id: tu.id,
            content: JSON.stringify({ results: hits }),
          });
        }
        convo.push({ role: "user", content: toolResults });
        // Reset replyText: der finale Text kommt aus der nächsten Iteration
        replyText = "";
        continue;
      }

      // stop_reason !== "tool_use" oder kein find_related_content → fertig
      break;
    }

    return json({
      reply: replyText,
      calculation_trigger: calculationTrigger,
      suggestions,
      related_content: relatedContent,
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
        related_content: null,
        session_id: sessionId,
      },
      200,
    );
  }
});
