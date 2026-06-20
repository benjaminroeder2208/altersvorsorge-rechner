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
  const scrollRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bootstrapped = useRef(false);
  const resultRenderedRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const [calculationSummary, setCalculationSummary] =
    useState<Record<string, string | number> | null>(null);

  /* ── Debug-Modus für iOS/Android Scroll-/Tastatur-Probleme ──
     Aktivieren via ?vvdebug=1 (Query-Param) oder localStorage.vvdebug="1".
     Loggt Focus-/Blur-, visualViewport- und Scroll-Events in die Konsole
     und blendet ein Live-Overlay ein (Konsole am Handy oft nicht sichtbar). */
  const debug = useMemo(() => {
    if (typeof window === "undefined") return false;
    const q = new URLSearchParams(window.location.search);
    return q.get("vvdebug") === "1" || window.localStorage.getItem("vvdebug") === "1";
  }, []);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const lastLogRef = useRef<number>(0);
  const dlog = useCallback(
    (event: string, extra?: Record<string, unknown>) => {
      if (!debug) return;
      const vv = window.visualViewport;
      const payload = {
        t: Math.round(performance.now()),
        event,
        scrollY: Math.round(window.scrollY),
        scrollX: Math.round(window.scrollX),
        innerH: window.innerHeight,
        innerW: window.innerWidth,
        vvHeight: vv ? Math.round(vv.height) : null,
        vvWidth: vv ? Math.round(vv.width) : null,
        vvOffsetTop: vv ? Math.round(vv.offsetTop) : null,
        vvOffsetLeft: vv ? Math.round(vv.offsetLeft) : null,
        vvScale: vv ? Number(vv.scale.toFixed(3)) : null,
        kb: vv ? Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)) : null,
        activeEl: document.activeElement?.tagName ?? null,
        ...extra,
      };
      // eslint-disable-next-line no-console
      console.log("[vvdebug]", payload);
      // Overlay throttlen
      const now = performance.now();
      if (now - lastLogRef.current > 80) {
        lastLogRef.current = now;
        setDebugInfo(
          `${event}\n` +
            `vv: ${payload.vvWidth}×${payload.vvHeight} @top=${payload.vvOffsetTop}\n` +
            `inner: ${payload.innerW}×${payload.innerH}\n` +
            `kb: ${payload.kb}px  scrollY: ${payload.scrollY}\n` +
            `active: ${payload.activeEl}`,
        );
      }
    },
    [debug],
  );

  /* Globale Event-Listener für das Debugging */
  useEffect(() => {
    if (!debug) return;
    dlog("mount");
    const vv = window.visualViewport;
    const onVvResize = () => dlog("vv:resize");
    const onVvScroll = () => dlog("vv:scroll");
    const onWinScroll = () => dlog("window:scroll");
    const onWinResize = () => dlog("window:resize");
    const onFocusIn = (e: FocusEvent) =>
      dlog("focusin", { target: (e.target as HTMLElement | null)?.tagName });
    const onFocusOut = (e: FocusEvent) =>
      dlog("focusout", { target: (e.target as HTMLElement | null)?.tagName });
    vv?.addEventListener("resize", onVvResize);
    vv?.addEventListener("scroll", onVvScroll);
    window.addEventListener("scroll", onWinScroll, { passive: true });
    window.addEventListener("resize", onWinResize);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      vv?.removeEventListener("resize", onVvResize);
      vv?.removeEventListener("scroll", onVvScroll);
      window.removeEventListener("scroll", onWinScroll);
      window.removeEventListener("resize", onWinResize);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, [debug, dlog]);


  /* ── robustes Scrollen ans Ende (ohne Springen) ── */
  const scrollToBottom = useCallback((smooth = true) => {
    const el = scrollRef.current;
    if (!el) return;
    // Doppeltes rAF: nach Layout & Paint, vermeidet Sprünge bei
    // gleichzeitigem Tastatur-Resize.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollTo({
          top: el.scrollHeight,
          behavior: smooth ? "smooth" : "auto",
        });
      });
    });
  }, []);

  useEffect(() => {
    scrollToBottom(true);
  }, [messages, loading, scrollToBottom]);

  /* ── focus textarea NUR nach erster User-Interaktion ──
     verhindert ungewolltes Tastatur-Aufpoppen beim Seitenaufruf. */
  useEffect(() => {
    if (!loading && hasInteractedRef.current) inputRef.current?.focus();
  }, [loading]);

  /* ── Virtual-Keyboard-Handling via visualViewport ──
     Sperrt zusätzlich das window-Scrolling (iOS scrollt sonst die
     gesamte Seite, wenn das Eingabefeld fokussiert wird → „Springen").
     Die Shell bekommt explizit Höhe = visualViewport.height, sodass
     Input + Footer immer direkt über der Tastatur sitzen. */
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    // Body-Scroll komplett unterbinden (iOS-Bounce + Auto-Scroll-on-Focus)
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyWidth: body.style.width,
      bodyHeight: body.style.height,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.height = "100%";

    const vv = window.visualViewport;
    if (!vv) {
      shell.style.setProperty("--safe-bottom", "env(safe-area-inset-bottom)");
      return () => {
        html.style.overflow = prev.htmlOverflow;
        body.style.overflow = prev.bodyOverflow;
        body.style.position = prev.bodyPosition;
        body.style.width = prev.bodyWidth;
        body.style.height = prev.bodyHeight;
      };
    }

    let raf = 0;
    const apply = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrollYBefore = window.scrollY;
        // Window-Scroll, den iOS beim Fokus auslöst, zurücksetzen
        if (window.scrollY !== 0 || window.scrollX !== 0) {
          window.scrollTo(0, 0);
          dlog("apply:reset-window-scroll", { scrollYBefore });
        }
        const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
        // Shell exakt auf sichtbare Viewport-Höhe setzen → kein Springen
        shell.style.height = `${vv.height}px`;
        shell.style.setProperty("--safe-bottom", kb > 0 ? "0px" : "env(safe-area-inset-bottom)");
        dlog("apply", { kb, shellHeight: vv.height });
        scrollToBottom(false);
      });
    };

    apply();
    vv.addEventListener("resize", apply);
    vv.addEventListener("scroll", apply);
    window.addEventListener("scroll", apply, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      vv.removeEventListener("resize", apply);
      vv.removeEventListener("scroll", apply);
      window.removeEventListener("scroll", apply);
      shell.style.height = "";
      shell.style.removeProperty("--safe-bottom");
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.width = prev.bodyWidth;
      body.style.height = prev.bodyHeight;
    };
  }, [scrollToBottom, dlog]);

  /* ── beim Fokus aufs Textfeld mehrfach ans Ende scrollen ──
     iOS blendet die Tastatur asynchron ein. */
  const handleFocus = useCallback(() => {
    hasInteractedRef.current = true;
    dlog("textarea:focus");
    scrollToBottom(false);
    window.setTimeout(() => {
      dlog("textarea:focus+150");
      scrollToBottom(false);
    }, 150);
    window.setTimeout(() => {
      dlog("textarea:focus+400");
      scrollToBottom(true);
    }, 400);
  }, [scrollToBottom, dlog]);

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
      hasInteractedRef.current = true;
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
      {/* Fixed full-viewport shell — verhindert Springen durch iOS-URL-Bar
          und klebt Input + Footer kompromisslos am unteren Rand. */}
      <div
        ref={shellRef}
        className="fixed inset-0 flex flex-col bg-background overflow-hidden overscroll-none"
      >
        {/* Header */}
        <header className="flex items-center gap-3 px-4 h-14 border-b border-border bg-background shrink-0 w-full min-w-0">
          <Link
            to="/"
            aria-label="Zurück zur Startseite"
            className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-sm font-semibold truncate">Vorsorge-Assistent</span>
        </header>

        {/* Chat */}
        <main
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain px-3 sm:px-4 py-4 w-full [-webkit-overflow-scrolling:touch]"
        >
          <div className="mx-auto w-full max-w-xl space-y-3 min-w-0">
            {messages.map((m, i) => (
              <div key={i} className="w-full min-w-0">
                {m.role === "user" ? (
                  <div className="flex justify-end w-full min-w-0">
                    <div className="max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere] bg-primary text-primary-foreground rounded-[14px_14px_4px_14px]">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 w-full min-w-0">
                    {m.content && (
                      <div className="flex justify-start w-full min-w-0">
                        <div className="max-w-[90%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere] bg-muted text-foreground rounded-[14px_14px_14px_4px]">
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
        <div className="border-t border-border bg-background px-3 sm:px-4 py-3 shrink-0 w-full min-w-0">
          <div className="mx-auto w-full max-w-xl min-w-0">
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
            <div className="flex items-end gap-2 w-full min-w-0">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                onFocus={handleFocus}
                disabled={loading}
                placeholder="Deine Antwort..."
                rows={1}
                className="flex-1 min-w-0 resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 max-h-32"
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
        <footer className="shrink-0 w-full min-w-0 border-t border-border bg-background px-3 sm:px-4 py-2 text-center text-xs text-muted-foreground" style={{ paddingBottom: "max(0.5rem, var(--safe-bottom, env(safe-area-inset-bottom)))" }}>
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

        {debug && debugInfo && (
          <pre
            aria-hidden
            className="pointer-events-none fixed top-16 left-2 z-[9999] max-w-[60vw] whitespace-pre-wrap rounded-md bg-black/80 px-2 py-1.5 font-mono text-[10px] leading-tight text-green-300 shadow-lg"
          >
            {debugInfo}
          </pre>
        )}
      </div>
    </>
  );
}
