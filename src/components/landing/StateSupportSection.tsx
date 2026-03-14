import AnimatedSection from "./AnimatedSection";

const supports = [
  { title: "Grundzulage", desc: "Staatlicher Zuschuss für alle Berechtigten." },
  { title: "Kinderzulage", desc: "Zusätzliche Förderung für Familien mit Kindern." },
  { title: "Steuerliche Förderung", desc: "Beiträge können steuerlich geltend gemacht werden." },
];

const StateSupportSection = () => (
  <section className="section-padding">
    <div className="container max-w-5xl mx-auto px-6">
      <AnimatedSection className="text-center mb-20">
        <h2 className="heading-section max-w-3xl mx-auto">
          Staatliche Förderung bleibt ein wichtiger Bestandteil.
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {supports.map((s, i) => (
          <AnimatedSection key={s.title} delay={i * 0.1}>
            <div className="glass-card p-8 h-full text-center">
              <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.3} className="text-center">
        <p className="text-sm text-muted-foreground italic">
          Die konkrete Ausgestaltung hängt vom finalen Gesetz ab.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default StateSupportSection;