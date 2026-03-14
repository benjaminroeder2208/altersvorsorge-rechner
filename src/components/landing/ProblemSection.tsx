import AnimatedSection from "./AnimatedSection";
import { Clock, TrendingDown, ShieldOff } from "lucide-react";

const items = [
  { icon: Clock, title: "Steigende Lebenserwartung", desc: "Wir werden immer älter — und brauchen mehr Kapital für den Ruhestand als je zuvor." },
  { icon: TrendingDown, title: "Sinkendes Rentenniveau", desc: "Die gesetzliche Rente wird für viele nicht ausreichen, um den Lebensstandard zu halten." },
  { icon: ShieldOff, title: "Fehlende private Vorsorge", desc: "Viele Menschen beginnen zu spät oder nutzen ineffiziente Vorsorgeprodukte." },
];

const ProblemSection = () => (
  <section id="problem" className="section-padding bg-secondary">
    <div className="container max-w-5xl mx-auto px-6">
      <AnimatedSection className="text-center mb-20">
        <h2 className="heading-section">
          Die meisten Menschen unterschätzen
          <br className="hidden md:block" />
          ihre Rentenlücke.
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {items.map((item, i) => (
          <AnimatedSection key={item.title} delay={i * 0.1}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
