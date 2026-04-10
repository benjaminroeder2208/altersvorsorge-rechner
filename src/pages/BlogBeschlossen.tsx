import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import BlogDisclaimer from "@/components/blog/BlogDisclaimer";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/blog/altersvorsorgedepot-beschlossen";

const tocItems = [
  { id: "beschlossen", label: "Das hat der Bundestag beschlossen" },
  { id: "grundzulage", label: "Die neue Grundzulage im Detail" },
  { id: "kinderzulage", label: "Kinderzulage: Volle 300 € schon ab 25 €/Monat" },
  { id: "selbststaendige", label: "Selbstständige: Erstmals förderberechtigt" },
  { id: "unveraendert", label: "Was bleibt wie geplant" },
  { id: "faq", label: "Häufige Fragen" },
];

const faqItems = [
  {
    q: "Wann kann ich das Depot eröffnen?",
    a: "Ab dem 1. Januar 2027. Anbieter werden ihre Produkte voraussichtlich im Laufe des zweiten Halbjahrs 2026 zur Zertifizierung einreichen.",
  },
  {
    q: "Wie hoch ist meine Förderung?",
    a: "Das hängt von deinem Monatsbeitrag und der Anzahl deiner Kinder ab. Unser Rechner berechnet es in 30 Sekunden.",
  },
  {
    q: "Können Selbstständige das Depot nutzen?",
    a: "Ja — der Bundestag hat Selbstständige und Freiberufler ausdrücklich in den Förderkreis aufgenommen.",
  },
  {
    q: "Was passiert mit meinem Riester-Vertrag?",
    a: "Bestehende Riester-Verträge können mit der bisherigen Förderung weitergeführt werden. Optional ist ein Wechsel in die neue Förderung möglich.",
  },
];

const jsonLd = [
  {
    "@type": "Article",
    headline: "Altersvorsorgedepot beschlossen: Was jetzt gilt",
    description: "Der Bundestag hat das Altersvorsorgereformgesetz am 27. März 2026 verabschiedet. Die neuen Förderregeln, was sich geändert hat und was das für dich bedeutet.",
    url: `${BASE}${PATH}`,
    datePublished: "2026-03-27",
    dateModified: "2026-03-27",
    author: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    publisher: { "@type": "Organization", name: "altersvorsorge-rechner.com" },
    isPartOf: { "@type": "WebSite", url: `${BASE}/` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: "Altersvorsorgedepot beschlossen", item: `${BASE}${PATH}` },
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
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ letterSpacing: "-0.02em" }}>{children}</h2>
);

