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
const PATH = "/blog/altersvorsorge-30-jahre";

const tocItems = [
  { id: "zinseszins", label: "Der Zinseszins-Effekt" },
  { id: "szenarien", label: "Drei realistische Szenarien" },
  { id: "depot-vergleich", label: "Depot vs. ohne Förderung" },
  { id: "fehler", label: "Die 3 größten Fehler" },
  { id: "action-plan", label: "Dein Action Plan" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Wie viel muss ich mit 30 Jahren sparen?",
    a: "Das hängt von deiner Rentenlücke ab. Im Durchschnitt schaffen es Menschen mit €100–200/Monat, ihre Lücke zu schließen. Mit unserem Rentenlückenrechner kannst du deine persönliche Zahl berechnen.",
  },
  {
    q: "Ist es mit 30 zu spät für Altersvorsorge?",
    a: "Nein, auf keinen Fall. Mit 30 Jahren hast du noch 37 Jahre bis zur Rente. Das ist genug Zeit, damit der Zinseszins-Effekt voll wirkt. Menschen, die mit 50 Jahren anfangen, bereuen oft, dass sie nicht früher gestartet haben.",
  },
  {
    q: "Wie funktioniert der Zinseszins bei Altersvorsorge?",
    a: "Der Zinseszins bedeutet: Deine Renditen bringen selbst wieder Rendite. Mit 7% p.a. verdoppelt sich dein Kapital etwa alle 10 Jahre. Über 30–40 Jahre ist der Zinseszins dein größter Vorteil.",
  },
  {
    q: "Welches Produkt ist mit 30 Jahren das beste?",
    a: "Ab 2027 ist das Altersvorsorgedepot die beste Wahl (€540/Jahr Förderung). Bis dahin kannst du mit einem ETF-Sparplan starten und dann zum Depot wechseln.",
  },
  {
    q: "Kann ich mit 30 Jahren noch Altersvorsorge aufbauen?",
    a: "Ja, absolut. Mit €150/Monat über 32 Jahre (bis 67) baust du ca. €276.000 auf (inkl. Förderung). Das ist eine solide Zusatzrente.",
  },
  {
    q: "Was ist die beste Altersvorsorge für 30-Jährige?",
    a: "Die beste Altersvorsorge für 30-Jährige ist: Altersvorsorgedepot (ab 2027) + eventuell zusätzlicher ETF-Sparplan für Flexibilität. Wichtig: Regelmäßigkeit schlägt Höhe. €50/Monat ist besser als €500 Monat 1, dann nichts mehr.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorge mit 30 Jahren — Warum früh starten wirklich lohnt",
    description: "Mit 30 Jahren sparen? Ja! Wir zeigen, wie ein 35-Jähriger €276.000 aufbaut — und was es kostet, zu warten. Zinseszins-Effekt erklärt.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-04-19",
    dateModified: "2026-04-19",
    author: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    isPartOf: { "@type": "WebSite", url: `${BASE}/` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: "Altersvorsorge mit 30 Jahren", item: `${BASE}${PATH}` },
    ],
  },
  {
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({"@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a }})),
  },
];

const CtaBlock = ({ children, to = "/" }: { children: React.ReactNode; to?: string }) => (
  <div className="my-10 p-6 md:p-8 bg-primary/5 border border-primary/10 rounded-2xl text-center">
    <p className="text-sm md:text-base text-foreground mb-4 font-medium">{children}</p>
    <Link to={to} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
      <Calculator className="w-4 h-4" />
      {to === "/rentenluecken-rechner" ? "Zum Rentenlückenrechner" : "Berechne jetzt"}
    </Link>
  </div>
);

const SectionH2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ letterSpacing: "-0.02em" }}>{children}</h2>
);

const SectionH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg md:text-xl font-semibold mt-8 mb-3">{children}</h3>
);

