import AnimatedSection from "./AnimatedSection";
import AltersvorsorgedepotRechner from "./AltersvorsorgedepotRechner";

const CalculatorPreview = () => (
  <section className="bg-neutral-950">
    <div className="container max-w-5xl mx-auto px-6 text-center pt-20 md:pt-28">
      <AnimatedSection>
        <p className="text-sm text-teal-400 font-medium mb-4 uppercase tracking-wider">Simulation</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
          Wie könnte sich ein Altersvorsorgedepot entwickeln?
        </h2>
      </AnimatedSection>
    </div>
    <AltersvorsorgedepotRechner />
  </section>
);

export default CalculatorPreview;