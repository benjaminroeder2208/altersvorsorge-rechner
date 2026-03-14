import AnimatedSection from "./AnimatedSection";

const GrowthChart = () => (
  <svg viewBox="0 0 600 250" className="w-full" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(216, 100%, 34%)" />
        <stop offset="100%" stopColor="hsl(210, 100%, 60%)" />
      </linearGradient>
      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(216, 100%, 34%)" stopOpacity="0.15" />
        <stop offset="100%" stopColor="hsl(216, 100%, 34%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Grid lines */}
    {[0, 1, 2, 3, 4].map((i) => (
      <line key={i} x1="50" y1={40 + i * 45} x2="570" y2={40 + i * 45} stroke="hsl(220, 13%, 91%)" strokeWidth="1" />
    ))}
    {/* Area */}
    <path d="M50 220 Q150 215 220 190 T350 120 T480 50 T570 20 V220 H50Z" fill="url(#areaGrad)" />
    {/* Line */}
    <path d="M50 220 Q150 215 220 190 T350 120 T480 50 T570 20" fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
    {/* End dot */}
    <circle cx="570" cy="20" r="5" fill="hsl(216, 100%, 34%)" />
    {/* Labels */}
    <text x="50" y="245" fontSize="12" fill="hsl(240, 1%, 44%)" fontFamily="Inter">Heute</text>
    <text x="530" y="245" fontSize="12" fill="hsl(240, 1%, 44%)" fontFamily="Inter">Rente</text>
    <text x="540" y="16" fontSize="13" fontWeight="600" fill="hsl(216, 100%, 34%)" fontFamily="Inter">400k+</text>
  </svg>
);

const ScenarioSection = () => (
  <section className="section-padding">
    <div className="container max-w-5xl mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <h2 className="heading-section">Wie könnte Ihre Zukunft aussehen?</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="glass-card max-w-3xl mx-auto overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { label: "Alter", value: "35 Jahre" },
                { label: "Monatlich", value: "150 €" },
                { label: "Rendite", value: "7 % p.a." },
              ].map((item) => (
                <div key={item.label} className="flex-1 min-w-[120px]">
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            <GrowthChart />

            <div className="mt-10 pt-8 border-t border-border text-center">
              <p className="text-muted-foreground mb-2">Mögliches Ergebnis</p>
              <p className="text-4xl md:text-5xl font-bold tracking-tight">
                Über <span className="text-primary">400.000 €</span>
              </p>
              <p className="text-muted-foreground mt-2">Vermögen bis zur Rente</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Anna, 35 Jahre — Beispielrechnung. Keine Garantie für zukünftige Ergebnisse.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ScenarioSection;
