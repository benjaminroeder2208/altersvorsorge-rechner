import { Link } from "react-router-dom";
import ContentPageLayout from "@/components/landing/ContentPageLayout";

const HubPage = () => (
  <ContentPageLayout
    title="Das Altersvorsorgedepot einfach erklärt"
    breadcrumbLabel="Überblick"
    relatedLinks={[
      { to: "/altersvorsorgedepot-foerderung", label: "Förderung im Detail" },
      { to: "/altersvorsorgedepot-auszahlung", label: "Auszahlung erklärt" },
      { to: "/altersvorsorgedepot-gesetz", label: "Der Gesetzentwurf" },
      { to: "/altersvorsorgedepot-vs-riester", label: "Vergleich mit Riester" },
      { to: "/altersvorsorgedepot-vs-etf-sparplan", label: "Vergleich mit ETF-Sparplan" },
    ]}
  >
    <section>
      <h2 className="text-xl font-bold mb-3">Was ist das Altersvorsorgedepot?</h2>
      <p className="text-muted-foreground leading-relaxed">
        Das Altersvorsorgedepot ist ein im aktuellen Gesetzentwurf vorgesehenes Modell für die private Altersvorsorge.
        Es ermöglicht renditeorientierte Investitionen in Fonds oder ETFs — ohne die bisher bei Riester-Produkten
        übliche Beitragsgarantie.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Die Beiträge werden staatlich gefördert. Mit dem{" "}
        <Link to="/" className="text-primary font-medium hover:underline">
          Altersvorsorgedepot Rechner
        </Link>{" "}
        können Sie berechnen, wie sich das Depot über die Jahre entwickeln könnte.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Wie funktioniert die Förderung?</h2>
      <p className="text-muted-foreground leading-relaxed">
        Der Staat fördert Einzahlungen mit Zulagen und Steuervorteilen. Die{" "}
        <Link to="/altersvorsorgedepot-foerderung" className="text-primary font-medium hover:underline">
          Förderung
        </Link>{" "}
        setzt sich aus drei Komponenten zusammen:
      </p>
      <ul className="mt-3 space-y-2">
        {[
          "Grundzulage: bis zu 35 % auf Beiträge bis 1.200 €",
          "Kinderzulage: bis zu 300 € pro Kind und Jahr",
          "Steuervorteil durch Sonderausgabenabzug",
        ].map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Wie funktioniert die Auszahlung?</h2>
      <p className="text-muted-foreground leading-relaxed">
        Ab Rentenbeginn wird das Kapital in monatlichen Raten ausgezahlt. Geplant ist auch eine teilweise Kapitalentnahme
        von bis zu 30 %. Mehr dazu auf der Seite zur{" "}
        <Link to="/altersvorsorgedepot-auszahlung" className="text-primary font-medium hover:underline">
          Auszahlung
        </Link>.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Vergleich mit anderen Vorsorgemodellen</h2>
      <p className="text-muted-foreground leading-relaxed">
        Das Altersvorsorgedepot unterscheidet sich sowohl von der{" "}
        <Link to="/altersvorsorgedepot-vs-riester" className="text-primary font-medium hover:underline">
          Riester-Rente
        </Link>{" "}
        als auch von einem normalen{" "}
        <Link to="/altersvorsorgedepot-vs-etf-sparplan" className="text-primary font-medium hover:underline">
          ETF-Sparplan
        </Link>{" "}
        — vor allem durch die staatliche Förderung und den Wegfall der Beitragsgarantie.
      </p>
    </section>
  </ContentPageLayout>
);

export default HubPage;
