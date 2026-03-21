import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import CalculatorPreview from "@/components/landing/CalculatorPreview";
import KeyFiguresSection from "@/components/landing/KeyFiguresSection";
import FaqSection from "@/components/landing/FaqSection";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const topicLinks = [
  { to: "/altersvorsorgedepot", label: "Was ist das Altersvorsorgedepot?", desc: "Grundlagen und Funktionsweise des geplanten Altersvorsorgedepots." },
  { to: "/altersvorsorgedepot-foerderung", label: "Staatliche Förderung", desc: "Grundzulage, Kinderzulage und Steuervorteile im Überblick." },
  { to: "/altersvorsorgedepot-auszahlung", label: "Auszahlung im Alter", desc: "Wie die Entnahme im Ruhestand funktionieren soll." },
  { to: "/altersvorsorgedepot-vs-etf-sparplan", label: "Vergleich mit ETF-Sparplan", desc: "Förderung vs. Flexibilität — was passt besser?" },
  { to: "/altersvorsorgedepot-vs-riester", label: "Vergleich mit Riester", desc: "Die wichtigsten Unterschiede zum bisherigen Riester-Modell." },
];

const homepageJsonLd = [
  {
    "@type": "WebSite",
    name: "altersvorsorge-rechner.com",
    url: "https://altersvorsorge-rechner.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://altersvorsorge-rechner.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@type": "WebPage",
    name: "Altersvorsorgedepot Rechner",
    url: "https://altersvorsorge-rechner.com/",
    description: "Rechner zur Simulation eines möglichen Altersvorsorgedepots auf Basis des aktuellen Gesetzentwurfs.",
  },
  {
    "@type": "SoftwareApplication",
    name: "Altersvorsorgedepot Rechner",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://altersvorsorge-rechner.com/",
    description: "Interaktiver Rechner zur Simulation eines Altersvorsorgedepots auf Basis des aktuellen Gesetzentwurfs.",
    featureList: [
      "Simulation monatlicher Beiträge",
      "Berücksichtigung staatlicher Förderung",
      "Schätzung der Kapitalentwicklung",
      "Schätzung der Auszahlungsphase",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  },
  {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Was ist das Altersvorsorgedepot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Das Altersvorsorgedepot ist ein im aktuellen Gesetzentwurf vorgesehenes Modell für die private Altersvorsorge. Es ermöglicht renditeorientierte Investitionen in Fonds oder ETFs — ohne die bisher bei Riester-Produkten übliche Beitragsgarantie. Die Beiträge werden staatlich gefördert.",
        },
      },
      {
        "@type": "Question",
        name: "Ist das Gesetz bereits beschlossen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nein. Der Gesetzentwurf befindet sich noch im parlamentarischen Verfahren. Alle auf dieser Seite dargestellten Informationen basieren auf dem aktuellen Entwurf und können sich im Laufe des Gesetzgebungsprozesses ändern.",
        },
      },
      {
        "@type": "Question",
        name: "Was unterscheidet das Altersvorsorgedepot von Riester?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Der wichtigste Unterschied: Beim Altersvorsorgedepot entfällt die verpflichtende Beitragsgarantie. Dadurch können die Beiträge vollständig am Kapitalmarkt angelegt werden, was langfristig höhere Renditechancen ermöglicht. Zudem soll die Förderstruktur vereinfacht und die Kosten durch einen Effektivkostendeckel begrenzt werden.",
        },
      },
      {
        "@type": "Question",
        name: "Wer kann geförderte Beiträge leisten?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die genauen Fördervoraussetzungen werden im finalen Gesetz festgelegt. Der aktuelle Entwurf sieht eine breite Zugänglichkeit vor, ähnlich dem bisherigen Riester-System. Grundsätzlich sollen rentenversicherungspflichtig Beschäftigte und weitere Personengruppen förderberechtigt sein.",
        },
      },
      {
        "@type": "Question",
        name: "Wie hoch ist die maximale Förderung?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die Grundzulage beträgt im Entwurf bis zu 35 % auf Eigenbeiträge bis 1.200 € und 20 % auf Beiträge zwischen 1.200 € und 1.800 €. Für jedes Kind gibt es zusätzlich bis zu 300 € pro Jahr. Dazu kommt ein möglicher Steuervorteil durch den Sonderausgabenabzug.",
        },
      },
      {
        "@type": "Question",
        name: "Was passiert mit dem Geld bei schlechter Marktentwicklung?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Da keine Beitragsgarantie vorgesehen ist, kann der Depotwert zwischenzeitlich auch unter die Summe der eingezahlten Beiträge fallen. Bei langfristiger Anlage über 20 oder mehr Jahre haben breit gestreute Aktienportfolios historisch betrachtet positive Renditen erzielt — eine Garantie dafür gibt es allerdings nicht.",
        },
      },
    ],
  },
  {
    "@type": "Organization",
    name: "altersvorsorge-rechner.com",
    url: "https://altersvorsorge-rechner.com",
    description: "Unabhängiges Team aus Finanz- und Technik-Enthusiasten. Kostenlose, werbefreie Tools und Ratgeber rund um Altersvorsorge in Deutschland.",
    foundingDate: "2026",
    areaServed: "DE",
    inLanguage: "de",
  },
];

