import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import CalculatorPreview from "@/components/landing/CalculatorPreview";
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
      {
        "@type": "Question",
        name: "Wann wird der Rechner verfügbar sein?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Der auf dieser Seite dargestellte Rechner bietet bereits eine vereinfachte Simulation auf Basis des aktuellen Gesetzentwurfs. Sobald das Gesetz verabschiedet ist, werden die Berechnungen an die finalen Regelungen angepasst.",
        },
      },
    ],
  },
];

const RechnerPage = () => (
  <>
    <PageHead
      title="Altersvorsorgedepot Rechner – Simulation auf Basis des Gesetzentwurfs"
      description="Simulieren Sie Ihr mögliches Altersvorsorgedepot: Monatliche Beiträge, staatliche Förderung und Kapitalentwicklung berechnen – basierend auf dem aktuellen Gesetzentwurf."
      path="/"
      jsonLd={homepageJsonLd}
    />
    <Navbar />
    <main>
      <HeroSection />
      <CalculatorPreview />

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

      <FaqSection />
      <FooterSection />
    </main>
  </>
);

export default RechnerPage;
