import { Link } from "react-router-dom";
import ContentPageLayout from "@/components/landing/ContentPageLayout";

const FoerderungPage = () => (
  <ContentPageLayout
    title="Wie hoch ist die Förderung beim Altersvorsorgedepot?"
    breadcrumbLabel="Förderung"
    path="/altersvorsorgedepot-foerderung"
    description="Grundzulage, Kinderzulage und Steuervorteile beim geplanten Altersvorsorgedepot im Überblick."
    relatedLinks={[
      { to: "/altersvorsorgedepot", label: "Altersvorsorgedepot im Überblick" },
      { to: "/altersvorsorgedepot-auszahlung", label: "Auszahlung erklärt" },
      { to: "/altersvorsorgedepot-vs-riester", label: "Vergleich mit Riester" },
    ]}
  >
    <p className="text-muted-foreground leading-relaxed">
      Die staatliche Förderung ist ein zentraler Baustein des geplanten{" "}
      <Link to="/altersvorsorgedepot" className="text-primary font-medium hover:underline">
        Altersvorsorgedepots
      </Link>. Sie setzt sich aus drei Komponenten zusammen.
    </p>

    <section>
      <h2 className="text-xl font-bold mb-3">Grundzulage</h2>
      <p className="text-muted-foreground leading-relaxed">
        Die Grundzulage beträgt laut aktuellem Entwurf bis zu 35 % auf Eigenbeiträge bis 1.200 € pro Jahr und 20 % auf Beiträge zwischen 1.200 € und 1.800 €.
      </p>
      <ul className="mt-3 space-y-2">
        <li className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
          Mindestbeitrag: 120 € pro Jahr
        </li>
        <li className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
          Maximale Grundzulage: ca. 540 € pro Jahr
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Kinderzulage</h2>
      <p className="text-muted-foreground leading-relaxed">
        Für jedes kindergeldberechtigte Kind sieht der Entwurf eine zusätzliche Zulage von bis zu 300 € pro Jahr vor.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Steuerliche Förderung</h2>
      <p className="text-muted-foreground leading-relaxed">
        Eigenbeiträge und Zulagen können bis zu einem Höchstbetrag als Sonderausgaben geltend gemacht werden. Der tatsächliche Vorteil hängt vom persönlichen Steuersatz ab.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Mit dem{" "}
        <Link to="/" className="text-primary font-medium hover:underline">
          Altersvorsorgedepot Rechner
        </Link>{" "}
        können Sie berechnen, wie sich die staatliche Förderung auf Ihre Altersvorsorge auswirkt.
      </p>
    </section>
  </ContentPageLayout>
);

export default FoerderungPage;
