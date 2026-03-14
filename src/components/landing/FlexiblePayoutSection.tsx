import AnimatedSection from "./AnimatedSection";
import { TrendingUp, Wallet } from "lucide-react";

const phases = [
  {
    icon: TrendingUp,
    title: "Ansparphase",
    desc: "Während des Berufslebens wird Kapital aufgebaut.",
  },
  {
    icon: Wallet,
    title: "Auszahlungsphase",
    desc: "Im Ruhestand erfolgt die Auszahlung des angesparten Vermögens.",
  },
];

const FlexiblePayoutSection = () => (
  <section className="section-padding bg-secondary">
    <div className="container max-w-5xl mx-auto px-6">
      <AnimatedSection className="text-center mb-20">
        <h2 className="heading-section">Die zwei Phasen der Altersvorsorge</h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {phases.map((p, i) => (
          <AnimatedSection key={p.title} delay={i * 0.12}>
            <div className="glass-card p-10 h-full text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default FlexiblePayoutSection;