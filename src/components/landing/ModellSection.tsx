import AnimatedSection from "./AnimatedSection";

const ModellSection = () => (
  <section id="modell" className="section-padding bg-secondary">
    <div className="container max-w-3xl mx-auto px-6">
      <AnimatedSection>
        <h2 className="heading-section mb-10">Wie das Modell funktioniert</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            Das Altersvorsorgedepot gliedert sich in zwei Phasen: eine Ansparphase während des Berufslebens
            und eine Auszahlungsphase im Ruhestand. Beide Phasen sind im Gesetzentwurf geregelt.
          </p>

          {/* Ansparphase */}
          <h3 className="text-xl font-semibold text-foreground pt-4">Ansparphase: Vermögensaufbau über Jahrzehnte</h3>
          <p>
            Während der Ansparphase zahlen Sparer regelmäßig in ihr Altersvorsorgedepot ein. Die Beiträge
            werden in Fonds oder ETFs investiert — beispielsweise in breit gestreute Indexfonds, die die
            Wertentwicklung globaler Aktienmärkte abbilden.
          </p>
          <p>
            Anders als bei klassischen Versicherungsprodukten gibt es keine vorgeschriebene Beitragsgarantie.
            Das bedeutet: Das angelegte Kapital kann Schwankungen unterliegen, profitiert aber langfristig
            vom Wachstumspotenzial der Kapitalmärkte.
          </p>

          <div className="bg-background rounded-2xl p-6 border border-border">
            <p className="text-sm font-medium text-foreground mb-3">Warum ETF-basierte Altersvorsorge?</p>
            <p className="text-sm text-muted-foreground mb-4">
              Breit gestreute ETFs investieren in hunderte oder tausende Unternehmen weltweit. Historisch
              haben globale Aktienmärkte über lange Zeiträume von 20 Jahren und mehr positive Renditen
              erzielt — trotz zwischenzeitlicher Schwankungen.
            </p>
            <ul className="space-y-2 text-sm">
              {[
                "Breite Diversifikation reduziert das Risiko einzelner Anlagen",
                "Niedrige Kosten im Vergleich zu aktiv gemanagten Fonds",
                "Transparente Zusammensetzung und tägliche Handelbarkeit",
                "Langfristig höhere Renditechancen als bei Garantieprodukten",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            Ein Rechenbeispiel: Wer 30 Jahre lang 150 € monatlich investiert und dabei eine durchschnittliche
            Rendite von 7 % pro Jahr erzielt, hätte am Ende der Ansparphase rein rechnerisch über 180.000 €
            allein aus Eigenbeiträgen und Kapitalerträgen angespart. Mit staatlicher Förderung könnte dieser
            Betrag deutlich höher ausfallen.
          </p>
          <p className="text-sm text-muted-foreground/70 italic">
            Hinweis: Vergangene Marktrenditen sind kein verlässlicher Indikator für zukünftige Ergebnisse.
          </p>

          {/* Auszahlungsphase */}
          <h3 className="text-xl font-semibold text-foreground pt-8">Auszahlungsphase: Flexible Entnahme im Ruhestand</h3>
          <p>
            Im Ruhestand wird das angesparte Kapital ausgezahlt. Der Gesetzentwurf sieht verschiedene
            Möglichkeiten vor:
          </p>
          <ul className="space-y-2 pl-1">
            {[
              "Lebenslange Rente: Umwandlung des Kapitals in eine monatliche Rente über eine Versicherung",
              "Auszahlungsplan: Regelmäßige Entnahmen über einen festgelegten Zeitraum (z. B. bis Alter 85)",
              "Teilweise Kapitalentnahme: Bis zu 30 % des Kapitals können zu Rentenbeginn entnommen werden",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Bei einem Auszahlungsplan wird das verbleibende Kapital weiterhin angelegt und kann so
            auch im Ruhestand Erträge erwirtschaften.
          </p>

          {/* Standardprodukt */}
          <h3 className="text-xl font-semibold text-foreground pt-8">Das Standardprodukt (Referenzdepot)</h3>
          <p>
            Um den Einstieg zu erleichtern, sieht der Entwurf ein sogenanntes Referenzdepot vor — ein
            voreingestelltes Standardprodukt mit folgenden Merkmalen:
          </p>
          <ul className="space-y-2 pl-1">
            {[
              "Voreingestellte Anlagestrategie, die keine aktive Entscheidung erfordert",
              "Effektivkosten von maximal 1,5 % pro Jahr",
              "Reduzierte Komplexität für Anleger ohne Börsenerfahrung",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Darüber hinaus sollen Anbieter auch individuelle Depotlösungen anbieten können, die mehr
            Flexibilität bei der Produktauswahl bieten.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default ModellSection;