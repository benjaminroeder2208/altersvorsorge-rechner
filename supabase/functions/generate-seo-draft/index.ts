import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Payload {
  keyword: string;
  intent?: string;
  outline: string[];
  targetUrl?: string;
  coveredPages?: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { keyword, intent, outline, targetUrl, coveredPages } = (await req.json()) as Payload;

    if (!keyword || !Array.isArray(outline) || outline.length === 0) {
      return new Response(JSON.stringify({ error: "keyword und outline sind erforderlich" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY ist nicht konfiguriert");

    const systemPrompt = [
      "Du bist ein erfahrener deutscher SEO-Redakteur für das Themenfeld Altersvorsorge, Riester und das neue Altersvorsorgedepot (Reform vom 27.03.2026, Drs. 21/4996).",
      "Schreibe einen ERSTEN ARTIKEL-ENTWURF in sauberem Markdown.",
      "Regeln:",
      "- Beginne mit einer H1 (#), die das Keyword natürlich enthält.",
      "- Direkt unter der H1 ein 2–3 Sätze langer Lead-Absatz mit Mehrwert (kein Marketing-Geschwurbel).",
      "- Für jede Outline-Position eine H2 (##). Bei Bedarf 1–2 H3 (###) als Unterpunkte.",
      "- Pro H2/H3-Abschnitt 2–4 kurze, präzise Absätze. Wo sinnvoll, kurze Aufzählungen mit '-'.",
      "- Faktentreue: Förderung 2027 = 50 % bis 360 € Eigenbeitrag, 25 % bis 1.800 €, 100 % je Kind. Kostendeckel 1,0 %.",
      "- Riester-Bestand: pausieren empfehlen, nicht kündigen.",
      "- Keine erfundenen Anbieter, keine konkrete Anlageberatung.",
      "- Schreibe in der Du-Form, sachlich, gut lesbar, max. 20 Wörter pro Satz.",
      "- Schließe mit einem H2 'Häufige Fragen' und 3 kurzen FAQ-Einträgen (### Frage / Antwort).",
      "- Markiere Stellen, an denen ein interner Link sinnvoll ist, mit `[INTERNER LINK: /pfad]`.",
      "- Kein Disclaimer am Ende — den setzen wir separat.",
      "- Antworte AUSSCHLIESSLICH mit dem Markdown, ohne Vor- oder Nachwort.",
    ].join("\n");

    const userPrompt = [
      `Keyword: ${keyword}`,
      intent ? `Suchintention: ${intent}` : null,
      targetUrl ? `Geplante Ziel-URL: ${targetUrl}` : null,
      coveredPages && coveredPages.length
        ? `Bereits vorhandene Seiten zum Thema (für interne Verlinkung):\n- ${coveredPages.join("\n- ")}`
        : null,
      "",
      "Content-Gliederung (jeweils eine H2):",
      ...outline.map((o, i) => `${i + 1}. ${o}`),
    ]
      .filter(Boolean)
      .join("\n");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      },
    );

    if (response.status === 429) {
      return new Response(
        JSON.stringify({ error: "Zu viele Anfragen. Bitte einen Moment warten und erneut versuchen." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (response.status === 402) {
      return new Response(
        JSON.stringify({ error: "AI-Guthaben aufgebraucht. Bitte Credits in den Workspace-Einstellungen aufladen." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI-Gateway-Fehler" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const draft = data?.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ draft }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-seo-draft error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unbekannter Fehler" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
