import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import { ArrowLeft } from "lucide-react";

interface PageContent {
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; text: string; bullets?: string[] }[];
}

const pages: Record<string, PageContent> = {
  "altersvorsorgedepot-foerderung": {
    title: "Altersvorsorgedepot: Förderung im Detail",
    metaDescription: "Wie funktioniert die staatliche Förderung beim Altersvorsorgedepot? Grundzulage, Kinderzulage und Steuervorteil erklärt.",
    intro: "Die staatliche Förderung ist ein zentraler Baustein des geplanten Altersvorsorgedepots. Sie setzt sich aus drei Komponenten zusammen.",
    sections: [
      {
        heading: "Grundzulage",
        text: "Die Grundzulage beträgt laut aktuellem Entwurf bis zu 35 % auf Eigenbeiträge bis 1.200 € pro Jahr und 20 % auf Beiträge zwischen 1.200 € und 1.800 €.",
        bullets: ["Mindestbeitrag: 120 € pro Jahr", "Maximale Grundzulage: ca. 540 € pro Jahr"],
      },
      {
        heading: "Kinderzulage",
        text: "Für jedes kindergeldberechtigte Kind sieht der Entwurf eine zusätzliche Zulage von bis zu 300 € pro Jahr vor.",
        bullets: ["Pro Kind bis zu 300 €", "Voraussetzung: Kindergeldberechtigung"],
      },
      {
        heading: "Steuervorteil",
        text: "Eigenbeiträge und Zulagen können bis zu einem Höchstbetrag als Sonderausgaben geltend gemacht werden. Der tatsächliche Vorteil hängt vom persönlichen Steuersatz ab.",
      },
    ],
  },
  "altersvorsorgedepot-auszahlung": {
    title: "Altersvorsorgedepot: Auszahlung erklärt",
    metaDescription: "Wie funktioniert die Auszahlungsphase beim Altersvorsorgedepot? Monatliche Rente, Teilentnahme und Laufzeit.",
    intro: "Die Auszahlungsphase beginnt mit dem Renteneintritt. Der Entwurf sieht verschiedene Optionen vor.",
    sections: [
      {
        heading: "Monatliche Auszahlung",
        text: "Das angesparte Kapital wird ab Rentenbeginn in monatlichen Raten ausgezahlt. Die Auszahlung soll bis mindestens zum Alter von 85 Jahren laufen.",
      },
      {
        heading: "Teilentnahme",
        text: "Geplant ist die Möglichkeit, zu Beginn der Auszahlungsphase bis zu 30 % des Kapitals als Einmalzahlung zu entnehmen.",
      },
    ],
  },
  "altersvorsorgedepot-vs-riester": {
    title: "Altersvorsorgedepot vs. Riester-Rente",
    metaDescription: "Was unterscheidet das Altersvorsorgedepot von der Riester-Rente? Ein Vergleich der wichtigsten Unterschiede.",
    intro: "Das Altersvorsorgedepot soll die Riester-Rente ablösen. Die wichtigsten Unterschiede im Überblick.",
    sections: [
      {
        heading: "Beitragsgarantie",
        text: "Riester-Produkte müssen garantieren, dass mindestens die eingezahlten Beiträge zum Rentenbeginn erhalten bleiben. Das Altersvorsorgedepot verzichtet auf diese Garantie, um höhere Renditen zu ermöglichen.",
      },
      {
        heading: "Produktauswahl",
        text: "Während Riester nur über zertifizierte Produkte möglich ist, soll das Altersvorsorgedepot die direkte Investition in Fonds und ETFs erlauben.",
        bullets: ["Keine verpflichtende Beitragsgarantie", "Breitere Produktauswahl", "Potenziell niedrigere Kosten"],
      },
    ],
  },
  "altersvorsorgedepot-vs-etf-sparplan": {
    title: "Altersvorsorgedepot vs. ETF-Sparplan",
    metaDescription: "Altersvorsorgedepot oder ETF-Sparplan? Ein Vergleich von Förderung, Flexibilität und Rendite.",
    intro: "Beide Optionen setzen auf Kapitalmarktinvestments. Der entscheidende Unterschied liegt in der staatlichen Förderung.",
    sections: [
      {
        heading: "Staatliche Förderung",
        text: "Das Altersvorsorgedepot bietet Zulagen und Steuervorteile, die ein normaler ETF-Sparplan nicht hat. Dadurch kann die effektive Rendite deutlich höher ausfallen.",
      },
      {
        heading: "Flexibilität",
        text: "Ein ETF-Sparplan ist jederzeit verfügbar. Das Altersvorsorgedepot bindet das Kapital bis zum Renteneintritt — im Gegenzug profitieren Anleger von der Förderung.",
      },
    ],
  },
  "altersvorsorgedepot-gesetzesentwurf": {
    title: "Altersvorsorgedepot: Der Gesetzentwurf",
    metaDescription: "Aktueller Stand des Gesetzentwurfs zum Altersvorsorgedepot. Was ist geplant und wann kommt das Gesetz?",
    intro: "Der Gesetzentwurf zur Reform der privaten Altersvorsorge befindet sich im parlamentarischen Verfahren. Hier die wichtigsten Punkte.",
    sections: [
      {
        heading: "Zeitplan",
        text: "Das Gesetz soll voraussichtlich 2026 in Kraft treten. Der genaue Zeitpunkt hängt vom parlamentarischen Verfahren ab.",
      },
      {
        heading: "Wesentliche Inhalte",
        text: "Der Entwurf sieht die Einführung eines Altersvorsorgedepots als neue Produktkategorie vor, ergänzt um eine reformierte Zulagenstruktur und den Wegfall der Beitragsgarantie.",
        bullets: ["Neues Altersvorsorgedepot", "Reformierte Zulagenstruktur", "Effektivkostendeckel für Produkte"],
      },
    ],
  },
};

const SupportPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? pages[slug] : null;

  if (!page) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Seite nicht gefunden.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <article className="container max-w-2xl mx-auto px-6">
          <Link
            to="/#rechner"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zum Rechner
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            {page.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            {page.intro}
          </p>

          <div className="space-y-10">
            {page.sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-xl font-bold mb-3">{s.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.text}</p>
                {s.bullets && (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-16 p-6 bg-secondary rounded-2xl text-center">
            <p className="font-semibold mb-2">Jetzt berechnen</p>
            <p className="text-sm text-muted-foreground mb-4">
              Simulieren Sie Ihr mögliches Altersvorsorgedepot mit unserem Rechner.
            </p>
            <Link
              to="/#rechner"
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Zum Rechner
            </Link>
          </div>

          <p className="mt-12 text-xs text-muted-foreground/60 leading-relaxed">
            Alle Angaben basieren auf dem aktuellen Gesetzentwurf. Änderungen im Gesetzgebungsverfahren sind möglich.
            Diese Seite stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
          </p>
        </article>
      </main>
      <FooterSection />
    </>
  );
};

export default SupportPage;
