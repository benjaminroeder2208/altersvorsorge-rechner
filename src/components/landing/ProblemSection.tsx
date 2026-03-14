import AnimatedSection from "./AnimatedSection";

const criticisms = [
  "Niedrige Renditen",
  "Hohe Kosten",
  "Komplexe Förderregeln",
  "Geringe Transparenz",
];

const ProblemSection = () => (
  <section className="section-padding">
    <div className="container max-w-4xl mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <h2 className="heading-section max-w-3xl mx-auto">
          Viele bestehende Vorsorgeprodukte
          <br className="hidden md:block" />
          haben Vertrauen verloren.
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="text-center mb-16">
        <p className="text-body max-w-2xl mx-auto">
          In den vergangenen Jahren ist die Nachfrage nach geförderter privater Altersvorsorge zurückgegangen.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {criticisms.map((c, i) => (
          <AnimatedSection key={c} delay={0.15 + i * 0.05}>
            <div className="glass-card p-6 text-center">
              <p className="text-sm font-semibold text-foreground">{c}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;