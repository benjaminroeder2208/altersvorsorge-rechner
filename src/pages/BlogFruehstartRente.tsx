import { useState } from "react";
import BlogDisclaimer from "@/components/blog/BlogDisclaimer";
import BlogNewsletterWidget from "@/components/blog/BlogNewsletterWidget";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, Calculator } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/blog/fruehstart-rente";

const tocItems = [
  { id: "was-ist", label: "Was ist die Frühstart-Rente?" },
  { id: "wer-bekommt", label: "Wer bekommt sie?" },
  { id: "wie-viel", label: "Wie viel bekommt mein Kind?" },
  { id: "vs-sparen", label: "Frühstart-Rente vs. selbst sparen" },
  { id: "eroffnung", label: "Wie funktioniert die Eröffnung?" },
  { id: "aufstocken", label: "Kann ich aufstocken?" },
  { id: "mit-avsv", label: "Kombination mit Altersvorsorgedepot" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Mein Kind ist älter als 6 Jahre — kriegt es auch Förderung?",
    a: "Ja. Der Anspruch besteht für alle Kinder zwischen 6 und 18 Jahren. Allerdings startet die Frühstart-Rente phasenweise: Zuerst sind die jüngeren Jahrgänge förderberechtigt (ab Jahrgang 2020), in den Folgejahren werden die übrigen Jahrgänge schrittweise einbezogen. Je älter dein Kind beim Start ist, desto weniger Jahre läuft die staatliche Einzahlung – die Förderung endet mit 18.",
  },
  {
    q: "Was passiert mit dem Geld, wenn mein Kind nicht arbeitet?",
    a: "Das Kapital bleibt erhalten und wächst weiter am Kapitalmarkt. Die Frühstart-Rente ist nicht an spätere Erwerbstätigkeit geknüpft. Auch wer später nicht oder nur gering erwerbstätig ist, behält den vollen Anspruch auf das angesparte Vermögen – ausgezahlt frühestens zum gesetzlich festgelegten Rentenbeginn.",
  },
  {
    q: "Kann ich das Geld vor 18 abheben?",
    a: "Nein. Die Frühstart-Rente ist – genau wie das Altersvorsorgedepot für Erwachsene – bis zum Rentenbeginn gebunden. Eine vorzeitige Entnahme ist nicht vorgesehen. Das Geld arbeitet bis dahin am Kapitalmarkt.",
  },
  {
    q: "Welcher Anbieter ist der beste?",
    a: "Konkrete Anbieter stehen aktuell noch nicht fest – die Frühstart-Rente startet voraussichtlich 2027. Bei der Wahl solltest du auf niedrige laufende Kosten (möglichst unter 0,5 % p.a.), eine breit gestreute ETF-Auswahl und Transparenz achten. Wir werden auf altersvorsorge-rechner.com einen unabhängigen Anbietervergleich veröffentlichen, sobald die Konditionen verbindlich vorliegen.",
  },
  {
    q: "Ist Frühstart-Rente besser als Riester für Kinder?",
    a: "In den meisten Fällen ja. Die Frühstart-Rente ist neu, kostengünstiger ausgelegt und ohne Beitragsgarantie – das Geld kann voll am Kapitalmarkt arbeiten. Bestehende Riester-Verträge solltest du nicht vorschnell kündigen, sondern in der Regel ruhen lassen, um Förderung und Steuerersparnis zu erhalten.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Frühstart-Rente 2026: Wie Eltern ihre Kinder früh fördern",
    description:
      "Frühstart-Rente ab 2027: 10€/Monat vom Staat für Kinder 6-18 Jahre. Wir erklären wie's funktioniert, wer profitiert — und wie viel dein Kind sparen kann.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-05-17",
    dateModified: "2026-05-17",
    author: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    isPartOf: { "@type": "WebSite", url: `${BASE}/` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Frühstart-Rente",
        item: `${BASE}${PATH}`,
      },
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

const CtaBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="my-10 p-6 md:p-8 bg-primary/5 border border-primary/10 rounded-2xl text-center">
    <p className="text-sm md:text-base text-foreground mb-4 font-medium">{children}</p>
    <Link
      to="/fruehstart-rente-rechner"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
    >
      <Calculator className="w-4 h-4" />
      Zum Frühstart-Rente Rechner
    </Link>
  </div>
);

const SectionH2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ letterSpacing: "-0.02em" }}>
    {children}
  </h2>
);

const SectionH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg md:text-xl font-semibold mt-8 mb-3">{children}</h3>
);

