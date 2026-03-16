import ContentPageLayout from "@/components/landing/ContentPageLayout";

const DatenschutzPage = () => (
  <ContentPageLayout
    title="Datenschutzerklärung"
    breadcrumbLabel="Datenschutz"
    path="/datenschutz"
    description="Datenschutzerklärung von altersvorsorge-rechner.com"
    robots="noindex,nofollow"
    relatedLinks={[]}
  >
    <section>
      <h2 className="text-xl font-bold mb-3">1. Verantwortlicher</h2>
      <p className="text-muted-foreground leading-relaxed">
        Benjamin Röder<br />
        Mainkurstraße 16<br />
        63075 Offenbach am Main<br />
        E-Mail: benjamin@kontakt-2.de
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">2. Allgemeines</h2>
      <p className="text-muted-foreground leading-relaxed">
        Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, BDSG).
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">3. Hosting</h2>
      <p className="text-muted-foreground leading-relaxed">
        Diese Website wird über Lovable (Lovable Technology Ltd.) gehostet. Beim Aufruf der Website werden technische Verbindungsdaten (z.&nbsp;B. IP-Adresse, Zeitpunkt des Zugriffs) im Rahmen des Hostingbetriebs verarbeitet. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse am sicheren Betrieb der Website).
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">4. Cookies</h2>
      <p className="text-muted-foreground leading-relaxed">
        Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Seite erforderlich sind. Diese Cookies speichern keine personenbezogenen Daten und erfordern keine Einwilligung.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">5. Ergebnis per E-Mail</h2>
      <p className="text-muted-foreground leading-relaxed">
        Wenn Sie Ihre E-Mail-Adresse angeben, um Ihr Berechnungsergebnis zugesendet zu bekommen, wird diese Adresse ausschließlich für den einmaligen Versand verwendet. Der E-Mail-Versand erfolgt über den Dienst Resend (Resend Inc., 2261 Market Street, San Francisco, CA 94114, USA). Ihre E-Mail-Adresse wird nicht für Werbezwecke genutzt und nicht an Dritte weitergegeben. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO (Einwilligung durch aktive Eingabe).
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">6. Ihre Rechte</h2>
      <p className="text-muted-foreground leading-relaxed">
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten sowie das Recht auf Datenübertragbarkeit. Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: benjamin@kontakt-2.de
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Die zuständige Behörde für Hessen ist der Hessische Beauftragte für Datenschutz und Informationsfreiheit (HBDI).
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">7. Änderungen</h2>
      <p className="text-muted-foreground leading-relaxed">
        Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die jeweils aktuelle Version ist auf dieser Seite abrufbar.
      </p>
    </section>
  </ContentPageLayout>
);

export default DatenschutzPage;
