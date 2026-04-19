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
const PATH = "/blog/altersvorsorge-50-jahre";

const faqItems = [
  {
    q: "Wie viel Zeit habe ich noch mit 50?",
    a: "17 Jahre bis 67 Jahre. Das klingt kurz, aber mit aggressivem Sparen (€500+/Monat) passiert VIEL. Der Zinseszins arbeitet in den letzten Jahren extra hart.",
  },
  {
    q: "Kann ich mit 50 noch eine ordentliche Rente aufbauen?",
    a: "Ja, aber nicht ohne Mühe. Mit €500/Monat über 17 Jahre: ca. €130.000. Mit €1.000/Monat: ca. €260.000. Möglich, aber aggressiv.",
  },
  {
    q: "Was ist eine realistische Strategie ab 50?",
    a: "Depot + bAV (maximum) + Rürup (wenn Selbstständiger). Das ist nicht die Zeit für \"ETF und abwarten\". Du brauchst Fokus und Steuervorteil.",
  },
  {
    q: "Sollte ich mein Risiko reduzieren ab 50?",
    a: "Nein, noch nicht. Mit 17 Jahren bis 67 kannst du noch Verluste ausgleichen. Aber: Nicht 100% in aggressive ETFs. 80/20 ist besser.",
  },
  {
    q: "Was ist der Depot-Vorteil mit 50?",
    a: "Mit 50 brauchst du Steuervorteil. Depot gibt dir bis zu €540/Jahr. Mit €2.400 Eigenbeitrag: ca. €768/Jahr Steuerersparnis (bei 32% GrStSatz). Das zählt.",
  },
  {
    q: "Lohnt sich noch eine Rürup-Rente mit 50?",
    a: "Für Selbstständige: ja. Für Angestellte: nur wenn hoher Grenzsteuersatz (42%). Der Lockup bis 62 ist mit 50 weniger problem (nur 12 Jahre).",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorge mit 50 Jahren: Noch 17 Jahre bis zur Rente",
    description: "Mit 50 Jahren ist es eng, aber nicht unmöglich. 17 Jahre bis 67, aggressive Strategie nötig. Konkrete Zahlen und Catch-up Strategien.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-05-06",
    dateModified: "2026-05-06",
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

const BlogAltersvorsorge50Jahre = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorge mit 50 Jahren: Noch 17 Jahre bis zur Rente"
        description="Mit 50 Jahren ist es eng, aber nicht unmöglich. 17 Jahre bis 67, aggressive Strategie nötig. Konkrete Zahlen und Catch-up Strategien."
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
                <BreadcrumbPage>Altersvorsorge mit 50 Jahren</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Altersvorsorge mit 50 Jahren: Noch 17 Jahre bis zur Rente
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold flex items-center gap-2">
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              Inhaltsverzeichnis
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-sm">
              <Link to="#reality" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                1. Die Realität: 17 Jahre sind kurz, aber nicht unmöglich
              </Link>
              <Link to="#zeit-faktor" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                2. Der Zeit-Faktor: Was in 17 Jahren möglich ist
              </Link>
              <Link to="#aggressive-szenarien" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                3. Drei aggressive Szenarien
              </Link>
              <Link to="#catch-up" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                4. Catch-up Strategie: Das Maximum herausholen
              </Link>
              <Link to="#psychologie-50" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                5. Psychologie mit 50: Fokus &amp; Disziplin
              </Link>
              <Link to="#notfallplan" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                6. Was ist, wenn 67 nicht reicht?
              </Link>
              <Link to="#faq" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                Häufige Fragen
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-lg">
                Mit 50 Jahren anzufangen ist eng. Sehr eng. Aber nicht unmöglich. 17 Jahre bis zur Rente — das ist die Zeit für eine aggressive, fokussierte Strategie. Keine Experimente, keine Umschweife. In diesem Artikel zeigen wir dir, was realistisch möglich ist und wie du das Maximum herausholt.
              </p>
            </section>

            <section id="reality" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Die Realität: 17 Jahre sind kurz, aber nicht unmöglich</h2>

              <p className="mb-6">
                17 Jahre bis 67 klingt kurz. Aber es ist nicht unmöglich. Menschen, die mit 50 anfangen und aggressiv sparen (€500–1.000/Monat), bauen tatsächlich beträchtliche Vermögen auf. Die Psychologie ist schwieriger als die Mathematik.
              </p>

              <div className="bg-primary/10 border-l-4 border-primary p-4">
                <p className="font-semibold mb-2">Das Wichtigste mit 50:</p>
                <p className="text-sm">Nicht perfekt sparen. Aggressiv sparen. Du brauchst nicht die optimale Strategie — du brauchst eine Strategie, die du durchhältst. 500 Euro/Monat für 17 Jahre schlägt 1.000 Euro für 5 Jahre.</p>
              </div>
            </section>

            <section id="zeit-faktor" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. Der Zeit-Faktor: Was in 17 Jahren möglich ist</h2>

              <p className="mb-6">
                Mit 7% Rendite passiert auch in 17 Jahren eine Menge. Schau dir die Progression an:
              </p>

              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-2">Nach Jahr 5: ca. €35.000 (€500/Mo)</p>
                  <p className="text-sm text-muted-foreground">Die Grundlage. Noch nicht beeindruckend, aber es läuft.</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-2">Nach Jahr 11: ca. €95.000</p>
                  <p className="text-sm text-muted-foreground">Der Zinseszins zeigt Zähne. Fast 3x so viel wie Jahr 5.</p>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Nach Jahr 17: ca. €160.000</p>
                  <p className="text-sm text-muted-foreground">Fast 2x so viel wie Jahr 11. JETZT passiert die Magie.</p>
                </div>
              </div>

              <p className="mt-6 text-sm">
                Das ist mit €500/Monat. Mit €1.000/Monat: €320.000. Mit €300/Monat: €96.000. Die Progression ist nicht linear — sie exponentiell.
              </p>
            </section>

            <section id="aggressive-szenarien" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Drei aggressive Szenarien (mit 50 Jahren starten)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario A: Fokussiert (€300/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Monatlich: €300</li>
                  <li>Jährlich: €3.600</li>
                  <li>Laufzeit: 17 Jahre (bis 67)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Endergebnis: ca. €96.000</p>
                <p className="text-xs text-muted-foreground mt-2">Mit 4%-Regel: €385/Monat Extra-Rente. Besser als nichts.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario B: Aggressiv (€500/Monat) ← EMPFOHLEN</h3>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Monatlich: €500</li>
                  <li>Jährlich: €6.000</li>
                  <li>Laufzeit: 17 Jahre (bis 67)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Endergebnis: ca. €160.000</p>
                <p className="text-xs text-muted-foreground mt-2">Mit 4%-Regel: €640/Monat Extra-Rente. Das ist real.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario C: Sehr aggressiv (€1.000/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Monatlich: €1.000</li>
                  <li>Jährlich: €12.000</li>
                  <li>Laufzeit: 17 Jahre (bis 67)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Endergebnis: ca. €320.000</p>
                <p className="text-xs text-muted-foreground mt-2">Mit 4%-Regel: €1.280/Monat Extra-Rente. Das schließt die Lücke!</p>
              </div>
            </section>

            <section id="catch-up" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Catch-up Strategie: Das Maximum herausholen</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Strategie 1: Depot Maximum</h3>
              <p className="text-sm mb-4">
                Mit 50 Jahren: Maximale Depot-Förderung nutzen. €540/Jahr Förderung + Steuervorteil (€30–40/Monat). Das ist fast &quot;gratis&quot; Geld.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Strategie 2: bAV ist jetzt KRITISCH</h3>
              <p className="text-sm mb-4">
                Wenn dein Arbeitgeber bAV anbietet: Maximal ausnutzen. €302/Monat (2026) ohne dein Geld ist 60%+ Steuervorteil. Mit 17 Jahren Laufzeit: ca. €80.000 extra Kapital nur aus Steuervorteil.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Strategie 3: Rürup (wenn Selbstständiger)</h3>
              <p className="text-sm mb-4">
                Mit 50 Jahren Selbstständiger: Rürup-Rente. Hoher Abzug (ca. 30% des Gewinns), 42% Grenzsteuer = massive Steuerersparnis. Mit 17 Jahren bis 62 Lockup: machbar.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Strategie 4: Gehaltserhöhung → Sparplan</h3>
              <p className="text-sm mb-4">
                Mit 50 Jahren verdienst du wahrscheinlich dein Topgehalt. Jede Gehaltserhöhung direkt in den Sparplan. 3% Gehaltserhöhung = €70–100 mehr/Monat = ca. €25.000 extra Kapital über 17 Jahre.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Strategie 5: Schuldenfrei bis 67</h3>
              <p className="text-sm mb-4">
                KRITISCH: Mit 50 Jahren solltest du dein Haus abbezahlt haben oder im Plan sein. Nicht mit Hypothek in die Rente — das kostet deine Flexibilität.
              </p>
            </section>

            <section id="psychologie-50" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Psychologie mit 50: Fokus &amp; Disziplin</h2>

              <p className="mb-6">
                Mit 50 Jahren ist die Psychologie anders als mit 30. Du hast vielleicht länger gezögert. Du hast vielleicht Schuldgefühle. Das ist normal. Aber jetzt zahlst du es nicht dafür, dass du nicht früher angefangen hast — du zahlst dafür, dass du JETZT anfängst.
              </p>

              <div className="bg-secondary p-4 rounded-lg mb-6">
                <p className="font-semibold mb-3">Das mentale Shift mit 50:</p>
                <p className="text-sm mb-3">
                  <strong>Alt:</strong> &quot;Ich hätte schon lange anfangen sollen. Jetzt lohnt sich das nicht mehr.&quot;
                </p>
                <p className="text-sm">
                  <strong>Neu:</strong> &quot;Ich habe 17 Jahre. Mit €500/Monat baue ich €160.000 auf. Das ist genug, um einen echten Unterschied zu machen. Ich fang JETZT an.&quot;
                </p>
              </div>

              <p className="mb-6">
                Der Fokus mit 50 ist anders. Du brauchst nicht Perfektionismus. Du brauchst Disziplin. €500 jeden Monat, nicht verhandelt. Das ist die Mentalität.
              </p>
            </section>

            <section id="notfallplan" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">6. Was ist, wenn 67 nicht reicht?</h2>

              <p className="mb-6">
                Manchmal ist 67 nicht realistisch. Körperlich oder wirtschaftlich. Mit 50 Jahren solltest du das prüfen. Wenn 67 nicht machbar ist: Plan für 70 machen.
              </p>

              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Option 1: 3 Jahre länger arbeiten (bis 70)</p>
                  <p className="text-sm text-muted-foreground">€500/Monat über 20 Jahre statt 17 = €230.000 statt €160.000. Der Unterschied ist massiv.</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Option 2: Flexible Arbeit nach 67</p>
                  <p className="text-sm text-muted-foreground">Mit 67 könnte man 50% arbeiten, 50% leben. Geld würde für 5 Jahre noch reichen. Bis 72 komplett Rente.</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Option 3: Haus nutzen (Reverse Mortgage)</p>
                  <p className="text-sm text-muted-foreground">Nicht ideal, aber eine Option. Mit 70+ Jahren könnte man Haus gegen monatliche Auszahlung nutzen.</p>
                </div>
              </div>

              <p className="mt-6 text-sm">
                Mit 50 Jahren solltest du realistisch sein: Kann ich realistically bis 67 arbeiten? Wenn ja: €500/Monat. Wenn nein: Plan B machen.
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
              Mit 50 Jahren ist es eng, aber nicht unmöglich. 17 Jahre, €500/Monat, aggressiv investiert = €160.000 Kapital. Das ist nicht die Rente deiner Träume, aber es ist ein solides Fundament. Fang JETZT an. Jeder Monat, den du wartest, kostet dich Zinseszins.
            </p>
          </div>

          {/* RELATED_ARTICLES_START */}
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold mb-4 text-foreground">📚 Verwandte Artikel</h3>
            <div className="space-y-2">
              <Link to="/blog/altersvorsorge-ab-40" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Altersvorsorge ab 40: 27 Jahre bis 67 = €135.000 Kapital</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/rentenlucke-mit-30-40-50" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Rentenlücke mit 30, 40, 50 Jahren: Was ist noch möglich?</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/steuern-sparen-altersvorsorge" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Mit Altersvorsorge Steuern sparen</span>
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

export default BlogAltersvorsorge50Jahre;
