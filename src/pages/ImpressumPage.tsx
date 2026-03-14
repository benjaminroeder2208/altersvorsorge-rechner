import ContentPageLayout from "@/components/landing/ContentPageLayout";

const ImpressumPage = () => (
  <ContentPageLayout
    title="Impressum"
    breadcrumbLabel="Impressum"
    path="/impressum"
    description="Impressum von altersvorsorge-rechner.com"
    robots="noindex,nofollow"
    relatedLinks={[]}
  >
    <section>
      <h2 className="text-xl font-bold mb-3">Angaben gemäß § 5 TMG</h2>
      <p className="text-muted-foreground leading-relaxed">
        [Ihr vollständiger Name]<br />
        [Straße und Hausnummer]<br />
        [PLZ und Ort]
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Kontakt</h2>
      <p className="text-muted-foreground leading-relaxed">
        E-Mail: [ihre@email.de]
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Haftungsausschluss</h2>
      <p className="text-muted-foreground leading-relaxed">
        Alle Inhalte auf dieser Website dienen ausschließlich der allgemeinen Information. Sie stellen keine Anlage-, Steuer- oder Rechtsberatung dar. Die dargestellten Berechnungen basieren auf dem aktuellen Gesetzentwurf zur Reform der privaten Altersvorsorge und sind unverbindliche Simulationen. Änderungen im Gesetzgebungsverfahren sind möglich.
      </p>
    </section>
  </ContentPageLayout>
);

export default ImpressumPage;
