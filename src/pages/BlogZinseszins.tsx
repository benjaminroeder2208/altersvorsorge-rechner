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
const PATH = "/blog/zinseszins-frueh-starten";

const tocItems = [
  { id: "was-ist", label: "Was ist der Zinseszins-Effekt?" },
  { id: "25-vs-35", label: "Der Unterschied: 25 vs. 35" },
  { id: "aufholen", label: "Was müsste Ben tun?" },
  { id: "avd-effekt", label: "Mit Altersvorsorgedepot" },
  { id: "spaet-starten", label: "Wenn man spät anfängt" },
  { id: "lektion", label: "Die wichtigste Lektion" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Ist 7 % Rendite realistisch?",
    a: "Historisch haben breit gestreute globale Aktienportfolios (z. B. MSCI World ETF) über lange Zeiträume Renditen in diesem Bereich erzielt. Es ist keine Garantie — aber ein plausibler Richtwert für langfristige Planungen. Über kürzere Zeiträume kann die Rendite erheblich schwanken.",
  },
  {
    q: "Was, wenn die Märkte schlecht laufen kurz vor der Rente?",
    a: "Das ist ein reales Risiko, das sogenannte Sequence-of-Returns-Risiko. Wer früh anfängt, hat mehr Zeit, schlechte Phasen auszusitzen. Trotzdem ist es sinnvoll, das Portfolio in den letzten 5–10 Jahren vor der Rente schrittweise defensiver auszurichten.",
  },
  {
    q: "Lohnt sich auch eine Einmalzahlung statt monatlichem Sparen?",
    a: "Ja — eine Einmalzahlung profitiert sofort und vollständig vom Zinseszins. Wer z. B. eine Erbschaft, einen Bonus oder eine Steuerrückerstattung hat, kann diese sinnvoll als Einmaleinzahlung ins Altersvorsorgedepot stecken.",
  },
  {
    q: "Warum nicht einfach erst mit 50 anfangen und dafür mehr einzahlen?",
    a: "Mathematisch funktioniert das — aber es erfordert deutlich höhere monatliche Beiträge. Wer mit 25 statt mit 50 anfängt, braucht für dasselbe Ergebnis weniger als ein Zehntel des monatlichen Beitrags. Zeit ist der einzige Faktor, den Geld nicht ersetzen kann.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Früh starten oder spät starten? Der Zinseszins-Effekt in Zahlen",
    description: "Was bringt es wirklich, früh mit der Altersvorsorge anzufangen? Wir zeigen den Zinseszins-Effekt an konkreten Zahlen — und warum 10 Jahre Unterschied über 100.000 € ausmachen können.",
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
      { "@type": "ListItem", position: 3, name: "Zinseszins-Effekt", item: `${BASE}${PATH}` },
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
      Zum Altersvorsorgedepot Rechner
    </Link>
  </div>
);

const SectionH2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ letterSpacing: "-0.02em" }}>{children}</h2>
);

