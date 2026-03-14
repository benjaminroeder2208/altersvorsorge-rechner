import { Link } from "react-router-dom";
import ContentPageLayout from "@/components/landing/ContentPageLayout";

const VsEtfPage = () => (
  <ContentPageLayout
    title="Altersvorsorgedepot vs ETF Sparplan"
    relatedLinks={[
      { to: "/altersvorsorgedepot", label: "Altersvorsorgedepot im Überblick" },
      { to: "/altersvorsorgedepot-foerderung", label: "Förderung im Detail" },
      { to: "/altersvorsorgedepot-vs-riester", label: "Vergleich mit Riester" },
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
        <Link to="/altersvorsorgedepot-rechner" className="text-primary font-medium hover:underline">
          Altersvorsorgedepot Rechner
        </Link>.
      </p>
    </section>
  </ContentPageLayout>
);

export default VsEtfPage;
