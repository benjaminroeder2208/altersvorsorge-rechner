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
const PATH = "/blog/rentenlucke-mit-30-40-50";

const tocItems = [
  { id: "warum-spaet", label: "Warum so viele zu spät anfangen" },
  { id: "szenario-30", label: "Szenario 1: Du bist 30" },
  { id: "szenario-40", label: "Szenario 2: Du bist 40" },
  { id: "szenario-50", label: "Szenario 3: Du bist 50" },
  { id: "foerderbonus", label: "Der Förderbonus im Vergleich" },
  { id: "was-tun", label: "Was du jetzt tun kannst" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Kann ich mit 55 noch sinnvoll für die Rente sparen?",
    a: "Ja. 12 Jahre Kapitalmarktwachstum mit staatlicher Förderung sind besser als gar keine Vorsorge. Die Lücke vollständig zu schließen wird schwer — aber jede Maßnahme verbessert deine Situation im Ruhestand. Zusätzlich lohnt es sich, die gesetzliche Rente durch freiwillige Beiträge oder späteren Renteneintritt aufzustocken.",
  },
  {
    q: "Was bringt mehr: höherer Beitrag oder früher anfangen?",
    a: "Früher anfangen schlägt fast immer einen höheren Beitrag. Wer mit 30 statt mit 40 anfängt, kann bei gleichem Endergebnis seinen monatlichen Beitrag mehr als halbieren — dank des Zinseszins-Effekts über einen längeren Zeitraum.",
  },
  {
    q: "Lohnt sich das Altersvorsorgedepot auch bei kurzer Restlaufzeit?",
    a: "Ja. Die staatliche Förderung wirkt ab dem ersten eingezahlten Euro — unabhängig davon, wie viele Jahre noch bis zur Rente bleiben. Bei 10–15 Jahren Laufzeit ist die Rendite durch die Förderung oft höher als bei einem ungeförderten Produkt mit längerer Laufzeit.",
  },
  {
    q: "Soll ich erst die Rentenlücke berechnen oder direkt loslegen?",
    a: "Beides ist sinnvoll — aber in dieser Reihenfolge: erst berechnen, dann handeln. Wer weiß, wie groß seine Lücke ist, kann den nötigen Monatsbeitrag realistisch einschätzen und vermeidet es, entweder zu wenig oder unnötig viel einzuzahlen.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Rentenlücke mit 30, 40 oder 50: Was du jetzt noch tun kannst",
    description: "Zu spät für die Altersvorsorge? Drei konkrete Szenarien mit echten Zahlen zeigen, was mit 30, 40 und 50 Jahren noch möglich ist — und wie das Altersvorsorgedepot ab 2027 hilft.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-03-15",
    dateModified: "2026-03-15",
    author: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    isPartOf: { "@type": "WebSite", url: `${BASE}/` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: "Rentenlücke mit 30, 40 oder 50", item: `${BASE}${PATH}` },
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
      {to === "/rentenluecken-rechner" ? "Zum Rentenlückenrechner" : "Zum Altersvorsorgedepot Rechner"}
    </Link>
  </div>
);

const SectionH2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ letterSpacing: "-0.02em" }}>{children}</h2>
);

const SectionH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg md:text-xl font-semibold mt-8 mb-3">{children}</h3>
);

