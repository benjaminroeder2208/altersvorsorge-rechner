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
const PATH = "/blog/etf-sparplan-steuern";

const tocItems = [
  { id: "welche-steuern", label: "Welche Steuern fallen an?" },
  { id: "steuerstundung", label: "Der Steuerstundungseffekt" },
  { id: "thesaurierend", label: "Thesaurierend vs. ausschüttend" },
  { id: "kosten", label: "Neobroker vs. klassische Banken" },
  { id: "vergleich", label: "ETF vs. Altersvorsorgedepot" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Was ist die Vorabpauschale genau?",
    a: "Die Vorabpauschale ist eine fiktive jährliche Ertragsbesteuerung für thesaurierende Fonds. Sie stellt sicher, dass auch ohne Ausschüttung oder Verkauf ein Mindestbetrag versteuert wird. Die Höhe hängt vom Basiszins (wird jährlich festgelegt) und dem Fondsanfangswert ab. Formel: Fondsanfangswert × 70 % × Basiszins. Der tatsächliche Steuerbetrag ist gering — bei 10.000 € Depot und 2,5 % Basiszins ca. 46 € pro Jahr.",
  },
  {
    q: "Wie nutze ich den Freistellungsauftrag optimal?",
    a: "Der Sparerpauschbetrag liegt bei 1.000 € pro Person (2.000 € für Ehepaare). Verteile den Freistellungsauftrag auf alle Depots, bei denen du Erträge erzielst. Bei thesaurierenden ETFs fällt weniger laufender Ertrag an — du brauchst also weniger Freibetrag dort. Tipp: Prüfe jährlich, ob dein Freistellungsauftrag optimal verteilt ist. Ungenutzte Freibeträge verfallen am Jahresende.",
  },
  {
    q: "Ist der ETF-Sparplan oder das Altersvorsorgedepot steuerlich günstiger?",
    a: "Steuerlich ist das Altersvorsorgedepot günstiger, weil die Besteuerung nachgelagert erfolgt — also erst im Alter, wenn der persönliche Steuersatz meist niedriger ist. Außerdem gibt es staatliche Zulagen. Der ETF-Sparplan bietet dafür volle Flexibilität. Für die meisten ist eine Kombination aus beidem optimal: Altersvorsorgedepot für die geförderte Basisvorsorge, ETF-Sparplan für flexibles Zusatzkapital.",
  },
  {
    q: "Was passiert steuerlich, wenn ich meinen ETF-Sparplan auflöse?",
    a: "Beim Verkauf wird die Differenz zwischen Kauf- und Verkaufskurs besteuert (Abgeltungsteuer 25 % + Soli + ggf. Kirchensteuer). Bereits gezahlte Vorabpauschalen werden angerechnet, sodass du nicht doppelt besteuert wirst. Teilverkäufe sind möglich — du musst nicht alles auf einmal verkaufen. Die FIFO-Regel gilt: Zuerst gekaufte Anteile werden zuerst verkauft.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "ETF Sparplan Steuern: Was du wirklich zahlen musst — und wie du es optimierst",
    description: "Steuern können einen erheblichen Teil der ETF-Rendite auffressen — wenn man sie nicht versteht. Wir erklären Abgeltungsteuer, Vorabpauschale und den Steuerstundungseffekt.",
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
      { "@type": "ListItem", position: 3, name: "ETF Sparplan Steuern", item: `${BASE}${PATH}` },
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
      {to === "/altersvorsorgedepot-vs-etf-sparplan" ? "Zum Vergleich ETF vs. Depot" : "Zum Altersvorsorgedepot Rechner"}
    </Link>
  </div>
);

const SectionH2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ letterSpacing: "-0.02em" }}>{children}</h2>
);

const SectionH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg md:text-xl font-semibold mt-8 mb-3">{children}</h3>
);

