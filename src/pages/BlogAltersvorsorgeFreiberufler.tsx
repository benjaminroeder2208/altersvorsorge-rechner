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
const PATH = "/blog/altersvorsorge-fuer-freiberufler";

const faqItems = [
  {
    q: "Ist Rürup für alle Freiberufler sinnvoll?",
    a: "Ja, wenn Grenzsteuersatz 32%+ ist (Gewinn €40k+). Mit €30k Gewinn: geringerer Abzug, dann ist Depot besser. Mit €60k+: Rürup ist der Champion.",
  },
  {
    q: "Wie viel Steuern spare ich mit Rürup wirklich?",
    a: "Mit €50k Gewinn + 30% Abzug = €15k Sonderausgabe x 42% Steuersatz = €6.300 Steuerersparnis/Jahr. Das ist real.",
  },
  {
    q: "Kann ich Rürup + Depot kombinieren?",
    a: "Ja, optimal! Rürup für Steuervorteil (gebunden), Depot für Diversifikation + Flexibilität. Best of both worlds.",
  },
  {
    q: "Was ist der maximale Rürup-Beitrag?",
    a: "30% des Nettoeinkommens, max. ca. €30k/Jahr. Mit €50k Gewinn: ca. €15k/Jahr möglich. Mit weniger: proportional weniger.",
  },
  {
    q: "Sollte ich mit 50+ noch Rürup machen?",
    a: "Ja! Mit 50 Jahren 17 Jahre bis 67 — Rürup ist immer noch sinnvoll. Mit 42% Steuersatz: mega Vorteil.",
  },
  {
    q: "Wie sicher ist Rürup im Alter?",
    a: "Sehr sicher. Rürup kann nicht gepfändet, nicht für Sozialleistungen angerechnet. Du brauchst es wirklich erst mit 62+.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorge für Freiberufler: Rürup, Depot & maximale Steuersparnis",
    description: "Altersvorsorge für Freiberufler: Rürup vs. Depot vs. ETF. Welche Strategie maximiert Steuervorteil und Kapitalaufbau? Mit konkreten Beispielen.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-05-19",
    dateModified: "2026-05-19",
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

const BlogAltersvorsorgeFreiberufler = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorge für Freiberufler: Rürup, Depot & maximale Steuersparnis"
        description="Altersvorsorge für Freiberufler: Rürup vs. Depot vs. ETF. Welche Strategie maximiert Steuervorteil und Kapitalaufbau? Mit konkreten Beispielen."
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
                <BreadcrumbPage>Altersvorsorge für Freiberufler</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Altersvorsorge für Freiberufler: Rürup, Depot &amp; maximale Steuersparnis
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold flex items-center gap-2">
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              Inhaltsverzeichnis
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-sm">
              <Link to="#selbststaendige" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                1. Selbstständige vs. Angestellte
              </Link>
              <Link to="#ruerup" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                2. Rürup-Rente erklärt
              </Link>
              <Link to="#szenarien" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                3. Drei realistische Szenarien
              </Link>
              <Link to="#vergleich" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                4. Rürup vs. Depot vs. ETF
              </Link>
              <Link to="#optimal" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                5. Die optimale Strategie
              </Link>
              <Link to="#versicherung" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                6. Krankenversicherung &amp; Altersvorsorge
              </Link>
              <Link to="#faq" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                Häufige Fragen
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-lg">
                Als Freiberufler hast du keine bAV vom Arbeitgeber. Keine Betriebsrente. Dafür hast du aber Rürup — das beste Steuersparmodell für dich. In diesem Artikel zeigen wir dir, wie du mit Rürup die maximale Steuersparnis herausholt.
              </p>
            </section>

            <section id="selbststaendige" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Selbstständige vs. Angestellte (Der Unterschied)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Keine bAV (kein Arbeitgeberzuschuss)</h3>
              <p className="text-sm mb-4">
                Angestellte bekommen vom Arbeitgeber bis zu €302/Monat (2026). Das ist dein großer Nachteil als Freiberufler. ABER: Dafür hast du Rürup mit viel höherem Abzug.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Höhere Grenzsteuersätze möglich (42%+)</h3>
              <p className="text-sm mb-4">
                Mit €60k Gewinn verdienst du oft 32–42% Grenzsteuer. Mit Rürup: du sparst 32–42% auf jeden Euro, den du einzahlst. Das ist massive Rendite vom Staat.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Mehr Flexibilität, weniger Sicherheit</h3>
              <p className="text-sm mb-4">
                Du bist dein eigener Boss — aber auch dein eigener Sozialversicherer. Keine Betriebsrente, keine automatische Altersvorsorge. Du musst es selbst regeln.
              </p>

              <div className="bg-primary/5 border-l-4 border-primary p-4 mt-6">
                <p className="font-semibold text-sm">Die Botschaft für Freiberufler:</p>
                <p className="text-sm">Rürup ist MADE FOR YOU. Nutze es aggressiv.</p>
              </div>
            </section>

            <section id="ruerup" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. Rürup-Rente erklärt (Spezial für Selbstständige)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Was ist Rürup?</h3>
              <p className="text-sm mb-4">
                Rürup ist eine Altersvorsorge speziell für Selbstständige & Freiberufler. Du zahlst ein, bekommst Sonderausgabenabzug, sparst Steuern, und kriegst dein Geld im Alter.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Sonderausgabenabzug: bis zu 30% des Gewinns!</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Beispiel: €50k Gewinn</p>
                <ul className="space-y-1">
                  <li>Maximaler Rürup-Abzug: 30% = €15.000/Jahr</li>
                  <li>Mit 42% Grenzsteuersatz: €15.000 × 42% = €6.300 Steuerersparnis!</li>
                  <li>Das ist wie der Staat zahlt 42% deiner Rürup mit!</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Lockup bis 62: Das ist kein Nachteil</h3>
              <p className="text-sm mb-4">
                Rürup ist bis 62 gebunden. Aber als Freiberufler: willst du dein Geld mit 50 rausnehmen? Wahrscheinlich nicht. Du wirst arbeiten bis 67+. Also: kein Nachteil.
              </p>
            </section>

            <section id="szenarien" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Drei realistische Szenarien (Freiberufler)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario A: Junger Freiberufler (€30k/Jahr Gewinn)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Alter: 30 Jahre</li>
                  <li>Gewinn: €30k/Jahr</li>
                  <li>30% Abzug möglich: €9k/Jahr</li>
                  <li>Grenzsteuersatz: ca. 28%</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Steuerersparnis: €9k × 28% = €2.520/Jahr</p>
                <p className="text-xs text-muted-foreground mt-2">Du sparst eigentlich nur €6.480/Jahr (€9k minus Steuervorteil). Sehr sinnvoll!</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario B: Etablierter Freiberufler (€60k/Jahr) ← OPTIMAL</h3>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Alter: 40 Jahre</li>
                  <li>Gewinn: €60k/Jahr</li>
                  <li>30% Abzug möglich: €18k/Jahr</li>
                  <li>Grenzsteuersatz: ca. 37%</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Steuerersparnis: €18k × 37% = €6.660/Jahr!</p>
                <p className="text-xs text-muted-foreground mt-2">Du sparst echtes Geld. €18k einzahlen, €6.6k Steuern sparen = effektiv nur €11.4k dein Geld.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario C: Top-Verdienender (€100k+/Jahr)</h3>
              <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Alter: 45 Jahre</li>
                  <li>Gewinn: €100k+/Jahr</li>
                  <li>30% Abzug möglich: €30k/Jahr</li>
                  <li>Grenzsteuersatz: 42%</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Steuerersparnis: €30k × 42% = €12.600/Jahr!!</p>
                <p className="text-xs text-muted-foreground mt-2">Mit diesem Steuervorteil: Rürup ist ein MUSS. €30k einzahlen, €12.6k Steuern sparen = effektiv €17.4k dein Geld.</p>
              </div>
            </section>

            <section id="vergleich" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Rürup vs. Depot vs. ETF (Vergleich)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Rürup: Maximale Steuerersparnis, aber gebunden</h3>
              <p className="text-sm mb-4">
                Pro: 30% Abzug, 42% Steuersatz = massive Ersparnisse. Con: Bis 62 gebunden, Rente im Alter besteuert.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Depot: Gute Balance, flexibler</h3>
              <p className="text-sm mb-4">
                Pro: 20k/Jahr Abzug, flexibel (nicht gebunden). Con: Weniger Steuervorteil als Rürup.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">ETF: Flexibel, aber kein Steuervorteil</h3>
              <p className="text-sm mb-4">
                Pro: Völlig flexibel, jederzeit verfügbar. Con: 25% Abgeltungsteuer jährlich = teuer.
              </p>

              <div className="bg-primary/5 border-l-4 border-primary p-4 mt-6">
                <p className="font-semibold text-sm mb-2">Für Freiberufler optimal:</p>
                <p className="text-sm">Rürup (Steuervorteil) + Depot (Diversifikation) + ETF (Flexibilität) = Triple-Sicherheit</p>
              </div>
            </section>

            <section id="optimal" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Die optimale Strategie für Freiberufler</h2>

              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Priorität 1: Rürup (für Steuervorteil)</p>
                  <p className="text-sm text-muted-foreground">€15k–30k/Jahr (je nach Gewinn). Das ist der Kern.</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Priorität 2: Depot (Diversifikation)</p>
                  <p className="text-sm text-muted-foreground">€5k–10k/Jahr zusätzlich. Mehr Flexibilität, zweites Standbein.</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Priorität 3: ETF (Flexibilität)</p>
                  <p className="text-sm text-muted-foreground">€100–200/Monat wenn Budget übrig. Für echte Notfälle.</p>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <p className="font-semibold mb-1">Praktische Checkliste</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Steuerberater: Rürup-Beitrag berechnen lassen (30% Regel)</li>
                    <li>Rürup: Angebot holen (mehrere Versicherer vergleichen)</li>
                    <li>Depot: Angebot holen (Steuervorteil nutzen)</li>
                    <li>ETF: Setup zur Verfügung (für Flexibilität)</li>
                    <li>Jährlich überprüfen: Einkommen stabil? Rürup anpassen.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="versicherung" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">6. Krankenversicherung &amp; Altersvorsorge (Spezial)</h2>

              <p className="mb-6">
                Als Freiberufler zahlst du selbst Krankenversicherung. Das ist teuer — ca. €300–400/Monat. Das reduziert dein Sparbugget. Aber: Das ist unvermeidbar, also plan damit.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Realistische Budgets für Freiberufler</h3>
              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg text-sm">
                  <p className="font-semibold">€40k Gewinn:</p>
                  <p>Krankenversicherung: €300/Mo = €3.600/Jahr. Rest: €36.4k. Zum Sparen: realistically €5k/Jahr (Depot + Rürup zusammen).</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg text-sm">
                  <p className="font-semibold">€60k Gewinn:</p>
                  <p>Krankenversicherung: €350/Mo = €4.200/Jahr. Rest: €55.8k. Zum Sparen: €12k–15k/Jahr möglich (aggressive Rürup).</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg text-sm">
                  <p className="font-semibold">€100k+ Gewinn:</p>
                  <p>Krankenversicherung: €400/Mo = €4.800/Jahr. Rest: €95.2k. Zum Sparen: €20k–30k/Jahr möglich (maximale Rürup).</p>
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
              Freiberufler haben einen großen Vorteil: Rürup mit 30% Abzug + 42% Steuersatz = massive Ersparnisse. €18k einzahlen, €6.6k Steuern sparen (mit €60k Gewinn). Das ist der beste Deal, den du kriegen kannst. Nutze ihn aggressiv.
            </p>
          </div>

          <BlogDisclaimer mitRechnung={false} />

          <div className="mt-8 text-center">
            {/* RELATED_ARTICLES_START */}
            <div className="mt-8 mb-4">
              <h3 className="text-lg font-semibold mb-4 text-foreground">📚 Verwandte Artikel</h3>
              <div className="space-y-2">
                <Link to="/blog/ruerup-rente" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                  <span>Rürup-Rente: Die beste Steuersparnis für Selbstständige</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
                <Link to="/blog/steuern-sparen-altersvorsorge" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                  <span>Mit Altersvorsorge Steuern sparen</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
                <Link to="/blog/altersvorsorge-selbststaendige" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                  <span>Altersvorsorge für Selbstständige</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
                <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                  <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              </div>
            </div>

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

export default BlogAltersvorsorgeFreiberufler;
