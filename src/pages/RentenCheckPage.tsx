import { useState } from "react";
import PageHead from "@/components/seo/PageHead";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

const fmt = (n: number) =>
  n.toLocaleString("de-DE", { maximumFractionDigits: 0 });

const stepLabels = ["Alter", "Einkommen", "Sparen"];

const RentenCheckPage = () => {
  const [step, setStep] = useState(0);
  const [alter, setAlter] = useState(35);
  const [einkommen, setEinkommen] = useState(3000);
  const [erspartes, setErspartes] = useState(0);
  const [sparrate, setSparrate] = useState(0);

  const jahreRente = 67 - alter;
  const durchschnittslohn = 45358;
  const entgeltpunkte = ((einkommen * 12) / durchschnittslohn) * Math.min(jahreRente + 10, 45);
  const renteNetto = entgeltpunkte * 39.32 * 0.87;
  const bedarf = einkommen * 0.75;
  const luecke = Math.max(bedarf - renteNetto, 0);

  const r = 0.06 / 12;
  const n = jahreRente * 12;
  const kapitalSpar = n > 0 && r > 0
    ? sparrate * ((Math.pow(1 + r, n) - 1) / r) + erspartes * Math.pow(1 + r, n)
    : erspartes;
  const renteAusSpar = kapitalSpar / (18 * 12);
  const verbleibendeLuecke = Math.max(luecke - renteAusSpar, 0);
  const deckung = bedarf > 0 ? Math.min(((renteNetto + renteAusSpar) / bedarf) * 100, 100) : 100;

  const navigate = useNavigate();
  const next = () => setStep((s) => Math.min(s + 1, 2));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const showResult = () => {
    navigate("/renten-check/result", {
      state: { luecke: verbleibendeLuecke, renteNetto, bedarf, deckung, alter },
    });
  };

  return (
    <>
      <PageHead
        title="Renten-Check – Reicht meine Rente?"
        description="Schneller Renten-Check: Finde in unter 60 Sekunden heraus, ob deine Rente reicht."
        path="/renten-check"
      />

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Flow header */}
        <div className="w-full border-b border-border/30">
          <div className="max-w-lg mx-auto px-6 py-3 flex items-center justify-between">
            <Link to="/reicht-meine-rente" className="text-sm font-semibold text-foreground tracking-tight hover:opacity-70 transition-opacity">
              Renten-Check
            </Link>
            <p className="text-xs text-muted-foreground">Schritt 2 von 3</p>
          </div>
        </div>

        {/* Progress steps */}
        <div className="w-full bg-muted/40 border-b border-border/40">
          <div className="max-w-lg mx-auto px-6 py-4">
            {/* Progress bar */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / stepLabels.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${
                      i < step
                        ? "bg-primary text-primary-foreground"
                        : i === step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < step ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span className={`text-xs ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
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
                    onClick={showResult}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    Ergebnis anzeigen <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border/30 py-4 px-6">
          <p className="text-xs text-muted-foreground/50 text-center">
            Renten-Check · Vereinfachte Schätzung · Keine Anlageberatung
          </p>
        </div>
      </div>
    </>
  );
};

export default RentenCheckPage;
