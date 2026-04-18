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
const PATH = "/blog/altersvorsorge-ab-40";

const faqItems = [
  {
    q: "Bin ich mit 40 zu spät angefangen?",
    a: "Nein. Mit 27 Jahren bis zur Rente hast du noch einen großen Vorteil. 200 Euro/Monat über 27 Jahre = ca. 135.000 Euro Kapital (bei 7% Rendite). Das ist nicht zu spät.",
  },
  {
    q: "Wie viel sollte ich mit 40 monatlich sparen?",
    a: "Ideal: 200-300 Euro/Monat. Das reicht, um eine ordentliche Rentenlücke zu schließen. Wenn weniger möglich ist: 100 Euro ist besser als nichts.",
  },
  {
    q: "Sollte ich aggressiv mit 40 anfangen?",
    a: "Ja, mit einer Faustregel: Je älter, desto weniger Zeit für Rückschläge. Nutze Depot + bAV für schnellen Aufbau. ETF-Sparplan für Flexibilität.",
  },
  {
    q: "Kann ich mit 40 noch 500.000 Euro aufbauen?",
    a: "Schwierig, aber machbar. Mit 400-500 Euro/Monat und 7% Rendite: ca. 165.000 Euro in 27 Jahren. Mit bAV + Depot kombiniert: realistisch.",
  },
  {
    q: "Was ist die beste Strategie ab 40?",
    a: "Depot + bAV (wenn vorhanden) für Steuervorteil + schnellen Aufbau. ETF-Sparplan zusätzlich für Flexibilität. Regelmäßig erhöhen, wenn Gehalt steigt.",
  },
  {
    q: "Lohnt sich Altersvorsorge ab 40 noch wirtschaftlich?",
    a: "Absolut. Die Steuervorteil + Arbeitgeberzuschüsse (bAV) machen es trotz kürzerer Laufzeit attraktiv. Psychologisch: Du schließt die Lücke aktiv, statt zu hoffen.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorge ab 40: Ist es noch nicht zu spät?",
    description: "Mit 40 Jahren Altersvorsorge anfangen? Konkrete Zahlen zeigen: Es ist nicht zu spät. 27 Jahre bis zur Rente, 200 Euro pro Monat reichen aus.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-05-01",
    dateModified: "2026-05-01",
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

const BlogAltersvorsorgeAb40 = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorge ab 40: Ist es noch nicht zu spät?"
        description="Mit 40 Jahren Altersvorsorge anfangen? Konkrete Zahlen zeigen: Es ist nicht zu spät. 27 Jahre bis zur Rente, 200 Euro pro Monat reichen aus."
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
                <BreadcrumbPage>Altersvorsorge ab 40</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Altersvorsorge ab 40: Ist es noch nicht zu spät?
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold flex items-center gap-2">
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              Inhaltsverzeichnis
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-sm">
              <Link to="#zu-spaet" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                1. Nein, du bist nicht zu spät
              </Link>
              <Link to="#zeit-vorteil" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                2. Dein geheimer Vorteil: 27 Jahre
              </Link>
              <Link to="#szenarien" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                3. Drei realistische Szenarien
              </Link>
              <Link to="#strategie" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                4. Die beste Strategie ab 40
              </Link>
              <Link to="#catch-up" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                5. Catch-up Strategien
              </Link>
              <Link to="#psychologie" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                6. Psychologie: Warum Handeln besser ist als Hoffen
              </Link>
              <Link to="#faq" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                Häufige Fragen
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-lg">
                Mit 40 Jahren anzufangen ist nicht zu spät. Du hast 27 Jahre bis zur Rente — das ist noch ein großer Vorteil. In diesem Artikel zeigen wir dir mit konkreten Zahlen, wie viel du aufbauen kannst und warum Handeln besser ist als Hoffen.
              </p>
            </section>

            <section id="zu-spaet" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Nein, du bist nicht zu spät</h2>

              <p className="mb-4">
                Das ist die wichtigste Botschaft: Mit 40 Jahren anzufangen ist nicht zu spät. Punkt. Die Psychologie spielt dir einen Streich — du siehst nur die verlorenen 20 Jahre, nicht die 27 Jahre, die noch vor dir liegen.
              </p>

              <div className="bg-primary/10 border-l-4 border-primary p-4">
                <p className="font-semibold mb-2">Die harte Wahrheit:</p>
                <p className="text-sm">200 Euro pro Monat über 27 Jahre mit 7% Rendite = ca. 135.000 Euro Kapital. Das ist NICHT wenig. Das ist ein guter Anfang.</p>
              </div>

              <p className="mt-6">
                Die Menschen, die mit 30 angefangen haben, sind nicht in einer anderen Liga. Sie haben ein paar Jahre Vorsprung — das war's. Du kannst das aufholen, indem du aggressiver sparst.
              </p>
            </section>

            <section id="zeit-vorteil" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. Dein geheimer Vorteil: 27 Jahre Zinseszins</h2>

              <p className="mb-6">
                27 Jahre bis zur Rente mit 67 Jahren. Das ist NICHT kurz. Mit dem Zinseszins-Effekt passiert das Meiste in den letzten 10 Jahren:
              </p>

              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-2">Nach Jahr 7: ca. €22.000</p>
                  <p className="text-sm text-muted-foreground">Die Grundlage ist gebaut.</p>
                </div>

                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-2">Nach Jahr 17: ca. €75.000</p>
                  <p className="text-sm text-muted-foreground">Der Zinseszins arbeitet jetzt für dich.</p>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Nach Jahr 27: ca. €135.000</p>
                  <p className="text-sm text-muted-foreground">Fast 2x so viel wie nach Jahr 17. Das ist der Zinseszins!</p>
                </div>
              </div>

              <p className="mt-6 text-sm">
                Diese Zahlen sind mit 200 Euro/Monat und 7% Rendite gerechnet. Wenn du nur 100 Euro sparst: ca. €67.500. Wenn du 300 Euro sparst: ca. €202.500.
              </p>
            </section>

            <section id="szenarien" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Drei realistische Szenarien</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario A: Bescheiden (€100/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Monatlich: €100</li>
                  <li>Jährlich: €1.200</li>
                  <li>Laufzeit: 27 Jahre (bis 67)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Endergebnis: ca. €67.500</p>
                <p className="text-xs text-muted-foreground mt-2">Mit 4%-Regel: €270/Monat Extra-Rente (plus Staat)</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario B: Standard (€200/Monat) ← EMPFOHLEN</h3>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Monatlich: €200</li>
                  <li>Jährlich: €2.400</li>
                  <li>Laufzeit: 27 Jahre (bis 67)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Endergebnis: ca. €135.000</p>
                <p className="text-xs text-muted-foreground mt-2">Mit 4%-Regel: €540/Monat Extra-Rente (solid!)</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario C: Aggressiv (€300/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                <p className="font-semibold">Situation:</p>
                <ul className="space-y-1">
                  <li>Monatlich: €300</li>
                  <li>Jährlich: €3.600</li>
                  <li>Laufzeit: 27 Jahre (bis 67)</li>
                </ul>
                <p className="font-semibold mt-3 text-primary">Endergebnis: ca. €202.500</p>
                <p className="text-xs text-muted-foreground mt-2">Mit 4%-Regel: €810/Monat Extra-Rente (sehr solid!)</p>
              </div>
            </section>

            <section id="strategie" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Die beste Strategie ab 40</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Priorität 1: bAV (wenn verfügbar)</h3>
              <p className="text-sm mb-4">
                Wenn dein Arbeitgeber betriebliche Altersvorsorge anbietet: MACH DAS. Das ist die beste Entscheidung ab 40. Mit bAV sparst du nicht nur Einkommensteuer, sondern auch Sozialabgaben (ca. 42% zusammen!).
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Priorität 2: Altersvorsorgedepot (ab 2027)</h3>
              <p className="text-sm mb-4">
                Ab Januar 2027: €150–200/Monat ins Depot. Das gibt dir Förderung (€540/Jahr max) + Steuervorteil (€32–84/Monat, je nach Grenzsteuersatz). Das ist dein Fundament.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Priorität 3: ETF-Sparplan (für Flexibilität)</h3>
              <p className="text-sm mb-4">
                €50–100/Monat zusätzlich ins ETF-Sparplan. Das bleibt flexibel (nicht bis 67 gebunden) und gibt dir Optionen, wenn du Geld brauchst.
              </p>

              <div className="bg-primary/5 border-l-4 border-primary p-4 mt-6">
                <p className="font-semibold text-sm mb-2">Optimale Kombination ab 40:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>bAV: €200–300/Monat (wenn möglich) ← PRIORITY</li>
                  <li>Depot: €200/Monat (ab 2027)</li>
                  <li>ETF-Sparplan: €50–100/Monat (Flexibilität)</li>
                  <li><strong>Gesamt: €450–600/Monat</strong></li>
                </ul>
              </div>
            </section>

            <section id="catch-up" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Catch-up Strategien (wenn du mehr brauchst)</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Strategie 1: Erhöhe mit jeder Gehaltserhöhung</h3>
                  <p className="text-sm text-muted-foreground">Wenn du 5% Gehaltserhöhung bekommst: 2% erhöhe deinen Sparplan. Du merkst es nicht, aber deine Rente wird besser.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Strategie 2: Bonus &amp; Prämien nutzen</h3>
                  <p className="text-sm text-muted-foreground">Einmalige Zahlungen (Weihnachtsgeld, Prämien) direkt ins Depot/ETF. Viel Geld auf einmal = höherer Durchschnittskauf.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Strategie 3: Nebeneinnahmen</h3>
                  <p className="text-sm text-muted-foreground">Kleine Nebeneinnahmen (Freelance, Verkauf, etc.)? Alles ins Depot. Das ist zusätzliches Geld ohne dein Haupteinkommen zu reduzieren.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Strategie 4: Passive Einsparungen</h3>
                  <p className="text-sm text-muted-foreground">Versicherungen kündigen, Abos reduzieren. Jeder Euro gespart = in den Sparplan. Kleine Veränderungen addieren sich.</p>
                </div>
              </div>
            </section>

            <section id="psychologie" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">6. Psychologie: Warum Handeln besser ist als Hoffen</h2>

              <p className="mb-6">
                Das Größte Problem mit 40 Jahren ist nicht mathematisch — es ist psychologisch. Du fragst dich: &quot;Warum habe ich nicht früher angefangen?&quot; und &quot;Bringt das noch was?&quot;
              </p>

              <p className="mb-6">
                Die ehrliche Antwort: Ja, es bringt was. Nicht so viel wie mit 25 Jahren angefangen. Aber genug, um einen großen Unterschied zu machen. Und wichtiger: Du schließt die Lücke aktiv, statt zu hoffen, dass die Rente reicht.
              </p>

              <div className="bg-secondary p-4 rounded-lg">
                <p className="font-semibold mb-3">Das mentale Shift:</p>
                <p className="text-sm mb-3">
                  <strong>Alt:</strong> &quot;Ich hätte früher anfangen sollen. Jetzt ist es sowieso zu spät.&quot;
                </p>
                <p className="text-sm">
                  <strong>Neu:</strong> &quot;Ich fange JETZT an. Mit 200 Euro/Monat baue ich €135.000 auf. Das ist real, das ist machbar, das ändert mein Leben.&quot;
                </p>
              </div>

              <p className="mt-6 text-sm">
                Der psychologische Vorteil von Handeln ist größer als der mathematische Vorteil von &quot;früher&quot;. Mit 40 Jahren anfangen bedeutet: Ich bin nicht hilflos. Ich habe noch Zeit. Ich kann etwas tun.
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
              Mit 40 Jahren anfangen ist nicht zu spät. Du hast 27 Jahre bis zur Rente — das ist immer noch ein großer Vorteil. Mit 200 Euro/Monat baust du €135.000 auf. Das ist nicht wenig. Das ist ein solides Fundament für deine Rente. Fang JETZT an.
            </p>
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

export default BlogAltersvorsorgeAb40;
