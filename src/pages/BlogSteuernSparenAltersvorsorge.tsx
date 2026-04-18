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
const PATH = "/blog/steuern-sparen-altersvorsorge";

const faqItems = [
  {
    q: "Wie viel Steuern spare ich mit dem Altersvorsorgedepot?",
    a: "Das hängt von deinem Grenzsteuersatz ab. Bei 22% Grenzsteuer und 150 Euro/Monat sparst du ca. 396 Euro pro Jahr. Bei 42% Grenzsteuer: ca. 756 Euro pro Jahr.",
  },
  {
    q: "Ist Rürup wirklich so gut?",
    a: "Ja, aber nur für Selbstständige und Gutverdiener (ab 42% Grenzsteuersatz). Ein Angestellter mit 22% Grenzsteuer profitiert weniger. Der Depot ist für Angestellte oft besser.",
  },
  {
    q: "Können Selbstständige mehr Steuern sparen?",
    a: "Ja. Selbstständige haben oft 42% Grenzsteuersatz, verdienen aber auch weniger verlässlich. Die Kombination Depot + Rürup + ETF ist für sie optimal.",
  },
  {
    q: "Was ist die bAV für Steuern wert?",
    a: "Enorm. Die bAV spart nicht nur Einkommensteuern (22-42%), sondern auch Sozialabgaben (ca. 42% zusammen). Das ist der größte Steuervorteil überhaupt.",
  },
  {
    q: "Wie funktioniert nachgelagerte Besteuerung?",
    a: "Deine Beiträge sind jetzt steuerfrei (Sonderausgaben). Im Alter zahlst du Steuern auf deine Renteneinkünfte. Das ist ein Vorteil, wenn dein Steuersatz im Alter niedriger ist.",
  },
  {
    q: "Lohnt sich das Depot steuerlich vs. ETF-Sparplan?",
    a: "Ja. ETF-Sparplan: 25% Abgeltungsteuer jährlich. Depot: 0% jetzt, Steuern erst im Alter. Wenn dein Satz im Alter niedriger ist, gewinnt das Depot deutlich.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Steuern sparen mit Altersvorsorge: So sparst du bis zu 3.000 Euro pro Jahr",
    description: "Mit Altersvorsorge Steuern sparen: Sonderausgabenabzug, Freibeträge, Rürup. Konkrete Euro-Beispiele für Angestellte und Selbstständige.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-04-28",
    dateModified: "2026-04-28",
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

const BlogSteuernSparenAltersvorsorge = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Steuern sparen mit Altersvorsorge: So sparst du bis zu 3.000 Euro/Jahr"
        description="Mit Altersvorsorge Steuern sparen: Sonderausgabenabzug, Freibeträge, Rürup. Konkrete Euro-Beispiele für Angestellte und Selbstständige."
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
                <BreadcrumbPage>Steuern sparen mit Altersvorsorge</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Steuern sparen mit Altersvorsorge: So sparst du bis zu 3.000 Euro pro Jahr
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold flex items-center gap-2">
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              Inhaltsverzeichnis
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-sm">
              <Link to="#wie-sparst-du" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                1. Wie du mit Altersvorsorge Steuern sparst
              </Link>
              <Link to="#sonderausgabenabzug" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                2. Sonderausgabenabzug erklärt
              </Link>
              <Link to="#szenarien" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                3. Drei realistische Szenarien
              </Link>
              <Link to="#produkte" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                4. Produkte &amp; ihr Steuervorteil
              </Link>
              <Link to="#beste-kombination" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                5. Die beste Kombination
              </Link>
              <Link to="#regeln" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                6. Wichtige Regeln &amp; Fallstricke
              </Link>
              <Link to="#faq" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                Häufige Fragen
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-lg">
                Mit Altersvorsorge Steuern zu sparen ist einer der besten Hebel, den die meisten Menschen nicht nutzen. Während andere ihre Gehaltserhöhungen komplett versteuern, nutzt du Sonderausgabenabzüge und sparst bis zu 3.000 Euro pro Jahr. In diesem Artikel zeigen wir dir, wie.
              </p>
            </section>

            <section id="wie-sparst-du" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Wie du mit Altersvorsorge Steuern sparst (Überblick)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Die 3 Mechanismen</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-2">Mechanismus 1: Sonderausgabenabzug</p>
                  <p className="text-sm text-muted-foreground">Deine Altersvorsorgebeiträge sind &quot;Sonderausgaben&quot; — du ziehst sie von deinem zu versteuernden Einkommen ab. Beispiel: €1.800/Jahr Depot-Beitrag = €1.800 weniger zu versteuerndes Einkommen.</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-2">Mechanismus 2: Grenzsteuersatz</p>
                  <p className="text-sm text-muted-foreground">Die Steuern, die du sparst, sind dein persönlicher &quot;Grenzsteuersatz&quot;. Bei €2.500 netto verdienst du ca. 22% Grenzsteuer. Bei €5.000+ netto: 42%. Je höher dein Einkommen, desto mehr sparst du.</p>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Mechanismus 3: Nachgelagerte Besteuerung</p>
                  <p className="text-sm text-muted-foreground">Mit dem Depot zahlst du jetzt 0% Steuern. Im Alter zahlst du Steuern auf deine Renteneinkünfte — aber wahrscheinlich mit niedrigerem Satz. Das ist der große Vorteil.</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Wer profitiert am meisten?</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Gutverdiener (€4.000+ netto): 42% Grenzsteuer = großer Vorteil</li>
                <li>Mittleres Einkommen (€2.500-3.500): 28-32% = guter Vorteil</li>
                <li>Niedriges Einkommen (€1.500-2.500): 22% = moderater Vorteil</li>
                <li>Selbstständige: Können auch Rürup nutzen (noch mehr Vorteil)</li>
              </ul>
            </section>

            <section id="sonderausgabenabzug" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. Sonderausgabenabzug erklärt (mit Beispielen)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Was ist der Sonderausgabenabzug?</h3>
              <p className="mb-4">
                Der Sonderausgabenabzug bedeutet: Deine Altersvorsorgebeiträge reduzieren dein zu versteuerndes Einkommen. Du zahlst Einkommensteuer auf einen kleineren Betrag. Das spart dir Steuern.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Grenzsteuersatz verstehen</h3>
              <p className="mb-4">
                Der Grenzsteuersatz ist der Steuersatz auf deinen nächsten Euro Einkommen. Es ist NICHT der Durchschnittssteuersatz. Beispiel:
              </p>
              <div className="bg-secondary p-4 rounded-lg mb-6">
                <p className="font-semibold text-sm mb-3">€2.500 netto = ca. €3.500 brutto</p>
                <ul className="text-sm space-y-1">
                  <li>Durchschnittssteuersatz: ca. 20%</li>
                  <li className="font-semibold text-primary">Grenzsteuersatz: 22% ← WICHTIG!</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">Der Grenzsteuersatz ist der, der für deine Altersvorsorge zählt.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Konkretes Beispiel: €150/Monat Depot-Beitrag</h3>
              <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                <p className="font-semibold">Mit 22% Grenzsteuersatz:</p>
                <ul className="space-y-1">
                  <li>€150/Monat = €1.800/Jahr Sonderausgabe</li>
                  <li>€1.800 × 22% = €396 Steuerersparnis pro Jahr</li>
                  <li>Das ist wie eine 22% Rendite vom Staat!</li>
                </ul>
              </div>
            </section>

            <section id="szenarien" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Drei realistische Szenarien (mit Euro-Steuersparnis)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario A: Angestellte/r (€2.500 netto, 22% GrStSatz)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Nettoeinkommen: €2.500/Monat</li>
                  <li>Grenzsteuersatz: 22%</li>
                  <li>Altersvorsorge-Sparbetrag: €150/Monat (€1.800/Jahr)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Steuersparnis pro Jahr: €1.800 × 22% = €396</p>
                <p className="text-xs text-muted-foreground mt-2">Das ist ca. €33/Monat extra Netto-Vorteil!</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario B: Mittleres Einkommen (€3.500 netto, 32% GrStSatz) ← TYPISCH</h3>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Nettoeinkommen: €3.500/Monat</li>
                  <li>Grenzsteuersatz: 32%</li>
                  <li>Altersvorsorge-Sparbetrag: €200/Monat (€2.400/Jahr)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Steuersparnis pro Jahr: €2.400 × 32% = €768</p>
                <p className="text-xs text-muted-foreground mt-2">Das ist ca. €64/Monat extra! Jetzt lohnt sich's richtig.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario C: Gutverdiener (€5.000+ netto, 42% GrStSatz)</h3>
              <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Nettoeinkommen: €5.000+/Monat</li>
                  <li>Grenzsteuersatz: 42% (42% Spitzensatz!)</li>
                  <li>Altersvorsorge-Sparbetrag: €300/Monat (€3.600/Jahr)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Steuersparnis pro Jahr: €3.600 × 42% = €1.512</p>
                <p className="text-xs text-muted-foreground mt-2">Das ist ca. €126/Monat Steuervorteil! Massive Ersparnis.</p>
              </div>
            </section>

            <section id="produkte" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Produkte &amp; ihr Steuervorteil</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Altersvorsorgedepot (ab 2027)</h3>
              <p className="text-sm mb-4">
                Sonderausgabenabzug: bis €20.000/Jahr (2027). Nachgelagerte Besteuerung: Du zahlst Steuern erst im Alter auf deine Renteneinkünfte. Vorteil: Sehr hoch, wenn dein Steuersatz im Alter niedriger ist (wahrscheinlich).
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Rürup-Rente (Basisrente)</h3>
              <p className="text-sm mb-4">
                Ähnlich dem Depot: Sonderausgabenabzug + nachgelagerte Besteuerung. Extra: Für Selbstständige ist der Abzug höher (bis zu 30% des Gewinns). Achtung: Sehr gebunden (bis 62 mindestens).
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">ETF-Sparplan</h3>
              <p className="text-sm mb-4">
                Kein Sonderausgabenabzug! 25% Abgeltungsteuer jährlich auf Gewinne. Steuervorteil: Null. Flexibilität: Maximum. Fazit: Gut für zusätzliche Flexibilität, aber keine Steuerersparnis.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Betriebliche Altersvorsorge (bAV) — DER CHAMPION</h3>
              <p className="text-sm mb-4">
                Sonderausgabenabzug: Ja. Plus Sozialabgabenersparnis! Mit bis zu €302/Monat (2026) sparst du nicht nur Einkommensteuer, sondern auch ca. 42% Sozialabgaben (Kranken-, Renten-, Arbeitslosenversicherung). Das ist der GRÖSSTE Steuervorteil überhaupt.
              </p>

              <div className="bg-primary/5 border-l-4 border-primary p-4 mt-6">
                <p className="font-semibold text-sm mb-2">Steuervorteil-Ranking:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li><strong>bAV:</strong> 60-64% Gesamtvorteil (Steuer + Sozialabgaben)</li>
                  <li><strong>Rürup (für Selbstständige):</strong> 40-42% Steuervorteil</li>
                  <li><strong>Depot:</strong> 22-42% Steuervorteil (je nach Grenzsteuer)</li>
                  <li><strong>ETF-Sparplan:</strong> 0% Steuervorteil</li>
                </ol>
              </div>
            </section>

            <section id="beste-kombination" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Die beste Kombination (für maximalen Steuervorteil)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Für Angestellte</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Optimal:</p>
                <ul className="space-y-1">
                  <li>bAV: €302/Monat (wenn vorhanden) ← PRIORITÄT 1</li>
                  <li>Depot (ab 2027): €150-200/Monat ← PRIORITÄT 2</li>
                  <li>ETF-Sparplan: €50-100/Monat (für Flexibilität)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Gesamte Steuerersparnis: €1.500-2.500/Jahr</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Für Selbstständige</h3>
              <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                <p className="font-semibold">Optimal:</p>
                <ul className="space-y-1">
                  <li>Rürup: €300-500/Monat ← PRIORITÄT 1 (großer Abzug)</li>
                  <li>Depot (ab 2027): €150-200/Monat ← PRIORITÄT 2</li>
                  <li>ETF-Sparplan: €100-200/Monat (für Flexibilität)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Gesamte Steuerersparnis: €2.000-3.000+/Jahr</p>
              </div>
            </section>

            <section id="regeln" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">6. Wichtige Regeln &amp; Fallstricke</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Regel 1: Mindestbeitrag (€120/Jahr)</h3>
                  <p className="text-sm text-muted-foreground">Das Depot braucht mind. €10/Monat (€120/Jahr), um Förderung zu bekommen. Unter €10/Monat = keine Förderung, aber Sonderausgabenabzug funktioniert trotzdem.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Regel 2: Sonderausgabengrenzen</h3>
                  <p className="text-sm text-muted-foreground">Der Abzug ist begrenzt (ca. 20.000 Euro/Jahr Depot). Du kannst nicht unbegrenzt Steuern sparen. Aber die meisten Menschen erreichen diese Grenzen nicht.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Regel 3: Bis 65 gebunden (bedeutet...)</h3>
                  <p className="text-sm text-muted-foreground">Depot &amp; Rürup sind bis Renteneintritt (mind. 65) gebunden. Das ist nicht schlecht — es schützt dich vor dir selbst! Aber: ETF-Sparplan bleibt flexibel.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Fallstrick 1: Zu viel sparen (falsch proportioniert)</h3>
                  <p className="text-sm text-muted-foreground">Nicht alles ins Depot. 70% Depot (für Förderung), 30% ETF (für Flexibilität) ist besser als 100% Depot.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Fallstrick 2: bAV vergessen</h3>
                  <p className="text-sm text-muted-foreground">Wenn dein Arbeitgeber bAV anbietet und du machst es nicht: Du lässt 60%+ Steuervorteil liegen. Check das sofort mit deinem Arbeitgeber!</p>
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
              Mit Altersvorsorge Steuern zu sparen ist nicht kompliziert — es ist nur eine Frage, die richtigen Produkte zu nutzen. bAV wenn möglich, Depot ab 2027, ETF-Sparplan für Flexibilität. Die Steuersparnis ist wie eine Extra-Rendite vom Staat. Das ist zu wertvoll, um es zu ignorieren.
            </p>
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

export default BlogSteuernSparenAltersvorsorge;
