import { useState } from "react";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/blog/altersvorsorge-selbststaendige";

const tocItems = [
  { id: "ausgangslage", label: "Die Ausgangslage" },
  { id: "optionen", label: "Vorsorgeoptionen" },
  { id: "avd-bedeutung", label: "Altersvorsorgedepot für Selbstständige" },
  { id: "strategie", label: "Die optimale Strategie" },
  { id: "was-tun", label: "Was du jetzt tun kannst" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Muss ich als Selbstständiger Rentenversicherung zahlen?",
    a: "Das hängt vom Beruf ab. Einige Berufsgruppen sind pflichtversichert (z. B. Handwerker, Lehrer, Hebammen). Die meisten anderen Selbstständigen sind nicht pflichtversichert — können aber freiwillig einzahlen.",
  },
  {
    q: "Ist Rürup oder ETF-Sparplan besser?",
    a: "Das hängt vom Grenzsteuersatz ab. Bei hohem Einkommen (42 %+) ist Rürup steuerlich sehr attraktiv. Bei niedrigerem Einkommen oder wenn Flexibilität wichtig ist, ist der ETF-Sparplan oft sinnvoller. Viele Selbstständige nutzen beides.",
  },
  {
    q: "Lohnt sich das Altersvorsorgedepot für Selbstständige?",
    a: "Wenn Selbstständige förderberechtigt werden, ja — besonders für alle, die ohnehin langfristig investieren wollen. Die Förderung von bis zu 480 € Grundzulage (ab 2029: 540 €) plus Steuervorteil ist auch für Selbstständige attraktiv. Die finale Regelung steht noch aus.",
  },
  {
    q: "Was ist mit der Künstlersozialkasse (KSK)?",
    a: "Über die KSK versicherte Kreative zahlen nur den halben Rentenversicherungsbeitrag — der andere Teil wird von der KSK übernommen. Das ist eine der günstigsten Formen der gesetzlichen Rentenversicherung für Selbstständige und sollte, wenn möglich, genutzt werden.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorge für Selbstständige: Was wirklich funktioniert",
    description: "Selbstständige haben keine gesetzliche Rente — oder nur eine sehr kleine. Wir zeigen, welche Optionen es gibt, was das Altersvorsorgedepot ab 2027 bringt und wie du die Rentenlücke schließt.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-03-19",
    dateModified: "2026-03-19",
    author: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    isPartOf: { "@type": "WebSite", url: `${BASE}/` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: "Altersvorsorge Selbstständige", item: `${BASE}${PATH}` },
    ],
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

const CtaBlock = ({ children, to = "/" }: { children: React.ReactNode; to?: string }) => (
  <div className="my-10 p-6 md:p-8 bg-primary/5 border border-primary/10 rounded-2xl text-center">
    <p className="text-sm md:text-base text-foreground mb-4 font-medium">{children}</p>
    <Link to={to} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
      <Calculator className="w-4 h-4" />
      {to === "/rentenluecken-rechner" ? "Zum Rentenlückenrechner" : "Zum Altersvorsorgedepot Rechner"}
    </Link>
  </div>
);

const SectionH2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ letterSpacing: "-0.02em" }}>{children}</h2>
);

const SectionH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg md:text-xl font-semibold mt-8 mb-3">{children}</h3>
);

