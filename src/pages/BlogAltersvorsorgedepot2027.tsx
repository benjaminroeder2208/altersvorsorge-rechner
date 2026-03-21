import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, ArrowRight, Calculator } from "lucide-react";
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
const PATH = "/blog/altersvorsorgedepot-2027";

const tocItems = [
  { id: "was-ist", label: "Was ist das Altersvorsorgedepot?" },
  { id: "wer-kann", label: "Wer kann es nutzen?" },
  { id: "foerderung", label: "Wie funktioniert die Förderung?" },
  { id: "phasen", label: "Anspar- und Auszahlungsphase" },
  { id: "vergleich", label: "Depot vs. ETF vs. Riester" },
  { id: "fuer-wen", label: "Für wen lohnt es sich?" },
  { id: "jetzt-tun", label: "Was du jetzt tun kannst" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Ist das Gesetz schon beschlossen?",
    a: "Nein. Stand heute liegt ein Regierungsentwurf vor, der den Gesetzgebungsprozess noch durchläuft. Der geplante Start ist der 1. Januar 2027. Änderungen einzelner Details sind möglich.",
  },
  {
    q: "Was passiert, wenn der Markt fällt?",
    a: "Da es keine Beitragsgarantie gibt, kann dein Depotwert zwischenzeitlich sinken. Das ist das Marktrisiko, das du eingehst. Langfristig — über 20, 30 oder 40 Jahre — haben breit gestreute Aktienportfolios historisch jedoch stets positive Renditen erzielt. Wer kurz vor der Rente ist, sollte das Portfolio entsprechend anpassen.",
  },
  {
    q: "Kann ich als Selbstständiger einzahlen?",
    a: "Die genaue Regelung hängt vom finalen Gesetz ab. Grundsätzlich ist ein breiter Förderberechtigtenkreis geplant — die Details für Selbstständige ohne Rentenversicherungspflicht sind noch offen.",
  },
  {
    q: "Was passiert, wenn ich vor 65 an das Geld muss?",
    a: "Eine vorzeitige Entnahme ist grundsätzlich möglich, aber dann entfällt die staatliche Förderung rückwirkend. Das angesparte Kapital gehört dir — du verlierst lediglich die Subventionierung. Eine Ausnahme ist laut aktuellem Entwurf die Verwendung für selbstgenutztes Wohneigentum.",
  },
  {
    q: "Ersetzt das Altersvorsorgedepot die gesetzliche Rente?",
    a: "Nein. Es ist eine Ergänzung zur gesetzlichen Rente — gedacht, um die Rentenlücke zu schließen, die zwischen dem letzten Gehalt und der tatsächlichen Rentenzahlung entsteht.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorgedepot 2027: Alles, was du wissen musst",
    description:
      "Das Altersvorsorgedepot kommt 2027 und löst Riester ab. Wir erklären, wie die Förderung funktioniert, was du bekommst — und für wen es sich wirklich lohnt.",
    url: `${BASE}${PATH}`,
    datePublished: "2025-06-01",
    dateModified: "2025-06-01",
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
        name: "Altersvorsorgedepot 2027",
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

/* ── CTA Block ── */
const CtaBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="my-10 p-6 md:p-8 bg-primary/5 border border-primary/10 rounded-2xl text-center">
    <p className="text-sm md:text-base text-foreground mb-4 font-medium">{children}</p>
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
    >
      <Calculator className="w-4 h-4" />
      Zum Altersvorsorgedepot Rechner
    </Link>
  </div>
);

/* ── Section heading ── */
const SectionH2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ letterSpacing: "-0.02em" }}>
    {children}
  </h2>
);

const SectionH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg md:text-xl font-semibold mt-8 mb-3">{children}</h3>
);

