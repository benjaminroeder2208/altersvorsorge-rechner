import { useState } from "react";
import BlogDisclaimer from "@/components/blog/BlogDisclaimer";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/blog/rentenlucke-berechnen";

const faqItems = [
  {
    q: "Wie groß ist die durchschnittliche Rentenlücke?",
    a: "Die durchschnittliche Rentenlücke in Deutschland liegt bei €800–1.200/Monat. Das hängt vom Einkommen ab: Je höher das Einkommen, desto größer die Lücke.",
  },
  {
    q: "Wie berechne ich meine Rentenlücke selbst?",
    a: "Formel: (Gewünschter Lebensstandard in €/Monat) − (Erwartete gesetzliche Rente in €/Monat) = Deine Rentenlücke. Nutze unseren Rechner für exakte Zahlen.",
  },
  {
    q: "Was ist der Unterschied: Rentenlücke vs. Versorgungslücke?",
    a: "Rentenlücke = Einkommensdifferenz. Versorgungslücke = wie viel Kapital du brauchst, um diese Lücke zu schließen. Eine €1.000 Lücke = ca. €240.000 Kapital (bei 4% Entnahmerate).",
  },
  {
    q: "Ist eine Rentenlücke schlecht?",
    a: "Nein. Eine Rentenlücke ist normal und zeigt nur, dass du privat vorsorgen musst. Das ist planbar — wenn du es früh erkennst.",
  },
  {
    q: "Wie schließe ich meine Rentenlücke am besten?",
    a: "Mit einer Kombination: Altersvorsorgedepot (Förderung) + ETF-Sparplan (Flexibilität) + bAV (falls vorhanden). Das ist die optimale Strategie.",
  },
  {
    q: "Mit wie viel Rente kann ich rechnen?",
    a: "Das hängt von deinen Erwerbstätigen-Jahren und deinen Einkommen ab. Faustregel: Du bekommst ca. 48–50% deines letzten Bruttogehalts.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Rentenlücke berechnen: So erkennst du deine persönliche Versorgungslücke",
    description: "Rentenlücke berechnen leicht gemacht. Wir zeigen, wie groß deine Lücke ist und wie viel du sparen musst.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-04-22",
    dateModified: "2026-04-22",
    author: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    isPartOf: { "@type": "WebSite", url: BASE },
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

const BlogRentenluckeBerechnen = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Rentenlücke berechnen: So erkennst du deine Versorgungslücke"
        description="Rentenlücke berechnen leicht gemacht. Wir zeigen, wie groß deine Lücke ist und wie viel du sparen musst. Mit Rechenbeispiel."
        path={PATH}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-24 pb-20">
        <article className="container max-w-2xl mx-auto px-6">
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
                  <Link to="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Rentenlücke berechnen</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Rentenlücke berechnen: So erkennst du deine persönliche Versorgungslücke
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold flex items-center gap-2">
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              Inhaltsverzeichnis
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-sm">
              <Link to="#was-ist" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                1. Was ist die Rentenlücke?
              </Link>
              <Link to="#formel" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                2. Die Rentenlücken-Formel
              </Link>
              <Link to="#szenarien" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                3. Drei realistische Szenarien
              </Link>
              <Link to="#strategie" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                4. Die beste Strategie
              </Link>
              <Link to="#sparbetrag" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                5. Wie viel muss ich sparen?
              </Link>
              <Link to="#fehler" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                6. Die größten Fehler
              </Link>
              <Link to="#faq" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                Häufige Fragen
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-lg">
                Die meisten Menschen wissen nicht, wie groß ihre Rentenlücke ist. Und das ist gefährlich. Wer nicht weiß, wie viel Geld ihm fehlt, kann nicht planen — und endet in der Altersarmut. In diesem Artikel zeigen wir dir, wie du deine Rentenlücke berechnest, was das bedeutet und wie du sie schließt.
              </p>
            </section>

            <section id="was-ist" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Was ist die Rentenlücke? (Definition)</h2>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Rentenlücke vs. Versorgungslücke</h3>
              <p className="mb-4">
                Zwei Begriffe, die oft verwechselt werden:
              </p>
              <div className="space-y-3 mb-6">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Rentenlücke</p>
                  <p className="text-sm text-muted-foreground">Der Betrag, den du monatlich brauchst, den die gesetzliche Rente aber nicht deckt. Z.B. €1.000/Monat.</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Versorgungslücke</p>
                  <p className="text-sm text-muted-foreground">Das Kapital, das du brauchst, um diese €1.000/Monat über 30 Jahre auszugleichen. Z.B. €240.000.</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-2">Warum entsteht die Rentenlücke?</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Demografischer Wandel: Weniger junge Menschen, mehr Rentner</li>
                <li>Sinkendes Rentenniveau: 1990 = 70% des Gehalts, heute = ca. 48%</li>
                <li>Inflation: Dein Lebensstandard wird teurer</li>
                <li>Längeres Leben: Mit 67 in Rente, mit 85+ noch am Leben</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">Wie groß ist sie wirklich?</h3>
              <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6">
                <p className="font-semibold mb-2">Durchschnittswerte in Deutschland:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Durchschnitts-Rentner: €600–800/Monat Lücke</li>
                  <li>• Mittleres Einkommen: €1.000–1.500/Monat Lücke</li>
                  <li>• Gutverdiener: €2.000–4.000/Monat Lücke</li>
                </ul>
              </div>
            </section>

            <section id="formel" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. Die Rentenlücken-Formel (wie man berechnet)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-2">Die Formel ist einfach</h3>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-6">
                <p className="font-mono text-sm mb-3">Gewünschter Lebensstandard − Gesetzliche Rente = Rentenlücke</p>
                <p className="text-sm text-muted-foreground">Beispiel: Du willst €3.000/Monat haben. Die Rente bringt €1.500. Deine Lücke = €1.500/Monat.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-2">Schritt 1: Berechne deine erwartete gesetzliche Rente</h3>
              <p className="mb-3 text-sm">
                Faustregel: Du bekommst ca. <strong>48–50% deines Bruttodurchschnitts-Einkommens</strong>. 
                <br/>Beispiel: 30 Jahre berufstätig, Durchschnitt €3.000 brutto/Monat = €1.500 Rente/Monat.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">Schritt 2: Definiere deinen Lebensstandard</h3>
              <p className="mb-3 text-sm">
                Wie viel brauchst du monatlich im Alter? Viele Menschen unterschätzen das. Rechne mit mindestens 80% deines aktuellen Nettoeinkommens.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">Schritt 3: Berechne die Lücke</h3>
              <div className="bg-secondary p-4 rounded-lg">
                <p className="font-mono text-sm">€3.000 (Wunsch) − €1.500 (Rente) = €1.500 Lücke/Monat</p>
              </div>
            </section>

            <section id="szenarien" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Drei realistische Szenarien</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario A: Angestellte/r (30 Jahre, €2.500 netto)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <div><span className="font-semibold">Aktuelles Netto-Einkommen:</span> €2.500/Monat</div>
                <div><span className="font-semibold">Erwartete Brutto-Rente:</span> €1.200/Monat (40 Erwerbsjahre)</div>
                <div><span className="font-semibold">Wunsch-Lebensstandard (80%):</span> €2.000/Monat</div>
                <div className="font-semibold border-t border-border/40 pt-2 text-primary">Rentenlücke: €800/Monat</div>
                <div className="text-xs text-muted-foreground">Versorgungslücke: €800 × 240 Monate = €192.000</div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario B: Selbstständige/r (35 Jahre, €3.500 netto)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <div><span className="font-semibold">Aktuelles Netto-Einkommen:</span> €3.500/Monat</div>
                <div><span className="font-semibold">Erwartete Brutto-Rente:</span> €900/Monat (freiwillig versichert oder gering)</div>
                <div><span className="font-semibold">Wunsch-Lebensstandard (80%):</span> €2.800/Monat</div>
                <div className="font-semibold border-t border-border/40 pt-2 text-primary">Rentenlücke: €1.900/Monat</div>
                <div className="text-xs text-muted-foreground">Versorgungslücke: €1.900 × 240 Monate = €456.000</div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario C: Gutverdiener/in (40 Jahre, €5.000 netto)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <div><span className="font-semibold">Aktuelles Netto-Einkommen:</span> €5.000/Monat</div>
                <div><span className="font-semibold">Erwartete Brutto-Rente:</span> €1.800/Monat (Beitragssatzgrenze)</div>
                <div><span className="font-semibold">Wunsch-Lebensstandard (80%):</span> €4.000/Monat</div>
                <div className="font-semibold border-t border-border/40 pt-2 text-primary">Rentenlücke: €2.200/Monat</div>
                <div className="text-xs text-muted-foreground">Versorgungslücke: €2.200 × 240 Monate = €528.000</div>
              </div>
            </section>

            <section id="strategie" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Die beste Strategie zur Schließung der Lücke</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Option 1: Altersvorsorgedepot (ab 2027)</h3>
              <p className="text-sm mb-3">
                €540/Jahr Förderung, 1,0% Kostendeckel, bis 65 gebunden. Perfect für Angestellte & Selbstständige.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Option 2: ETF-Sparplan</h3>
              <p className="text-sm mb-3">
                Jederzeit verfügbar, flexibel, keine Förderung. Ideal als Zusatz zum Depot.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Option 3: Betriebliche Altersvorsorge (bAV)</h3>
              <p className="text-sm mb-3">
                Steuer- und sozialabgabenfrei bis €302/Monat (2026). Arbeitgeber zahlt mind. 15% mit.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Option 4: Rürup-Rente (für Selbstständige)</h3>
              <p className="text-sm mb-3">
                Bei hohem Einkommen (42%+ Grenzsteuersatz) sehr attraktiv durch Sonderausgabenabzug.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2 border-t border-border/40 pt-4">Die optimale Kombination</h3>
              <div className="bg-primary/5 border-l-4 border-primary p-4">
                <p className="font-semibold mb-2">Beste Strategie für Angestellte:</p>
                <p className="text-sm mb-3">Altersvorsorgedepot (€150/Monat) + ETF-Sparplan (€100/Monat) + bAV (falls vorhanden)</p>
                
                <p className="font-semibold mb-2 mt-4">Beste Strategie für Selbstständige:</p>
                <p className="text-sm">Altersvorsorgedepot (€150/Monat) + ETF-Sparplan (€200/Monat) + Rürup (€300/Monat)</p>
              </div>
            </section>

            <section id="sparbetrag" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Wie viel muss ich monatlich sparen?</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Die Faustregel</h3>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-6">
                <p className="font-mono text-sm mb-2">Rentenlücke ÷ 480 Monate = monatlicher Sparbetrag</p>
                <p className="text-sm text-muted-foreground">480 Monate = 40 Jahre Sparzeit (Alter 25–65) mit 7% Rendite p.a.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Beispiele für unsere drei Szenarien</h3>
              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Szenario A: €800 Lücke</p>
                  <p className="text-sm">€800 ÷ 480 = <span className="font-semibold text-primary">€167/Monat</span> nötig</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Szenario B: €1.900 Lücke</p>
                  <p className="text-sm">€1.900 ÷ 480 = <span className="font-semibold text-primary">€396/Monat</span> nötig</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Szenario C: €2.200 Lücke</p>
                  <p className="text-sm">€2.200 ÷ 480 = <span className="font-semibold text-primary">€458/Monat</span> nötig</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Was ist realistisch?</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>€50–100/Monat: Einstieg (besser als nichts)</li>
                <li>€150–250/Monat: Solide Vorsorge</li>
                <li>€300+/Monat: Ambitioniert, aber möglich</li>
              </ul>
            </section>

            <section id="fehler" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">6. Die größten Fehler</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Fehler 1: "Ich verdiene genug, die Rente reicht"</h3>
                  <p className="text-sm text-muted-foreground">
                    Je höher dein Einkommen, desto größer die Lücke. Ein Gutverdiener mit €5.000 netto hat eine €2.200+ Lücke. Das ist nicht klein.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Fehler 2: "Ich rechne das später aus"</h3>
                  <p className="text-sm text-muted-foreground">
                    Später ist zu spät. Mit 50 brauchst du 3× so viel monatlich wie mit 30, um die gleiche Lücke zu schließen.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Fehler 3: "Ich warte auf bessere Zeiten"</h3>
                  <p className="text-sm text-muted-foreground">
                    Es gibt keine besseren Zeiten. Zeit schlägt Timing. €50/Monat jetzt &gt; €500/Monat in 10 Jahren.
                  </p>
                </div>
              </div>
            </section>

            <section id="faq" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Häufige Fragen</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqItems.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-sm font-medium">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          <div className="mt-12 p-6 bg-secondary rounded-2xl">
            <h3 className="font-semibold mb-2">Fazit</h3>
            <p className="text-sm text-muted-foreground">
              Deine Rentenlücke ist nicht etwas, das man ignorieren kann. Es ist etwas, das man aktiv schließt. Mit der richtigen Strategie und regelmäßig sparen: Die Lücke wird zur Sicherheit.
            </p>
          </div>

          {/* RELATED_ARTICLES_START */}
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold mb-4 text-foreground">📚 Verwandte Artikel</h3>
            <div className="space-y-2">
              <Link to="/blog/wie-viel-geld-braucht-man-im-alter" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Wie viel Geld braucht man im Alter?</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/altersvorsorge-30-jahre" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Altersvorsorge mit 30 Jahren</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/altersvorsorgedepot-vs-etf-sparplan" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Altersvorsorgedepot vs. ETF-Sparplan</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/altersvorsorge-berechnen" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Altersvorsorge berechnen: Schritt-für-Schritt zu deiner Rentenlücke</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            </div>
          </div>

          <BlogDisclaimer mitRechnung={true} />

          <div className="mt-8 text-center">
            <Link
              to="/rentenluecken-rechner"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Calculator className="w-4 h-4" />
              Berechne deine Rentenlücke
            </Link>
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  );
};

export default BlogRentenluckeBerechnen;
