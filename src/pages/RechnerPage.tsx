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
  {
    to: "/altersvorsorgedepot",
    label: "Was ist das Altersvorsorgedepot?",
    desc: "Grundlagen und Funktionsweise des beschlossenen Altersvorsorgedepots.",
  },
  {
    to: "/altersvorsorgedepot-foerderung",
    label: "Staatliche Förderung",
    desc: "Grundzulage, Kinderzulage und Steuervorteile im Überblick.",
  },
  {
    to: "/altersvorsorgedepot-auszahlung",
    label: "Auszahlung im Alter",
    desc: "Wie die Entnahme im Ruhestand funktionieren soll.",
  },
  {
    to: "/altersvorsorgedepot-vs-etf-sparplan",
    label: "Vergleich mit ETF-Sparplan",
    desc: "Förderung vs. Flexibilität — was passt besser?",
  },
  {
    to: "/altersvorsorgedepot-vs-riester",
    label: "Vergleich mit Riester",
    desc: "Die wichtigsten Unterschiede zum bisherigen Riester-Modell.",
  },
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
  <>
    <PageHead
      title="Altersvorsorgedepot Rechner – Altersvorsorge einfach berechnen"
      description="Berechnen Sie mit dem Altersvorsorgedepot Rechner, wie sich Beiträge, Förderung und Rendite langfristig entwickeln – nach dem neuen Reformgesetz."
      path="/"
      ogTitle="Altersvorsorgedepot Rechner – Altersvorsorge einfach berechnen"
      ogDescription="Interaktiver Rechner zur Simulation eines Altersvorsorgedepots auf Basis des beschlossenen Altersvorsorgereformgesetzes."
      jsonLd={homepageJsonLd}
    />
    <Navbar />
    <main>
      <HeroSection />
      <KeyFiguresSection />
      <CalculatorPreview />

      {/* Comparison table */}
      <section id="vergleich" className="section-padding bg-secondary">
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
                    <th className="py-3 px-4 font-semibold text-muted-foreground text-center">Mit 25 starten</th>
                    <th
                      className="py-3 px-4 font-semibold text-center relative bg-primary text-primary-foreground"
                      style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                    >
                      <span className="inline-block px-3 py-0.5 rounded-full text-xs font-medium mb-1 bg-primary-foreground/20 text-primary-foreground">
                        Das Beispiel
                      </span>
                      <br />
                      Mit 35 starten
                    </th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground text-center">Mit 45 starten</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Monatlicher Beitrag", values: ["150 €", "150 €", "150 €"] },
                    { label: "Ansparzeit bis 67", values: ["42 Jahre", "32 Jahre", "22 Jahre"] },
                    { label: "Eingezahltes Kapital", values: ["75.600 €", "57.600 €", "39.600 €"] },
                    {
                      label: "Kapital mit 67 (7 % p.a.*), ohne Zulagen",
                      values: ["~444.000 €", "~212.000 €", "~94.000 €"],
                    },
                    { label: "Monatliche Zusatzrente", values: ["~2.055 €", "~985 €", "~435 €"] },
                  ].map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-background" : ""}>
                      <td className="py-3 px-4 font-medium text-muted-foreground">{row.label}</td>
                      <td className="py-3 px-4 text-center tabular-nums">{row.values[0]}</td>
                      <td className="py-3 px-4 text-center font-medium tabular-nums bg-primary-soft text-primary-soft-foreground">
                        {row.values[1]}
                      </td>
                      <td className="py-3 px-4 text-center tabular-nums">{row.values[2]}</td>
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
                Persönliche Altersvorsorge berechnen <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-8 p-5 bg-muted/50 border border-border/60 rounded-xl max-w-2xl mx-auto text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                *Hinweise & Haftungsausschluss
              </p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                Alle Beispielrechnungen verwenden vereinfachte Annahmen: angenommene Rendite von 7 % p.a. (historischer
                Durchschnitt breit gestreuter Aktienindizes — siehe z.{"\u00A0"}B.{" "}
                <a
                  href="https://www.dai.de/detail/msci-world-rendite-dreieck-fuer-die-monatliche-geldanlage-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  MSCI-World-Renditedreieck des Deutschen Aktieninstituts
                </a>{" "}
                — keine Prognose), keine Inflation, keine Produktkosten, keine Steuern auf Erträge. Tatsächliche
                Ergebnisse können erheblich abweichen — auch ins Negative. Kapitalanlagen bergen Risiken, einschließlich
                des möglichen Verlusts des eingesetzten Kapitals. Frühere Wertentwicklungen sind kein verlässlicher
                Indikator für die Zukunft. Angaben zum Altersvorsorgedepot basieren auf dem Altersvorsorgereformgesetz
                (beschlossen 27.03.2026). Keine Anlage-, Steuer- oder Rechtsberatung.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* SEO: Riester Zulage erklärt */}
      <section id="riester-zulage" className="section-padding bg-secondary">
        <div className="container max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Riester Zulage — wie sie heute funktioniert</h2>
            <p className="text-muted-foreground mt-2">
              Die staatliche Förderung der Riester-Rente im Überblick — und was sich mit dem neuen Altersvorsorgedepot ab 2027 ändert.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="p-5 rounded-2xl bg-background">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Grundzulage Riester</p>
                <p className="text-2xl font-bold">175 €</p>
                <p className="text-xs text-muted-foreground mt-1">pro Jahr, fix</p>
              </div>
              <div className="p-5 rounded-2xl bg-background">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Kinderzulage Riester</p>
                <p className="text-2xl font-bold">300 €</p>
                <p className="text-xs text-muted-foreground mt-1">pro Kind ab 2008 / 185 € davor</p>
              </div>
              <div className="p-5 rounded-2xl bg-background">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Mindesteigenbeitrag</p>
                <p className="text-2xl font-bold">4 %</p>
                <p className="text-xs text-muted-foreground mt-1">des Vorjahresbruttos, abzgl. Zulagen</p>
              </div>
            </div>

            <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
              <p>
                Die <strong className="text-foreground">Riester Zulage</strong> setzt sich aus Grundzulage und Kinderzulage zusammen. Volle Zulagen erhält nur, wer den Mindesteigenbeitrag von 4 % des Vorjahresbruttos einzahlt (max. 2.100 € inkl. Zulagen). Der Antrag läuft über den Anbieter, ausgezahlt wird die Zulage rückwirkend — meist 1–2 Jahre nach dem Beitragsjahr.
              </p>
              <p>
                Mit dem am 27. März 2026 beschlossenen{" "}
                <Link to="/altersvorsorgedepot-gesetz" className="text-primary underline">Altersvorsorgereformgesetz</Link>{" "}
                wird die Förderung ab 2027 vollständig neu strukturiert: Statt fixer Beträge gilt eine prozentuale Zulage von 50 % auf Eigenbeiträge bis 360 € und 25 % auf 360–1.800 € — maximal 540 € pro Jahr. Bestehende Riester-Verträge bleiben bestehen, neue Abschlüsse sind ab 2027 nicht mehr förderfähig.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/blog/riester-kuendigen"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background hover:bg-background/70 text-sm font-medium transition-colors"
              >
                Riester kündigen oder pausieren? <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/altersvorsorgedepot-vs-riester"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Riester vs. Altersvorsorgedepot <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SEO: Altersvorsorgedepot — Riester vs. Depot Vergleich */}
      <section id="riester-vs-depot" className="section-padding">
        <div className="container max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
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
                      style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
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

            <div className="mt-6 p-5 bg-muted/50 border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                Quelle: Altersvorsorgereformgesetz, Beschlussempfehlung Drs. 21/4996 (beschlossen 27.03.2026), §§ 84, 85 EStG (neue Fassung). Bestehende Riester-Verträge laufen unverändert weiter — eine voreilige Kündigung ist meist nicht sinnvoll. Keine Anlage-, Steuer- oder Rechtsberatung.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="mehr" className="section-padding">
        <div className="container max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Mehr zum Altersvorsorgedepot</h2>
            <p className="text-muted-foreground mt-2">
              Vertiefen Sie Ihr Wissen rund um das beschlossene Altersvorsorgedepot.
            </p>
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
              <Link
                to="/blog/altersvorsorgedepot-2027"
                className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors"
              >
                <div>
                  <p className="font-semibold text-sm mb-1">Altersvorsorgedepot 2027 erklärt</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Alles zum neuen Altersvorsorgedepot: Förderung, Funktionsweise, Start 2027.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
              </Link>
              <Link
                to="/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst"
                className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors"
              >
                <div>
                  <p className="font-semibold text-sm mb-1">Was ist die Rentenlücke?</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Wie groß die Lücke wirklich ist — und was du dagegen tun kannst.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
              </Link>
              <Link
                to="/rentenluecken-rechner"
                className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors"
              >
                <div>
                  <p className="font-semibold text-sm mb-1">Rentenlückenrechner</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Berechne deine persönliche Rentenlücke in 30 Sekunden.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
              </Link>
              <Link
                to="/blog"
                className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors"
              >
                <div>
                  <p className="font-semibold text-sm mb-1">Alle Ratgeber →</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Alle Artikel zu Altersvorsorge, Rente und Förderung.
                  </p>
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
