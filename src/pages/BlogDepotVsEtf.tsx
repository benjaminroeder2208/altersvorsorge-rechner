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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/blog/altersvorsorgedepot-vs-etf-sparplan";

const faqItems = [
  {
    q: "Welches Produkt ist besser: Depot oder ETF?",
    a: "Für Anfänger: Starten mit ETF-Sparplan (jederzeit verfügbar). Ab 2027: Altersvorsorgedepot nutzen (Förderung). Optimal: Beide kombinieren.",
  },
  {
    q: "Kann ich von ETF-Sparplan zum Depot wechseln?",
    a: "Ja. Du kannst einen ETF-Sparplan stoppen und ab 2027 zum Depot wechseln. Die bisherigen Ersparnisse bleiben wo sie sind.",
  },
  {
    q: "Lohnt sich das Depot wirklich wegen der €540 Förderung?",
    a: "Ja. Die Förderung macht über 30 Jahre ca. €17.280 aus. Das ist gratis Geld. Selbst mit höheren Kosten lohnt sich das Depot.",
  },
  {
    q: "Was ist die beste Kombination?",
    a: "Ideal: €150/Monat ins Depot (für Förderung) + €100/Monat in ETF-Sparplan (für Flexibilität). So hast du Sicherheit UND Flexibilität.",
  },
  {
    q: "Bin ich beim Depot wirklich bis 65 gebunden?",
    a: "Ja, das Kapital ist bis zum Renteneintritt (mind. 65) gebunden. Aber: Du kannst jederzeit stoppen zu sparen. Dein Depot wächst weiter.",
  },
  {
    q: "Welcher ETF-Sparplan ist der beste?",
    a: "Das kommt auf deine Risikobereitschaft an. Anfänger: 80% MSCI World, 20% Emerging Markets. Konservativ: 60/40. Aggressiv: 90/10.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorgedepot vs. ETF-Sparplan: Welches Produkt ist wirklich besser?",
    description: "Beide investieren in ETFs, aber nur einer wird gefördert. Wir zeigen die Unterschiede mit konkreten €-Beispielen.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-04-25",
    dateModified: "2026-04-25",
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

const BlogDepotVsEtf = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorgedepot vs. ETF-Sparplan: Welches Produkt ist besser?"
        description="Beide investieren in ETFs, aber nur einer wird gefördert. Wir zeigen die Unterschiede mit konkreten Beispielen."
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
                <BreadcrumbPage>Depot vs. ETF</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Altersvorsorgedepot vs. ETF-Sparplan: Welches Produkt ist wirklich besser?
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold flex items-center gap-2">
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              Inhaltsverzeichnis
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-sm">
              <Link to="#unterschied" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                1. Was ist der Unterschied?
              </Link>
              <Link to="#szenarien" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                2. Drei realistische Szenarien
              </Link>
              <Link to="#vergleich" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                3. Vorteile &amp; Nachteile
              </Link>
              <Link to="#kombination" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                4. Die beste Kombination
              </Link>
              <Link to="#timeline" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                5. Was tun jetzt, was ab 2027?
              </Link>
              <Link to="#faq" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                Häufige Fragen
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-lg">
                Die Frage ist nicht &quot;Depot ODER ETF&quot; — sondern &quot;Depot UND ETF&quot;. Beide haben ihre Berechtigung. In diesem Artikel zeigen wir, wann welches Produkt Sinn macht und wie du sie kombinierst.
              </p>
            </section>

            <section id="unterschied" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Was ist der Unterschied?</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Altersvorsorgedepot</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Staatliche Förderung: bis zu 540 Euro pro Jahr</li>
                <li>Gebunden bis Renteneintritt (mind. 65 Jahre)</li>
                <li>Kostendeckel: 1,0% pro Jahr</li>
                <li>Steuer: erst im Alter (nachgelagerte Besteuerung)</li>
                <li>Ab 2027 verfügbar</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">ETF-Sparplan</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Keine staatliche Förderung</li>
                <li>Jederzeit verfügbar und flexibel</li>
                <li>Keine Kostendeckel, aber oft sehr günstig (0,1-0,3%)</li>
                <li>Steuern: 25% Abgeltungsteuer jährlich (bei Gewinnen)</li>
                <li>Ab sofort möglich (auch vor 2027)</li>
              </ul>

              <div className="bg-primary/5 border-l-4 border-primary p-4 mt-6">
                <p className="font-semibold mb-2">Kurz erklärt:</p>
                <p className="text-sm">Das Depot ist eine &quot;geförderte Sparform&quot;. Der ETF-Sparplan ist eine &quot;flexible Geldanlage ohne Förderung&quot;. Ideal: Beides zusammen nutzen.</p>
              </div>
            </section>

            <section id="szenarien" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. Drei realistische Szenarien</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario A: Anfänger (25 Jahre, 150 Euro/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <div><span className="font-semibold">Mit Depot + ETF:</span> 150 Euro ins Depot</div>
                <div><span className="font-semibold">Nach 42 Jahren (bis 67):</span> ca. 410.000 Euro (mit Förderung)</div>
                <div><span className="font-semibold">Förderung gesamt:</span> ca. 25.200 Euro</div>
                <div className="text-xs text-muted-foreground mt-2">Empfehlung: Jetzt mit ETF-Sparplan starten (100 Euro), ab 2027 zum Depot wechseln.</div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario B: Mid-Career (35 Jahre, 250 Euro/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <div><span className="font-semibold">Mit Depot:</span> 150 Euro</div>
                <div><span className="font-semibold">Mit ETF-Sparplan:</span> 100 Euro</div>
                <div><span className="font-semibold">Nach 32 Jahren (bis 67):</span> ca. 390.000 Euro (Depot + ETF kombiniert)</div>
                <div><span className="font-semibold">Förderung:</span> ca. 17.280 Euro</div>
                <div className="text-xs text-muted-foreground mt-2">Empfehlung: Sofort beide Sparpläne starten für maximale Rendite.</div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario C: Späteinsteiger (45 Jahre, 300 Euro/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <div><span className="font-semibold">Mit Depot:</span> 150 Euro</div>
                <div><span className="font-semibold">Mit ETF-Sparplan:</span> 150 Euro</div>
                <div><span className="font-semibold">Nach 22 Jahren (bis 67):</span> ca. 200.000 Euro</div>
                <div><span className="font-semibold">Förderung:</span> ca. 10.560 Euro</div>
                <div className="text-xs text-muted-foreground mt-2">Empfehlung: Beide sofort nutzen und höher sparen (Zeit ist knapp).</div>
              </div>
            </section>

            <section id="vergleich" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Vorteile &amp; Nachteile (Tabelle)</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="border p-3 text-left font-semibold">Kriterium</th>
                      <th className="border p-3 text-left font-semibold">Depot</th>
                      <th className="border p-3 text-left font-semibold">ETF-Sparplan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3 font-semibold">Förderung</td>
                      <td className="border p-3">✓ bis 540 Euro/Jahr</td>
                      <td className="border p-3">✗ keine</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold">Flexibilität</td>
                      <td className="border p-3">✗ bis 65 gebunden</td>
                      <td className="border p-3">✓ jederzeit verfügbar</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold">Kosten</td>
                      <td className="border p-3">max. 1,0% p.a.</td>
                      <td className="border p-3">oft 0,1-0,3% p.a.</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold">Steuern</td>
                      <td className="border p-3">nachgelagert</td>
                      <td className="border p-3">25% jährlich</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold">Start</td>
                      <td className="border p-3">ab 2027</td>
                      <td className="border p-3">sofort</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold">Wer profitiert</td>
                      <td className="border p-3">Langzeitsparer</td>
                      <td className="border p-3">Flexibilitäts-Bedarf</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="kombination" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Die beste Kombination</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Die goldene Regel</h3>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-6">
                <p className="font-semibold mb-2">Depot für Sicherheit + ETF für Flexibilität</p>
                <p className="text-sm">Spare 70% deines Geldes im Depot (für die Förderung) und 30% im ETF-Sparplan (für Notfälle). So hast du beides.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Konkrete Aufteilung</h3>
              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Beispiel: Du sparst 300 Euro/Monat</p>
                  <ul className="text-sm space-y-1">
                    <li>• 210 Euro ins Depot (70%)</li>
                    <li>• 90 Euro in ETF-Sparplan (30%)</li>
                    <li className="font-semibold text-primary mt-2">= 540 Euro Förderung/Jahr + 12.240 Euro Flexibilität</li>
                  </ul>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Für Anfänger reicht: 150 Euro/Monat</p>
                  <ul className="text-sm space-y-1">
                    <li>• 150 Euro ins Depot (bis 540 Euro Förderung genutzt)</li>
                    <li>• 0-100 Euro in ETF-Sparplan (optional, später erhöhen)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="timeline" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Was tun jetzt, was ab 2027?</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Phase 1: Jetzt (2026)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Das kannst du JETZT schon tun:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>ETF-Sparplan starten (z.B. 100-150 Euro/Monat)</li>
                  <li>Depot-Anbieter recherchieren (ab Januar 2027 verfügbar)</li>
                  <li>Budget festlegen (wie viel kannst du monatlich sparen?)</li>
                  <li>Alte Riester-Verträge überprüfen (sollten gekündigt werden)</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Phase 2: Ab 2027</h3>
              <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                <p className="font-semibold">Das machst du AB JANUAR 2027:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Altersvorsorgedepot eröffnen</li>
                  <li>Mindestens 150 Euro/Monat sparen (für maximale Förderung)</li>
                  <li>ETF-Sparplan weiterlaufen lassen (optional erhöhen)</li>
                  <li>Beide Sparpläne automatisiert laufen lassen</li>
                </ul>
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
              Es ist nicht Depot ODER ETF. Es ist Depot UND ETF. Das Depot bringt dir die Förderung (gratis Geld). Der ETF-Sparplan bringt dir Flexibilität. Zusammen bilden sie die perfekte Vorsorgestrategie.
            </p>
          </div>

          <BlogDisclaimer mitRechnung={true} />

          <div className="mt-8 text-center">
            <Link
              to="/altersvorsorgedepot"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Calculator className="w-4 h-4" />
              Zum Altersvorsorgedepot Rechner
            </Link>
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  );
};

export default BlogDepotVsEtf;
