import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
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
const PATH = "/blog/altersvorsorgedepot-koalitionseinigung";

const tocItems = [
  { id: "aenderungen", label: "Die Änderungen im Überblick" },
  { id: "grundzulage", label: "Höhere Grundzulage" },
  { id: "kinderzulage", label: "Kinderzulage schon ab 25 €/Monat" },
  { id: "kostendeckel", label: "Kostendeckel auf 1 Prozent" },
  { id: "selbststaendige", label: "Selbstständige förderberechtigt" },
  { id: "standarddepot", label: "Öffentliches Standarddepot" },
  { id: "offen", label: "Was jetzt noch offen ist" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Wann wird das Gesetz beschlossen?",
    a: "Die Abstimmung im Bundestag ist für den 26. März 2026 angesetzt. Der Start des Altersvorsorgedepots bleibt der 1. Januar 2027.",
  },
  {
    q: "Können Selbstständige das Depot nutzen?",
    a: "Ja — laut Koalitionseinigung werden alle Selbstständigen förderberechtigt. Die genauen Details folgen nach dem offiziellen Beschluss.",
  },
  {
    q: "Wann aktualisiert ihr euren Rechner?",
    a: "Unmittelbar nach dem Bundestags-Beschluss am 26. März arbeiten wir die neuen Zahlen in unseren Rechner ein.",
  },
  {
    q: "Was ändert sich bei der Kinderzulage?",
    a: "Die volle Kinderzulage von 300 Euro pro Kind und Jahr wird künftig bereits ab 25 Euro Monatsbeitrag erreicht — statt bisher 100 Euro.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Koalitionseinigung: Das Altersvorsorgedepot wird besser als geplant",
    description: "CDU/CSU und SPD einigen sich auf verbesserte Konditionen beim Altersvorsorgedepot. Abstimmung im Bundestag am 26. März 2026.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-03-24",
    dateModified: "2026-03-24",
    author: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    isPartOf: { "@type": "WebSite", url: `${BASE}/` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: "Koalitionseinigung Altersvorsorgedepot", item: `${BASE}${PATH}` },
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

const BlogKoalitionseinigung = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Koalitionseinigung Altersvorsorgedepot: Höhere Zulagen, niedrigerer Kostendeckel, Selbstständige inklusive"
        description="CDU/CSU und SPD einigen sich auf verbesserte Konditionen beim Altersvorsorgedepot. Abstimmung im Bundestag am 26. März 2026. Alle bestätigten Änderungen im Überblick."
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
              <BreadcrumbItem><BreadcrumbPage>Koalitionseinigung</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-12">
            {/* ── Sidebar TOC (desktop) ── */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-28 self-start">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Inhalt</p>
              <nav className="space-y-1.5">
                {tocItems.map((t) => (
                  <a key={t.id} href={`#${t.id}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors leading-snug">
                    {t.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* ── Article ── */}
            <article className="min-w-0 max-w-2xl">
              <AnimatedSection>
                <p className="text-xs text-muted-foreground mb-3">24. März 2026 · 4 Min. Lesezeit</p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
                  Koalitionseinigung: Das Altersvorsorgedepot wird besser als geplant
                </h1>
              </AnimatedSection>

              {/* ── Hinweis-Box ── */}
              <AnimatedSection delay={0.05}>
                <div className="p-4 rounded-xl mb-8" style={{ backgroundColor: "#FEF3C7", border: "1px solid #F59E0B" }}>
                  <p className="text-sm" style={{ color: "#92400E" }}>
                    <strong>Stand: 24. März 2026</strong> — Koalitionseinigung. Das Gesetz ist noch nicht formell beschlossen. Abstimmung im Bundestag: 26. März 2026. Wir aktualisieren unseren Rechner und alle Zahlen unmittelbar nach dem Beschluss.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── Mobile TOC ── */}
              <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="lg:hidden mb-8 border rounded-xl overflow-hidden">
                <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium bg-secondary">
                  Inhaltsverzeichnis <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-3 space-y-2">
                  {tocItems.map((t) => (
                    <a key={t.id} href={`#${t.id}`} className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setTocOpen(false)}>
                      {t.label}
                    </a>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* ── Einleitung ── */}
              <AnimatedSection delay={0.1}>
                <div className="prose-custom space-y-4">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Am 24. März 2026 haben sich CDU/CSU und SPD auf weitreichende Verbesserungen beim Altersvorsorgedepot geeinigt. Die Abstimmung im Bundestag ist für den 26. März angesetzt. Ab dem 1. Januar 2027 sollen die neuen Produkte zur Verfügung stehen.
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Die Einigung enthält mehrere wichtige Änderungen gegenüber dem ursprünglichen Referentenentwurf — zugunsten der Sparer.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── 1. Änderungen im Überblick ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="aenderungen">Die Änderungen im Überblick</SectionH2>
                <p className="text-muted-foreground mb-6">
                  Die folgende Tabelle zeigt die bestätigten Änderungen gegenüber dem ursprünglichen Referentenentwurf:
                </p>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 pr-4 font-semibold">Merkmal</th>
                        <th className="text-left py-3 pr-4 font-semibold">Erster Entwurf</th>
                        <th className="text-left py-3 font-semibold">Nach Einigung</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">Grundzulage</td>
                        <td className="py-3 pr-4">30 Cent/€</td>
                        <td className="py-3 font-medium text-foreground">50 Cent/€</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">Kinderzulage voll ab</td>
                        <td className="py-3 pr-4">100 €/Monat</td>
                        <td className="py-3 font-medium text-foreground">25 €/Monat</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">Kostendeckel Standard</td>
                        <td className="py-3 pr-4">1,5 %</td>
                        <td className="py-3 font-medium text-foreground">1,0 %</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">Selbstständige</td>
                        <td className="py-3 pr-4">Ausgeschlossen</td>
                        <td className="py-3 font-medium text-foreground">Förderberechtigt</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4">Öffentl. Standarddepot</td>
                        <td className="py-3 pr-4">Nicht vorgesehen</td>
                        <td className="py-3 font-medium text-foreground">Kommt</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-muted-foreground">
                  Die genaue Berechnung der neuen Förderstruktur werden wir nach dem offiziellen Gesetzestext vom 26. März hier veröffentlichen und in unseren Rechner einarbeiten.
                </p>
              </AnimatedSection>

              {/* ── 2. Höhere Grundzulage ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="grundzulage">Höhere Grundzulage</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Die Grundzulage steigt von 30 auf 50 Cent pro eingezahltem Euro. Das ist die bedeutendste Änderung für alle Sparer.
                  </p>
                  <p>
                    Die genaue Berechnungsstruktur — also auf welche Beitragsanteile welcher Satz gilt — werden wir nach dem offiziellen Beschluss transparent aufschlüsseln und in unseren Rechner einarbeiten.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── 3. Kinderzulage ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="kinderzulage">Kinderzulage schon ab 25 Euro im Monat</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Eine große Verbesserung für Familien: Die maximale Kinderzulage von 300 Euro pro Kind und Jahr wird künftig bereits bei einem Eigenbeitrag von 25 Euro im Monat voll erreicht.
                  </p>
                  <p>
                    Im ursprünglichen Entwurf waren dafür 100 Euro monatlich nötig. Für Familien mit niedrigem Einkommen ist das eine fundamentale Verbesserung.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── 4. Kostendeckel ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="kostendeckel">Kostendeckel auf 1 Prozent</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Der Effektivkostendeckel für zertifizierte Standardprodukte sinkt von 1,5 auf 1,0 Prozent pro Jahr. Das schützt Sparer besser vor überteuerten Produkten.
                  </p>
                  <p>
                    Wichtig: Der Deckel gilt nur für das zertifizierte Standardprodukt — nicht für alle Depotangebote. Wer selbst günstige ETFs auswählt, liegt ohnehin deutlich unter 1 Prozent.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── 5. Selbstständige ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="selbststaendige">Selbstständige erstmals förderberechtigt</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Das war die größte Überraschung der Einigung: Der ursprüngliche Entwurf schloss Selbstständige ohne Rentenversicherungspflicht vollständig aus.
                  </p>
                  <p>
                    Die Koalition hat diese Einschränkung gestrichen. Alle Selbstständigen sollen künftig ein Altersvorsorgedepot eröffnen und die staatliche Förderung nutzen können — Freiberufler, Unternehmer und Künstler eingeschlossen.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── 6. Öffentliches Standarddepot ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="standarddepot">Öffentliches Standarddepot</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Ein öffentlicher Träger wird ein eigenes Standarddepot anbieten — transparent und kostengünstig. Das Produkt soll denselben Kriterien entsprechen wie private Angebote und auch als Brücke zur geplanten Frühstart-Rente für Kinder dienen.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── 7. Was jetzt noch offen ist ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="offen">Was jetzt noch offen ist</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Die Abstimmung im Bundestag findet am 26. März 2026 statt. Danach folgt noch der Bundesrat.
                  </p>
                  <p>Wir werden nach dem offiziellen Beschluss:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Die genaue neue Förderberechnung veröffentlichen</li>
                    <li>Unseren Rechner aktualisieren</li>
                    <li>Alle Zahlen auf dieser Seite anpassen</li>
                  </ul>
                </div>
              </AnimatedSection>

              {/* ── Fazit ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="fazit">Fazit</SectionH2>
                <p className="text-muted-foreground">
                  Die Koalitionseinigung ist eine gute Nachricht für alle, die langfristig für das Alter vorsorgen wollen. Höhere Zulagen, niedrigerer Kostendeckel, breiterer Zugang — das Depot wird attraktiver als ursprünglich geplant. Der Start bleibt: 1. Januar 2027.
                </p>
              </AnimatedSection>

              {/* ── FAQ ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="faq">Häufige Fragen</SectionH2>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-sm font-medium">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AnimatedSection>

              {/* ── Weiterführende Artikel ── */}
              <div className="mt-12">
                <p className="text-sm font-semibold mb-4">Weiterführende Artikel</p>
                <div className="space-y-2">
                  {[
                    { to: "/blog/altersvorsorgedepot-2027", label: "Altersvorsorgedepot 2027: Alles, was du wissen musst" },
                    { to: "/blog/altersvorsorge-selbststaendige", label: "Altersvorsorge für Selbstständige: Was wirklich funktioniert" },
                    { to: "/blog/altersvorsorgedepot-vs-etf-sparplan", label: "Altersvorsorgedepot oder ETF-Sparplan?" },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* ── Disclaimer ── */}
              <p className="mt-12 text-xs text-muted-foreground/60 leading-relaxed">
                Dieser Artikel basiert auf der Koalitionseinigung vom 24. März 2026. Das Gesetz ist noch nicht formell beschlossen. Alle Angaben ohne Gewähr und vorbehaltlich des endgültigen Gesetzesbeschlusses. Keine Anlageberatung.
              </p>
            </article>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default BlogKoalitionseinigung;
