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
const PATH = "/blog/wie-viel-rente-reicht-aus";

const faqItems = [
  {
    q: "Wie viel Rente braucht man durchschnittlich?",
    a: "Die Faustregel: 80% des letzten Nettoeinkommens. Bei 2.500 Euro netto = 2.000 Euro im Alter. Realistisch reichen oft 1.500-2.000 Euro für ein gutes Leben.",
  },
  {
    q: "Ist 2.500 Euro pro Monat im Alter genug?",
    a: "Ja, für die meisten Menschen in Deutschland. Die durchschnittliche Rente liegt bei 1.200-1.500 Euro. Mit 2.500 Euro lebst du komfortabel — wenn du sparsam bist.",
  },
  {
    q: "Wie berechne ich meine persönliche Rente?",
    a: "Schritt 1: Dein aktuelles Nettoeinkommen. Schritt 2: Multipliziere mit 0,8 (für 80%). Schritt 3: Das ist dein Ziel. Nutze unseren Rentenlückenrechner für exakte Zahlen.",
  },
  {
    q: "Was ist die 4%-Regel?",
    a: "Mit 4% Jahresentzugsquote kannst du dein Kapital 25+ Jahre lang aufbrauchen. Beispiel: 300.000 Euro Kapital x 4% = 12.000 Euro pro Jahr = 1.000 Euro pro Monat.",
  },
  {
    q: "Kann ich mit weniger als 1.500 Euro pro Monat leben?",
    a: "Ja, viele Menschen tun das. Es hängt von deiner Region, deinem Lebensstil und deinen Ausgaben ab. Nutze unsere Budget-Beispiele, um deine Situation zu berechnen.",
  },
  {
    q: "Was ist, wenn ich länger als 85 Jahre lebe?",
    a: "Das ist möglich und berücksichtigt werden sollte. Daher ist es klug, mehr zu sparen als nur bis 85. Mit Depot + ETF-Sparplan hast du Flexibilität und Wachstum bis ins hohe Alter.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Wie viel Rente reicht aus? Die ehrliche Antwort mit Zahlen",
    description: "Wie viel Rente brauchst du? Wir zeigen, wie viel realistisch ist, was du sparst und wie du deine Rentenlücke berechnest.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-04-27",
    dateModified: "2026-04-27",
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

const BlogWieVielRenteReichtAus = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Wie viel Rente reicht aus? Die ehrliche Antwort mit Zahlen"
        description="Wie viel Rente brauchst du? Wir zeigen, wie viel realistisch ist, was du sparst und wie du deine Rentenlücke berechnest."
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
                <BreadcrumbPage>Wie viel Rente reicht aus?</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Wie viel Rente reicht aus? Die ehrliche Antwort mit Zahlen
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold flex items-center gap-2">
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
              Inhaltsverzeichnis
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-sm">
              <Link to="#was-ist-genug" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                1. Was ist &quot;genug&quot; Rente?
              </Link>
              <Link to="#zahlen" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                2. Die Zahlen: 3 realistische Szenarien
              </Link>
              <Link to="#staat" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                3. Was du vom Staat bekommst
              </Link>
              <Link to="#4-prozent-regel" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                4. Die 4%-Regel
              </Link>
              <Link to="#faktoren" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                5. Faktoren, die beeinflussen, wie viel du brauchst
              </Link>
              <Link to="#ehrliche-antwort" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                6. Die ehrliche Antwort
              </Link>
              <Link to="#faq" onClick={() => setTocOpen(false)} className="block hover:text-primary">
                Häufige Fragen
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-lg">
                Die Frage &quot;Wie viel Rente reicht aus?&quot; ist nicht einfach zu beantworten. Aber sie ist die wichtigste Frage, wenn es um Altersvorsorge geht. In diesem Artikel zeigen wir dir mit konkreten Zahlen, wie viel du wirklich brauchst — und was das für deinen Sparplan bedeutet.
              </p>
            </section>

            <section id="was-ist-genug" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Was ist &quot;genug&quot; Rente? (Definition)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Die 80%-Regel</h3>
              <p className="mb-4">
                Die klassische Faustregel sagt: Du brauchst 80% deines letzten Nettoeinkommens im Alter. Wenn du 2.500 Euro netto verdienst, brauchst du 2.000 Euro im Alter. Klingt plausibel — aber ist es realistisch?
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Die realistische Antwort: 50-70%</h3>
              <p className="mb-4">
                In der Praxis reichen vielen Menschen 50-70% ihres letzten Einkommens. Warum? Weil im Alter viele Ausgaben wegfallen: keine Berufskleider mehr, kein Weg zur Arbeit, keine Rentenversicherung sparen. Die psychologische Komponente zählt auch — viele Menschen sind mit weniger zufrieden, wenn sie Zeit für Familie, Hobbys und Reisen haben.
              </p>

              <div className="bg-primary/5 border-l-4 border-primary p-4">
                <p className="font-semibold mb-2">Die Wahrheit:</p>
                <p className="text-sm">&quot;Genug&quot; ist sehr persönlich. Aber du kannst es berechnen — und dann planen. Das ist das Wichtigste.</p>
              </div>
            </section>

            <section id="zahlen" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. Die Zahlen: 3 realistische Szenarien</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario A: Bescheiden (€1.500/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Budget-Breakdown:</p>
                <ul className="space-y-1">
                  <li>Wohnen (abbezahlt): €400</li>
                  <li>Essen &amp; Haushalt: €300</li>
                  <li>Versicherungen &amp; Nebenkosten: €250</li>
                  <li>Freizeit &amp; Hobbys: €250</li>
                  <li>Reisen &amp; Besuch: €200</li>
                  <li>Notfallfonds &amp; Kleines: €100</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2 border-t border-border/40 pt-2">Für: Sparsame Menschen, kleine Wohnung, minimale Reisen. Leben ist komfortabel, aber fokussiert.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario B: Komfortabel (€2.500/Monat) — EMPFOHLEN</h3>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-4 space-y-2 text-sm">
                <p className="font-semibold">Budget-Breakdown:</p>
                <ul className="space-y-1">
                  <li>Wohnen (abbezahlt): €600</li>
                  <li>Essen &amp; Haushalt: €450</li>
                  <li>Versicherungen &amp; Nebenkosten: €300</li>
                  <li>Freizeit &amp; Hobbys: €400</li>
                  <li>Reisen &amp; Besuch: €500</li>
                  <li>Notfallfonds &amp; Kleines: €250</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2 border-t border-border/40 pt-2">Für: Die meisten Menschen. Gutes Wohnen, regelmäßige Reisen, Qualität statt Quantität.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Szenario C: Luxus (€4.000+/Monat)</h3>
              <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                <p className="font-semibold">Budget-Breakdown:</p>
                <ul className="space-y-1">
                  <li>Wohnen (zentral, größer): €1.000</li>
                  <li>Essen &amp; Haushalt (hochwertig): €700</li>
                  <li>Versicherungen &amp; Nebenkosten: €400</li>
                  <li>Freizeit &amp; Hobbys: €800</li>
                  <li>Reisen &amp; Besuch: €800</li>
                  <li>Notfallfonds &amp; Kleines: €300</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2 border-t border-border/40 pt-2">Für: Menschen, die ihre Karriere maximiert haben. Häufige Reisen, gute Restaurants, Luxus ohne Sorgen.</p>
              </div>
            </section>

            <section id="staat" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Was du vom Staat bekommst (realistisch)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Die durchschnittliche gesetzliche Rente</h3>
              <div className="bg-secondary p-4 rounded-lg mb-6 space-y-2 text-sm">
                <p className="font-semibold">Nach 40+ Jahren Erwerbstätigkeit:</p>
                <ul className="space-y-1">
                  <li>Durch&#173;schnittliches Einkommen: ca. €1.200–1.500/Monat</li>
                  <li>Hohes Einkommen (top 20%): ca. €2.000–2.500/Monat</li>
                  <li>Sehr hohes Einkommen: kann bis €3.500+ gehen (aber selten)</li>
                </ul>
              </div>

              <p className="mb-4">
                Die wichtigste Erkenntnis: Die meisten Menschen bekommen vom Staat nicht mehr als €1.500/Monat. Das bedeutet: Die Lücke zu €2.500 Komfort = €1.000/Monat, die du selbst sparen musst.
              </p>
            </section>

            <section id="4-prozent-regel" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Die 4%-Regel (Wie viel Kapital brauchst du?)</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Was ist die 4%-Regel?</h3>
              <p className="mb-4">
                Die 4%-Regel besagt: Mit 4% jährlicher Entnahme kannst du dein Kapital über 25+ Jahre aufbrauchen. Beispiel: 300.000 Euro Kapital x 4% pro Jahr = 12.000 Euro pro Jahr = 1.000 Euro pro Monat.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Konkrete Beispiele</h3>
              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Lücke: €500/Monat</p>
                  <p className="text-sm">€500 x 12 Monate = €6.000/Jahr ÷ 0,04 = €150.000 Kapital nötig</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Lücke: €1.000/Monat (TYPISCH)</p>
                  <p className="text-sm">€1.000 x 12 Monate = €12.000/Jahr ÷ 0,04 = €300.000 Kapital nötig</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Lücke: €1.500/Monat</p>
                  <p className="text-sm">€1.500 x 12 Monate = €18.000/Jahr ÷ 0,04 = €450.000 Kapital nötig</p>
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                Mit unseren Rechnern (ETF-Sparplan, Altersvorsorgedepot) kannst du genau berechnen, wie viel du sparen musst, um diese Kapitalmengen zu erreichen.
              </p>
            </section>

            <section id="faktoren" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Faktoren, die beeinflussen, wie viel du brauchst</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Lebensstil</h3>
                  <p className="text-sm text-muted-foreground">Reisst du 3x pro Jahr in den Urlaub? Oder alle 10 Jahre einmal? Das macht €500–1.000/Monat Unterschied.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Gesundheit</h3>
                  <p className="text-sm text-muted-foreground">Zahnersatz, Brillen, Pflege im Alter: Rechne mit €200–300/Monat extra, wenn du älter wirst.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Familie</h3>
                  <p className="text-sm text-muted-foreground">Musst du Enkel unterstützen? Kindern helfen? Das kann €200–500/Monat kosten.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Region</h3>
                  <p className="text-sm text-muted-foreground">München: €2.500+ für Komfort. Mecklenburg-Vorpommern: €1.500 reicht locker. Der Unterschied ist real.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Wie lange du lebst</h3>
                  <p className="text-sm text-muted-foreground">Rechne mit 85+ Jahren. Das sind 20+ Jahre Rente. Lieber sparen wie für 90+ Jahre.</p>
                </div>
              </div>
            </section>

            <section id="ehrliche-antwort" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">6. Die ehrliche Antwort</h2>

              <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6">
                <p className="font-semibold mb-2">&quot;Genug&quot; ist subjektiv. Aber:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>€1.500/Monat: Du schaffst es. Nicht luxuriös, aber OK.</li>
                  <li>€2.000–2.500/Monat: Das ist das Ziel für die meisten.</li>
                  <li>€3.000+/Monat: Du lebst sehr komfortabel.</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Action Plan: 3 Schritte</h3>
              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Schritt 1: Definiere dein Ziel</p>
                  <p className="text-sm text-muted-foreground">Wie viel willst du im Alter pro Monat haben? €1.500? €2.500? €3.500?</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Schritt 2: Berechne deine Lücke</p>
                  <p className="text-sm text-muted-foreground">Ziel minus gesetzliche Rente = deine Lücke. Nutze unseren Rentenlückenrechner.</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-1">Schritt 3: Sparen starten</p>
                  <p className="text-sm text-muted-foreground">Mit ETF-Sparplan oder Altersvorsorgedepot. Je früher, desto besser.</p>
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
              &quot;Wie viel Rente reicht aus?&quot; ist die falsche Frage. Die richtige Frage ist: &quot;Wie viel brauchst DU?&quot; Und die kannst du beantworten — mit den Zahlen in diesem Artikel und unserem Rentenlückenrechner. Dann ist sparen nicht mehr Angst, sondern Plan.
            </p>
          </div>

          {/* RELATED_ARTICLES_START */}
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold mb-4 text-foreground">📚 Verwandte Artikel</h3>
            <div className="space-y-2">
              <Link to="/blog/wie-viel-geld-braucht-man-im-alter" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Wie viel Geld braucht man im Alter?</span>
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
              <Link to="/blog/rentenlucke-mit-30-40-50" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                <span>Rentenlücke mit 30, 40, 50 Jahren: Was ist noch möglich?</span>
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

export default BlogWieVielRenteReichtAus;
