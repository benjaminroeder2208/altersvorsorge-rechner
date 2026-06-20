import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { openCookieSettings } from "@/lib/cookieConsent";
import PageHead from "@/components/seo/PageHead";
import AssistantResultCard, {
  type CalculationTrigger,
} from "@/components/ai-assistant/AssistantResultCard";
import AssistantDisclaimerCard from "@/components/ai-assistant/AssistantDisclaimerCard";
import { calculate } from "@/components/landing/AltersvorsorgedepotRechner";
import type { Inputs } from "@/components/landing/AltersvorsorgedepotRechner";

interface ChatItem {
  role: "user" | "assistant";
  content: string;
  trigger?: CalculationTrigger | null;
  suggestions?: string[];
}

/* E-Mail-Erfassung übernimmt vollständig die eingebettete NewsletterCard
   (simulation_leads + send-confirmation-email). Keine eigene Regex-Erkennung mehr. */

const CURRENT_YEAR = new Date().getFullYear();

function buildCalculationSummary(trigger: CalculationTrigger) {
  const inputs: Inputs = {
    monthlyContribution: trigger.sparbetrag_monatlich,
    incomeBand: 2,
    birthYear: CURRENT_YEAR - trigger.alter,
    children: trigger.kinder_anzahl,
    retirementAge: trigger.renteneintrittsalter,
    returnRate: trigger.rendite_prozent / 100,
  };
  const result = calculate(inputs);
  return {
    alter: trigger.alter,
    sparbetrag_monatlich: trigger.sparbetrag_monatlich,
    rendite_prozent: trigger.rendite_prozent,
    renteneintrittsalter: trigger.renteneintrittsalter,
    kinder_anzahl: trigger.kinder_anzahl,
    jahre_bis_rente: result.yearsToRetirement,
    endkapital_mit_foerderung: Math.round(result.capitalWithFunding),
    endkapital_ohne_foerderung: Math.round(result.capitalWithout),
    monatliche_auszahlung_mit_foerderung: Math.round(result.monthlyPayout),
    gesamte_eigenbeitraege: Math.round(result.totalContributions),
    gesamte_zulagen: Math.round(result.totalSubsidies),
    gesamte_steuerersparnis: Math.round(result.totalTaxBenefit),
  };
}

