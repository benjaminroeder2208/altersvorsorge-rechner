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
const PATH = "/blog/altersvorsorgedepot-vs-etf-sparplan";

const tocItems = [
  { id: "gemeinsamkeiten", label: "Was haben beide gemeinsam?" },
  { id: "unterschiede", label: "Die entscheidenden Unterschiede" },
  { id: "foerderbonus", label: "Der Förderbonus in Zahlen" },
  { id: "flexibilitaet", label: "Flexibilitätsvorteil ETF-Sparplan" },
  { id: "entscheidungshilfe", label: "Entscheidungshilfe" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Kann ich Altersvorsorgedepot und ETF-Sparplan gleichzeitig haben?",
    a: "Ja, absolut. Die beiden Produkte schließen sich nicht aus. Viele werden sinnvollerweise beides parallel nutzen — das Depot für die geförderte Altersvorsorge, den Sparplan für flexible Ziele.",
  },
  {
    q: "Was ist steuerlich günstiger?",
    a: "Das hängt von deinem Steuersatz im Alter ab. Das Altersvorsorgedepot besteuert erst in der Auszahlungsphase — wenn dein Einkommen meist niedriger ist als im Berufsleben. Beim ETF-Sparplan fällt die Abgeltungsteuer (25 %) auf Gewinne an. In den meisten Szenarien ist die nachgelagerte Besteuerung günstiger — aber das ist individuell verschieden.",
  },
  {
    q: "Lohnt sich das Depot auch bei hohem Einkommen?",
    a: "Ja, auch bei hohen Einkommen lohnt sich die Förderung. Der Steuervorteil durch den Sonderausgabenabzug fällt sogar höher aus. Allerdings ist die Förderquote relativ zum Gesamtvermögen bei sehr hohen Einkommen kleiner — wer 10.000 € im Monat verdient, für den sind 540 € Grundzulage weniger transformativ als für jemanden mit 3.000 € Monatsgehalt.",
  },
  {
    q: "Was passiert mit meinem bestehenden ETF-Sparplan, wenn das Depot kommt?",
    a: "Nichts. Bestehende ETF-Sparpläne laufen einfach weiter. Du kannst parallel das neue Altersvorsorgedepot eröffnen — es gibt keine Pflicht und keinen Zwang zur Umschichtung.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorgedepot oder ETF-Sparplan? So triffst du die richtige Entscheidung",
    description: "Beide investieren in ETFs — aber nur einer wird staatlich gefördert. Wir zeigen den konkreten Unterschied in Zahlen und helfen dir, die richtige Wahl zu treffen.",
    url: `${BASE}${PATH}`,
    datePublished: "2025-06-01",
    dateModified: "2025-06-01",
    author: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    isPartOf: { "@type": "WebSite", url: `${BASE}/` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: "Altersvorsorgedepot vs. ETF-Sparplan", item: `${BASE}${PATH}` },
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

/* ── Flowchart component ── */
const DecisionFlowchart = () => (
  <div className="my-8 p-6 bg-secondary rounded-2xl overflow-x-auto">
    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-5">Entscheidungs-Flowchart</p>
    <div className="flex flex-col items-center min-w-[320px]">
      {/* Question 1 */}
      <div className="px-5 py-3 bg-primary/10 border border-primary/20 rounded-xl text-sm font-medium text-center max-w-xs">
        Ist dein Ziel langfristige Altersvorsorge (10+ Jahre)?
      </div>
      <div className="flex items-stretch mt-0">
        <div className="flex flex-col items-center">
          <div className="w-px h-6 bg-border" />
          <span className="text-xs font-semibold text-primary px-2">Ja</span>
          <div className="w-px h-6 bg-border" />
        </div>
        <div className="w-32 md:w-48" />
        <div className="flex flex-col items-center">
          <div className="w-px h-6 bg-border" />
          <span className="text-xs font-semibold text-muted-foreground px-2">Nein</span>
          <div className="w-px h-6 bg-border" />
        </div>
      </div>
      <div className="flex gap-4 md:gap-8">
        {/* Left branch */}
        <div className="flex flex-col items-center">
          <div className="px-4 py-3 bg-primary/10 border border-primary/20 rounded-xl text-sm font-medium text-center max-w-[200px]">
            Brauchst du das Geld vor 65?
          </div>
          <div className="flex items-stretch mt-0">
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-border" />
              <span className="text-xs font-semibold text-muted-foreground px-1">Nein</span>
              <div className="w-px h-6 bg-border" />
            </div>
            <div className="w-12 md:w-20" />
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-border" />
              <span className="text-xs font-semibold text-primary px-1">Ja</span>
              <div className="w-px h-6 bg-border" />
            </div>
          </div>
          <div className="flex gap-3 md:gap-6">
            <div className="px-3 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-semibold text-center max-w-[130px]">
              Altersvorsorge­depot
            </div>
            <div className="px-3 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-semibold text-center max-w-[130px]">
              Kombination: Depot + ETF
            </div>
          </div>
        </div>
        {/* Right branch */}
        <div className="flex flex-col items-center">
          <div className="px-3 py-2.5 bg-foreground text-background rounded-xl text-xs font-semibold text-center max-w-[130px]">
            ETF-Sparplan
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BlogVsEtf = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorgedepot oder ETF-Sparplan? So triffst du die richtige Entscheidung"
        description="Beide investieren in ETFs — aber nur einer wird staatlich gefördert. Wir zeigen den konkreten Unterschied in Zahlen und helfen dir, die richtige Wahl zu treffen."
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
              <BreadcrumbItem><BreadcrumbPage>Depot vs. ETF-Sparplan</BreadcrumbPage></BreadcrumbItem>
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
                  Altersvorsorgedepot oder ETF-Sparplan? So triffst du die richtige Entscheidung
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 7 Min. Lesezeit</span>
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
                <p>Beide investieren in ETFs. Beide profitieren vom Zinseszins. Beide sind keine Garantieprodukte. Also warum nicht einfach den ETF-Sparplan nehmen — den kennt man, der ist flexibel, der funktioniert?</p>
                <p>Die Antwort ist nicht für jeden gleich. Für manche ist der ETF-Sparplan tatsächlich die bessere Wahl. Für viele andere lässt die Kombination aus staatlicher Förderung und steuerlichem Vorteil das Altersvorsorgedepot klar vorne liegen.</p>
                <p>In diesem Artikel erfährst du, worin die beiden Optionen sich wirklich unterscheiden — und welche für deine Situation die richtige ist.</p>
              </div>

              <CtaBlock>Direkt vergleichen? Berechne jetzt, wie sich dein Altersvorsorgedepot entwickeln könnte.</CtaBlock>

              {/* Gemeinsamkeiten */}
              <SectionH2 id="gemeinsamkeiten">Was haben beide gemeinsam?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Fangen wir mit dem an, was viele überrascht: Altersvorsorgedepot und ETF-Sparplan sind sich im Kern sehr ähnlich.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Beide investieren dein Geld in Fonds oder ETFs — also breit gestreut am Kapitalmarkt</li>
                  <li>Beide haben <strong className="text-foreground">keine Beitragsgarantie</strong> — dein Kapital kann zwischenzeitlich schwanken</li>
                  <li>Beide profitieren langfristig vom <strong className="text-foreground">Zinseszins-Effekt</strong>: Je früher du anfängst, desto mehr arbeitet dein Geld für dich</li>
                  <li>Beide sind deutlich renditeorientierter als klassische Versicherungsprodukte oder Sparbücher</li>
                </ul>
                <p>Der entscheidende Unterschied liegt also nicht in der Anlage selbst — sondern im Drumherum: Förderung, Flexibilität, Steuern, Kosten.</p>
              </div>

              {/* Unterschiede */}
              <SectionH2 id="unterschiede">Die entscheidenden Unterschiede</SectionH2>
              <div className="overflow-x-auto -mx-6 px-6 mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[140px]">Kriterium</TableHead>
                      <TableHead className="min-w-[160px]">Altersvorsorgedepot</TableHead>
                      <TableHead className="min-w-[140px]">ETF-Sparplan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Staatliche Förderung</TableCell><TableCell>✅ Ja — Zulagen + Steuervorteile</TableCell><TableCell>❌ Nein</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Flexibilität</TableCell><TableCell>⚠️ Gebunden bis 65</TableCell><TableCell>✅ Jederzeit verfügbar</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Besteuerung</TableCell><TableCell>Nachgelagert (im Alter)</TableCell><TableCell>Abgeltungsteuer laufend</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Kostendeckel</TableCell><TableCell>✅ Geplant</TableCell><TableCell>❌ Abhängig vom Anbieter</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Anlage in ETFs</TableCell><TableCell>✅ Voll möglich</TableCell><TableCell>✅ Voll möglich</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              <SectionH3>Förderung</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Nur das Altersvorsorgedepot bekommt staatliche Zulagen. Der Staat zahlt dir bis zu <strong className="text-foreground">35 % auf deine ersten 1.200 € Eigenbeitrag</strong> pro Jahr direkt dazu — plus bis zu 300 € pro Kind. Obendrauf kommt der Steuervorteil durch den Sonderausgabenabzug. Ein normaler ETF-Sparplan bekommt nichts davon.
              </p>

              <SectionH3>Flexibilität</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Beim ETF-Sparplan bist du völlig frei: Du kannst jederzeit einzahlen, pausieren, verkaufen oder umschichten. Kein Vertrag, keine Bindung. Das Altersvorsorgedepot hingegen ist für die Altersvorsorge gedacht — das Geld ist bis zum 65. Lebensjahr gebunden. Wer vorher ran muss, verliert die Förderung.
              </p>

              <SectionH3>Steuer</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Beim ETF-Sparplan fallen auf Kursgewinne und Dividenden <strong className="text-foreground">25 % Abgeltungsteuer</strong> an — entweder laufend oder beim Verkauf. Beim Altersvorsorgedepot wächst dein Kapital bis zur Rente <strong className="text-foreground">steuerfrei</strong>. Erst in der Auszahlungsphase wird versteuert — dann aber meist zu einem niedrigeren Steuersatz. Das ist der sogenannte Steuerstundungseffekt.
              </p>

              <SectionH3>Kosten</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Riester-Produkte waren berüchtigt für hohe Gebühren. Beim Altersvorsorgedepot ist laut aktuellem Gesetzentwurf ein <strong className="text-foreground">Effektivkostendeckel</strong> geplant, der die Gesamtkosten begrenzt. Beim ETF-Sparplan hängen die Kosten vom Anbieter und den gewählten ETFs ab — günstige Neobroker bieten hier sehr attraktive Konditionen.
              </p>

              {/* Förderbonus */}
              <SectionH2 id="foerderbonus">Der Förderbonus in Zahlen</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                Schauen wir uns den Unterschied konkret an. Zwei Personen, beide 35 Jahre alt, beide investieren <strong className="text-foreground">150 € pro Monat</strong> über 30 Jahre bis zur Rente mit 65 — bei einer angenommenen Rendite von 7 % pro Jahr:
              </p>
              <div className="overflow-x-auto -mx-6 px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]" />
                      <TableHead className="min-w-[140px]">Altersvorsorgedepot</TableHead>
                      <TableHead className="min-w-[140px]">ETF-Sparplan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Monatlicher Eigenbeitrag</TableCell><TableCell>150 €</TableCell><TableCell>150 €</TableCell></TableRow>
                    <TableRow><TableCell>Staatliche Zulagen (kumuliert)</TableCell><TableCell>~16.740 €</TableCell><TableCell>—</TableCell></TableRow>
                    <TableRow><TableCell>Steuervorteile (kumuliert)</TableCell><TableCell>~16.405 €</TableCell><TableCell>—</TableCell></TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">Kapital zum Rentenbeginn</TableCell>
                      <TableCell className="font-bold text-primary">~255.570 €</TableCell>
                      <TableCell className="font-bold">~196.600 €</TableCell>
                    </TableRow>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-semibold">Mögliche Auszahlung bis 85</TableCell>
                      <TableCell className="font-bold text-primary">~1.183 €/Monat</TableCell>
                      <TableCell className="font-bold">~910 €/Monat</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground mt-4">
                <p>Die Differenz: knapp <strong className="text-foreground">59.000 €</strong> — allein durch die staatliche Förderung. Nicht durch höhere Einzahlungen, nicht durch eine bessere Rendite. Einfach dadurch, dass mehr Kapital von Anfang an investiert ist und mitwächst.</p>
                <p><strong className="text-foreground">Wichtiger Hinweis:</strong> Dieser Vorteil gilt nur, wenn du das Geld tatsächlich bis 65 stehen lässt. Wer vorher auf das Kapital zugreifen muss, verliert die Förderung — dann verpufft der Vorteil.</p>
              </div>

              {/* Flexibilität */}
              <SectionH2 id="flexibilitaet">Der Flexibilitätsvorteil des ETF-Sparplans</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die Bindung bis 65 ist kein kleines Detail — für manche ist sie ein echter Ausschlusskriterium. Der ETF-Sparplan punktet hier klar:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Du kannst <strong className="text-foreground">jederzeit verkaufen</strong> — für einen Hauskauf, eine Auszeit, eine Umschulung</li>
                  <li>Du kannst <strong className="text-foreground">pausieren</strong>, wenn das Geld gerade knapp ist — ohne Konsequenzen</li>
                  <li>Du kannst <strong className="text-foreground">umschichten</strong>, wenn sich deine Lebenssituation ändert</li>
                  <li>Es gibt <strong className="text-foreground">kein Förderrückzahlungsrisiko</strong> — was drin ist, gehört dir</li>
                </ul>
                <p>Das macht den ETF-Sparplan zum idealen Instrument für alles, was nicht ausschließlich Altersvorsorge ist: mittelfristige Sparziele, Notgroschen-Aufbau, finanzielle Freiheit als Option halten.</p>
                <p>Wann dieser Flexibilitätsvorteil wichtiger ist als die Förderung:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Du bist unter 30 und weißt noch nicht, wo du in 5 Jahren lebst</li>
                  <li>Du planst in den nächsten 10–15 Jahren eine große Anschaffung</li>
                  <li>Du bist selbstständig und brauchst Liquiditätsreserven</li>
                  <li>Du hast noch keinen ausreichenden Notgroschen aufgebaut</li>
                </ul>
              </div>

              {/* Entscheidungshilfe */}
              <SectionH2 id="entscheidungshilfe">Entscheidungshilfe: Wer sollte was wählen?</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Kein Produkt ist für jeden richtig. Hier eine ehrliche Einordnung:</p>

              <SectionH3>Altersvorsorgedepot — passt zu dir, wenn:</SectionH3>
              <ul className="list-disc pl-6 space-y-1 text-base leading-relaxed text-muted-foreground">
                <li>Dein klares Ziel die <strong className="text-foreground">Altersvorsorge</strong> ist — nicht ein mittelfristiges Sparziel</li>
                <li>Du einen <strong className="text-foreground">Anlagehorizont von mindestens 10 Jahren</strong> hast, besser 20+</li>
                <li>Du die staatliche Förderung <strong className="text-foreground">vollständig mitnehmen</strong> willst</li>
                <li>Du den eingezahlten Betrag bis 65 <strong className="text-foreground">nicht brauchst</strong></li>
                <li>Du Elternteil bist und von der <strong className="text-foreground">Kinderzulage</strong> profitierst</li>
              </ul>

              <SectionH3>ETF-Sparplan — passt zu dir, wenn:</SectionH3>
              <ul className="list-disc pl-6 space-y-1 text-base leading-relaxed text-muted-foreground">
                <li>Du <strong className="text-foreground">Flexibilität</strong> über alles stellst und nicht weißt, wann du das Geld brauchst</li>
                <li>Du <strong className="text-foreground">kurzfristige oder mittelfristige Ziele</strong> verfolgst (unter 15 Jahre)</li>
                <li>Du ein <strong className="text-foreground">sehr hohes Einkommen</strong> hast (die Förderquote wird relativ kleiner)</li>
                <li>Deine Altersvorsorge bereits durch andere Wege gut abgedeckt ist (z.&nbsp;B. starke bAV)</li>
              </ul>

              <SectionH3>Die Kombination — oft die klügste Lösung:</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Warum nicht beides? Viele werden gut damit fahren, das <strong className="text-foreground">Altersvorsorgedepot für die geförderte Altersvorsorge</strong> zu nutzen — und parallel einen <strong className="text-foreground">ETF-Sparplan für alles andere</strong> zu besparen. So nimmst du die Förderung mit, ohne auf Flexibilität verzichten zu müssen.
              </p>

              <DecisionFlowchart />

              {/* Fazit */}
              <SectionH2 id="fazit">Fazit</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Es gibt kein objektives "Besser" — aber klare Kriterien für die richtige Wahl.</p>
                <p><strong className="text-foreground">Wer langfristig für die Rente spart und das Geld nicht zwischendurch braucht</strong>, sollte die staatliche Förderung des Altersvorsorgedepots mitnehmen. Fast 60.000 € Unterschied über 30 Jahre sind kein Argument, das man einfach ignorieren sollte.</p>
                <p><strong className="text-foreground">Wer Flexibilität braucht oder kurzfristigere Ziele hat</strong>, ist mit dem ETF-Sparplan besser bedient. Und wer beides will — Förderung und Flexibilität — kombiniert einfach beide Instrumente.</p>
              </div>

              <CtaBlock>Berechne jetzt, was das Altersvorsorgedepot für dich bedeutet — direkt im Rechner.</CtaBlock>

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

              {/* Related links */}
              <div className="mt-12">
                <p className="text-sm font-semibold mb-4">Weiterführende Artikel</p>
                <div className="space-y-2">
                  <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/zinseszins-frueh-starten" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Früh starten vs. spät starten: Der Zinseszins-Effekt</span>
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
                  Alle Angaben basieren auf dem aktuellen Gesetzentwurf zur Reform der privaten Altersvorsorge. Änderungen im Gesetzgebungsverfahren sind möglich. Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
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

export default BlogVsEtf;
