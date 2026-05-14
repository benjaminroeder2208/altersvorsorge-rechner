import { Link } from "react-router-dom";
import PageHead from "@/components/seo/PageHead";
import { ArrowRight, AlertTriangle, User, TrendingDown } from "lucide-react";

const ReichtMeineRentePage = () => (
  <>
    <PageHead
      title="Reicht meine Rente? – Rentenlücke in 2 Minuten berechnen"
      description="Finde heraus, ob deine gesetzliche Rente reicht. Berechne deine persönliche Rentenlücke in nur 2 Minuten – kostenlos und unverbindlich."
      path="/reicht-meine-rente"
    />

    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Subtle flow header */}
      <div className="w-full border-b border-border/30">
        <div className="max-w-2xl mx-auto px-6 py-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground tracking-tight">Renten-Check</p>
          <p className="text-xs text-muted-foreground">Schritt 1 von 3</p>
        </div>
      </div>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4">
          Kostenloser Schnellcheck
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-2xl">
          Reicht deine Rente{" "}
          <span className="text-primary">später aus?</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
          Die meisten unterschätzen ihre Rentenlücke. Finde in 2&nbsp;Minuten heraus, wie deine Situation aussieht.
        </p>
        <Link
          to="/renten-check"
          className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
        >
          Jetzt berechnen
          <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="mt-4 text-xs text-muted-foreground">Dauert nur 3 kurze Fragen</p>
      </section>

      {/* PROBLEM */}
      <section className="bg-muted/40 py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Die gesetzliche Rente reicht oft nicht
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Wer 45&nbsp;Jahre lang durchschnittlich verdient, bekommt derzeit rund 1.770&nbsp;€ brutto Rente im Monat – nach Abzügen bleiben oft nur 1.400&nbsp;€ netto. Viele merken erst kurz vor der Rente, dass das nicht reicht. Je früher du Klarheit hast, desto mehr Optionen bleiben dir.
          </p>
        </div>
      </section>

      {/* PERSONAL RELEVANCE */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Es geht um <span className="text-primary">deine</span> Situation
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Es geht nicht um irgendeine Rente, sondern um deine persönliche Situation – dein Gehalt, dein Alter, dein gewünschter Lebensstandard.
          </p>
        </div>
      </section>

      {/* MINI INSIGHT */}
      <section className="bg-muted/40 py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 text-destructive mb-2">
            <TrendingDown className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            500 – 1.000 € im Monat fehlen
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Viele Arbeitnehmer haben eine Rentenlücke zwischen 500&nbsp;€ und 1.000&nbsp;€ im Monat. Das summiert sich über 20&nbsp;Jahre Ruhestand schnell auf sechsstellige Beträge.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 px-6 flex-1 flex items-center">
        <div className="max-w-lg mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Wie groß ist deine Lücke?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Kostenlos, unverbindlich, in 2&nbsp;Minuten.
          </p>
          <Link
            to="/renten-check"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Rentenlücke berechnen
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border/30 py-6 px-6">
        <p className="text-xs text-muted-foreground text-center">
          Renten-Check · Vereinfachte Schätzung · Keine Anlageberatung
        </p>
      </div>
    </div>
  </>
);

export default ReichtMeineRentePage;
