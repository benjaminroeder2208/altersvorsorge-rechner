import { Link } from "react-router-dom";
import { ArrowRight, Calculator, BookOpen, Mail, Linkedin } from "lucide-react";
import benjaminPortrait from "@/assets/benjamin-roeder.jpg";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";
import BlogNewsletterWidget from "@/components/blog/BlogNewsletterWidget";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/ueber-uns";
const PORTRAIT_URL = `${BASE}/benjamin-roeder.jpg`;
const PORTRAIT_ID = `${BASE}${PATH}#portrait`;

const PERSON_ID = `${BASE}/#benjamin-roeder`;
const ORG_ID = `${BASE}/#organization`;
const WEBSITE_ID = `${BASE}/#website`;

const jsonLd = [
  {
    "@type": "AboutPage",
    "@id": `${BASE}${PATH}#aboutpage`,
    name: "Über uns – Benjamin Röder & altersvorsorge-rechner.com",
    url: `${BASE}${PATH}`,
    inLanguage: "de-DE",
    description:
      "Wer steckt hinter altersvorsorge-rechner.com? Benjamin Röder, 20+ Jahre Finanzbranche, erklärt die Mission: kostenlose, unabhängige Finanzbildung zur privaten Altersvorsorge in Deutschland.",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    primaryImageOfPage: { "@id": PORTRAIT_ID },
    datePublished: "2026-05-17",
    dateModified: "2026-05-17",
  },
  {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Benjamin Röder",
    givenName: "Benjamin",
    familyName: "Röder",
    jobTitle: "Experte für private Altersvorsorge & Wertpapiere",
    description:
      "Benjamin Röder arbeitet seit über 20 Jahren in der Finanzbranche, ist seit 2016 auf Wertpapiere und Depots spezialisiert und Gründer von altersvorsorge-rechner.com.",
    url: `${BASE}${PATH}`,
    email: "mailto:benjamin@kontakt-2.de",
    nationality: "DE",
    knowsAbout: [
      "Private Altersvorsorge",
      "Altersvorsorgedepot",
      "Riester-Rente",
      "ETF-Sparpläne",
      "Rentenlücke",
      "Frühstart-Rente",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mainkurstraße 16",
      postalCode: "63075",
      addressLocality: "Offenbach am Main",
      addressCountry: "DE",
    },
    worksFor: { "@id": ORG_ID },
    founderOf: { "@id": ORG_ID },
    image: { "@id": PORTRAIT_ID },
    sameAs: ["https://www.linkedin.com/in/ben-r-kontakt/"],
  },
  {
    "@type": "ImageObject",
    "@id": PORTRAIT_ID,
    url: PORTRAIT_URL,
    contentUrl: PORTRAIT_URL,
    width: 1200,
    height: 1200,
    caption: "Portrait von Benjamin Röder, Gründer von altersvorsorge-rechner.com",
    representativeOfPage: true,
    about: { "@id": PERSON_ID },
  },
  {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "altersvorsorge-rechner.com",
    alternateName: "Altersvorsorge-Rechner",
    url: BASE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/favicon.svg`,
    },
    image: `${BASE}/og-image.jpg`,
    description:
      "Unabhängige, kostenlose Rechner und Bildungsinhalte zur privaten Altersvorsorge in Deutschland – inkl. Altersvorsorgedepot, Rentenlücke und Frühstart-Rente.",
    founder: { "@id": PERSON_ID },
    foundingDate: "2025",
    areaServed: { "@type": "Country", name: "Deutschland" },
    knowsLanguage: "de",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "benjamin@kontakt-2.de",
      availableLanguage: ["de"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mainkurstraße 16",
      postalCode: "63075",
      addressLocality: "Offenbach am Main",
      addressCountry: "DE",
    },
  },
  {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${BASE}/`,
    name: "altersvorsorge-rechner.com",
    inLanguage: "de-DE",
    publisher: { "@id": ORG_ID },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Über Uns", item: `${BASE}${PATH}` },
    ],
  },
];

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <AnimatedSection>
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5" style={{ letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  </AnimatedSection>
);

