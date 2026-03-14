import AnimatedSection from "./AnimatedSection";

const WasIstSection = () => (
  <section id="was-ist" className="section-padding bg-secondary">
    <div className="container max-w-3xl mx-auto px-6">
      <AnimatedSection>
        <h2 className="heading-section mb-10">Was ist das Altersvorsorgedepot?</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            Die private Altersvorsorge in Deutschland steht vor einer grundlegenden Neuausrichtung. Der aktuelle
            Gesetzentwurf zur Reform der steuerlich geförderten privaten Altersvorsorge sieht neben den bisherigen
            Garantieprodukten ein neues Modell vor: das <strong className="text-foreground">Altersvorsorgedepot</strong>.
          </p>

          <p>
            Das Altersvorsorgedepot ist ein Wertpapierdepot, in dem Sparer langfristig in Fonds oder ETFs investieren
            können — ähnlich wie bei einem normalen Depot, aber mit staatlicher Förderung und steuerlichen Vorteilen.
            Anders als bei bisherigen Riester-Produkten ist <strong className="text-foreground">keine Beitragsgarantie</strong> vorgeschrieben.
          </p>

          <p>
            Ziel ist es, die private Altersvorsorge einfacher, transparenter und renditestärker zu gestalten. In den
            vergangenen Jahren ist die Nachfrage nach geförderter privater Vorsorge deutlich zurückgegangen. Häufige
            Kritikpunkte an bestehenden Produkten waren:
          </p>

          <ul className="space-y-2 pl-1">
            {[
              "Niedrige Renditen durch die verpflichtende Beitragsgarantie",
              "Hohe Kosten, die einen großen Teil der Erträge aufzehren",
              "Komplexe Förderregeln und unübersichtliche Produktlandschaft",
              "Geringe Transparenz über tatsächliche Kosten und Wertentwicklung",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p>
            Das Altersvorsorgedepot soll diese Probleme adressieren. Durch den Verzicht auf die Beitragsgarantie
            können die Beiträge vollständig am Kapitalmarkt angelegt werden — mit dem Ziel, über lange Zeiträume
            von der Wertentwicklung globaler Märkte zu profitieren.
          </p>

          <div className="bg-background rounded-2xl p-6 border border-border mt-8">
            <p className="text-sm font-medium text-foreground mb-3">Geplante Kernmerkmale im Überblick</p>
            <ul className="space-y-2 text-sm">
              {[
                "Renditeorientierte Anlage in Fonds und ETFs ohne Beitragsgarantie",
                "Staatliche Förderung durch Zulagen und steuerliche Vorteile",
                "Ein vereinfachtes Standardprodukt (Referenzdepot) mit begrenzten Kosten",
                "Effektivkostendeckel von maximal 1,5 % pro Jahr für das Standardprodukt",
                "Bessere Vergleichbarkeit durch standardisierte Produktinformationen",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-muted-foreground/70 italic mt-6">
            Hinweis: Alle Angaben basieren auf dem aktuellen Gesetzentwurf. Die endgültige Ausgestaltung kann
            sich im Laufe des Gesetzgebungsverfahrens ändern.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default WasIstSection;