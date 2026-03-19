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
const PATH = "/blog/betriebliche-altersvorsorge";

const tocItems = [
  { id: "was-ist", label: "Was ist die bAV?" },
  { id: "foerderung", label: "Wie funktioniert die Förderung?" },
  { id: "nachteile", label: "Die Nachteile" },
  { id: "vergleich", label: "bAV vs. Altersvorsorgedepot" },
  { id: "was-tun", label: "Was du tun kannst" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Muss mein Arbeitgeber eine bAV anbieten?",
    a: "Nein — aber du hast seit 2002 ein gesetzliches Recht auf Entgeltumwandlung. Dein Arbeitgeber muss dir also ermöglichen, Teile deines Bruttogehalts in eine bAV umzuwandeln. Er muss aber keinen bestimmten Anbieter oder Tarif anbieten.",
  },
  {
    q: "Was passiert mit meiner bAV bei einem Jobwechsel?",
    a: "Grundsätzlich ist das angesparte Kapital bei Jobwechsel geschützt — es gehört dir. Du kannst den Vertrag oft zum neuen Arbeitgeber mitnehmen oder privat weiterführen. Aber der neue Arbeitgeber ist nicht verpflichtet, denselben Anbieter zu nutzen oder denselben Zuschuss zu zahlen.",
  },
  {
    q: "Lohnt sich die bAV auch bei niedrigem Einkommen?",
    a: "Ja — gerade bei niedrigem Einkommen ist die relative Sozialabgabenersparnis hoch. Allerdings sollte man darauf achten, dass die geringeren Rentenversicherungsbeiträge langfristig nicht zu einer spürbar niedrigeren gesetzlichen Rente führen.",
  },
  {
    q: "Kann ich bAV und Altersvorsorgedepot gleichzeitig nutzen?",
    a: "Ja, absolut. Beide Produkte schließen sich nicht aus. Viele werden sinnvollerweise beides parallel nutzen.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Betriebliche Altersvorsorge (bAV): Lohnt sie sich wirklich?",
    description: "Die bAV ist oft der einfachste Weg zur Altersvorsorge — weil der Chef mitbezahlt. Wir erklären, wie sie funktioniert, was sie kostet und wann sie sich lohnt.",
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
      { "@type": "ListItem", position: 3, name: "Betriebliche Altersvorsorge", item: `${BASE}${PATH}` },
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

const BlogBav = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Betriebliche Altersvorsorge (bAV): Lohnt sie sich wirklich?"
        description="Die bAV ist oft der einfachste Weg zur Altersvorsorge — weil der Chef mitbezahlt. Wir erklären, wie sie funktioniert, was sie kostet und wann sie sich lohnt."
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
              <BreadcrumbItem><BreadcrumbPage>Betriebliche Altersvorsorge</BreadcrumbPage></BreadcrumbItem>
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
                  Betriebliche Altersvorsorge (bAV): Lohnt sie sich wirklich?
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
                <p>Die betriebliche Altersvorsorge ist in Deutschland weit verbreitet — aber kaum jemand versteht sie wirklich. Viele Arbeitnehmer haben einen bAV-Vertrag, ohne zu wissen was drin steckt. Andere lehnen ihn ab, weil sie die Vor- und Nachteile nicht kennen.</p>
                <p>Dabei ist die bAV oft der einfachste erste Schritt zur Altersvorsorge — weil ein Teil des Geldes direkt vom Arbeitgeber kommt. Aber sie ist kein Allheilmittel.</p>
              </div>

              <CtaBlock to="/rentenluecken-rechner">Wie groß ist deine Rentenlücke? Jetzt berechnen.</CtaBlock>

              {/* Was ist die bAV? */}
              <SectionH2 id="was-ist">Was ist die betriebliche Altersvorsorge?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die bAV ist eine Form der Altersvorsorge, die über den Arbeitgeber läuft. Es gibt fünf verschiedene Durchführungswege — der häufigste in der Praxis ist die <strong className="text-foreground">Direktversicherung</strong>: Der Arbeitgeber schließt eine Lebens- oder Rentenversicherung auf dich ab, du und/oder dein Arbeitgeber zahlen ein, und im Alter bekommst du eine Rente oder Einmalzahlung.</p>
                <p>Das Besondere: Einzahlungen in die bAV können direkt vom Bruttogehalt abgezogen werden — du zahlst also aus dem Geld, auf das du noch keine Steuern und Sozialabgaben gezahlt hast. Das nennt sich <strong className="text-foreground">Entgeltumwandlung</strong>.</p>
              </div>

              {/* Förderung */}
              <SectionH2 id="foerderung">Wie funktioniert die Förderung?</SectionH2>

              <SectionH3>Steuer- und Sozialabgabenersparnis</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Bei der Entgeltumwandlung werden Beiträge zur bAV steuer- und sozialabgabenfrei gestellt — bis zu <strong className="text-foreground">4 % der Beitragsbemessungsgrenze</strong> (2026: ca. 3.624 €/Jahr, also rund 302 €/Monat).</p>
                <p>Was das bedeutet: Von 100 € Bruttogehalt, das du in die bAV umwandelst, kosten dich netto je nach Steuerklasse nur 50–65 €. Der Rest kommt vom Staat in Form von gesparten Steuern und Sozialabgaben.</p>
              </div>

              <SectionH3>Arbeitgeberzuschuss</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Seit 2022 ist der Arbeitgeber verpflichtet, bei Entgeltumwandlung einen <strong className="text-foreground">Zuschuss von mindestens 15 %</strong> auf den umgewandelten Betrag zu zahlen — weil er selbst Sozialabgaben spart. Viele Arbeitgeber zahlen mehr, manche bis zu 50 % oder 100 % des Eigenbeitrags.</p>

              <SectionH3>Konkretes Rechenbeispiel</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Person, 40 Jahre, Steuerklasse I, 4.000 € brutto, wandelt 200 € monatlich um:</p>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[260px]">Position</TableHead>
                      <TableHead className="min-w-[120px] text-right">Betrag</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Bruttoumwandlung</TableCell><TableCell className="text-right">200 €</TableCell></TableRow>
                    <TableRow><TableCell>Steuer- & Sozialabgabenersparnis (ca. 40 %)</TableCell><TableCell className="text-right">~80 €</TableCell></TableRow>
                    <TableRow><TableCell>Arbeitgeberzuschuss (15 %)</TableCell><TableCell className="text-right">30 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Tatsächlicher Nettobeitrag</TableCell><TableCell className="text-right font-bold">~90 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">In die bAV fließen</TableCell><TableCell className="text-right font-bold text-primary">230 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">Für 90 € Nettobeitrag fließen 230 € in die Altersvorsorge — eine effektive Förderquote von über 150 %.</p>

              {/* Nachteile */}
              <SectionH2 id="nachteile">Die Nachteile — die oft verschwiegen werden</SectionH2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">Die bAV ist kein reines Geschenk. Es gibt drei wichtige Nachteile, die du kennen solltest:</p>

              <SectionH3>1. Geringere Sozialversicherungsansprüche</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Weil du weniger Bruttogehalt verbeiträgst, zahlst du weniger in die gesetzliche Rentenversicherung, Krankenversicherung und Arbeitslosenversicherung ein. Das bedeutet: leicht geringere gesetzliche Rente, geringeres Krankengeld im Krankheitsfall, geringeres Arbeitslosengeld.</p>

              <SectionH3>2. Besteuerung im Alter</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Was steuerfrei eingezahlt wurde, wird im Alter voll besteuert — als normales Einkommen. Wer im Alter ein hohes Einkommen hat, kann hier unangenehm überrascht werden. Außerdem fallen im Alter Kranken- und Pflegeversicherungsbeiträge auf die bAV-Rente an (aktuell ca. 18 %).</p>

              <SectionH3>3. Eingeschränkte Flexibilität</SectionH3>
              <p className="text-base leading-relaxed text-muted-foreground">Eine bAV ist an den Arbeitgeber gebunden. Bei einem Jobwechsel kann der Vertrag oft mitgenommen werden — muss aber nicht. Die Anlageentscheidungen triffst in der Regel nicht du, sondern der Arbeitgeber oder der Versicherungsanbieter.</p>

              {/* Vergleich */}
              <SectionH2 id="vergleich">bAV vs. Altersvorsorgedepot: Was passt wann?</SectionH2>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[160px]">Kriterium</TableHead>
                      <TableHead className="min-w-[140px]">bAV</TableHead>
                      <TableHead className="min-w-[160px]">Altersvorsorgedepot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Arbeitgeberzuschuss</TableCell><TableCell>✅ Ja (mind. 15 %)</TableCell><TableCell>❌ Nein</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Steuerfreiheit in Ansparphase</TableCell><TableCell>✅ Ja</TableCell><TableCell>❌ Nein (Sonderausgabenabzug)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Anlagefreiheit</TableCell><TableCell>⚠️ Abhängig vom Anbieter</TableCell><TableCell>✅ Voll (ETFs)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Flexibilität bei Jobwechsel</TableCell><TableCell>⚠️ Eingeschränkt</TableCell><TableCell>✅ Unabhängig</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Staatliche Zulage</TableCell><TableCell>❌ Nein</TableCell><TableCell>✅ Ja</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Besteuerung im Alter</TableCell><TableCell>Voll (+ KV/PV)</TableCell><TableCell>Nachgelagert (günstiger)</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Fazit:</strong> Die bAV lohnt sich besonders dann, wenn der Arbeitgeber großzügig zuschießt (über 15 %). Das <Link to="/altersvorsorgedepot" className="text-primary font-medium hover:underline">Altersvorsorgedepot</Link> ist die bessere Wahl für alle, die Flexibilität und ETF-Investitionen bevorzugen. Die optimale Lösung für viele: <strong className="text-foreground">beides kombinieren</strong> — bAV bis zur Freigrenze für den Arbeitgeberzuschuss, Rest ins Altersvorsorgedepot.</p>
              </div>

              {/* Was du tun kannst */}
              <SectionH2 id="was-tun">Was du konkret tun kannst</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Schritt 1:</strong> Frag deinen Arbeitgeber, ob eine bAV angeboten wird — und wie hoch der Zuschuss ist.</p>
                <p><strong className="text-foreground">Schritt 2:</strong> Lass dir die Konditionen schriftlich geben: Welcher Anbieter? Welche Kosten? Welche Fonds?</p>
                <p><strong className="text-foreground">Schritt 3:</strong> Prüfe, ob der Vertrag bei einem Jobwechsel übertragbar ist.</p>
                <p><strong className="text-foreground">Schritt 4:</strong> Berechne, wie viel Rentenlücke nach bAV und gesetzlicher Rente noch bleibt — und ob das Altersvorsorgedepot als Ergänzung sinnvoll ist.</p>
              </div>

              <CtaBlock>Berechne deine Rentenlücke und was du noch brauchst.</CtaBlock>

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
                  <Link to="/blog/altersvorsorge-selbststaendige" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorge für Selbstständige</span>
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
                  Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar. Für individuelle bAV-Entscheidungen empfehlen wir die Beratung durch einen unabhängigen Finanz- oder Steuerberater.
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

export default BlogBav;
