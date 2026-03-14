import AnimatedSection from "./AnimatedSection";

const pillars = [
  { label: "Gesetzliche Rente", desc: "Die Basis der Altersversorgung — staatlich organisiert und umlagefinanziert." },
  { label: "Betriebliche Altersvorsorge", desc: "Zusätzliche Absicherung über den Arbeitgeber." },
  { label: "Private Vorsorge", desc: "Eigenverantwortlicher Vermögensaufbau — hier setzt die Reform an." },
];

const RealitySection = () => (
  <section id="realitaet" className="section-padding bg-secondary">
    <div className="container max-w-5xl mx-auto px-6">
      <AnimatedSection className="text-center mb-20">
        <h2 className="heading-section">
          Altersvorsorge besteht aus
          <br className="hidden md:block" />
          mehreren Bausteinen.
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <AnimatedSection key={p.label} delay={i * 0.1}>
            <div className="glass-card p-8 h-full text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-6">
                <span className="text-primary font-bold text-lg">{i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">{p.label}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default RealitySection;