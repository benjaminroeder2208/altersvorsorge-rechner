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
const PATH = "/blog/altersvorsorgedepot-vs-riester";

const tocItems = [
  { id: "riester-probleme", label: "Was war Riester?" },
  { id: "unterschiede", label: "Die wichtigsten Unterschiede" },
  { id: "foerderung", label: "Förderung im Detail" },
  { id: "beitragsgarantie", label: "Beitragsgarantie" },
  { id: "bestehender-vertrag", label: "Was passiert mit Riester?" },
  { id: "fuer-wen", label: "Für wen lohnt sich was?" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Wird Riester abgeschafft?",
    a: "Nein — zumindest nicht sofort. Bestehende Riester-Verträge laufen weiter, neue Verträge können voraussichtlich noch bis Ende 2026 abgeschlossen werden. Das Altersvorsorgedepot ersetzt Riester als gefördertes Neuprodukt ab 2027 — bestehende Verträge bleiben aber gültig.",
  },
  {
    q: "Kann ich meinen Riester-Vertrag ins Altersvorsorgedepot übertragen?",
    a: "Eine Übertragungsregelung wird im Gesetzgebungsverfahren diskutiert, ist aber noch nicht beschlossen. Es könnte eine Möglichkeit geben, Riester-Kapital förderunschädlich ins neue Depot zu übertragen — Einzelheiten stehen noch aus.",
  },
  {
    q: "Lohnt sich ein neuer Riester-Vertrag noch?",
    a: "In den meisten Fällen nein. Wer heute mit der privaten Altersvorsorge anfängt, sollte auf das Altersvorsorgedepot warten — die Förderstruktur ist attraktiver, die Anlagefreiheit größer. Ausnahme: wer sehr viele Kinder hat und die Kinderzulage über viele Jahre mitnehmen will, könnte noch profitieren — aber auch das sollte individuell geprüft werden.",
  },
  {
    q: "Was ist mit Wohn-Riester?",
    a: "Wohn-Riester — also die Nutzung von Riester-Kapital für selbstgenutztes Wohneigentum — ist ein Sondermodell mit eigenen Regeln. Ob und wie das Altersvorsorgedepot eine ähnliche Wohnförderoption bekommt, ist im aktuellen Gesetzentwurf noch nicht abschließend geregelt. Wer Wohn-Riester aktiv nutzt, sollte die weitere Gesetzgebung abwarten.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorgedepot vs. Riester: Die wichtigsten Unterschiede",
    description: "Riester war die Hoffnung — das Altersvorsorgedepot ist der Neustart. Wir zeigen die wichtigsten Unterschiede, was mit bestehenden Riester-Verträgen passiert und für wen sich was lohnt.",
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
      { "@type": "ListItem", position: 3, name: "Depot vs. Riester", item: `${BASE}${PATH}` },
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
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
    >
      <Calculator className="w-4 h-4" />
      Zum Altersvorsorgedepot Rechner
    </Link>
  </div>
);

const SectionH2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ letterSpacing: "-0.02em" }}>
    {children}
  </h2>
);

const SectionH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg md:text-xl font-semibold mt-8 mb-3">{children}</h3>
);

