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
const PATH = "/blog/rentenpunkte-kaufen";

const tocItems = [
  { id: "wie-funktioniert", label: "Wie funktioniert es?" },
  { id: "rendite", label: "Die Rendite-Rechnung" },
  { id: "wann-sinnvoll", label: "Wann es sich trotzdem lohnt" },
  { id: "vergleich", label: "Rentenpunkte vs. Altersvorsorgedepot" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Ab welchem Alter kann ich keine Rentenpunkte mehr kaufen?",
    a: "Freiwillige Beiträge zur gesetzlichen Rentenversicherung können grundsätzlich alle zahlen, die nicht pflichtversichert sind — zum Beispiel Selbstständige oder Hausfrauen. Für den Ausgleich von Rentenabschlägen bei Frühverrentung (§ 187a SGB VI) gilt: Diese Sonderzahlungen sind ab 50 Jahren möglich. Eine allgemeine Altersgrenze für freiwillige Beiträge gibt es nicht, aber der Nutzen sinkt mit zunehmender Nähe zum Renteneintritt.",
  },
  {
    q: "Wie viel kostet ein Rentenpunkt 2026?",
    a: "Der Preis eines Rentenpunkts ergibt sich aus dem vorläufigen Durchschnittsentgelt (2026: ca. 46.000 €) multipliziert mit dem Beitragssatz (18,6 %). Das ergibt rund 8.640 € für einen vollen Rentenpunkt. Ein Rentenpunkt erhöht die monatliche Rente aktuell um ca. 39 €.",
  },
  {
    q: "Lohnt sich der Kauf für Selbstständige?",
    a: "Für Selbstständige kann der Kauf von Rentenpunkten in bestimmten Fällen sinnvoll sein — vor allem wenn sie ihre Pflichtbeitragsjahre für den Erwerbsminderungsschutz auffüllen wollen oder einen steuerlichen Vorteil durch den Sonderausgabenabzug haben. Für den reinen Vermögensaufbau gibt es aber meist renditestärkere Alternativen wie das Altersvorsorgedepot oder einen ETF-Sparplan.",
  },
  {
    q: "Was ist besser — Rentenpunkte oder Altersvorsorgedepot?",
    a: "Das hängt von der individuellen Situation ab. Rentenpunkte bieten lebenslange, inflationsindexierte Sicherheit — aber mit schlechter Rendite. Das Altersvorsorgedepot bietet staatliche Förderung und marktübliche Renditen, ist aber bis 65 gebunden und nicht garantiert. Für die meisten ist eine Kombination sinnvoll: Rentenpunkte für den Sicherheitssockel, Altersvorsorgedepot für den Renditeanteil.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Rentenpunkte kaufen: Lohnt es sich wirklich?",
    description: "Wer freiwillig in die gesetzliche Rente einzahlt, kann seine Rente erhöhen. Aber die Rendite-Rechnung ist ernüchternd — wir zeigen die Zahlen ehrlich.",
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
      { "@type": "ListItem", position: 3, name: "Rentenpunkte kaufen", item: `${BASE}${PATH}` },
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

const BlogRentenpunkteKaufen = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Rentenpunkte kaufen: Lohnt es sich wirklich?"
        description="Wer freiwillig in die gesetzliche Rente einzahlt, kann seine Rente erhöhen. Aber die Rendite-Rechnung ist ernüchternd — wir zeigen die Zahlen ehrlich."
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
              <BreadcrumbItem><BreadcrumbPage>Rentenpunkte kaufen</BreadcrumbPage></BreadcrumbItem>
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
                  Rentenpunkte kaufen: Lohnt es sich wirklich?
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
                <p>Wer freiwillig in die gesetzliche Rente einzahlt, kann seine monatliche Rente im Alter erhöhen. Aber lohnt sich das — oder gibt es bessere Alternativen?</p>
                <p>In diesem Artikel rechnen wir ehrlich vor: Was kostet ein Rentenpunkt, was bringt er — und wie schneidet er im Vergleich zu einem <Link to="/blog/etf-sparplan-steuern" className="text-primary font-medium hover:underline">ETF-Sparplan</Link> oder dem <Link to="/blog/altersvorsorgedepot-2027" className="text-primary font-medium hover:underline">Altersvorsorgedepot ab 2027</Link> ab.</p>
              </div>

              <CtaBlock>Berechne jetzt, was das Altersvorsorgedepot ab 2027 für dich bringen könnte.</CtaBlock>

              {/* Abschnitt 1 */}
              <SectionH2 id="wie-funktioniert">Wie funktioniert das Rentenpunkte-Kaufen?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Technisch gesehen zahlst du <strong className="text-foreground">freiwillige Beiträge</strong> an die Deutsche Rentenversicherung. Für jeden eingezahlten Betrag bekommst du anteilig Rentenpunkte gutgeschrieben.</p>
                <p>Das ist möglich wenn du:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Nicht pflichtversichert</strong> bist (z. B. Selbstständige, Hausfrauen) — dann kannst du freiwillige Beiträge zahlen</li>
                  <li><strong className="text-foreground">Rentenabschläge ausgleichen</strong> willst — ab 50 Jahren kannst du Sonderzahlungen leisten, um Abschläge bei Frühverrentung (z. B. mit 63) auszugleichen</li>
                </ul>
              </div>

              <SectionH3>Was kostet ein Rentenpunkt 2026?</SectionH3>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]">Position</TableHead>
                      <TableHead className="min-w-[140px] text-right">Wert 2026</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Durchschnittsentgelt (vorläufig)</TableCell><TableCell className="text-right">~46.000 €</TableCell></TableRow>
                    <TableRow><TableCell>Beitragssatz</TableCell><TableCell className="text-right">18,6 %</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Preis eines Rentenpunkts</TableCell><TableCell className="text-right font-bold text-primary">~8.640 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Rentenwert pro Punkt/Monat</TableCell><TableCell className="text-right font-bold text-primary">~39 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground"><strong className="text-foreground">Beispiel:</strong> Du zahlst 8.640 € ein → du bekommst 1 Rentenpunkt → deine monatliche Rente steigt um ca. 39 € brutto — lebenslang.</p>

              {/* Abschnitt 2 */}
              <SectionH2 id="rendite">Die Rendite-Rechnung — ehrlich vorgerechnet</SectionH2>

              <SectionH3>Break-even-Analyse</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Wie lange musst du Rente beziehen, damit sich der Kauf lohnt?</p>
              </div>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]">Kennzahl</TableHead>
                      <TableHead className="min-w-[140px] text-right">Wert</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Investition</TableCell><TableCell className="text-right">8.640 €</TableCell></TableRow>
                    <TableRow><TableCell>Zusätzliche Rente/Monat</TableCell><TableCell className="text-right">39 €</TableCell></TableRow>
                    <TableRow><TableCell>Break-even (8.640 ÷ 39)</TableCell><TableCell className="text-right">221 Monate</TableCell></TableRow>
                    <TableRow className="bg-destructive/5"><TableCell className="font-semibold">Break-even-Alter (Renteneintritt 67)</TableCell><TableCell className="text-right font-bold text-destructive">~85,5 Jahre</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground"><strong className="text-foreground">Fazit:</strong> Nur wer deutlich älter als 85 wird, macht mit Rentenpunkten „Gewinn". Die durchschnittliche Lebenserwartung liegt bei ca. 80 Jahren (Männer) bzw. 84 Jahren (Frauen).</p>

              <SectionH3>Vergleich mit ETF-Sparplan</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Was passiert, wenn du die gleichen 8.640 € stattdessen in einen ETF investierst?</p>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px]">Variante</TableHead>
                      <TableHead className="min-w-[130px] text-right">Nach 20 Jahren</TableHead>
                      <TableHead className="min-w-[140px] text-right">Entnahme/Monat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Rentenpunkt kaufen</TableCell><TableCell className="text-right">—</TableCell><TableCell className="text-right">39 €/Monat</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-medium">ETF (7 % p.a.)</TableCell><TableCell className="text-right font-bold text-primary">~33.000 €</TableCell><TableCell className="text-right font-bold text-primary">~165 €/Monat*</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-muted-foreground/60 mt-2">* Entnahme über 20 Jahre bei 4 % Entnahmerate, vereinfachte Rechnung.</p>
              <p className="text-base leading-relaxed text-muted-foreground mt-4"><strong className="text-foreground">Der ETF bringt ~4× mehr pro Monat</strong> — allerdings ohne Garantie und ohne Inflationsschutz. Die gesetzliche Rente ist dafür lebenslang und inflationsindexiert.</p>

              {/* Abschnitt 3 */}
              <SectionH2 id="wann-sinnvoll">Wann Rentenpunkte kaufen trotzdem sinnvoll ist</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Trotz der ernüchternden Rendite gibt es Situationen, in denen der Kauf von Rentenpunkten eine kluge Entscheidung ist:</p>
              </div>

              <SectionH3>1. Ausgleich für Frühverrentung</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Wer mit 63 in Rente gehen will, muss <strong className="text-foreground">dauerhafte Abschläge</strong> von 0,3 % pro Monat (3,6 % pro Jahr) in Kauf nehmen. Durch Sonderzahlungen ab 50 Jahren lassen sich diese Abschläge ausgleichen — hier ist der Kauf oft sinnvoll, weil die Abschläge sonst lebenslang gelten.</p>

              <SectionH3>2. Hohes Sicherheitsbedürfnis</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Die gesetzliche Rente ist <strong className="text-foreground">inflationsindexiert</strong> (steigt mit den Löhnen) und wird <strong className="text-foreground">lebenslang</strong> gezahlt — auch wenn du 100 wirst. Kein ETF-Sparplan kann das garantieren.</p>

              <SectionH3>3. Erwerbsminderungsschutz verbessern</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Mehr Beitragsjahre und höhere Beiträge verbessern den <strong className="text-foreground">Anspruch auf Erwerbsminderungsrente</strong>. Für Selbstständige ohne gesetzliche Pflichtversicherung kann das ein wichtiger Baustein sein.</p>

              <SectionH3>4. Steuerliche Optimierung</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Beiträge zur gesetzlichen Rentenversicherung sind als <strong className="text-foreground">Sonderausgaben absetzbar</strong> (2026: bis zu 27.566 € für Alleinstehende). In einkommensstarken Jahren kann der Steuervorteil den effektiven Kaufpreis eines Rentenpunkts deutlich senken.</p>

              {/* Abschnitt 4 */}
              <SectionH2 id="vergleich">Rentenpunkte kaufen vs. Altersvorsorgedepot</SectionH2>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[160px]">Kriterium</TableHead>
                      <TableHead className="min-w-[160px]">Rentenpunkte</TableHead>
                      <TableHead className="min-w-[180px]">Altersvorsorgedepot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Renditeerwartung</TableCell><TableCell>❌ Gering (~1–2 % real)</TableCell><TableCell>✅ Marktüblich (5–7 % nominal)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Garantie</TableCell><TableCell>✅ Lebenslang garantiert</TableCell><TableCell>❌ Keine Beitragsgarantie</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Inflationsschutz</TableCell><TableCell>✅ An Lohnentwicklung gekoppelt</TableCell><TableCell>⚠️ Nur durch Marktrendite</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Staatliche Förderung</TableCell><TableCell>Sonderausgabenabzug</TableCell><TableCell>✅ Zulagen + Steuerersparnis</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Flexibilität</TableCell><TableCell>❌ Kein Zugriff vor Rente</TableCell><TableCell>⚠️ Ab 65 verfügbar</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Vererbbarkeit</TableCell><TableCell>❌ Stark eingeschränkt</TableCell><TableCell>✅ Kapital vererbbar</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Ideal für</TableCell><TableCell>Sicherheitssockel, Frühverrentung</TableCell><TableCell>Langfristigen Vermögensaufbau</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Empfehlung:</strong> Für die meisten Menschen ist eine <strong className="text-foreground">Kombination</strong> sinnvoll — Rentenpunkte für den Sicherheitssockel (vor allem bei Frühverrentung), das Altersvorsorgedepot ab 2027 für den renditestarken Aufbauanteil.</p>
              </div>

              {/* Fazit */}
              <SectionH2 id="fazit">Fazit</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Rentenpunkte kaufen ist <strong className="text-foreground">kein gutes Rendite-Investment</strong>. Der Break-even liegt bei über 85 Jahren, die monatliche Rente pro investiertem Euro ist deutlich niedriger als bei einem ETF-Sparplan oder dem Altersvorsorgedepot.</p>
                <p>Trotzdem kann der Kauf in bestimmten Situationen sinnvoll sein:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Frühverrentung:</strong> Abschläge dauerhaft ausgleichen</li>
                  <li><strong className="text-foreground">Maximale Sicherheit:</strong> Lebenslange, inflationsindexierte Rente</li>
                  <li><strong className="text-foreground">Steueroptimierung:</strong> In einkommensstarken Jahren den Sonderausgabenabzug nutzen</li>
                </ul>
                <p>Die klügere Frage ist nicht „Rentenpunkte <em>oder</em> Altersvorsorgedepot" — sondern <strong className="text-foreground">wie kombiniere ich beides optimal?</strong></p>
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
                  <Link to="/blog/altersvorsorgedepot-vs-riester" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot vs. Riester</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Rentenlücke: Was sie ist — und was du tun kannst</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/altersvorsorge-selbststaendige" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorge für Selbstständige</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-16 p-5 bg-secondary rounded-xl">
                <p className="text-xs text-muted-foreground/70 italic leading-relaxed">
                  Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar. Alle Angaben basieren auf dem Stand 2026 und können sich ändern. Für individuelle Entscheidungen empfehlen wir die Beratung durch eine unabhängige Verbraucherzentrale oder einen zugelassenen Finanzberater.
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

export default BlogRentenpunkteKaufen;
