import { Link } from "react-router-dom";
import ContentPageLayout from "@/components/landing/ContentPageLayout";

const VsRiesterPage = () => (
  <ContentPageLayout
    title="Altersvorsorgedepot vs Riester – Die wichtigsten Unterschiede"
    breadcrumbLabel="vs. Riester"
    path="/altersvorsorgedepot-vs-riester"
    description="Wie unterscheidet sich das Altersvorsorgedepot von Riester? Ein Vergleich von Förderung, Renditechancen, Flexibilität und Struktur."
    ogTitle="Altersvorsorgedepot vs Riester"
    ogDescription="Förderung, Renditechancen und Flexibilität im Vergleich: Altersvorsorgedepot oder Riester?"
    relatedLinks={[
      { to: "/altersvorsorgedepot", label: "Altersvorsorgedepot im Überblick" },
      { to: "/altersvorsorgedepot-foerderung", label: "Förderung im Detail" },
      { to: "/altersvorsorgedepot-vs-etf-sparplan", label: "Vergleich mit ETF-Sparplan" },
    ]}
  >
    <p className="text-muted-foreground leading-relaxed">
      Das{" "}
      <Link to="/altersvorsorgedepot" className="text-primary font-medium hover:underline">
        Altersvorsorgedepot
      </Link>{" "}
      soll die Riester-Rente ablösen. Die wichtigsten Unterschiede im Überblick.
    </p>

    <section>
      <h2 className="text-xl font-bold mb-3">Kostenvergleich</h2>
      <p className="text-muted-foreground leading-relaxed">
        Riester-Produkte sind häufig mit hohen Verwaltungs- und Abschlusskosten verbunden. Das Altersvorsorgedepot sieht einen Effektivkostendeckel vor, der die Gesamtkosten begrenzen soll.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Renditechancen</h2>
      <p className="text-muted-foreground leading-relaxed">
        Riester-Produkte müssen garantieren, dass mindestens die eingezahlten Beiträge zum Rentenbeginn erhalten bleiben. Diese Beitragsgarantie schränkt die Anlage am Kapitalmarkt stark ein. Das Altersvorsorgedepot verzichtet darauf und ermöglicht eine vollständige Investition in Fonds und ETFs.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Förderung</h2>
      <p className="text-muted-foreground leading-relaxed">
        Die{" "}
        <Link to="/altersvorsorgedepot-foerderung" className="text-primary font-medium hover:underline">
          Zulagenstruktur
        </Link>{" "}
        wird vereinfacht und auf ein prozentuales Modell umgestellt. Der Sonderausgabenabzug bleibt bestehen.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Vergleichen Sie die mögliche Entwicklung mit dem{" "}
        <Link to="/" className="text-primary font-medium hover:underline">
          Altersvorsorgedepot Rechner
        </Link>.
      </p>
    </section>
  </ContentPageLayout>
);

export default VsRiesterPage;
