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
const PATH = "/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst";

const tocItems = [
  { id: "was-ist", label: "Was ist die Rentenlücke?" },
  { id: "wie-gross", label: "Wie groß ist die Lücke?" },
  { id: "warum-nicht-besser", label: "Warum wird es nicht besser?" },
  { id: "drei-wege", label: "Die drei Wege" },
  { id: "avd-antwort", label: "Das Altersvorsorgedepot als Antwort" },
  { id: "frueh-starten", label: "Früh starten macht den Unterschied" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Wie berechne ich meine persönliche Rentenlücke?",
    a: "Eine erste Orientierung gibt die jährliche Renteninformation, die du von der Deutschen Rentenversicherung bekommst. Sie zeigt, wie hoch deine Rente bei aktuellem Verlauf wäre. Ziehe davon deinen aktuellen Nettobedarf ab — die Differenz ist deine ungefähre Lücke. Unser Rechner hilft dir, die nötige Zusatzrente zu simulieren.",
  },
  {
    q: "Ab wann lohnt sich private Vorsorge noch?",
    a: "Grundsätzlich immer. Auch wer mit 50 anfängt, hat noch 17 Jahre Kapitalmarktwachstum vor sich — plus staatliche Förderung. Die monatlichen Beiträge müssen höher sein als bei einem frühen Start, aber das Ergebnis ist immer noch deutlich besser als nichts.",
  },
  {
    q: "Was ist, wenn ich Teilzeit arbeite oder Lücken im Lebenslauf habe?",
    a: "Dann ist die Rentenlücke in der Regel größer, weil weniger Rentenpunkte gesammelt werden. Gleichzeitig sind Teilzeitbeschäftigte und Personen mit Erwerbsunterbrechungen oft besonders auf private Vorsorge angewiesen. Das Altersvorsorgedepot ist auch für diese Gruppe zugänglich — der Mindestbeitrag liegt bei nur 120 € pro Jahr.",
  },
  {
    q: "Reicht das Altersvorsorgedepot allein?",
    a: "Das hängt von der Lückengröße und dem verfügbaren Budget ab. Für viele wird es ein zentraler Baustein sein — aber keine Komplettlösung. Wer eine große Lücke schließen will, sollte alle drei Säulen nutzen: gesetzliche Rente optimieren, bAV prüfen, privat vorsorgen.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Rentenlücke: Was sie ist, wie groß sie wirklich ist — und was du tun kannst",
    description: "Die gesetzliche Rente reicht für die meisten nicht. Wir zeigen konkret, wie groß die Rentenlücke ist — und wie du sie mit dem Altersvorsorgedepot ab 2027 schließen kannst.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-03-15",
    dateModified: "2026-03-15",
    author: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    isPartOf: { "@type": "WebSite", url: `${BASE}/` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: "Rentenlücke", item: `${BASE}${PATH}` },
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

const CtaBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="my-10 p-6 md:p-8 bg-primary/5 border border-primary/10 rounded-2xl text-center">
    <p className="text-sm md:text-base text-foreground mb-4 font-medium">{children}</p>
    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
      <Calculator className="w-4 h-4" />
      Zum Altersvorsorgedepot Rechner
    </Link>
  </div>
);

const SectionH2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ letterSpacing: "-0.02em" }}>{children}</h2>
);

const SectionH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg md:text-xl font-semibold mt-8 mb-3">{children}</h3>
);

