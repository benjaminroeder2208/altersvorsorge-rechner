import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
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

/* ── articles ── */

const articles = [
  {
    slug: "/blog/altersvorsorge-portfolio",
    title: "Wie sieht ein gutes Altersvorsorge-Portfolio aus? Drei Beispiele für verschiedene Lebenssituationen",
    description: "ETF-Sparplan, Altersvorsorgedepot, bAV oder Rürup — was gehört in welchem Verhältnis in dein Portfolio? Drei konkrete Beispiele mit echten Zahlen.",
    readingTime: "9 Min.",
    tag: "Vorsorge-Strategien",
  },
  {
    slug: "/blog/altersvorsorgedepot-2027",
    title: "Altersvorsorgedepot 2027: Alles, was du wissen musst",
    description: "Das Altersvorsorgedepot kommt 2027 und löst Riester ab. Förderung, Funktionsweise, für wen es sich lohnt.",
    readingTime: "8 Min.",
    tag: "Altersvorsorgedepot",
  },
  {
    slug: "/blog/altersvorsorge-berufseinsteiger",
    title: "Altersvorsorge mit 20: Warum jetzt der beste Zeitpunkt ist",
    description: "Mit 20 fühlt sich die Rente abstrakt an. Aber kein Berufstätiger hat mehr Zeit als du gerade.",
    readingTime: "8 Min.",
    tag: "Vorsorge-Strategien",
  },
  {
    slug: "/blog/riester-kuendigen",
    title: "Riester kündigen: Wann es sich lohnt und was du verlierst",
    description: "Kündigen klingt verlockend — kostet aber fast immer mehr als es bringt.",
    readingTime: "8 Min.",
    tag: "Steuern & Recht",
  },
  {
    slug: "/blog/etf-sparplan-steuern",
    title: "ETF Sparplan Steuern: Was du wirklich zahlen musst",
    description: "Steuern können einen erheblichen Teil der ETF-Rendite auffressen — wenn man sie nicht versteht.",
    readingTime: "7 Min.",
    tag: "Steuern & Recht",
  },
  {
    slug: "/blog/rentenpunkte-kaufen",
    title: "Rentenpunkte kaufen: Lohnt es sich wirklich?",
    description: "Wer freiwillig in die gesetzliche Rente einzahlt, kann seine Rente erhöhen. Die Rendite-Rechnung ist ernüchternd.",
    readingTime: "7 Min.",
    tag: "Steuern & Recht",
  },
  {
    slug: "/blog/ruerup-rente",
    title: "Rürup Rente: Für wen sie sich wirklich lohnt",
    description: "Für Selbstständige und Gutverdiener das stärkste Steuersparinstrument. Für andere oft eine teure Falle.",
    readingTime: "8 Min.",
    tag: "Vorsorge-Strategien",
  },
  {
    slug: "/blog/altersvorsorgedepot-vs-riester",
    title: "Altersvorsorgedepot vs. Riester: Die wichtigsten Unterschiede",
    description: "Riester war die Hoffnung — das Altersvorsorgedepot ist der Neustart.",
    readingTime: "8 Min.",
    tag: "Vergleiche",
  },
  {
    slug: "/blog/zinseszins-frueh-starten",
    title: "Früh starten oder spät starten? Der Zinseszins-Effekt in Zahlen",
    description: "Warum 10 Jahre Unterschied über 100.000 € ausmachen können.",
    readingTime: "7 Min.",
    tag: "Vorsorge-Strategien",
  },
  {
    slug: "/blog/betriebliche-altersvorsorge",
    title: "Betriebliche Altersvorsorge (bAV): Lohnt sie sich wirklich?",
    description: "Die bAV ist oft der einfachste Weg zur Altersvorsorge — weil der Chef mitbezahlt.",
    readingTime: "7 Min.",
    tag: "Vorsorge-Strategien",
  },
  {
    slug: "/blog/altersvorsorge-selbststaendige",
    title: "Altersvorsorge für Selbstständige: Was wirklich funktioniert",
    description: "Selbstständige haben keine gesetzliche Rente. Wir zeigen alle Optionen.",
    readingTime: "8 Min.",
    tag: "Vorsorge-Strategien",
  },
  {
    slug: "/blog/rentenlucke-mit-30-40-50",
    title: "Rentenlücke mit 30, 40 oder 50: Was du jetzt noch tun kannst",
    description: "Drei konkrete Szenarien mit echten Zahlen.",
    readingTime: "8 Min.",
    tag: "Rentenlücke",
  },
  {
    slug: "/blog/altersvorsorgedepot-vs-etf-sparplan",
    title: "Altersvorsorgedepot oder ETF-Sparplan?",
    description: "Beide investieren in ETFs — aber nur einer wird staatlich gefördert.",
    readingTime: "7 Min.",
    tag: "Vergleiche",
  },
  {
    slug: "/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst",
    title: "Rentenlücke: Was sie ist und was du tun kannst",
    description: "Wie groß die Lücke wirklich ist — und wie du sie schließt.",
    readingTime: "8 Min.",
    tag: "Rentenlücke",
  },
];