const BlogEtfSteuern = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="ETF Sparplan Steuern: Was du wirklich zahlen musst — und wie du es optimierst"
        description="Steuern können einen erheblichen Teil der ETF-Rendite auffressen — wenn man sie nicht versteht. Wir erklären Abgeltungsteuer, Vorabpauschale und den Steuerstundungseffekt."
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
              <BreadcrumbItem><BreadcrumbPage>ETF Sparplan Steuern</BreadcrumbPage></BreadcrumbItem>
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
                  ETF Sparplan Steuern: Was du wirklich zahlen musst — und wie du es optimierst
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 7 Min. Lesezeit</span>
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
                <p>ETFs gelten als die günstigste Art zu investieren. Aber Steuern können einen erheblichen Teil der Rendite auffressen — wenn man sie nicht versteht.</p>
                <p>In diesem Artikel erklären wir dir die drei wichtigsten Steuerarten beim ETF-Sparplan, warum der <strong className="text-foreground">Steuerstundungseffekt</strong> über Jahrzehnte tausende Euro ausmacht — und wie das Altersvorsorgedepot ab 2027 steuerlich im Vergleich abschneidet.</p>
              </div>

              <CtaBlock to="/altersvorsorgedepot-vs-etf-sparplan">Vergleiche ETF-Sparplan mit dem staatlich geförderten Altersvorsorgedepot.</CtaBlock>

              {/* Welche Steuern */}
              <SectionH2 id="welche-steuern">Welche Steuern fallen beim ETF-Sparplan an?</SectionH2>

              <SectionH3>Abgeltungsteuer</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Auf Kursgewinne und Dividenden zahlst du in Deutschland die <strong className="text-foreground">Abgeltungsteuer von 25 %</strong>. Dazu kommt der Solidaritätszuschlag (5,5 % auf die Steuer) und gegebenenfalls Kirchensteuer (8–9 %).</p>
                <p>Der effektive Steuersatz ohne Kirchensteuer liegt bei <strong className="text-foreground">~26,375 %</strong>. Mit Kirchensteuer sind es je nach Bundesland 27,8–28,6 %.</p>
                <p>Wichtig: Die Abgeltungsteuer fällt nicht nur beim Verkauf an, sondern auch auf Ausschüttungen und die Vorabpauschale.</p>
              </div>

              <SectionH3>Vorabpauschale</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die Vorabpauschale ist eine <strong className="text-foreground">jährliche Mindestbesteuerung</strong> für thesaurierende ETFs. Auch wenn du nichts verkaufst und keine Ausschüttung erhältst, wird ein fiktiver Ertrag besteuert.</p>
                <p>Die Formel: <strong className="text-foreground">Fondsanfangswert × 70 % × Basiszins</strong></p>
              </div>

              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]">Position</TableHead>
                      <TableHead className="min-w-[140px] text-right">Beispiel 2026</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Depotanfangswert</TableCell><TableCell className="text-right">10.000 €</TableCell></TableRow>
                    <TableRow><TableCell>Basiszins (ca.)</TableCell><TableCell className="text-right">2,5 %</TableCell></TableRow>
                    <TableRow><TableCell>Vorabpauschale (10.000 × 70 % × 2,5 %)</TableCell><TableCell className="text-right">175 €</TableCell></TableRow>
                    <TableRow><TableCell>Teilfreistellung Aktienfonds (30 %)</TableCell><TableCell className="text-right">−52,50 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Steuerpflichtig</TableCell><TableCell className="text-right font-bold">122,50 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Steuer darauf (~26,375 %)</TableCell><TableCell className="text-right font-bold text-primary">~32 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">Die Vorabpauschale wird beim späteren Verkauf angerechnet — du zahlst also nicht doppelt. Aber sie reduziert deine laufende Liquidität minimal.</p>

              <SectionH3>Freistellungsauftrag</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Der <strong className="text-foreground">Sparerpauschbetrag</strong> liegt bei 1.000 € pro Person (2.000 € bei Ehepaaren). Erträge bis zu diesem Betrag sind steuerfrei — aber nur wenn du bei deiner Bank einen Freistellungsauftrag einrichtest.</p>
                <p><strong className="text-foreground">Tipp:</strong> Prüfe jährlich, ob dein Freistellungsauftrag optimal verteilt ist. Bei mehreren Depots solltest du den Freibetrag dort zuweisen, wo die meisten Erträge anfallen. Ungenutzte Freibeträge verfallen am Jahresende.</p>
              </div>

              {/* Steuerstundungseffekt */}
              <SectionH2 id="steuerstundung">Der Steuerstundungseffekt — warum er tausende Euro ausmacht</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Der Steuerstundungseffekt ist einer der <strong className="text-foreground">unterschätztesten Vorteile</strong> der Altersvorsorge. Das Prinzip: Wer Steuern erst später zahlt, hat in der Zwischenzeit mehr Kapital, das für ihn arbeitet.</p>
              </div>

              <SectionH3>Konkreter Vergleich</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">150 €/Monat, 30 Jahre, 7 % durchschnittliche Rendite p.a.:</p>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px]">Variante</TableHead>
                      <TableHead className="min-w-[130px] text-right">Endkapital</TableHead>
                      <TableHead className="min-w-[130px] text-right">Differenz</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">ETF-Sparplan (Steuer laufend)</TableCell><TableCell className="text-right">~196.600 €</TableCell><TableCell className="text-right text-muted-foreground">—</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-medium">Altersvorsorgedepot (nachgelagert + Förderung)</TableCell><TableCell className="text-right font-bold text-primary">~255.570 €</TableCell><TableCell className="text-right font-bold text-primary">+58.970 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">~59.000 € Unterschied</strong> — allein durch Steuerstundung und staatliche Förderung. Das ist fast ein Drittel mehr Kapital, obwohl du exakt den gleichen Betrag investierst.</p>
                <p>Der Grund: Beim ETF-Sparplan werden Gewinne laufend besteuert. Beim Altersvorsorgedepot bleibt das volle Kapital investiert und wächst über Jahrzehnte durch den <Link to="/blog/zinseszins-frueh-starten" className="text-primary font-medium hover:underline">Zinseszinseffekt</Link> stärker an.</p>
              </div>

              {/* Thesaurierend vs. ausschüttend */}
              <SectionH2 id="thesaurierend">Thesaurierend vs. ausschüttend — was ist steuerlich besser?</SectionH2>

              <SectionH3>Ausschüttende ETFs</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Dividenden werden regelmäßig ausgezahlt und <strong className="text-foreground">sofort besteuert</strong>. Der Freistellungsauftrag wird schneller aufgebraucht. Für die Wiederanlage musst du selbst aktiv werden oder eine automatische Wiederanlage einrichten.</p>

              <SectionH3>Thesaurierende ETFs</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Gewinne werden automatisch reinvestiert. Die Vorabpauschale fällt jährlich an, ist aber deutlich geringer als die laufende Dividendenbesteuerung. Die <strong className="text-foreground">eigentliche Steuer fällt erst beim Verkauf</strong> an — du profitierst also vom Steuerstundungseffekt.</p>
              </div>

              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[160px]">Kriterium</TableHead>
                      <TableHead className="min-w-[160px]">Ausschüttend</TableHead>
                      <TableHead className="min-w-[160px]">Thesaurierend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Besteuerungszeitpunkt</TableCell><TableCell>Sofort bei Ausschüttung</TableCell><TableCell>Erst bei Verkauf (+Vorabpauschale)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Steuerstundung</TableCell><TableCell>❌ Gering</TableCell><TableCell>✅ Hoch</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Freistellungsauftrag</TableCell><TableCell>Schneller aufgebraucht</TableCell><TableCell>Weniger belastet</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Wiederanlage</TableCell><TableCell>Manuell oder automatisch</TableCell><TableCell>✅ Automatisch</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Ideal für</TableCell><TableCell>Einkommen im Alter</TableCell><TableCell>✅ Langfristiger Aufbau</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground"><strong className="text-foreground">Empfehlung:</strong> Für langfristigen Vermögensaufbau sind thesaurierende ETFs steuerlich effizienter. Ausschüttende ETFs eignen sich eher, wenn du regelmäßige Erträge brauchst — zum Beispiel im Ruhestand.</p>

              {/* Kosten */}
              <SectionH2 id="kosten">Günstige Neobroker vs. klassische Banken</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Neben Steuern sind <strong className="text-foreground">Kosten der zweite große Renditefresser</strong>. Der Unterschied zwischen günstigen und teuren Anbietern summiert sich über Jahrzehnte auf fünfstellige Beträge.</p>
              </div>

              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[160px]">Anbietertyp</TableHead>
                      <TableHead className="min-w-[160px]">Typische Kosten</TableHead>
                      <TableHead className="min-w-[140px]">ETF-Sparplan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Neobroker</TableCell><TableCell>0 € Ordergebühr</TableCell><TableCell>Oft kostenlos</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Direktbank</TableCell><TableCell>~1,50 € pro Sparrate</TableCell><TableCell>Teils kostenlose Aktions-ETFs</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Klassische Filialbank</TableCell><TableCell>1–1,5 % Ausgabeaufschlag</TableCell><TableCell>Oft nicht verfügbar</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              <SectionH3>Was 0,5 % Kostenunterschied ausmachen</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">150 €/Monat über 30 Jahre bei 7 % Rendite:</p>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Effektive Kosten p.a.</TableHead>
                      <TableHead className="min-w-[130px] text-right">Endkapital</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>0,2 % (günstiger ETF + Neobroker)</TableCell><TableCell className="text-right">~170.000 €</TableCell></TableRow>
                    <TableRow><TableCell>0,7 % (teurer ETF + Filialbank)</TableCell><TableCell className="text-right">~145.000 €</TableCell></TableRow>
                    <TableRow className="bg-destructive/5"><TableCell className="font-semibold">Differenz</TableCell><TableCell className="text-right font-bold text-destructive">~25.000 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">25.000 € weniger Endkapital — nur durch 0,5 % höhere jährliche Kosten. Achte deshalb auf niedrige Gesamtkosten (TER + Transaktionskosten).</p>

              {/* Vergleich */}
              <SectionH2 id="vergleich">ETF-Sparplan oder Altersvorsorgedepot — was ist steuerlich günstiger?</SectionH2>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[160px]">Kriterium</TableHead>
                      <TableHead className="min-w-[160px]">ETF-Sparplan</TableHead>
                      <TableHead className="min-w-[180px]">Altersvorsorgedepot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Besteuerung</TableCell><TableCell>Laufend (Abgeltungsteuer)</TableCell><TableCell>Nachgelagert (im Alter)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Steuersatz</TableCell><TableCell>~26,375 % pauschal</TableCell><TableCell>Persönlicher Steuersatz (oft niedriger)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Staatliche Förderung</TableCell><TableCell>❌ Keine</TableCell><TableCell>✅ Bis 540 €/Jahr + Kinderzulage</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Verfügbarkeit</TableCell><TableCell>✅ Jederzeit</TableCell><TableCell>Ab 65 Jahren</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Anlagefreiheit</TableCell><TableCell>✅ Volle Auswahl</TableCell><TableCell>✅ Volle ETF-Auswahl</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Flexibilität</TableCell><TableCell>✅ Sehr hoch</TableCell><TableCell>⚠️ Gebunden bis 65</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Fazit:</strong> Steuerlich ist das Altersvorsorgedepot klar im Vorteil. Der ETF-Sparplan punktet bei Flexibilität. Für die meisten ist die <strong className="text-foreground">Kombination aus beidem optimal</strong>: Altersvorsorgedepot für die geförderte Basisvorsorge (bis 150 €/Monat), ETF-Sparplan für alles darüber hinaus.</p>
              </div>

              {/* Fazit */}
              <SectionH2 id="fazit">Fazit</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>ETF-Sparpläne sind eine hervorragende Anlageform — aber Steuern und Kosten bestimmen, wie viel von deiner Rendite tatsächlich bei dir ankommt. Die wichtigsten Hebel:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Freistellungsauftrag</strong> nutzen — 1.000 € steuerfrei pro Jahr</li>
                  <li><strong className="text-foreground">Thesaurierende ETFs</strong> für maximale Steuerstundung</li>
                  <li><strong className="text-foreground">Günstige Anbieter</strong> wählen — 0,5 % weniger Kosten = ~25.000 € mehr über 30 Jahre</li>
                  <li><strong className="text-foreground">Altersvorsorgedepot ab 2027</strong> als steuerlich geförderte Ergänzung nutzen</li>
                </ul>
              </div>

              <CtaBlock>Berechne jetzt, was das Altersvorsorgedepot ab 2027 für dich bringen könnte.</CtaBlock>

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
                  <Link to="/blog/altersvorsorgedepot-vs-etf-sparplan" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot vs. ETF-Sparplan: Lohnt sich der Wechsel?</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/zinseszins-frueh-starten" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Der Zinseszins-Effekt in Zahlen</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-16 p-5 bg-secondary rounded-xl">
                <p className="text-xs text-muted-foreground/70 italic leading-relaxed">
                  Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar. Steuerliche Angaben basieren auf dem Stand 2026 und können sich ändern. Für individuelle steuerliche Fragen empfehlen wir die Beratung durch einen Steuerberater.
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

export default BlogEtfSteuern;
