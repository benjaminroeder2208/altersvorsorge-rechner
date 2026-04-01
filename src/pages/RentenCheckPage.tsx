import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Slider } from "@/components/ui/slider";

const fmt = (n: number) =>
  n.toLocaleString("de-DE", { maximumFractionDigits: 0 });

const steps = ["Alter", "Einkommen", "Sparen", "Ergebnis"];

const RentenCheckPage = () => {
  const [step, setStep] = useState(0);
  const [alter, setAlter] = useState(35);
  const [einkommen, setEinkommen] = useState(3000);
  const [erspartes, setErspartes] = useState(0);
  const [sparrate, setSparrate] = useState(0);

  // Simple calculation
  const jahreRente = 67 - alter;
  const durchschnittslohn = 45358;
  const entgeltpunkte = ((einkommen * 12) / durchschnittslohn) * Math.min(jahreRente + 10, 45);
  const renteNetto = entgeltpunkte * 39.32 * 0.87;
  const bedarf = einkommen * 0.75;
  const luecke = Math.max(bedarf - renteNetto, 0);

  // Capital from savings
  const r = 0.06 / 12;
  const n = jahreRente * 12;
  const kapitalSpar = n > 0 && r > 0
    ? sparrate * ((Math.pow(1 + r, n) - 1) / r) + erspartes * Math.pow(1 + r, n)
    : erspartes;
  const renteAusSpar = kapitalSpar / (18 * 12);
  const verbleibendeLuecke = Math.max(luecke - renteAusSpar, 0);
  const deckung = bedarf > 0 ? Math.min(((renteNetto + renteAusSpar) / bedarf) * 100, 100) : 100;

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <>
      <Helmet>
        <title>Renten-Check – Reicht meine Rente?</title>
        <meta name="description" content="Schneller Renten-Check: Finde in unter 60 Sekunden heraus, ob deine Rente reicht." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Progress */}
        <div className="w-full bg-muted/40 border-b border-border/40">
          <div className="max-w-lg mx-auto px-6 py-4 flex items-center gap-3">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${
                    i < step
                      ? "bg-primary text-primary-foreground"
                      : i === step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className="text-xs text-muted-foreground hidden sm:block">{label}</span>
                {i < steps.length - 1 && <div className="h-px flex-1 bg-border" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">
            {step === 0 && (
              <div className="space-y-8">
                <div className="space-y-2 text-center">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Wie alt bist du?</h1>
                  <p className="text-muted-foreground text-sm">Damit wir berechnen, wie lange du noch sparen kannst.</p>
                </div>
                <div className="space-y-4">
                  <p className="text-center text-5xl font-bold text-primary">{alter}</p>
                  <Slider value={[alter]} onValueChange={([v]) => setAlter(v)} min={18} max={63} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>18 Jahre</span><span>63 Jahre</span>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    Noch {jahreRente} Jahre bis zur Rente
                  </p>
                </div>
                <button
                  onClick={next}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  Weiter <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <div className="space-y-2 text-center">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Wie viel verdienst du?</h1>
                  <p className="text-muted-foreground text-sm">Dein monatliches Nettoeinkommen – was auf deinem Konto ankommt.</p>
                </div>
                <div className="space-y-4">
                  <p className="text-center text-5xl font-bold text-primary">{fmt(einkommen)}&nbsp;€</p>
                  <Slider value={[einkommen]} onValueChange={([v]) => setEinkommen(v)} min={1000} max={10000} step={100} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1.000 €</span><span>10.000 €</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={prev} className="px-5 py-4 rounded-xl border border-border text-muted-foreground hover:bg-muted/50 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    Weiter <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="space-y-2 text-center">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Sparst du schon etwas?</h1>
                  <p className="text-muted-foreground text-sm">Falls nicht, lass die Werte einfach auf 0 – kein Problem.</p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Bereits angespart</label>
                    <p className="text-center text-3xl font-bold text-foreground">{fmt(erspartes)}&nbsp;€</p>
                    <Slider value={[erspartes]} onValueChange={([v]) => setErspartes(v)} min={0} max={200000} step={1000} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 €</span><span>200.000 €</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Monatliche Sparrate</label>
                    <p className="text-center text-3xl font-bold text-foreground">{fmt(sparrate)}&nbsp;€</p>
                    <Slider value={[sparrate]} onValueChange={([v]) => setSparrate(v)} min={0} max={2000} step={25} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 €</span><span>2.000 €</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={prev} className="px-5 py-4 rounded-xl border border-border text-muted-foreground hover:bg-muted/50 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    Ergebnis anzeigen <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="space-y-2 text-center">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dein Ergebnis</h1>
                  <p className="text-muted-foreground text-sm">Basierend auf deinen Angaben – vereinfacht berechnet.</p>
                </div>

                {/* Coverage bar */}
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        deckung >= 75 ? "bg-green-500" : deckung >= 50 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${deckung}%` }}
                    />
                  </div>
                  <p className={`text-sm font-medium ${
                    deckung >= 75 ? "text-green-700" : deckung >= 50 ? "text-yellow-700" : "text-red-700"
                  }`}>
                    Deine Rente deckt ca. {Math.round(deckung)}&nbsp;% deines Bedarfs
                  </p>
                </div>

                {/* Key figures */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/60 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Geschätzte Rente</p>
                    <p className="text-2xl font-bold text-foreground">{fmt(renteNetto)}&nbsp;€</p>
                    <p className="text-xs text-muted-foreground">pro Monat</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/60 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Dein Bedarf (75&nbsp;%)</p>
                    <p className="text-2xl font-bold text-foreground">{fmt(bedarf)}&nbsp;€</p>
                    <p className="text-xs text-muted-foreground">pro Monat</p>
                  </div>
                </div>

                {verbleibendeLuecke > 0 ? (
                  <div className="p-5 rounded-xl border-2 border-red-200 bg-red-50/50 text-center space-y-1">
                    <p className="text-xs text-muted-foreground">Deine Rentenlücke</p>
                    <p className="text-3xl font-bold text-red-600">{fmt(verbleibendeLuecke)}&nbsp;€</p>
                    <p className="text-sm text-muted-foreground">fehlen dir jeden Monat ab 67</p>
                  </div>
                ) : (
                  <div className="p-5 rounded-xl border-2 border-green-200 bg-green-50/50 text-center space-y-2">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                    <p className="font-semibold text-foreground">Keine Rentenlücke</p>
                    <p className="text-sm text-muted-foreground">Deine Versorgung sieht gut aus.</p>
                  </div>
                )}

                <div className="space-y-3">
                  <Link
                    to="/reicht-meine-rente"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    Zurück zur Übersicht <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setStep(0)}
                    className="w-full px-6 py-3 rounded-xl border border-border text-muted-foreground text-sm hover:bg-muted/50 transition-colors"
                  >
                    Nochmal berechnen
                  </button>
                </div>

                <p className="text-xs text-muted-foreground/70 text-center leading-relaxed">
                  Vereinfachte Schätzung auf Basis gesetzlicher Rente und 6&nbsp;% Rendite p.&thinsp;a. Keine Anlageberatung.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RentenCheckPage;
