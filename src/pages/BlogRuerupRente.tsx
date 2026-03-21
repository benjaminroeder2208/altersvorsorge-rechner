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
const PATH = "/blog/ruerup-rente";

const tocItems = [
  { id: "was-ist-ruerup", label: "Was ist die Rürup-Rente?" },
  { id: "steuervorteil", label: "Der Steuervorteil konkret" },
  { id: "fuer-wen", label: "Für wen lohnt sich Rürup?" },
  { id: "vergleich", label: "Rürup vs. Altersvorsorgedepot" },
  { id: "worauf-achten", label: "Worauf beim Vertrag achten?" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Kann ich Rürup und Altersvorsorgedepot gleichzeitig nutzen?",
    a: "Ja — beide Produkte sind unabhängig voneinander und können parallel genutzt werden. Das ist für viele Selbstständige sogar die optimale Strategie: Rürup für den maximalen Steuervorteil in einkommensstarken Jahren, Altersvorsorgedepot für renditestarken Vermögensaufbau mit staatlicher Zulage. Die Förderungen schließen sich nicht gegenseitig aus.",
  },
  {
    q: "Was passiert mit meinem Rürup-Kapital, wenn ich sterbe?",
    a: "Das angesammelte Kapital verfällt grundsätzlich — es ist nicht vererbbar. In der Ansparphase kann eine Hinterbliebenenrente für Ehepartner vereinbart werden (reduziert aber die eigene Rente). Nach Rentenbeginn endet die Zahlung mit dem Tod, sofern keine Rentengarantiezeit vereinbart wurde. Das ist einer der größten Nachteile der Rürup-Rente gegenüber dem Altersvorsorgedepot.",
  },
  {
    q: "Ab welchem Einkommen lohnt sich Rürup?",
    a: "Als Faustregel: Ab einem zu versteuernden Einkommen von ca. 50.000 € (Grenzsteuersatz ~42 %) wird der Steuervorteil richtig spürbar. Bei einem Beitrag von 10.000 € sparst du dann über 4.000 € Steuern. Unter 40.000 € Einkommen ist der Vorteil meist zu gering — hier sind ETF-Sparplan und Altersvorsorgedepot die bessere Wahl.",
  },
  {
    q: "Gibt es Rürup auch als ETF-Sparplan?",
    a: "Ja — einige Anbieter bieten fondsgebundene Rürup-Verträge an, bei denen du in ETFs investieren kannst. Das ist die empfehlenswerte Variante, weil die Renditechancen deutlich höher sind als bei klassischen Rürup-Rentenversicherungen. Achte auf niedrige Gesamtkosten (unter 1 % p.a.) und eine breite ETF-Auswahl ohne Beitragsgarantie.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Rürup Rente: Für wen sie sich wirklich lohnt — und für wen nicht",
    description: "Für Selbstständige und Gutverdiener das stärkste Steuersparinstrument. Für alle anderen oft eine teure Falle. Der Unterschied liegt im Einkommen.",
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
      { "@type": "ListItem", position: 3, name: "Rürup Rente", item: `${BASE}${PATH}` },
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

const BlogRuerupRente = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Rürup Rente: Für wen sie sich wirklich lohnt — und für wen nicht"
        description="Für Selbstständige und Gutverdiener das stärkste Steuersparinstrument. Für alle anderen oft eine teure Falle. Der Unterschied liegt im Einkommen."
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
              <BreadcrumbItem><BreadcrumbPage>Rürup Rente</BreadcrumbPage></BreadcrumbItem>
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
                  Rürup Rente: Für wen sie sich wirklich lohnt — und für wen nicht
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
                <p>Die Rürup-Rente ist die am wenigsten verstandene Altersvorsorge in Deutschland. Für manche ist sie das <strong className="text-foreground">beste Steuersparinstrument überhaupt</strong>. Für andere eine teure Falle. Der Unterschied liegt im Einkommen.</p>
                <p>In diesem Artikel zeigen wir dir, wie die Rürup-Rente funktioniert, für wen sie sich lohnt — und warum die Kombination mit dem <Link to="/blog/altersvorsorgedepot-2027" className="text-primary font-medium hover:underline">Altersvorsorgedepot ab 2027</Link> für viele Selbstständige die optimale Strategie ist.</p>
              </div>

              <CtaBlock to="/rentenluecken-rechner">Berechne deine persönliche Rentenlücke — und finde heraus, wie viel du wirklich brauchst.</CtaBlock>

              {/* Abschnitt 1 */}
              <SectionH2 id="was-ist-ruerup">Was ist die Rürup-Rente?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die Rürup-Rente (offiziell: <strong className="text-foreground">Basisrente</strong>) funktioniert im Prinzip wie die gesetzliche Rente — nur privat finanziert. Du zahlst Beiträge ein, die als <strong className="text-foreground">Sonderausgaben steuerlich absetzbar</strong> sind, und erhältst im Alter eine lebenslange monatliche Rente.</p>
              </div>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Merkmal</TableHead>
                      <TableHead className="min-w-[240px]">Details 2026</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Maximaler Sonderausgabenabzug</TableCell><TableCell>29.344 € (Alleinstehende) / 58.688 € (Verheiratete)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Absetzbarkeit</TableCell><TableCell>100 % der Beiträge</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Auszahlung</TableCell><TableCell>Lebenslange Rente ab frühestens 62 Jahre</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Vererbbarkeit</TableCell><TableCell>❌ Nicht vererbbar (nur Hinterbliebenenrente möglich)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Beleihbarkeit</TableCell><TableCell>❌ Nicht beleihbar, nicht übertragbar</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Besteuerung im Alter</TableCell><TableCell>Nachgelagert (persönlicher Steuersatz)</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">Die wichtigste Einschränkung: Du kommst an das Geld <strong className="text-foreground">vor Rentenbeginn nicht heran</strong>. Keine Kündigung, keine Teilauszahlung, keine Übertragung. Das unterscheidet Rürup fundamental von einem ETF-Sparplan oder dem Altersvorsorgedepot.</p>

              {/* Abschnitt 2 */}
              <SectionH2 id="steuervorteil">Der Steuervorteil — konkret durchgerechnet</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Der Steuervorteil ist das zentrale Argument für Rürup. Aber wie groß er wirklich ist, hängt komplett vom <strong className="text-foreground">Grenzsteuersatz</strong> ab:</p>
              </div>

              <SectionH3>Person A: Gutverdiener (80.000 € Jahreseinkommen)</SectionH3>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]">Position</TableHead>
                      <TableHead className="min-w-[140px] text-right">Betrag</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Rürup-Beitrag</TableCell><TableCell className="text-right">10.000 €</TableCell></TableRow>
                    <TableRow><TableCell>Grenzsteuersatz</TableCell><TableCell className="text-right">~42 %</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Steuerersparnis</TableCell><TableCell className="text-right font-bold text-primary">~4.200 €</TableCell></TableRow>
                    <TableRow className="bg-primary/5"><TableCell className="font-semibold">Effektiver Eigenbeitrag</TableCell><TableCell className="text-right font-bold text-primary">~5.800 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground"><strong className="text-foreground">10.000 € arbeiten für deine Rente — aber du zahlst effektiv nur 5.800 €.</strong> Das ist eine sofortige „Rendite" von über 70 %.</p>

              <SectionH3>Person B: Normalverdiener (30.000 € Jahreseinkommen)</SectionH3>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]">Position</TableHead>
                      <TableHead className="min-w-[140px] text-right">Betrag</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Rürup-Beitrag</TableCell><TableCell className="text-right">10.000 €</TableCell></TableRow>
                    <TableRow><TableCell>Grenzsteuersatz</TableCell><TableCell className="text-right">~25 %</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold">Steuerersparnis</TableCell><TableCell className="text-right">~2.500 €</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold">Effektiver Eigenbeitrag</TableCell><TableCell className="text-right">~7.500 €</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">Deutlich weniger attraktiv. Bei 30.000 € Einkommen zahlst du effektiv 75 % selbst — und gibst trotzdem die volle Flexibilität auf. Hier sind <Link to="/blog/etf-sparplan-steuern" className="text-primary font-medium hover:underline">ETF-Sparplan</Link> und Altersvorsorgedepot oft die bessere Wahl.</p>

              {/* Abschnitt 3 */}
              <SectionH2 id="fuer-wen">Für wen lohnt sich Rürup — und für wen nicht?</SectionH2>

              <SectionH3>✅ Rürup lohnt sich für:</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong className="text-foreground">Selbstständige ohne gesetzliche Rente mit hohem Einkommen</strong> (ab ~50.000 €) — hier ist Rürup oft das einzige Steuersparinstrument für die Altersvorsorge</li>
                  <li><strong className="text-foreground">Angestellte mit sehr hohem Einkommen</strong> — wer den Riester-/Altersvorsorgedepot-Rahmen bereits ausschöpft und zusätzlich Steuern optimieren will</li>
                  <li><strong className="text-foreground">Wer lebenslange Absicherung will</strong> — und das Kapital nicht für Erben oder als Notgroschen benötigt</li>
                  <li><strong className="text-foreground">Ältere Einzahler (ab 50)</strong> — die in kurzer Zeit viel Steuern sparen wollen und die kürzere Ansparphase akzeptieren</li>
                </ul>
              </div>

              <SectionH3>❌ Rürup lohnt sich nicht für:</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong className="text-foreground">Geringverdiener</strong> — der Steuervorteil ist zu gering, um die fehlende Flexibilität auszugleichen</li>
                  <li><strong className="text-foreground">Wer Flexibilität braucht</strong> — kein Zugriff vor 62, keine Kündigung, keine Teilauszahlung</li>
                  <li><strong className="text-foreground">Junge Berufseinsteiger</strong> — <Link to="/blog/altersvorsorge-berufseinsteiger" className="text-primary font-medium hover:underline">ETF-Sparplan + Altersvorsorgedepot</Link> bieten mehr Flexibilität und bessere Renditeaussichten</li>
                  <li><strong className="text-foreground">Wer das Kapital vererben möchte</strong> — Rürup-Kapital ist nicht vererbbar (nur eingeschränkte Hinterbliebenenrente)</li>
                </ul>
              </div>

              {/* Abschnitt 4 */}
              <SectionH2 id="vergleich">Rürup vs. Altersvorsorgedepot für Selbstständige</SectionH2>
              <div className="overflow-x-auto -mx-6 px-6 my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[160px]">Kriterium</TableHead>
                      <TableHead className="min-w-[160px]">Rürup-Rente</TableHead>
                      <TableHead className="min-w-[180px]">Altersvorsorgedepot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Steuerlicher Vorteil</TableCell><TableCell>✅ Sehr hoch (bis 42 % + Soli)</TableCell><TableCell>Mittel (Zulagen + Sonderausgaben)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Flexibilität</TableCell><TableCell>❌ Keine (bis 62, keine Kündigung)</TableCell><TableCell>⚠️ Gering (bis 65 gebunden)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Vererbbarkeit</TableCell><TableCell>❌ Nein</TableCell><TableCell>✅ Ja</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Renditechance</TableCell><TableCell>⚠️ Abhängig vom Produkt</TableCell><TableCell>✅ Hoch (volle ETF-Auswahl)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Staatliche Zulage</TableCell><TableCell>❌ Nein (nur Steuerabzug)</TableCell><TableCell>✅ Bis 540 €/Jahr + Kinderzulage</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Max. Beitrag p.a.</TableCell><TableCell>29.344 € (absetzbar)</TableCell><TableCell>1.800 € (gefördert)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Ideal für</TableCell><TableCell>Steueroptimierung bei hohem Einkommen</TableCell><TableCell>Renditestarken Vermögensaufbau</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Empfehlung für Selbstständige:</strong> Die Kombination ist oft optimal — Rürup für die <strong className="text-foreground">maximale Steuerersparnis</strong> in einkommensstarken Jahren, Altersvorsorgedepot ab 2027 für den <strong className="text-foreground">renditestarken Vermögensaufbau</strong> mit staatlicher Förderung.</p>
                <p>Mehr dazu in unserem Artikel <Link to="/blog/altersvorsorge-selbststaendige" className="text-primary font-medium hover:underline">Altersvorsorge für Selbstständige</Link>.</p>
              </div>

              {/* Abschnitt 5 */}
              <SectionH2 id="worauf-achten">Worauf beim Rürup-Vertrag achten?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Nicht jeder Rürup-Vertrag ist gleich. Die Produktauswahl entscheidet, ob Rürup ein gutes oder schlechtes Investment wird:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong className="text-foreground">Fondsbasiert statt klassisch</strong> — klassische Rürup-Rentenversicherungen bieten oft nur 1–2 % Rendite. Fondsbasierte Verträge mit ETFs haben deutlich höhere Renditechancen.</li>
                  <li><strong className="text-foreground">Gesamtkosten unter 1 % p.a.</strong> — viele klassische Versicherungsprodukte berechnen 1,5–2 % jährlich. Das frisst über Jahrzehnte einen erheblichen Teil der Rendite.</li>
                  <li><strong className="text-foreground">Keine Beitragsgarantie</strong> — die Garantie kostet Rendite, weil der Anbieter konservativ anlegen muss. Über 20+ Jahre Laufzeit bringt die Garantie mehr Schaden als Nutzen.</li>
                  <li><strong className="text-foreground">Flexibler Beitrag</strong> — gerade Selbstständige mit schwankendem Einkommen brauchen die Möglichkeit, Beiträge zu variieren oder auszusetzen.</li>
                </ul>
              </div>

              {/* Fazit */}
              <SectionH2 id="fazit">Fazit</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Rürup ist <strong className="text-foreground">kein Produkt für jeden</strong> — aber für Selbstständige und Gutverdiener das stärkste Steuersparinstrument, das es gibt.</p>
                <p>Die entscheidende Frage ist nicht „Rürup ja oder nein?" — sondern <strong className="text-foreground">wie kombiniere ich Rürup und Altersvorsorgedepot optimal?</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Hohes Einkommen + Selbstständig:</strong> Rürup für Steuerersparnis + Altersvorsorgedepot für Rendite</li>
                  <li><strong className="text-foreground">Mittleres Einkommen:</strong> Altersvorsorgedepot + ETF-Sparplan — Rürup prüfen</li>
                  <li><strong className="text-foreground">Geringes Einkommen:</strong> ETF-Sparplan + Altersvorsorgedepot — Rürup verzichtbar</li>
                </ul>
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
                  <Link to="/blog/altersvorsorge-selbststaendige" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorge für Selbstständige</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                  <Link to="/rentenluecken-rechner" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Rentenlückenrechner: Wie groß ist deine Lücke?</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-16 p-5 bg-secondary rounded-xl">
                <p className="text-xs text-muted-foreground/70 italic leading-relaxed">
                  Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar. Alle Angaben basieren auf dem Stand 2026 und können sich ändern. Für individuelle Rürup-Entscheidungen empfehlen wir die Beratung durch einen Steuerberater oder eine unabhängige Verbraucherzentrale.
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

export default BlogRuerupRente;
