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
    {/* 1 */}
    <section>
      <h2 className="text-xl font-bold mb-3">1. Datenschutz auf einen Blick</h2>

      <h3 className="text-lg font-semibold mt-4 mb-2">Allgemeine Hinweise</h3>
      <p className="text-muted-foreground leading-relaxed">
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Datenerfassung auf dieser Website</h3>
      <p className="text-muted-foreground leading-relaxed">
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten finden Sie im Impressum dieser Website.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Wie erfassen wir Ihre Daten?</h3>
      <p className="text-muted-foreground leading-relaxed">
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen — etwa durch Eingabe Ihrer E-Mail-Adresse. Andere Daten werden automatisch beim Besuch der Website erfasst: technische Daten wie IP-Adresse, Browsertyp und Zeitpunkt des Zugriffs.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Welche Rechte haben Sie?</h3>
      <p className="text-muted-foreground leading-relaxed">
        Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Datenübertragbarkeit. Außerdem steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
      </p>
    </section>

    {/* 2 */}
    <section>
      <h2 className="text-xl font-bold mb-3">2. Verantwortlicher</h2>
      <p className="text-muted-foreground leading-relaxed">
        Benjamin Röder<br />
        Mainkurstraße 16<br />
        63075 Offenbach am Main<br />
        E-Mail: info@altersvorsorge-rechner.com
      </p>
    </section>

    {/* 3 */}
    <section>
      <h2 className="text-xl font-bold mb-3">3. Hosting</h2>
      <p className="text-muted-foreground leading-relaxed">
        Diese Website wird über Lovable (Lovable Technology Ltd., 2nd Floor College House, 17 King Edwards Road, London, HA4 7AE, Vereinigtes Königreich) gehostet.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Beim Aufruf der Website werden technische Verbindungsdaten verarbeitet: IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Seite, Browsertyp und Betriebssystem. Diese Daten sind technisch notwendig für den sicheren Betrieb der Website und werden nicht dauerhaft gespeichert.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse am sicheren Websitebetrieb).
      </p>
    </section>

    {/* 4 */}
    <section>
      <h2 className="text-xl font-bold mb-3">4. SSL- und TLS-Verschlüsselung</h2>
      <p className="text-muted-foreground leading-relaxed">
        Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers mit „https://" beginnt und ein Schloss-Symbol angezeigt wird. Bei aktivierter Verschlüsselung können übermittelte Daten nicht von Dritten mitgelesen werden.
      </p>
    </section>

    {/* 5 */}
    <section>
      <h2 className="text-xl font-bold mb-3">5. Cookies</h2>
      <p className="text-muted-foreground leading-relaxed">
        Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Seite erforderlich sind. Sie speichern keine personenbezogenen Daten und erfordern keine Einwilligung.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Tracking-Cookies, Werbe-Cookies oder Cookies zur Verhaltensanalyse werden nicht eingesetzt.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse am technischen Betrieb der Website).
      </p>
    </section>

    {/* 6 */}
    <section>
      <h2 className="text-xl font-bold mb-3">6. Schriftarten</h2>
      <p className="text-muted-foreground leading-relaxed">
        Diese Website verwendet ausschließlich systemseitig vorinstallierte Schriftarten (System-Fonts). Es werden keine externen Schriftartdienste wie Google Fonts geladen. Es findet daher keine Verbindung zu externen Servern für Schriftarten statt.
      </p>
    </section>

    {/* 7 */}
    <section>
      <h2 className="text-xl font-bold mb-3">7. Analyse und Tracking</h2>
      <p className="text-muted-foreground leading-relaxed">
        Diese Website verwendet Flock Analytics zur anonymisierten Analyse des Nutzerverhaltens. Dabei werden keine personenbezogenen Daten erfasst, keine Cookies gesetzt und keine individuellen Nutzerprofile erstellt. Die erfassten Daten (z.&nbsp;B. aufgerufene Seiten, Verweildauer) sind vollständig anonymisiert und können nicht einer bestimmten Person zugeordnet werden.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Die Analyse dient ausschließlich der Verbesserung des Angebots.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an der Websiteoptimierung).
      </p>
    </section>

    {/* 8 */}
    <section>
      <h2 className="text-xl font-bold mb-3">8. E-Mail-Erfassung und Newsletter</h2>

      <h3 className="text-lg font-semibold mt-4 mb-2">Double-Opt-In-Verfahren</h3>
      <p className="text-muted-foreground leading-relaxed">
        Wenn Sie Ihre E-Mail-Adresse angeben, verwenden wir ein Double-Opt-In-Verfahren: Sie erhalten zunächst eine Bestätigungsmail mit einem Bestätigungslink. Erst nach Klick auf diesen Link wird Ihre Adresse aktiviert und die Auswertung sowie weitere E-Mails versendet. Nicht bestätigte Adressen werden nach 48 Stunden automatisch gelöscht.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Zweck der Verarbeitung</h3>
      <p className="text-muted-foreground leading-relaxed">
        Ihre E-Mail-Adresse wird verwendet für:
      </p>
      <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mt-2 space-y-1">
        <li>Den Versand Ihrer persönlichen Berechnungsauswertung</li>
        <li>Gelegentliche Informationen zum Stand des Altersvorsorgedepot-Gesetzgebungsverfahrens</li>
        <li>Follow-up-E-Mails mit Altersvorsorge-Tipps (maximal 3 E-Mails innerhalb von 7 Tagen nach Anmeldung)</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Ihre Adresse wird nicht für Werbezwecke genutzt und nicht an Dritte weitergegeben.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">E-Mail-Versand über Resend</h3>
      <p className="text-muted-foreground leading-relaxed">
        Der E-Mail-Versand erfolgt über:<br />
        Resend Inc.<br />
        2261 Market Street #5039<br />
        San Francisco, CA 94114, USA
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Mit Resend besteht ein Auftragsverarbeitungsvertrag (AVV) gemäß Art.&nbsp;28 DSGVO. Die Datenübertragung in die USA erfolgt auf Basis der EU-Standardvertragsklauseln gemäß Art.&nbsp;46 Abs.&nbsp;2 lit.&nbsp;c DSGVO.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Datenspeicherung über Supabase</h3>
      <p className="text-muted-foreground leading-relaxed">
        Ihre E-Mail-Adresse und Berechnungsergebnisse werden gespeichert bei:<br />
        Supabase Inc.<br />
        970 Trestle Glen Rd<br />
        Oakland, CA 94610, USA
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Mit Supabase besteht ein Auftragsverarbeitungsvertrag (AVV) gemäß Art.&nbsp;28 DSGVO. Die Datenübertragung in die USA erfolgt auf Basis der EU-Standardvertragsklauseln.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Speicherdauer</h3>
      <p className="text-muted-foreground leading-relaxed">
        Ihre Daten werden gespeichert solange dies für den Versandzweck erforderlich ist. Nach Abmeldung wird Ihre E-Mail-Adresse in einer Sperrliste geführt um weiteren Versand dauerhaft zu unterbinden. Auf Wunsch werden Ihre Daten vollständig gelöscht — Anfragen an: info@altersvorsorge-rechner.com
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Abmeldung</h3>
      <p className="text-muted-foreground leading-relaxed">
        Sie können sich jederzeit vom Newsletter abmelden. Ein Abmeldelink ist in jeder E-Mail enthalten. Der Widerruf der Einwilligung berührt nicht die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO (Einwilligung durch aktives Setzen der Checkbox und Bestätigung per Double-Opt-In).
      </p>
    </section>

    {/* 9 */}
    <section>
      <h2 className="text-xl font-bold mb-3">9. KI-gestützte Funktionen</h2>
      <p className="text-muted-foreground leading-relaxed">
        Diese Website nutzt KI-Funktionen (KI-Auswertung und Vorsorge-Assistent Chat) auf Basis der Anthropic Claude API:
      </p>
      <p className="text-muted-foreground leading-relaxed mt-2">
        Anthropic PBC<br />
        548 Market St, PMB 90375<br />
        San Francisco, CA 94104, USA
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Dabei werden Ihre Rechner-Eingaben (Geburtsjahr, monatlicher Beitrag, Renteneintrittsalter, Anzahl Kinder, Einkommensklasse und berechnete Ergebnisse) sowie Ihre Chat-Nachrichten an die Anthropic API übermittelt, um eine personalisierte Auswertung oder Antwort zu generieren.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Diese Daten werden von Anthropic nicht dauerhaft gespeichert und nicht für das Training von KI-Modellen verwendet.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Die Nutzung der KI-Funktionen ist freiwillig. Die Rechner-Grundfunktion ist ohne KI-Nutzung verfügbar.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO (Einwilligung durch aktive Nutzung der Funktion).
      </p>
    </section>

    {/* 10 */}
    <section>
      <h2 className="text-xl font-bold mb-3">10. Ihre Rechte</h2>
      <p className="text-muted-foreground leading-relaxed">
        Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
      </p>

      <p className="text-muted-foreground leading-relaxed mt-4">
        <strong>Auskunftsrecht (Art.&nbsp;15 DSGVO)</strong><br />
        Sie können Auskunft über die von uns gespeicherten Daten verlangen.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        <strong>Berichtigungsrecht (Art.&nbsp;16 DSGVO)</strong><br />
        Sie können die Berichtigung unrichtiger Daten verlangen.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        <strong>Löschungsrecht (Art.&nbsp;17 DSGVO)</strong><br />
        Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        <strong>Einschränkung der Verarbeitung (Art.&nbsp;18 DSGVO)</strong><br />
        Sie können die Einschränkung der Verarbeitung verlangen.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        <strong>Datenübertragbarkeit (Art.&nbsp;20 DSGVO)</strong><br />
        Sie können Ihre Daten in einem maschinenlesbaren Format erhalten.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        <strong>Widerspruchsrecht (Art.&nbsp;21 DSGVO)</strong><br />
        Sie können der Verarbeitung auf Basis berechtigter Interessen widersprechen.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        <strong>Widerruf der Einwilligung</strong><br />
        Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen — ohne Angabe von Gründen.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-4">
        Zur Ausübung Ihrer Rechte: info@altersvorsorge-rechner.com
      </p>
    </section>

    {/* 11 */}
    <section>
      <h2 className="text-xl font-bold mb-3">11. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p className="text-muted-foreground leading-relaxed">
        Sie haben das Recht, sich bei der zuständigen Datenschutz-Aufsichtsbehörde zu beschweren. Für Hessen ist dies:
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Der Hessische Beauftragte für Datenschutz und Informationsfreiheit (HBDI)<br />
        Postfach 3163<br />
        65021 Wiesbaden<br />
        <a href="https://datenschutz.hessen.de" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
          https://datenschutz.hessen.de
        </a>
      </p>
    </section>

    {/* 12 */}
    <section>
      <h2 className="text-xl font-bold mb-3">12. Widerspruch gegen Werbe-Mails</h2>
      <p className="text-muted-foreground leading-relaxed">
        Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung wird hiermit widersprochen. Bei unverlangter Zusendung von Werbeinformationen behalten wir uns ausdrücklich rechtliche Schritte vor.
      </p>
    </section>

    {/* 13 */}
    <section>
      <h2 className="text-xl font-bold mb-3">13. Aktualität dieser Erklärung</h2>
      <p className="text-muted-foreground leading-relaxed">
        Diese Datenschutzerklärung wurde zuletzt im März 2026 aktualisiert. Wir behalten uns vor, sie bei Änderungen der rechtlichen Lage oder unserer Dienste anzupassen. Die jeweils aktuelle Version ist auf dieser Seite abrufbar.
      </p>
    </section>
  </ContentPageLayout>
);

export default DatenschutzPage;
