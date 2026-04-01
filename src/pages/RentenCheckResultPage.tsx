import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Lightbulb } from "lucide-react";

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

  return (
    <>
      <Helmet>
        <title>Dein Ergebnis – Renten-Check</title>
        <meta name="description" content="Dein persönliches Rentenlücken-Ergebnis mit konkreten nächsten Schritten." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        {/* SECTION 1 — RESULT */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-20 px-6">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Dein Ergebnis
            </p>
            <div className="space-y-2">
              <p className="text-6xl md:text-7xl lg:text-8xl font-bold text-red-600 tracking-tight">
                {fmt(luecke)}&nbsp;€
              </p>
              <p className="text-lg md:text-xl text-muted-foreground font-medium">
                Deine monatliche Rentenlücke
              </p>
            </div>

            <div className="space-y-4 text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
              <p>
                Das bedeutet: Dir fehlen später rund <strong className="text-foreground">{fmt(luecke)}&nbsp;€ pro Monat</strong>.
              </p>
              <p>
                Das entspricht einem spürbaren Teil deines heutigen Einkommens.
              </p>
              <div className="p-4 rounded-xl bg-muted/50 border border-border/60 text-left space-y-2">
                <p className="text-sm font-medium text-foreground">Wenn du nichts veränderst:</p>
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                  Müsstest du deinen Lebensstandard im Alter deutlich anpassen
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Über {jahreRente + 18} Jahre summiert sich das auf rund <strong className="text-foreground">{fmt(summe18Jahre)}&nbsp;€</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2 — INTERPRETATION */}
        <section className="py-16 md:py-20 px-6 bg-muted/30 border-y border-border/40">
          <div className="max-w-lg mx-auto text-center space-y-6">
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

        {/* SECTION 3 — STRATEGIC DIRECTION */}
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Dein Weg zur Lösung</h2>
              <p className="text-sm text-muted-foreground">Schritt für Schritt, nicht alles auf einmal.</p>
            </div>

            {/* Primary */}
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

            {/* Secondary */}
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

        {/* SECTION 4 — ACTION */}
        <section className="py-16 md:py-20 px-6 bg-muted/30 border-y border-border/40">
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

        {/* SECTION 5 — NEXT STEPS */}
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Nächste Schritte</h2>
              <p className="text-sm text-muted-foreground">Weiterführende Informationen für dich.</p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Wie viel solltest du sparen?", icon: Lightbulb },
                { label: "Wie funktioniert ein Sparplan?", icon: TrendingUp },
                { label: "Welche Altersvorsorge passt zu dir?", icon: Shield },
              ].map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/60 hover:bg-muted/30 transition-colors cursor-default"
                >
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                to="/renten-check"
                className="text-sm text-muted-foreground underline hover:text-foreground transition-colors"
              >
                Nochmal berechnen
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="px-6 pb-12">
          <p className="text-xs text-muted-foreground/60 text-center max-w-md mx-auto leading-relaxed">
            Vereinfachte Schätzung. Keine Anlage-, Steuer- oder Rechtsberatung.
          </p>
        </div>
      </div>
    </>
  );
};

export default RentenCheckResultPage;
