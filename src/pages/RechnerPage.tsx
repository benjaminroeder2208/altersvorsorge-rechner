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
import { HeroPersonaProvider } from "@/components/landing/heroPersonas";
import TrustSection from "@/components/landing/TrustSection";
import EditorialSections from "@/components/landing/EditorialSections";

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
    description:
      "Rechner zur Simulation eines Altersvorsorgedepots auf Basis des beschlossenen Altersvorsorgereformgesetzes.",
  },
  {
    "@type": "SoftwareApplication",
    name: "Altersvorsorgedepot Rechner",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://altersvorsorge-rechner.com/",
    description:
      "Interaktiver Rechner zur Simulation eines Altersvorsorgedepots auf Basis des beschlossenen Altersvorsorgereformgesetzes.",
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
          text: "Das Altersvorsorgedepot ist ein vom Bundestag am 27. März 2026 beschlossenes Modell für die private Altersvorsorge. Es ermöglicht renditeorientierte Investitionen in Fonds oder ETFs — ohne die bisher bei Riester-Produkten übliche Beitragsgarantie. Die Beiträge werden staatlich gefördert.",
        },
      },
      {
        "@type": "Question",
        name: "Ist das Gesetz bereits beschlossen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja. Der Bundestag hat das Altersvorsorgereformgesetz am 27. März 2026 beschlossen. Das Altersvorsorgedepot startet am 1. Januar 2027.",
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
          text: "Der Förderkreis umfasst rentenversicherungspflichtig Beschäftigte, Beamte sowie Selbstständige und Freiberufler. Der Bundestag hat den Förderkreis ausdrücklich auf Personen mit Einkünften aus selbstständiger oder freiberuflicher Tätigkeit ausgeweitet.",
        },
      },
      {
        "@type": "Question",
        name: "Wie hoch ist die maximale Förderung?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die Grundzulage beträgt 50 % auf Eigenbeiträge bis 360 € und 25 % auf Beiträge zwischen 360 € und 1.800 € — maximal 540 € pro Jahr, bereits ab 2027. Für jedes Kind gibt es zusätzlich bis zu 300 € pro Jahr. Dazu kommt ein möglicher Steuervorteil durch den Sonderausgabenabzug.",
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
    description:
      "Unabhängiges Team aus Finanz- und Technik-Enthusiasten. Kostenlose, werbefreie Tools und Ratgeber rund um Altersvorsorge in Deutschland.",
    foundingDate: "2026",
    areaServed: "DE",
    inLanguage: "de",
  },
];

const RechnerPage = () => (
  <HeroPersonaProvider>
    <PageHead
      title="Altersvorsorgedepot Rechner – Altersvorsorge einfach berechnen"
      description="Berechnen Sie mit dem Altersvorsorgedepot Rechner, wie sich Beiträge, Förderung und Rendite langfristig entwickeln – nach dem neuen Reformgesetz."
      path="/"
      ogTitle="Altersvorsorgedepot Rechner – Altersvorsorge einfach berechnen"
      ogDescription="Interaktiver Rechner zur Simulation eines Altersvorsorgedepots auf Basis des beschlossenen Altersvorsorgereformgesetzes."
      jsonLd={homepageJsonLd}
    />
    <Navbar />
    <main className="overflow-x-clip">
      <HeroSection />
      <KeyFiguresSection />
      <CalculatorPreview />
      <TrustSection />


      {/* SEO: Altersvorsorgedepot — Riester vs. Depot Vergleich */}
      <section id="riester-vs-depot" className="section-padding">
        <div className="container max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold ">
              Altersvorsorgedepot vs. Riester — der direkte Vergleich
            </h2>
            <p className="text-muted-foreground mt-2">
              Was das neue Altersvorsorgedepot ab 2027 anders macht — und für wen sich der Wechsel lohnen kann.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm border-collapse min-w-[560px]">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground" />
                    <th className="py-3 px-4 font-semibold text-center text-muted-foreground">Riester-Rente</th>
                    <th
                      className="py-3 px-4 font-semibold text-center bg-primary text-primary-foreground"
                      style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                    >
                      Altersvorsorgedepot
                      <br />
                      <span className="text-xs font-normal opacity-80">ab 2027</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Beitragsgarantie", r: "100 % der eingezahlten Beiträge", d: "Keine — volle Aktien-/ETF-Quote möglich" },
                    { label: "Grundzulage", r: "175 € / Jahr (fix)", d: "50 % bis 360 € + 25 % bis 1.800 € — max. 540 €" },
                    { label: "Kinderzulage", r: "300 € pro Kind (ab 2008)", d: "100 % der Eigenbeiträge — max. 300 € pro Kind" },
                    { label: "Berufseinsteiger-Bonus", r: "200 € einmalig (unter 25)", d: "200 € einmalig (unter 25)" },
                    { label: "Anlageform", r: "Versicherung, Banksparplan, Fondssparplan, Wohn-Riester", d: "Wertpapier-Depot (ETFs, Fonds, Aktien)" },
                    { label: "Kostendeckel", r: "Kein gesetzlicher Deckel", d: "Max. 1,0 % p.a. (nur Standardprodukt)" },
                    { label: "Antrag", r: "Über Anbieter, jährlich", d: "Automatisch — kein Zulagenantrag nötig" },
                    { label: "Auszahlung", r: "Lebenslange Rente, 30 % Einmalentnahme möglich", d: "Rente ab 65–70, bis 30 % als Einmalentnahme" },
                    { label: "Besteuerung", r: "Voll nachgelagert", d: "Voll nachgelagert" },
                    { label: "Neuabschluss", r: "Ab 2027 nicht mehr förderfähig", d: "Start: 1. Januar 2027" },
                  ].map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-secondary" : ""}>
                      <td className="py-3 px-4 font-medium text-muted-foreground align-top">{row.label}</td>
                      <td className="py-3 px-4 text-center text-muted-foreground align-top">{row.r}</td>
                      <td className="py-3 px-4 text-center align-top font-medium bg-primary-soft text-primary-soft-foreground">
                        {row.d}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <Link
                to="#rechner"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("rechner")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
              >
                Förderung im Altersvorsorgedepot berechnen <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-6 p-5 bg-muted/50 border border-border/60 rounded-lg text-center">
              <p className="text-xs text-disclaimer-foreground leading-relaxed">
                Quelle: Altersvorsorgereformgesetz, Beschlussempfehlung Drs. 21/4996 (beschlossen 27.03.2026), §§ 84, 85 EStG (neue Fassung). Bestehende Riester-Verträge laufen unverändert weiter — eine voreilige Kündigung ist meist nicht sinnvoll. Keine Anlage-, Steuer- oder Rechtsberatung.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <EditorialSections />
      <FaqSection />
      <FooterSection />
    </main>
  </HeroPersonaProvider>
);

export default RechnerPage;