const BlogSelbststaendige = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorge für Selbstständige: Was wirklich funktioniert"
        description="Selbstständige haben keine gesetzliche Rente — oder nur eine sehr kleine. Wir zeigen, welche Optionen es gibt, was das Altersvorsorgedepot ab 2027 bringt und wie du die Rentenlücke schließt."
        path={PATH}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container max-w-5xl mx-auto px-6">
          <Breadcrumb className="mb-8 max-w-2xl">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/blog">Blog</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Altersvorsorge Selbstständige</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-12">
            <aside className="hidden lg:block w-56 shrink-0">
              <nav className="sticky top-24 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Inhalt</p>
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">{item.label}</a>
                ))}
              </nav>
            </aside>

            <article className="min-w-0 max-w-2xl">
              <AnimatedSection>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                  Altersvorsorge für Selbstständige: Was wirklich funktioniert
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 8 Min. Lesezeit</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span>Stand: 2026</span>
                </div>
              </AnimatedSection>

              <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="lg:hidden mb-10">
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-muted-foreground w-full py-3 px-4 bg-secondary rounded-xl">
                  <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
                  Inhaltsverzeichnis
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pt-2 pb-1 bg-secondary rounded-b-xl space-y-1">
                  {tocItems.map((item) => (
                    <a key={item.id} href={`#${item.id}`} onClick={() => setTocOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground py-1.5">{item.label}</a>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Intro */}
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Selbstständige stehen beim Thema Altersvorsorge vor einer besonderen Herausforderung: Keine automatischen Rentenversicherungsbeiträge, keine bAV vom Arbeitgeber, kein Sicherheitsnetz. Wer selbst nicht vorsorgt, hat im Alter oft fast nichts.</p>
                <p>Gleichzeitig gibt es für Selbstständige mehr Optionen als viele denken — und ab 2027 kommt mit dem <Link to="/altersvorsorgedepot" className="text-primary font-medium hover:underline">Altersvorsorgedepot</Link> ein neues, potenziell attraktives Instrument dazu.</p>
              </div>

              <CtaBlock to="/rentenluecken-rechner">Wie groß ist deine Rentenlücke? Jetzt berechnen.</CtaBlock>

              {/* Ausgangslage */}
              <SectionH2 id="ausgangslage">Die Ausgangslage: Warum Selbstständige besonders aufpassen müssen</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die meisten Selbstständigen in Deutschland zahlen nicht in die gesetzliche Rentenversicherung ein — oder nur freiwillig. Das bedeutet: Im Alter gibt es kaum oder gar keine gesetzliche Rente. Die gesamte Altersvorsorge muss privat organisiert werden.</p>
                <p>Dazu kommt: Selbstständige Einkommen schwanken oft stark. In guten Jahren ist Vorsorge möglich, in schlechten Jahren wird sie aufgeschoben. Das Ergebnis: Viele Selbstständige stehen im Alter schlechter da als Angestellte — obwohl sie im Berufsleben oft gut verdient haben.</p>
              </div>

              {/* Optionen */}
              <SectionH2 id="optionen">Die wichtigsten Vorsorgeoptionen für Selbstständige</SectionH2>

              <SectionH3>1. Freiwillige gesetzliche Rentenversicherung</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Selbstständige können freiwillig in die gesetzliche Rentenversicherung einzahlen. Das lohnt sich besonders für:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Wer bereits einige Jahre als Angestellter Beiträge gezahlt hat und die Wartezeit erfüllen will</li>
                  <li>Wer die Absicherung bei Erwerbsminderung schätzt</li>
                  <li>Wer ein sehr sicheres, wenn auch renditeschwaches Fundament will</li>
                </ul>
                <p>Der Nachteil: Die Rendite ist begrenzt, und das Kapital ist im Todesfall vor Rentenbeginn oft verloren.</p>
              </div>

              <SectionH3>2. Rürup-Rente (Basisrente)</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die Rürup-Rente ist speziell für Selbstständige konzipiert und bietet erhebliche Steuervorteile: Beiträge bis zu <strong className="text-foreground">29.344 € pro Jahr</strong> (2026, Alleinstehende) sind als Sonderausgaben absetzbar.</p>
                <p>Für Selbstständige mit hohem Grenzsteuersatz ist das attraktiv — der Staat finanziert einen erheblichen Teil der Einzahlung über die Steuerersparnis. Nachteil: Das Kapital ist bis zur Rente komplett gebunden, nicht vererbbar, nicht beleihbar.</p>
              </div>

              <SectionH3>3. ETF-Sparplan / privates Depot</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Der flexibelste Weg: Selbstständige können ohne Bindung in ETFs investieren. Kein Förderrahmen, keine Begrenzungen, jederzeit verfügbar. Ideal als Ergänzung zu gebundenen Produkten — oder als Hauptinstrument für alle, die maximale Flexibilität brauchen.</p>

              <SectionH3>4. Immobilien</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Viele Selbstständige setzen auf Immobilien als Altersvorsorge — selbstgenutzt oder als Renditeobjekt. Das kann sinnvoll sein, hat aber Klumpenrisiken (zu viel Vermögen in einer Anlage) und hohe Transaktionskosten.</p>

              <SectionH3>5. Altersvorsorgedepot ab 2027</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Hier ist noch nicht abschließend geregelt, welche Selbstständigen förderberechtigt sein werden. Der aktuelle Gesetzentwurf sieht einen breiten Förderberechtigtenkreis vor — die genauen Regelungen für Selbstständige ohne Rentenversicherungspflicht sind noch offen.</p>

              {/* AVD für Selbstständige */}
              <SectionH2 id="avd-bedeutung">Was das Altersvorsorgedepot für Selbstständige bedeuten könnte</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Wenn Selbstständige förderberechtigt werden — was im aktuellen Entwurf diskutiert wird — wäre das eine erhebliche Verbesserung gegenüber dem Status quo:</p>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[140px]" />
                      <TableHead className="min-w-[140px]">ETF-Sparplan (heute)</TableHead>
                      <TableHead className="min-w-[200px]">Altersvorsorgedepot (ab 2027)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Staatliche Förderung</TableCell><TableCell>❌ Nein</TableCell><TableCell>✅ Bis zu 480 € + Steuervorteil (ab 2029: 540 €)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Anlage in ETFs</TableCell><TableCell>✅ Ja</TableCell><TableCell>✅ Ja</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Flexibilität</TableCell><TableCell>✅ Jederzeit</TableCell><TableCell>⚠️ Gebunden bis 65</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Steuer auf Erträge</TableCell><TableCell>Abgeltungsteuer</TableCell><TableCell>Nachgelagert</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">Für Selbstständige, die ohnehin langfristig für die Rente sparen wollen, könnte das Altersvorsorgedepot den ETF-Sparplan in vielen Fällen ersetzen — sofern die Förderung zugänglich wird.</p>

              {/* Strategie */}
              <SectionH2 id="strategie">Die optimale Strategie für Selbstständige</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Es gibt keine Einheitslösung — aber eine bewährte Grundstruktur:</p>
                <p><strong className="text-foreground">Fundament: Mindestabsicherung sicherstellen</strong><br />Freiwillige gesetzliche Rentenversicherung oder Rürup prüfen — besonders für die Erwerbsminderungsabsicherung und steuerliche Optimierung in Jahren mit hohem Einkommen.</p>
                <p><strong className="text-foreground">Wachstum: Kapitalmarkt nutzen</strong><br />ETF-Sparplan oder (ab 2027) Altersvorsorgedepot für den Aufbau von Vermögen mit langfristiger Perspektive.</p>
                <p><strong className="text-foreground">Flexibilität: Liquiditätspuffer halten</strong><br />Selbstständige brauchen mehr Liquiditätsreserven als Angestellte. Nicht alles in gebundene Produkte stecken — ein flexibler ETF-Sparplan als Puffer ist sinnvoll.</p>
              </div>

              <SectionH3>Konkretes Beispiel: Freiberufler, 38 Jahre, 60.000 € Jahreseinkommen</SectionH3>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Baustein</TableHead>
                      <TableHead className="min-w-[140px]">Monatlicher Beitrag</TableHead>
                      <TableHead className="min-w-[200px]">Zweck</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Rürup-Rente</TableCell><TableCell>300 €</TableCell><TableCell>Steueroptimierung, Basisabsicherung</TableCell></TableRow>
                    <TableRow><TableCell>Altersvorsorgedepot (ab 2027)</TableCell><TableCell>150 €</TableCell><TableCell>Staatliche Förderung mitnehmen</TableCell></TableRow>
                    <TableRow><TableCell>ETF-Sparplan</TableCell><TableCell>200 €</TableCell><TableCell>Flexibler Puffer & Wachstum</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Gesamt</TableCell><TableCell className="font-bold text-primary">650 €</TableCell><TableCell className="font-semibold">Diversifizierte Altersvorsorge</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              <CtaBlock>Berechne, wie viel Kapital du bis zur Rente aufbauen kannst.</CtaBlock>

              {/* Was du jetzt tun kannst */}
              <SectionH2 id="was-tun">Was du jetzt tun kannst</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Schritt 1: Rentenlücke realistisch einschätzen.</strong> Als Selbstständiger ist die Lücke oft größer als bei Angestellten — weil kaum gesetzliche Rente kommt. Unser <Link to="/rentenluecken-rechner" className="text-primary font-medium hover:underline">Rentenlückenrechner</Link> gibt dir eine erste Orientierung.</p>
                <p><strong className="text-foreground">Schritt 2: Steuerliche Optimierung prüfen.</strong> Besonders in einkommensstarken Jahren kann die Rürup-Rente Sinn machen — der Steuervorteil finanziert einen Teil der Einzahlung.</p>
                <p><strong className="text-foreground">Schritt 3: Flexibilität nicht vergessen.</strong> Nicht alles in illiquide Produkte stecken. Ein ETF-Sparplan als Puffer ist für Selbstständige oft wichtiger als für Angestellte.</p>
                <p><strong className="text-foreground">Schritt 4: Altersvorsorgedepot im Blick behalten.</strong> Die Förderberechtigungsregeln für Selbstständige werden im Laufe des Gesetzgebungsverfahrens klarer. Es lohnt sich, die Entwicklung zu verfolgen.</p>
              </div>

              {/* FAQ */}
              <SectionH2 id="faq">Häufige Fragen</SectionH2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-sm md:text-base">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Related */}
              <div className="mt-12">
                <p className="text-sm font-semibold mb-4">Weiterführende Artikel</p>
                <div className="space-y-2">
                  <Link to="/blog/betriebliche-altersvorsorge" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Betriebliche Altersvorsorge (bAV) erklärt</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Rentenlücke: Was sie ist und was du tun kannst</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/rentenluecken-rechner" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Rentenlückenrechner</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-16 p-5 bg-secondary rounded-xl">
                <p className="text-xs text-muted-foreground/70 italic leading-relaxed">
                  Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar. Die Förderberechtigungsregeln für Selbstständige beim Altersvorsorgedepot sind noch nicht abschließend geregelt — Änderungen im Gesetzgebungsverfahren sind möglich. Für individuelle Entscheidungen empfehlen wir die Beratung durch einen Steuerberater oder unabhängigen Finanzberater.
                </p>
              </div>
            </article>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default BlogSelbststaendige;
