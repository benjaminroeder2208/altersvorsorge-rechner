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
const PATH = "/blog/riester-rente";

const tocItems = [
  { id: "was-ist", label: "Was ist die Riester-Rente?" },
  { id: "wie-funktioniert", label: "Wie funktioniert Riester?" },
  { id: "wer-profitiert", label: "Für wen lohnt sich Riester?" },
  { id: "vs-altersvorsorgedepot", label: "Riester vs. Altersvorsorgedepot" },
  { id: "probleme", label: "Warum Riester problematisch ist" },
  { id: "was-tun", label: "Was tun mit bestehender Riester?" },
  { id: "beispiele", label: "Rechenbeispiele" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Sollte ich meine bestehende Riester-Rente kündigen?",
    a: "Nein, ruhen lassen ist in den meisten Fällen besser. Bei einer Kündigung müssen die erhaltenen Zulagen und Steuervorteile in der Regel zurückgezahlt werden, und der Vertrag wird steuerlich schädlich verwendet. Wer nicht mehr einzahlen möchte, kann den Vertrag beitragsfrei stellen — das angesparte Kapital bleibt erhalten und wird zum Rentenbeginn ausgezahlt.",
  },
  {
    q: "Kann ich Riester zu Altersvorsorgedepot wechseln?",
    a: "Ein direkter Übertrag ist nach aktuellem Stand des Altersvorsorgereformgesetzes (beschlossen 27.03.2026) nicht vorgesehen. Du kannst aber deinen Riester-Vertrag beitragsfrei stellen (ruhen lassen) und parallel ab 2027 in ein Altersvorsorgedepot einzahlen.",
  },
  {
    q: "Bekommen Selbstständige Riester-Förderung?",
    a: "Selbstständige sind in der Regel nicht Riester-berechtigt. Es gibt Ausnahmen, etwa über den Ehepartner (mittelbare Förderung) oder wenn eine Pflichtversicherung in der gesetzlichen Rentenversicherung besteht. Das neue Altersvorsorgedepot ab 2027 öffnet sich dagegen ausdrücklich auch für Selbstständige und Freiberufler.",
  },
  {
    q: "Welche Riester-Kosten sind normal?",
    a: "Laufende Kosten zwischen 0,8 % und 2,0 % pro Jahr sind bei klassischen Riester-Verträgen üblich, hinzu kommen oft Abschluss- und Vertriebskosten. Im Vergleich zu kostengünstigen ETF-Sparplänen (oft unter 0,5 % p.a.) ist das hoch und drückt die Nettorendite spürbar.",
  },
  {
    q: "Ab wann wird meine Riester-Rente ausgezahlt?",
    a: "Die Auszahlung beginnt frühestens mit dem Renteneintritt (in der Regel ab 62, bei Neuverträgen oft ab 67). Eine frühere Entnahme ist nur unter Verlust der Förderung möglich. Bis zu 30 % können zu Rentenbeginn als Einmalbetrag entnommen werden, der Rest fließt als lebenslange monatliche Rente.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Riester-Rente 2026: Noch zeitgemäß oder überholt?",
    description:
      "Riester-Rente: Wie sie funktioniert, für wen sie sinnvoll ist — und ob die Altersvorsorgedepot eine bessere Alternative ist.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-05-01",
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
        name: "Riester-Rente",
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
      to="/riester-vergleich-rechner"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
    >
      <Calculator className="w-4 h-4" />
      Zum Riester-Vergleich Rechner
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

const BlogRiesterRente = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        ogType="article"
        title="Riester-Rente 2026: Lohnt sich das noch? Alternativen und Fakten"
        description="Riester-Rente: Wie sie funktioniert, für wen sie sinnvoll ist — und ob die Altersvorsorgedepot eine bessere Alternative ist."
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
                <BreadcrumbPage>Riester-Rente</BreadcrumbPage>
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
                  Riester-Rente 2026: Noch zeitgemäß oder überholt?
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 9 Min. Lesezeit</span>
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

              {/* Intro */}
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Die <strong className="text-foreground">Riester-Rente</strong> wurde 2002 als staatlich geförderte private Altersvorsorge eingeführt — als Antwort auf das damals abgesenkte Niveau der gesetzlichen Rente. Über 16 Millionen Verträge wurden seither abgeschlossen. Doch in den letzten Jahren ist das Modell stark in die Kritik geraten: hohe Kosten, niedrige Renditen, komplexe Regeln.
                </p>
                <p>
                  Mit dem <strong className="text-foreground">Altersvorsorgereformgesetz vom 27. März 2026</strong> bekommt Riester ab 2027 mit dem neuen Altersvorsorgedepot eine moderne Alternative. Höchste Zeit, neutral zu prüfen: Wie funktioniert Riester eigentlich, für wen lohnt es sich heute noch — und was solltest du mit einem bestehenden Vertrag tun?
                </p>
              </div>

              {/* Was ist */}
              <SectionH2 id="was-ist">Was ist die Riester-Rente?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Die Riester-Rente ist eine staatlich geförderte private Altersvorsorge, benannt nach dem damaligen Bundesarbeitsminister Walter Riester. Sie wurde 2002 eingeführt, um die schrittweise Absenkung des gesetzlichen Rentenniveaus durch private Vorsorge zu kompensieren.
                </p>
                <p>
                  Der Kerngedanke: Wer eigene Beiträge in einen zertifizierten Riester-Vertrag einzahlt, erhält dafür <strong className="text-foreground">Zulagen vom Staat</strong> sowie unter Umständen einen <strong className="text-foreground">Sonderausgabenabzug</strong> bei der Einkommensteuer. Im Gegenzug verpflichtet sich der Anbieter, zum Rentenbeginn mindestens die eingezahlten Beiträge plus Zulagen zur Verfügung zu stellen — die sogenannte <strong className="text-foreground">Beitragsgarantie</strong>.
                </p>
                <p>
                  Es gibt verschiedene Riester-Varianten: klassische Rentenversicherungen, Fondssparpläne, Banksparpläne sowie den Wohn-Riester für Immobilien. Allen gemeinsam ist die staatliche Förderstruktur und die Zertifizierungspflicht durch die BaFin.
                </p>
              </div>

              <SectionH3>Eckdaten seit 2002</SectionH3>
              <ul className="list-disc pl-6 space-y-1 text-base leading-relaxed text-muted-foreground">
                <li>Grundzulage: aktuell <strong className="text-foreground">175 € pro Jahr</strong></li>
                <li>Kinderzulage: <strong className="text-foreground">185 € pro Kind</strong> (geboren vor 2008) bzw. <strong className="text-foreground">300 € pro Kind</strong> (geboren ab 2008)</li>
                <li>Maximaler geförderter Eigenbeitrag: <strong className="text-foreground">2.100 € pro Jahr</strong> (inkl. Zulagen)</li>
                <li>Berufseinsteiger-Bonus: einmalig 200 € bei Vertragsabschluss vor dem 25. Lebensjahr</li>
              </ul>

              {/* Wie funktioniert */}
              <SectionH2 id="wie-funktioniert">Wie funktioniert die Riester-Rente?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Wer die volle Förderung erhalten möchte, muss <strong className="text-foreground">4 % seines rentenversicherungspflichtigen Vorjahreseinkommens</strong> einzahlen — abzüglich der Zulagen. Mindestbeitrag sind 60 € pro Jahr (Sockelbetrag), Höchstbeitrag 2.100 € jährlich.
                </p>
                <p>
                  Die Förderung läuft in zwei Stufen: Zunächst zahlt der Staat die Zulagen direkt in den Vertrag. Anschließend prüft das Finanzamt bei der Steuererklärung, ob der Sonderausgabenabzug zu einer höheren Entlastung führt als die Zulagen — falls ja, wird die Differenz erstattet (sogenannte <strong className="text-foreground">Günstigerprüfung</strong>).
                </p>
                <p>
                  Zum Rentenbeginn werden bis zu <strong className="text-foreground">30 % des Kapitals</strong> als Einmalbetrag ausgezahlt, der Rest fließt als lebenslange monatliche Rente. Diese Rente wird in der Auszahlungsphase voll mit dem persönlichen Steuersatz besteuert (nachgelagerte Besteuerung).
                </p>
              </div>

              {/* Wer profitiert */}
              <SectionH2 id="wer-profitiert">Für wen lohnt sich Riester heute noch?</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                Trotz aller Kritik gibt es Konstellationen, in denen Riester rechnerisch sinnvoll sein kann:
              </p>

              <SectionH3>Familien mit mehreren Kindern</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Die Kinderzulagen sind der attraktivste Teil der Riester-Förderung. Eine Familie mit zwei nach 2008 geborenen Kindern erhält allein <strong className="text-foreground">600 € Kinderzulage pro Jahr</strong>, zusätzlich zur Grundzulage. Bei niedrigen Eigenbeiträgen ist die Förderquote dann sehr hoch.
              </p>

              <SectionH3>Höhere Einkommen mit hohem Grenzsteuersatz</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Wer einen Grenzsteuersatz von 40 % oder mehr hat, profitiert oft stärker vom Sonderausgabenabzug als von den Zulagen. Die effektive Förderung kann dadurch deutlich steigen.
              </p>

              <SectionH3>Sicherheitsorientierte Sparer</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Wer Kapitalmarktrisiken konsequent vermeiden möchte, findet in der Beitragsgarantie einen echten Vorteil — auch wenn diese Garantie auf Kosten der Rendite geht.
              </p>

              {/* Vs Altersvorsorgedepot */}
              <SectionH2 id="vs-altersvorsorgedepot">Riester vs. Altersvorsorgedepot</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                Ab 2027 startet das <Link to="/altersvorsorgedepot" className="text-primary hover:underline">Altersvorsorgedepot</Link> als modernes Pendant. Die zentralen Unterschiede im Überblick:
              </p>
              <div className="overflow-x-auto -mx-6 px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[160px]">Merkmal</TableHead>
                      <TableHead className="min-w-[180px]">Riester-Rente</TableHead>
                      <TableHead className="min-w-[180px]">Altersvorsorgedepot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Grundzulage</TableCell>
                      <TableCell>175 €/Jahr</TableCell>
                      <TableCell>bis 540 €/Jahr</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Kinderzulage</TableCell>
                      <TableCell>bis 300 €/Kind</TableCell>
                      <TableCell>bis 300 €/Kind (100 %)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Kosten p.a.</TableCell>
                      <TableCell>typisch 0,8 – 2,0 %</TableCell>
                      <TableCell>geplant 0,1 – 0,5 %</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Beitragsgarantie</TableCell>
                      <TableCell>Ja (100 %)</TableCell>
                      <TableCell>Nein</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Aktienquote</TableCell>
                      <TableCell>begrenzt</TableCell>
                      <TableCell>bis 100 % möglich</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Auszahlung</TableCell>
                      <TableCell>ab 62/67, Rente + max. 30 % Einmal</TableCell>
                      <TableCell>ab 65, monatliche Rente bis mind. 85</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Besteuerung</TableCell>
                      <TableCell>nachgelagert</TableCell>
                      <TableCell>nachgelagert</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Anbieterwechsel</TableCell>
                      <TableCell>aufwändig, oft mit Gebühren</TableCell>
                      <TableCell>jederzeit möglich</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Selbstständige</TableCell>
                      <TableCell>nur eingeschränkt</TableCell>
                      <TableCell>ausdrücklich einbezogen</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <CtaBlock>Du willst Riester und Altersvorsorgedepot direkt vergleichen?</CtaBlock>

              {/* Probleme */}
              <SectionH2 id="probleme">Warum Riester für viele problematisch ist</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Auch wer der Riester-Rente fair begegnet, kommt an einigen strukturellen Schwächen nicht vorbei:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Hohe Kosten:</strong> Abschluss-, Verwaltungs- und Vertriebskosten summieren sich oft auf 1 – 2 % pro Jahr. Über 30 Jahre kann das die Endsumme um einen mittleren fünfstelligen Betrag drücken.
                  </li>
                  <li>
                    <strong className="text-foreground">Beitragsgarantie kostet Rendite:</strong> Um die Garantie darstellen zu können, parken viele Anbieter den Großteil in niedrig verzinsten Anleihen. Die Aktienquote ist dadurch oft gering.
                  </li>
                  <li>
                    <strong className="text-foreground">Komplexe Regeln:</strong> Förderhöhe, Günstigerprüfung, Wohnförderkonto, Schädlichkeitsregeln — Riester ist eines der komplexesten Vorsorgeprodukte am Markt.
                  </li>
                  <li>
                    <strong className="text-foreground">Lebenslange Verrentung:</strong> Die Pflicht zur lebenslangen Rente führt zu konservativ kalkulierten Rentenfaktoren — viele Riester-Sparer erreichen rechnerisch erst mit über 90 Jahren die Gewinnschwelle.
                  </li>
                  <li>
                    <strong className="text-foreground">Volle nachgelagerte Besteuerung:</strong> Während der Ansparphase steuerlich entlastet, wird die Rente später voll mit dem persönlichen Steuersatz besteuert.
                  </li>
                </ul>
                <p>
                  Diese Schwächen sind seit Jahren bekannt — sie waren der zentrale Grund dafür, dass mit dem Altersvorsorgereformgesetz (beschlossen 27.03.2026) ein neuer Förderrahmen geschaffen wurde.
                </p>
              </div>

              {/* Was tun */}
              <SectionH2 id="was-tun">Was kann ich mit einer bestehenden Riester-Rente tun?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Wer bereits einen Riester-Vertrag hat, sollte nicht überstürzt kündigen. In der Regel sind drei Wege sinnvoll:
                </p>
              </div>

              <SectionH3>1. Vertrag weiterführen</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Wenn der Vertrag gute Konditionen hat — niedrige Kosten, ordentliche Aktienquote, passende Lebenssituation (z.&nbsp;B. Familie mit Kindern, hoher Grenzsteuersatz) — kann es sinnvoll sein, die Förderung weiter mitzunehmen.
              </p>

              <SectionH3>2. Vertrag ruhen lassen (beitragsfrei stellen)</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Wer nicht mehr einzahlen möchte, kann den Vertrag jederzeit <strong className="text-foreground">beitragsfrei stellen</strong>. Das angesparte Kapital bleibt erhalten, wird weiter verwaltet und zum Rentenbeginn ausgezahlt. Zulagen und Steuervorteile müssen nicht zurückgezahlt werden. <strong className="text-foreground">Das ist in den allermeisten Fällen die richtige Wahl, wenn Riester nicht mehr passt.</strong>
              </p>

              <SectionH3>3. Anbieterwechsel prüfen</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Ein Wechsel zu einem kostengünstigeren Anbieter ist möglich, aber häufig mit Wechselgebühren und Verlusten verbunden. Lohnt sich nur selten und sollte sorgfältig durchgerechnet werden.
              </p>

              <div className="my-8 p-5 rounded-2xl bg-secondary border border-border">
                <p className="text-sm text-foreground">
                  <strong>Wichtig:</strong> Eine Kündigung ist meistens die schlechteste Option. Die erhaltenen Zulagen und Steuervorteile müssen dann in der Regel zurückgezahlt werden, und es kann zusätzlich eine schädliche Verwendung vorliegen. Vor jeder Entscheidung lohnt sich ein Blick auf die Vertragsunterlagen — und im Zweifel eine unabhängige Honorarberatung.
                </p>
              </div>

              {/* Beispiele */}
              <SectionH2 id="beispiele">Rechenbeispiele</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                Zur Einordnung zwei vereinfachte Szenarien. Die Renditeannahme von <strong className="text-foreground">7 % p.a.</strong> für ein breit gestreutes Aktienportfolio orientiert sich am historischen Durchschnitt — siehe das <a href="https://www.dai.de/rendite-dreieck/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MSCI-World-Renditedreieck des Deutschen Aktieninstituts</a>. Tatsächliche Ergebnisse können erheblich abweichen.
              </p>

              <SectionH3>Szenario 1: Verheiratet, 2 Kinder (geb. ab 2008)</SectionH3>
              <div className="overflow-x-auto -mx-6 px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]">Position</TableHead>
                      <TableHead className="min-w-[160px] text-right">Riester</TableHead>
                      <TableHead className="min-w-[180px] text-right">Altersvorsorgedepot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Eigenbeitrag pro Monat</TableCell>
                      <TableCell className="text-right">100 €</TableCell>
                      <TableCell className="text-right">100 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Grundzulage</TableCell>
                      <TableCell className="text-right">175 €/Jahr</TableCell>
                      <TableCell className="text-right">~480 €/Jahr</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Kinderzulage (2 Kinder)</TableCell>
                      <TableCell className="text-right">600 €/Jahr</TableCell>
                      <TableCell className="text-right">600 €/Jahr</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Angenommene Rendite p.a.</TableCell>
                      <TableCell className="text-right">2,0 %</TableCell>
                      <TableCell className="text-right">7,0 %</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Angenommene Kosten p.a.</TableCell>
                      <TableCell className="text-right">1,5 %</TableCell>
                      <TableCell className="text-right">0,3 %</TableCell>
                    </TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">Endkapital nach 30 Jahren (Größenordnung)</TableCell>
                      <TableCell className="text-right font-bold text-primary">~48.000 €</TableCell>
                      <TableCell className="text-right font-bold text-primary">~135.000 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Auch bei voller Kinderzulagen-Mitnahme hängt das Endergebnis stark von Kosten und Aktienquote ab. Für Familien mit Kindern bleibt Riester förderseitig attraktiv — das Altersvorsorgedepot kombiniert dieselbe Kinderzulage mit höherer Renditechance.
              </p>

              <SectionH3>Szenario 2: Single ohne Kinder</SectionH3>
              <div className="overflow-x-auto -mx-6 px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]">Position</TableHead>
                      <TableHead className="min-w-[160px] text-right">Riester</TableHead>
                      <TableHead className="min-w-[180px] text-right">Altersvorsorgedepot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Eigenbeitrag pro Monat</TableCell>
                      <TableCell className="text-right">100 €</TableCell>
                      <TableCell className="text-right">100 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Grundzulage</TableCell>
                      <TableCell className="text-right">175 €/Jahr</TableCell>
                      <TableCell className="text-right">~480 €/Jahr</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Kinderzulage</TableCell>
                      <TableCell className="text-right">0 €</TableCell>
                      <TableCell className="text-right">0 €</TableCell>
                    </TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">Endkapital nach 30 Jahren (Größenordnung)</TableCell>
                      <TableCell className="text-right font-bold text-primary">~42.000 €</TableCell>
                      <TableCell className="text-right font-bold text-primary">~125.000 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Ohne Kinderzulage fällt die Riester-Förderung deutlich kleiner aus. Für Singles ohne Kinder ist das Altersvorsorgedepot oder ein kostengünstiger ETF-Sparplan rechnerisch meist überlegen.
              </p>

              {/* Fazit */}
              <SectionH2 id="fazit">Fazit: Neutral betrachtet</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Die Riester-Rente hat reale Vorteile: <strong className="text-foreground">staatliche Förderung, Beitragsgarantie, Pfändungsschutz und planbare lebenslange Rente</strong>. Für bestimmte Zielgruppen — vor allem Familien mit mehreren Kindern und sicherheitsorientierte Sparer — kann sie weiterhin sinnvoll sein.
                </p>
                <p>
                  Gleichzeitig ist klar: Das Produkt ist teuer, komplex und renditeschwach. Mit dem Altersvorsorgedepot ab 2027 bekommt der Markt eine modernere Alternative mit höheren Zulagen, niedrigeren Kosten und vollem Zugang zum Aktienmarkt — auch für Selbstständige.
                </p>
                <p>
                  Wer bereits einen Riester-Vertrag hat, sollte ihn nicht vorschnell kündigen. <strong className="text-foreground">Ruhen lassen ist fast immer die bessere Option</strong>, falls der Vertrag nicht mehr passt. Wer neu starten möchte, sollte ab 2027 das Altersvorsorgedepot ernsthaft in Erwägung ziehen.
                </p>
                <p>
                  Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
                </p>
              </div>

              {/* FAQ */}
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

              {/* Related */}
              <div className="mt-12">
                <p className="text-sm font-semibold mb-4">Verwandte Artikel</p>
                <div className="space-y-2">
                  <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/altersvorsorgedepot-vs-riester" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot vs. Riester: Die wichtigsten Unterschiede</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/etf-sparplan-anfaenger" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>ETF-Sparplan für Anfänger</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Alle Blog-Artikel</span>
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

export default BlogRiesterRente;
