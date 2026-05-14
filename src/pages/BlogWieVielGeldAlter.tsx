import { useState } from "react";
import BlogDisclaimer from "@/components/blog/BlogDisclaimer";
import BlogNewsletterWidget from "@/components/blog/BlogNewsletterWidget";
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
const PATH = "/blog/wie-viel-geld-braucht-man-im-alter";

const faqItems = [
  {
    q: "Was ist die durchschnittliche Rente in Deutschland?",
    a: "Mit 40+ Jahren Erwerbstätigkeit: ca. €1.200–1.500/Monat (Durchschnitt). Gutverdiener: bis €2.500. Niedriglohnsektor: ca. €900–1.200.",
  },
  {
    q: "Ist €2.000 im Alter genug?",
    a: "Für die meisten Menschen in Deutschland: Ja. Hängt aber von Region, Lebensstil und Familie ab. München vs. Mecklenburg-Vorpommern: riesen Unterschied.",
  },
  {
    q: "Wie viel Rente braucht man im Alter wirklich?",
    a: "Faustregel: 70–80% des letzten Nettoeinkommens. Realistisch aber: 50–70% reichen oft, weil Ausgaben sinken (Berufskleider, Auto-Fahrt, Versicherungen).",
  },
  {
    q: "Ist die 4%-Regel wirklich sicher?",
    a: "Die 4%-Regel ist konservativ und empirisch bewährt. Mit €300.000 Kapital: €12.000/Jahr = €1.000/Monat. Statistisch: zu 96% sicher über 25 Jahre.",
  },
  {
    q: "Was kostet ein gutes Leben im Alter?",
    a: "Komfortabel (keine Angst vor Geld): €2.000–2.500/Monat. Luxus (Reisen, Restaurants): €3.500+. Sparsam (alles bezahlt): €1.200–1.500.",
  },
  {
    q: "Wie berechne ich meine persönliche Rentenlücke?",
    a: "Schritt 1: Dein Ziel (€2.500?). Schritt 2: Minus gesetzliche Rente (ca. €1.300). Schritt 3: Das ist deine Lücke (€1.200). Nutze unseren Rentenlückenrechner.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Wie viel Geld braucht man im Alter? Die ehrliche Rechnung",
    description: "Wie viel Geld brauchst du im Alter wirklich? Deutsche Realität vs. 80%-Regel. 5 konkrete Lebensstil-Szenarien, regionale Unterschiede, ehrliche Zahlen.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-05-11",
    dateModified: "2026-05-11",
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

const BlogWieVielGeldAlter = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead ogType="article"
        title="Wie viel Geld braucht man im Alter? Die ehrliche Rechnung"
        description="Wie viel Geld brauchst du im Alter wirklich? Deutsche Realität vs. 80%-Regel. 5 konkrete Lebensstil-Szenarien, regionale Unterschiede, ehrliche Zahlen."
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
                <BreadcrumbPage>Wie viel Geld braucht man im Alter?</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Wie viel Geld braucht man im Alter? Die ehrliche Rechnung
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold flex items-center gap-2">
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              Inhaltsverzeichnis
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-sm">
              <Link to="#frage-falsch" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                1. Deine Frage ist falsch gestellt
              </Link>
              <Link to="#80-regel" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                2. Die 80%-Regel (und warum sie Unsinn ist)
              </Link>
              <Link to="#5-szenarien" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                3. Fünf realistische Lebensstil-Szenarien
              </Link>
              <Link to="#regional" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                4. Regionale Unterschiede (München vs. Ostdeutschland)
              </Link>
              <Link to="#4-prozent" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                5. Die 4%-Regel (wie viel Kapital brauchst du?)
              </Link>
              <Link to="#psychologie" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                6. Die Psychologie: Genug ist psychologisch, nicht mathematisch
              </Link>
              <Link to="#faq" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                Häufige Fragen
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-lg">
                &quot;Wie viel Geld braucht man im Alter?&quot; ist die falsche Frage. Die richtige Frage ist: &quot;Wie viel Geld brauchst DU im Alter?&quot; Und die Antwort ist: sehr unterschiedlich. In diesem Artikel zeigen wir dir 5 konkrete Szenarien + regionale Unterschiede, damit du deine persönliche Zahl findest.
              </p>
            </section>

            <section id="frage-falsch" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Deine Frage ist falsch gestellt</h2>

              <p className="mb-6">
                &quot;Wie viel Geld braucht man im Alter?&quot; ist zu allgemein. Die Antwort für einen Single in Leipzig ist komplett anders als für einen Ehepaar in München. Deshalb wollen wir deine Frage umformulieren:
              </p>

              <div className="bg-secondary p-4 rounded-lg mb-6">
                <p className="font-semibold mb-3">Besser: &quot;Welcher Lebensstil passt zu mir?&quot;</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Will ich viel reisen? (dann mehr Geld)</li>
                  <li>Will ich einfach nur sorgenfrei leben? (mittleres Budget)</li>
                  <li>Will ich sparen? (niedrig Budget)</li>
                  <li>In welcher Region will ich leben? (München ≠ Mecklenburg)</li>
                </ul>
              </div>

              <p>
                Die Antwort auf &quot;Wie viel Geld?&quot; hängt von deinen Antworten ab. Es gibt keine universelle Zahl — nur deine persönliche Zahl.
              </p>
            </section>

            <section id="80-regel" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. Die 80%-Regel (und warum sie Unsinn ist)</h2>

              <p className="mb-6">
                Viele Finanzberater sagen: &quot;Du brauchst 80% deines letzten Nettoeinkommens im Alter.&quot; Das ist ein Myth. Die Realität ist: Die meisten Menschen brauchen 50–70%, nicht 80%.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Warum 80% zu hoch ist:</h3>
              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg text-sm">
                  <p className="font-semibold mb-1">❌ Berufskleidung</p>
                  <p className="text-muted-foreground">€200–400/Monat im Job. Im Alter: €0.</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg text-sm">
                  <p className="font-semibold mb-1">❌ Weg zur Arbeit</p>
                  <p className="text-muted-foreground">Benzin, Bahn, Auto = €200–300/Monat. Im Alter: €0.</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg text-sm">
                  <p className="font-semibold mb-1">❌ Altersvorsorge sparen</p>
                  <p className="text-muted-foreground">Du sparst nicht mehr für die Rente. Das ist €200–500/Monat frei!</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg text-sm">
                  <p className="font-semibold mb-1">❌ Versicherungen</p>
                  <p className="text-muted-foreground">Berufsunfähigkeitsversicherung, Krankenversicherung fallen weg (Krankenversicherung ist billiger).</p>
                </div>
              </div>

              <p className="mt-6">
                Mit diesen 4 Positionen sparst du alleine €900–1.500/Monat. Das bedeutet: Du brauchst 70%, nicht 80%.
              </p>
            </section>

            <section id="5-szenarien" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Fünf realistische Lebensstil-Szenarien</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario 1: Sparsam (€1.200/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Dein Leben:</p>
                <ul className="space-y-1">
                  <li>Wohnung: €400 (abbezahlt oder kleine Miete)</li>
                  <li>Essen: €250 (kochen, wenig außen)</li>
                  <li>Freizeit: €100 (Spaziergang, Freunde, TV)</li>
                  <li>Rest: €450 (Versicherungen, Kleines)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Für wen?</p>
                <p>Einzelne, die genügsam sind, kleine Wohnung, nah bei Familie/Freunden. Kein großes Reisen.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario 2: Bescheiden (€1.500/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Dein Leben:</p>
                <ul className="space-y-1">
                  <li>Wohnung: €400</li>
                  <li>Essen: €300 (Mix: kochen + ab und zu außen)</li>
                  <li>Freizeit: €250 (Hobby, ab und zu Kino)</li>
                  <li>Reisen: €150 (1x/Jahr Urlaub)</li>
                  <li>Rest: €400</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Für wen?</p>
                <p>Die Mehrheit der Deutschen. Komfortabel, ohne Luxus.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario 3: Komfortabel (€2.000/Monat) ← STANDARD</h3>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Dein Leben:</p>
                <ul className="space-y-1">
                  <li>Wohnung: €500 (etwas größer, zentraler)</li>
                  <li>Essen: €400 (Mix: gutes Kochen + Restaurants)</li>
                  <li>Freizeit: €300 (Hobbys, Kino, Wellness)</li>
                  <li>Reisen: €400 (2x/Jahr Urlaub, teilweise Flug)</li>
                  <li>Rest: €400</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Für wen?</p>
                <p>Gutverdiener, die ohne Angst vor Geld leben wollen. Das ist das realistische Ziel für viele.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario 4: Großzügig (€2.500/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Dein Leben:</p>
                <ul className="space-y-1">
                  <li>Wohnung: €700 (schöne Lage)</li>
                  <li>Essen: €500 (gerne Restaurants)</li>
                  <li>Freizeit: €400 (regelmäßige Aktivitäten)</li>
                  <li>Reisen: €600 (3–4x/Jahr, auch fernere Ziele)</li>
                  <li>Rest: €300</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Für wen?</p>
                <p>Menschen, die ihr Leben genießen wollen. Ohne Verzicht.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario 5: Luxus (€4.000+/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                <p className="font-semibold">Dein Leben:</p>
                <ul className="space-y-1">
                  <li>Wohnung: €1.000+ (prime location)</li>
                  <li>Essen: €800 (gute Restaurants)</li>
                  <li>Freizeit: €800 (Travel, Wellness, Premium)</li>
                  <li>Reisen: €1.000+ (frequent Flyer, Luxus-Urlaube)</li>
                  <li>Rest: €400+</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Für wen?</p>
                <p>Sehr wohlhabend. Karrieremenschen mit hohem Einkommen.</p>
              </div>
            </section>

            <section id="regional" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Regionale Unterschiede (München vs. Ostdeutschland)</h2>

              <p className="mb-6">
                Deutschland ist nicht gleichmäßig. München ist 40% teurer als Mecklenburg-Vorpommern. Das bedeutet: €2.000/Monat in Leipzig ist luxuriös. In München: knapp.
              </p>

              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-2">München (€3.000–3.500 für Komfort)</p>
                  <p className="text-sm text-muted-foreground">Wohnung: €700–900, Essen: €400+, Rest teuer. Budget: höher.</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-2">Berlin/Hamburg (€2.200–2.500 für Komfort)</p>
                  <p className="text-sm text-muted-foreground">Wohnung: €500–600, relativ zentral, solide Lebensqualität.</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-2">Mecklenburg/Brandenburg (€1.500–1.800 für Komfort)</p>
                  <p className="text-sm text-muted-foreground">Wohnung: €350–400, Essen: €250, Alles ist günstiger. €1.500 = sehr komfortabel.</p>
                </div>
              </div>

              <p className="mt-6">
                Moralisch der Geschichte: Deine persönliche &quot;Wie viel Geld?&quot;-Antwort hängt SEHR von der Region ab.
              </p>
            </section>

            <section id="4-prozent" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Die 4%-Regel (wie viel Kapital brauchst du?)</h2>

              <p className="mb-6">
                Mit der 4%-Regel kannst du ausrechnen, wie viel Kapital du brauchst. Die Regel: Mit 4% Jahresentzug kann dein Kapital 25+ Jahre halten.
              </p>

              <p className="mb-6">
                <strong>Formel:</strong> Dein monatliches Ziel × 300 = Kapital nötig
              </p>

              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">€1.500/Monat brauchst du?</p>
                  <p className="text-sm">€1.500 × 300 = €450.000 Kapital nötig</p>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <p className="font-semibold mb-1">€2.000/Monat brauchst du?</p>
                  <p className="text-sm">€2.000 × 300 = €600.000 Kapital nötig</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">€2.500/Monat brauchst du?</p>
                  <p className="text-sm">€2.500 × 300 = €750.000 Kapital nötig</p>
                </div>
              </div>

              <p className="mt-6 text-sm">
                ABER: Das ist PLUS Staatliche Rente! Wenn der Staat €1.300 gibt + du mit 4%-Regel €800 brauchst = €2.100/Monat komfortabel.
              </p>
            </section>

            <section id="psychologie" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">6. Die Psychologie: Genug ist psychologisch, nicht mathematisch</h2>

              <p className="mb-6">
                Die größte Erkenntnis: &quot;Wie viel Geld brauchst du?&quot; ist zu 50% psychologisch, zu 50% mathematisch. Manche Menschen sind mit €1.500/Monat glücklich. Andere nicht mit €3.000.
              </p>

              <div className="bg-primary/5 border-l-4 border-primary p-4">
                <p className="font-semibold mb-3">Deine Aufgabe:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li><strong>Visualisiere dein Leben</strong> — Was machst du im Alter wirklich?</li>
                  <li><strong>Rechne die Kosten</strong> — Was kostet das realistisch?</li>
                  <li><strong>Addiere Puffer</strong> — 10–20% extra für Überraschungen</li>
                  <li><strong>Das ist deine persönliche Zahl</strong> — Nicht die &quot;80%-Regel&quot;, deine Zahl</li>
                </ol>
              </div>

              <p className="mt-6">
                Beispiel: Manche Menschen träumen von Weltreise. Andere von Enkel-Zeit. Die Enkel-Zeit kostet €1.500. Die Weltreise kostet €3.000. Beide sind &quot;richtig&quot; — aber für verschiedene Menschen.
              </p>
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
              &quot;Wie viel Geld braucht man im Alter?&quot; ist deine persönliche Frage, nicht eine generelle. Die 80%-Regel ist Quatsch. Die Realität: €1.500–2.500/Monat für komfortables Leben (plus staatliche Rente). Visualisiere dein Leben, rechne deine Kosten, bau das Kapital auf. Das ist alles.
            </p>
          </div>

          {/* RELATED_ARTICLES_START */}
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold mb-4 text-foreground">📚 Verwandte Artikel</h3>
            <div className="space-y-2">
              <Link to="/blog/wie-viel-rente-reicht-aus" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Wie viel Rente reicht aus?</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/rentenlucke-berechnen" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Rentenlücke berechnen leicht gemacht</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/altersvorsorge-portfolio" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Wie sieht ein gutes Altersvorsorge-Portfolio aus?</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Rentenlücke: Was sie ist — und wie du sie schließt</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            </div>
          </div>

          <BlogNewsletterWidget />
          <BlogDisclaimer mitRechnung={false} />

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

export default BlogWieVielGeldAlter;
