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
const PATH = "/blog/altersvorsorge-fuer-frauen";

const faqItems = [
  {
    q: "Wie viel Rentenlücke haben Frauen durchschnittlich?",
    a: "Im Durchschnitt ca. €400–600/Monat mehr als Männer (wegen Karrierelücken). Mit Elternzeit & Teilzeit wird es oft €800–1.200/Monat Lücke.",
  },
  {
    q: "Lohnt sich Sparen nach Elternzeit noch?",
    a: "Absolut! Mit 27 Jahren bis 67 noch ca. €200/Monat = €135.000 Kapital (7% Rendite). Das ist NICHT zu spät.",
  },
  {
    q: "Rentensplitting: Ist das wirklich ein Vorteil?",
    a: "Ja, aber nur wenn beide arbeiten. Mit Partner: du kriegst 50% von seinem Einkommen angerechnet. Besser als nichts, aber NICHT deine eigene Vorsorge!",
  },
  {
    q: "Kann ich Witwenrente + eigene Rente kombinieren?",
    a: "Ja, aber es gibt eine Anrechnung. Die Witwenrente ist ca. 55–60% der Ehemann-Rente, nicht luxuriös. Deine eigene Vorsorge ist kritisch.",
  },
  {
    q: "Teilzeitarbeit: Wie spare ich effektiv?",
    a: "Mit 60% Einkommen: Sparen ist schwerer. Strategie: Aggressiver sparen (€300+/Mo statt €150), Steuervorteil nutzen, bAV wenn möglich.",
  },
  {
    q: "Sollten Frauen aggressiver sparen als Männer?",
    a: "Ja, wegen Karrierelücken. Wenn Männer 20 Jahre @ €200 sparen, sollten Frauen nach Elternzeit 25 Jahre @ €250 sparen (Catch-up).",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorge für Frauen: 4 Strategien gegen die Rentenlücke",
    description: "Altersvorsorge für Frauen: Karrierelücken, Rentensplitting, Witwenrente. 4 konkrete Strategien mit Euro-Zahlen für deine Sicherheit.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-05-12",
    dateModified: "2026-05-12",
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

const BlogAltersvorsorgeFragen = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorge für Frauen: 4 Strategien gegen die Rentenlücke"
        description="Altersvorsorge für Frauen: Karrierelücken, Rentensplitting, Witwenrente. 4 konkrete Strategien mit Euro-Zahlen für deine Sicherheit."
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
                <BreadcrumbPage>Altersvorsorge für Frauen</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Altersvorsorge für Frauen: 4 Strategien gegen die Rentenlücke
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold flex items-center gap-2">
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              Inhaltsverzeichnis
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-sm">
              <Link to="#warum-frauen" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                1. Warum Frauen anders sparen müssen
              </Link>
              <Link to="#4-strategien" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                2. 4 Strategien für Frauen
              </Link>
              <Link to="#szenarien" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                3. Drei realistische Szenarien
              </Link>
              <Link to="#witwenrente" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                4. Witwenrente: Nicht auf verlassen!
              </Link>
              <Link to="#depot-ruerup" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                5. Depot &amp; Rürup für Frauen
              </Link>
              <Link to="#psychologie" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                6. Psychologie: Vertrauen statt Hoffen
              </Link>
              <Link to="#faq" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                Häufige Fragen
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-lg">
                Altersvorsorge für Frauen ist nicht dasselbe wie für Männer. Elternzeit, Teilzeitarbeit, Karrierelücken — das alles kostet echte Rentenpunkte. Aber es gibt Strategien. In diesem Artikel zeigen wir dir 4 konkrete Wege, wie du deine Rentenlücke trotzdem schließt.
              </p>
            </section>

            <section id="warum-frauen" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Warum Frauen anders sparen müssen (Die Realität)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Rentenlücke: Frauen vs. Männer</h3>
              <p className="mb-4">
                Im Durchschnitt verdienen Frauen in Deutschland weniger + arbeiten häufiger Teilzeit + machen Elternzeit. Das Ergebnis: die durchschnittliche Frauenrente ist ca. €400–600/Monat niedriger als die Männerrente.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Elternzeit = Rentenpunkte-Lücke</h3>
              <p className="mb-4">
                Für jedes Jahr Elternzeit bekommst du &quot;Anrechnung&quot; — aber nicht den vollen Rentenpunkt. Das kostet ca. €150–200/Monat Rente pro Elternzeitkind. Mit 2 Kindern = €400/Monat weniger.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Teilzeitarbeit = Langzeitproblem</h3>
              <p className="mb-4">
                Mit 60% Einkommen verdienst du 40% weniger — und sparst damit auch 40% weniger für die Rente. Das addiert sich über 20+ Jahre zu riesigen Lücken.
              </p>

              <div className="bg-primary/10 border-l-4 border-primary p-4 mt-6">
                <p className="font-semibold mb-2">Die harte Statistik:</p>
                <p className="text-sm">Durchschnittliche Frauenrente (Deutschland): €1.100/Monat. Durchschnittliche Männerrente: €1.400/Monat. Unterschied: €300/Monat = €3.600/Jahr.</p>
              </div>
            </section>

            <section id="4-strategien" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. 4 Strategien für Frauen (konkret)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Strategie 1: Früh anfangen (Zinseszins-Vorteil nutzen)</h3>
              <p className="text-sm mb-4">
                Mit 25 Jahren: 42 Jahre bis 67. Mit 35 Jahren: 32 Jahre. Mit 45 Jahren: 22 Jahre. Je früher, desto mehr Zeit für Zinseszins. Wenn Elternzeit kommt: DANACH wieder aggressiv sparen.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Strategie 2: Rentensplitting mit Partner (was das ist, wie es funktioniert)</h3>
              <p className="text-sm mb-4">
                Du kannst deine Rentenpunkte mit deinem Partner zu 50:50 aufteilen — selbst wenn er mehr verdient hat. Das gleicht Elternzeit-Lücken teilweise aus. ABER: Das ist kein Backup-Plan. Deine eigene Vorsorge ist immer noch kritisch.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Strategie 3: Nach Elternzeit wieder einsteigen (aggressive Catch-up)</h3>
              <p className="text-sm mb-4">
                Rückkehr von Elternzeit? Jetzt ist Catch-up Zeit. €300–500/Monat sparen (statt normal €150). Mit 25 Jahren Restlaufzeit: das macht einen großen Unterschied.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Strategie 4: Eigene Altersvorsorge (unabhängig vom Partner)</h3>
              <p className="text-sm mb-4">
                Nicht auf Partner verlassen. Nicht auf Witwenrente hoffen. Deine eigene Depot/Rürup/ETF bauen. So hast du DEINE Sicherheit — nicht "die gemeinsame Rente".
              </p>
            </section>

            <section id="szenarien" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Drei realistische Szenarien (mit €-Zahlen)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario A: Single (€150/Mo sparen, bis 67)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Alter jetzt: 35 Jahre</li>
                  <li>Monatlich: €150</li>
                  <li>Laufzeit: 32 Jahre (bis 67)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Endergebnis: ca. €135.000 Kapital</p>
                <p className="text-xs text-muted-foreground mt-2">Mit 4%-Regel: €540/Monat Extra-Rente. Plus Staat = ca. €1.700/Mo total (komfortabel).</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario B: Verheiratet mit Elternzeit-Pause (€200/Mo nach Rückkehr) ← TYPISCH</h3>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Alter jetzt: 38 (nach 3 Jahren Elternzeit)</li>
                  <li>Monatlich jetzt: €200 (Catch-up)</li>
                  <li>Laufzeit: 29 Jahre (bis 67)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Endergebnis: ca. €160.000 Kapital</p>
                <p className="text-xs text-muted-foreground mt-2">Mit Rentensplitting + State: ca. €1.900/Mo (sehr komfortabel). Unabhängig vom Partner.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario C: Gut verdienend, Teilzeit (€300/Mo trotz 60%)</h3>
              <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Alter jetzt: 40</li>
                  <li>Einkommen: 60% (€2.500 brutto)</li>
                  <li>Monatlich: €300 aggressiv sparen</li>
                  <li>Laufzeit: 27 Jahre (bis 67)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Endergebnis: ca. €216.000 Kapital</p>
                <p className="text-xs text-muted-foreground mt-2">Mit 4%-Regel + State: ca. €2.300/Mo (sehr gut, trotz Teilzeit).</p>
              </div>
            </section>

            <section id="witwenrente" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Witwenrente: Nicht auf verlassen!</h2>

              <p className="mb-6">
                Viele Frauen denken: &quot;Wenn ich heirate, kümmert sich mein Mann um die Rente.&quot; Das ist ein großer Fehler. Die Witwenrente ist nicht dein Sicherheitsnetz — es ist ein Flickwerk.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Wie viel ist Witwenrente wirklich?</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Die Zahlen:</p>
                <ul className="space-y-1">
                  <li>Große Witwenrente: 55% der Ehemann-Rente (max. 55% seiner Rente, nicht mehr)</li>
                  <li>Kleine Witwenrente: 25% (wenn unter 45, ohne Kinder)</li>
                  <li>Beispiel: Sein Rente €2.000 → deine Witwenrente €1.100 (55%). Das ist nicht luxuriös.</li>
                </ul>
              </div>

              <p className="mb-4">
                Und das ist NUR wenn er älter ist. Wenn du älter bist oder ihm etwas passiert: sehr viel weniger.
              </p>

              <div className="bg-primary/5 border-l-4 border-primary p-4">
                <p className="font-semibold text-sm mb-2">Die Botschaft:</p>
                <p className="text-sm">Witwenrente ist ein Zuschuss, nicht dein Plan. Deine eigene Vorsorge ist die Basis. Witwenrente ist der Bonus.</p>
              </div>
            </section>

            <section id="depot-ruerup" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Depot &amp; Rürup für Frauen (speziell)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Depot: Die beste Wahl für Frauen</h3>
              <p className="text-sm mb-4">
                Depot ist flexibel, gibt Förderung (€540/Jahr) und Steuervorteil (€30–100/Monat). Mit Elternzeit-Pause kannst du einfach pausieren. Keine Probleme.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Rürup: Eher nicht für Frauen (außer Selbstständige)</h3>
              <p className="text-sm mb-4">
                Rürup ist sehr gebunden (bis 62 mindestens). Wenn du weiß, dass du bis 67 arbeiten wirst: OK. Aber mit unsicherer Karriere (Teilzeit, Pausen)? Depot ist besser.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">ETF-Sparplan: Zusätzlich, für Flexibilität</h3>
              <p className="text-sm mb-4">
                €50–100/Monat ETF zusätzlich zum Depot. Das bleibt völlig flexibel. Wenn Elternzeit kommt: ETF pausieren, Depot auch pausieren. Kein Problem.
              </p>
            </section>

            <section id="psychologie" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">6. Psychologie: Vertrauen statt Hoffen</h2>

              <p className="mb-6">
                Der größte Feind ist nicht die Mathematik — es ist die Psychologie. Viele Frauen sagen: &quot;Ich kann mir das nicht leisten.&quot; oder &quot;Mein Partner kümmert sich darum.&quot; Das sind Comfortstories. Keine Pläne.
              </p>

              <div className="bg-secondary p-4 rounded-lg mb-6">
                <p className="font-semibold mb-3">Der Mindset-Shift:</p>
                <p className="text-sm mb-3">
                  <strong>Alt:</strong> &quot;Hoffentlich reicht meine Rente. Hoffentlich bleibt mein Partner. Hoffentlich gibt es Witwenrente.&quot;
                </p>
                <p className="text-sm">
                  <strong>Neu:</strong> &quot;ICH sorge für meine Rente. ICH baue Kapital auf. ICH bin unabhängig — egal was passiert.&quot;
                </p>
              </div>

              <p className="mb-4">
                €150–200/Monat ist nicht luxuriös. Das ist deine Versicherung. Deine Freiheit. Deine Sicherheit.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Konkrete Action-Schritte (ab sofort)</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-secondary p-3 rounded">
                  <p className="font-semibold">Schritt 1:</p>
                  <p>Berechne deine Rentenlücke (Rentenlückenrechner)</p>
                </div>
                <div className="bg-secondary p-3 rounded">
                  <p className="font-semibold">Schritt 2:</p>
                  <p>Entscheide: Depot? Rürup? ETF?</p>
                </div>
                <div className="bg-secondary p-3 rounded">
                  <p className="font-semibold">Schritt 3:</p>
                  <p>€150–200/Monat einrichten. Automatisch. Keine Gedanken mehr.</p>
                </div>
                <div className="bg-primary/10 border border-primary/20 p-3 rounded">
                  <p className="font-semibold">Schritt 4:</p>
                  <p>Nach Elternzeit: Erhöhe auf €250–300/Monat (Catch-up)</p>
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
              Altersvorsorge für Frauen ist nicht kompliziert — es ist nur eine Frage der Entscheidung. Karrierelücken, Teilzeit, Elternzeit — das alles ist real. Aber du kannst damit umgehen. Mit €150–200/Monat schließt du deine Rentenlücke. Mit aggressiverem Sparen nach Elternzeit noch besser. Fang JETZT an. Deine Zukunft dankt es dir.
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
              <Link to="/blog/altersvorsorge-portfolio" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Wie sieht ein gutes Altersvorsorge-Portfolio aus?</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/wie-viel-rente-reicht-aus" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Wie viel Rente reicht aus?</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/steuern-sparen-altersvorsorge" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Mit Altersvorsorge Steuern sparen</span>
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

export default BlogAltersvorsorgeFragen;
