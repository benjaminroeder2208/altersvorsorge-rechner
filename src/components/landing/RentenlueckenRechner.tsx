import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CalculatorNumberControl from "@/components/landing/CalculatorNumberControl";
import ChapterHeading from "@/components/landing/ChapterHeading";
import { trackEvent } from "@/lib/analytics";

const fmt = (n: number) =>
  n.toLocaleString("de-DE", { maximumFractionDigits: 0 });

const RentenlueckenRechner = () => {
  const [alter, setAlter] = useState(35);
  const [brutto, setBrutto] = useState(3500);
  const [netto, setNetto] = useState(2300);
  const [bedarf, setBedarf] = useState(75);

  // Clamp netto when brutto changes
  const nettoMax = brutto - 100;
  const clampedNetto = Math.min(netto, nettoMax);

  const result = useMemo(() => {
    const durchschnittslohn = 45358;
    const rentenpunktWert = 39.32;
    const jahreEinzahlung = Math.min((67 - alter) + 10, 45);
    const entgeltpunkte = ((brutto * 12) / durchschnittslohn) * jahreEinzahlung;
    const renteMonatBrutto = entgeltpunkte * rentenpunktWert;
    const renteMonatNetto = renteMonatBrutto * 0.87;
    const bedarfMonat = clampedNetto * (bedarf / 100);
    const luecke = Math.max(bedarfMonat - renteMonatNetto, 0);
    const kapitalbedarf = luecke * 12 * 18;
    const r = 0.07 / 12;
    const n = (67 - alter) * 12;
    const sparOhneFoerderung = n > 0 ? (kapitalbedarf * r) / (Math.pow(1 + r, n) - 1) : 0;
    const sparMitFoerderung = n > 0 ? (kapitalbedarf * r) / ((Math.pow(1 + r, n) - 1) * 1.40) : 0;
    const deckung = bedarfMonat > 0 ? (renteMonatNetto / bedarfMonat) * 100 : 100;
    const jahre = 67 - alter;
    const nettoquote = brutto > 0 ? Math.round((clampedNetto / brutto) * 100) : 0;

    return {
      renteMonatNetto,
      bedarfMonat,
      luecke,
      kapitalbedarf,
      sparOhneFoerderung,
      sparMitFoerderung,
      deckung: Math.min(deckung, 100),
      jahre,
      nettoquote,
    };
  }, [alter, brutto, clampedNetto, bedarf]);

  // Track calculator usage (debounced) when inputs change
  useEffect(() => {
    const t = setTimeout(() => {
      trackEvent("calculator_used", {
        calculator_type: "pension_gap_calculator",
        age: alter,
        retirement_age: 67,
        brutto_monthly: brutto,
        netto_monthly: clampedNetto,
        bedarf_percent: bedarf,
      });
    }, 800);
    return () => clearTimeout(t);
  }, [alter, brutto, clampedNetto, bedarf]);

  const deckungColor =
    result.deckung >= 75
      ? "bg-success"
      : result.deckung >= 50
      ? "bg-brand-amber"
      : "bg-destructive";

  const deckungTextColor =
    result.deckung >= 75
      ? "text-success"
      : result.deckung >= 50
      ? "text-warning-foreground"
      : "text-destructive";

  return (
    <div className="space-y-12">
      <ChapterHeading number="02" label="Deine Annahmen"><h2 className="heading-section">Heute verstehen. Morgen planen.</h2></ChapterHeading>
      {/* Inputs */}
      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2 border-b border-border pb-12">
        {/* GRUPPE 1 — Alter */}
        <div>
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <label htmlFor="gap-alter" className="text-sm font-medium text-foreground">Dein aktuelles Alter</label>
            <CalculatorNumberControl id="gap-alter" label="Dein aktuelles Alter" value={alter} min={20} max={60} step={1} unit="J." onChange={setAlter} />
          </div>
          <Slider
            value={[alter]}
            onValueChange={([v]) => setAlter(v)}
            min={20}
            max={60}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>20</span><span>60</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{result.jahre} Jahre bis zur Rente</p>
        </div>

        {/* Separator — Einkommen */}
        <div className="flex items-center gap-3 md:col-span-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground uppercase ">Einkommen</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* GRUPPE 2 — Bruttogehalt */}
        <div>
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <label htmlFor="gap-brutto" className="text-sm font-medium text-foreground">Bruttogehalt pro Monat</label>
            <CalculatorNumberControl id="gap-brutto" label="Bruttogehalt pro Monat" value={brutto} min={1500} max={15000} step={100} unit="€" onChange={(v) => { setBrutto(v); if (netto > v - 100) setNetto(Math.max(v - 100, 1000)); }} />
          </div>
          <Slider
            value={[brutto]}
            onValueChange={([v]) => {
              setBrutto(v);
              if (netto > v - 100) setNetto(Math.max(v - 100, 1000));
            }}
            min={1500}
            max={15000}
            step={100}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1.500 €</span><span>15.000 €</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">für Rentenberechnung</p>
        </div>

        {/* Nettogehalt */}
        <div>
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <label htmlFor="gap-netto" className="text-sm font-medium text-foreground">Nettogehalt pro Monat</label>
            <CalculatorNumberControl id="gap-netto" label="Nettogehalt pro Monat" value={clampedNetto} min={1000} max={nettoMax} step={100} unit="€" onChange={setNetto} />
          </div>
          <Slider
            value={[clampedNetto]}
            onValueChange={([v]) => setNetto(v)}
            min={1000}
            max={nettoMax}
            step={100}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1.000 €</span><span>{fmt(nettoMax)} €</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">tatsächlich auf dem Konto</p>
          <div className="mt-3 p-3 rounded-lg border border-border bg-teal-soft/30">
            <p className="text-xs text-muted-foreground leading-relaxed">
              💡 Du findest dein Nettoeinkommen auf deiner Gehaltsabrechnung unter „Auszahlungsbetrag".
            </p>
          </div>
        </div>

        {/* Separator — Bedarf im Alter */}
        <div className="flex items-center gap-3 md:col-span-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground uppercase ">Bedarf im Alter</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* GRUPPE 3 — Bedarf */}
        <div>
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <label htmlFor="gap-bedarf" className="text-sm font-medium text-foreground">Gewünschter Rentenbedarf</label>
            <CalculatorNumberControl id="gap-bedarf" label="Gewünschter Rentenbedarf" value={bedarf} min={50} max={100} step={5} unit="%" onChange={setBedarf} />
          </div>
          <Slider
            value={[bedarf]}
            onValueChange={([v]) => setBedarf(v)}
            min={50}
            max={100}
            step={5}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>50 % des Nettos</span><span>100 %</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">= {fmt(result.bedarfMonat)} €/Monat</p>
        </div>
      </div>

      <ChapterHeading number="03" label="Dein Ergebnis"><h2 className="heading-section">Was im Ruhestand fehlt.</h2></ChapterHeading>
      {/* Result cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-lg border-border shadow-none">
          <CardContent className="p-5 text-left">
            <p className="text-xs text-muted-foreground mb-1">Geschätzte gesetzliche Rente</p>
            <p className="text-2xl font-bold text-foreground">{fmt(result.renteMonatNetto)} €</p>
            <p className="text-xs text-muted-foreground">monatlich netto ab 67</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border-border shadow-none">
          <CardContent className="p-5 text-left">
            <p className="text-xs text-muted-foreground mb-1">Dein monatlicher Bedarf</p>
            <p className="text-2xl font-bold text-foreground">{fmt(result.bedarfMonat)} €</p>
            <p className="text-xs text-muted-foreground">{bedarf} % des Nettos</p>
          </CardContent>
        </Card>
        <Card className={`rounded-lg shadow-none border ${result.luecke > 0 ? "border-border bg-coral-soft/30" : "border-border bg-teal-soft/30"}`}>
          <CardContent className="p-5 text-left">
            <p className="text-xs text-muted-foreground mb-1">Deine Rentenlücke</p>
            <p className={`text-2xl font-bold ${result.luecke > 0 ? "text-destructive" : "text-success"}`}>
              {result.luecke > 0 ? `${fmt(result.luecke)} €` : "0 €"}
            </p>
            <p className="text-xs text-muted-foreground">pro Monat</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border-border shadow-none">
          <CardContent className="p-5 text-left">
            <p className="text-xs text-muted-foreground mb-1">Deine Nettoquote</p>
            <p className="text-2xl font-bold text-foreground">{result.nettoquote} %</p>
            <p className="text-xs text-muted-foreground">Netto vom Brutto — {fmt(brutto - clampedNetto)} €/Monat Abzüge</p>
          </CardContent>
        </Card>
      </div>

      {/* Coverage bar */}
      <div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${deckungColor}`}
            style={{ width: `${result.deckung}%` }}
          />
        </div>
        <p className={`text-sm font-medium mt-2 ${deckungTextColor}`}>
          Rente deckt {Math.round(result.deckung)} % deines Bedarfs
        </p>
      </div>

      {/* Solution or no-gap */}
      {result.luecke > 0 ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold  mb-2">
              So schließt du deine Lücke
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Um {fmt(result.luecke)} € monatlich von 67 bis 85 auszuzahlen, brauchst du ein Kapital von rund{" "}
              <strong className="text-foreground">{fmt(result.kapitalbedarf)} €</strong> zum Rentenbeginn.
              Das erfordert bei {result.jahre} Jahren Ansparzeit:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card className="rounded-lg border-border bg-teal-soft/30 shadow-none">
              <CardContent className="p-5">
                <Badge className="mb-3 bg-teal-soft text-capital border-0 text-xs">
                  inkl. staatliche Förderung
                </Badge>
                <p className="text-xs text-muted-foreground mb-1">Mit Altersvorsorgedepot</p>
                <p className="text-3xl font-display font-bold text-capital">{fmt(result.sparMitFoerderung)} €</p>
                <p className="text-xs text-muted-foreground">pro Monat</p>
              </CardContent>
            </Card>
            <Card className="rounded-lg border-border shadow-none">
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground mb-1 mt-7">Ohne Förderung</p>
                <p className="text-3xl font-bold text-foreground">{fmt(result.sparOhneFoerderung)} €</p>
                <p className="text-xs text-muted-foreground">pro Monat · normaler ETF-Sparplan</p>
              </CardContent>
            </Card>
          </div>

          <div className="py-5 border-y border-border">
            <p className="text-sm text-foreground">
              Durch die staatliche Förderung sparst du monatlich{" "}
              <strong>{fmt(result.sparOhneFoerderung - result.sparMitFoerderung)} €</strong> Eigenbeitrag — für dasselbe Ziel.
            </p>
          </div>

          <Button asChild size="lg" className="w-full h-auto min-h-12 whitespace-normal py-3 text-center">
            <Link to="/">Altersvorsorgedepot detailliert berechnen <ArrowRight className="w-4 h-4 shrink-0" /></Link>
          </Button>
        </div>
      ) : (
        <div className="p-6 bg-teal-soft/30 border border-border rounded-lg text-center">
          <CheckCircle className="w-8 h-8 text-success mx-auto mb-3" />
          <p className="font-semibold text-foreground mb-1">Keine Rentenlücke bei diesen Werten</p>
          <p className="text-sm text-muted-foreground">
            Mit einem niedrigeren Bedarf deckt die gesetzliche Rente deine Ausgaben.
            Trotzdem kann privates Sparen die Sicherheit und Lebensqualität im Alter erhöhen.
          </p>
        </div>
      )}
    </div>
  );
};

export default RentenlueckenRechner;