const BlogFruehstartRente = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        ogType="article"
        title="Frühstart-Rente 2026: Wie Eltern ihre Kinder früh fördern"
        description="Frühstart-Rente ab 2027: 10€/Monat vom Staat für Kinder 6-18 Jahre. Wir erklären wie's funktioniert, wer profitiert — und wie viel dein Kind sparen kann."
        path={PATH}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container max-w-5xl mx-auto px-6">
          <Breadcrumb className="mb-8 max-w-2xl">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/blog">Blog</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Frühstart-Rente</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-12">
            <aside className="hidden lg:block w-56 shrink-0">
              <nav className="sticky top-24 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Inhalt</p>
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>

            <article className="min-w-0 max-w-2xl">
              <AnimatedSection>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                  Frühstart-Rente 2026: Wie Eltern ihre Kinder früh fördern
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 7 Min. Lesezeit</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span>Stand: Mai 2026</span>
                </div>
              </AnimatedSection>

              <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="lg:hidden mb-10">
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-muted-foreground w-full py-3 px-4 bg-secondary rounded-xl">
                  <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
                  Inhaltsverzeichnis
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pt-2 pb-1 bg-secondary rounded-b-xl space-y-1">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setTocOpen(false)}
                      className="block text-sm text-muted-foreground hover:text-foreground py-1.5"
                    >
                      {item.label}
                    </a>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Mit dem Altersvorsorgereformgesetz vom 27.&nbsp;März 2026 kommt nicht nur das Altersvorsorgedepot für Erwachsene – die Bundesregierung führt auch eine <strong className="text-foreground">Frühstart-Rente</strong> ein. Die Idee: Der Staat zahlt jedem Kind ab einem bestimmten Alter monatlich 10&nbsp;€ in ein eigenes Altersvorsorgedepot ein. Über Jahrzehnte am Kapitalmarkt kann daraus ein erheblicher Grundstock für die spätere Rente werden.
                </p>
                <p>
                  Was steckt konkret dahinter, wer bekommt das Geld – und lohnt es sich, zusätzlich einzuzahlen? Dieser Artikel erklärt die wichtigsten Punkte und zeigt mit einem Rechenbeispiel, wie viel zusammenkommen kann.
                </p>
              </div>

              <SectionH2 id="was-ist">Was ist die Frühstart-Rente?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Die Frühstart-Rente ist ein staatlich finanziertes Altersvorsorgedepot für Kinder. Der Staat zahlt für jedes berechtigte Kind <strong className="text-foreground">10&nbsp;€ pro Monat</strong> – also 120&nbsp;€ pro Jahr – in ein Wertpapierdepot ein. Die Einzahlungen laufen <strong className="text-foreground">vom 6. bis zum 18. Lebensjahr</strong>.
                </p>
                <p>
                  Das Geld wird breit gestreut am Kapitalmarkt angelegt – ähnlich wie beim Altersvorsorgedepot für Erwachsene. Es gibt keine Beitragsgarantie: Das Kapital kann voll in Aktien und ETFs investiert werden und so vom langfristigen Wachstum der Märkte profitieren.
                </p>
                <p>
                  <strong className="text-foreground">Geplanter Start:</strong> 1.&nbsp;Januar 2027 (phasenweise Einführung).
                </p>
              </div>

              <SectionH2 id="wer-bekommt">Wer bekommt Frühstart-Rente?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Anspruchsberechtigt sind grundsätzlich alle in Deutschland gemeldeten Kinder zwischen 6 und 18 Jahren. Wichtig: Die Frühstart-Rente startet <strong className="text-foreground">phasenweise</strong>. Zuerst kommen die jüngeren Jahrgänge (geplant ab Jahrgang 2020) in den Genuss der Förderung, in den Folgejahren werden ältere Jahrgänge schrittweise einbezogen.
                </p>
                <p>Voraussetzungen im Überblick:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Wohnsitz in Deutschland</li>
                  <li>Alter zwischen 6 und 18 Jahren</li>
                  <li>Eröffnung eines anerkannten Altersvorsorgedepots für das Kind</li>
                </ul>
                <p>
                  Je früher dein Kind in die Förderung startet, desto länger arbeitet das Geld – und desto stärker wirkt der Zinseszinseffekt bis zum Rentenbeginn.
                </p>
              </div>

              <SectionH2 id="wie-viel">Wie viel Geld bekommt mein Kind?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Pro Jahr fließen <strong className="text-foreground">120&nbsp;€</strong> vom Staat in das Depot. Über 12&nbsp;Jahre (vom 6. bis zum 18. Geburtstag) sind das in Summe <strong className="text-foreground">1.440&nbsp;€</strong> staatliche Einzahlungen.
                </p>
                <p>
                  Spannend wird es durch die lange Laufzeit. Nach dem 18.&nbsp;Geburtstag bleibt das Kapital im Depot und wächst weiter am Kapitalmarkt – ohne weitere staatliche Einzahlung – bis zum Rentenbeginn. Bei einer angenommenen Rendite von 7&nbsp;% p.&nbsp;a. (historischer Durchschnitt breit gestreuter Aktienindizes laut{" "}
                  <a
                    href="https://www.dai.de/detail/msci-world-rendite-dreieck-fuer-die-monatliche-geldanlage-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    MSCI-World-Renditedreieck des Deutschen Aktieninstituts
                  </a>
                  , keine Prognose) kann daraus ein erheblicher Betrag werden.
                </p>

                <SectionH3>Rechenbeispiel: Kind ab 6 Jahren</SectionH3>
                <div className="overflow-x-auto -mx-6 px-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[240px]">Position</TableHead>
                        <TableHead className="min-w-[160px] text-right">Betrag</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Staatliche Einzahlung (12 × 120&nbsp;€)</TableCell>
                        <TableCell className="text-right">1.440&nbsp;€</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Depotwert mit 18 Jahren (7&nbsp;% p.&nbsp;a.)</TableCell>
                        <TableCell className="text-right font-semibold">~2.260&nbsp;€</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Weitergewachsen bis 67 (49 Jahre, 7&nbsp;% p.&nbsp;a., ohne Zuzahlung)</TableCell>
                        <TableCell className="text-right font-semibold">~63.000&nbsp;€</TableCell>
                      </TableRow>
                      <TableRow className="bg-primary/5">
                        <TableCell className="font-semibold">Mit zusätzlichen 10&nbsp;€/Monat der Eltern (6–18)</TableCell>
                        <TableCell className="text-right font-bold text-primary">~125.000&nbsp;€</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <p>
                  Aus 1.440&nbsp;€ staatlicher Förderung kann unter diesen Annahmen ein Betrag im hohen fünfstelligen Bereich werden – allein durch die lange Laufzeit. Verdoppeln die Eltern den staatlichen Beitrag, kann das Ergebnis bis zum Rentenbeginn sechsstellig sein.
                </p>
              </div>

              <CtaBlock>Berechne, wie viel dein Kind bis zur Rente sparen könnte.</CtaBlock>

              <SectionH2 id="vs-sparen">Frühstart-Rente vs. selbst sparen</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                Drei Szenarien für ein Kind ab dem 6.&nbsp;Geburtstag bis zum 18. Lebensjahr, jeweils anschließend bis 67 weiterverzinst zu 7&nbsp;% p.&nbsp;a. (vereinfachte Annahme, keine Inflation, keine Kosten, keine Steuern):
              </p>
              <div className="overflow-x-auto -mx-6 px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Variante</TableHead>
                      <TableHead className="min-w-[140px] text-right">Eingezahlt</TableHead>
                      <TableHead className="min-w-[160px] text-right">Depotwert mit 67</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Nichts sparen</TableCell>
                      <TableCell className="text-right">0&nbsp;€</TableCell>
                      <TableCell className="text-right">0&nbsp;€</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nur Staat (10&nbsp;€/Monat)</TableCell>
                      <TableCell className="text-right">1.440&nbsp;€</TableCell>
                      <TableCell className="text-right font-semibold">~63.000&nbsp;€</TableCell>
                    </TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell>Staat + Eltern (je 10&nbsp;€/Monat)</TableCell>
                      <TableCell className="text-right">2.880&nbsp;€</TableCell>
                      <TableCell className="text-right font-bold text-primary">~125.000&nbsp;€</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground mt-4">
                Schon der staatliche Anteil allein liefert einen spürbaren Grundstock. Wer als Eltern oder Großeltern zusätzlich denselben Betrag einzahlt, kann das Ergebnis grob verdoppeln – ein günstiges Konstrukt im Vergleich zu vielen klassischen Sparprodukten für Kinder.
              </p>

              <SectionH2 id="eroffnung">Wie funktioniert die Eröffnung?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Der Ablauf wird voraussichtlich in vier Schritten organisiert:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Anbieter wählen:</strong> Eltern oder Sorgeberechtigte wählen einen anerkannten Anbieter für ein Altersvorsorgedepot (Banken, Direktbanken, Vermögensverwalter).
                  </li>
                  <li>
                    <strong className="text-foreground">Depot auf den Namen des Kindes eröffnen:</strong> Das Depot läuft auf den Namen des Kindes. Eltern verwalten es treuhänderisch bis zur Volljährigkeit.
                  </li>
                  <li>
                    <strong className="text-foreground">Anmeldung zur Förderung:</strong> Die staatliche Einzahlung wird über den Anbieter angemeldet. Steuer-ID und Geburtsdatum reichen dafür voraussichtlich aus.
                  </li>
                  <li>
                    <strong className="text-foreground">Staat zahlt monatlich:</strong> Sobald die Berechtigung anerkannt ist, fließen die 10&nbsp;€ pro Monat automatisch in das Depot.
                  </li>
                </ol>
                <p>
                  Die exakten Antragswege werden mit Start der Förderung 2027 konkretisiert. Belastbare Anbieter und Konditionen werden wir auf altersvorsorge-rechner.com aktuell halten.
                </p>
              </div>

              <SectionH2 id="aufstocken">Kann ich aufstocken?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Ja. Das Depot ist offen für zusätzliche Einzahlungen – sowohl von <strong className="text-foreground">Eltern und Sorgeberechtigten</strong> als auch von <strong className="text-foreground">Großeltern, Verwandten und Paten</strong>. Ab dem 18.&nbsp;Geburtstag kann das Kind selbst weiter einzahlen und übernimmt die Verwaltung.
                </p>
                <p>
                  Schon kleine zusätzliche Beträge können sich über die lange Laufzeit deutlich auswirken. Wer monatlich z.&nbsp;B. zusätzlich 25&nbsp;€ einzahlt, vervielfacht den Endbetrag im Vergleich zur reinen staatlichen Förderung. Dabei gilt: Das Risiko des Kapitalmarktes wird damit auch erhöht – langfristig haben breit gestreute Aktienportfolios historisch jedoch positive Renditen erzielt.
                </p>
              </div>

              <SectionH2 id="mit-avsv">Frühstart-Rente + Altersvorsorgedepot</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Die Frühstart-Rente endet mit 18 Jahren. Anschließend kann das Kind nahtlos in das reguläre <Link to="/altersvorsorgedepot" className="text-foreground underline">Altersvorsorgedepot</Link> wechseln – inklusive der staatlichen Grundzulage von 50&nbsp;% auf die ersten 360&nbsp;€ und 25&nbsp;% auf weitere Eigenbeiträge bis 1.800&nbsp;€ pro Jahr. Zusätzlich gibt es für junge Sparer unter 25 im ersten Förderjahr einen Berufseinsteiger-Bonus von 200&nbsp;€.
                </p>
                <p>
                  Aus Sicht der Familie ergibt das eine durchgängige Förderkette: <strong className="text-foreground">6 bis 18 Jahre Frühstart-Rente</strong>, danach Übergang ins <strong className="text-foreground">Altersvorsorgedepot</strong> mit höheren Förderquoten. Beides läuft im selben Konstrukt: ein Wertpapierdepot, langfristig am Kapitalmarkt investiert.
                </p>
                <p className="flex flex-wrap gap-3 text-sm">
                  <Link to="/altersvorsorgedepot-foerderung" className="inline-flex items-center gap-1 text-primary hover:underline">
                    Förderung im Altersvorsorgedepot <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link to="/blog/altersvorsorgedepot-2027" className="inline-flex items-center gap-1 text-primary hover:underline">
                    Altersvorsorgedepot ab 2027 <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>

              <SectionH2 id="faq">Häufige Fragen</SectionH2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-sm md:text-base">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-14 space-y-4 text-base leading-relaxed text-muted-foreground">
                <h2 className="text-xl font-semibold text-foreground">Fazit</h2>
                <p>
                  Die Frühstart-Rente ist ein einfacher, aber wirkungsvoller Baustein im Reformpaket: 10&nbsp;€ pro Monat klingen wenig, entfalten über 12&nbsp;Jahre Einzahlung und Jahrzehnte Laufzeit aber eine erhebliche Wirkung. Wer als Familie zusätzlich aufstockt, kann den Effekt nochmals deutlich verstärken. Für eine individuelle Einschätzung lohnt ein eigener Blick mit konkreten Zahlen – und ggf. eine Beratung bei der Hausbank oder einer unabhängigen Verbraucherzentrale.
                </p>
              </div>

              <div className="mt-12">
                <p className="text-sm font-semibold mb-4">Weiterführende Artikel</p>
                <div className="space-y-2">
                  <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot ab 2027 – alles, was du wissen musst</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/altersvorsorgedepot-foerderung" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Förderung im Altersvorsorgedepot im Detail</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Alle Blogartikel ansehen</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              <BlogNewsletterWidget />
              <BlogDisclaimer mitRechnung />
            </article>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default BlogFruehstartRente;
