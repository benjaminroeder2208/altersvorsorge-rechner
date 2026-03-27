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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/blog/was-darf-ins-altersvorsorgedepot";

const tocItems = [
  { id: "warum-einschraenkungen", label: "Warum gibt es Einschränkungen?" },
  { id: "erlaubte-anlageformen", label: "Die fünf erlaubten Anlageformen" },
  { id: "nicht-erlaubt", label: "Was ist nicht erlaubt?" },
  { id: "standard-vs-frei", label: "Standarddepot vs. freies Depot" },
  { id: "selbst-auswaehlen", label: "Selbst auswählen oder wählen lassen?" },
  { id: "praxis", label: "Was bedeutet das für die Praxis?" },
  { id: "faq", label: "Häufige Fragen" },
  { id: "fazit", label: "Fazit" },
];

const faqItems = [
  {
    q: "Sind Themen-ETFs (z.\u00A0B. Clean Energy, KI) erlaubt?",
    a: "Grundsätzlich ja, wenn sie als OGAW-Fonds reguliert sind und höchstens Risikoklasse 5 erreichen. Manche konzentrierten Themen-ETFs können jedoch in Risikoklasse 6 oder 7 fallen — dann wären sie nicht erlaubt.",
  },
  {
    q: "Sind Geldmarktfonds erlaubt?",
    a: "Ja. Geldmarktfonds sind OGAW-Fonds und liegen typischerweise in Risikoklasse 1 — also klar innerhalb der Grenze.",
  },
  {
    q: "Sind Mischfonds erlaubt?",
    a: "Ja, sofern sie als OGAW-Sondervermögen reguliert sind und die Risikoklassengrenze einhalten.",
  },
  {
    q: "Sind nachhaltige ETFs (ESG) erlaubt?",
    a: "Ja. Die ESG-Ausrichtung ist für die Förderfähigkeit irrelevant — entscheidend ist die Produktstruktur und die Risikoklasse.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Was darf ins Altersvorsorgedepot? Die erlaubten Anlageformen im Überblick",
    description: "Welche ETFs, Fonds und Anleihen sind im Altersvorsorgedepot erlaubt? Alle Anlageformen laut beschlossenem Gesetz § 1 Abs. 1b AltZertG einfach erklärt.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-03-22",
    dateModified: "2026-03-22",
    author: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    isPartOf: { "@type": "WebSite", url: `${BASE}/` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: "Was darf ins Altersvorsorgedepot?", item: `${BASE}${PATH}` },
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

const BlogWasDarfInsDepot = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Was darf ins Altersvorsorgedepot? ETFs, Fonds & Co. erklärt"
        description="Welche ETFs, Fonds und Anleihen sind im Altersvorsorgedepot erlaubt? Alle Anlageformen laut beschlossenem Gesetz § 1 Abs. 1b AltZertG einfach erklärt."
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
              <BreadcrumbItem><BreadcrumbPage>Was darf ins Altersvorsorgedepot?</BreadcrumbPage></BreadcrumbItem>
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
                  Was darf ins Altersvorsorgedepot? Die erlaubten Anlageformen im Überblick
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                  <span>ca. 6 Min. Lesezeit</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span>Stand: beschlossen 27. März 2026</span>
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
                <p>Das Altersvorsorgedepot klingt nach einem normalen Wertpapierdepot — und in gewisser Hinsicht ist es das auch. Aber nicht alles, was du in ein normales Depot kaufen kannst, ist im geförderten Altersvorsorgedepot erlaubt. Der Gesetzgeber hat klare Grenzen gezogen: <strong className="text-foreground">breit gestreute Fonds ja, Einzelaktien nein. ETFs ja, Kryptowährungen nein.</strong></p>
                <p>Dieser Artikel erklärt genau, was erlaubt ist — und warum. Alles basiert auf § 1 Absatz 1b des Altersvorsorgeverträge-Zertifizierungsgesetzes (AltZertG) in der Fassung des aktuellen Gesetzentwurfs (Drucksache 21/4088).</p>
              </div>

              <CtaBlock>Berechne jetzt, wie sich dein Altersvorsorgedepot entwickeln könnte.</CtaBlock>

              {/* Warum Einschränkungen */}
              <SectionH2 id="warum-einschraenkungen">Warum gibt es überhaupt Einschränkungen?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Das Altersvorsorgedepot ist staatlich gefördert — Grundzulage, Kinderzulage, Steuervorteil. Im Gegenzug stellt der Staat Anforderungen an die Produkte: Sie müssen für die Altersvorsorge geeignet sein, ein Mindestmaß an Streuung und Regulierung aufweisen und einem vertretbaren Risikorahmen entsprechen.</p>
                <p>Der Gesetzentwurf nennt als Ziel ausdrücklich <strong className="text-foreground">„realwertorientierte Anlagestrategien"</strong>, die wegen der typischen langen Anlagezeiträume der Altersvorsorge besonders geeignet seien. Gleichzeitig soll das Depot kein Vehikel für riskante Spekulation oder Steuergestaltung werden.</p>
                <p>Das Ergebnis ist eine klar definierte Liste erlaubter Anlageformen — alle mit einer gemeinsamen Einschränkung: Sie dürfen im europäischen Basisinformationsblatt (PRIIPs-KID) <strong className="text-foreground">höchstens in Risikoklasse 5 von 7</strong> eingestuft sein.</p>
              </div>

              {/* Die fünf erlaubten Anlageformen */}
              <SectionH2 id="erlaubte-anlageformen">Die fünf erlaubten Anlageformen (§ 1 Abs. 1b AltZertG)</SectionH2>

              <SectionH3>1. OGAW-Fonds (Risikoklasse 1–5)</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>OGAW steht für „Organismen für gemeinsame Anlagen in Wertpapieren" — das ist die europäische Regulierungskategorie für klassische Publikumsfonds, zu der auch ETFs gehören. <strong className="text-foreground">OGAW-Fonds sind die wichtigste Anlageform im Altersvorsorgedepot.</strong></p>
                <p>Erlaubt sind OGAW-Sondervermögen nach dem Kapitalanlagegesetzbuch, die unter die europäische PRIIPs-Verordnung fallen und im Basisinformationsblatt höchstens in Risikoklasse 5 eingestuft sind.</p>
                <p>In der Praxis bedeutet das: Breit gestreute Aktien-ETFs auf Indizes wie den MSCI World fallen in der Regel in Risikoklasse 4 oder 5 und sind damit erlaubt. Auch aktiv verwaltete Aktienfonds können erlaubt sein, sofern sie die Risikoklassengrenze einhalten.</p>
              </div>

              <SectionH3>2. Offene Publikums-AIF (Risikoklasse 1–5)</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>AIF steht für „Alternative Investmentfonds". Offene Publikums-AIF nach §§ 218 und 219 KAGB sind regulierte Fonds, die nicht unter die OGAW-Richtlinie fallen — dazu gehören zum Beispiel <strong className="text-foreground">offene Immobilienfonds</strong>.</p>
                <p>Auch diese sind erlaubt, wenn sie als Sondervermögen aufgelegt sind, unter die PRIIPs-Verordnung fallen und höchstens Risikoklasse 5 erreichen.</p>
              </div>

              <SectionH3>3. Europäische Langfristfonds (ELTIFs, Risikoklasse 1–5)</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>ELTIFs (European Long-Term Investment Funds) sind eine vergleichsweise neue EU-Fondskategorie, die speziell für langfristige Investitionen konzipiert wurde — etwa in <strong className="text-foreground">Infrastruktur, Private Equity oder Immobilien</strong>. Sie sind im Altersvorsorgedepot erlaubt, wenn sie unter die PRIIPs-Verordnung fallen und maximal Risikoklasse 5 aufweisen.</p>
              </div>

              <SectionH3>4. Euro-Staatsanleihen deutscher öffentlicher Emittenten</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Erlaubt sind auf Euro lautende Schuldverschreibungen des Bundes, der Länder, der Gemeinden sowie anderer Körperschaften des öffentlichen Rechts — und von öffentlich-rechtlichen Anstalten, für die eine solche Körperschaft haftet.</p>
                <p>Das schließt klassische <strong className="text-foreground">Bundesanleihen und Landesschatzanweisungen</strong> ein.</p>
              </div>

              <SectionH3>5. Euro-Staatsanleihen des Euroraums und europäischer Institutionen</SectionH3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Ebenfalls erlaubt sind auf Euro lautende Schuldverschreibungen von Mitgliedstaaten des Euro-Währungsgebiets, der Europäischen Union, der Europäischen Atomgemeinschaft, der <strong className="text-foreground">Europäischen Investitionsbank (EIB)</strong> sowie der Europäischen Finanzstabilitätsfazilität (EFSF).</p>
              </div>

              {/* Was ist nicht erlaubt */}
              <SectionH2 id="nicht-erlaubt">Was ist nicht erlaubt?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Der Gesetzentwurf nennt keine explizite Verbotsliste — aber die Positiv-Liste ist abschließend. Was nicht darin vorkommt, ist nicht förderfähig. Konkret bedeutet das:</p>
              </div>
              <div className="my-6 space-y-3">
                <div className="flex gap-3 p-4 bg-destructive/5 border border-destructive/10 rounded-xl">
                  <span className="text-destructive font-bold shrink-0">✕</span>
                  <p className="text-sm text-muted-foreground"><strong className="text-foreground">Einzelaktien</strong> — Auch wenn Apple, SAP oder Volkswagen in einem Depot selbstverständlich wären — im Altersvorsorgedepot nicht.</p>
                </div>
                <div className="flex gap-3 p-4 bg-destructive/5 border border-destructive/10 rounded-xl">
                  <span className="text-destructive font-bold shrink-0">✕</span>
                  <p className="text-sm text-muted-foreground"><strong className="text-foreground">Kryptowährungen</strong> — Bitcoin, Ethereum und andere Kryptowährungen fallen nicht in eine der fünf Kategorien.</p>
                </div>
                <div className="flex gap-3 p-4 bg-destructive/5 border border-destructive/10 rounded-xl">
                  <span className="text-destructive font-bold shrink-0">✕</span>
                  <p className="text-sm text-muted-foreground"><strong className="text-foreground">Hochrisiko-Fonds ab Risikoklasse 6 oder 7</strong> — Das trifft gehebelte Fonds, Volatilitätsprodukte oder bestimmte Rohstofffonds.</p>
                </div>
                <div className="flex gap-3 p-4 bg-destructive/5 border border-destructive/10 rounded-xl">
                  <span className="text-destructive font-bold shrink-0">✕</span>
                  <p className="text-sm text-muted-foreground"><strong className="text-foreground">Geschlossene Fonds</strong> — Nur offene Sondervermögen sind förderfähig.</p>
                </div>
                <div className="flex gap-3 p-4 bg-destructive/5 border border-destructive/10 rounded-xl">
                  <span className="text-destructive font-bold shrink-0">✕</span>
                  <p className="text-sm text-muted-foreground"><strong className="text-foreground">Zertifikate und Derivate</strong> — Optionsscheine, Knock-out-Produkte oder strukturierte Anleihen fallen nicht in die zulässigen Kategorien.</p>
                </div>
              </div>

              {/* Standard vs. Frei */}
              <SectionH2 id="standard-vs-frei">Standarddepot vs. freies Depot: ein wichtiger Unterschied</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Das Gesetz unterscheidet zwei Varianten:</p>
              </div>

              <div className="my-6 space-y-4">
                <div className="p-5 bg-secondary rounded-xl">
                  <p className="font-semibold text-foreground mb-2">Freies Altersvorsorgedepot (§ 1 Abs. 1b AltZertG)</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Der Anbieter kann alle fünf Anlageformen anbieten. Der Anleger kann — sofern der Vertrag das vorsieht — aus dem vereinbarten Angebot selbst wählen. Standardmäßig wählt der Anbieter die Anlage aus.</p>
                </div>
                <div className="p-5 bg-secondary rounded-xl">
                  <p className="font-semibold text-foreground mb-2">Standarddepot (§ 1 Abs. 1c AltZertG)</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Die Auswahl ist enger: Nur OGAW-Fonds sind erlaubt, und der Anbieter muss genau <strong className="text-foreground">zwei Fonds</strong> festlegen — einen mit Risikoklasse 1 oder 2 (sicherheitsorientiert) und einen mit Risikoklasse 3 bis 5 (chancenorientiert). Der Anleger entscheidet über die Aufteilung.</p>
                </div>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Hinzu kommt beim Standarddepot eine <strong className="text-foreground">automatische Umschichtung</strong>: Fünf Jahre vor Rentenbeginn dürfen höchstens 50 Prozent des Kapitals im chancenorientierten Fonds liegen, zwei Jahre vorher höchstens 30 Prozent. Das ist das sogenannte <strong className="text-foreground">Life-Cycle-Prinzip</strong> — Risiko wird mit näherrückendem Rentenalter schrittweise reduziert.</p>
                <p>Für das Standarddepot gilt außerdem eine <strong className="text-foreground">Kostenobergrenze</strong>: Die Effektivkosten dürfen über die Vertragslaufzeit maximal 1,5 Prozent pro Jahr betragen.</p>
              </div>

              {/* Selbst auswählen */}
              <SectionH2 id="selbst-auswaehlen">Selbst auswählen oder vom Anbieter wählen lassen?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Im freien Altersvorsorgedepot wählt grundsätzlich der Anbieter die Anlage aus — es sei denn, der Vertrag räumt dem Anleger eine Option zur Selbstauswahl ein. Das ist ein wichtiger Punkt bei der Produktauswahl: Wer eigene Präferenzen hat (z.&nbsp;B. bestimmte ETFs oder nachhaltige Fonds), sollte darauf achten, dass der Vertrag entsprechende Auswahlmöglichkeiten vorsieht.</p>
              </div>

              {/* Praxis */}
              <SectionH2 id="praxis">Was bedeutet das für die Praxis?</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Die meisten gängigen ETFs auf breite Indizes wie den MSCI World, den S&P 500 oder den MSCI EM sind OGAW-Sondervermögen und werden typischerweise in Risikoklasse 4 oder 5 eingestuft — sie sind also erlaubt. Wer bisher in solche ETFs gespart hat, wird im Altersvorsorgedepot auf vertraute Produkte treffen.</p>
                <p>Die entscheidende Frage wird sein, welche konkreten Fonds die einzelnen Anbieter in ihren zertifizierten Depots anbieten werden. Das liegt im Ermessen der Anbieter — solange die gesetzlichen Grenzen eingehalten werden.</p>
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

              {/* Fazit */}
              <SectionH2 id="fazit">Fazit</SectionH2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Das Altersvorsorgedepot ist kein Freifahrtschein für beliebige Investments — aber es lässt die wichtigsten renditeorientierten Anlageformen zu. <strong className="text-foreground">ETFs auf breite Aktienindizes, offene Immobilienfonds, europäische Langfristfonds und Staatsanleihen</strong> sind erlaubt. Einzelaktien, Krypto und Hochrisikoprodukte nicht.</p>
                <p>Das ist kein Nachteil. Die Beschränkung auf diversifizierte, regulierte Produkte entspricht genau dem, was für langfristige Altersvorsorge sinnvoll ist.</p>
              </div>

              <CtaBlock>Jetzt berechnen, wie sich dein Altersvorsorgedepot entwickeln könnte.</CtaBlock>

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
                  <Link to="/blog/altersvorsorge-portfolio" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                    <span>Wie sieht ein gutes Altersvorsorge-Portfolio aus?</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-16 p-5 bg-secondary rounded-xl">
                <p className="text-xs text-muted-foreground/70 italic leading-relaxed">
                  Alle Angaben basieren auf dem aktuellen Gesetzentwurf zur Reform der privaten Altersvorsorge (Drucksache 21/4088). Änderungen im Gesetzgebungsverfahren sind möglich. Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
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

export default BlogWasDarfInsDepot;
