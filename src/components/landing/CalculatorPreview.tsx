import AnimatedSection from "./AnimatedSection";

const CalculatorPreview = () => (
  <section className="section-padding bg-secondary">
    <div className="container max-w-5xl mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <h2 className="heading-section mb-6">Bald verfügbar: Der Altersvorsorge-Rechner</h2>
        <p className="text-body max-w-2xl mx-auto">
          Berechnen Sie in wenigen Sekunden, wie sich Ihr Altersvorsorge-Depot entwickeln kann.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="glass-card max-w-3xl mx-auto p-1 relative overflow-hidden">
          {/* Calculator mockup UI */}
          <div className="rounded-xl bg-background p-8 md:p-12 relative">
            {/* Coming soon badge */}
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                Coming soon
              </span>
            </div>

            <div className="space-y-8">
              {/* Mock inputs */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="h-12 bg-muted rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-12 bg-muted rounded-lg" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-muted rounded" />
                  <div className="h-12 bg-muted rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-muted rounded" />
                  <div className="h-12 bg-muted rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="h-12 bg-muted rounded-lg" />
                </div>
              </div>

              {/* Mock chart area */}
              <div className="h-48 md:h-56 bg-muted rounded-xl flex items-center justify-center">
                <svg width="200" height="80" viewBox="0 0 200 80" className="text-primary/20">
                  <path
                    d="M0 70 Q50 65 80 50 T140 25 T200 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Mock button */}
              <div className="flex justify-center">
                <div className="h-12 w-48 bg-muted rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="text-center mt-12">
        <a
          href="#waitlist"
          className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
        >
          Frühzugang erhalten
        </a>
      </AnimatedSection>
    </div>
  </section>
);

export default CalculatorPreview;
