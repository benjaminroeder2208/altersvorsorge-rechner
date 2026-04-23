import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import AltersvorsorgedepotRechner from "@/components/landing/AltersvorsorgedepotRechner";
import RentenlueckenRechner from "@/components/landing/RentenlueckenRechner";
import { trackEvent } from "@/lib/analytics";

/**
 * Internal QA page — NOT linked from anywhere, marked noindex.
 * Visit /internal/analytics-test to manually verify GTM/GA4 events:
 * - calculator_used
 * - lead_generated
 * - lead_magnet_download
 * - newsletter_signup
 *
 * The right-hand inspector hooks into window.dataLayer.push and shows
 * only the 4 events we care about, in real time.
 */

const TRACKED_EVENTS = [
  "calculator_used",
  "lead_generated",
  "lead_magnet_download",
  "newsletter_signup",
] as const;

type TrackedEventName = (typeof TRACKED_EVENTS)[number];

interface DataLayerEntry {
  receivedAt: string;
  event: string;
  payload: Record<string, unknown>;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const AnalyticsTestPage = () => {
  const [entries, setEntries] = useState<DataLayerEntry[]>([]);
  const [filter, setFilter] = useState<"all" | TrackedEventName>("all");
  const originalPushRef = useRef<typeof Array.prototype.push | null>(null);

  // Hook into dataLayer.push so we can show events live
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.dataLayer) window.dataLayer = [];

    const dl = window.dataLayer;
    originalPushRef.current = dl.push.bind(dl);

    dl.push = ((...args: Array<Record<string, unknown>>) => {
      for (const item of args) {
        const eventName = typeof item?.event === "string" ? item.event : "";
        if ((TRACKED_EVENTS as readonly string[]).includes(eventName)) {
          setEntries((prev) =>
            [
              {
                receivedAt: new Date().toLocaleTimeString("de-DE", {
                  hour12: false,
                }),
                event: eventName,
                payload: item,
              },
              ...prev,
            ].slice(0, 100),
          );
        }
      }
      return originalPushRef.current!(...args);
    }) as typeof Array.prototype.push;

    return () => {
      if (originalPushRef.current && window.dataLayer) {
        window.dataLayer.push = originalPushRef.current;
      }
    };
  }, []);

  const fireSample = (name: TrackedEventName) => {
    const samples: Record<TrackedEventName, Record<string, unknown>> = {
      calculator_used: {
        calculator_type: "retirement_calculator",
        monthly_contribution: 150,
        age: 35,
        retirement_age: 67,
      },
      lead_generated: {
        lead_source: "retirement_calculator",
        monthly_contribution: 200,
        age: 32,
        email: "qa+lead@example.com",
      },
      lead_magnet_download: {
        lead_magnet_type: "retirement_calculator_pdf",
        email: "qa+pdf@example.com",
      },
      newsletter_signup: {
        email: "qa+news@example.com",
        source: "blog_widget",
      },
    };
    trackEvent(name, samples[name]);
  };

  const visibleEntries =
    filter === "all" ? entries : entries.filter((e) => e.event === filter);

  return (
    <>
      <Helmet>
        <title>Analytics QA · Internal</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-secondary/40">
          <div className="container max-w-7xl mx-auto px-6 py-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Internal · Not indexed
            </p>
            <h1 className="text-2xl font-bold text-foreground mt-1">
              Analytics & GTM Event Test
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
              Bediene unten beide Rechner. Erwartete Events erscheinen live im
              Inspektor rechts. Sample-Buttons feuern Test-Events ohne UI-Aktion.
            </p>
          </div>
        </header>

        <div className="container max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          {/* Left: calculators */}
          <div className="space-y-16 min-w-0">
            <section>
              <SectionHeader
                title="1 · Altersvorsorgedepot-Rechner"
                expects={[
                  "calculator_used (debounced 800ms beim Verstellen)",
                  "lead_magnet_download + lead_generated (nach erfolgreichem E-Mail-Submit in Schritt 3)",
                ]}
              />
              <div className="rounded-2xl border border-border bg-background overflow-hidden">
                <AltersvorsorgedepotRechner />
              </div>
            </section>

            <section>
              <SectionHeader
                title="2 · Rentenlücken-Rechner"
                expects={[
                  "calculator_used (debounced 800ms beim Verstellen der Slider)",
                ]}
              />
              <div className="rounded-2xl border border-border bg-background p-6 md:p-8">
                <RentenlueckenRechner />
              </div>
            </section>
          </div>

          {/* Right: live inspector */}
          <aside className="lg:sticky lg:top-6 lg:self-start space-y-4">
            <div className="rounded-2xl border border-border bg-background p-5">
              <h2 className="font-semibold text-foreground mb-3">
                Sample-Events feuern
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {TRACKED_EVENTS.map((name) => (
                  <button
                    key={name}
                    onClick={() => fireSample(name)}
                    className="text-xs px-3 py-2 rounded-lg bg-secondary hover:bg-border transition-colors text-foreground font-mono"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-foreground">
                  Live dataLayer
                </h2>
                <button
                  onClick={() => setEntries([])}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  leeren
                </button>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {(["all", ...TRACKED_EVENTS] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-[11px] px-2 py-1 rounded-full transition-colors ${
                      filter === f
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {visibleEntries.length === 0 ? (
                <p className="text-xs text-muted-foreground italic py-6 text-center">
                  Noch keine Events. Bedien einen Rechner oder klick einen
                  Sample-Button.
                </p>
              ) : (
                <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                  {visibleEntries.map((e, idx) => (
                    <li
                      key={`${e.receivedAt}-${idx}`}
                      className="rounded-lg border border-border bg-secondary/40 p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-semibold text-primary">
                          {e.event}
                        </span>
                        <span className="text-[10px] text-muted-foreground tabular-nums">
                          {e.receivedAt}
                        </span>
                      </div>
                      <pre className="text-[11px] leading-snug text-foreground/80 overflow-x-auto whitespace-pre-wrap break-words">
                        {JSON.stringify(e.payload, null, 2)}
                      </pre>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-2xl border border-dashed border-border p-4 text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Hinweis:</strong> Diese Seite
              ist <code>noindex</code> und nirgends verlinkt. Direkt aufrufen
              unter <code>/internal/analytics-test</code>. Events werden parallel
              auch an den echten <code>window.dataLayer</code> gepusht — bei
              Bedarf in DevTools mit <code>dataLayer</code> prüfen.
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

const SectionHeader = ({
  title,
  expects,
}: {
  title: string;
  expects: string[];
}) => (
  <div className="mb-4">
    <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    <ul className="mt-2 text-xs text-muted-foreground space-y-1">
      {expects.map((e) => (
        <li key={e} className="flex gap-2">
          <span className="text-primary">→</span>
          <span>Erwartet: {e}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default AnalyticsTestPage;