const DotBounce = () => (
  <div className="flex items-center gap-1 px-3 py-2">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

export default function AIVorsorgeAssistantPage() {
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bootstrapped = useRef(false);
  const resultRenderedRef = useRef(false);
  const [calculationSummary, setCalculationSummary] =
    useState<Record<string, string | number> | null>(null);

  /* ── auto-scroll ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ── focus textarea ── */
  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  /* ── hide Cookiebot floating widget on this page only ── */
  useEffect(() => {
    const styleId = "hide-cookiebot-widget";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      #CookiebotWidget,
      #CookiebotBadge,
      .CookiebotButton {
        display: none !important;
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  /* ── core send to edge function ── */
  const callAssistant = useCallback(
    async (nextMessages: ChatItem[]): Promise<ChatItem | null> => {
      try {
        const { data, error } = await supabase.functions.invoke(
          "vorsorge-assistent",
          {
            body: {
              messages: nextMessages.map((m) => ({
                role: m.role,
                content: m.content,
              })),
              session_id: sessionIdRef.current,
              calculation_summary: calculationSummary ?? undefined,
            },
          },
        );
        if (error) throw error;
        if (data?.session_id) sessionIdRef.current = data.session_id;
        const incomingTrigger = data?.calculation_trigger ?? null;
        // Ergebniskarte nur EINMAL anzeigen – nachfolgende Trigger ignorieren,
        // damit das Ergebnis nicht bei jeder Antwort erneut gerendert wird.
        const showTrigger = incomingTrigger && !resultRenderedRef.current;
        const item: ChatItem = {
          role: "assistant",
          content: data?.reply ?? "",
          trigger: showTrigger ? incomingTrigger : null,
          suggestions: Array.isArray(data?.suggestions) ? data.suggestions : undefined,
        };
        if (showTrigger) {
          resultRenderedRef.current = true;
          setCalculationSummary(buildCalculationSummary(incomingTrigger));
        }
        return item;
      } catch (e) {
        console.error("Assistant error:", e);
        return {
          role: "assistant",
          content:
            "Entschuldige, da ist gerade etwas schiefgelaufen. Versuch es bitte gleich nochmal.",
        };
      }
    },
    [calculationSummary],
  );

  /* ── bootstrap: erste Begrüßung ── */
  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    (async () => {
      setLoading(true);
      // leeres initiales User-Signal, damit Claude den Flow startet
      const seed: ChatItem[] = [
        { role: "user", content: "Hallo, starte bitte den Vorsorge-Check." },
      ];
      const reply = await callAssistant(seed);
      if (reply) setMessages([reply]); // wir zeigen nur die Assistant-Antwort
      setLoading(false);
    })();
  }, [callAssistant]);

  /* ── send user message ── */
  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;
      const userMsg: ChatItem = { role: "user", content: trimmed };
      const next = [...messages, userMsg];
      setMessages(next);
      setInput("");
      setLoading(true);
      const reply = await callAssistant(next);
      if (reply) setMessages((prev) => [...prev, reply]);
      setLoading(false);
    },
    [messages, loading, callAssistant],
  );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  /* ── quick replies aus letzter Assistant-Nachricht ── */
  const lastSuggestions = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") {
        return messages[i].suggestions ?? [];
      }
    }
    return [];
  }, [messages]);

  return (
    <>
      <PageHead
        title="KI-Vorsorgeberater"
        description="Interner Test des AI-Vorsorgeassistenten."
        path="/ai-vorsorgeassistent"
        robots="noindex,nofollow"
      />
      <div className="flex flex-col h-[100dvh] bg-background">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 h-14 border-b border-border bg-background shrink-0">
          <Link
            to="/"
            aria-label="Zurück zur Startseite"
            className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-sm font-semibold">Vorsorge-Assistent</span>
        </header>

        {/* Chat */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-4 py-4">
          <div className="mx-auto max-w-xl space-y-3">
            {messages.map((m, i) => (
              <div key={i}>
                {m.role === "user" ? (
                  <div className="flex justify-end">
                    <div className="max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap bg-primary text-primary-foreground rounded-[14px_14px_4px_14px]">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {m.content && (
                      <div className="flex justify-start">
                        <div className="max-w-[90%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap bg-muted text-foreground rounded-[14px_14px_14px_4px]">
                          {m.content}
                        </div>
                      </div>
                    )}
                    {m.trigger && (
                      <AssistantResultCard
                        trigger={m.trigger}
                        sessionId={sessionIdRef.current}
                      />
                    )}
                    {m.trigger && <AssistantDisclaimerCard />}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-[14px_14px_14px_4px]">
                  <DotBounce />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </main>

        {/* Input */}
        <div className="border-t border-border bg-background px-3 sm:px-4 py-3 shrink-0">
          <div className="mx-auto max-w-xl">
            {lastSuggestions.length > 0 && !loading && (
              <div className="flex flex-wrap gap-2 mb-2">
                {lastSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/70 border border-border text-foreground transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
                placeholder="Deine Antwort..."
                rows={1}
                className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 max-h-32"
              />
              <button
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                aria-label="Senden"
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="shrink-0 border-t border-border bg-background px-3 sm:px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-center text-xs text-muted-foreground">
          <Link to="/impressum" className="hover:text-foreground hover:underline transition-colors">Impressum</Link>
          <span className="mx-2">·</span>
          <Link to="/datenschutz" className="hover:text-foreground hover:underline transition-colors">Datenschutz</Link>
          <span className="mx-2">·</span>
          <button
            type="button"
            onClick={openCookieSettings}
            className="hover:text-foreground hover:underline transition-colors"
          >
            Cookie-Einstellungen
          </button>
        </footer>
      </div>
    </>
  );
}
