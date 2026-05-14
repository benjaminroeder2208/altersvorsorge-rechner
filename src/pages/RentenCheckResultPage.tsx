import PageHead from "@/components/seo/PageHead";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Lightbulb, CheckCircle } from "lucide-react";

const fmt = (n: number) =>
  n.toLocaleString("de-DE", { maximumFractionDigits: 0 });

const RentenCheckResultPage = () => {
  const location = useLocation();
  const state = location.state as {
    luecke?: number;
    renteNetto?: number;
    bedarf?: number;
    deckung?: number;
    alter?: number;
  } | null;

  const luecke = state?.luecke ?? 850;
  const renteNetto = state?.renteNetto ?? 1400;
  const bedarf = state?.bedarf ?? 2250;
  const deckung = state?.deckung ?? 62;
  const alter = state?.alter ?? 35;
  const jahreRente = 67 - alter;
  const summe18Jahre = luecke * 12 * 18;
  const hasGap = luecke > 0;

  return (
    <>
      <PageHead
        title="Dein Ergebnis – Renten-Check"
        description="Dein persönliches Rentenlücken-Ergebnis mit konkreten nächsten Schritten."
        path="/renten-check/result"
        robots="noindex,nofollow"
      />

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Flow header */}
        <div className="w-full border-b border-border/30">
          <div className="max-w-2xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link to="/reicht-meine-rente" className="text-sm font-semibold text-foreground tracking-tight hover:opacity-70 transition-opacity">
              Renten-Check
            </Link>
            <p className="text-xs text-muted-foreground">Schritt 3 von 3 · Ergebnis</p>
          </div>
        </div>

        {/* Completed progress bar */}
        <div className="w-full bg-muted/40 border-b border-border/40">
          <div className="max-w-2xl mx-auto px-6 py-3">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-full" />
            </div>
          </div>
        </div>

        {/* SECTION 1 — RESULT */}
        <section className="pt-16 pb-12 md:pt-24 md:pb-16 px-6">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Dein persönliches Ergebnis
            </p>

            {hasGap ? (
              <>
                <div className="space-y-2">
                  <p className="text-6xl md:text-7xl lg:text-8xl font-bold text-destructive tracking-tight">
                    {fmt(luecke)}&nbsp;€
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground font-medium">
                    Deine monatliche Rentenlücke
                  </p>
                </div>

                {/* Coverage bar */}
                <div className="max-w-sm mx-auto space-y-1.5">
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        deckung >= 75 ? "bg-green-500" : deckung >= 50 ? "bg-yellow-500" : "bg-destructive"
                      }`}
                      style={{ width: `${deckung}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Rente deckt {Math.round(deckung)}&nbsp;% deines Bedarfs von {fmt(bedarf)}&nbsp;€
                  </p>
                </div>

                <div className="space-y-4 text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                  <p>
                    Dir fehlen später rund <strong className="text-foreground">{fmt(luecke)}&nbsp;€ pro Monat</strong> — das entspricht einem spürbaren Teil deines heutigen Einkommens.
                  </p>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/60 text-left space-y-2">
                    <p className="text-sm font-medium text-foreground">Wenn du nichts veränderst:</p>
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-destructive" />
                      Müsstest du deinen Lebensstandard im Alter deutlich anpassen
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Über {jahreRente + 18} Jahre summiert sich das auf rund <strong className="text-foreground">{fmt(summe18Jahre)}&nbsp;€</strong>.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                  <p className="text-3xl md:text-4xl font-bold text-foreground">Keine Rentenlücke</p>
                  <p className="text-lg text-muted-foreground">
                    Bei deinen aktuellen Angaben deckt die Rente deinen Bedarf.
                  </p>
                </div>
                <div className="max-w-sm mx-auto space-y-1.5">
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-green-500 w-full" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Rente deckt {Math.round(deckung)}&nbsp;% deines Bedarfs
                  </p>
                </div>
                <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Trotzdem kann privates Sparen die Sicherheit und Lebensqualität im Alter erhöhen. Unten findest du weiterführende Informationen.
                </p>
              </>
            )}
          </div>
        </section>

        {/* SECTION 2 — INTERPRETATION (only when gap exists) */}
        {hasGap && (
          <section className="py-14 md:py-18 px-6 bg-muted/30 border-y border-border/40">
            <div className="max-w-lg mx-auto text-center space-y-5">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Das ist kein ungewöhnlicher Wert</h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>Viele in deiner Situation haben eine ähnliche Lücke.</p>
                <p>
                  Die gute Nachricht: <strong className="text-foreground">Das ist lösbar</strong>, wenn du strukturiert vorgehst.
                </p>
                <div className="pt-4 border-t border-border/40">
                  <p className="text-foreground font-medium">
                    Entscheidend ist jetzt nicht nur die Zahl — sondern was du konkret daraus machst.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3 — STRATEGIC DIRECTION */}
        {hasGap && (
          <section className="py-14 md:py-18 px-6">
            <div className="max-w-lg mx-auto space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">Dein Weg zur Lösung</h2>
                <p className="text-sm text-muted-foreground">Schritt für Schritt, nicht alles auf einmal.</p>
              </div>

              <div className="p-6 rounded-2xl border-2 border-primary bg-primary/5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">Schritt 1 — Grundlage</p>
                    <p className="text-lg font-bold text-foreground">Vermögen aufbauen</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Regelmäßiges Sparen ist die wichtigste Stellschraube. Mit einem festen monatlichen Betrag baust du über die Jahre systematisch Kapital auf — und profitierst vom Zinseszinseffekt.
                </p>
                <p className="text-xs font-semibold text-primary">→ Der Aufbau ist die Grundlage</p>
              </div>

              <div className="p-5 rounded-xl border border-border/60 bg-muted/30 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Schritt 2 — Optional</p>
                    <p className="text-base font-semibold text-foreground">Ergänzen und absichern</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sobald die Basis steht, kannst du mit staatlicher Förderung, betrieblicher Vorsorge oder weiteren Bausteinen ergänzen.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4 — ACTION */}
        {hasGap && (
          <section className="py-14 md:py-18 px-6 bg-muted/30 border-y border-border/40">
            <div className="max-w-lg mx-auto text-center space-y-8">
              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                  Der wichtigste Hebel für dich ist aktuell:
                </h2>
                <p className="text-lg md:text-xl font-bold text-primary">
                  → regelmäßig Vermögen aufzubauen
                </p>
              </div>

              <div className="space-y-4 text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                <p>Ein sinnvoller Einstieg ist ein fester monatlicher Betrag.</p>
                <p>
                  Schon <strong className="text-foreground">150–300&nbsp;€ monatlich</strong> können langfristig einen spürbaren Unterschied machen.
                </p>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-sm font-medium text-foreground">
                    Das Wichtigste ist: <span className="text-primary">→ anfangen und konsequent dranbleiben</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 5 — NEXT STEPS */}
        <section className={`py-14 md:py-18 px-6 ${!hasGap ? "bg-muted/30 border-t border-border/40" : ""}`}>
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                {hasGap ? "Nächste Schritte" : "Weiterführende Informationen"}
              </h2>
              <p className="text-sm text-muted-foreground">Hilfreiche Ratgeber für deine Vorsorge.</p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Wie viel solltest du sparen?", desc: "Die richtige Sparrate finden", icon: Lightbulb },
                { label: "Wie funktioniert ein Sparplan?", desc: "ETFs und regelmäßiges Investieren erklärt", icon: TrendingUp },
                { label: "Welche Altersvorsorge passt zu dir?", desc: "Depot, Riester, bAV im Vergleich", icon: Shield },
              ].map(({ label, desc, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/60 hover:bg-muted/40 transition-colors cursor-default group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-muted-foreground transition-colors shrink-0" />
                </div>
              ))}
            </div>

            <div className="text-center pt-2 space-y-3">
              <Link
                to="/renten-check"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                Nochmal berechnen
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-border/30 py-6 px-6 mt-auto">
          <p className="text-xs text-muted-foreground text-center">
            Renten-Check · Vereinfachte Schätzung · Keine Anlage-, Steuer- oder Rechtsberatung
          </p>
        </div>
      </div>
    </>
  );
};

export default RentenCheckResultPage;
