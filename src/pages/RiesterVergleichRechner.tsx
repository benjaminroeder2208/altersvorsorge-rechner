import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";
import BlogDisclaimer from "@/components/blog/BlogDisclaimer";
import BlogNewsletterWidget from "@/components/blog/BlogNewsletterWidget";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Child, berechneKinderzulage } from "@/lib/foerderung";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/riester-vergleich-rechner";
const RENTENALTER = 67;
const AUSZAHLUNGSJAHRE = 25; // 67 → 92
const STEUER_RENTNER = 0.25; // Annahme durchschnittlicher Grenzsteuersatz im Ruhestand

const jsonLd = [
  {
    "@type": "WebApplication",
    "@id": `${BASE}${PATH}#webapp`,
    name: "Riester vs. Altersvorsorgedepot Rechner",
    url: `${BASE}${PATH}`,
    description:
      "Vergleiche Riester-Rente vs. Altersvorsorgedepot: Berechne dein Vermögen zum Renteneintritt mit beiden Systemen.",
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "RetirementCalculator",
    inLanguage: "de-DE",
    isAccessibleForFree: true,
    browserRequirements: "Requires JavaScript. Best in modern browsers.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com", url: `${BASE}/` },
  },
  {
    "@type": "BreadcrumbList",
    "@id": `${BASE}${PATH}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Riester vs. Altersvorsorgedepot Rechner", item: `${BASE}${PATH}` },
    ],
  },
];

/* ── Formatters ── */
const fmtEur = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
    Math.round(n),
  );
const fmtPct = (n: number) => `${n.toLocaleString("de-DE", { maximumFractionDigits: 2 })} %`;

/* ── Finance helper ── */
/** Future value of a yearly contribution (end of year) at effective annual rate */
const futureValueAnnual = (yearlyContribution: number, rate: number, years: number) => {
  if (years <= 0) return 0;
  if (rate === 0) return yearlyContribution * years;
  return (yearlyContribution * (Math.pow(1 + rate, years) - 1)) / rate;
};

interface InputRowProps {
  id: string;
  label: string;
  help: string;
  min: number;
  max: number;
  step: number;
  value: number;
  suffix?: string;
  onChange: (v: number) => void;
  decimals?: number;
}

const InputRow = ({ id, label, help, min, max, step, value, suffix, onChange, decimals = 0 }: InputRowProps) => (
  <div className="space-y-2">
    <div className="flex items-baseline justify-between gap-3">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="flex items-center gap-1">
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (!Number.isFinite(v)) return;
            onChange(Math.min(max, Math.max(min, v)));
          }}
          className="h-9 w-24 text-right text-sm tabular-nums"
        />
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
    <Slider
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={(v) => onChange(Number(v[0].toFixed(decimals)))}
    />
    <p className="text-xs text-muted-foreground">{help}</p>
  </div>
);

const RiesterVergleichRechner = () => {
  const [alter, setAlter] = useState(35);
  const [monatlich, setMonatlich] = useState(150);
  const [kinder, setKinder] = useState<Child[]>([
    { birthYear: new Date().getFullYear() - 5, kindergeldBis: 18 },
  ]);
  const [rendite, setRendite] = useState(7); // %
  const [kostenRiester, setKostenRiester] = useState(1.5); // %
  const [kostenDepot, setKostenDepot] = useState(1.0); // %

  const result = useMemo(() => {
    const jahre = Math.max(0, RENTENALTER - alter);
    const eigenJahr = monatlich * 12;

    // Riester
    const riesterGrundzulage = 175;
    const kinderzulage = kinder * 300;
    const riesterJahresbeitrag = eigenJahr + riesterGrundzulage + kinderzulage;
    const riesterEffRendite = (rendite - kostenRiester) / 100;
    const riesterEnd = futureValueAnnual(riesterJahresbeitrag, riesterEffRendite, jahre);
    const riesterMonatlich = riesterEnd / (AUSZAHLUNGSJAHRE * 12);
    // 80% steuerpflichtig (vereinfacht), Grenzsteuersatz im Ruhestand
    const riesterNetto = riesterMonatlich * (1 - 0.8 * STEUER_RENTNER);

    // Altersvorsorgedepot
    const depotGrundzulage = 540;
    const depotJahresbeitrag = eigenJahr + depotGrundzulage + kinderzulage;
    const depotEffRendite = (rendite - kostenDepot) / 100;
    const depotEnd = futureValueAnnual(depotJahresbeitrag, depotEffRendite, jahre);
    const depotMonatlich = depotEnd / (AUSZAHLUNGSJAHRE * 12);
    // Nachgelagerte Besteuerung ähnlich, hier vereinfacht steuerfrei für brutto-Vergleich;
    // Hinweistext erklärt den Vergleich.
    const depotNetto = depotMonatlich;

    return {
      jahre,
      riester: {
        eigenJahr,
        grundzulage: riesterGrundzulage,
        kinderzulage,
        jahresbeitrag: riesterJahresbeitrag,
        effRendite: riesterEffRendite * 100,
        endkapital: riesterEnd,
        monatlich: riesterMonatlich,
        netto: riesterNetto,
      },
      depot: {
        eigenJahr,
        grundzulage: depotGrundzulage,
        kinderzulage,
        jahresbeitrag: depotJahresbeitrag,
        effRendite: depotEffRendite * 100,
        endkapital: depotEnd,
        monatlich: depotMonatlich,
        netto: depotNetto,
      },
      diffKapital: depotEnd - riesterEnd,
      diffMonatlich: depotNetto - riesterNetto,
    };
  }, [alter, monatlich, kinder, rendite, kostenRiester, kostenDepot]);

  const depotBesser = result.diffKapital >= 0;

  return (
    <>
      <PageHead
        title="Riester vs. Altersvorsorgedepot Rechner: Welcher ist besser?"
        description="Vergleiche Riester-Rente vs. Altersvorsorgedepot: Berechne dein Vermögen nach 30 Jahren mit beiden Systemen."
        path={PATH}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container max-w-4xl mx-auto px-6">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Riester Vergleich</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <Badge variant="secondary" className="mb-4 text-xs font-medium">
              Kostenlos &amp; unverbindlich
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
              Riester vs. Altersvorsorgedepot: Welcher ist besser für dich?
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
              Vergleiche bei gleichem Eigenbeitrag, was Riester-Rente und das neue Altersvorsorgedepot bis zum Renteneintritt aus deinem Geld machen — inklusive staatlicher Förderung, Kosten und Steuern.
            </p>
          </AnimatedSection>

          {/* Inputs */}
          <section className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-10 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Deine Annahmen</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <InputRow
                id="alter"
                label="Dein aktuelles Alter"
                help={`Berechnung bis Renteneintritt (${RENTENALTER} Jahre) — verbleibend: ${result.jahre} Jahre`}
                min={20}
                max={60}
                step={1}
                value={alter}
                suffix="J."
                onChange={setAlter}
              />
              <InputRow
                id="monatlich"
                label="Monatlich sparen"
                help="Der gleiche Eigenbeitrag für Riester und Altersvorsorgedepot."
                min={50}
                max={500}
                step={10}
                value={monatlich}
                suffix="€"
                onChange={setMonatlich}
              />
              <InputRow
                id="kinder"
                label="Anzahl Kinder"
                help="Beeinflusst die Kinderzulagen (300 €/Kind/Jahr) bei beiden Systemen."
                min={0}
                max={5}
                step={1}
                value={kinder}
                onChange={setKinder}
              />
              <InputRow
                id="rendite"
                label="Erwartete Rendite p.a."
                help="Historischer MSCI-World Durchschnitt: ~7 % p.a."
                min={1}
                max={12}
                step={0.5}
                value={rendite}
                suffix="%"
                onChange={setRendite}
                decimals={1}
              />
              <InputRow
                id="kostenRiester"
                label="Riester-Kosten p.a."
                help="Typischer Bereich: 0,8 – 2 %. Deine Riester kann unterschiedlich sein."
                min={0.5}
                max={3}
                step={0.1}
                value={kostenRiester}
                suffix="%"
                onChange={setKostenRiester}
                decimals={1}
              />
              <InputRow
                id="kostenDepot"
                label="Altersvorsorgedepot-Kosten p.a."
                help="z. B. 1,0 % p.a. (max. Kostenquote für Standardprodukt)"
                min={0.1}
                max={3}
                step={0.1}
                value={kostenDepot}
                suffix="%"
                onChange={setKostenDepot}
                decimals={1}
              />
            </div>
          </section>

          {/* Side-by-Side Results */}
          <section className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Riester */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Riester-Rente
                </h3>
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground tabular-nums">
                {fmtEur(result.riester.endkapital)}
              </p>
              <p className="text-sm text-muted-foreground mb-4">Vermögen zum Renteneintritt ({RENTENALTER})</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Monatliche Auszahlung (25 J.)</span><span className="font-semibold tabular-nums">{fmtEur(result.riester.monatlich)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Nach Steuern (≈)</span><span className="font-semibold tabular-nums">{fmtEur(result.riester.netto)}</span></div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">80 % der Auszahlung steuerpflichtig (vereinfacht, Grenzsteuersatz {Math.round(STEUER_RENTNER * 100)} %).</p>
            </div>

            {/* Depot */}
            <div className={`rounded-2xl border p-6 md:p-8 ${depotBesser ? "border-primary/40 bg-primary/5" : "border-border bg-card"}`}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Altersvorsorgedepot
                </h3>
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground tabular-nums">
                {fmtEur(result.depot.endkapital)}
              </p>
              <p className="text-sm text-muted-foreground mb-4">Vermögen zum Renteneintritt ({RENTENALTER})</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Monatliche Auszahlung (25 J.)</span><span className="font-semibold tabular-nums">{fmtEur(result.depot.monatlich)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Nach Steuern (≈)</span><span className="font-semibold tabular-nums">{fmtEur(result.depot.netto)}</span></div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Auch beim Altersvorsorgedepot ist die Auszahlung nachgelagert besteuert. Vereinfachte Darstellung ohne Steuerabzug — siehe Hinweise unten.</p>
            </div>
          </section>

          {/* Differenz-Highlight */}
          <div className="rounded-2xl border border-border bg-secondary p-5 md:p-6 mb-12 text-center">
            {depotBesser ? (
              <>
                <p className="text-sm text-muted-foreground mb-1">Das Altersvorsorgedepot bringt dir in dieser Rechnung</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">
                  {fmtEur(Math.abs(result.diffKapital))} <span className="text-base font-medium text-muted-foreground">mehr Vermögen</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Das entspricht rund <strong className="text-foreground">{fmtEur(Math.abs(result.diffMonatlich))}</strong> mehr pro Monat (nach Steuern).
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-1">Mit deinen Annahmen liegt die Riester-Rente vorne</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">
                  {fmtEur(Math.abs(result.diffKapital))} <span className="text-base font-medium text-muted-foreground">mehr Vermögen</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Das entspricht rund <strong className="text-foreground">{fmtEur(Math.abs(result.diffMonatlich))}</strong> mehr pro Monat (nach Steuern).
                </p>
              </>
            )}
          </div>

          {/* Detailed comparison */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
              Detaillierter Vergleich
            </h2>
            <div className="overflow-x-auto -mx-6 px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[220px]">Merkmal</TableHead>
                    <TableHead className="text-right">Riester-Rente</TableHead>
                    <TableHead className="text-right">Altersvorsorgedepot</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Monatlicher Eigenbeitrag</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtEur(monatlich)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtEur(monatlich)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Staatliche Grundförderung p.a.</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtEur(result.riester.grundzulage)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtEur(result.depot.grundzulage)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Kinderzulagen p.a. ({kinder} × 300 €)</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtEur(result.riester.kinderzulage)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtEur(result.depot.kinderzulage)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jährlicher Gesamtbeitrag</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtEur(result.riester.jahresbeitrag)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtEur(result.depot.jahresbeitrag)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rendite p.a.</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtPct(rendite)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtPct(rendite)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Kosten p.a.</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtPct(kostenRiester)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtPct(kostenDepot)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Effektive Rendite</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtPct(result.riester.effRendite)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtPct(result.depot.effRendite)}</TableCell>
                  </TableRow>
                  <TableRow className="bg-primary/5">
                    <TableCell className="font-semibold">Vermögen mit {RENTENALTER}</TableCell>
                    <TableCell className="text-right font-bold text-foreground tabular-nums">{fmtEur(result.riester.endkapital)}</TableCell>
                    <TableCell className="text-right font-bold text-primary tabular-nums">{fmtEur(result.depot.endkapital)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Monatliche Auszahlung (25 Jahre)</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtEur(result.riester.monatlich)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtEur(result.depot.monatlich)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Besteuerung</TableCell>
                    <TableCell className="text-right">80 % steuerpflichtig</TableCell>
                    <TableCell className="text-right">nachgelagert</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Nach Steuern ({Math.round(STEUER_RENTNER * 100)} % Grenzsteuersatz)</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtEur(result.riester.netto)}/Mo.</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtEur(result.depot.netto)}/Mo.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Info Cards */}
          <section className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Für Riester spricht</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
                <li>Staatliche Grundzulage (175 €) + Kinderzulagen automatisch.</li>
                <li>Beitragsgarantie — dein eingezahltes Kapital ist geschützt.</li>
                <li>Planbare lebenslange Rente, Pfändungsschutz in der Ansparphase.</li>
              </ul>
              <p className="text-xs text-muted-foreground pt-1">Nachteile: höhere Kosten und geringere Renditechance durch Garantie.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Für das Altersvorsorgedepot spricht</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
                <li>Höhere Grundzulage (bis 540 €) + gleiche Kinderzulagen.</li>
                <li>Volle Aktienquote möglich — höhere Renditechance.</li>
                <li>Niedrigere Kosten, einfacher Anbieterwechsel.</li>
              </ul>
              <p className="text-xs text-muted-foreground pt-1">Nachteile: keine Beitragsgarantie, Marktrisiko während der Ansparphase.</p>
            </div>
          </section>

          {/* Related links */}
          <div className="mb-12">
            <p className="text-sm font-semibold mb-4">Weiterlesen</p>
            <div className="space-y-2">
              <Link to="/blog/riester-rente" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Riester-Rente 2026: Lohnt sich das noch?</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/fruehstart-rente-rechner" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Frühstart-Rente für Kinder berechnen</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            </div>
          </div>

          <BlogNewsletterWidget />

          {/* Hinweis zu Annahmen */}
          <div className="mt-8 p-5 bg-muted/50 border border-border/60 rounded-xl space-y-3 text-sm text-muted-foreground">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Annahmen dieser Berechnung</p>
            <p>
              Vereinfachte Modellrechnung mit konstanter Rendite und konstanten Kosten, ohne Inflation. Beiträge inkl. Zulagen werden jeweils einmal pro Jahr verzinst. Die Auszahlung verteilt das Endkapital linear auf 25 Jahre (Renteneintritt {RENTENALTER}, Bezugsdauer bis 92) ohne weitere Verzinsung in der Entnahmephase. Die Renditeannahme orientiert sich am historischen Durchschnitt breit gestreuter Aktienindizes (siehe{" "}
              <a href="https://www.dai.de/detail/msci-world-rendite-dreieck-fuer-die-monatliche-geldanlage-1" target="_blank" rel="noopener noreferrer" className="underline">MSCI-World-Renditedreieck des Deutschen Aktieninstituts</a>) und ist keine Prognose.
            </p>
            <p>
              <strong className="text-foreground">Besteuerung Riester:</strong> Auszahlungen werden zu rund 80 % mit dem persönlichen Steuersatz im Ruhestand besteuert. Hier vereinfacht mit {Math.round(STEUER_RENTNER * 100)} % Grenzsteuersatz angenommen.
            </p>
            <p>
              <strong className="text-foreground">Besteuerung Altersvorsorgedepot:</strong> Auch das Altersvorsorgedepot wird in der Auszahlungsphase nachgelagert besteuert. Für den direkten Brutto-Vergleich ist die Nettoauszahlung hier ohne Steuerabzug dargestellt — die effektive Steuerlast hängt von Auszahlungsform und Gesamteinkommen ab und kann individuell sehr unterschiedlich ausfallen.
            </p>
          </div>

          <BlogDisclaimer mitRechnung />
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default RiesterVergleichRechner;
