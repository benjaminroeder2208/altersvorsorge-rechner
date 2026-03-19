import { Link } from "react-router-dom";
import ContentPageLayout from "@/components/landing/ContentPageLayout";

const VsEtfPage = () => (
  <ContentPageLayout
    title="Altersvorsorgedepot vs ETF Sparplan – Was ist der Unterschied?"
    breadcrumbLabel="ETF Vergleich"
    path="/altersvorsorgedepot-vs-etf-sparplan"
    description="Altersvorsorgedepot oder ETF Sparplan? Erfahren Sie, wie sich Förderung, Flexibilität und steuerliche Behandlung unterscheiden könnten."
    ogTitle="Altersvorsorgedepot vs ETF Sparplan"
    ogDescription="Förderung, Flexibilität und Steuern im Vergleich: Altersvorsorgedepot oder ETF Sparplan?"
    relatedLinks={[
      { to: "/blog/altersvorsorgedepot-vs-etf-sparplan", label: "Ausführlicher Ratgeber: Altersvorsorgedepot vs. ETF-Sparplan" },
      { to: "/altersvorsorgedepot-vs-riester", label: "Altersvorsorgedepot vs. Riester" },
    ]}
  >
    <p className="text-muted-foreground leading-relaxed">
      Beide Optionen setzen auf Kapitalmarktinvestments. Der entscheidende Unterschied beim{" "}
      <Link to="/altersvorsorgedepot" className="text-primary font-medium hover:underline">
        Altersvorsorgedepot
      </Link>{" "}
      liegt in der staatlichen Förderung.
    </p>

    <section>
      <h2 className="text-xl font-bold mb-3">Rendite</h2>
      <p className="text-muted-foreground leading-relaxed">
        Das Altersvorsorgedepot bietet{" "}
        <Link to="/altersvorsorgedepot-foerderung" className="text-primary font-medium hover:underline">
          Zulagen und Steuervorteile
        </Link>, die ein normaler ETF-Sparplan nicht hat. Dadurch kann die effektive Rendite deutlich höher ausfallen.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Flexibilität</h2>
      <p className="text-muted-foreground leading-relaxed">
        Ein ETF-Sparplan ist jederzeit verfügbar. Das Altersvorsorgedepot bindet das Kapital bis zum Renteneintritt — im Gegenzug profitieren Anleger von der Förderung.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Steuerliche Behandlung</h2>
      <p className="text-muted-foreground leading-relaxed">
        Beim ETF-Sparplan fällt Abgeltungsteuer auf Gewinne an. Beim Altersvorsorgedepot erfolgt die Besteuerung erst in der Auszahlungsphase, was einen Steuerstundungseffekt erzeugen kann.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Simulieren Sie den Unterschied mit dem{" "}
        <Link to="/" className="text-primary font-medium hover:underline">
          Altersvorsorgedepot Rechner
        </Link>.
      </p>
    </section>
  </ContentPageLayout>
);

export default VsEtfPage;
