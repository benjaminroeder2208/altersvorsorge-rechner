import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { ArrowRight } from "lucide-react";

const blocks = [
  {
    id: "was-ist",
    title: "Was ist das Altersvorsorgedepot?",
    paragraphs: [
      "Das Altersvorsorgedepot ist ein geplantes staatlich gefördertes Depot für die private Altersvorsorge. Es ermöglicht Investitionen in Fonds und ETFs — ohne die bisherige Beitragsgarantie der Riester-Rente.",
      "Ziel ist ein einfacherer, renditeorientierter Vermögensaufbau für den Ruhestand.",
    ],
    bullets: [
      "Keine verpflichtende Beitragsgarantie",
      "Investition in breit gestreute Fonds und ETFs",
      "Staatliche Förderung durch Zulagen und Steuervorteile",
    ],
    link: { to: "/altersvorsorgedepot-vs-riester", label: "Vergleich mit Riester" },
  },
  {
    id: "foerderung",
    title: "Wie funktioniert die Förderung?",
    paragraphs: [
      "Der Staat fördert Einzahlungen mit einer Grundzulage, Kinderzulagen und einem Sonderausgabenabzug. Die Förderung wird direkt dem Depot gutgeschrieben.",
      "Ab einem Mindestbeitrag von 120 € pro Jahr greift die volle Zulagenförderung.",
    ],
    bullets: [
      "Grundzulage: bis zu 35 % auf Beiträge bis 1.200 €",
      "Kinderzulage: bis zu 300 € pro Kind und Jahr",
      "Zusätzlicher Steuervorteil über Sonderausgabenabzug",
    ],
    link: { to: "/altersvorsorgedepot-foerderung", label: "Förderung im Detail" },
  },
  {
    id: "auszahlung",
    title: "Wie funktioniert die Auszahlung?",
    paragraphs: [
      "Ab Rentenbeginn kann das angesparte Kapital als monatliche Auszahlung entnommen werden. Geplant ist auch eine teilweise Einmalentnahme zu Beginn der Auszahlungsphase.",
      "Die genauen Regelungen werden im finalen Gesetz festgelegt.",
    ],
    bullets: [
      "Monatliche Auszahlung ab Rentenbeginn",
      "Mögliche Teilentnahme von bis zu 30 %",
      "Auszahlungsphase bis mindestens Alter 85",
    ],
    link: { to: "/altersvorsorgedepot-auszahlung", label: "Auszahlung im Detail" },
  },
];

const ExplainerBlocks = () => (
  <section id="info" className="section-padding">
    <div className="container max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        {blocks.map((block, i) => (
          <AnimatedSection key={block.id} delay={i * 0.1}>
            <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight">{block.title}</h3>
              {block.paragraphs.map((p, j) => (
                <p key={j} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
              ))}
              <ul className="space-y-2 pt-2">
                {block.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                to={block.link.to}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity pt-2"
              >
                {block.link.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ExplainerBlocks;