const BlogBeschlossen = () => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <PageHead
        title="Altersvorsorgedepot beschlossen: Die neuen Förderregeln ab 2027"
        description="Der Bundestag hat das Altersvorsorgereformgesetz am 27. März 2026 verabschiedet. Neue Grundzulage, neue Kinderzulage, Selbstständige inklusive."
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
              <BreadcrumbItem><BreadcrumbPage>Altersvorsorgedepot beschlossen</BreadcrumbPage></BreadcrumbItem>
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
                <p className="text-xs text-muted-foreground mb-3">27. März 2026 · 5 Min. Lesezeit</p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
                  Altersvorsorgedepot beschlossen: Was jetzt gilt
                </h1>
              </AnimatedSection>

              {/* ── Einleitung ── */}
              <AnimatedSection delay={0.05}>
                <div className="prose-custom space-y-4">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Der Bundestag hat heute, am 27. März 2026, das Altersvorsorgereformgesetz verabschiedet. Ab dem 1. Januar 2027 können Bürgerinnen und Bürger ein gefördertes Altersvorsorgedepot eröffnen. Die Förderstruktur ist gegenüber dem ursprünglichen Referentenentwurf deutlich verbessert worden.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── Grüne Info-Box ── */}
              <AnimatedSection delay={0.1}>
                <div className="p-5 rounded-xl mb-8 mt-6 bg-emerald-50 border border-emerald-500">
                  <p className="text-sm text-emerald-900 mb-3">
                    ✅ Unser Rechner ist bereits auf die beschlossenen Zahlen aktualisiert. Berechne jetzt deine persönliche Förderung.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Jetzt berechnen
                  </Link>
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

              {/* ── Das hat der Bundestag beschlossen ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="beschlossen">Das hat der Bundestag beschlossen</SectionH2>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 pr-4 font-semibold">Merkmal</th>
                        <th className="text-left py-3 pr-4 font-semibold">Referentenentwurf</th>
                        <th className="text-left py-3 font-semibold">Beschlossenes Gesetz</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">Grundzulage T1</td>
                        <td className="py-3 pr-4">30 % auf bis 1.200 €</td>
                        <td className="py-3 font-medium text-foreground">50 % auf bis 360 €</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">Grundzulage T2</td>
                        <td className="py-3 pr-4">20 % auf 1.200–1.800 €</td>
                        <td className="py-3 font-medium text-foreground">25 % auf 360–1.800 €</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">Max. Grundzulage</td>
                        <td className="py-3 pr-4">480 €/Jahr</td>
                        <td className="py-3 font-medium text-foreground">540 €/Jahr</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">Kinderzulage</td>
                        <td className="py-3 pr-4">25 % der Beiträge</td>
                        <td className="py-3 font-medium text-foreground">100 % der Beiträge</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">Kinderzulage voll ab</td>
                        <td className="py-3 pr-4">100 €/Monat</td>
                        <td className="py-3 font-medium text-foreground">25 €/Monat</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">Selbstständige</td>
                        <td className="py-3 pr-4">Ausgeschlossen</td>
                        <td className="py-3 font-medium text-foreground">Förderberechtigt</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">Kostendeckel Standard</td>
                        <td className="py-3 pr-4">1,0 %</td>
                        <td className="py-3 font-medium text-foreground">1,0 %</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4">Start</td>
                        <td className="py-3 pr-4">1. Januar 2027</td>
                        <td className="py-3 font-medium text-foreground">1. Januar 2027</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AnimatedSection>

              {/* ── Grundzulage im Detail ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="grundzulage">Die neue Grundzulage im Detail</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Die Grundzulage funktioniert nach einer neuen Systematik mit zwei Tranchen:
                  </p>
                  <p>
                    <strong className="text-foreground">Tranche 1:</strong> 50 % auf die ersten 360 € Eigenbeitrag pro Jahr → max. 180 € Zulage.
                  </p>
                  <p>
                    <strong className="text-foreground">Tranche 2:</strong> 25 % auf Eigenbeiträge zwischen 360 € und 1.800 € pro Jahr → max. 360 € Zulage.
                  </p>
                  <p>
                    Zusammen: Wer 1.800 € pro Jahr (150 €/Monat) einzahlt, erhält die volle Grundzulage von 540 €.
                  </p>
                </div>
                <div className="overflow-x-auto mt-6 mb-6">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 pr-4 font-semibold">Monatsbeitrag</th>
                        <th className="text-left py-3 pr-4 font-semibold">Jahresbeitrag</th>
                        <th className="text-left py-3 font-semibold">Grundzulage</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">10 €</td>
                        <td className="py-3 pr-4">120 €</td>
                        <td className="py-3 font-medium text-foreground">60 €</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">25 €</td>
                        <td className="py-3 pr-4">300 €</td>
                        <td className="py-3 font-medium text-foreground">150 €</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">50 €</td>
                        <td className="py-3 pr-4">600 €</td>
                        <td className="py-3 font-medium text-foreground">210 €</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 pr-4">100 €</td>
                        <td className="py-3 pr-4">1.200 €</td>
                        <td className="py-3 font-medium text-foreground">390 €</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4">150 €</td>
                        <td className="py-3 pr-4">1.800 €</td>
                        <td className="py-3 font-medium text-foreground">540 €</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AnimatedSection>

              {/* ── Kinderzulage ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="kinderzulage">Kinderzulage: Volle 300 € schon ab 25 € im Monat</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Die Kinderzulage wurde fundamental verbessert: Sie beträgt jetzt 100 % der Eigenbeiträge — bis zu 300 € pro Kind und Jahr.
                  </p>
                  <p>
                    Das bedeutet: Die volle Kinderzulage von 300 € wird bereits bei einem Eigenbeitrag von 300 €/Jahr (25 €/Monat) erreicht. Im ursprünglichen Entwurf waren dafür 100 €/Monat nötig.
                  </p>
                  <p>
                    <strong className="text-foreground">Beispiel Familie mit zwei Kindern, 25 €/Monat:</strong>
                  </p>
                  <p>
                    Grundzulage: 150 € + Kinderzulage: 2 × 150 € = 300 € → Gesamtförderung: 450 € bei nur 300 € Eigenbeitrag.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── Selbstständige ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="selbststaendige">Selbstständige: Erstmals förderberechtigt</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Eine der wichtigsten Änderungen gegenüber dem Referentenentwurf: Selbstständige sind nun förderberechtigt. Der Bundestag hat den Förderkreis auf Personen ausgeweitet, die Einkünfte aus selbstständiger oder freiberuflicher Tätigkeit erzielen und eine Steuererklärung abgeben.
                  </p>
                  <p>
                    Das Altersvorsorgedepot wird damit zum ersten staatlich geförderten Altersvorsorgeprodukt, das Selbstständigen ohne Umwege offensteht.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── Was bleibt wie geplant ── */}
              <AnimatedSection delay={0.15}>
                <SectionH2 id="unveraendert">Was bleibt wie geplant</SectionH2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Folgende Punkte sind gegenüber dem Referentenentwurf unverändert geblieben:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Start: 1. Januar 2027</li>
                    <li>Kein Garantiezwang — vollständige ETF-Investition möglich</li>
                    <li>Mindesteigenbeitrag: 120 €/Jahr</li>
                    <li>Maximaler geförderter Eigenbeitrag: 1.800 €/Jahr</li>
                    <li>Auszahlung frühestens ab 65 Jahren</li>
                    <li>30 % Einmalentnahme zu Beginn möglich</li>
                    <li>Besteuerung nachgelagert im Alter</li>
                    <li>Berufseinsteiger-Bonus: +200 € einmalig für unter 25-Jährige</li>
                    <li>Kostendeckel Standardprodukt: 1,0 %</li>
                  </ul>
                </div>
              </AnimatedSection>

              {/* ── CTA-Box ── */}
              <AnimatedSection delay={0.15}>
                <div className="p-8 rounded-2xl mt-14 mb-10 bg-[#1B4FD8] text-white text-center">
                  <p className="text-lg font-semibold mb-2">
                    Berechne jetzt deine persönliche Förderung
                  </p>
                  <p className="text-sm text-white/80 mb-5">
                    Unser Rechner ist bereits auf die beschlossenen Zahlen aktualisiert.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#1B4FD8] text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Jetzt berechnen
                  </Link>
                </div>
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
              <AnimatedSection delay={0.15}>
                <h2 className="text-xl font-bold mt-14 mb-4">Weiterführende Artikel</h2>
                <div className="space-y-2">
                  <Link to="/blog/altersvorsorgedepot-2027" className="block text-sm text-primary hover:underline">
                    → Altersvorsorgedepot 2027: Alles was du wissen musst
                  </Link>
                  <Link to="/blog/altersvorsorgedepot-koalitionseinigung" className="block text-sm text-primary hover:underline">
                    → Koalitionseinigung: Was sich geändert hat
                  </Link>
                  <Link to="/blog/altersvorsorge-selbststaendige" className="block text-sm text-primary hover:underline">
                    → Altersvorsorge für Selbstständige
                  </Link>
                  <Link to="/blog/altersvorsorgedepot-vs-etf-sparplan" className="block text-sm text-primary hover:underline">
                    → Altersvorsorgedepot vs. ETF-Sparplan
                  </Link>
                </div>
              </AnimatedSection>

              <BlogDisclaimer />
            </article>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default BlogBeschlossen;
