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
const PATH = "/blog/riester-kuendigen";

const tocItems = [
  { id: "was-passiert", label: "Was passiert bei Kündigung?" },
  { id: "alternativen", label: "Die vier Alternativen" },
  { id: "wann-sinnvoll", label: "Wann Kündigung sinnvoll ist" },
  { id: "vergleich", label: "Riester vs. Altersvorsorgedepot" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Muss ich Zulagen wirklich komplett zurückzahlen?",
    a: "Ja — bei einer schädlichen Verwendung (also Kündigung) werden alle erhaltenen Zulagen und Steuervorteile zurückgefordert. Das Geld geht an die Zentrale Zulagenstelle für Altersvermögen (ZfA) zurück. Es wird direkt vom Auszahlungsbetrag einbehalten. Bei einem Vertrag mit 10 Jahren Zulagen können das schnell 1.750–3.500 € sein.",
  },
  {
    q: "Kann ich Riester-Kapital ins Altersvorsorgedepot übertragen?",
    a: "Das wird derzeit im Gesetzgebungsverfahren diskutiert. Der aktuelle Entwurf sieht eine Möglichkeit zur Übertragung von Riester-Kapital in das neue Altersvorsorgedepot vor — ohne Förderrückzahlung. Ob und in welcher Form das kommt, ist aber noch nicht final beschlossen. Am besten abwarten und den Vertrag vorerst ruhend stellen.",
  },
  {
    q: "Was ist besser: Ruhendstellen oder kündigen?",
    a: "In den allermeisten Fällen ist Ruhendstellen die bessere Wahl. Du zahlst keine neuen Beiträge, behältst aber alle bisherigen Zulagen und Steuervorteile. Das vorhandene Kapital wächst weiter (wenn auch langsam bei klassischen Verträgen). Eine Kündigung sollte wirklich nur der letzte Ausweg sein.",
  },
  {
    q: "Lohnt sich ein Anbieterwechsel?",
    a: "Ja — wenn dein aktueller Vertrag hohe laufende Kosten hat (über 1 % p.a.) und du noch mindestens 15 Jahre bis zur Rente hast. Du kannst dein Riester-Kapital zu einem günstigeren Anbieter übertragen lassen (z. B. einem Riester-Fondssparplan). Die Zulagen bleiben dabei vollständig erhalten. Achte auf die Wechselkosten des alten Anbieters.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Riester kündigen: Wann es sich lohnt und was du wirklich verlierst",
    description: "Kündigen klingt verlockend — kostet aber fast immer mehr als es bringt. Wir zeigen die vier Alternativen und wann eine Kündigung trotzdem sinnvoll ist.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-03-21",
    dateModified: "2026-03-21",
    author: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    isPartOf: { "@type": "WebSite", url: `${BASE}/` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: "Riester kündigen", item: `${BASE}${PATH}` },
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

const SectionH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg md:text-xl font-semibold mt-8 mb-3">{children}</h3>
);

const BlogRiesterKuendigen = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Riester kündigen: Wann es sich lohnt und was du wirklich verlierst"
        description="Kündigen klingt verlockend — kostet aber fast immer mehr als es bringt. Wir zeigen die vier Alternativen und wann eine Kündigung trotzdem sinnvoll ist."
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
              <BreadcrumbItem><BreadcrumbPage>Riester kündigen</BreadcrumbPage></BreadcrumbItem>
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
                  Riester kündigen: Wann es sich lohnt und was du wirklich verlierst
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
                <p>Du hast einen Riester-Vertrag der seit Jahren stillliegt. Die Rendite enttäuscht, die Kosten fressen die Förderung auf — und jetzt kommt das Altersvorsorgedepot. Kündigen und neu anfangen?</p>
                <p>So verständlich der Gedanke ist: Eine Riester-Kündigung ist fast immer die <strong className="text-foreground">teuerste aller Optionen</strong>. In diesem Artikel zeigen wir dir, was eine Kündigung wirklich kostet, welche Alternativen du hast — und wann es trotzdem sinnvoll sein kann.</p>
              </div>

              <CtaBlock>Berechne jetzt, was das Altersvorsorgedepot für dich bringt.</CtaBlock>

              {/* Was passiert bei Kündigung? */}
              <SectionH2 id="was-passiert">Was passiert, wenn du kündigst?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Eine Riester-Kündigung ist im Fachjargon eine <strong className="text-foreground">„schädliche Verwendung"</strong>. Das klingt nicht nur unangenehm — es ist es auch. Denn du verlierst nicht nur die Zulagen, sondern zahlst effektiv drauf:</p>
              </div>

              <SectionH3>1. Alle Zulagen müssen zurück</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Jede Grundzulage (175 €/Jahr) und Kinderzulage (300 €/Kind/Jahr) die du je erhalten hast, wird zurückgefordert — an die Zentrale Zulagenstelle für Altersvermögen (ZfA), nicht an den Anbieter. Das Geld wird direkt von deinem Auszahlungsbetrag einbehalten.</p>

              <SectionH3>2. Steuervorteile werden rückabgewickelt</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Hast du deine Riester-Beiträge als Sonderausgaben abgesetzt, fordert das Finanzamt den Steuervorteil zurück. Je nach Einkommen und Laufzeit können das mehrere tausend Euro sein.</p>

              <SectionH3>3. Abschlusskosten sind weg</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Bei klassischen Riester-Versicherungen wurden die Abschluss- und Vertriebskosten in den ersten Jahren von deinen Beiträgen abgezogen. Dieses Geld ist bei einer Kündigung unwiederbringlich verloren — unabhängig davon, wie du dich entscheidest.</p>

              <SectionH3>Beispielrechnung</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Riester-Vertrag seit 10 Jahren, keine Kinder, 175 € Grundzulage/Jahr:</p>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[260px]">Position</TableHead>
                      <TableHead className="min-w-[120px] text-right">Betrag</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Angespartes Kapital (inkl. Zulagen)</TableCell><TableCell className="text-right">~12.000 €</TableCell></TableRow>
                    <TableRow><TableCell>Rückzahlung Zulagen (10 × 175 €)</TableCell><TableCell className="text-right text-destructive">−1.750 €</TableCell></TableRow>
                    <TableRow><TableCell>Rückzahlung Steuervorteile (geschätzt)</TableCell><TableCell className="text-right text-destructive">−1.200 €</TableCell></TableRow>
                    <TableRow><TableCell>Abschlusskosten (bereits verloren)</TableCell><TableCell className="text-right text-muted-foreground">—</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Du bekommst ausgezahlt</TableCell><TableCell className="text-right font-bold">~9.050 €</TableCell></TableRow>
                    <TableRow className="bg-destructive/5"><TableCell className="font-semibold">Eigene Einzahlungen über 10 Jahre</TableCell><TableCell className="text-right font-bold">~10.740 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground"><strong className="text-foreground">Ergebnis:</strong> Du bekommst weniger ausgezahlt, als du selbst eingezahlt hast. Die Zulagen und Steuervorteile sind komplett weg — und die Abschlusskosten sowieso.</p>

              {/* Alternativen */}
              <SectionH2 id="alternativen">Die vier Alternativen zur Kündigung</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Bevor du kündigst, prüfe diese vier Optionen — mindestens eine davon ist fast immer besser als eine Kündigung:</p>
              </div>

              <SectionH3>1. Weiterführen</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Sinnvoll wenn: du einen <strong className="text-foreground">günstigen Fondsvertrag</strong> hast, noch viele Jahre bis zur Rente bleiben und die Abschlusskosten längst amortisiert sind. Die Zulagen fließen weiter, der Steuervorteil bleibt — und über die Jahre summiert sich der Zinseszins.</p>
                <p>Besonders bei fondsgebundenen Riester-Verträgen mit niedrigen laufenden Kosten (unter 0,5 % p.a.) kann sich das Weiterführen lohnen.</p>
              </div>

              <SectionH3>2. Ruhendstellen (Beitragsfreistellung)</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Du zahlst keine neuen Beiträge mehr, das vorhandene Kapital bleibt aber im Vertrag und wächst weiter. Die bisherigen Zulagen und Steuervorteile bleiben <strong className="text-foreground">vollständig erhalten</strong> — keine Rückzahlung nötig.</p>
                <p>Der Nachteil: Du erhältst keine neuen Zulagen mehr. Aber das ist ein geringer Preis verglichen mit den Kosten einer Kündigung. Du kannst das frei gewordene Geld ab 2027 ins Altersvorsorgedepot investieren.</p>
              </div>

              <SectionH3>3. Anbieterwechsel</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Du kannst dein Riester-Kapital zu einem <strong className="text-foreground">günstigeren Anbieter</strong> übertragen lassen — zum Beispiel von einer teuren klassischen Versicherung zu einem Riester-Fondssparplan. Das gesamte Kapital inklusive aller Zulagen wird dabei übertragen.</p>
                <p>Achte auf mögliche Wechselgebühren des alten Anbieters (oft 50–150 €) und vergleiche die laufenden Kosten sorgfältig.</p>
              </div>

              <SectionH3>4. Auf die Übertragungsregelung warten</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Im aktuellen Gesetzgebungsverfahren zum Altersvorsorgedepot wird diskutiert, ob <strong className="text-foreground">bestehendes Riester-Kapital ohne Förderrückzahlung</strong> in das neue Depot übertragen werden kann. Das wäre die optimale Lösung — du behältst alle Zulagen und investierst gleichzeitig in das flexiblere neue Produkt.</p>
                <p>Ob und in welcher Form diese Regelung kommt, ist noch nicht final beschlossen. Gerade deshalb: Nicht voreilig kündigen, sondern abwarten.</p>
              </div>

              {/* Wann Kündigung sinnvoll */}
              <SectionH2 id="wann-sinnvoll">Wann eine Kündigung trotzdem sinnvoll sein kann</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>In wenigen Ausnahmefällen kann eine Kündigung die bessere Wahl sein:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Sehr hohe laufende Kosten</strong> (über 1,5 % p.a.) — wenn die Kosten die Rendite dauerhaft auffressen und ein Anbieterwechsel nicht möglich ist</li>
                  <li><strong className="text-foreground">Extrem schlechte Fondsauswahl</strong> — bei manchen alten Verträgen sind nur teure, schlecht performende Fonds wählbar</li>
                  <li><strong className="text-foreground">Kurze Restlaufzeit unter 5 Jahren</strong> — wenn bis zur Rente wenig Zeit bleibt und der Vertrag kaum noch Ertrag bringt</li>
                  <li><strong className="text-foreground">Sehr geringes Kapital unter 1.000 €</strong> — die Förderrückzahlung ist überschaubar und der Verwaltungsaufwand steht in keinem Verhältnis</li>
                </ul>
                <p><strong className="text-foreground">Wichtig:</strong> Lass dich vor einer Kündigung immer von einer unabhängigen Verbraucherzentrale beraten. Die Beratung kostet wenig und kann dir tausende Euro sparen.</p>
              </div>

              {/* Vergleich */}
              <SectionH2 id="vergleich">Riester vs. Altersvorsorgedepot — was jetzt tun?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die spannendste Frage ist nicht „Riester kündigen oder nicht?" — sondern: <strong className="text-foreground">Wie kombinierst du Riester und Altersvorsorgedepot optimal?</strong></p>
              </div>

              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[160px]">Kriterium</TableHead>
                      <TableHead className="min-w-[160px]">Riester weiterführen</TableHead>
                      <TableHead className="min-w-[180px]">Ruhendstellen + Depot ab 2027</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Bisherige Zulagen</TableCell><TableCell>✅ Bleiben erhalten</TableCell><TableCell>✅ Bleiben erhalten</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Neue Förderung</TableCell><TableCell>175 € Grundzulage/Jahr</TableCell><TableCell>Bis zu 540 €/Jahr im Depot</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Anlagefreiheit</TableCell><TableCell>⚠️ Eingeschränkt</TableCell><TableCell>✅ Volle ETF-Auswahl</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Garantiezwang</TableCell><TableCell>Ja (Beitragserhalt)</TableCell><TableCell>❌ Nein (mehr Rendite möglich)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Kosten</TableCell><TableCell>Abhängig vom Vertrag</TableCell><TableCell>Geplanter Kostendeckel</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Flexibilität</TableCell><TableCell>Gering</TableCell><TableCell>✅ Hoch</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              <SectionH3>Konkretes Szenario</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Person, 35 Jahre alt, 150 €/Monat verfügbar für Altersvorsorge, Riester-Vertrag seit 5 Jahren:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Option A:</strong> Riester weiterführen mit 150 €/Monat → Kapital mit 67: ca. 95.000 € (durch Beitragsgarantie stark begrenzt)</li>
                  <li><strong className="text-foreground">Option B:</strong> Riester ruhendstellen + 150 €/Monat ins Altersvorsorgedepot (7 % p.a.) → Riester-Altkapital ca. 12.000 € + Depot ca. 255.000 € = <strong className="text-foreground">ca. 267.000 €</strong></li>
                </ul>
                <p>Die Kombination aus ruhendem Riester und Altersvorsorgedepot bringt in diesem Beispiel deutlich mehr — weil das Depot ohne Garantiezwang in ETFs investieren kann und höhere Renditen erwirtschaftet.</p>
              </div>

              {/* Fazit */}
              <SectionH2 id="fazit">Fazit</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Riester kündigen klingt verlockend — kostet aber fast immer mehr als es bringt. Die Rückzahlung von Zulagen und Steuervorteilen macht die Kündigung zur <strong className="text-foreground">teuersten aller Optionen</strong>.</p>
                <p>Die klügere Frage ist nicht „kündigen oder nicht?" sondern: <strong className="text-foreground">Wie kombiniere ich Riester und Altersvorsorgedepot optimal?</strong> In den meisten Fällen heißt die Antwort: Riester ruhendstellen, neue Beiträge ab 2027 ins Altersvorsorgedepot — und auf die geplante Übertragungsregelung hoffen.</p>
              </div>

              <CtaBlock>Berechne jetzt, was das Altersvorsorgedepot ab 2027 für dich bringen könnte.</CtaBlock>

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
                  <Link to="/blog/altersvorsorgedepot-vs-riester" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot vs. Riester: Die wichtigsten Unterschiede</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
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
                  Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar. Für individuelle Riester-Entscheidungen empfehlen wir die Beratung durch eine unabhängige Verbraucherzentrale oder einen zugelassenen Finanzberater.
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

export default BlogRiesterKuendigen;
