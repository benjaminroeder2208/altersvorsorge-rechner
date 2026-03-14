import AnimatedSection from "./AnimatedSection";
import { BarChart3, Globe, CalendarClock } from "lucide-react";

const items = [
  { icon: BarChart3, title: "Historische Marktrenditen", desc: "Globale Aktienmärkte haben über lange Zeiträume positive Renditen erzielt." },
  { icon: Globe, title: "Globale Diversifikation", desc: "Breite Streuung reduziert Risiken und erhöht die Stabilität des Portfolios." },
  { icon: CalendarClock, title: "Langfristige Anlagehorizonte", desc: "Zeit ist der stärkste Verbündete beim Vermögensaufbau." },
];

const TrustSection = () => (
  <section className="section-padding bg-secondary">
    <div className="container max-w-5xl mx-auto px-6">
      <AnimatedSection className="text-center mb-20">
        <h2 className="heading-section max-w-3xl mx-auto">
          Langfristiges Investieren ist wissenschaftlich gut untersucht
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
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

      <AnimatedSection className="text-center">
        <blockquote className="text-muted-foreground italic max-w-xl mx-auto">
          „Historische Kapitalmarktdaten zeigen, dass breit diversifizierte Portfolios langfristig positive Renditen erzielen."
        </blockquote>
      </AnimatedSection>
    </div>
  </section>
);

export default TrustSection;
