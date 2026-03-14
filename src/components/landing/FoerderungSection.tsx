import AnimatedSection from "./AnimatedSection";

const FoerderungSection = () => (
  <section id="foerderung" className="section-padding">
    <div className="container max-w-3xl mx-auto px-6">
      <AnimatedSection>
        <h2 className="heading-section mb-10">Wie die staatliche Förderung funktioniert</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            Die Förderung des Altersvorsorgedepots setzt sich aus mehreren Bausteinen zusammen: einer
            Grundzulage, einer Kinderzulage und steuerlichen Vorteilen. Das System soll gegenüber der
            bisherigen Riester-Förderung deutlich vereinfacht werden.
          </p>

          {/* Grundzulage */}
          <h3 className="text-xl font-semibold text-foreground pt-4">Grundzulage</h3>
          <p>
            Die Grundzulage orientiert sich am jährlichen Eigenbeitrag. Im aktuellen Entwurf ist eine
            gestaffelte Zulagenberechnung vorgesehen:
          </p>
          <ul className="space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
              <span><strong className="text-foreground">35 %</strong> auf Eigenbeiträge bis 1.200 € pro Jahr</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
              <span><strong className="text-foreground">20 %</strong> auf Eigenbeiträge zwischen 1.200 € und 1.800 € pro Jahr</span>
            </li>
          </ul>
          <p>
            Bei einem monatlichen Eigenbeitrag von 150 € (1.800 € pro Jahr) ergibt sich eine Grundzulage
            von 540 € pro Jahr. Die Zulage wird nur gewährt, wenn der jährliche Eigenbeitrag mindestens
            120 € beträgt.
          </p>

          {/* Kinderzulage */}
          <h3 className="text-xl font-semibold text-foreground pt-4">Kinderzulage</h3>
          <p>
            Für jedes kindergeldberechtigte Kind ist eine zusätzliche Zulage vorgesehen. Im Entwurf beträgt
            diese <strong className="text-foreground">25 % des Eigenbeitrags, maximal 300 € pro Kind und Jahr</strong>.
          </p>

          <div className="bg-secondary rounded-2xl p-6 border border-border">
            <p className="text-sm font-medium text-foreground mb-3">Beispielrechnung: Familie mit 2 Kindern</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1.5 border-b border-border">
                <span>Monatlicher Eigenbeitrag</span>
                <span className="font-medium text-foreground">150 €</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border">
                <span>Jährlicher Eigenbeitrag</span>
                <span className="font-medium text-foreground">1.800 €</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border">
                <span>Grundzulage</span>
                <span className="font-medium text-primary">540 €</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border">
                <span>Kinderzulage (2 × 300 €)</span>
                <span className="font-medium text-primary">600 €</span>
              </div>
              <div className="flex justify-between py-2 font-semibold text-foreground">
                <span>Gesamte Förderung / Jahr</span>
                <span className="text-primary">1.140 €</span>
              </div>
            </div>
          </div>

          {/* Steuervorteil */}
          <h3 className="text-xl font-semibold text-foreground pt-4">Steuerliche Förderung</h3>
          <p>
            Eigenbeiträge können in der Steuererklärung als Sonderausgaben geltend gemacht werden. Die
            tatsächliche Steuerersparnis hängt vom individuellen Grenzsteuersatz ab. Bei einem
            Grenzsteuersatz von 30 % und einem Eigenbeitrag von 1.800 € ergibt sich eine geschätzte
            Steuerersparnis von mehreren hundert Euro pro Jahr.
          </p>

          {/* Berufseinsteigerbonus */}
          <h3 className="text-xl font-semibold text-foreground pt-4">Berufseinsteigerbonus</h3>
          <p>
            Für Personen unter 25 Jahren sieht der Entwurf einen einmaligen Bonus von
            <strong className="text-foreground"> 200 €</strong> vor, der dem Depot bei Vertragsbeginn gutgeschrieben wird.
          </p>

          {/* Beitragsgrenzen */}
          <h3 className="text-xl font-semibold text-foreground pt-4">Beitragsgrenzen</h3>
          <p>
            Im Entwurf sind die gesamten jährlichen Eigenbeiträge in förderfähige Altersvorsorgeverträge
            auf <strong className="text-foreground">6.840 € pro Jahr</strong> begrenzt. Für die Zulagenberechnung werden
            maximal 1.800 € berücksichtigt.
          </p>

          <p className="text-sm text-muted-foreground/70 italic mt-6">
            Die genauen Förderbedingungen und Beitragsgrenzen hängen vom finalen Gesetz ab und können sich
            im parlamentarischen Verfahren noch ändern.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default FoerderungSection;