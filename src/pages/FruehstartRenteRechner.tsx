import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Info } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";
import BlogDisclaimer from "@/components/blog/BlogDisclaimer";
import BlogNewsletterWidget from "@/components/blog/BlogNewsletterWidget";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/fruehstart-rente-rechner";

const CURRENT_YEAR = 2026;
const FOERDER_START = 2027;
const FOERDER_END_AGE = 18;
const FOERDER_START_AGE = 6;
const STAAT_MONATLICH = 10;
const RENTENBEGINN = 67;
const AUSZAHLUNG_JAHRE = 25;

const jsonLd = [
  {
    "@type": "WebApplication",
    name: "Frühstart-Rente Rechner",
    url: `${BASE}${PATH}`,
    description:
      "Berechne kostenlos, wie viel Vermögen dein Kind mit der Frühstart-Rente bis zur Rente aufbaut.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE}/` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Frühstart-Rente Rechner",
        item: `${BASE}${PATH}`,
      },
    ],
  },
];

const fmtEur = (v: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(v)));

interface CalcResult {
  jahreFoerderung: number;
  staatContrib: number;
  elternContrib: number;
  kapital18: number;
  renditeBis18: number;
  kapital67: number;
  renditeBis67: number;
  monatlicheRente: number;
  startJahrFoerderung: number;
  endJahrFoerderung: number;
}

function calc(birthYear: number, elternMonatlich: number, renditePct: number): CalcResult {
  // Förderzeit: vom Maximum aus (Förderstart 2027, Kind 6 Jahre) bis einschließlich Jahr vor 18. Geburtstag
  const startAlterEffektiv = Math.max(FOERDER_START_AGE, FOERDER_START - birthYear);
  const jahreFoerderung = Math.max(0, FOERDER_END_AGE + 1 - startAlterEffektiv);
  const startJahrFoerderung = birthYear + startAlterEffektiv;
  const endJahrFoerderung = startJahrFoerderung + jahreFoerderung - 1;

  const r = renditePct / 100;
  const rm = r / 12;
  const n = jahreFoerderung * 12;
  const pmt = STAAT_MONATLICH + elternMonatlich;

  // FV einer monatlichen Annuität (Einzahlung am Monatsende)
  const kapital18 = rm > 0 ? pmt * ((Math.pow(1 + rm, n) - 1) / rm) : pmt * n;

  const staatContrib = STAAT_MONATLICH * 12 * jahreFoerderung;
  const elternContrib = elternMonatlich * 12 * jahreFoerderung;
  const renditeBis18 = kapital18 - staatContrib - elternContrib;

  const jahreBis67 = RENTENBEGINN - FOERDER_END_AGE;
  const kapital67 = kapital18 * Math.pow(1 + r, jahreBis67);
  const renditeBis67 = kapital67 - kapital18;

  // Monatliche Auszahlung über 25 Jahre (Annuitätenformel)
  const nA = AUSZAHLUNG_JAHRE * 12;
  const monatlicheRente =
    rm > 0
      ? (kapital67 * rm) / (1 - Math.pow(1 + rm, -nA))
      : kapital67 / nA;

  return {
    jahreFoerderung,
    staatContrib,
    elternContrib,
    kapital18,
    renditeBis18,
    kapital67,
    renditeBis67,
    monatlicheRente,
    startJahrFoerderung,
    endJahrFoerderung,
  };
}

interface NumberFieldProps {
  label: string;
  helper: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit?: string;
  onChange: (v: number) => void;
  id: string;
}

const NumberField = ({
  label,
  helper,
  min,
  max,
  step,
  value,
  unit,
  onChange,
  id,
}: NumberFieldProps) => {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id={id}
            type="number"
            inputMode="numeric"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (!Number.isNaN(n)) onChange(clamp(n));
            }}
            className="w-28 h-9 text-right text-sm"
          />
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(clamp(v[0]))}
      />
      <p className="text-xs text-muted-foreground flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-70" />
        <span>{helper}</span>
      </p>
    </div>
  );
};

