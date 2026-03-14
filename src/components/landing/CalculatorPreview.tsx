import AnimatedSection from "./AnimatedSection";

const CalculatorPreview = () => (
  <section className="section-padding">
    <div className="container max-w-5xl mx-auto px-6">
      <AnimatedSection className="text-center mb-6">
        <h2 className="heading-section mb-6">Wie könnte sich ein Altersvorsorgedepot entwickeln?</h2>
      </AnimatedSection>
      <AnimatedSection delay={0.05} className="text-center mb-16">
        <p className="text-body max-w-2xl mx-auto">
          Ein digitaler Rechner wird entwickelt, um mögliche Szenarien zu simulieren.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="glass-card max-w-3xl mx-auto p-1 relative overflow-hidden">
          <div className="rounded-xl bg-background p-8 md:p-12 relative">
            {/* Badge */}
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Rechner in Entwicklung
              </span>
            </div>

            <div className="space-y-8">
              {/* Input row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {["Alter", "Monatlicher Beitrag", "Förderung", "Anlagedauer"].map((label) => (
                  <div key={label} className="space-y-2">
                    <div className="h-3.5 w-20 bg-muted rounded" />
                    <div className="h-11 bg-muted rounded-lg" />
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="h-48 md:h-56 bg-muted rounded-xl flex items-center justify-center">
                <svg width="200" height="80" viewBox="0 0 200 80" className="text-primary/20">
                  <path d="M0 70 Q50 65 80 50 T140 25 T200 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Output row */}
              <div className="grid md:grid-cols-2 gap-5">
                {["Mögliches Kapital zur Rente", "Mögliche monatliche Auszahlung"].map((label) => (
                  <div key={label} className="space-y-2">
                    <div className="h-3.5 bg-muted rounded w-3/4" />
                    <div className="h-14 bg-muted rounded-lg" />
                  </div>
                ))}
              </div>

              {/* Mock button */}
              <div className="flex justify-center">
                <div className="h-12 w-48 bg-muted rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default CalculatorPreview;