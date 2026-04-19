import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import BlogDisclaimer from "@/components/blog/BlogDisclaimer";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
  { id: "offen", label: "Was seitdem passiert ist" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Ist das Gesetz beschlossen?",
    a: "Ja — der Bundestag hat das Altersvorsorgereformgesetz am 27. März 2026 verabschiedet. Das Altersvorsorgedepot startet am 1. Januar 2027.",
  },
  {
    q: "Können Selbstständige das Depot nutzen?",
    a: "Ja — Selbstständige und Freiberufler sind im beschlossenen Gesetz ausdrücklich als förderberechtigt aufgenommen (§ 10a Abs. 1 Satz 5 EStG).",
  },
  {
    q: "Ist der Rechner bereits aktualisiert?",
    a: "Ja — unser Rechner arbeitet mit den beschlossenen Förderzahlen (Grundzulage bis 540 €, Kinderzulage bis 300 €, Berufseinsteiger-Bonus 200 €).",
  },
  {
    q: "Was ändert sich bei der Kinderzulage?",
    a: "Die volle Kinderzulage von 300 Euro pro Kind und Jahr wird bereits ab 25 Euro Monatsbeitrag erreicht — statt der ursprünglich geplanten 100 Euro.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Koalitionseinigung: Das Altersvorsorgedepot wird besser als geplant",
    description:
      "Ampel-Koalition einigt sich auf Altersvorsorgedepot. Grundzulage €540/Jahr, Selbstständige förderberechtigt, ab 2027. Die wichtigsten Punkte.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-03-24",
    dateModified: "2026-04-01",
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

const SectionH2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2
    id={id}
    className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24"
    style={{ letterSpacing: "-0.02em" }}
  >
    {children}
  </h2>
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
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Koalitionseinigung</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-12">
            {/* ── Sidebar TOC (desktop) ── */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-28 self-start">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Inhalt</p>
              <nav className="space-y-1.5">
                {tocItems.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors leading-snug"
                  >
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
                <div
                  className="p-4 rounded-xl mb-8"
                  style={{ backgroundColor: "#FEF3C7", border: "1px solid #F59E0B" }}
                >
                  <p className="text-sm" style={{ color: "#92400E" }}>
                    <strong>Stand: 24. März 2026</strong> — Koalitionseinigung. Das Gesetz ist noch nicht formell
                    beschlossen. Abstimmung im Bundestag: 27. März 2026.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── Mobile TOC ── */}
              <Collapsible
                open={tocOpen}
                onOpenChange={setTocOpen}
                className="lg:hidden mb-8 border rounded-xl overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium bg-secondary">
                  Inhaltsverzeichnis{" "}
                  <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-3 space-y-2">
                  {tocItems.map((t) => (
                    <a
                      key={t.id}
                      href={`#${t.id}`}
                      className="block text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setTocOpen(false)}
                    >
                      {t.label}
                    </a>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* ── Einleitung ── */}
              <AnimatedSection delay={0.1}>
                <div className="prose-custom space-y-4">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Am 24. März 2026 haben sich CDU/CSU und SPD auf weitreichende Verbesserungen beim
                    Altersvorsorgedepot geeinigt. Die Abstimmung im Bundestag ist für den 26. März angesetzt. Ab dem 1.
                    Januar 2027 sollen die neuen Produkte zur Verfügung stehen.
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Die Einigung enthält mehrere wichtige Änderungen gegenüber dem ursprünglichen Referentenentwurf —
                    zugunsten der Sparer.
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
                  Die Förderstruktur ist inzwischen im beschlossenen Gesetz verankert und in unserem Rechner eingearbeitet.
                </p>
              </AnimatedSection>

              {/* ── 2. Höhere Grundzulage ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="grundzulage">Höhere Grundzulage</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Die Grundzulage steigt von 30 auf 50 Cent pro eingezahltem Euro. Das ist die bedeutendste Änderung
                    für alle Sparer.
                  </p>
                  <p>
                    Die Berechnungsstruktur ist im beschlossenen Gesetz festgelegt: 50 % auf Eigenbeiträge bis 360 €/Jahr (max. 180 €) und 25 % auf Beiträge zwischen 360 € und 1.800 €/Jahr (max. 360 €) — insgesamt bis zu 540 € Grundzulage pro Jahr.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── 3. Kinderzulage ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="kinderzulage">Kinderzulage schon ab 25 Euro im Monat</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Eine große Verbesserung für Familien: Die maximale Kinderzulage von 300 Euro pro Kind und Jahr wird
                    künftig bereits bei einem Eigenbeitrag von 25 Euro im Monat voll erreicht.
                  </p>
                  <p>
                    Im ursprünglichen Entwurf waren dafür 100 Euro monatlich nötig. Für Familien mit niedrigem Einkommen
                    ist das eine fundamentale Verbesserung.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── 4. Kostendeckel ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="kostendeckel">Kostendeckel auf 1 Prozent</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Der Effektivkostendeckel für zertifizierte Standardprodukte sinkt von 1,5 auf 1,0 Prozent pro Jahr.
                    Das schützt Sparer besser vor überteuerten Produkten.
                  </p>
                  <p>
                    Wichtig: Der Deckel gilt nur für das zertifizierte Standardprodukt — nicht für alle Depotangebote.
                    Wer selbst günstige ETFs auswählt, liegt ohnehin deutlich unter 1 Prozent.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── 5. Selbstständige ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="selbststaendige">Selbstständige erstmals förderberechtigt</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Das war die größte Überraschung der Einigung: Der ursprüngliche Entwurf schloss Selbstständige ohne
                    Rentenversicherungspflicht vollständig aus.
                  </p>
                  <p>
                    Die Koalition hat diese Einschränkung gestrichen. Alle Selbstständigen sollen künftig ein
                    Altersvorsorgedepot eröffnen und die staatliche Förderung nutzen können — Freiberufler, Unternehmer
                    und Künstler eingeschlossen.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── 6. Öffentliches Standarddepot ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="standarddepot">Öffentliches Standarddepot</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Ein öffentlicher Träger wird ein eigenes Standarddepot anbieten — transparent und kostengünstig. Das
                    Produkt soll denselben Kriterien entsprechen wie private Angebote und auch als Brücke zur geplanten
                    Frühstart-Rente für Kinder dienen.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── 7. Was seitdem passiert ist ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="offen">Was seitdem passiert ist</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Der Bundestag hat das Altersvorsorgereformgesetz am 27. März 2026 beschlossen — mit allen hier beschriebenen Verbesserungen. Unser Rechner ist bereits auf die beschlossenen Zahlen aktualisiert.</p>
                </div>
              </AnimatedSection>

              {/* ── Fazit ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="fazit">Fazit</SectionH2>
                <p className="text-muted-foreground">
                  Die Koalitionseinigung ist eine gute Nachricht für alle, die langfristig für das Alter vorsorgen
                  wollen. Höhere Zulagen, niedrigerer Kostendeckel, breiterer Zugang — das Depot wird attraktiver als
                  ursprünglich geplant. Der Start bleibt: 1. Januar 2027.
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

              <BlogDisclaimer />

              <div className="mt-8 text-center">
                {/* RELATED_ARTICLES_START */}
                <div className="mt-8 mb-4">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">📚 Verwandte Artikel</h3>
                  <div className="space-y-2">
                    <Link to="/blog/altersvorsorgedepot-beschlossen" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                      <span>Altersvorsorgedepot beschlossen: Was jetzt gilt</span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </Link>
                    <Link to="/blog/altersvorsorgedepot-2027" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                      <span>Altersvorsorgedepot 2027: Alles, was du wissen musst</span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </Link>
                    <Link to="/blog/was-darf-ins-altersvorsorgedepot" className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
                      <span>Was darf ins Altersvorsorgedepot?</span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </Link>
                  </div>
                </div>

                <Link
                  to="/altersvorsorgedepot"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  <ArrowRight className="w-4 h-4" />
                  Zum Altersvorsorgedepot Rechner
                </Link>
              </div>
            </article>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default BlogKoalitionseinigung;