const FEATURED_SLUG = "/blog/altersvorsorgedepot-2027";

const CATEGORIES = [
  "Alle",
  "Altersvorsorgedepot",
  "Rentenlücke",
  "Vergleiche",
  "Vorsorge-Strategien",
  "Steuern & Recht",
] as const;

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "Altersvorsorgedepot": { bg: "bg-[#EEF3FF]", text: "text-[#1B4FD8]" },
  "Rentenlücke": { bg: "bg-red-50", text: "text-red-600" },
  "Vergleiche": { bg: "bg-purple-50", text: "text-purple-600" },
  "Vorsorge-Strategien": { bg: "bg-green-50", text: "text-green-700" },
  "Steuern & Recht": { bg: "bg-amber-50", text: "text-amber-700" },
};

/* ── Featured illustration ── */

const FeaturedIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" className="w-full h-full opacity-30">
    <circle cx="120" cy="80" r="70" fill="white" opacity="0.08" />
    <circle cx="120" cy="80" r="50" fill="white" opacity="0.08" />
    <path
      d="M20 130 Q60 110 90 80 Q120 50 150 35 Q170 25 190 20"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M20 130 Q60 110 90 80 Q120 50 150 35 Q170 25 190 20 V160 H20 Z"
      fill="white"
      opacity="0.05"
    />
    <circle cx="90" cy="80" r="4" fill="#F59E0B" />
    <circle cx="140" cy="42" r="6" fill="#F59E0B" />
    <circle cx="180" cy="24" r="4" fill="#F59E0B" />
  </svg>
);

/* ── JSON-LD ── */

const jsonLd = [
  {
    "@type": "CollectionPage",
    name: "Blog – altersvorsorge-rechner.com",
    url: "https://altersvorsorge-rechner.com/blog",
    description: "Ratgeber und Analysen rund um das Altersvorsorgedepot, private Altersvorsorge und die Rentenreform 2027.",
    isPartOf: { "@type": "WebSite", url: "https://altersvorsorge-rechner.com/" },
  },
];

/* ── Component ── */

const BlogIndexPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>("Alle");

  const featured = articles.find((a) => a.slug === FEATURED_SLUG)!;

  const filteredArticles = articles.filter((a) => {
    if (a.slug === FEATURED_SLUG && (activeFilter === "Alle" || a.tag === activeFilter)) return false;
    if (activeFilter === "Alle") return true;
    return a.tag === activeFilter;
  });

  return (
    <>
      <PageHead
        title="Blog – Altersvorsorgedepot Ratgeber & Analysen"
        description="Ratgeber und Analysen rund um das Altersvorsorgedepot, private Altersvorsorge und die Rentenreform 2027."
        path="/blog"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container max-w-4xl mx-auto px-6">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
              Blog
            </h1>
            <p className="text-muted-foreground text-base mb-10">
              Ratgeber und Analysen rund um das Altersvorsorgedepot und die Rentenreform.
            </p>
          </AnimatedSection>

          {/* ── Featured Card ── */}
          <AnimatedSection delay={0.1}>
            <Link
              to={featured.slug}
              className="group block rounded-2xl bg-[#1B4FD8] p-8 md:p-10 mb-10 overflow-hidden relative"
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Text */}
                <div className="relative z-10 flex-1 min-w-0">
                  <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/15 text-white mb-4">
                    Featured
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-white/80 leading-relaxed mb-4 max-w-lg">
                    Das Altersvorsorgedepot kommt 2027 und löst Riester ab. Wir erklären, wie die Förderung funktioniert, was du bekommst — und für wen es sich wirklich lohnt.
                  </p>
                  <p className="text-xs text-white/60 mb-5">{featured.readingTime} Lesezeit</p>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1B4FD8] text-sm font-semibold group-hover:opacity-90 transition-opacity">
                    Artikel lesen <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                {/* Illustration */}
                <div className="hidden md:block w-[40%] flex-shrink-0">
                  <FeaturedIllustration />
                </div>
              </div>
            </Link>
          </AnimatedSection>

          {/* ── Category Filter ── */}
          <AnimatedSection delay={0.2}>
            <div className="flex gap-2 mb-10 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === cat
                      ? "bg-[#1B4FD8] text-white"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* ── Article List ── */}
          <AnimatedSection delay={0.3}>
            <div
              className="space-y-4 transition-opacity duration-150"
              style={{ opacity: filteredArticles.length > 0 ? 1 : 0.5 }}
            >
              {filteredArticles.length === 0 && (
                <p className="text-center text-muted-foreground py-12">
                  Keine Artikel in dieser Kategorie.
                </p>
              )}
              {filteredArticles.map((article) => {
                const colors = TAG_COLORS[article.tag] || { bg: "bg-primary/10", text: "text-primary" };
                return (
                  <Link
                    key={article.slug}
                    to={article.slug}
                    className="group block p-6 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                        {article.tag}
                      </span>
                      <span className="text-xs text-muted-foreground">{article.readingTime}</span>
                    </div>
                    <h2 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {article.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                      Weiterlesen <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default BlogIndexPage;