const BlogRentenlueckeMit30_40_50 = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Rentenlücke mit 30, 40 oder 50: Was du jetzt noch tun kannst"
        description="Zu spät für die Altersvorsorge? Drei konkrete Szenarien mit echten Zahlen zeigen, was mit 30, 40 und 50 Jahren noch möglich ist — und wie das Altersvorsorgedepot ab 2027 hilft."
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
              <BreadcrumbItem><BreadcrumbPage>Rentenlücke mit 30, 40 oder 50</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-12">
            {/* Sticky TOC desktop */}
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
                  Rentenlücke mit 30, 40 oder 50: Was du jetzt noch tun kannst
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 8 Min. Lesezeit</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span>Stand: 2026</span>
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
                    <a key={item.id} href={`#${item.id}`} onClick={() => setTocOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground py-1.5">{item.label}</a>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Intro */}
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die meisten Menschen wissen, dass sie zu wenig für die Rente tun. Trotzdem fangen sie nicht an. Der häufigste Grund ist nicht Gleichgültigkeit — es ist das Gefühl, dass es ohnehin zu spät ist. "Hätte ich mal mit 25 angefangen." "Jetzt lohnt sich das doch nicht mehr."</p>
                <p>Das stimmt nicht. Aber je nachdem, ob du 30, 40 oder 50 bist, unterscheidet sich der beste Weg erheblich. In diesem Artikel bekommst du drei konkrete Szenarien mit echten Zahlen — damit du weißt, wo du stehst und was jetzt sinnvoll ist.</p>
              </div>

              <CtaBlock to="/rentenluecken-rechner">Wo stehst du? Berechne jetzt deine persönliche Rentenlücke.</CtaBlock>

              {/* Warum so viele zu spät anfangen */}
              <SectionH2 id="warum-spaet">Warum so viele zu spät anfangen — und warum das menschlich ist</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Mit 30 fühlt sich die Rente abstrakt an. Mit 40 kommen Kinder, Kredit, Karriere dazwischen. Mit 50 hat man das Thema so lange aufgeschoben, dass der Einstieg sich fast peinlich anfühlt.</p>
                <p>Das ist keine persönliche Schwäche — das ist, wie unser Gehirn mit weit entfernten Zielen umgeht. Zukünftige Bedürfnisse verlieren gegen unmittelbare Ausgaben fast immer.</p>
                <p>Das Ergebnis: Ein Großteil der Deutschen spart nach Einschätzung von Verbraucherschützern und Rentenforschern unzureichend für das Alter. Und das betrifft nicht nur Geringverdiener — sondern Mitte der Gesellschaft, gut verdienende Angestellte, Menschen mit soliden Jobs.</p>
                <p>Der einzige Fehler wäre, es weiter aufzuschieben.</p>
              </div>

              {/* Szenario 1: 30 */}
              <SectionH2 id="szenario-30">Szenario 1: Du bist 30 — und fängst jetzt an</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4"><strong className="text-foreground">Ausgangslage:</strong> 30 Jahre, 3.000 € brutto, bisher keine private Altersvorsorge.</p>

              <SectionH3>Die Rentenlücke</SectionH3>
              <div className="overflow-x-auto -mx-6 px-6 mb-6">
                <Table>
                  <TableHeader><TableRow><TableHead className="min-w-[260px]">Position</TableHead><TableHead className="min-w-[130px] text-right">Betrag/Monat</TableHead></TableRow></TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Geschätztes Nettoeinkommen mit 67</TableCell><TableCell className="text-right">~2.160 €</TableCell></TableRow>
                    <TableRow><TableCell>Erwartete gesetzliche Rente (netto)</TableCell><TableCell className="text-right">~1.050 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Rentenlücke</TableCell><TableCell className="text-right font-bold text-primary">~1.110 €/Monat</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              <SectionH3>Was du brauchst</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Um diese Lücke zu schließen, brauchst du zum Rentenbeginn ein Kapital von rund <strong className="text-foreground">240.000 €</strong>. Bei 37 Jahren Ansparzeit und 7 % Rendite p.a. sieht das so aus:</p>
              </div>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader><TableRow><TableHead className="min-w-[280px]" /><TableHead className="min-w-[180px]">Monatlicher Eigenbeitrag</TableHead></TableRow></TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Ohne Förderung (normaler ETF-Sparplan)</TableCell><TableCell>~105 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Mit Altersvorsorgedepot (inkl. Förderung)</TableCell><TableCell className="font-bold text-primary">~78 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">78 € pro Monat.</strong> Das sind 2,60 € am Tag — für eine vollständige Absicherung im Alter.</p>
              </div>

              <SectionH3>Die Botschaft für mit 30</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Du hast 37 Jahre vor dir. Das ist der größte Vorteil, den es in der Altersvorsorge gibt. Der Zinseszins-Effekt arbeitet über fast vier Jahrzehnte für dich — jeder Euro, den du heute einzahlst, ist am Ende fünf- bis sechsmal so viel wert. Wer jetzt anfängt, muss wenig einzahlen und bekommt viel zurück.</p>
                <p>Das Altersvorsorgedepot ab 2027 ist für diese Gruppe besonders attraktiv: volle Förderung, voller Anlagehorizont, maximaler Zinseszins-Effekt auf die staatlichen Zulagen.</p>
              </div>

              <CtaBlock>Berechne jetzt, was 78 € monatlich bis zur Rente ergeben.</CtaBlock>

              {/* Szenario 2: 40 */}
              <SectionH2 id="szenario-40">Szenario 2: Du bist 40 — und hast bisher wenig getan</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4"><strong className="text-foreground">Ausgangslage:</strong> 40 Jahre, 4.000 € brutto, kaum private Vorsorge aufgebaut.</p>

              <SectionH3>Die Rentenlücke</SectionH3>
              <div className="overflow-x-auto -mx-6 px-6 mb-6">
                <Table>
                  <TableHeader><TableRow><TableHead className="min-w-[260px]">Position</TableHead><TableHead className="min-w-[130px] text-right">Betrag/Monat</TableHead></TableRow></TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Geschätztes Nettoeinkommen mit 67</TableCell><TableCell className="text-right">~2.880 €</TableCell></TableRow>
                    <TableRow><TableCell>Erwartete gesetzliche Rente (netto)</TableCell><TableCell className="text-right">~1.350 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Rentenlücke</TableCell><TableCell className="text-right font-bold text-primary">~1.230 €/Monat</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              <SectionH3>Was du brauchst</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Zielkapital: rund <strong className="text-foreground">265.000 €</strong>. Bei 27 Jahren Ansparzeit:</p>
              </div>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader><TableRow><TableHead className="min-w-[280px]" /><TableHead className="min-w-[180px]">Monatlicher Eigenbeitrag</TableHead></TableRow></TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Ohne Förderung (normaler ETF-Sparplan)</TableCell><TableCell>~215 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Mit Altersvorsorgedepot (inkl. Förderung)</TableCell><TableCell className="font-bold text-primary">~160 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              <SectionH3>Zusatzhebel mit 40</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Mit 40 lohnt es sich, nicht nur den monatlichen Sparbeitrag zu erhöhen, sondern auch aktiv nach weiteren Hebeln zu suchen:</p>
                <p><strong className="text-foreground">Betriebliche Altersvorsorge (bAV) prüfen.</strong> Wenn dein Arbeitgeber einen Zuschuss zur bAV zahlt — was seit 2022 Pflicht ist — ist das oft der günstigste erste Schritt. Du sparst Steuern und Sozialabgaben direkt vom Bruttogehalt.</p>
                <p><strong className="text-foreground">Einmalzahlungen nutzen.</strong> Bonus, Steuerrückerstattung, kleine Erbschaft — wer mit 40 eine Einmalzahlung ins Altersvorsorgedepot steckt, gibt dem Zinseszins noch 27 Jahre Zeit zu wirken. Das kann den monatlichen Sparbedarf erheblich reduzieren.</p>
                <p><strong className="text-foreground">Kosten überprüfen.</strong> Wer mit 40 noch alte Riester-Verträge oder klassische Rentenversicherungen hat, sollte deren Kosten und Rendite kritisch prüfen. In vielen Fällen ist ein Wechsel sinnvoll.</p>
              </div>

              <SectionH3>Die Botschaft für mit 40</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>27 Jahre sind kein Rückstand — das sind 27 Jahre Kapitalmarktwachstum mit staatlicher Förderung. Wer mit 40 anfängt und konsequent dabei bleibt, kann eine solide Zusatzrente aufbauen. Der Unterschied zu mit 30: Du musst etwas mehr einzahlen, und du solltest alle verfügbaren Hebel nutzen — nicht nur einen.</p>
              </div>

              {/* Szenario 3: 50 */}
              <SectionH2 id="szenario-50">Szenario 3: Du bist 50 — ist es zu spät?</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4"><strong className="text-foreground">Ausgangslage:</strong> 50 Jahre, 4.500 € brutto, Altersvorsorge bisher weitgehend vernachlässigt.</p>

              <SectionH3>Die Rentenlücke</SectionH3>
              <div className="overflow-x-auto -mx-6 px-6 mb-6">
                <Table>
                  <TableHeader><TableRow><TableHead className="min-w-[260px]">Position</TableHead><TableHead className="min-w-[130px] text-right">Betrag/Monat</TableHead></TableRow></TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Geschätztes Nettoeinkommen mit 67</TableCell><TableCell className="text-right">~3.240 €</TableCell></TableRow>
                    <TableRow><TableCell>Erwartete gesetzliche Rente (netto)</TableCell><TableCell className="text-right">~1.500 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Rentenlücke</TableCell><TableCell className="text-right font-bold text-primary">~1.440 €/Monat</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              <SectionH3>Was realistisch erreichbar ist</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>17 Jahre sind wenig. Die Lücke vollständig zu schließen ist mit normalem monatlichem Sparen kaum möglich — das sollte man ehrlich sagen. Aber sie erheblich zu verkleinern ist absolut realistisch.</p>
              </div>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px]">Monatlicher Eigenbeitrag</TableHead>
                      <TableHead className="min-w-[120px]">Kapital mit 67</TableHead>
                      <TableHead className="min-w-[180px] text-right">Mögliche Zusatzrente bis 85</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>150 € (mit Förderung)</TableCell><TableCell>~75.000 €</TableCell><TableCell className="text-right">~347 €/Monat</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">300 € (mit Förderung)</TableCell><TableCell className="font-semibold">~150.000 €</TableCell><TableCell className="text-right font-semibold">~694 €/Monat</TableCell></TableRow>
                    <TableRow><TableCell>500 € (mit Förderung)</TableCell><TableCell>~250.000 €</TableCell><TableCell className="text-right">~1.157 €/Monat</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Bei 300 € monatlichem Eigenbeitrag — effektiv rund 220 € nach Förderung — lässt sich die Lücke fast zur Hälfte schließen. Das ist keine vollständige Lösung, aber ein erheblicher Unterschied.</p>
              </div>

              <SectionH3>Zusatzhebel mit 50</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Gesetzliche Rente aufstocken.</strong> Mit freiwilligen Zusatzbeiträgen zur gesetzlichen Rentenversicherung lässt sich die monatliche Rente direkt erhöhen — besonders interessant für Menschen, die in der Vergangenheit Lücken hatten (Elternzeit, Selbstständigkeit, Ausland).</p>
                <p><strong className="text-foreground">Renteneintritt überdenken.</strong> Wer ein Jahr länger arbeitet, bekommt nicht nur mehr Rentenpunkte — die Rente steigt pro Aufschubmonat um 0,5 %. Zwei Jahre länger arbeiten bedeutet 12 % mehr Monatsrente für den Rest des Lebens.</p>
                <p><strong className="text-foreground">Ausgabenplanung im Alter.</strong> Mit 50 ist es sinnvoll, realistisch durchzurechnen, was man im Ruhestand tatsächlich braucht. Viele überschätzen den Bedarf — weil Kinder aus dem Haus sind, der Kredit abgezahlt ist, Pendelkosten wegfallen.</p>
              </div>

              <SectionH3>Die Botschaft für mit 50</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Nein, es ist nicht zu spät. Die Lücke vollständig zu schließen ist schwer — aber sie zu halbieren ist absolut machbar. Und jede Maßnahme, die du jetzt ergreifst, ist besser als keine. Das Altersvorsorgedepot lohnt sich auch mit 17 Jahren Laufzeit — die Förderung wirkt sofort, in jedem Jahr.</p>
              </div>

              {/* Förderbonus */}
              <SectionH2 id="foerderbonus">Der Förderbonus wirkt in jedem Alter</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Ein direkter Vergleich aller drei Szenarien — jeweils mit dem Ziel, die individuelle Rentenlücke vollständig zu schließen:</p>
              </div>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[80px]">Alter</TableHead>
                      <TableHead className="min-w-[120px]">Rentenlücke</TableHead>
                      <TableHead className="min-w-[140px]">Ohne Förderung</TableHead>
                      <TableHead className="min-w-[140px]">Mit Förderung</TableHead>
                      <TableHead className="min-w-[130px] text-right">Ersparnis</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>30 Jahre</TableCell>
                      <TableCell>~1.110 €/Mon.</TableCell>
                      <TableCell>~105 €/Mon.</TableCell>
                      <TableCell className="font-bold text-primary">~78 €/Mon.</TableCell>
                      <TableCell className="text-right">~27 €/Mon.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>40 Jahre</TableCell>
                      <TableCell>~1.230 €/Mon.</TableCell>
                      <TableCell>~215 €/Mon.</TableCell>
                      <TableCell className="font-bold text-primary">~160 €/Mon.</TableCell>
                      <TableCell className="text-right">~55 €/Mon.</TableCell>
                    </TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">50 Jahre</TableCell>
                      <TableCell>~1.440 €/Mon.</TableCell>
                      <TableCell>~590 €/Mon.</TableCell>
                      <TableCell className="font-bold text-primary">~437 €/Mon.</TableCell>
                      <TableCell className="text-right font-semibold">~153 €/Mon.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Interessant: Je kürzer der Anlagehorizont, desto größer ist die absolute monatliche Ersparnis durch die Förderung. Mit 50 spart man durch das Altersvorsorgedepot über 150 € pro Monat Eigenbeitrag — weil die Förderung sofort und in voller Höhe wirkt, unabhängig vom Alter.</p>
              </div>

              {/* Was du jetzt tun kannst */}
              <SectionH2 id="was-tun">Was du jetzt konkret tun kannst</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Kein perfekter Plan ist nötig. Anfangen ist wichtiger als optimieren.</p>
                <p><strong className="text-foreground">Schritt 1: Rentenlücke berechnen.</strong> Bevor du irgendetwas tust, solltest du wissen, wie groß deine persönliche Lücke ist. Unser Rentenlückenrechner gibt dir in 30 Sekunden eine erste Orientierung.</p>
              </div>
              <div className="my-4">
                <Link to="/rentenluecken-rechner" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  <ArrowRight className="w-3.5 h-3.5" /> Zum Rentenlückenrechner
                </Link>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Schritt 2: Monatlichen Spielraum realistisch einschätzen.</strong> Was kannst du dauerhaft zurücklegen — nicht im besten Monat, sondern im normalen? Auch 50 € sind besser als nichts. Lieber klein anfangen und dabei bleiben als mit großen Beträgen starten und nach drei Monaten aufhören.</p>
                <p><strong className="text-foreground">Schritt 3: Betriebliche Altersvorsorge prüfen.</strong> Frag bei deinem Arbeitgeber nach, ob eine bAV angeboten wird und wie hoch der Arbeitgeberzuschuss ist. Das ist oft der einfachste und steuerlich günstigste erste Schritt.</p>
                <p><strong className="text-foreground">Schritt 4: Ab 2027 Altersvorsorgedepot eröffnen.</strong> Das neue Altersvorsorgedepot startet voraussichtlich am 1. Januar 2027. Informiere dich jetzt — und berechne, wie viel Kapital du bis zur Rente aufbauen könntest.</p>
              </div>

              <CtaBlock>Jetzt berechnen, was für dich noch möglich ist.</CtaBlock>

              {/* Fazit */}
              <SectionH2 id="fazit">Fazit</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Mit 30, 40 oder 50 — es lohnt sich immer noch, für die Rente vorzusorgen. Die Frage ist nicht ob, sondern wie. Wer früh anfängt, braucht wenig einzuzahlen. Wer später anfängt, braucht mehr Beitrag oder zusätzliche Hebel — aber das Ergebnis ist immer besser als nichts.</p>
                <p>Das Altersvorsorgedepot macht es ab 2027 leichter als je zuvor: staatliche Förderung, ETF-Investitionen, kein Garantiezwang. Die beste Zeit war vor 20 Jahren. Die zweitbeste Zeit ist jetzt.</p>
              </div>

              <CtaBlock>Berechne jetzt dein persönliches Ergebnis.</CtaBlock>

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
                  <Link to="/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Rentenlücke: Was sie ist und was du tun kannst</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/zinseszins-frueh-starten" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Früh starten vs. spät starten: Der Zinseszins-Effekt</span>
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
                  Alle Berechnungen basieren auf vereinfachten Annahmen (Rendite 7 % p.a., pauschale Steuer- und Abzugsschätzungen). Tatsächliche Renten- und Steuerwerte können erheblich abweichen. Alle Angaben basieren auf dem aktuellen Gesetzentwurf zur Reform der privaten Altersvorsorge. Änderungen im Gesetzgebungsverfahren sind möglich. Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
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

export default BlogRentenlueckeMit30_40_50;
