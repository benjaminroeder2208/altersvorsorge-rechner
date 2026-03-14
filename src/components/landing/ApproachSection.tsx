import AnimatedSection from "./AnimatedSection";
import { Globe, Landmark, TrendingUp } from "lucide-react";

const cards = [
  { icon: Globe, title: "ETF-Investments", subtitle: "Globale Diversifikation", desc: "Investieren Sie breit gestreut in die Weltwirtschaft — einfach, transparent und kosteneffizient." },
  { icon: Landmark, title: "Staatliche Förderung", subtitle: "Unterstützung beim Vermögensaufbau", desc: "Profitieren Sie von steuerlichen Vorteilen und staatlichen Zuschüssen für Ihre Altersvorsorge." },
  { icon: TrendingUp, title: "Langfristiges Wachstum", subtitle: "Zinseszinseffekt über Jahrzehnte", desc: "Lassen Sie die Zeit für sich arbeiten — mit dem exponentiellen Wachstum des Zinseszinseffekts." },
];

const ApproachSection = () => (
  <section className="section-padding">
    <div className="container max-w-5xl mx-auto px-6">
      <AnimatedSection className="text-center mb-20">
        <h2 className="heading-section">Ein neuer Ansatz für Altersvorsorge</h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <AnimatedSection key={card.title} delay={i * 0.1}>
            <div className="glass-card p-8 h-full transition-shadow duration-300 hover:shadow-md">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-6">
                <card.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
              <p className="text-sm text-primary font-medium mb-3">{card.subtitle}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ApproachSection;
