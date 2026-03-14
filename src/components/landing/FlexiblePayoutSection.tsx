import AnimatedSection from "./AnimatedSection";

const options = [
  { title: "Lebenslange Renten", desc: "Klassische Verrentung für dauerhafte Absicherung." },
  { title: "Auszahlungspläne", desc: "Flexible Entnahmen über einen festgelegten Zeitraum." },
  { title: "Teilweise Kapitalentnahmen", desc: "Zugriff auf Teile des Kapitals bei Bedarf." },
];

const FlexiblePayoutSection = () => (
  <section className="section-padding bg-secondary">
    <div className="container max-w-5xl mx-auto px-6">
      <AnimatedSection className="text-center mb-20">
        <h2 className="heading-section">Mehr Flexibilität im Ruhestand.</h2>
      </AnimatedSection>

      <div className="space-y-4 max-w-3xl mx-auto">
        {options.map((o, i) => (
          <AnimatedSection key={o.title} delay={i * 0.1}>
            <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4">
              <h3 className="text-lg font-semibold md:w-1/3">{o.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed md:w-2/3">{o.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default FlexiblePayoutSection;