const RechnerPage = () => (
  <>
    <PageHead
      title="Altersvorsorgedepot Rechner – Altersvorsorge einfach berechnen"
      description="Mit dem Altersvorsorgedepot Rechner simulieren Sie, wie sich monatliche Beiträge, staatliche Förderung und Rendite langfristig entwickeln könnten – auf Basis des aktuellen Gesetzentwurfs."
      path="/"
      ogTitle="Altersvorsorgedepot Rechner – Altersvorsorge einfach berechnen"
      ogDescription="Interaktiver Rechner zur Simulation eines möglichen Altersvorsorgedepots auf Basis des aktuellen Gesetzentwurfs."
      jsonLd={homepageJsonLd}
    />
    <Navbar />
    <main>
      <HeroSection />
      <CalculatorPreview />

      {/* Comparison table */}
      <section className="section-padding bg-secondary">
        <div className="container max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Früh starten lohnt sich — in Zahlen</h2>
            <p className="text-muted-foreground mt-2">Was 10 Jahre Unterschied wirklich bedeuten</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm border-collapse min-w-[480px]">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground" />
                    <th className="py-3 px-4 font-semibold text-primary-foreground bg-primary rounded-t-xl text-center">Mit 25 starten</th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground text-center">Mit 35 starten</th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground text-center">Mit 45 starten</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Monatlicher Beitrag", values: ["150 €", "150 €", "150 €"] },
                    { label: "Ansparzeit bis 67", values: ["42 Jahre", "32 Jahre", "22 Jahre"] },
                    { label: "Eingezahltes Kapital", values: ["75.600 €", "57.600 €", "39.600 €"] },
                    { label: "Kapital mit 67 (7 % p.a.)", values: ["~538.000 €", "~255.000 €", "~113.000 €"] },
                    { label: "Monatliche Zusatzrente", values: ["~2.490 €", "~1.183 €", "~523 €"] },
                  ].map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-background" : ""}>
                      <td className="py-3 px-4 font-medium text-muted-foreground">{row.label}</td>
                      <td className="py-3 px-4 text-center font-semibold bg-primary/5 tabular-nums">{row.values[0]}</td>
                      <td className="py-3 px-4 text-center tabular-nums">{row.values[1]}</td>
                      <td className="py-3 px-4 text-center tabular-nums">{row.values[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <Link
                to="/"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
              >
                Meine persönlichen Zahlen berechnen <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-xs text-muted-foreground/60 text-center mt-6 max-w-md mx-auto leading-relaxed">
              Berechnung bei 7 % Rendite p.a., vereinfacht ohne Inflation und Kosten. Keine Anlageberatung.
            </p>
          </AnimatedSection>
        </div>
      </section>
      <section id="mehr" className="section-padding">
        <div className="container max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Mehr zum Altersvorsorgedepot</h2>
            <p className="text-muted-foreground mt-2">Vertiefen Sie Ihr Wissen rund um das geplante Altersvorsorgedepot.</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-4">
              {topicLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-sm mb-1">{link.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{link.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Unsere Ratgeber */}
      <section className="section-padding">
        <div className="container max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Unsere Ratgeber</h2>
            <p className="text-muted-foreground mt-2">Fundierte Artikel rund um Altersvorsorge und Rente.</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/blog/altersvorsorgedepot-2027" className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors">
                <div>
                  <p className="font-semibold text-sm mb-1">Altersvorsorgedepot 2027 erklärt</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Alles zum neuen Altersvorsorgedepot: Förderung, Funktionsweise, Start 2027.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
              </Link>
              <Link to="/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst" className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors">
                <div>
                  <p className="font-semibold text-sm mb-1">Was ist die Rentenlücke?</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Wie groß die Lücke wirklich ist — und was du dagegen tun kannst.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
              </Link>
              <Link to="/rentenluecken-rechner" className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors">
                <div>
                  <p className="font-semibold text-sm mb-1">Rentenlückenrechner</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Berechne deine persönliche Rentenlücke in 30 Sekunden.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
              </Link>
              <Link to="/blog" className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors">
                <div>
                  <p className="font-semibold text-sm mb-1">Alle Ratgeber →</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Alle Artikel zu Altersvorsorge, Rente und Förderung.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FaqSection />
      <FooterSection />
    </main>
  </>
);

export default RechnerPage;
