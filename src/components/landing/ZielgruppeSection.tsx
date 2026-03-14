import AnimatedSection from "./AnimatedSection";

const ZielgruppeSection = () => (
  <section id="zielgruppe" className="section-padding">
    <div className="container max-w-3xl mx-auto px-6">
      <AnimatedSection>
        <h2 className="heading-section mb-10">Für wen könnte das Modell geeignet sein?</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            Das Altersvorsorgedepot richtet sich an Personen, die langfristig für den Ruhestand
            vorsorgen möchten und dabei bereit sind, auf eine Beitragsgarantie zu verzichten.
            Es eignet sich besonders für Menschen mit einem langen Anlagehorizont.
          </p>

          <h3 className="text-xl font-semibold text-foreground pt-4">Mögliche Zielgruppen</h3>
          <ul className="space-y-3 pl-1">
            {[
              {
                title: "Berufseinsteiger und junge Arbeitnehmer",
                desc: "Mit 30 oder mehr Jahren bis zur Rente profitieren sie besonders vom Zinseszinseffekt und können kurzfristige Marktschwankungen aussitzen.",
              },
              {
                title: "Familien",
                desc: "Die Kinderzulage von bis zu 300 € pro Kind und Jahr kann die Förderung erheblich erhöhen.",
              },
              {
                title: "Personen mit mittlerem bis höherem Einkommen",
                desc: "Neben den Zulagen können sie zusätzlich vom steuerlichen Sonderausgabenabzug profitieren.",
              },
              {
                title: "Anleger, die bereits Erfahrung mit ETFs haben",
                desc: "Das Modell orientiert sich an der vertrauten Logik eines Wertpapierdepots — mit dem Zusatzeffekt der staatlichen Förderung.",
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <div>
                  <span className="font-medium text-foreground">{item.title}</span>
                  <p className="text-sm mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-foreground pt-8">Was man bedenken sollte</h3>
          <p>
            Das Altersvorsorgedepot ist nicht für jeden die richtige Lösung. Wer eine garantierte
            Mindestauszahlung benötigt oder nur wenige Jahre bis zur Rente hat, könnte mit anderen
            Vorsorgemodellen besser beraten sein.
          </p>
          <ul className="space-y-2 pl-1">
            {[
              "Ohne Beitragsgarantie besteht das Risiko, dass das Kapital zum Rentenbeginn unter der Summe der eingezahlten Beiträge liegt",
              "Der Anlageerfolg hängt von der Marktentwicklung ab und ist nicht vorhersagbar",
              "Geförderte Beiträge sind grundsätzlich bis zum Ruhestand gebunden",
              "Auszahlungen im Alter unterliegen der Einkommensteuer",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 mt-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-muted-foreground/70 italic mt-6">
            Diese Übersicht ersetzt keine individuelle Beratung. Die Eignung des Modells hängt von der
            persönlichen Lebenssituation ab. Details können sich mit dem finalen Gesetz ändern.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default ZielgruppeSection;