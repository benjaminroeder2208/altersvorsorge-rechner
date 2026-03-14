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
      <h2 className="text-xl font-bold mb-3">Verantwortlicher</h2>
      <p className="text-muted-foreground leading-relaxed">
        [Ihr vollständiger Name]<br />
        [Straße und Hausnummer]<br />
        [PLZ und Ort]<br />
        E-Mail: [ihre@email.de]
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Erhebung und Verarbeitung von Daten</h2>
      <p className="text-muted-foreground leading-relaxed">
        Diese Website erhebt und verarbeitet personenbezogene Daten nur im technisch notwendigen Umfang. Alle Berechnungen im Rechner erfolgen lokal im Browser – es werden keine Eingabedaten an einen Server übertragen.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Hosting</h2>
      <p className="text-muted-foreground leading-relaxed">
        [Angaben zum Hosting-Anbieter einfügen, z. B. Vercel, Netlify, etc.]
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Cookies</h2>
      <p className="text-muted-foreground leading-relaxed">
        [Angaben zu verwendeten Cookies einfügen. Falls keine Cookies gesetzt werden: „Diese Website verwendet keine Cookies."]
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Ihre Rechte</h2>
      <p className="text-muted-foreground leading-relaxed">
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Bei Fragen wenden Sie sich an die oben genannte Kontaktadresse.
      </p>
    </section>
  </ContentPageLayout>
);

export default DatenschutzPage;