/* ── Main page ── */
const BlogAltersvorsorgedepot2027 = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorgedepot 2027: Alles, was du wissen musst"
        description="Das Altersvorsorgedepot kommt 2027 und löst Riester ab. Wir erklären, wie die Förderung funktioniert, was du bekommst — und für wen es sich wirklich lohnt."
        path={PATH}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8 max-w-2xl">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Altersvorsorgedepot 2027</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Layout: sidebar + article */}
          <div className="flex gap-12">
            {/* Sticky TOC — desktop */}
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

            {/* Article */}
            <article className="min-w-0 max-w-2xl">
              <AnimatedSection>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                  Altersvorsorgedepot 2027: Alles, was du wissen musst
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 8 Min. Lesezeit</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span>Stand: Gesetzentwurf 2025/2026</span>
                </div>
              </AnimatedSection>

              {/* Mobile TOC */}
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
                  Die Riester-Rente hat ihr Versprechen nicht gehalten. Hohe Kosten, komplizierte Regeln, magere Renditen — kaum jemand unter 40 hat noch einen Riester-Vertrag. Jetzt plant die Bundesregierung einen echten Neustart: das <strong className="text-foreground">Altersvorsorgedepot</strong>. Ab Januar 2027 soll es die staatlich geförderte private Altersvorsorge grundlegend verändern.
                </p>
                <p>
                  Was steckt dahinter? Für wen lohnt es sich? Und was kannst du konkret erwarten? Das erfährst du in diesem Artikel — inklusive Rechenbeispiele.
                </p>
              </div>

              <CtaBlock>Direkt loslegen? Berechne jetzt, was für dich drin ist.</CtaBlock>

              {/* ── Was ist das Altersvorsorgedepot? ── */}
              <SectionH2 id="was-ist">Was ist das Altersvorsorgedepot?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Das Altersvorsorgedepot ist ein neues Modell für die private Altersvorsorge, das im aktuellen Gesetzentwurf der Bundesregierung vorgesehen ist. Es funktioniert wie ein normales Wertpapierdepot — mit einem entscheidenden Unterschied: Der Staat fördert deine Einzahlungen mit Zulagen und Steuervorteilen.
                </p>
                <p>
                  Der größte Bruch mit der Vergangenheit: <strong className="text-foreground">keine Beitragsgarantie mehr.</strong> Bei Riester musste der Anbieter garantieren, dass du zum Rentenbeginn mindestens deine eingezahlten Beiträge zurückbekommst. Klingt sicher — war aber teuer. Diese Garantie hat dazu geführt, dass ein Großteil des Geldes in schwach verzinsten Anleihen geparkt wurde, statt am Kapitalmarkt zu arbeiten.
                </p>
                <p>
                  Beim Altersvorsorgedepot entfällt diese Garantie. Dein Geld kann vollständig in Fonds und ETFs investiert werden — mit allen Chancen, die der Kapitalmarkt langfristig bietet.
                </p>
                <p>
                  <strong className="text-foreground">Geplanter Start:</strong> 1. Januar 2027
                </p>
                <p>
                  <strong className="text-foreground">Status:</strong> Gesetzentwurf — Änderungen im Gesetzgebungsverfahren sind noch möglich.
                </p>
              </div>

              {/* ── Wer kann es nutzen? ── */}
              <SectionH2 id="wer-kann">Wer kann das Altersvorsorgedepot nutzen?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Grundsätzlich richtet sich das Altersvorsorgedepot an alle, die in Deutschland rentenversicherungspflichtig beschäftigt sind — also den Großteil der Arbeitnehmerinnen und Arbeitnehmer. Auch Beamte und bestimmte Selbstständige sollen förderberechtigt sein, die genauen Regelungen hängen vom finalen Gesetz ab.
                </p>
                <p>
                  Damit profitieren sowohl <strong className="text-foreground">Berufseinsteiger Mitte 20</strong>, die noch Jahrzehnte vor sich haben, als auch <strong className="text-foreground">Berufstätige zwischen 30 und 50</strong>, die ihre Altersvorsorge gezielt ausbauen wollen.
                </p>
                <p>
                  Der Mindestbeitrag für die Förderung liegt bei <strong className="text-foreground">120 € pro Jahr</strong> — also 10 € pro Monat. Das ist bewusst niedrig angesetzt, damit möglichst viele Menschen von Anfang an einsteigen können.
                </p>
              </div>

              {/* ── Förderung ── */}
              <SectionH2 id="foerderung">Wie funktioniert die staatliche Förderung?</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-6">
                Die Förderung ist der eigentliche Kern des neuen Modells. Sie setzt sich aus drei Bausteinen zusammen:
              </p>

              <SectionH3>1. Grundzulage</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Der Staat zahlt dir einen direkten Zuschuss auf deine Einzahlungen:</p>
                <ul className="list-disc pl-6 space-y-1">
                   <li><strong className="text-foreground">30 %</strong> auf Eigenbeiträge bis <strong className="text-foreground">1.200 € pro Jahr</strong></li>
                   <li><strong className="text-foreground">20 %</strong> auf Beiträge zwischen <strong className="text-foreground">1.200 € und 1.800 € pro Jahr</strong></li>
                 </ul>
                 <p>Das bedeutet: Wer den maximalen Eigenbeitrag von 1.800 € ausschöpft, bekommt bis zu <strong className="text-foreground">480 € Grundzulage</strong> vom Staat dazu.</p>
                 <p>Ab 2029 steigt der Fördersatz auf 35 % — dann sind bis zu 540 € Grundzulage pro Jahr möglich.</p>
              </div>

              <SectionH3>2. Kinderzulage</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Für jedes kindergeldberechtigte Kind gibt es eine zusätzliche Zulage von bis zu <strong className="text-foreground">300 € pro Jahr</strong>. Wer zwei Kinder hat, kann also bis zu 600 € extra erhalten — obendrauf auf die Grundzulage.
              </p>

              <SectionH3>3. Steuervorteil durch Sonderausgabenabzug</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Eigenbeiträge und Zulagen können als Sonderausgaben in der Steuererklärung geltend gemacht werden. Je nach persönlichem Steuersatz kann das eine zusätzliche Ersparnis von mehreren hundert Euro im Jahr bedeuten.
              </p>

              <SectionH3>Konkretes Rechenbeispiel: 150 € im Monat</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                Nehmen wir eine 35-jährige Angestellte, die monatlich <strong className="text-foreground">150 €</strong> einzahlt — also 1.800 € pro Jahr:
              </p>
              <div className="overflow-x-auto -mx-6 px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[240px]">Position</TableHead>
                      <TableHead className="min-w-[160px] text-right">Betrag pro Jahr</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Eigenbeitrag</TableCell>
                      <TableCell className="text-right">1.800 €</TableCell>
                    </TableRow>
                    <TableRow>
                       <TableCell>Grundzulage (30 % auf 1.200 € + 20 % auf 600 €)</TableCell>
                       <TableCell className="text-right font-semibold">480 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Steuervorteil (geschätzt, ~30 % Grenzsteuersatz)</TableCell>
                      <TableCell className="text-right font-semibold">~530 €</TableCell>
                    </TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">Gesamtförderung</TableCell>
                      <TableCell className="text-right font-bold text-primary">~1.010 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground mt-4">
                Auf jeden selbst eingezahlten Euro kommen also rund <strong className="text-foreground">60 Cent vom Staat dazu</strong> — das ist eine der attraktivsten Förderquoten, die es je für private Altersvorsorge in Deutschland gab.
              </p>

              {/* ── Phasen ── */}
              <SectionH2 id="phasen">Was passiert mit dem Geld? Anspar- und Auszahlungsphase</SectionH2>

              <SectionH3>Ansparphase</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Während deines Berufslebens zahlst du monatlich ein. Das Geld wird in Fonds oder ETFs investiert — du hast also je nach Anbieter eine Auswahl an Anlageoptionen. Da keine Beitragsgarantie besteht, kann dein Kapital kurzfristig schwanken. Langfristig haben breit gestreute Aktienfonds historisch jedoch solide Renditen erzielt.
              </p>

              <SectionH3>Auszahlungsphase</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Ab <strong className="text-foreground">65 Jahren</strong> (frühestens) kannst du mit der Auszahlung beginnen. Das Modell sieht vor:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Das Kapital wird in <strong className="text-foreground">monatlichen Raten</strong> ausgezahlt — mindestens bis zum Alter von <strong className="text-foreground">85 Jahren</strong></li>
                  <li>Zu Beginn der Auszahlungsphase kannst du bis zu <strong className="text-foreground">30 % des angesparten Kapitals</strong> als Einmalzahlung entnehmen</li>
                  <li>Die restlichen 70 % werden dann als monatliche Rente ausgezahlt</li>
                </ul>
              </div>

              <SectionH3>Konkretes Rechenbeispiel: Was kommt am Ende raus?</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                Wieder unsere 35-jährige Angestellte mit 150 € monatlich — jetzt mit Blick auf die Zielgerade:
              </p>
              <div className="overflow-x-auto -mx-6 px-6">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Monatlicher Eigenbeitrag</TableCell>
                      <TableCell className="text-right">150 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anlagehorizont bis 67</TableCell>
                      <TableCell className="text-right">~31 Jahre</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Angenommene Rendite</TableCell>
                      <TableCell className="text-right">7 % p.a.</TableCell>
                    </TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">Kapital zum Rentenbeginn</TableCell>
                      <TableCell className="text-right font-bold text-primary">~255.570 €</TableCell>
                    </TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">Mögliche monatliche Auszahlung bis 85</TableCell>
                      <TableCell className="text-right font-bold text-primary">~1.183 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground mt-4">
                Zum Vergleich: Ohne staatliche Förderung — also mit einem normalen Depot und denselben 150 € — würden bei gleicher Rendite nur rund <strong className="text-foreground">196.600 €</strong> zusammenkommen. Der Förderbonus macht in diesem Szenario also einen Unterschied von fast <strong className="text-foreground">60.000 €</strong>.
              </p>

              <CtaBlock>Deine persönlichen Zahlen sind anders? Berechne jetzt dein individuelles Ergebnis.</CtaBlock>

              <p className="text-xs text-muted-foreground/70 italic">
                Hinweis: Die Berechnung basiert auf vereinfachten Annahmen. Renditen sind keine Garantie. Steuerliche Effekte können individuell abweichen.
              </p>

              {/* ── Vergleich ── */}
              <SectionH2 id="vergleich">Altersvorsorgedepot vs. ETF-Sparplan vs. Riester</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                Kurzer Überblick für alle, die schon andere Produkte kennen:
              </p>
              <div className="overflow-x-auto -mx-6 px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[140px]" />
                      <TableHead className="min-w-[140px]">Altersvorsorgedepot</TableHead>
                      <TableHead className="min-w-[120px]">ETF-Sparplan</TableHead>
                      <TableHead className="min-w-[120px]">Riester</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Staatliche Förderung</TableCell>
                      <TableCell>✅ Ja</TableCell>
                      <TableCell>❌ Nein</TableCell>
                      <TableCell>✅ Ja</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Beitragsgarantie</TableCell>
                      <TableCell>❌ Nein</TableCell>
                      <TableCell>❌ Nein</TableCell>
                      <TableCell>✅ Ja (Nachteil!)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Anlage in ETFs</TableCell>
                      <TableCell>✅ Voll</TableCell>
                      <TableCell>✅ Voll</TableCell>
                      <TableCell>⚠️ Begrenzt</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Flexibilität</TableCell>
                      <TableCell>⚠️ Gebunden bis 65</TableCell>
                      <TableCell>✅ Jederzeit</TableCell>
                      <TableCell>⚠️ Gebunden</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Kostendeckel</TableCell>
                      <TableCell>✅ Geplant</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>❌ Oft hohe Kosten</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Besteuerung</TableCell>
                      <TableCell>Nachgelagert</TableCell>
                      <TableCell>Abgeltungsteuer</TableCell>
                      <TableCell>Nachgelagert</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground mt-4">
                <p>
                  <strong className="text-foreground">Fazit:</strong> Wer die Förderung mitnehmen will und den langen Atem hat, ist beim Altersvorsorgedepot gut aufgehoben. Wer maximale Flexibilität braucht, ist mit einem ETF-Sparplan besser bedient — bekommt dann aber keine staatliche Förderung.
                </p>
                <p className="flex flex-wrap gap-3 text-sm">
                  <Link to="/altersvorsorgedepot-vs-etf-sparplan" className="inline-flex items-center gap-1 text-primary hover:underline">
                    Altersvorsorgedepot vs. ETF-Sparplan <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link to="/altersvorsorgedepot-vs-riester" className="inline-flex items-center gap-1 text-primary hover:underline">
                    Altersvorsorgedepot vs. Riester <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>

              {/* ── Für wen ── */}
              <SectionH2 id="fuer-wen">Für wen lohnt es sich besonders?</SectionH2>

              <SectionH3>Berufseinsteiger (20–30 Jahre)</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Wer früh anfängt, profitiert am stärksten vom Zinseszins-Effekt. Über 40 Jahre kann aus einem monatlichen Beitrag von 100 € ein sechsstelliges Vermögen werden — zusätzlich zur gesetzlichen Rente. Und die staatliche Förderung läuft von Anfang an mit.
              </p>

              <SectionH3>Berufstätige Mitte 30–50</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Auch wer erst mit 35 oder 40 anfängt, kann noch erheblich profitieren. 25–30 Jahre Kapitalmarktinvestment mit Förderung sind immer noch deutlich besser als nichts. Besonders für Eltern ist die Kinderzulage ein echter Bonus.
              </p>

              <SectionH3>Mittleres Einkommen</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Die Förderquote ist so gestaltet, dass sie für mittlere Einkommen besonders attraktiv ist. Wer 1.800 € im Jahr einzahlt und 35–37 % Grenzsteuersatz hat, holt einen erheblichen Teil davon über Zulagen und Steuerersparnis zurück.
              </p>

              <SectionH3>Wer weniger profitiert</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Sehr hohe Einkommen (42 %+ Grenzsteuersatz) profitieren anteilig weniger von der Förderstruktur. Wer zudem einen sehr kurzen Anlagehorizont hat (z.&nbsp;B. ab 60 Jahren einsteigt), hat weniger Zeit, Marktschwankungen auszusitzen.
              </p>

              {/* ── Was du jetzt tun kannst ── */}
              <SectionH2 id="jetzt-tun">Was du jetzt tun kannst</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Das Altersvorsorgedepot kommt voraussichtlich am <strong className="text-foreground">1. Januar 2027</strong>. Bis dahin gibt es noch einige Monate — aber die beste Zeit, sich zu informieren und vorzubereiten, ist jetzt.
                </p>
                <p>Was sinnvoll ist:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Deinen aktuellen Vorsorgestand checken (gesetzliche Rente + ggf. bestehende Verträge)</li>
                  <li>Ausrechnen, wie hoch deine Rentenlücke sein könnte</li>
                  <li>Schauen, welchen monatlichen Beitrag du realistisch einplanen kannst</li>
                </ul>
                <p>Den letzten Schritt kannst du direkt hier machen:</p>
              </div>

              <CtaBlock>Jetzt berechnen, wie sich dein Altersvorsorgedepot entwickeln könnte.</CtaBlock>

              {/* ── FAQ ── */}
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
                <p className="text-sm font-semibold mb-4">Weiterführende Artikel</p>
                <div className="space-y-2">
                  <Link to="/blog/altersvorsorgedepot-vs-etf-sparplan" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot oder ETF-Sparplan?</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/altersvorsorgedepot-vs-riester" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot vs. Riester: Die wichtigsten Unterschiede</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/altersvorsorgedepot-foerderung" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Förderung im Detail</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
            </article>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default BlogAltersvorsorgedepot2027;
