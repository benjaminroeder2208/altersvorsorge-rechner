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
      <h2 className="text-xl font-bold mb-3">Angaben gemäß § 5 DDG</h2>
      <p className="text-muted-foreground leading-relaxed">
        Benjamin Röder<br />
        Mainkurstraße 16<br />
        63075 Offenbach am Main
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Kontakt</h2>
      <p className="text-muted-foreground leading-relaxed">
        E-Mail: benjamin@kontakt-2.de
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p className="text-muted-foreground leading-relaxed">
        Benjamin Röder<br />
        Mainkurstraße 16<br />
        63075 Offenbach am Main
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Haftungshinweis</h2>
      <p className="text-muted-foreground leading-relaxed">
        Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Alle Angaben zum Altersvorsorgedepot basieren auf dem aktuellen Gesetzentwurf. Änderungen im Gesetzgebungsverfahren sind möglich. Die Inhalte stellen keine Anlage-, Steuer- oder Rechtsberatung dar.
      </p>
    </section>
  </ContentPageLayout>
);

export default ImpressumPage;
