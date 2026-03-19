import { Link } from "react-router-dom";
import ContentPageLayout from "@/components/landing/ContentPageLayout";

const GesetzPage = () => (
  <ContentPageLayout
    title="Gesetzentwurf zum Altersvorsorgedepot erklärt"
    breadcrumbLabel="Gesetzentwurf"
    path="/altersvorsorgedepot-gesetz"
    description="Wie ist der aktuelle Stand beim Altersvorsorgedepot? Hier finden Sie eine verständliche Einordnung des Gesetzentwurfs und der geplanten Reform."
    ogTitle="Gesetzentwurf zum Altersvorsorgedepot erklärt"
    ogDescription="Der aktuelle Stand der Reform der privaten Altersvorsorge verständlich zusammengefasst."
    relatedLinks={[
      { to: "/altersvorsorgedepot", label: "Altersvorsorgedepot einfach erklärt" },
      { to: "/blog/altersvorsorgedepot-2027", label: "Ratgeber: Altersvorsorgedepot 2027" },
      { to: "/altersvorsorgedepot-foerderung", label: "Wie hoch ist die Förderung?" },
    ]}
  >
    <p className="text-muted-foreground leading-relaxed">
      Der Gesetzentwurf zur Reform der privaten Altersvorsorge sieht die Einführung des{" "}
      <Link to="/altersvorsorgedepot" className="text-primary font-medium hover:underline">
        Altersvorsorgedepots
      </Link>{" "}
      als neues Vorsorgemodell vor.
    </p>

    <section>
      <h2 className="text-xl font-bold mb-3">Aktueller Stand der Reform</h2>
      <p className="text-muted-foreground leading-relaxed">
        Der Entwurf befindet sich im parlamentarischen Verfahren. Die wesentlichen Eckpunkte stehen fest, Details können sich im Verlauf des Gesetzgebungsprozesses noch ändern.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Zeitplan der Einführung</h2>
      <p className="text-muted-foreground leading-relaxed">
        Das Gesetz soll voraussichtlich 2026 in Kraft treten. Der genaue Zeitpunkt hängt vom parlamentarischen Verfahren ab.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Politische Diskussion</h2>
      <p className="text-muted-foreground leading-relaxed">
        Im Mittelpunkt der Debatte stehen der Wegfall der Beitragsgarantie, die Höhe der{" "}
        <Link to="/altersvorsorgedepot-foerderung" className="text-primary font-medium hover:underline">
          Förderung
        </Link>{" "}
        und die Frage, ob das Modell bestehende Riester-Verträge ablösen soll.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Nutzen Sie den{" "}
        <Link to="/" className="text-primary font-medium hover:underline">
          Altersvorsorgedepot Rechner
        </Link>{" "}
        um die mögliche Entwicklung auf Basis des aktuellen Entwurfs zu simulieren.
      </p>
    </section>
  </ContentPageLayout>
);

export default GesetzPage;
