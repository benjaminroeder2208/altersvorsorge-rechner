import AnimatedSection from "./AnimatedSection";

const characteristics = [
  "Voreingestellte Strategie",
  "Reduzierte Komplexität",
  "Einfache Produktauswahl",
];

const StandardProductSection = () => (
  <section className="section-padding bg-secondary">
    <div className="container max-w-4xl mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <h2 className="heading-section">Ein mögliches Standardprodukt.</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="text-center mb-16">
        <p className="text-body max-w-2xl mx-auto">
          Der Gesetzentwurf sieht ein Standarddepot vor, das auf Einfachheit ausgelegt ist.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {characteristics.map((c) => (
            <div key={c} className="glass-card px-6 py-4">
              <p className="text-sm font-medium">{c}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="glass-card max-w-xl mx-auto p-8 md:p-10 text-center">
          <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-medium">Kostendeckel</p>
          <p className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            max. <span className="text-primary">1,5 %</span> p.a.
          </p>
          <p className="text-sm text-muted-foreground">
            Effektivkosten sollen auf maximal 1,5 % pro Jahr begrenzt werden.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default StandardProductSection;