const BlogZinseszins = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Früh starten oder spät starten? Der Zinseszins-Effekt in Zahlen"
        description="Was bringt es wirklich, früh mit der Altersvorsorge anzufangen? Wir zeigen den Zinseszins-Effekt an konkreten Zahlen — und warum 10 Jahre Unterschied über 100.000 € ausmachen können."
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
              <BreadcrumbItem><BreadcrumbPage>Zinseszins-Effekt</BreadcrumbPage></BreadcrumbItem>
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
                  Früh starten oder spät starten? Der Zinseszins-Effekt in Zahlen
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 7 Min. Lesezeit</span>
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
                <p>"Ich fange nächstes Jahr an." Dieser Satz kostet mehr als die meisten Menschen ahnen. Nicht weil Disziplin fehlt — sondern weil Zeit beim Vermögensaufbau der einzige Faktor ist, den man nicht zurückkaufen kann.</p>
                <p>Der Zinseszins-Effekt ist kein Finanzjargon. Er ist Mathematik. Und seine Wirkung über Jahrzehnte ist so drastisch, dass sie fast unglaublich wirkt — bis man die Zahlen sieht.</p>
              </div>

              <CtaBlock>Direkt rechnen? Berechne jetzt, was monatliches Sparen bis zur Rente ergibt.</CtaBlock>

              {/* Was ist der Zinseszins-Effekt? */}
              <SectionH2 id="was-ist">Was ist der Zinseszins-Effekt?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Beim einfachen Zins wächst nur dein eingezahltes Kapital. Beim Zinseszins wachsen auch die erwirtschafteten Erträge weiter — Jahr für Jahr. Am Anfang ist der Unterschied kaum spürbar. Nach 30 oder 40 Jahren ist er enorm.</p>
                <p>Ein einfaches Beispiel bei 7 % Rendite p.a.:</p>
              </div>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[100px]">Jahr</TableHead>
                      <TableHead className="min-w-[160px]">Einfacher Zins</TableHead>
                      <TableHead className="min-w-[160px]">Zinseszins</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Nach 10 Jahren</TableCell><TableCell>17.000 €</TableCell><TableCell>19.672 €</TableCell></TableRow>
                    <TableRow><TableCell>Nach 20 Jahren</TableCell><TableCell>24.000 €</TableCell><TableCell>38.697 €</TableCell></TableRow>
                    <TableRow><TableCell>Nach 30 Jahren</TableCell><TableCell>31.000 €</TableCell><TableCell>76.123 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Nach 40 Jahren</TableCell><TableCell>38.000 €</TableCell><TableCell className="font-bold text-primary">149.745 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-muted-foreground/60 italic mb-4">Basis: 10.000 € Einmalanlage, keine weiteren Einzahlungen</p>
              <p className="text-base leading-relaxed text-muted-foreground">Nach 40 Jahren hat der Zinseszins fast <strong className="text-foreground">viermal so viel</strong> Kapital erzeugt wie der einfache Zins. Das ist die Kraft, die für dich arbeitet — wenn du früh anfängst.</p>

              {/* 25 vs 35 */}
              <SectionH2 id="25-vs-35">Der Unterschied zwischen 25 und 35</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Schauen wir uns zwei Menschen an. Beide sparen <strong className="text-foreground">150 € pro Monat</strong> bis zum Rentenalter 67, beide erzielen 7 % Rendite p.a.:</p>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]" />
                      <TableHead className="min-w-[160px]">Anna, startet mit 25</TableHead>
                      <TableHead className="min-w-[160px]">Ben, startet mit 35</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Monatlicher Beitrag</TableCell><TableCell>150 €</TableCell><TableCell>150 €</TableCell></TableRow>
                    <TableRow><TableCell>Ansparzeit</TableCell><TableCell>42 Jahre</TableCell><TableCell>32 Jahre</TableCell></TableRow>
                    <TableRow><TableCell>Eingezahltes Eigenkapital</TableCell><TableCell>75.600 €</TableCell><TableCell>57.600 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">Kapital mit 67</TableCell>
                      <TableCell className="font-bold text-primary">~538.000 €</TableCell>
                      <TableCell className="font-bold">~255.000 €</TableCell>
                    </TableRow>
                    <TableRow><TableCell>Unterschied</TableCell><TableCell className="text-primary font-semibold">+283.000 €</TableCell><TableCell>—</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Anna zahlt 18.000 € mehr ein als Ben — aber sie hat am Ende <strong className="text-foreground">283.000 € mehr</strong> auf dem Konto. Der Unterschied kommt nicht von höheren Einzahlungen. Er kommt von 10 Jahren mehr Zinseszins-Wachstum.</p>
                <p>Anders gesagt: Bens 10 Jahre Aufschub kosten ihn 283.000 € — für dieselbe monatliche Sparrate.</p>
              </div>

              {/* Was müsste Ben tun? */}
              <SectionH2 id="aufholen">Was müsste Ben tun, um dasselbe Ergebnis zu erreichen?</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Wenn Ben mit 35 dasselbe Endkapital wie Anna (538.000 €) erreichen will, muss er seinen monatlichen Beitrag drastisch erhöhen:</p>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]" />
                      <TableHead className="min-w-[160px]">Anna (Start mit 25)</TableHead>
                      <TableHead className="min-w-[160px]">Ben (Start mit 35)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Zielkapital mit 67</TableCell><TableCell>538.000 €</TableCell><TableCell>538.000 €</TableCell></TableRow>
                    <TableRow><TableCell>Monatlicher Beitrag nötig</TableCell><TableCell className="font-bold">150 €</TableCell><TableCell className="font-bold">~315 €</TableCell></TableRow>
                    <TableRow><TableCell>Gesamte Eigeneinzahlung</TableCell><TableCell>75.600 €</TableCell><TableCell>120.960 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">Ben müsste mehr als <strong className="text-foreground">doppelt so viel</strong> einzahlen wie Anna — und trotzdem 45.360 € mehr aus eigener Tasche beisteuern. Das sind die echten Kosten des Aufschubs.</p>

              {/* Mit Altersvorsorgedepot */}
              <SectionH2 id="avd-effekt">Mit dem Altersvorsorgedepot: Förderung verstärkt den Effekt</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Beim <Link to="/altersvorsorgedepot" className="text-primary font-medium hover:underline">Altersvorsorgedepot</Link> kommt zur Zinseszins-Wirkung noch die staatliche Förderung dazu — und auch die profitiert vom frühen Start, weil sie über mehr Jahre reinvestiert wird.</p>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]" />
                      <TableHead className="min-w-[180px]">Anna mit Altersvorsorgedepot</TableHead>
                      <TableHead className="min-w-[180px]">Ben mit Altersvorsorgedepot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Monatlicher Eigenbeitrag</TableCell><TableCell>150 €</TableCell><TableCell>150 €</TableCell></TableRow>
                    <TableRow><TableCell>Staatliche Förderung (kumuliert)</TableCell><TableCell>~57.120 €</TableCell><TableCell>~43.520 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">Kapital mit 67</TableCell>
                      <TableCell className="font-bold text-primary">~728.000 €</TableCell>
                      <TableCell className="font-bold">~344.000 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">Die Förderung läuft bei Anna 10 Jahre länger mit — und durch den Zinseszins-Effekt wächst dieser Vorsprung auf fast <strong className="text-foreground">384.000 €</strong> an. Jeder geförderte Euro, der früh investiert wird, ist am Ende deutlich mehr wert als ein später investierter.</p>

              {/* Spät starten */}
              <SectionH2 id="spaet-starten">Was ist, wenn man wirklich erst spät anfangen kann?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Nicht jeder kann mit 25 anfangen. Studium, unsichere Jobsituation, Familienphase — das Leben macht Pläne. Das ist keine Ausrede, das ist Realität.</p>
                <p>Trotzdem gilt: Der beste Zeitpunkt war gestern. Der zweitbeste ist heute.</p>
                <p>Ein Vergleich für späte Starter bei 300 € monatlichem Eigenbeitrag:</p>
              </div>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[100px]">Startalter</TableHead>
                      <TableHead className="min-w-[120px]">Ansparzeit</TableHead>
                      <TableHead className="min-w-[180px]">Kapital mit 67 (7 % p.a.)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>40 Jahre</TableCell><TableCell>27 Jahre</TableCell><TableCell>~305.000 €</TableCell></TableRow>
                    <TableRow><TableCell>45 Jahre</TableCell><TableCell>22 Jahre</TableCell><TableCell>~191.000 €</TableCell></TableRow>
                    <TableRow><TableCell>50 Jahre</TableCell><TableCell>17 Jahre</TableCell><TableCell>~115.000 €</TableCell></TableRow>
                    <TableRow><TableCell>55 Jahre</TableCell><TableCell>12 Jahre</TableCell><TableCell>~63.000 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">Auch wer mit 50 anfängt, kann noch über 100.000 € aufbauen — das entspricht einer monatlichen Zusatzrente von rund 460 € über 18 Jahre. Kein vollständiger Ausgleich, aber ein erheblicher Puffer.</p>

              {/* Die wichtigste Lektion */}
              <SectionH2 id="lektion">Die wichtigste Lektion</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Der Zinseszins-Effekt belohnt keine besonders schlauen Entscheidungen. Er belohnt einen einzigen Faktor: <strong className="text-foreground">früh anfangen</strong>.</p>
                <p>Nicht die perfekte Aktienauswahl. Nicht das optimale Timing. Nicht die höchste Sparrate. Wer früh anfängt und dabei bleibt, schlägt fast immer denjenigen, der später mit mehr Geld einsteigt.</p>
                <p>Das <Link to="/altersvorsorgedepot" className="text-primary font-medium hover:underline">Altersvorsorgedepot</Link> ab 2027 ist dafür das optimale Instrument: staatliche Förderung von Anfang an, volle ETF-Investition, kein Garantiezwang der die Rendite drückt.</p>
              </div>

              <CtaBlock>Berechne jetzt, was dein monatlicher Beitrag bis zur Rente ergibt.</CtaBlock>

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
                  Alle Berechnungen basieren auf vereinfachten Annahmen (Rendite 7 % p.a., keine Inflation, keine Kosten). Tatsächliche Werte können erheblich abweichen. Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
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

export default BlogZinseszins;
