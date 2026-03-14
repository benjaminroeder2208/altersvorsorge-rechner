import AnimatedSection from "./AnimatedSection";

const points = [
  "Vergleichbarkeit von Produkten",
  "Standardisierte Produktinformationen",
  "Bessere Übersicht für Verbraucher",
];

const TransparencySection = () => (
  <section className="section-padding bg-secondary">
    <div className="container max-w-4xl mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <h2 className="heading-section max-w-3xl mx-auto">
          Mehr Transparenz für bessere Entscheidungen.
        </h2>
      </AnimatedSection>

      <div className="flex flex-col items-center gap-4">
        {points.map((p, i) => (
          <AnimatedSection key={p} delay={i * 0.08}>
            <div className="glass-card px-8 py-5 text-center">
              <p className="text-base font-medium">{p}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default TransparencySection;