const UeberUnsPage = () => (
  <>
    <PageHead
      title="Über uns – Benjamin Röder & altersvorsorge-rechner.com"
      description="Wer steckt hinter altersvorsorge-rechner.com? Benjamin Röder, 20+ Jahre Finanzbranche, erklärt die Mission: kostenlose, unabhängige Finanzbildung zur privaten Altersvorsorge in Deutschland."
      path={PATH}
      ogTitle="Über uns – Die Mission von altersvorsorge-rechner.com"
      ogDescription="Benjamin Röder über 20+ Jahre Finanzbranche, das neue Altersvorsorgedepot und warum kostenlose Finanzbildung in Deutschland überfällig ist."
      ogType="website"
      ogImage="/benjamin-roeder.jpg"
      jsonLd={jsonLd}
    />
    <Navbar />
    <main className="pt-24 pb-20">
      <article className="container max-w-2xl mx-auto px-6">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Über Uns</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <AnimatedSection>
          <p className="text-sm font-medium text-primary mb-3">Über uns</p>
          <h1
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            Über mich und diese Website
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Warum es altersvorsorge-rechner.com gibt — und was ich damit erreichen möchte.
          </p>
        </AnimatedSection>

        <div className="space-y-14">
          <Section id="intro" title="Hallo, ich bin Benjamin">
            <div className="flex flex-col sm:flex-row gap-6 items-start mb-2">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="shrink-0 rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-transform hover:scale-[1.02] cursor-zoom-in"
                    aria-label="Portrait von Benjamin Röder vergrößern"
                  >
                    <img
                      src={benjaminPortrait}
                      alt="Portrait von Benjamin Röder, Gründer von altersvorsorge-rechner.com und Experte für private Altersvorsorge"
                      width={1200}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="w-32 h-32 sm:w-40 sm:h-40 object-cover shadow-md"
                    />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-2 sm:p-3 bg-background">
                  <VisuallyHidden>
                    <DialogTitle>Portrait von Benjamin Röder</DialogTitle>
                    <DialogDescription>Vergrößerte Ansicht des Portraits</DialogDescription>
                  </VisuallyHidden>
                  <img
                    src={benjaminPortrait}
                    alt="Portrait von Benjamin Röder, Gründer von altersvorsorge-rechner.com – vergrößerte Ansicht"
                    width={1200}
                    height={1200}
                    decoding="async"
                    className="w-full h-auto rounded-xl object-contain"
                  />
                </DialogContent>
              </Dialog>
              <p className="m-0">
                Ich bin Benjamin Röder und ich habe diese Website aus einer persönlichen Mission heraus
                gegründet: Finanzbildung und private Altersvorsorge sollten für{" "}
                <strong className="text-foreground">jeden</strong> zugänglich sein — nicht nur für die,
                die sich Berater leisten können.
              </p>
            </div>
            <p>
              Seit über 20 Jahren arbeite ich in der Finanzbranche, und ich bin täglich mit den
              gleichen Fragen konfrontiert: Wie spare ich richtig für die Rente? Welche Förderungen
              gibt es? Wie funktioniert das neue{" "}
              <Link to="/altersvorsorgedepot" className="text-primary underline-offset-4 hover:underline">
                Altersvorsorgedepot
              </Link>
              ?
            </p>
            <p>
              Diese Website ist mein Versuch, genau diese Fragen verständlich, kostenlos und ohne
              versteckte Verkaufsabsichten zu beantworten.
            </p>
          </Section>

          <Section id="hintergrund" title="Mein Weg in die Finanzbranche">
            <p>Mein Berufsleben in der Finanzbranche:</p>
            <ul className="space-y-3 pl-0 list-none">
              <li className="flex gap-3">
                <span className="text-primary font-semibold shrink-0">Seit 2000:</span>
                <span>
                  Tätigkeit für verschiedene Banken — von Privat-Banking über Retail-Strategien bis
                  zur Produkt-Entwicklung.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold shrink-0">Seit 2016:</span>
                <span>
                  Spezialisiert auf das Wertpapierumfeld — ETFs, Aktien, Depots, Vermögensaufbau.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold shrink-0">Heute:</span>
                <span>
                  Angestellt bei einem Depotanbieter, wo ich täglich mit Kunden und deren
                  Fragen zur privaten Altersvorsorge zu tun habe.
                </span>
              </li>
            </ul>
            <p>
              Das Interessante: Je mehr ich mit echten Menschen über ihre Geldsorgen spreche, desto
              deutlicher wird — es gibt einen großen Gap zwischen dem verfügbaren Wissen und dem, was
              die Leute wirklich verstehen und umsetzen können.
            </p>
            <p>Genau da möchte ich ansetzen.</p>
          </Section>

          <Section id="warum" title="Warum es diese Website braucht">
            <p>
              Das Problem mit Finanzbildung in Deutschland ist einfach: Sie ist teuer, kompliziert
              und oft versteckt hinter Paywall oder Verkaufsabsicht.
            </p>
            <p className="text-foreground font-semibold">Was ich sehe:</p>
            <ul className="space-y-2 pl-5 list-disc marker:text-primary">
              <li>
                <Link to="/rentenluecken-rechner" className="text-primary underline-offset-4 hover:underline">
                  Rentenlücken
                </Link>{" "}
                wachsen, aber Menschen wissen nicht, wie groß sie sind.
              </li>
              <li>
                Neue Reformen (Altersvorsorgedepot,{" "}
                <Link to="/fruehstart-rente-rechner" className="text-primary underline-offset-4 hover:underline">
                  Frühstart-Rente
                </Link>
                ) sind gerade beschlossen, aber viele verstehen nicht, wie sie funktionieren.
              </li>
              <li>
                ETF-Sparpläne sind einfach und günstig, aber viele trauen sich nicht, weil sie sich
                nicht auskennen.
              </li>
              <li>
                Staatliche Förderungen liegen auf der Straße, werden aber nicht mitgenommen.
              </li>
            </ul>
            <p className="text-foreground font-semibold pt-2">Meine Mission:</p>
            <p>
              Kostenlose, verständliche Inhalte über private Altersvorsorge für ALLE. Keine
              versteckten Verkaufsabsichten. Keine Provisionen. Nur Education.
            </p>
            <p>Diese Website soll der Ort sein, wo du:</p>
            <ul className="space-y-2 pl-5 list-disc marker:text-primary">
              <li>Kostenlos deine Rentenlücke berechnen kannst</li>
              <li>Verstehst, was das neue Altersvorsorgedepot bedeutet</li>
              <li>Erfährst, wie viel dein Kind mit der Frühstart-Rente sparen kann</li>
              <li>Lernst, warum ETF-Sparpläne eine Alternative zu klassischen Produkten sind</li>
            </ul>
          </Section>

          <Section id="expertise" title="Was ich mitbringe">
            <p>Mein Hintergrund gibt mir einige Vorteile bei diesem Projekt:</p>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-foreground mb-1">Finanzbranche seit 2000</p>
                <p>
                  Ich spreche die Sprache der Banken und Versicherer, verstehe aber auch die Kritik
                  an zu hohen Kosten und undurchsichtigen Produkten.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Wertpapier-Affinität</p>
                <p>
                  Ich lebe und arbeite täglich mit ETFs, Depots und Aktienmärkten. Das ist kein
                  theoretisches Wissen — das ist meine tägliche Realität.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Depotanbieter-Perspektive</p>
                <p>
                  In meinem Job sehe ich, was Kunden wirklich bewegt. Ich weiß, welche Fragen sich
                  wiederholen, welche Missverständnisse es gibt, und wo echte Angst steckt.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Finanzbildungs-Leidenschaft</p>
                <p>
                  Das ist nicht nur ein Projekt für mich — das ist eine echte Überzeugung. Jeder
                  sollte verstehen, wie man für die Rente spart. Punkt.
                </p>
              </div>
            </div>
          </Section>

          <Section id="website" title="Wie diese Website entstand">
            <p>
              Diese Website ist kein großes Projekt mit Investment und PR-Team. Das ist ein
              persönliches Projekt, das ich in meiner Freizeit aufgebaut habe:
            </p>
            <div>
              <p className="font-semibold text-foreground mb-2">Technisch</p>
              <ul className="space-y-1.5 pl-5 list-disc marker:text-primary">
                <li>Moderne, schnelle Technologie (React, Vite, kostengünstig)</li>
                <li>Interaktive Rechner, die echte Finanzberechnungen machen</li>
                <li>Mobile-optimiert (weil die meisten mobil surfen)</li>
                <li>Kostenlos für dich — keine versteckten Gebühren</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Inhalte</p>
              <ul className="space-y-1.5 pl-5 list-disc marker:text-primary">
                <li>Alles selbst recherchiert und geschrieben</li>
                <li>Basierend auf echten Gesetzen und Regelungen</li>
                <li>Regelmäßig aktualisiert (Rentenreform 2026!)</li>
                <li>Verlinkt auf offizielle Quellen (Bundesregierung, MSCI, DAI)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Philosophie</p>
              <p>
                Keine Affiliate-Links zu Produkten. Keine Provisionen. Keine Werbung. Nur echte
                Education. Die Website wird durch meine Überzeugung getrieben, nicht durch
                finanzielle Anreize.
              </p>
            </div>
          </Section>

          <Section id="ziel" title="Was ich erreichen möchte">
            <p>Wenn ich ehrlich bin, möchte ich mit dieser Website folgendes erreichen:</p>
            <div>
              <p className="font-semibold text-foreground mb-2">Kurzfristig</p>
              <ul className="space-y-1.5 pl-5 list-disc marker:text-primary">
                <li>Menschen helfen, ihre finanzielle Situation zu verstehen</li>
                <li>Zeigen, wie einfach Altersvorsorge sein kann</li>
                <li>Mythen über ETFs und Aktienmärkten aufklären</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Mittelfristig</p>
              <ul className="space-y-1.5 pl-5 list-disc marker:text-primary">
                <li>Eine Anlaufstelle werden für Fragen rund um private Altersvorsorge</li>
                <li>Menschen dazu ermutigen, JETZT anzufangen (nicht in 10 Jahren)</li>
                <li>Die Rentenreform 2026 bekannt machen</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Langfristig</p>
              <ul className="space-y-1.5 pl-5 list-disc marker:text-primary">
                <li>Finanzbildung breiter in der Bevölkerung verankern</li>
                <li>Zeigen, dass man nicht reich sein muss, um zu investieren</li>
                <li>Einen Beitrag leisten zur Vermeidung von Altersarmut</li>
              </ul>
            </div>
            <p className="pt-2">
              <span className="font-semibold text-foreground">Ehrlich gesagt:</span> Ich weiß, dass
              ich mit dieser Website nicht reich werde. Das ist auch nicht der Plan. Der Plan ist,
              dass <em>andere</em> reicher werden — durch besseres Wissen und bessere Entscheidungen.
            </p>
          </Section>

          <Section id="kontakt" title="Über dein Feedback freue ich mich">
            <p>
              Diese Website lebt davon, dass sie für echte Menschen hilfreiche Inhalte bereitstellt.
              Wenn etwas nicht klar ist, wenn du Fragen hast, oder wenn du einen Fehler findest —
              sag Bescheid!
            </p>
            <p>Du erreichst mich über:</p>
            <ul className="space-y-2 pl-5 list-disc marker:text-primary">
              <li>
                E-Mail:{" "}
                <a
                  href="mailto:benjamin@kontakt-2.de"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  benjamin@kontakt-2.de
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/ben-r-kontakt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline inline-flex items-center gap-1"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  Benjamin Röder auf LinkedIn
                </a>
                <span className="block text-sm mt-1">
                  Vernetze dich mit mir auf LinkedIn — dort teile ich regelmäßig Einblicke zu
                  Altersvorsorge, ETFs und der Rentenreform 2026 und freue mich über den Austausch
                  mit Leserinnen und Lesern.
                </span>
              </li>
              <li>
                <Link to="/newsletter" className="text-primary underline-offset-4 hover:underline">
                  Newsletter
                </Link>{" "}
                — direkt in deinen Posteingang
              </li>
            </ul>
            <p>
              Ich antworte nicht immer sofort (ich habe auch einen Vollzeitjob), aber ich lese jedes
              Feedback ernsthaft.
            </p>
          </Section>

          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <Link
                to="/"
                className="group p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors"
              >
                <Calculator className="w-5 h-5 text-primary mb-3" />
                <p className="font-semibold text-sm mb-1">Zu den Rechnern</p>
                <p className="text-xs text-muted-foreground">
                  Förderung, Endkapital und Rentenlücke berechnen
                </p>
                <ArrowRight className="w-4 h-4 mt-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/blog"
                className="group p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors"
              >
                <BookOpen className="w-5 h-5 text-primary mb-3" />
                <p className="font-semibold text-sm mb-1">Zum Blog</p>
                <p className="text-xs text-muted-foreground">
                  Ratgeber zu Altersvorsorge, ETFs und Rente
                </p>
                <ArrowRight className="w-4 h-4 mt-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/newsletter"
                className="group p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors"
              >
                <Mail className="w-5 h-5 text-primary mb-3" />
                <p className="font-semibold text-sm mb-1">Newsletter</p>
                <p className="text-xs text-muted-foreground">
                  Kostenlose Altersvorsorge-Checkliste als PDF
                </p>
                <ArrowRight className="w-4 h-4 mt-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <BlogNewsletterWidget />
          </AnimatedSection>
        </div>

        <p className="mt-16 text-xs text-muted-foreground/60 leading-relaxed">
          Alle Inhalte dienen ausschließlich der allgemeinen Information und stellen keine Anlage-,
          Steuer- oder Rechtsberatung dar. Angaben zum Altersvorsorgedepot basieren auf dem
          Altersvorsorgereformgesetz (beschlossen 27.03.2026).
        </p>
      </article>
    </main>
    <FooterSection />
  </>
);

export default UeberUnsPage;
