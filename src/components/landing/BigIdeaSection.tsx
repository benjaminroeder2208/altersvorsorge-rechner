import AnimatedSection from "./AnimatedSection";
import { TrendingUp, Eye, Scale } from "lucide-react";

const features = [
  { icon: TrendingUp, title: "Langfristige Kapitalmarktanlage", desc: "Investitionen in Fonds oder ETFs" },
  { icon: Eye, title: "Mehr Transparenz", desc: "Einfachere Produktvergleiche" },
  { icon: Scale, title: "Mehr Wettbewerb", desc: "Stärkere Kostendisziplin" },
];

const BigIdeaSection = () => (
  <section id="modell" className="section-padding">
    <div className="container max-w-5xl mx-auto px-6">
      <AnimatedSection className="text-center mb-6">
        <h2 className="heading-hero">Das Altersvorsorgedepot.</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="text-center mb-20">
        <p className="text-body max-w-2xl mx-auto mb-8">
          Ein Depot für langfristige Altersvorsorge.
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
          Neben klassischen Garantieprodukten soll künftig auch ein renditeorientiertes
          Altersvorsorgedepot ohne Garantien möglich sein.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <AnimatedSection key={f.title} delay={0.15 + i * 0.1}>
            <div className="glass-card p-8 h-full transition-shadow duration-300 hover:shadow-md">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-6">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default BigIdeaSection;