const BlogVsRiester = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorgedepot vs. Riester: Die wichtigsten Unterschiede"
        description="Riester war die Hoffnung — das Altersvorsorgedepot ist der Neustart. Wir zeigen die wichtigsten Unterschiede, was mit bestehenden Riester-Verträgen passiert und für wen sich was lohnt."
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
              <BreadcrumbItem><BreadcrumbPage>Depot vs. Riester</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-12">
            {/* Sticky TOC desktop */}
            <aside className="hidden lg:block w-56 shrink-0">
              <nav className="sticky top-24 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Inhalt</p>
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>

            <article className="min-w-0 max-w-2xl">
              <AnimatedSection>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                  Altersvorsorgedepot vs. Riester: Die wichtigsten Unterschiede
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 8 Min. Lesezeit</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span>Stand: Gesetzentwurf 2025/2026</span>
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
                    <a key={item.id} href={`#${item.id}`} onClick={() => setTocOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground py-1.5">
                      {item.label}
                    </a>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Intro */}
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Riester war die große Hoffnung. 2002 eingeführt, sollte es die Absenkung des gesetzlichen Rentenniveaus für Millionen Arbeitnehmer ausgleichen. Heute, über 20 Jahre später, ist die Bilanz ernüchternd: hohe Kosten, komplizierte Regeln, enttäuschende Renditen. Viele Verträge liegen still, viele Sparer haben das Vertrauen verloren.</p>
                <p>Jetzt plant die Bundesregierung den Nachfolger: das Altersvorsorgedepot. Es soll vieles besser machen — aber es ist kein simples Riester 2.0. Die Unterschiede sind grundlegend.</p>
                <p>In diesem Artikel erfährst du, was sich wirklich ändert, was das für bestehende Riester-Sparer bedeutet — und wer von welchem Produkt profitiert.</p>
              </div>

              <CtaBlock>Direkt rechnen? Berechne jetzt, was das Altersvorsorgedepot für dich bringen könnte.</CtaBlock>

              {/* Was war Riester */}
              <SectionH2 id="riester-probleme">Was war Riester — und warum hat es nicht funktioniert?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die Riester-Rente wurde 2002 unter Arbeitsminister Walter Riester eingeführt. Die Idee war richtig: Da das gesetzliche Rentenniveau bewusst abgesenkt wurde, sollte der Staat private Vorsorge durch Zulagen und Steuervorteile attraktiv machen.</p>
                <p>In der Praxis scheiterte das Modell an drei strukturellen Problemen:</p>
                <p><strong className="text-foreground">Hohe Kosten.</strong> Versicherungsmantel, Verwaltungsgebühren, Abschlusskosten — viele Riester-Produkte fraßen einen erheblichen Teil der Rendite auf. Verbraucherschützer kritisierten jahrelang, dass die Kosten selten transparent kommuniziert wurden.</p>
                <p><strong className="text-foreground">Komplizierte Zulagenantragstellung.</strong> Wer seine Zulagen nicht aktiv beantragte und jährlich seinen Eigenbeitrag korrekt berechnete, bekam sie nicht — oder musste sie zurückzahlen. Das System überforderte viele Sparer.</p>
                <p><strong className="text-foreground">Die Beitragsgarantie als Renditefalle.</strong> Riester-Anbieter mussten garantieren, dass Sparer zum Rentenbeginn mindestens ihre eingezahlten Beiträge zurückbekommen. Klingt sicher — war aber teuer. Um die Garantie zu erfüllen, musste ein Großteil des Kapitals in renditeschwache Anleihen investiert werden. Wer in einen Riester-Fondsvertrag einzahlte, investierte oft nur einen Bruchteil seines Geldes wirklich am Aktienmarkt.</p>
                <p>Das Ergebnis: Über 16 Millionen Riester-Verträge wurden abgeschlossen — aber Millionen liegen heute still oder wurden beitragsfrei gestellt.</p>
              </div>

              {/* Unterschiede-Tabelle */}
              <SectionH2 id="unterschiede">Die wichtigsten Unterschiede im Überblick</SectionH2>
              <div className="overflow-x-auto -mx-6 px-6 mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[160px]">Kriterium</TableHead>
                      <TableHead className="min-w-[180px]">Riester</TableHead>
                      <TableHead className="min-w-[180px]">Altersvorsorgedepot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Grundzulage</TableCell><TableCell>175 €/Jahr (fix)</TableCell><TableCell>35 % auf bis zu 1.200 € + 20 % auf bis zu 600 €</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Kinderzulage</TableCell><TableCell>300 €/Kind (ab 2008)</TableCell><TableCell>bis zu 300 €/Kind</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Eigenbeitrag für volle Förderung</TableCell><TableCell>4 % des Vorjahresbruttos (mind. 60 €)</TableCell><TableCell>1.800 €/Jahr (150 €/Monat)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Beitragsgarantie</TableCell><TableCell>✅ Ja — 100 %</TableCell><TableCell>❌ Nein</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Anlage in ETFs</TableCell><TableCell>⚠️ Begrenzt</TableCell><TableCell>✅ Voll möglich</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Kostendeckel</TableCell><TableCell>❌ Nein</TableCell><TableCell>✅ Geplant</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Zulagenantrag</TableCell><TableCell>Manuell / via Anbieter</TableCell><TableCell>Automatisch (geplant)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Besteuerung</TableCell><TableCell>Nachgelagert</TableCell><TableCell>Nachgelagert</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Mindesteinzahlung</TableCell><TableCell>60 €/Jahr</TableCell><TableCell>120 €/Jahr</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Flexibilität</TableCell><TableCell>Gebunden bis 60/62</TableCell><TableCell>Gebunden bis 65</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Förderung im Detail */}
              <SectionH2 id="foerderung">Förderung im Detail: Was hat sich geändert?</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Die Förderstruktur ist der wichtigste Unterschied — und hier ist das Altersvorsorgedepot für die meisten Sparer deutlich attraktiver.</p>

              <SectionH3>Riester-Förderung</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Bei Riester gibt es eine <strong className="text-foreground">fixe Grundzulage von 175 € pro Jahr</strong> — unabhängig davon, wie viel du einzahlst. Um die volle Zulage zu bekommen, musst du <strong className="text-foreground">4 % deines Vorjahresbruttoeinkommens</strong> einzahlen (abzüglich der Zulagen). Das klingt einfach, ist aber fehleranfällig: Wer sein Gehalt erhöht hat und den Beitrag nicht anpasst, bekommt die Förderung nur anteilig.
              </p>

              <SectionH3>Altersvorsorgedepot-Förderung</SectionH3>
              <div className="text-base leading-relaxed text-muted-foreground space-y-2">
                <p>Beim Altersvorsorgedepot ist die Förderung <strong className="text-foreground">prozentual auf den Eigenbeitrag</strong> ausgelegt:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong className="text-foreground">35 %</strong> auf die ersten 1.200 € Eigenbeitrag pro Jahr</li>
                  <li><strong className="text-foreground">20 %</strong> auf weitere 600 € Eigenbeitrag (bis 1.800 € gesamt)</li>
                  <li>Kinderzulage: bis zu <strong className="text-foreground">300 € pro Kind</strong></li>
                </ul>
              </div>

              <SectionH3>Konkretes Rechenbeispiel: Wer bekommt mehr?</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Person, 38 Jahre, 42.000 € Brutto/Jahr, ein Kind (geboren 2019):</p>
              <div className="overflow-x-auto -mx-6 px-6 mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]" />
                      <TableHead className="min-w-[140px]">Riester</TableHead>
                      <TableHead className="min-w-[160px]">Altersvorsorgedepot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Erforderlicher Eigenbeitrag</TableCell><TableCell>~1.365 €/Jahr</TableCell><TableCell>1.800 €/Jahr</TableCell></TableRow>
                    <TableRow><TableCell>Grundzulage</TableCell><TableCell>175 €</TableCell><TableCell>540 €</TableCell></TableRow>
                    <TableRow><TableCell>Kinderzulage</TableCell><TableCell>300 €</TableCell><TableCell>300 €</TableCell></TableRow>
                    <TableRow><TableCell>Steuervorteil (geschätzt, ~30 %)</TableCell><TableCell>~350 €</TableCell><TableCell>~530 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">Gesamtförderung</TableCell>
                      <TableCell className="font-bold">~825 €</TableCell>
                      <TableCell className="font-bold text-primary">~1.370 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                Bei sehr ähnlichem Eigenbeitrag bekommt dieselbe Person beim Altersvorsorgedepot rund <strong className="text-foreground">550 € mehr Förderung pro Jahr</strong> — allein durch die attraktivere Grundzulagenstruktur.
              </p>

              {/* Beitragsgarantie */}
              <SectionH2 id="beitragsgarantie">Beitragsgarantie: Sicherheit oder Renditefalle?</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Die 100%-Beitragsgarantie bei Riester klingt auf den ersten Blick beruhigend. In der Praxis war sie einer der Hauptgründe für die schlechte Performance vieler Verträge.</p>

              <SectionH3>Wie die Garantie die Rendite drückt</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Um sicherzustellen, dass zum Rentenbeginn mindestens alle eingezahlten Beiträge vorhanden sind, mussten Riester-Anbieter einen Großteil des Kapitals konservativ anlegen — in Anleihen, Geldmarktpapiere, festverzinsliche Produkte. Bei einem 30-jährigen Sparvertrag konnte das bedeuten, dass nur 20–40 % des Kapitals wirklich am Aktienmarkt investiert war.
              </p>

              <SectionH3>Was das über 30 Jahre kostet</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Ein Vergleich bei 150 €/Monat Eigenbeitrag über 30 Jahre:</p>
              <div className="overflow-x-auto -mx-6 px-6 mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]" />
                      <TableHead className="min-w-[180px]">Riester (~3 % nach Kosten)</TableHead>
                      <TableHead className="min-w-[180px]">Altersvorsorgedepot (~7 %, ETFs)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Eingezahltes Eigenkapital</TableCell><TableCell>54.000 €</TableCell><TableCell>54.000 €</TableCell></TableRow>
                    <TableRow><TableCell>Staatliche Förderung (kumuliert)</TableCell><TableCell>~24.750 €</TableCell><TableCell>~40.500 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">Kapital zum Rentenbeginn (geschätzt)</TableCell>
                      <TableCell className="font-bold">~130.000 €</TableCell>
                      <TableCell className="font-bold text-primary">~255.000 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Der Unterschied von rund <strong className="text-foreground">125.000 €</strong> entsteht nicht durch höhere Einzahlungen — sondern durch die Kombination aus besserer Förderung und freier ETF-Investition ohne Garantiezwang.</p>
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground/70 italic">Hinweis: Die Riester-Rendite ist stark vertragsabhängig. Günstige Riester-Fondssparpläne können besser abschneiden als klassische Versicherungsprodukte.</p>
                </div>
              </div>

              {/* Bestehender Vertrag */}
              <SectionH2 id="bestehender-vertrag">Was passiert mit meinem bestehenden Riester-Vertrag?</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Das ist die Frage, die viele bestehende Riester-Sparer beschäftigt. Die ehrliche Antwort: Es gibt keine Universallösung — es hängt von deinem Vertrag ab.</p>

              <SectionH3>Option 1: Weiterführen</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Wenn dein Vertrag günstig ist (niedrige laufende Kosten, gute Fondsauswahl) und du noch viele Jahre bis zur Rente hast, kann Weiterführen sinnvoll sein. Besonders wenn du bereits viele Jahre eingezahlt hast und die Abschlusskosten längst abgeschrieben sind.
              </p>

              <SectionH3>Option 2: Ruhendstellen</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Du zahlst nichts mehr ein, das bisher angesammelte Kapital bleibt im Vertrag und wird bis zur Rente weiterverzinst. Keine Förderrückzahlung, aber auch keine neue Förderung. Sinnvoll, wenn der Vertrag hohe Weiterzahlungskosten hätte oder du dein Budget lieber ins Altersvorsorgedepot stecken willst.
              </p>

              <SectionH3>Option 3: Kündigen</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Beim Kündigen musst du alle erhaltenen Zulagen und Steuervorteile zurückzahlen — das kann erheblich sein. In den meisten Fällen ist Kündigung die schlechteste Option. Ausnahme: sehr schlechte Verträge mit extremen laufenden Kosten, bei denen Weiterführen langfristig teurer wäre als die Rückzahlung.
              </p>

              <SectionH3>Option 4: Auf Übertragungsregelung warten</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Im Gesetzgebungsverfahren zum Altersvorsorgedepot wird diskutiert, ob eine Übertragung von Riester-Kapital ins neue Depot ermöglicht wird. Eine finale Regelung steht noch aus. Es könnte sich lohnen, abzuwarten bevor du eine Entscheidung triffst.
              </p>

              <div className="mt-6 p-4 bg-secondary rounded-xl">
                <p className="text-sm text-foreground"><strong>Empfehlung:</strong> Lass deinen Vertrag von einer unabhängigen Verbraucherzentrale prüfen, bevor du irgendeine Entscheidung triffst. Eine Kündigung ist in den meisten Fällen nicht der richtige erste Schritt.</p>
              </div>

              <CtaBlock>Berechne jetzt, was das Altersvorsorgedepot ab 2027 für dich bringen könnte.</CtaBlock>

              {/* Für wen */}
              <SectionH2 id="fuer-wen">Für wen lohnt sich was?</SectionH2>

              <SectionH3>Riester lohnt sich noch für:</SectionH3>
              <ul className="list-disc pl-6 space-y-1 text-base leading-relaxed text-muted-foreground">
                <li>Sparer mit <strong className="text-foreground">günstigen Altverträgen</strong> (niedrige Kosten, gute Fondsauswahl), die bereits lange laufen</li>
                <li>Wer <strong className="text-foreground">kurz vor der Rente</strong> ist und den Vertrag nicht mehr lang genug hat, um einen Wechsel zu amortisieren</li>
                <li>Wer <strong className="text-foreground">Wohn-Riester</strong> nutzt und damit eine selbstgenutzte Immobilie finanziert — hier gelten andere Regeln</li>
              </ul>

              <SectionH3>Altersvorsorgedepot lohnt sich für:</SectionH3>
              <ul className="list-disc pl-6 space-y-1 text-base leading-relaxed text-muted-foreground">
                <li>Alle, die <strong className="text-foreground">neu in die private Altersvorsorge einsteigen</strong></li>
                <li>Wer einen <strong className="text-foreground">langen Anlagehorizont</strong> hat (10+ Jahre, besser 20+)</li>
                <li><strong className="text-foreground">Mittlere Einkommen</strong> — die Förderquote ist hier besonders attraktiv</li>
                <li><strong className="text-foreground">Eltern mit Kindern</strong> — Kinderzulage on top</li>
                <li>Wer <strong className="text-foreground">maximale Rendite</strong> will und bereit ist, Marktschwankungen auszusitzen</li>
              </ul>

              <SectionH3>Wer keines von beiden braucht:</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Sehr hohe Einkommen, die ihre Altersvorsorge bereits über andere Wege (bAV, Immobilien, Depot) umfassend abgedeckt haben.
              </p>

              {/* Fazit */}
              <SectionH2 id="fazit">Fazit</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Riester war ein Versuch — ein gut gemeinter, aber schlecht umgesetzter. Das Altersvorsorgedepot ist kein Riester 2.0, sondern ein echter Neustart: einfachere Förderstruktur, keine Beitragsgarantie, volle ETF-Investition, geplanter Kostendeckel.</p>
                <p>Wer neu anfängt, sollte auf das Altersvorsorgedepot warten — es startet voraussichtlich am 1. Januar 2027. Wer bereits Riester hat, sollte seinen Vertrag nüchtern prüfen, nicht überstürzt kündigen und die weiteren Entwicklungen im Gesetzgebungsverfahren beobachten.</p>
              </div>

              <CtaBlock>Jetzt berechnen, was das Altersvorsorgedepot für dich bedeutet.</CtaBlock>

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
                  <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/altersvorsorgedepot-vs-etf-sparplan" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot oder ETF-Sparplan?</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/altersvorsorgedepot-foerderung" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Förderung im Detail</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-16 p-5 bg-secondary rounded-xl">
                <p className="text-xs text-muted-foreground/70 italic leading-relaxed">
                  Alle Angaben basieren auf dem aktuellen Gesetzentwurf zur Reform der privaten Altersvorsorge sowie öffentlich verfügbaren Informationen zur Riester-Rente. Änderungen im Gesetzgebungsverfahren sind möglich. Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar. Für individuelle Entscheidungen zu bestehenden Riester-Verträgen empfehlen wir die Beratung durch eine unabhängige Verbraucherzentrale oder einen zugelassenen Finanzberater.
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

export default BlogVsRiester;