const BlogAltersvorsorge30Jahre = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorge mit 30: Warum jetzt sparen die beste Entscheidung ist"
        description="Mit 30 Jahren sparen? Ja! Wir zeigen, wie ein 35-Jähriger €276.000 aufbaut — und was es kostet, zu warten. Zinseszins-Effekt erklärt."
        path={PATH}
        ogTitle="Altersvorsorge mit 30 Jahren — Warum früh starten wirklich lohnt"
        ogDescription="Mit 30 Jahren sparen? Ja! Wir zeigen, wie ein 35-Jähriger €276.000 aufbaut — und was es kostet, zu warten. Zinseszins-Effekt erklärt."
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-24 pb-20">
        <article className="container max-w-2xl mx-auto px-6">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/blog">Blog</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Altersvorsorge mit 30 Jahren</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
              Altersvorsorge mit 30 Jahren — Warum früh starten wirklich lohnt
            </h1>
          </AnimatedSection>

          <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-12 p-4 bg-secondary rounded-lg">
            <CollapsibleTrigger className="text-sm font-semibold">Inhaltsverzeichnis</CollapsibleTrigger>
            <CollapsibleContent>
              <nav className="space-y-2 text-sm mt-4">
                {tocItems.map((item) => (
                  <Link key={item.id} to={`#${item.id}`} onClick={() => setTocOpen(false)} className="block hover:text-primary">
                    → {item.label}
                  </Link>
                ))}
              </nav>
            </CollapsibleContent>
          </Collapsible>

          <div className="prose-custom space-y-8">
            <section>
              <p className="text-lg leading-relaxed">
                Viele denken: "Mit 30 Jahren ist die beste Zeit vorbei. Die anderen haben ja längst angefangen." Das ist ein großer Irrtum. Mit 30 Jahren hast du noch <strong>37 Jahre bis zur Rente</strong> — und diese Zeit ist dein größter Vorteil. In diesem Artikel zeigen wir dir konkrete Zahlen, wie viel Kapital du aufbauen kannst, wenn du jetzt anfängst. Spoiler: Es ist deutlich mehr, als die meisten Menschen glauben.
              </p>
            </section>

            <section>
              <SectionH2 id="zinseszins">1. Der Zinseszins-Effekt — Dein geheimer Vorteil</SectionH2>
              <SectionH3>Was ist Zinseszins?</SectionH3>
              <p>Zinseszins bedeutet: Deine Renditen bringen selbst wieder Rendite. Wenn du heute €100 sparst und diese €5 Rendite bringt, dann bringt diese €5 nächstes Jahr selbst wieder €0,35 Rendite. Klingt klein? Über 30 Jahre ist das exponentiell.</p>

              <SectionH3>Ein konkretes Beispiel</SectionH3>
              <p>Stellt euch vor, du bist 35 Jahre alt und sparst monatlich <strong>€150</strong> in ein Altersvorsorgedepot. Die durchschnittliche Rendite eines breit gestreuten ETF-Portfolios liegt langfristig bei <strong>7% pro Jahr</strong>. Du möchtest mit 67 Jahren in Rente gehen — das sind <strong>32 Jahre Sparzeit</strong>.</p>

              <div className="bg-primary/5 border-l-4 border-primary p-4 my-6">
                <p className="font-semibold mb-2">Ergebnis:</p>
                <ul className="space-y-1 text-sm">
                  <li>✓ <strong>Dein Kapital nach 32 Jahren: €276.000</strong></li>
                  <li>✓ Davon staatliche Förderung: €17.280</li>
                  <li>✓ Dein Eigenkapital: €48.000</li>
                  <li>✓ Renditen: €210.720</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">Das bedeutet: <strong>Deine Renditen machen mehr als 75% deines Endkapitals aus.</strong> Der Zinseszins arbeitet für dich.</p>
              </div>

              <SectionH3>Was passiert, wenn du 5 Jahre wartest?</SectionH3>
              <p>Statt mit 35 mit 40 Jahren anfängst:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Nur noch 27 Jahre Sparzeit</li>
                <li>Kapital nach 27 Jahren: <strong>€155.000</strong> (statt €276.000)</li>
                <li><strong>Verlust durch Verzögerung: €121.000</strong></li>
              </ul>
            </section>

            <section>
              <SectionH2 id="szenarien">2. Drei realistische Szenarien für dein Alter</SectionH2>
              <p>Jetzt wird es konkret. Hier sind drei Szenarien basierend auf deinem Alter heute:</p>

              <div className="space-y-6 my-8">
                <div className="bg-secondary p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3">Szenario A: Du bist 25 Jahre alt</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Monatlicher Sparbetrag: €150</li>
                    <li>• Sparzeit: 42 Jahre (bis 67)</li>
                    <li className="font-semibold text-primary">• Kapital nach 42 Jahren: €410.000</li>
                    <li>• Davon Förderung: €25.200</li>
                  </ul>
                </div>

                <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3">Szenario B: Du bist 35 Jahre alt (unser Standard)</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Monatlicher Sparbetrag: €150</li>
                    <li>• Sparzeit: 32 Jahre (bis 67)</li>
                    <li className="font-semibold text-primary">• Kapital nach 32 Jahren: €276.000</li>
                    <li>• Davon Förderung: €17.280</li>
                  </ul>
                </div>

                <div className="bg-secondary p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3">Szenario C: Du bist 45 Jahre alt</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Monatlicher Sparbetrag: €150</li>
                    <li>• Sparzeit: 22 Jahre (bis 67)</li>
                    <li className="font-semibold text-primary">• Kapital nach 22 Jahren: €130.000</li>
                    <li>• Davon Förderung: €10.560</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <SectionH2 id="depot-vergleich">3. Altersvorsorgedepot vs. Depot ohne Förderung</SectionH2>
              <p>Jetzt stellt sich die Frage: Sollte ich das neue Altersvorsorgedepot nutzen oder einen normalen ETF-Sparplan ohne Förderung?</p>

              <div className="bg-primary/5 border-l-4 border-primary p-4 my-6">
                <p className="font-semibold mb-2">Der Vergleich:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Depot mit Förderung: €276k (mit €17.280 Förderung)</li>
                  <li>• Depot ohne Förderung: €212k (ohne Förderung)</li>
                  <li className="font-semibold text-primary">• Differenz: €64.000</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3"><strong>Was ist besser?</strong> Die €540/Jahr Förderung ist so wertvoll, dass sie die höheren Kosten des Depots mehr als ausgleicht. Der Staat zahlt dir quasi €17.280 geschenkt — wenn du das Geld bis 67 Jahren liegen lässt.</p>
              </div>
            </section>

            <section>
              <SectionH2 id="fehler">4. Die 3 größten Fehler bei Altersvorsorge</SectionH2>
              <p>Jetzt zeigen wir dir, woran die meisten Menschen scheitern:</p>

              <SectionH3>Fehler 1: "Ich bin noch jung, ich fang später an"</SectionH3>
              <p>Das ist der tödliche Fehler. Wie wir oben gesehen haben: Jedes Jahr Verzögerung kostet dich ca. €20.000 Kapital. Mit 35 Jahren hast du keine Zeit mehr für "später". Die beste Zeit zum Sparen ist JETZT.</p>

              <SectionH3>Fehler 2: "Ich muss perfekt sparen"</SectionH3>
              <p>Viele denken: "Wenn ich nicht €500/Monat sparen kann, dann macht es keinen Sinn." Das ist falsch. €50/Monat über 32 Jahre bringt dir immerhin noch €46.000. €100/Monat bringt dir €92.000. €150/Monat bringt dir €138.000 (plus €17.280 Förderung = €155.280).</p>

              <SectionH3>Fehler 3: "Der Markt ist gerade schlecht, ich warte auf bessere Zeiten"</SectionH3>
              <p>Das ist das Timing-Spiel. Menschen sagen: "Die Zinsen sind zu hoch / die Börse ist zu teuer / es gibt bald einen Crash." Und sie warten. Und warten. Und verpassen Jahre. Zeit schlägt Timing. Lieber mit einem mittelmäßigen Zeitpunkt starten als gar nicht.</p>
            </section>

            <section>
              <SectionH2 id="action-plan">5. Dein Action Plan — 5 konkrete Schritte</SectionH2>
              <p>Okay, jetzt wird es praktisch. Hier sind deine 5 Schritte zum Start:</p>

              <SectionH3>Schritt 1: Definiere dein Ziel</SectionH3>
              <p>Wie viel Rente brauchst du monatlich? Nehmen wir an, du willst €3.000/Monat haben. Die gesetzliche Rente bringt dir wahrscheinlich €2.000. Das heißt, du brauchst €1.000/Monat aus deiner privaten Vorsorge.</p>
              <CtaBlock to="/rentenluecken-rechner">👉 Berechne deine Rentenlücke</CtaBlock>

              <SectionH3>Schritt 2: Festige deinen Sparbetrag</SectionH3>
              <p>Die Frage ist nicht "Wieviel ist perfekt?" sondern "Wieviel ist realistisch?" Gute Anhaltspunkte: €50–100/Monat (Einstieg), €150–200/Monat (Durchschnitt), €300–500/Monat (ambitioniert).</p>

              <SectionH3>Schritt 3: Wähle dein Produkt</SectionH3>
              <p>Ab <strong>01. Januar 2027</strong> startet das Altersvorsorgedepot. Bis dahin könntest du bereits einen ETF-Sparplan starten. Sobald das Depot live geht, wechselst du hin.</p>

              <SectionH3>Schritt 4: Automatisiere die Sparpläne</SectionH3>
              <p>Nicht "Ich spare, wenn ich Zeit habe", sondern: Einrichtung einer Standing Order. Jeden 1. des Monats wird €150 automatisch von deinem Konto abgebucht und in den Sparplan fließt.</p>

              <SectionH3>Schritt 5: Überprüfe jährlich</SectionH3>
              <p>Einmal im Jahr (z.B. zum Jahrestag) schaust du: Wie viel Kapital habe ich? Sollte ich mehr sparen? Ändert sich meine Situation?</p>
            </section>

            <section className="bg-secondary/50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Fazit: Mit 30 Jahren ist es NICHT zu spät</h3>
              <p>Mit 30 Jahren hast du noch <strong>37 Jahre bis zur Rente</strong>. Das ist nicht "zu spät", das ist perfekt. Die meisten Menschen, die mit 50 Jahren anfangen, bereuen, dass sie nicht mit 30 angefangen haben. Das Gute: Du musst nicht perfekt sein. €50/Monat ist besser als €0. Und die beste Zeit, einen Baum zu pflanzen, war vor 20 Jahren. Die zweitbeste Zeit ist heute.</p>
            </section>

            <section id="faq">
              <SectionH2>Häufige Fragen</SectionH2>
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-sm font-medium">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          <BlogDisclaimer mitRechnung={true} />

          <div className="mt-16 p-8 bg-primary/10 border border-primary/20 rounded-2xl text-center">
            <h3 className="text-lg font-semibold mb-3">Bereit zu sparen?</h3>
            <p className="text-sm text-muted-foreground mb-6">Nutze unseren Altersvorsorgedepot Rechner, um dein persönliches Szenario zu berechnen.</p>
            <CtaBlock to="/">👉 Zum Rechner</CtaBlock>
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  );
};

export default BlogAltersvorsorge30Jahre;
