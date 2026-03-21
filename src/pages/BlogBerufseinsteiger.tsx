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
const PATH = "/blog/altersvorsorge-berufseinsteiger";

const tocItems = [
  { id: "unterschied", label: "Der Unterschied den 10 Jahre machen" },
  { id: "wie-viel", label: "Wie viel sollte ich sparen?" },
  { id: "optionen", label: "Die drei besten Optionen" },
  { id: "vermeiden", label: "Was du vermeiden solltest" },
  { id: "einstiegsplan", label: "Der konkrete Einstiegsplan" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Wie viel sollte ich mit 20 für die Rente sparen?",
    a: "Die Faustregel lautet 10–15 % des Nettogehalts. Aber: Lieber 50 € jetzt als 200 € in fünf Jahren. Der Zinseszinseffekt macht frühe, kleine Beträge wertvoller als späte, große. Starte mit dem, was du dir leisten kannst — und erhöhe die Sparrate mit jeder Gehaltserhöhung automatisch.",
  },
  {
    q: "ETF-Sparplan oder Altersvorsorgedepot als Berufseinsteiger?",
    a: "Idealerweise beides. Ein ETF-Sparplan ist sofort verfügbar, flexibel und hat keine Mindestlaufzeit — perfekt als Einstieg. Das Altersvorsorgedepot kommt ab 2027 und bietet zusätzlich staatliche Förderung. Die optimale Strategie: Jetzt mit ETF-Sparplan starten, ab 2027 einen Teil in das Altersvorsorgedepot umschichten und die Förderung mitnehmen.",
  },
  {
    q: "Lohnt sich bAV schon beim ersten Job?",
    a: "Ja — wenn dein Arbeitgeber mindestens 15 % Zuschuss zahlt (gesetzlich vorgeschrieben bei Entgeltumwandlung). Durch die Steuer- und Sozialabgabenersparnis kostet dich ein bAV-Beitrag von 100 € netto oft nur 50–60 €. Prüfe aber die Konditionen: Hohe Verwaltungskosten oder schlechte Fondsauswahl können den Vorteil auffressen.",
  },
  {
    q: "Was ist, wenn ich noch Student bin?",
    a: "Als Student mit geringem Einkommen ist Altersvorsorge kein Muss — aber ein Vorteil. Schon 25–50 € monatlich in einen ETF-Sparplan machen über 45 Jahre einen enormen Unterschied. Wichtiger ist zunächst: kein Konsumschulden aufbauen und einen kleinen Notgroschen (1.000–2.000 €) anlegen. Die Altersvorsorge kann mit dem Berufseinstieg richtig starten.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorge mit 20: Warum jetzt der beste Zeitpunkt ist — und wie du startest",
    description: "Mit 20 fühlt sich die Rente abstrakt an. Aber kein Berufstätiger hat mehr Zeit als du gerade — und Zeit ist das einzige was du später nicht kaufen kannst.",
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
      { "@type": "ListItem", position: 3, name: "Altersvorsorge Berufseinsteiger", item: `${BASE}${PATH}` },
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
      Zum Altersvorsorgedepot Rechner
    </Link>
  </div>
);

const SectionH2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ letterSpacing: "-0.02em" }}>{children}</h2>
);

const SectionH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg md:text-xl font-semibold mt-8 mb-3">{children}</h3>
);

