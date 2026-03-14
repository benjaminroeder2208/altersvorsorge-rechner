import AnimatedSection from "./AnimatedSection";

const goals = ["Einfacher", "Kostengünstiger", "Transparenter", "Renditestärker"];

const ReformSection = () => (
  <section className="section-padding bg-secondary">
    <div className="container max-w-4xl mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <h2 className="heading-section">
          Die private Altersvorsorge
          <br className="hidden md:block" />
          soll neu gedacht werden.
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="text-center mb-16">
        <div className="flex flex-wrap justify-center gap-3">
          {goals.map((g) => (
            <span key={g} className="px-5 py-2.5 rounded-full border border-border bg-background text-sm font-medium">
              {g}
            </span>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center">
        <p className="text-body max-w-2xl mx-auto">
          Das Altersvorsorgedepot ist ein zentraler Baustein dieses neuen Ansatzes.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ReformSection;