import { Link } from "react-router-dom";
import ContentPageLayout from "@/components/landing/ContentPageLayout";

const AuszahlungPage = () => (
  <ContentPageLayout
    title="Wie funktioniert die Auszahlung beim Altersvorsorgedepot?"
    breadcrumbLabel="Auszahlung"
    path="/altersvorsorgedepot-auszahlung"
    description="Wie die Auszahlung beim Altersvorsorgedepot funktioniert: Auszahlungsphase, Renteneintritt und Kapitalentnahme."
    relatedLinks={[
      { to: "/altersvorsorgedepot", label: "Altersvorsorgedepot im Überblick" },
      { to: "/altersvorsorgedepot-foerderung", label: "Förderung im Detail" },
      { to: "/altersvorsorgedepot-vs-etf-sparplan", label: "Vergleich mit ETF-Sparplan" },
    ]}
  >
    <p className="text-muted-foreground leading-relaxed">
      Die Auszahlungsphase ist ein wichtiger Teil des geplanten{" "}
      <Link to="/altersvorsorgedepot" className="text-primary font-medium hover:underline">
        Altersvorsorgedepots
      </Link>. Der Entwurf sieht verschiedene Optionen vor.
    </p>

    <section>
      <h2 className="text-xl font-bold mb-3">Auszahlungsphase</h2>
      <p className="text-muted-foreground leading-relaxed">
        Das angesparte Kapital wird ab Rentenbeginn in monatlichen Raten ausgezahlt. Die Auszahlung soll bis mindestens zum Alter von 85 Jahren laufen.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Renteneintritt</h2>
      <p className="text-muted-foreground leading-relaxed">
        Der frühestmögliche Auszahlungsbeginn liegt bei 65 Jahren. Je später der Renteneintritt, desto höher fällt die monatliche Auszahlung aus.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Kapitalentnahme</h2>
      <p className="text-muted-foreground leading-relaxed">
        Geplant ist die Möglichkeit, zu Beginn der Auszahlungsphase bis zu 30 % des Kapitals als Einmalzahlung zu entnehmen. Die restlichen 70 % werden dann als monatliche Rente ausgezahlt.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Berechnen Sie Ihr mögliches Altersvorsorgedepot mit dem{" "}
        <Link to="/" className="text-primary font-medium hover:underline">
          Rechner
        </Link>.
      </p>
    </section>
  </ContentPageLayout>
);

export default AuszahlungPage;