const BlogBerufseinsteiger = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorge mit 20: Warum jetzt der beste Zeitpunkt ist — und wie du startest"
        description="Mit 20 fühlt sich die Rente abstrakt an. Aber kein Berufstätiger hat mehr Zeit als du gerade — und Zeit ist das einzige was du später nicht kaufen kannst."
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
              <BreadcrumbItem><BreadcrumbPage>Altersvorsorge Berufseinsteiger</BreadcrumbPage></BreadcrumbItem>
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
                  Altersvorsorge mit 20: Warum jetzt der beste Zeitpunkt ist — und wie du startest
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 8 Min. Lesezeit</span>
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
                <p>Mit 20 fühlt sich die Rente abstrakt an. 40 Jahre entfernt. Andere Prioritäten. Aber kein einziger Berufstätiger in Deutschland hat mehr Zeit als du gerade — und <strong className="text-foreground">Zeit ist das einzige, was du später nicht kaufen kannst.</strong></p>
                <p>In diesem Artikel zeigen wir dir mit konkreten Zahlen, warum jedes Jahr zählt, wie viel du wirklich sparen solltest — und welche drei Optionen für Berufseinsteiger am besten funktionieren.</p>
              </div>

              <CtaBlock>Berechne, was 100 € monatlich ab heute bis zur Rente ergeben.</CtaBlock>

              {/* Abschnitt 1 */}
              <SectionH2 id="unterschied">Der Unterschied, den 10 Jahre machen</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Der <Link to="/blog/zinseszins-frueh-starten" className="text-primary font-medium hover:underline">Zinseszinseffekt</Link> ist der mächtigste Hebel beim Vermögensaufbau. Und er braucht vor allem eins: Zeit.</p>
                <p>Gleicher Beitrag, gleiche Rendite — nur ein anderer Startpunkt:</p>
              </div>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[120px]">Start mit</TableHead>
                      <TableHead className="min-w-[120px]">Beitrag</TableHead>
                      <TableHead className="min-w-[100px] text-right">Laufzeit</TableHead>
                      <TableHead className="min-w-[140px] text-right">Endkapital*</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">20 Jahren</TableCell><TableCell>100 €/Monat</TableCell><TableCell className="text-right">47 Jahre</TableCell><TableCell className="text-right font-bold text-primary">~538.000 €</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">30 Jahren</TableCell><TableCell>100 €/Monat</TableCell><TableCell className="text-right">37 Jahre</TableCell><TableCell className="text-right">~265.000 €</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">40 Jahren</TableCell><TableCell>100 €/Monat</TableCell><TableCell className="text-right">27 Jahre</TableCell><TableCell className="text-right">~122.000 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-muted-foreground/60 mt-2">* Bei 7 % durchschnittlicher Rendite p.a., vor Steuern und Kosten. Renteneintritt mit 67.</p>
              <div className="my-6 p-5 bg-destructive/5 border border-destructive/10 rounded-xl">
                <p className="text-base font-semibold text-foreground mb-1">10 Jahre Aufschub kosten 273.000 €</p>
                <p className="text-sm text-muted-foreground">— ohne einen Cent mehr einzuzahlen. Der Unterschied entsteht allein durch den Zinseszinseffekt.</p>
              </div>

              {/* Abschnitt 2 */}
              <SectionH2 id="wie-viel">Wie viel sollte ich als Berufseinsteiger sparen?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die klassische Faustregel: <strong className="text-foreground">10–15 % des Nettogehalts</strong> für die Altersvorsorge zurücklegen.</p>
              </div>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[160px]">Nettoeinkommen</TableHead>
                      <TableHead className="min-w-[120px] text-right">10 %</TableHead>
                      <TableHead className="min-w-[120px] text-right">15 %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>1.800 €</TableCell><TableCell className="text-right">180 €</TableCell><TableCell className="text-right">270 €</TableCell></TableRow>
                    <TableRow><TableCell>2.200 €</TableCell><TableCell className="text-right">220 €</TableCell><TableCell className="text-right">330 €</TableCell></TableRow>
                    <TableRow><TableCell>2.600 €</TableCell><TableCell className="text-right">260 €</TableCell><TableCell className="text-right">390 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Aber:</strong> Lieber 50 € jetzt als 200 € in fünf Jahren. Der Zinseszins belohnt Frühstarter überproportional.</p>
                <p><strong className="text-foreground">„Save More Tomorrow"-Prinzip:</strong> Erhöhe deine Sparrate automatisch mit jeder Gehaltserhöhung um die Hälfte des Zuwachses. So spürst du die Erhöhung kaum — und baust trotzdem systematisch Vermögen auf.</p>
              </div>

              {/* Abschnitt 3 */}
              <SectionH2 id="optionen">Die drei besten Optionen für Berufseinsteiger</SectionH2>

              <SectionH3>1. ETF-Sparplan — sofort starten</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Ein <Link to="/blog/etf-sparplan-steuern" className="text-primary font-medium hover:underline">ETF-Sparplan</Link> ist der einfachste und flexibelste Einstieg:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Kein Mindestbeitrag</strong> — viele Broker ab 25 €/Monat</li>
                  <li><strong className="text-foreground">Volle Flexibilität</strong> — jederzeit pausieren, erhöhen oder auszahlen</li>
                  <li><strong className="text-foreground">Günstig</strong> — bei Neobrokern oft 0 € Ordergebühr</li>
                  <li><strong className="text-foreground">Breite Streuung</strong> — ein Welt-ETF reicht für den Anfang</li>
                </ul>
                <p>Ideal als <strong className="text-foreground">erster Schritt</strong>, auch wenn du noch nicht genau weißt, wie viel du langfristig investieren kannst.</p>
              </div>

              <SectionH3>2. Betriebliche Altersvorsorge (bAV)</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Falls dein Arbeitgeber mehr als den gesetzlichen Mindestzuschuss von 15 % zahlt: <strong className="text-foreground">sofort nutzen.</strong></p>
                <p>Durch die Entgeltumwandlung sparst du Steuern und Sozialabgaben — ein bAV-Beitrag von 100 € brutto kostet dich netto oft nur <strong className="text-foreground">50–60 €</strong>. Mehr dazu in unserem <Link to="/blog/betriebliche-altersvorsorge" className="text-primary font-medium hover:underline">bAV-Artikel</Link>.</p>
                <p>⚠️ Achte auf die Konditionen: Hohe Verwaltungskosten oder schlechte Fondsauswahl können den Arbeitgeberzuschuss auffressen.</p>
              </div>

              <SectionH3>3. Altersvorsorgedepot ab 2027</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Das <Link to="/blog/altersvorsorgedepot-2027" className="text-primary font-medium hover:underline">Altersvorsorgedepot</Link> kombiniert die Flexibilität eines ETF-Sparplans mit <strong className="text-foreground">staatlicher Förderung</strong>:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Grundzulage bis zu <strong className="text-foreground">540 €/Jahr</strong></li>
                  <li>Volle ETF-Auswahl, keine Beitragsgarantie</li>
                  <li>Steuerlicher Sonderausgabenabzug</li>
                </ul>
                <p>Gerade für Berufseinsteiger mit 40+ Jahren bis zur Rente ist der <Link to="/blog/zinseszins-frueh-starten" className="text-primary font-medium hover:underline">Zinseszinseffekt auf die Förderung</Link> enorm.</p>
              </div>

              {/* Abschnitt 4 */}
              <SectionH2 id="vermeiden">Was Berufseinsteiger vermeiden sollten</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Nicht jedes Altersvorsorge-Produkt ist sinnvoll — gerade am Anfang lauern teure Fallen:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong className="text-foreground">Kapitallebensversicherungen</strong> — hohe Abschluss- und Verwaltungskosten, intransparente Anlage, kaum Rendite. In den ersten Jahren fließt ein Großteil deiner Beiträge in die Provision des Vermittlers.</li>
                  <li><strong className="text-foreground">Rentenversicherungen mit Beitragsgarantie</strong> — die Garantie klingt sicher, frisst aber die Rendite. Über 40 Jahre Laufzeit verlierst du durch die konservative Anlage oft mehr als du „sparst".</li>
                  <li><strong className="text-foreground">Zu lange warten</strong> — „Wenn ich mehr verdiene, fange ich an" ist der teuerste Satz in der Altersvorsorge. Jedes Jahr kostet Zinseszins.</li>
                  <li><strong className="text-foreground">Alles auf ein Produkt setzen</strong> — Diversifikation gilt nicht nur für ETFs, sondern auch für die Vorsorgestrategie. ETF + bAV + Altersvorsorgedepot = optimale Mischung.</li>
                </ul>
              </div>

              {/* Abschnitt 5 */}
              <SectionH2 id="einstiegsplan">Der konkrete Einstiegsplan</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>In vier Schritten zur soliden Altersvorsorge als Berufseinsteiger:</p>
              </div>

              <div className="space-y-4 my-6">
                <div className="flex gap-4 p-5 bg-secondary rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Notgroschen aufbauen</p>
                    <p className="text-sm text-muted-foreground">3 Monatsgehälter auf einem Tagesgeldkonto. Das ist dein Sicherheitspuffer für unerwartete Ausgaben — und die Voraussetzung, um langfristig investieren zu können.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 bg-secondary rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">bAV prüfen</p>
                    <p className="text-sm text-muted-foreground">Frag deinen Arbeitgeber: Gibt es eine betriebliche Altersvorsorge? Wie hoch ist der Zuschuss? Wenn er über 15 % liegt und die Konditionen stimmen — sofort nutzen.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 bg-secondary rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">ETF-Sparplan starten</p>
                    <p className="text-sm text-muted-foreground">50–100 €/Monat in einen breit gestreuten Welt-ETF bei einem günstigen Neobroker. Kein Timing, kein Stock-Picking — einfach monatlich investieren und laufen lassen.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 bg-secondary rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">4</div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Ab 2027: Altersvorsorgedepot eröffnen</p>
                    <p className="text-sm text-muted-foreground">Einen Teil des ETF-Sparplans in das staatlich geförderte Altersvorsorgedepot umschichten. So nimmst du die Förderung mit, behältst aber auch flexible Ersparnisse im ETF-Sparplan.</p>
                  </div>
                </div>
              </div>

              {/* Fazit */}
              <SectionH2 id="fazit">Fazit</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Du musst nicht viel einzahlen. Du musst nur <strong className="text-foreground">früh anfangen</strong>.</p>
                <p><strong className="text-foreground">50 € heute sind mehr wert als 200 € in 10 Jahren.</strong> Das ist keine Meinung — das ist Mathematik.</p>
                <p>Der perfekte Zeitpunkt ist nicht „wenn du mehr verdienst". Der perfekte Zeitpunkt ist <strong className="text-foreground">jetzt</strong>.</p>
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
                  <Link to="/blog/zinseszins-frueh-starten" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Der Zinseszins-Effekt in Zahlen</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/betriebliche-altersvorsorge" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Betriebliche Altersvorsorge: Lohnt sich das?</span>
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

export default BlogBerufseinsteiger;
