import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    const sparMitFoerderung = n > 0 ? (kapitalbedarf * r) / ((Math.pow(1 + r, n) - 1) * 1.35) : 0;
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

  const deckungColor =
    result.deckung >= 75
      ? "bg-green-500"
      : result.deckung >= 50
      ? "bg-yellow-500"
      : "bg-red-500";

  const deckungTextColor =
    result.deckung >= 75
      ? "text-green-700"
      : result.deckung >= 50
      ? "text-yellow-700"
      : "text-red-700";

  return (
    <div className="space-y-10">
      {/* Inputs */}
      <div className="space-y-8">
        {/* GRUPPE 1 — Alter */}
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-sm font-medium text-foreground">Dein aktuelles Alter</label>
            <span className="text-2xl font-bold text-foreground">{alter} Jahre</span>
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
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Einkommen</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* GRUPPE 2 — Bruttogehalt */}
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-sm font-medium text-foreground">Bruttogehalt pro Monat</label>
            <span className="text-2xl font-bold text-foreground">{fmt(brutto)} €</span>
          </div>
          <Slider
            value={[brutto]}
            onValueChange={([v]) => {
              setBrutto(v);
              if (netto > v - 100) setNetto(Math.max(v - 100, 1000));
            }}
            min={1500}
            max={10000}
            step={100}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1.500 €</span><span>10.000 €</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">für Rentenberechnung</p>
        </div>

        {/* Nettogehalt */}
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-sm font-medium text-foreground">Nettogehalt pro Monat</label>
            <span className="text-2xl font-bold text-foreground">{fmt(clampedNetto)} €</span>
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
          <div className="mt-3 p-3 rounded-lg border border-primary/20 bg-primary/5">
            <p className="text-xs text-muted-foreground leading-relaxed">
              💡 Du findest dein Nettoeinkommen auf deiner Gehaltsabrechnung unter „Auszahlungsbetrag".
            </p>
          </div>
        </div>

        {/* Separator — Bedarf im Alter */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Bedarf im Alter</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* GRUPPE 3 — Bedarf */}
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-sm font-medium text-foreground">Gewünschter Rentenbedarf</label>
            <span className="text-2xl font-bold text-foreground">{bedarf} %</span>
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

      {/* Result cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Geschätzte gesetzliche Rente</p>
            <p className="text-2xl font-bold text-foreground">{fmt(result.renteMonatNetto)} €</p>
            <p className="text-xs text-muted-foreground">monatlich netto ab 67</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Dein monatlicher Bedarf</p>
            <p className="text-2xl font-bold text-foreground">{fmt(result.bedarfMonat)} €</p>
            <p className="text-xs text-muted-foreground">{bedarf} % des Nettos</p>
          </CardContent>
        </Card>
        <Card className={`border-2 ${result.luecke > 0 ? "border-red-300 bg-red-50/50" : "border-green-300 bg-green-50/50"}`}>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Deine Rentenlücke</p>
            <p className={`text-2xl font-bold ${result.luecke > 0 ? "text-red-600" : "text-green-600"}`}>
              {result.luecke > 0 ? `${fmt(result.luecke)} €` : "0 €"}
            </p>
            <p className="text-xs text-muted-foreground">pro Monat</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
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
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2" style={{ letterSpacing: "-0.02em" }}>
              So schließt du deine Lücke
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Um {fmt(result.luecke)} € monatlich von 67 bis 85 auszuzahlen, brauchst du ein Kapital von rund{" "}
              <strong className="text-foreground">{fmt(result.kapitalbedarf)} €</strong> zum Rentenbeginn.
              Das erfordert bei {result.jahre} Jahren Ansparzeit:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card className="border-2 border-primary bg-primary/5">
              <CardContent className="p-5">
                <Badge className="mb-3 bg-primary/10 text-primary border-0 text-xs">
                  inkl. staatliche Förderung
                </Badge>
                <p className="text-xs text-muted-foreground mb-1">Mit Altersvorsorgedepot</p>
                <p className="text-3xl font-bold text-primary">{fmt(result.sparMitFoerderung)} €</p>
                <p className="text-xs text-muted-foreground">pro Monat</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground mb-1 mt-7">Ohne Förderung</p>
                <p className="text-3xl font-bold text-foreground">{fmt(result.sparOhneFoerderung)} €</p>
                <p className="text-xs text-muted-foreground">pro Monat · normaler ETF-Sparplan</p>
              </CardContent>
            </Card>
          </div>

          <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
            <p className="text-sm text-foreground">
              Durch die staatliche Förderung sparst du monatlich{" "}
              <strong>{fmt(result.sparOhneFoerderung - result.sparMitFoerderung)} €</strong> Eigenbeitrag — für dasselbe Ziel.
            </p>
          </div>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Altersvorsorgedepot detailliert berechnen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
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
