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
const PATH = "/blog/etf-sparplan-anfaenger";

const faqItems = [
  {
    q: "Mit wie viel Euro sollte ich starten?",
    a: "Mit so wenig wie möglich ist besser als gar nicht. 25 Euro/Monat ist ein guter Start. Ideal sind 100-150 Euro/Monat. Mit 200 Euro/Monat machst du schon sehr viel richtig.",
  },
  {
    q: "Welche Gebühren fallen an?",
    a: "Zwei Arten: (1) Depotgebühren (oft kostenlos), (2) ETF-Kosten (TER 0,1-0,3% pro Jahr). Bei 1.000 Euro Sparplan zahlst du ca. 1-3 Euro pro Jahr. Das ist minimal.",
  },
  {
    q: "Kann ich meinen ETF-Sparplan stoppen?",
    a: "Ja, jederzeit. Das ist die große Flexibilität. Du kannst jeden Monat pausieren, später weitermachen oder ganz stoppen. Das Geld bleibt dabei angelegt und wächst weiter.",
  },
  {
    q: "Was ist die beste Sparquote?",
    a: "Die beste Sparquote ist die, die du durchhältst. 50 Euro/Monat über 30 Jahre schlägt 500 Euro/Monat für 1 Jahr. Regelmässigkeit ist wichtiger als Höhe.",
  },
  {
    q: "Sind ETFs sicher?",
    a: "ETFs sind sicherer als Einzelaktien. Du verteilst dein Risiko auf Hunderte von Unternehmen. Kursverluste gibt es, aber langfristig (20+ Jahre) waren ETFs immer profitabel.",
  },
  {
    q: "ETF-Sparplan oder Depot — was ist besser?",
    a: "Jetzt (2026): ETF-Sparplan. Ab 2027: Depot (wegen Förderung). Optimal: Beides kombinieren. ETF für Flexibilität, Depot für staatliche Unterstützung.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "ETF-Sparplan für Anfänger: So fängst du mit 50 Euro pro Monat an",
    description: "ETF-Sparplan für Anfänger: Schritt-für-Schritt erklärt. Wie du mit 50€/Monat startest, welche ETFs sinnvoll sind und wie viel du später hast.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-04-26",
    dateModified: "2026-04-26",
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

const BlogEtfSparplanAnfaenger = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="ETF-Sparplan für Anfänger: So fängst du mit 50 Euro/Monat an"
        description="ETF-Sparplan für Anfänger: Schritt-für-Schritt erklärt. Wie du mit 50€/Monat startest, welche ETFs sinnvoll sind und wie viel du später hast."
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
                <BreadcrumbPage>ETF-Sparplan für Anfänger</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              ETF-Sparplan für Anfänger: So fängst du mit 50 Euro pro Monat an
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold flex items-center gap-2">
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              Inhaltsverzeichnis
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-sm">
              <Link to="#was-ist" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                1. Was ist ein ETF-Sparplan?
              </Link>
              <Link to="#zahlen" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                2. Die Zahlen: Wie viel Kapital baust du auf?
              </Link>
              <Link to="#welche-etfs" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                3. Welche ETFs sind für Anfänger sinnvoll?
              </Link>
              <Link to="#5-schritte" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                4. 5 Schritte zum ETF-Sparplan
              </Link>
              <Link to="#fehler" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                5. Die größten Anfänger-Fehler
              </Link>
              <Link to="#depot-vergleich" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                6. ETF-Sparplan vs. Altersvorsorgedepot
              </Link>
              <Link to="#faq" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                Häufige Fragen
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-lg">
                Ein ETF-Sparplan ist die einfachste Möglichkeit, mit Altersvorsorge zu starten. Keine Mindestanlage, keine komplizierten Verträge, nur 50 Euro pro Monat und du bist dabei. In diesem Artikel zeigen wir dir, wie du anfängst — und wie viel Kapital du in 30 Jahren aufbaust.
              </p>
            </section>

            <section id="was-ist" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Was ist ein ETF-Sparplan? (Definition für Anfänger)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Was ist ein ETF?</h3>
              <p className="mb-4">
                Ein ETF (Exchange Traded Fund) ist ein Korb mit Hunderten von Aktien. Statt dass du einzelne Unternehmen kaufst (z.B. Apple, Microsoft, Siemens), kaufst du einen ETF, der automatisch diese Hunderten von Unternehmen enthält. Das reduziert dein Risiko enorm.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Was ist ein Sparplan?</h3>
              <p className="mb-4">
                Ein Sparplan bedeutet: Jeden Monat wird automatisch der gleiche Betrag (z.B. 100 Euro) in denselben ETF investiert. Du musst nicht aktiv etwas tun. Die Bank macht es automatisch für dich.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Warum ETFs besser als Einzelaktien sind</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Diversifizierung: Dein Risiko ist verteilt auf Hunderte Unternehmen</li>
                <li>Keine Einzelstockpicking-Fehler: Du brauchst nicht zu entscheiden &quot;Welche Aktie kaufe ich?&quot;</li>
                <li>Automatisch am Aufschwung beteiligt: Alle Unternehmen weltweit in einem Produkt</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Warum Sparpläne besser als Einmalanlagen sind</h3>
              <p className="mb-4">
                Mit Sparplänen nutzt du den &quot;Cost-Averaging-Effekt&quot;: Du kaufst manchmal teuer, manchmal günstig — im Durchschnitt optimal. Mit 50 Euro pro Monat über 30 Jahre baust du mehr auf als mit 18.000 Euro auf einmal, weil du immer neu reinvestierst.
              </p>
            </section>

            <section id="zahlen" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. Die Zahlen: Wie viel Kapital baust du auf?</h2>

              <p className="mb-6">Mit 7% durchschnittliche Jahresrendite:</p>

              <div className="space-y-3 mb-6">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Szenario A: 50 Euro pro Monat</p>
                  <ul className="text-sm space-y-1">
                    <li>Nach 20 Jahren: ca. 23.000 Euro</li>
                    <li>Nach 30 Jahren: ca. 69.000 Euro</li>
                    <li>Nach 40 Jahren: ca. 155.000 Euro</li>
                  </ul>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Szenario B: 100 Euro pro Monat</p>
                  <ul className="text-sm space-y-1">
                    <li>Nach 20 Jahren: ca. 46.000 Euro</li>
                    <li>Nach 30 Jahren: ca. 138.000 Euro</li>
                    <li>Nach 40 Jahren: ca. 310.000 Euro</li>
                  </ul>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <p className="font-semibold mb-1">Szenario C: 200 Euro pro Monat (EMPFOHLEN)</p>
                  <ul className="text-sm space-y-1">
                    <li>Nach 20 Jahren: ca. 92.000 Euro</li>
                    <li>Nach 30 Jahren: ca. 276.000 Euro</li>
                    <li>Nach 40 Jahren: ca. 620.000 Euro</li>
                  </ul>
                </div>
              </div>

              <div className="bg-primary/5 border-l-4 border-primary p-4">
                <p className="font-semibold mb-2">Die wichtigste Erkenntnis:</p>
                <p className="text-sm">Mit nur 200 Euro pro Monat über 40 Jahre hast du 620.000 Euro. 96.000 Euro hast du selbst eingezahlt, 524.000 Euro kommen aus Rendite (Zinseszins!). Das ist warum früh anfangen so wichtig ist.</p>
              </div>
            </section>

            <section id="welche-etfs" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Welche ETFs sind für Anfänger sinnvoll?</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">MSCI World — Die Basis</h3>
              <p className="text-sm mb-4">
                Der MSCI World enthält ca. 1.500 große Unternehmen weltweit (USA, Europa, Asien, etc.). Das ist die Basis-Empfehlung für fast alle Anfänger. &quot;Langweilig&quot; ist hier ein Kompliment — es bedeutet stabil.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Emerging Markets — Die Würze (optional)</h3>
              <p className="text-sm mb-4">
                Länder wie China, Brasilien, Indien haben höheres Wachstumspotenzial als die USA. Aber auch höheres Risiko. Anfänger: 80% MSCI World, 20% Emerging Markets. Konservativ: 100% MSCI World.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Anleihen/Bonds — Die Sicherheit (für über 50)</h3>
              <p className="text-sm mb-4">
                Erst ab 50 Jahren solltest du weniger schwankungsanfällig werden. Bis dahin: 100% Aktien-ETFs (Stocks). Deine Zeit ist dein Vorteil — nutze sie.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Das ideale 3er-Portfolio für Anfänger</h3>
              <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                <p className="font-semibold">80/15/5 Verteilung:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>80%: MSCI World (Stabilität)</li>
                  <li>15%: Emerging Markets (Wachstum)</li>
                  <li>5%: Europa/Deutschland (Heimatbias, optional)</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">Oder einfacher für absolute Anfänger: 100% MSCI World. Einfach ist besser als perfekt.</p>
              </div>
            </section>

            <section id="5-schritte" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. 5 Schritte zum ETF-Sparplan</h2>

              <div className="space-y-4">
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Schritt 1: Broker wählen</h3>
                  <p className="text-sm text-muted-foreground">Du brauchst einen Online-Broker (z.B. Comdirect, Trade Republic, Consorsbank). Kostenlos, online in 10 Minuten erledigt.</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Schritt 2: Depot eröffnen</h3>
                  <p className="text-sm text-muted-foreground">Im Broker ein Depot anlegen (ist kostenlos). Das ist wie ein Behälter für deine ETFs.</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Schritt 3: ETF auswählen</h3>
                  <p className="text-sm text-muted-foreground">Suche nach &quot;MSCI World&quot; im Broker-System. Es gibt mehrere Anbieter (iShares, Vanguard, etc.). Alle sind gut.</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Schritt 4: Betrag &amp; Rhythmus festlegen</h3>
                  <p className="text-sm text-muted-foreground">Zum Beispiel: 100 Euro/Monat, jeden 1. des Monats. Das legst du beim Sparplan-Setup fest.</p>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Schritt 5: Automatisieren &amp; liegen lassen</h3>
                  <p className="text-sm text-muted-foreground">Das war's! Der Sparplan läuft jetzt automatisch. Du musst NICHTS mehr tun. Nicht schauen, nicht paniken, nicht anpassen. Nur sparen.</p>
                </div>
              </div>
            </section>

            <section id="fehler" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Die größten Anfänger-Fehler</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Fehler 1: &quot;Ich brauche viel Geld zum Starten&quot;</h3>
                  <p className="text-sm text-muted-foreground">Falsch. 25 Euro pro Monat ist ein guter Start. Die beste Investition ist immer die, die du auch durchhältst.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Fehler 2: &quot;Der Markt ist gerade teuer, ich warte&quot;</h3>
                  <p className="text-sm text-muted-foreground">Du kannst den Markt nicht timen. Mit 50 Euro pro Monat zahlst du manchmal 100 Euro/Anteil, manchmal 80 Euro/Anteil. Im Durchschnitt optimal.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Fehler 3: &quot;Ich kümmere mich täglich drum&quot;</h3>
                  <p className="text-sm text-muted-foreground">Das ist der größte Fehler. ETF-Sparen ist langweilig — und das ist gut so. Starte den Sparplan und vergiss ihn für 30 Jahre.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Fehler 4: &quot;Ich habe Angst vor Verlust&quot;</h3>
                  <p className="text-sm text-muted-foreground">Kursverluste gibt es. Aber langfristig (20+ Jahre) waren ETFs IMMER profitabel. Deine Angst vor 10% Schwankung kostet dich 100%+ Gewinn.</p>
                </div>
              </div>
            </section>

            <section id="depot-vergleich" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">6. ETF-Sparplan vs. Altersvorsorgedepot</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Jetzt (2026): ETF-Sparplan</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Sofort verfügbar</li>
                <li>Flexible jederzeit</li>
                <li>Keine Förderung</li>
                <li>25% Steuern jährlich (auf Gewinne)</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Ab 2027: Altersvorsorgedepot</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Staatliche Förderung: bis 540 Euro/Jahr</li>
                <li>Bis 65 gebunden</li>
                <li>Kostendeckel: 1,0% p.a.</li>
                <li>Steuern erst im Alter</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Die beste Kombination</h3>
              <div className="bg-primary/5 border-l-4 border-primary p-4">
                <p className="font-semibold mb-2">Jetzt &amp; ab 2027:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Starte JETZT mit ETF-Sparplan (50-100 Euro/Monat)</li>
                  <li>Ab Januar 2027: Zusätzlich Depot (150 Euro/Monat für maximale Förderung)</li>
                  <li>So hast du Flexibilität (ETF) UND Förderung (Depot)</li>
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
              Ein ETF-Sparplan ist die einfachste und beste Möglichkeit, mit Altersvorsorge zu starten. 50 Euro pro Monat, fertig. Keine Mindestanlage, keine Verträge, keine Sorgen. Nur Sparen und wachsen lassen.
            </p>
          </div>

          {/* RELATED_ARTICLES_START */}
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold mb-4 text-foreground">📚 Verwandte Artikel</h3>
            <div className="space-y-2">
              <Link to="/blog/etf-sparplan-steuern" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>ETF Sparplan Steuern: Was du wirklich zahlen musst</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/altersvorsorgedepot-vs-etf-sparplan" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Altersvorsorgedepot vs. ETF-Sparplan</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/altersvorsorge-portfolio" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Wie sieht ein gutes Altersvorsorge-Portfolio aus?</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link to="/blog/zinseszins-frueh-starten" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Zinseszins-Effekt: Warum früh sparen so wichtig ist</span>
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
              Berechne deine Rentenlücke
            </Link>
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  );
};

export default BlogEtfSparplanAnfaenger;