const FruehstartRenteRechner = () => {
  const [birthYear, setBirthYear] = useState(2026);
  const [eltern, setEltern] = useState(50);
  const [rendite, setRendite] = useState(7);

  const result = useMemo(() => calc(birthYear, eltern, rendite), [birthYear, eltern, rendite]);

  return (
    <>
      <PageHead
        title="Frühstart-Rente Rechner: Berechne das Vermögen deines Kindes"
        description="Berechne, wie viel Vermögen dein Kind mit der Frühstart-Rente bis zur Rente aufbaut. Kostenlos und ohne Anmeldung."
        path={PATH}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container max-w-3xl mx-auto px-6">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Tools</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Frühstart-Rente Rechner</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <Badge variant="secondary" className="mb-4 text-xs font-medium">
              Kostenlos &amp; ohne Anmeldung
            </Badge>
            <h1
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              Frühstart-Rente Rechner: Wie viel spart dein Kind bis zur Rente?
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
              Berechne, wie viel Vermögen dein Kind mit der Frühstart-Rente bis zur Rente aufbaut.
              Der Staat zahlt 10&nbsp;€ pro Monat – du kannst zusätzlich einzahlen.
            </p>
          </AnimatedSection>

          {/* Inputs */}
          <section className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-8">
            <NumberField
              id="birthYear"
              label="Geburtsjahr des Kindes"
              helper="Kinder ab Jahrgang 2020 bekommen Förderung ab 2027 (phasenweise Einführung)."
              min={2015}
              max={2025}
              step={1}
              value={birthYear}
              onChange={setBirthYear}
            />
            <NumberField
              id="eltern"
              label="Zusätzlich pro Monat einzahlen (Eltern / Großeltern)"
              helper="Der Staat zahlt 10 €/Monat automatisch dazu."
              min={0}
              max={500}
              step={10}
              value={eltern}
              unit="€"
              onChange={setEltern}
            />
            <NumberField
              id="rendite"
              label="Erwartete Rendite p. a."
              helper="Historischer Durchschnitt breit gestreuter Aktienindizes ≈ 7 % p. a. (keine Prognose)."
              min={1}
              max={12}
              step={0.5}
              value={rendite}
              unit="%"
              onChange={setRendite}
            />
          </section>

          {/* Ergebnis */}
          <section className="mt-10 space-y-6">
            <h2
              className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Dein Ergebnis
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  Kapital mit 18 Jahren
                </p>
                <p className="text-2xl md:text-3xl font-bold text-foreground transition-all">
                  {fmtEur(result.kapital18)}
                </p>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  Kapital mit 67 (Renteneintritt)
                </p>
                <p className="text-2xl md:text-3xl font-bold text-primary transition-all">
                  {fmtEur(result.kapital67)}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  Monatliche Rente (25&nbsp;J.)
                </p>
                <p className="text-2xl md:text-3xl font-bold text-foreground transition-all">
                  {fmtEur(result.monatlicheRente)}
                </p>
              </div>
            </div>

            {/* Breakdown-Tabelle */}
            <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <p className="text-sm font-semibold text-foreground mb-4">Aufschlüsselung</p>
              <div className="overflow-x-auto -mx-5 md:-mx-6 px-5 md:px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Komponente</TableHead>
                      <TableHead className="text-right">Betrag</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        Staat-Förderung (10 €/Monat × {result.jahreFoerderung}&nbsp;Jahre)
                      </TableCell>
                      <TableCell className="text-right">{fmtEur(result.staatContrib)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Eltern-Zusatzbeiträge</TableCell>
                      <TableCell className="text-right">{fmtEur(result.elternContrib)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rendite bis 18 Jahre</TableCell>
                      <TableCell className="text-right">{fmtEur(result.renditeBis18)}</TableCell>
                    </TableRow>
                    <TableRow className="border-t-2">
                      <TableCell className="font-semibold">Subtotal mit 18 Jahren</TableCell>
                      <TableCell className="text-right font-semibold">
                        {fmtEur(result.kapital18)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rendite bis 67 (ohne neue Einzahlungen)</TableCell>
                      <TableCell className="text-right">{fmtEur(result.renditeBis67)}</TableCell>
                    </TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-bold">Gesamt zum Renteneintritt (67)</TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        {fmtEur(result.kapital67)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Förderzeitraum: <strong className="text-foreground">{result.startJahrFoerderung}–{result.endJahrFoerderung}</strong>{" "}
                ({result.jahreFoerderung} Jahre staatliche Einzahlung). Anschließend wächst das
                Kapital bis zum Renteneintritt mit&nbsp;67 weiter am Kapitalmarkt.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Bei einer angenommenen Auszahlung über 25&nbsp;Jahre entspricht das Endkapital
                einer monatlichen Zusatzrente von{" "}
                <strong className="text-foreground">{fmtEur(result.monatlicheRente)}</strong>.
              </p>
            </div>

            <div className="rounded-2xl bg-muted/50 border border-border/60 p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">💡 Tipp:</strong> Je früher du anfängst, desto
                mehr Zeit hat das Geld, um über den Zinseszinseffekt zu wachsen. Schon kleine
                zusätzliche Beiträge können über Jahrzehnte hinweg den Endbetrag deutlich erhöhen.
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Diese Berechnung basiert auf vereinfachten Annahmen (konstante Rendite, keine
                Inflation, keine Kosten, keine Steuern). Tatsächliche Ergebnisse können erheblich
                abweichen. Renditeannahme orientiert sich am historischen Durchschnitt breit
                gestreuter Aktienindizes, siehe{" "}
                <a
                  href="https://www.dai.de/detail/msci-world-rendite-dreieck-fuer-die-monatliche-geldanlage-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  MSCI-World-Renditedreieck des Deutschen Aktieninstituts
                </a>
                .
              </p>
            </div>
          </section>

          <BlogDisclaimer mitRechnung />

          {/* CTA Links */}
          <section className="mt-12">
            <p className="text-sm font-semibold mb-4">Weiterführende Themen</p>
            <div className="space-y-2">
              <Link
                to="/blog/fruehstart-rente"
                className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm"
              >
                <span className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-muted-foreground" />
                  Mehr über die Frühstart-Rente
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link
                to="/blog/altersvorsorgedepot-2027"
                className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm"
              >
                <span>Altersvorsorgedepot für Erwachsene ab 2027</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link
                to="/"
                className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm"
              >
                <span>Altersvorsorge-Rechner für Erwachsene</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            </div>
          </section>

          <BlogNewsletterWidget />
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default FruehstartRenteRechner;
