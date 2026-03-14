import AnimatedSection from "./AnimatedSection";

const ClosingSection = () => (
  <section className="section-padding bg-secondary">
    <div className="container max-w-3xl mx-auto px-6 text-center">
      <AnimatedSection>
        <h2 className="heading-section mb-8">
          Private Altersvorsorge steht vor einem möglichen Neustart.
        </h2>
      </AnimatedSection>
      <AnimatedSection delay={0.15}>
        <p className="text-body max-w-2xl mx-auto">
          Die Reform der steuerlich geförderten privaten Altersvorsorge könnte den Weg
          für ein moderneres Vorsorgesystem öffnen.
        </p>
        <p className="text-muted-foreground mt-6 text-base leading-relaxed max-w-2xl mx-auto">
          Mit stärkerer Kapitalmarktorientierung, vereinfachter Förderung und flexibleren Produkten.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ClosingSection;