import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, ChevronDown } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/blog/altersvorsorge-portfolio";

const tocItems = [
  { id: "bausteine", label: "Die vier Bausteine im Überblick" },
  { id: "portfolio-1", label: "Portfolio 1: Der frühe Starter (25)" },
  { id: "portfolio-2", label: "Portfolio 2: Der Aufholer (40)" },
  { id: "portfolio-3", label: "Portfolio 3: Der Selbstständige (45)" },
  { id: "prinzipien", label: "Was alle drei gemeinsam haben" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Kann ich bAV und Altersvorsorgedepot gleichzeitig nutzen?",
    a: "Ja, absolut. Beide Produkte schließen sich nicht aus. Viele werden sinnvollerweise beides parallel nutzen — die bAV für den Arbeitgeberzuschuss und das Altersvorsorgedepot für die staatliche Zulage. Achte darauf, dass du die jeweiligen Fördergrenzen nicht überschreitest.",
  },
  {
    q: "Wie viel Prozent meines Einkommens sollte ich für die Altersvorsorge sparen?",
    a: "Die Faustregel lautet 10–15 % des Nettogehalts. Wichtiger als die exakte Prozentzahl ist aber, überhaupt anzufangen. Lieber 5 % heute als 15 % in fünf Jahren — der Zinseszinseffekt macht frühe, kleine Beträge wertvoller als späte, große.",
  },
  {
    q: "Was ist besser — viel in ein Produkt oder wenig in viele?",
    a: "Diversifikation über verschiedene Bausteine senkt das Risiko und maximiert Förderungen. Aber: Zu viele Produkte mit zu kleinen Beträgen lohnen sich nicht, weil die Fixkosten den Vorteil auffressen. Zwei bis drei Bausteine sind für die meisten optimal.",
  },
  {
    q: "Sollte ich zuerst Schulden tilgen oder für die Rente sparen?",
    a: "Konsumschulden (Kreditkarte, Dispo) immer zuerst tilgen — die Zinsen sind höher als jede realistische Rendite. Bei günstigen Krediten (z. B. Immobilienfinanzierung < 3 %) kann es sinnvoll sein, parallel zu sparen, weil der Zinseszinseffekt bei langen Laufzeiten stark wirkt.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Wie sieht ein gutes Altersvorsorge-Portfolio aus? Drei Beispiele für verschiedene Lebenssituationen",
    description: "ETF-Sparplan, Altersvorsorgedepot, bAV oder Rürup — was gehört in welchem Verhältnis in dein Portfolio? Drei konkrete Beispiele mit echten Zahlen.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-03-21",
    dateModified: "2026-03-21",
    author: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    isPartOf: { "@type": "WebSite", url: `${BASE}/` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: "Altersvorsorge-Portfolio", item: `${BASE}${PATH}` },
    ],
  },
  {
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

const CtaBlock = ({ children, to = "/" }: { children: React.ReactNode; to?: string }) => (
  <div className="my-10 p-6 md:p-8 bg-primary/5 border border-primary/10 rounded-2xl text-center">
    <p className="text-sm md:text-base text-foreground mb-4 font-medium">{children}</p>
    <Link to={to} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
      <Calculator className="w-4 h-4" />
      {to === "/rentenluecken-rechner" ? "Zum Rentenlücken Rechner" : "Zum Altersvorsorgedepot Rechner"}
    </Link>
  </div>
);

const SectionH2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ letterSpacing: "-0.02em" }}>{children}</h2>
);

const SectionH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg md:text-xl font-semibold mt-8 mb-3">{children}</h3>
);

const ResultBox = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 p-5 bg-primary/5 border border-primary/10 rounded-xl">
    <p className="text-sm md:text-base text-foreground leading-relaxed">{children}</p>
  </div>
);

