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
const PATH = "/blog/altersvorsorge-berechnen";

const faqItems = [
  {
    q: "Wie berechne ich meine Rentenlücke selbst?",
    a: "Schritt 1: Dein Traum-Netto (€2.500?). Schritt 2: Minus Staat (€1.300). = €1.200 Lücke. Schritt 3: €1.200 × 300 = €360k Kapital nötig.",
  },
  {
    q: "Welche Rendite soll ich einplanen (4% / 7%)?",
    a: "7% ist der historische Schnitt (MSCI World). Aber konservativ: 5–6% planen. Besser zu konservativ als zu optimistisch!",
  },
  {
    q: "Sollte ich Inflation berücksichtigen?",
    a: "Ja! Mit 2% Inflation verdoppelt sich dein Bedarf in 35 Jahren. €1.500 heute = €2.500 mit 67. Unser Rechner macht das automatisch.",
  },
  {
    q: "Wie lange muss das Kapital reichen?",
    a: "Faustregel: Bis 85 Jahre (20 Jahre Rente). Mit 4%-Regel: €600k reicht ca. €2.000/Mo für 25 Jahre.",
  },
  {
    q: "Was ist die 4%-Regel genau?",
    a: "Mit €600k Kapital & 4% Entnahme = €24k/Jahr = €2.000/Mo. Statistisch zu 96% sicher über 25 Jahre.",
  },
  {
    q: "Kann ich meine Berechnung später anpassen?",
    a: "Absolut! Mit 30 planen, mit 40 überprüfen, mit 50 nochmal. Alles ändert sich — dein Plan sollte flexibel sein.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorge berechnen: Schritt-für-Schritt zur deiner Rentenlücke",
    description: "Altersvorsorge berechnen: So ermittelst du deine Rentenlücke. Mit Formel, Excel-Vorlage und unserem interaktiven Rechner. Konkrete Beispiele.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-05-26",
    dateModified: "2026-05-26",
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

const BlogAltersvorsorgeBerechnen = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorge berechnen: Schritt-für-Schritt zur deiner Rentenlücke"
        description="Altersvorsorge berechnen: So ermittelst du deine Rentenlücke. Mit Formel, Excel-Vorlage und unserem interaktiven Rechner. Konkrete Beispiele."
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
                <BreadcrumbPage>Altersvorsorge berechnen</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Altersvorsorge berechnen: Schritt-für-Schritt zur deiner Rentenlücke
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold flex items-center gap-2">
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              Inhaltsverzeichnis
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-sm">
              <Link to="#warum" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                1. Warum berechnen wichtiger ist als sparen
              </Link>
              <Link to="#formel" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                2. Die Formel (einfach erklärt)
              </Link>
              <Link to="#beispiele" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                3. Drei Beispiele zum Durchrechnen
              </Link>
              <Link to="#fehler" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                4. Häufige Fehler beim Berechnen
              </Link>
              <Link to="#tools" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                5. Rechner vs. Excel vs. von Hand
              </Link>
              <Link to="#action" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                6. Von der Berechnung zur Action
              </Link>
              <Link to="#faq" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                Häufige Fragen
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-lg">
                Viele Menschen sparen blind. Sie werfen €200/Monat weg, wissen aber nicht, ob das genug ist. In diesem Artikel zeigen wir dir: Wie du DEINE persönliche Rentenlücke berechnest. Konkret. Mit Zahlen. Mit unserem Rechner.
              </p>
            </section>

            <section id="warum" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Warum berechnen wichtiger ist als sparen</h2>

              <p className="mb-6">
                Ohne Ziel = blindes Sparen. Mit Zahl = Motivation + Plan. Du brauchst 4 Zahlen, um deine Altersvorsorge zu planen:
              </p>

              <div className="space-y-2">
                <div className="bg-secondary p-3 rounded-lg text-sm">
                  <p className="font-semibold">Zahl 1: Dein Traum-Einkommen</p>
                  <p className="text-muted-foreground">Wie viel Netto brauchst du im Alter? €2.000? €3.000?</p>
                </div>

                <div className="bg-secondary p-3 rounded-lg text-sm">
                  <p className="font-semibold">Zahl 2: Deine staatliche Rente</p>
                  <p className="text-muted-foreground">Wie viel gibt der Staat? Ca. €1.300 (mit normaler Erwerbstätigkeit).</p>
                </div>

                <div className="bg-secondary p-3 rounded-lg text-sm">
                  <p className="font-semibold">Zahl 3: Deine Lücke</p>
                  <p className="text-muted-foreground">Zahl 1 minus Zahl 2 = deine monatliche Lücke.</p>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg text-sm">
                  <p className="font-semibold">Zahl 4: Dein Kapital</p>
                  <p className="text-muted-foreground">Lücke × 300 = wie viel Kapital brauchst du? (4%-Regel)</p>
                </div>
              </div>

              <p className="mt-6">
                Mit diesen 4 Zahlen weißt du: wie viel musst du sparen, bis wann, mit welcher Rendite. Das ist dein Plan.
              </p>
            </section>

            <section id="formel" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. Die Formel (einfach erklärt)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Schritt 1: Dein Netto-Traum-Einkommen</h3>
              <p className="text-sm mb-4">
                Wieviel Geld brauchst du im Alter monatlich? Das ist subjektiv. Komfortabel leben in Deutschland: ca. €2.000–2.500/Monat.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Schritt 2: Minus staatliche Rente</h3>
              <p className="text-sm mb-4">
                Mit normaler Erwerbstätigkeit (35+ Jahre): ca. €1.300/Monat. Mit weniger: weniger. Mit mehr: mehr. (Unser Rechner berechnet das genauer!)
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Schritt 3: Das ist deine Lücke</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 text-sm">
                <p className="font-semibold mb-2">Beispiel:</p>
                <ul className="space-y-1">
                  <li>Traum: €2.000/Monat</li>
                  <li>Minus Staat: €1.300/Monat</li>
                  <li><strong>Lücke: €700/Monat</strong></li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Schritt 4: Kapital berechnen (4%-Regel)</h3>
              <p className="text-sm mb-4">
                Mit der 4%-Regel: Lücke × 300 = Kapital nötig.
              </p>

              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg text-sm">
                <p className="font-semibold mb-2">Weiterführung Beispiel:</p>
                <ul className="space-y-1">
                  <li>Lücke: €700/Monat</li>
                  <li>Kapital: €700 × 300 = €210.000</li>
                  <li><strong>Du brauchst €210.000 bis 67</strong></li>
                </ul>
              </div>

              <p className="mt-6 text-sm">
                Mit €150/Monat, 7% Rendite, 32 Jahre (von 35 bis 67): €135.000. Das ist NICHT genug. Du brauchst €200+/Monat.
              </p>
            </section>

            <section id="beispiele" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Drei Beispiele zum Durchrechnen</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Beispiel A: Single, €2.000 Traum</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <ul className="space-y-1">
                  <li><strong>Traum:</strong> €2.000/Monat</li>
                  <li><strong>Staat:</strong> €1.300/Monat</li>
                  <li><strong>Lücke:</strong> €700/Monat</li>
                  <li><strong>Kapital:</strong> €700 × 300 = €210.000</li>
                  <li><strong>Sparbedarf:</strong> €200–250/Monat (7% Rendite, 32 Jahre)</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Beispiel B: Verheiratet, €3.000 zusammen</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <ul className="space-y-1">
                  <li><strong>Traum:</strong> €3.000/Monat (gemeinsam)</li>
                  <li><strong>Staat (beide):</strong> €2.500/Monat zusammen</li>
                  <li><strong>Lücke:</strong> €500/Monat</li>
                  <li><strong>Kapital:</strong> €500 × 300 = €150.000</li>
                  <li><strong>Sparbedarf:</strong> €150–180/Monat pro Person</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Beispiel C: Gut verdienend, €4.000 Traum</h3>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg space-y-2 text-sm">
                <ul className="space-y-1">
                  <li><strong>Traum:</strong> €4.000/Monat (luxuriös)</li>
                  <li><strong>Staat:</strong> €1.500/Monat (höheres Einkommen)</li>
                  <li><strong>Lücke:</strong> €2.500/Monat</li>
                  <li><strong>Kapital:</strong> €2.500 × 300 = €750.000</li>
                  <li><strong>Sparbedarf:</strong> €500–600/Monat (7% Rendite, 32 Jahre)</li>
                </ul>
              </div>
            </section>

            <section id="fehler" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Häufige Fehler beim Berechnen</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Fehler 1: Zu optimistisch (7% Rendite stimmt nicht)</h3>
              <p className="text-sm mb-4">
                7% ist der historische Schnitt (MSCI World). Aber: Du kriegst nicht 7% guaranteed. Besser: Mit 5–6% planen, dann bist du überrascht wenn mehr kommt.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Fehler 2: Zu pessimistisch (nur 2% einplanen)</h3>
              <p className="text-sm mb-4">
                Wenn du nur 2% planst, brauchst du ca. 3x so viel Kapital! €700 Lücke × 300 = €210k mit 4%. Aber mit 2% Rendite brauchst du €630k! Das ist unrealistisch.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Fehler 3: Inflation vergessen</h3>
              <p className="text-sm mb-4">
                Mit 2% Inflation verdoppelt sich dein Bedarf in 35 Jahren. €1.500 heute = €2.500 mit 67. Unser Rechner macht das automatisch — plane nicht von Hand!
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Fehler 4: Lebenserwartung unterschätzen</h3>
              <p className="text-sm mb-4">
                Mit 67 Jahren: statistisch noch 20+ Jahre Leben. Dein Kapital muss bis 85–90 reichen. Mit 4%-Regel: Das funktioniert.
              </p>
            </section>

            <section id="tools" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Mit unserem Rechner vs. Excel vs. von Hand</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Unser Rentenlückenrechner: Schnell, einfach, präzise</h3>
              <p className="text-sm mb-4">
                5 Felder ausfüllen → Ergebnis. Automatische Inflation, automatische Steuern, automatische Berechnung. BEST FOR: Schnelle Antwort.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Excel-Template: Flexibel, selbstbestimmt</h3>
              <p className="text-sm mb-4">
                Du schreibst deine Zahlen rein, Excel rechnet. Du kannst "Was wäre wenn?" spielen. BEST FOR: Tiefes Verständnis, mehrere Szenarien.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Von Hand: Verstehen, wie es funktioniert</h3>
              <p className="text-sm mb-4">
                Schreib auf: Traum, Staat, Lücke, Kapital. Rechne selbst mit Taschenrechner. BEST FOR: Verstehen, wie Geld wirklich funktioniert.
              </p>

              <div className="bg-primary/5 border-l-4 border-primary p-4 mt-6">
                <p className="font-semibold text-sm mb-2">Meine Empfehlung:</p>
                <p className="text-sm">Nutze unseren Rechner für schnelle Antwort. Dann versuch Excel zum Verstehen. Dann rechne 1x von Hand — dann weißt du wirklich, wie es funktioniert.</p>
              </div>
            </section>

            <section id="action" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">6. Von der Berechnung zur Action</h2>

              <p className="mb-6">
                Berechnung ist nicht das Ende — es ist der Anfang. Jetzt brauchst du einen Plan.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Schritt 1: Berechne deine Rentenlücke</h3>
              <p className="text-sm mb-4">
                Nutze unseren Rechner. Schreib die Zahl auf. Das ist dein Traum.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Schritt 2: Monatlicher Sparplan definieren</h3>
              <p className="text-sm mb-4">
                Mit 32 Jahren bis 67: €200/Monat = €135k. Nicht genug? €300/Monat = €202k. Rechne dich durch!
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Schritt 3: Produkt wählen</h3>
              <p className="text-sm mb-4">
                Depot (gebunden bis 67, Förderung)? Rürup (Steuervorteil, Selbstständige)? ETF (flexibel, kein Vorteil)? Entscheide basierend auf deiner Situation.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Schritt 4: Los geht's!</h3>
              <p className="text-sm mb-4">
                Einrichten. Automatisch monatlich. Nie wieder Gedanken dran. Fertig.
              </p>

              <div className="bg-primary/10 border border-primary/20 p-4 mt-6 space-y-2 text-sm">
                <p className="font-semibold">Action-Checkliste:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Berechnung gemacht ✓</li>
                  <li>Monatlicher Sparbetrag definiert ✓</li>
                  <li>Produkt gewählt ✓</li>
                  <li>Angebot geholt ✓</li>
                  <li>Eingerichtet ✓</li>
                  <li>Automatisch eingestellt ✓</li>
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
              Altersvorsorge berechnen ist einfach: 4 Zahlen, 1 Formel. Traum - Staat = Lücke. Lücke × 300 = Kapital. Mit unserem Rechner hast du die Antwort in 2 Minuten. Dann: Sparplan machen, Produkt wählen, los geht's. Keine Magie, nur Mathematik.
            </p>
          </div>

          {/* RELATED_ARTICLES_START */}
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold mb-4 text-foreground">📚 Verwandte Artikel</h3>
            <div className="space-y-2">
              <Link to="/blog/rentenlucke-berechnen" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Rentenlücke berechnen leicht gemacht</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/wie-viel-geld-braucht-man-im-alter" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Wie viel Geld braucht man im Alter?</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/altersvorsorge-30-jahre" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Altersvorsorge mit 30 Jahren</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/altersvorsorge-portfolio" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Wie sieht ein gutes Altersvorsorge-Portfolio aus?</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            </div>
          </div>

          <BlogDisclaimer mitRechnung={false} />

          <div className="mt-8 text-center">
            <Link
              to="/rentenluecken-rechner"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Calculator className="w-4 h-4" />
              Jetzt Rentenlücke berechnen
            </Link>
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  );
};

export default BlogAltersvorsorgeBerechnen;