const BlogRentenluecke = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Rentenlücke: Was sie ist, wie groß sie wirklich ist — und was du tun kannst"
        description="Die gesetzliche Rente reicht für die meisten nicht. Wir zeigen konkret, wie groß die Rentenlücke ist — und wie du sie mit dem Altersvorsorgedepot ab 2027 schließen kannst."
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
              <BreadcrumbItem><BreadcrumbPage>Rentenlücke</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-12">
            {/* Sticky TOC desktop */}
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
                  Rentenlücke: Was sie ist, wie groß sie wirklich ist — und was du jetzt tun kannst
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 8 Min. Lesezeit</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span>Stand: 2026</span>
                </div>
              </AnimatedSection>

              {/* Mobile TOC */}
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
                <p>Die gesetzliche Rente wird für die meisten Menschen nicht reichen. Das ist keine Panikmache — das ist Mathematik. Die Frage ist nicht ob eine Lücke entsteht, sondern wie groß sie bei dir ist und was du dagegen tun kannst.</p>
                <p>In diesem Artikel bekommst du konkrete Zahlen, ehrliche Einordnung und einen klaren Plan — ohne Alarmismus, aber ohne Schönfärberei.</p>
              </div>

              <CtaBlock>Willst du direkt rechnen? Berechne jetzt deine mögliche Zusatzrente.</CtaBlock>

              {/* Was ist die Rentenlücke? */}
              <SectionH2 id="was-ist">Was ist die Rentenlücke?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die Rentenlücke ist die Differenz zwischen dem, was du im Ruhestand von der gesetzlichen Rente bekommst — und dem, was du zum Leben brauchst.</p>
                <p>Faustregel: Die gesetzliche Rente ersetzt etwa <strong className="text-foreground">48–50 % deines letzten Bruttogehalts</strong>. Netto, nach Abzug von Kranken- und Pflegeversicherungsbeiträgen auf die Rente, landet du oft bei 40–45 % deines letzten Nettoeinkommens.</p>
                <p>Das Problem: Deine Ausgaben sinken im Ruhestand kaum. Miete, Lebensmittel, Strom — die laufen weiter. Dazu kommen oft höhere Gesundheitskosten. Wer sein Leben mit 3.000 € netto finanziert hat, kommt mit 1.300 € Rente nicht weit.</p>
              </div>

              {/* Wie groß ist die Lücke? */}
              <SectionH2 id="wie-gross">Wie groß ist die Lücke — konkret in Zahlen?</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Schauen wir uns zwei realistische Szenarien an.</p>

              <SectionH3>Beispiel 1: Berufseinsteiger, 28 Jahre, 3.000 € brutto</SectionH3>
              <div className="overflow-x-auto -mx-6 px-6 mb-6">
                <Table>
                  <TableHeader><TableRow><TableHead className="min-w-[260px]">Position</TableHead><TableHead className="min-w-[130px] text-right">Betrag/Monat</TableHead></TableRow></TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Letztes Nettoeinkommen (geschätzt, mit 67)</TableCell><TableCell className="text-right">~2.200 €</TableCell></TableRow>
                    <TableRow><TableCell>Erwartete gesetzliche Rente</TableCell><TableCell className="text-right">~1.050 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Rentenlücke</TableCell><TableCell className="text-right font-bold text-primary">~1.150 €/Monat</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              <SectionH3>Beispiel 2: Berufstätige, 42 Jahre, 4.500 € brutto</SectionH3>
              <div className="overflow-x-auto -mx-6 px-6 mb-6">
                <Table>
                  <TableHeader><TableRow><TableHead className="min-w-[260px]">Position</TableHead><TableHead className="min-w-[130px] text-right">Betrag/Monat</TableHead></TableRow></TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Letztes Nettoeinkommen (geschätzt, mit 67)</TableCell><TableCell className="text-right">~3.100 €</TableCell></TableRow>
                    <TableRow><TableCell>Erwartete gesetzliche Rente</TableCell><TableCell className="text-right">~1.500 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Rentenlücke</TableCell><TableCell className="text-right font-bold text-primary">~1.600 €/Monat</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Eine monatliche Lücke von <strong className="text-foreground">800 bis 1.600 €</strong> ist also keine Ausnahme — sie ist der Normalfall für die meisten Vollzeitbeschäftigten in Deutschland.</p>
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm font-semibold text-foreground mb-1">Kurze Erklärung: Was sind Rentenpunkte?</p>
                  <p className="text-sm text-muted-foreground">Die gesetzliche Rente wird über Entgeltpunkte berechnet. Wer ein Jahr lang genau den Durchschnittslohn verdient, sammelt einen Punkt. Ein Punkt entspricht aktuell etwa 39 € monatlicher Rente. Wer 40 Jahre mit Durchschnittslohn gearbeitet hat, bekommt also rund 1.560 € brutto — vor Abzügen.</p>
                </div>
              </div>

              {/* Warum wird es nicht besser? */}
              <SectionH2 id="warum-nicht-besser">Warum wird es nicht besser?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Drei strukturelle Gründe sprechen dafür, dass das Rentenniveau langfristig unter Druck bleibt:</p>
                <p><strong className="text-foreground">Demografischer Wandel.</strong> Immer mehr Rentner stehen immer weniger Einzahlern gegenüber. 1960 finanzierten sechs Erwerbstätige einen Rentner. Heute sind es drei. In 20 Jahren werden es noch weniger sein.</p>
                <p><strong className="text-foreground">Sinkendes Rentenniveau.</strong> Das gesetzliche Rentenniveau — also das Verhältnis von Durchschnittsrente zu Durchschnittslohn — ist in den letzten Jahrzehnten schrittweise gesunken und soll laut aktuellen Projektionen weiter sinken.</p>
                <p><strong className="text-foreground">Inflation.</strong> Selbst eine nominell stabile Rente verliert über 20–25 Rentenjahre erheblich an Kaufkraft. Was heute 1.500 € wert ist, kauft in 20 Jahren bei 2 % Inflation nur noch Waren und Dienstleistungen im Wert von heute rund 1.000 €.</p>
                <p>Das bedeutet nicht, dass das System kollabiert. Aber es bedeutet: Wer ausschließlich auf die gesetzliche Rente setzt, geht ein erhebliches Risiko ein.</p>
              </div>

              {/* Die drei Wege */}
              <SectionH2 id="drei-wege">Die drei Wege, die Lücke zu schließen</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-2">Es gibt keine Wunderlösung — aber drei sinnvolle Hebel:</p>

              <SectionH3>1. Gesetzliche Rente optimieren</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Wer länger einzahlt, bekommt mehr. Freiwillige Zusatzbeiträge sind möglich, ebenso das Hinauszögern des Renteneintritts. Das allein reicht meist nicht — aber es hilft.</p>

              <SectionH3>2. Betriebliche Altersvorsorge (bAV)</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Über den Arbeitgeber kannst du steuerbegünstigt für die Rente vorsorgen. Viele Arbeitgeber zahlen einen Zuschuss dazu. Das ist oft der günstigste erste Schritt — weil du hier Steuern und Sozialabgaben sparst.
                <span className="text-xs text-muted-foreground/60 ml-1">(Mehr dazu demnächst im Artikel zur betrieblichen Altersvorsorge.)</span>
              </p>

              <SectionH3>3. Private Altersvorsorge</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Der flexibelste Weg — und ab 2027 mit dem Altersvorsorgedepot deutlich attraktiver als bisher. Du entscheidest selbst, wie viel du einzahlst, und der Staat fördert dich dabei.</p>

              <div className="mt-6 p-4 bg-secondary rounded-xl">
                <p className="text-sm text-foreground"><strong>Kernbotschaft:</strong> Wer nur auf die gesetzliche Rente baut, verlässt sich auf ein System, das strukturell unter Druck steht. Die Kombination aus allen drei Säulen ist der solideste Weg.</p>
              </div>

              {/* Das Altersvorsorgedepot als Antwort */}
              <SectionH2 id="avd-antwort">Das Altersvorsorgedepot als Antwort</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Nehmen wir das Beispiel von oben: Eine Lücke von <strong className="text-foreground">1.150 € pro Monat</strong>. Wie viel Kapital bräuchtest du dafür — und wie viel müsstest du monatlich zurücklegen?</p>
                <p>Um 1.150 € monatlich von 67 bis 85 auszuzahlen, brauchst du zum Rentenbeginn ein Kapital von rund <strong className="text-foreground">248.000 €</strong> (bei vereinfachter Entnahmerechnung ohne Verzinsung).</p>
                <p>Wie viel Eigenbeitrag brauchst du dafür — mit und ohne Förderung?</p>
              </div>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]" />
                      <TableHead className="min-w-[150px]">Mit Altersvorsorgedepot</TableHead>
                      <TableHead className="min-w-[150px]">Ohne Förderung</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Zielkapital</TableCell><TableCell>248.000 €</TableCell><TableCell>248.000 €</TableCell></TableRow>
                    <TableRow><TableCell>Anlagehorizont</TableCell><TableCell>39 Jahre (ab 28)</TableCell><TableCell>39 Jahre</TableCell></TableRow>
                    <TableRow><TableCell>Angenommene Rendite</TableCell><TableCell>7 % p.a.</TableCell><TableCell>7 % p.a.</TableCell></TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">Benötigter monatlicher Eigenbeitrag</TableCell>
                      <TableCell className="font-bold text-primary">~95 €</TableCell>
                      <TableCell className="font-bold">~125 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Der Unterschied: Dank staatlicher Förderung brauchst du rund <strong className="text-foreground">30 € weniger pro Monat</strong> für dasselbe Ziel — über 39 Jahre gesehen ein gesparter Eigenbeitrag von über <strong className="text-foreground">14.000 €</strong>.</p>
                <p>Oder anders gedacht: Mit denselben 125 € monatlich erreichst du mit dem Altersvorsorgedepot ein deutlich höheres Endkapital als ohne Förderung.</p>
              </div>

              <CtaBlock>Berechne jetzt, wie viel Kapital du bis zur Rente aufbauen kannst — direkt im Rechner.</CtaBlock>

              {/* Früh starten */}
              <SectionH2 id="frueh-starten">Früh starten macht den Unterschied</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Der mächtigste Hebel bei der Altersvorsorge ist nicht die Höhe des Beitrags — es ist der Zeitpunkt des Starts. Der Grund ist der Zinseszins-Effekt: Renditen werden selbst wieder verzinst, und das über Jahrzehnte.</p>
                <p>Ein konkreter Vergleich bei angenommener Rendite von 7 % p.a.:</p>
              </div>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Startalter</TableHead>
                      <TableHead>Monatlicher Beitrag</TableHead>
                      <TableHead className="text-right">Kapital mit 67</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>25 Jahre</TableCell><TableCell>100 €</TableCell><TableCell className="text-right font-semibold text-primary">~264.000 €</TableCell></TableRow>
                    <TableRow><TableCell>35 Jahre</TableCell><TableCell>100 €</TableCell><TableCell className="text-right font-semibold">~122.000 €</TableCell></TableRow>
                    <TableRow><TableCell>45 Jahre</TableCell><TableCell>100 €</TableCell><TableCell className="text-right font-semibold">~52.000 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Wer mit 25 statt mit 35 anfängt, hat am Ende mehr als doppelt so viel — bei gleichem monatlichem Beitrag. Wer mit 25 statt mit 45 anfängt, hat fünfmal so viel.</p>
                <p><strong className="text-foreground">Aber:</strong> Wer diese Zahlen liest und schon 40 oder 45 ist, sollte sich nicht entmutigen lassen. Auch 20 Jahre staatlich gefördertes Sparen machen einen erheblichen Unterschied. Besser jetzt anfangen als nie.</p>
              </div>

              {/* Fazit */}
              <SectionH2 id="fazit">Fazit</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die Rentenlücke ist real. Für die meisten Vollzeitbeschäftigten in Deutschland liegt sie zwischen 800 und 1.600 € pro Monat. Das ist lösbar — aber nur, wenn man rechtzeitig handelt.</p>
                <p>Das Altersvorsorgedepot bietet ab 2027 eine der attraktivsten staatlich geförderten Möglichkeiten, diese Lücke zu schließen. Je früher du anfängst, desto weniger musst du monatlich einzahlen — und desto mehr arbeitet der Zinseszins für dich.</p>
              </div>

              <CtaBlock>Jetzt berechnen, wie viel monatliche Zusatzrente für dich möglich ist.</CtaBlock>

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
                  <Link to="/blog/rentenlucke-mit-30-40-50" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Rentenlücke mit 30, 40 oder 50</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/rentenluecken-rechner" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Rentenlückenrechner</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-16 p-5 bg-secondary rounded-xl">
                <p className="text-xs text-muted-foreground/70 italic leading-relaxed">
                  Alle Angaben basieren auf dem aktuellen Gesetzentwurf zur Reform der privaten Altersvorsorge sowie vereinfachten Rentenberechnungen. Änderungen im Gesetzgebungsverfahren sind möglich. Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
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

export default BlogRentenluecke;