const BlogPortfolio = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Wie sieht ein gutes Altersvorsorge-Portfolio aus? Drei Beispiele"
        description="ETF-Sparplan, Altersvorsorgedepot, bAV oder Rürup — was gehört in welchem Verhältnis in dein Portfolio? Drei konkrete Beispiele mit echten Zahlen."
        path={PATH}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container max-w-5xl mx-auto px-6">
          <Breadcrumb className="mb-8 max-w-2xl">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/blog">Blog</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Altersvorsorge-Portfolio</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-12">
            <aside className="hidden lg:block w-56 shrink-0">
              <nav className="sticky top-24 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Inhalt</p>
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">{item.label}</a>
                ))}
              </nav>
            </aside>

            <article className="min-w-0 max-w-2xl">
              <AnimatedSection>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                  Wie sieht ein gutes Altersvorsorge-Portfolio aus? Drei Beispiele für verschiedene Lebenssituationen
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 9 Min. Lesezeit</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span>Stand: 2026</span>
                </div>
              </AnimatedSection>

              <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="lg:hidden mb-10">
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-muted-foreground w-full py-3 px-4 bg-secondary rounded-xl">
                  <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
                  Inhaltsverzeichnis
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pt-2 pb-1 bg-secondary rounded-b-xl space-y-1">
                  {tocItems.map((item) => (
                    <a key={item.id} href={`#${item.id}`} onClick={() => setTocOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground py-1.5">{item.label}</a>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Intro */}
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>ETF-Sparplan oder Altersvorsorgedepot? bAV oder Rürup? Die Antwort ist meistens: <strong className="text-foreground">mehreres davon — in der richtigen Kombination.</strong></p>
                <p>Ein gutes Altersvorsorge-Portfolio ist wie ein Werkzeugkasten: Nicht jedes Werkzeug passt für jeden Job. Aber wer die richtigen Werkzeuge kombiniert, kommt schneller ans Ziel.</p>
              </div>

              <CtaBlock to="/rentenluecken-rechner">Berechne zuerst deine persönliche Rentenlücke — dann weißt du, wie viel dein Portfolio schließen muss.</CtaBlock>

              {/* Bausteine */}
              <SectionH2 id="bausteine">Die vier Bausteine im Überblick</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Vier Instrumente stehen den meisten zur Verfügung. Jedes hat eigene Stärken — und Schwächen:</p>
              </div>

              <div className="my-6 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Baustein</TableHead>
                      <TableHead className="font-semibold">Förderung</TableHead>
                      <TableHead className="font-semibold">Flexibilität</TableHead>
                      <TableHead className="font-semibold">Für wen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">ETF-Sparplan</TableCell>
                      <TableCell>Nein</TableCell>
                      <TableCell>Sehr hoch</TableCell>
                      <TableCell>Alle</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Altersvorsorgedepot</TableCell>
                      <TableCell>Ja (ab 2027)</TableCell>
                      <TableCell>Gering</TableCell>
                      <TableCell>Angestellte</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bAV</TableCell>
                      <TableCell>Ja (AG-Zuschuss)</TableCell>
                      <TableCell>Gering</TableCell>
                      <TableCell>Angestellte</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Rürup</TableCell>
                      <TableCell>Ja (Steuern)</TableCell>
                      <TableCell>Keine</TableCell>
                      <TableCell>Selbstständige</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Kein Baustein ist für jeden optimal</strong> — aber die richtige Kombination macht den Unterschied. Hier sind drei konkrete Beispiele.</p>
              </div>

              {/* Portfolio 1 */}
              <SectionH2 id="portfolio-1">Portfolio 1: Der frühe Starter (25 Jahre)</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Anna, 25, Angestellte, 2.800 € brutto.</strong> Erstes festes Gehalt, noch kein Notgroschen, will früh anfangen.</p>
              </div>

              <SectionH3>Schritt 1 — Notgroschen (nicht verhandelbar)</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Bevor irgendein Euro in die Altersvorsorge fließt: <strong className="text-foreground">3 Monatsgehälter auf ein Tagesgeldkonto.</strong> ~5.000 €. Das ist die Basis für alles andere.</p>
              </div>

              <SectionH3>Schritt 2 — bAV prüfen</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Falls der Arbeitgeber mehr als 15 % Zuschuss zahlt — sofort nutzen. Bei 100 € Eigenbeitrag fließen 115 €+ in die Vorsorge, netto kostet es nur ~60 €.</p>
              </div>

              <SectionH3>Schritt 3 — ETF-Sparplan starten</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Noch vor dem Altersvorsorgedepot einen ETF-Sparplan mit 50–100 €/Monat beginnen. Flexibel, kein Mindestbeitrag, jederzeit anpassbar. Der Sparplan kann 2027 teilweise ins Altersvorsorgedepot umgeschichtet werden.</p>
              </div>

              <SectionH3>Schritt 4 — Altersvorsorgedepot ab 2027</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Ab 2027 zusätzlich 100–150 € ins Altersvorsorgedepot. Staatliche Förderung von Anfang an — über 40 Jahre hat der Zinseszins maximale Wirkung.</p>
              </div>

              <SectionH3>Konkretes Portfolio (150 €/Monat gesamt)</SectionH3>
              <div className="my-6 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Baustein</TableHead>
                      <TableHead className="font-semibold">Betrag</TableHead>
                      <TableHead className="font-semibold">Anteil</TableHead>
                      <TableHead className="font-semibold">Warum</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">ETF-Sparplan</TableCell>
                      <TableCell>80 €</TableCell>
                      <TableCell>53 %</TableCell>
                      <TableCell>Flexibilität + sofort starten</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Altersvorsorgedepot (ab 2027)</TableCell>
                      <TableCell>70 €</TableCell>
                      <TableCell>47 %</TableCell>
                      <TableCell>Förderung mitnehmen</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bAV</TableCell>
                      <TableCell>Zusätzlich falls AG zahlt</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>Kostenlos mitnehmen</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <ResultBox>
                <strong>Ergebnis mit 67 (7 % p.a.):</strong><br />
                150 €/Monat ab 25 → ~538.000 € Kapital<br />
                + staatliche Förderung ~57.000 €<br />
                = ~595.000 € Gesamtkapital<br />
                = <strong>~2.750 € monatliche Zusatzrente bis 85</strong>
              </ResultBox>

              <CtaBlock>Berechne, was 150 €/Monat ab heute für dich ergibt.</CtaBlock>

              {/* Portfolio 2 */}
              <SectionH2 id="portfolio-2">Portfolio 2: Der Aufholer (40 Jahre)</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Markus, 40, Angestellter, 4.200 € brutto.</strong> Bisher wenig gespart, Kinder (2), will die Lücke noch schließen.</p>
                <p>Mit 40 sind es noch 27 Jahre bis zur Rente. Das ist mehr als genug — <strong className="text-foreground">wenn man jetzt anfängt und alle Hebel nutzt.</strong></p>
              </div>

              <SectionH3>Schritt 1 — bAV maximieren</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Falls der Arbeitgeber 20–50 % Zuschuss zahlt, ist das der günstigste erste Schritt. 200 € Bruttoumwandlung kostet netto ~90 € und bringt 230 €+ in die Vorsorge.</p>
              </div>

              <SectionH3>Schritt 2 — Altersvorsorgedepot ab 2027</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Mit 2 Kindern: <strong className="text-foreground">Grundzulage 540 € + Kinderzulage 2×300 € = 1.140 € staatliche Förderung pro Jahr.</strong> Das entspricht ~95 € gratis pro Monat vom Staat.</p>
              </div>

              <SectionH3>Schritt 3 — ETF-Sparplan als Puffer</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>20–30 % des Portfolios flexibel halten. Mit 40 können unvorhergesehene Ausgaben kommen — Hausbau, Studium der Kinder, Jobwechsel.</p>
              </div>

              <SectionH3>Schritt 4 — Einmalzahlungen nutzen</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Bonus, Steuerrückerstattung, kleine Erbschaft → direkt investieren. Bei 27 Jahren Laufzeit bringt ein einmaliger Invest von 5.000 € noch <strong className="text-foreground">~29.000 € Endkapital.</strong></p>
              </div>

              <SectionH3>Konkretes Portfolio (400 €/Monat gesamt)</SectionH3>
              <div className="my-6 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Baustein</TableHead>
                      <TableHead className="font-semibold">Betrag</TableHead>
                      <TableHead className="font-semibold">Anteil</TableHead>
                      <TableHead className="font-semibold">Warum</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">bAV</TableCell>
                      <TableCell>100 € netto (=230 € brutto)</TableCell>
                      <TableCell>25 % netto</TableCell>
                      <TableCell>AG-Zuschuss mitnehmen</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Altersvorsorgedepot (ab 2027)</TableCell>
                      <TableCell>200 €</TableCell>
                      <TableCell>50 %</TableCell>
                      <TableCell>Kinderzulage + Grundzulage</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ETF-Sparplan</TableCell>
                      <TableCell>100 €</TableCell>
                      <TableCell>25 %</TableCell>
                      <TableCell>Flexibler Puffer</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <ResultBox>
                <strong>Ergebnis mit 67 (7 % p.a.):</strong><br />
                400 €/Monat ab 40 → ~450.000 € Kapital<br />
                + staatliche Förderung ~30.780 €<br />
                = ~480.000 € Gesamtkapital<br />
                = <strong>~2.220 € monatliche Zusatzrente bis 85</strong>
              </ResultBox>

              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Zum Vergleich: Wer das gleiche Ergebnis erst mit 50 erreichen will, müsste <strong className="text-foreground">~900 € monatlich</strong> einzahlen. Jedes Jahr zählt.</p>
              </div>

              <CtaBlock>Berechne dein persönliches Ergebnis mit dem Altersvorsorgedepot Rechner.</CtaBlock>

              {/* Portfolio 3 */}
              <SectionH2 id="portfolio-3">Portfolio 3: Der Selbstständige (45 Jahre)</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Julia, 45, Freiberuflerin, 70.000 € Jahreseinkommen.</strong> Keine gesetzliche Rente, keine bAV, bisher nur ETF-Sparplan.</p>
                <p>Selbstständige haben keine automatische Absicherung — aber <strong className="text-foreground">mehr Flexibilität bei der steuerlichen Optimierung.</strong> Das ist ein echter Vorteil, wenn man ihn nutzt.</p>
              </div>

              <SectionH3>Schritt 1 — Rürup für Steueroptimierung</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Bei 70.000 € Einkommen liegt der Grenzsteuersatz bei ~42 %. Jeder Euro in die Rürup-Rente spart 42 Cent Steuern. <strong className="text-foreground">10.000 € Jahresbeitrag kostet effektiv nur 5.800 € — der Staat zahlt 4.200 €.</strong></p>
              </div>

              <SectionH3>Schritt 2 — Altersvorsorgedepot ab 2027</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Ob Selbstständige vollständig förderberechtigt sind, ist noch nicht final geregelt. Wenn ja: 150 €/Monat für die staatliche Förderung — die Grundzulage allein macht 540 €/Jahr aus.</p>
              </div>

              <SectionH3>Schritt 3 — ETF-Sparplan als Liquiditätspuffer</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Selbstständige brauchen mehr Liquidität als Angestellte. <strong className="text-foreground">Mindestens 30 % des Portfolios flexibel halten</strong> — für schlechte Monate, Investitionen, unerwartete Kosten.</p>
              </div>

              <SectionH3>Konkretes Portfolio (650 €/Monat gesamt)</SectionH3>
              <div className="my-6 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Baustein</TableHead>
                      <TableHead className="font-semibold">Betrag</TableHead>
                      <TableHead className="font-semibold">Anteil</TableHead>
                      <TableHead className="font-semibold">Warum</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Rürup</TableCell>
                      <TableCell>300 €</TableCell>
                      <TableCell>46 %</TableCell>
                      <TableCell>Steuervorteil ~42 %</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ETF-Sparplan</TableCell>
                      <TableCell>200 €</TableCell>
                      <TableCell>31 %</TableCell>
                      <TableCell>Liquiditätspuffer</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Altersvorsorgedepot (ab 2027)</TableCell>
                      <TableCell>150 €</TableCell>
                      <TableCell>23 %</TableCell>
                      <TableCell>Staatliche Förderung</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <ResultBox>
                <strong>Ergebnis mit 67 (7 % p.a.):</strong><br />
                650 €/Monat ab 45 → ~420.000 € Kapital<br />
                + Steuerersparnis über 22 Jahre: ~75.000 €<br />
                = effektiv ~495.000 € Gesamtvorteil<br />
                = <strong>~1.940 € monatliche Zusatzrente bis 85</strong>
              </ResultBox>

              <CtaBlock to="/rentenluecken-rechner">Wie groß ist deine Rentenlücke als Selbstständiger?</CtaBlock>

              {/* Prinzipien */}
              <SectionH2 id="prinzipien">Was alle drei Portfolios gemeinsam haben</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Egal ob 25, 40 oder 45 — <strong className="text-foreground">drei Prinzipien gelten immer:</strong></p>
              </div>

              <SectionH3>1. Notgroschen zuerst</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Bevor ein Euro in die Altersvorsorge fließt: 3 Monatsgehälter liquide. Wer das nicht hat, bricht die Altersvorsorge beim ersten unerwarteten Ereignis ab.</p>
              </div>

              <SectionH3>2. Kostenlose Förderung immer mitnehmen</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>AG-Zuschuss zur bAV, staatliche Zulagen, Steuervorteile — das ist Geld, das dir zusteht. <strong className="text-foreground">Es nicht zu nehmen ist der teuerste Fehler.</strong></p>
              </div>

              <SectionH3>3. Früher ist immer besser</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Auch wer spät anfängt, kann erheblich aufholen. Aber <strong className="text-foreground">früh starten bleibt der stärkste Hebel.</strong> Jedes Jahr Aufschub kostet mehr als ein Jahr Sparrate.</p>
              </div>

              {/* Fazit */}
              <SectionH2 id="fazit">Fazit</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Es gibt kein universelles Portfolio — aber es gibt <strong className="text-foreground">klare Prinzipien.</strong> Wer die richtigen Bausteine kombiniert und früh anfängt, kann eine erhebliche Rentenlücke schließen — unabhängig vom Alter.</p>
                <p>Das Altersvorsorgedepot ab 2027 wird für die meisten der attraktivste neue Baustein sein: <strong className="text-foreground">staatliche Förderung, volle ETF-Investition, kein Garantiezwang.</strong></p>
              </div>

              {/* Big CTA */}
              <div className="my-10 p-8 md:p-10 bg-primary rounded-2xl text-center">
                <p className="text-lg md:text-xl font-bold text-primary-foreground mb-2">Berechne jetzt dein persönliches Altersvorsorgedepot</p>
                <p className="text-sm text-primary-foreground/80 mb-6">Kostenlos, unverbindlich und in unter 2 Minuten.</p>
                <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background text-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                  <Calculator className="w-4 h-4" />
                  Zum Rechner
                </Link>
              </div>

              {/* FAQ */}
              <SectionH2 id="faq">Häufige Fragen</SectionH2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-sm md:text-base">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Related */}
              <div className="mt-12">
                <p className="text-sm font-semibold mb-4">Weiterführende Artikel</p>
                <div className="space-y-2">
                  <Link to="/blog/betriebliche-altersvorsorge" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Betriebliche Altersvorsorge erklärt</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/ruerup-rente" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Rürup Rente: Für wen sie sich lohnt</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/rentenluecken-rechner" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Rentenlückenrechner</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-16 p-5 bg-secondary rounded-xl">
                <p className="text-xs text-muted-foreground/70 italic leading-relaxed">
                  Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar. Alle Angaben basieren auf vereinfachten Annahmen und dem Stand 2026. Für individuelle Entscheidungen empfehlen wir die Beratung durch eine unabhängige Verbraucherzentrale oder einen zugelassenen Finanzberater.
                </p>
              </div>
            </article>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default BlogPortfolio;
