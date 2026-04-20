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
const PATH = "/blog/altersvorsorge-30-jahre";

const faqItems = [
  {
    q: "Wie viel muss ich mit 30 Jahren sparen?",
    a: "Das hängt von deiner Rentenlücke ab. Im Durchschnitt schaffen es Menschen mit €100–200/Monat, ihre Lücke zu schließen.",
  },
  {
    q: "Ist es mit 30 zu spät für Altersvorsorge?",
    a: "Nein, auf keinen Fall. Mit 30 Jahren hast du noch 37 Jahre bis zur Rente.",
  },
  {
    q: "Wie funktioniert der Zinseszins bei Altersvorsorge?",
    a: "Der Zinseszins bedeutet: Deine Renditen bringen selbst wieder Rendite. Mit 7% p.a. verdoppelt sich dein Kapital etwa alle 10 Jahre.",
  },
  {
    q: "Welches Produkt ist mit 30 Jahren das beste?",
    a: "Ab 2027 ist das Altersvorsorgedepot die beste Wahl (€540/Jahr Förderung).",
  },
  {
    q: "Kann ich mit 30 Jahren noch Altersvorsorge aufbauen?",
    a: "Ja, absolut. Mit €150/Monat über 32 Jahre (bis 67) baust du ca. €276.000 auf (inkl. Förderung).",
  },
  {
    q: "Was ist die beste Altersvorsorge für 30-Jährige?",
    a: "Die beste Altersvorsorge ist: Altersvorsorgedepot (ab 2027) + eventuell zusätzlicher ETF-Sparplan.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorge mit 30 Jahren — Warum früh starten wirklich lohnt",
    description: "Mit 30 Jahren sparen? Ja! Wir zeigen, wie ein 35-Jähriger €276.000 aufbaut — und was es kostet, zu warten.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-04-19",
    dateModified: "2026-04-19",
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

const BlogAltersvorsorge30Jahre = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorge mit 30: Warum jetzt sparen die beste Entscheidung ist"
        description="Mit 30 Jahren sparen? Ja! Wir zeigen, wie ein 35-Jähriger €276.000 aufbaut — und was es kostet, zu warten."
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
                <BreadcrumbPage>Altersvorsorge mit 30 Jahren</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Altersvorsorge mit 30 Jahren — Warum früh starten wirklich lohnt
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold flex items-center gap-2">
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              Inhaltsverzeichnis
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-sm">
              <Link to="#zinseszins" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                1. Der Zinseszins-Effekt
              </Link>
              <Link to="#szenarien" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                2. Drei realistische Szenarien
              </Link>
              <Link to="#depot-vergleich" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                3. Depot vs. ohne Förderung
              </Link>
              <Link to="#fehler" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                4. Die 3 größten Fehler
              </Link>
              <Link to="#action-plan" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                5. Dein Action Plan
              </Link>
              <Link to="#faq" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                Häufige Fragen
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-lg">
                Viele denken: "Mit 30 Jahren ist die beste Zeit vorbei." Das ist ein großer Irrtum. Mit 30 Jahren hast du noch <strong>37 Jahre bis zur Rente</strong> — und diese Zeit ist dein größter Vorteil.
              </p>
            </section>

            <section id="zinseszins" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Der Zinseszins-Effekt — Dein geheimer Vorteil</h2>
              <p className="mb-4">
                Zinseszins bedeutet: Deine Renditen bringen selbst wieder Rendite. Wenn du heute €100 sparst und diese €5 Rendite bringt, dann bringt diese €5 nächstes Jahr selbst wieder €0,35 Rendite.
              </p>
              <div className="bg-primary/5 border-l-4 border-primary p-4 my-6">
                <p className="font-semibold mb-2">Konkretes Beispiel:</p>
                <ul className="space-y-1 text-sm">
                  <li>✓ Du bist 35 Jahre alt</li>
                  <li>✓ Sparst monatlich €150</li>
                  <li>✓ Rendite: 7% pro Jahr</li>
                  <li>✓ Sparzeit: 32 Jahre (bis 67)</li>
                  <li className="font-semibold text-primary mt-2">= €276.000 Kapital</li>
                </ul>
              </div>
            </section>

            <section id="szenarien" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. Drei realistische Szenarien für dein Alter</h2>
              <div className="space-y-4">
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Szenario A: Du bist 25 Jahre alt</h3>
                  <ul className="text-sm space-y-1">
                    <li>Sparzeit: 42 Jahre</li>
                    <li className="font-semibold text-primary">Kapital: €410.000</li>
                  </ul>
                </div>
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Szenario B: Du bist 35 Jahre alt</h3>
                  <ul className="text-sm space-y-1">
                    <li>Sparzeit: 32 Jahre</li>
                    <li className="font-semibold text-primary">Kapital: €276.000</li>
                  </ul>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Szenario C: Du bist 45 Jahre alt</h3>
                  <ul className="text-sm space-y-1">
                    <li>Sparzeit: 22 Jahre</li>
                    <li className="font-semibold text-primary">Kapital: €130.000</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="depot-vergleich" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Altersvorsorgedepot vs. Depot ohne Förderung</h2>
              <div className="bg-primary/5 border-l-4 border-primary p-4">
                <p className="font-semibold mb-2">Der Vergleich:</p>
                <ul className="space-y-1 text-sm">
                  <li>Depot mit Förderung: €276.000</li>
                  <li>Depot ohne Förderung: €212.000</li>
                  <li className="font-semibold text-primary">Differenz: €64.000</li>
                </ul>
              </div>
            </section>

            <section id="fehler" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Die 3 größten Fehler bei Altersvorsorge</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Fehler 1: "Ich bin noch jung, ich fang später an"</h3>
                  <p className="text-sm">Jedes Jahr Verzögerung kostet dich ca. €20.000 Kapital. Mit 35 Jahren gibt es kein "später" mehr.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Fehler 2: "Ich muss perfekt sparen"</h3>
                  <p className="text-sm">€50/Monat über 32 Jahre = €46.000. €150/Monat = €155.280. Lieber klein starten als gar nicht.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Fehler 3: "Ich warte auf bessere Zeiten"</h3>
                  <p className="text-sm">Zeit schlägt Timing. Lieber jetzt starten mit mittelmäßiger Performance als gar nicht.</p>
                </div>
              </div>
            </section>

            <section id="action-plan" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Dein Action Plan — 5 konkrete Schritte</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Schritt 1: Definiere dein Ziel</h3>
                  <p className="text-sm text-muted-foreground">Wie viel Rente brauchst du monatlich?</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Schritt 2: Festige deinen Sparbetrag</h3>
                  <p className="text-sm text-muted-foreground">€50–500/Monat je nach Situation</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Schritt 3: Wähle dein Produkt</h3>
                  <p className="text-sm text-muted-foreground">Ab 2027: Altersvorsorgedepot</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Schritt 4: Automatisiere</h3>
                  <p className="text-sm text-muted-foreground">Standing Order am 1. des Monats</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Schritt 5: Überprüfe jährlich</h3>
                  <p className="text-sm text-muted-foreground">Kapital anschauen, ggf. erhöhen</p>
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
              Mit 30 Jahren hast du noch 37 Jahre bis zur Rente. Das ist nicht "zu spät", das ist perfekt. Die beste Zeit, einen Baum zu pflanzen, war vor 20 Jahren. Die zweitbeste Zeit ist heute.
            </p>
          </div>

          {/* RELATED_ARTICLES_START */}
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold mb-4 text-foreground">📚 Verwandte Artikel</h3>
            <div className="space-y-2">
              <Link to="/blog/zinseszins-frueh-starten" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Zinseszins-Effekt: Warum früh sparen so wichtig ist</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/etf-sparplan-anfaenger" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>ETF-Sparplan für Anfänger: So fängst du mit 50 Euro/Monat an</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/altersvorsorge-portfolio" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Wie sieht ein gutes Altersvorsorge-Portfolio aus?</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            </div>
          </div>

          <BlogNewsletterWidget />
          <BlogDisclaimer mitRechnung={true} />

          <div className="mt-8 text-center">
            <Link
              to="/rentenluecken-rechner"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Calculator className="w-4 h-4" />
              Zum Rentenlückenrechner
            </Link>
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  );
};

export default BlogAltersvorsorge30Jahre;
