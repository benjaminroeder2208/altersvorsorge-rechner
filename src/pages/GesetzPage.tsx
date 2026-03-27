import { Link } from "react-router-dom";
import ContentPageLayout from "@/components/landing/ContentPageLayout";

const GesetzPage = () => (
  <ContentPageLayout
    title="Altersvorsorgereformgesetz: Was beschlossen wurde"
    breadcrumbLabel="Das Gesetz"
    path="/altersvorsorgedepot-gesetz"
    description="Wie ist der aktuelle Stand beim Altersvorsorgedepot? Das Altersvorsorgereformgesetz wurde am 27. März 2026 vom Bundestag beschlossen. Alle wichtigen Punkte im Überblick."
    ogTitle="Altersvorsorgereformgesetz: Was beschlossen wurde"
    ogDescription="Das Altersvorsorgereformgesetz wurde am 27. März 2026 beschlossen. Alle wichtigen Punkte verständlich zusammengefasst."
    relatedLinks={[
      { to: "/altersvorsorgedepot", label: "Altersvorsorgedepot einfach erklärt" },
      { to: "/blog/altersvorsorgedepot-2027", label: "Ratgeber: Altersvorsorgedepot 2027" },
      { to: "/altersvorsorgedepot-foerderung", label: "Wie hoch ist die Förderung?" },
    ]}
  >
    <p className="text-muted-foreground leading-relaxed">
      Das Altersvorsorgereformgesetz wurde am 27. März 2026 vom Deutschen Bundestag beschlossen und führt das{" "}
      <Link to="/altersvorsorgedepot" className="text-primary font-medium hover:underline">
        Altersvorsorgedepot
      </Link>{" "}
      als neues staatlich gefördertes Vorsorgemodell ein.
    </p>

    <section>
      <h2 className="text-xl font-bold mb-3">Aktueller Stand</h2>
      <p className="text-muted-foreground leading-relaxed">
        Das Gesetz ist beschlossen. Der Bundestag hat am 27. März 2026 mit den Stimmen der Koalitionsfraktionen CDU/CSU und SPD das Altersvorsorgereformgesetz verabschiedet. Start: 1. Januar 2027.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Zeitplan</h2>
      <p className="text-muted-foreground leading-relaxed">
        Das Gesetz tritt zum 1. Januar 2027 in Kraft. Ab diesem Datum können Bürgerinnen und Bürger ein Altersvorsorgedepot eröffnen und staatliche Förderung beantragen.
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
