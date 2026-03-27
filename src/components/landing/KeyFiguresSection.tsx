import AnimatedSection from "./AnimatedSection";
import { MAX_GRUNDZULAGE_AB_2027, MAX_GRUNDZULAGE_AB_2029 } from "@/lib/foerderung";

const cards = [
  {
    value: "~1.100 €",
    valueColor: "#EF4444",
    accentColor: "#EF4444",
    label: "Durchschnittliche Rentenlücke",
    sub: "pro Monat bei einem 35-Jährigen mit 3.500 € Brutto",
  },
  {
    value: "48 %",
    valueColor: "#1B4FD8",
    accentColor: "#1B4FD8",
    label: "So viel ersetzt die gesetzliche Rente",
    sub: "des letzten Bruttogehalts — netto oft noch weniger",
  },
  {
    value: `${MAX_GRUNDZULAGE_AB_2027} €`,
    valueColor: "#F59E0B",
    accentColor: "#F59E0B",
    label: "Maximale staatliche Förderung pro Jahr",
      sub: `durch das beschlossene Altersvorsorgedepot ab 2027`,
  }
];

const KeyFiguresSection = () => (
  <section className="bg-secondary py-16 md:py-20">
    <div className="container px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <AnimatedSection key={i} delay={0.1 * (i + 1)}>
            <div className="bg-background rounded-2xl p-6 shadow-sm overflow-hidden flex">
              {/* Accent stripe */}
              <div
                className="w-1 rounded-full shrink-0 -ml-6 mr-5"
                style={{ background: card.accentColor }}
              />
              <div>
                <p className="text-3xl font-bold" style={{ color: card.valueColor }}>
                  {card.value}
                </p>
                <p className="text-sm font-medium text-foreground mt-1">{card.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <a
          href="#rechner"
          className="text-sm font-medium hover:underline"
          style={{ color: "#1B4FD8" }}
        >
          Wie groß ist deine persönliche Lücke? →
        </a>
      </div>

      <p className="text-[11px] text-muted-foreground/50 text-center max-w-md mx-auto leading-relaxed mt-4">
        ~1.100 € und 48 %: Eigene Modellrechnung auf Basis des
        Rentenniveaus vor Steuern 2024 (Deutsche Rentenversicherung,
        Rentenversicherungsbericht 2024) bei 3.500 € Bruttogehalt
        und 32 Beitragsjahren. Individuelle Werte können abweichen.
        540 €: Beschlussempfehlung Drucksache 21/4996, § 84, gültig ab
        01.01.2027.
      </p>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground/50 text-center mt-6">
        Durchschnittswerte auf Basis vereinfachter Annahmen. Keine Anlageberatung.
      </p>
    </div>
  </section>
);

export default KeyFiguresSection;
