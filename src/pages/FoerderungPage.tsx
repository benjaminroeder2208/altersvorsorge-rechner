import { Link } from "react-router-dom";
import ContentPageLayout from "@/components/landing/ContentPageLayout";

const FoerderungPage = () => (
  <ContentPageLayout
    title="Altersvorsorgedepot Förderung – Wie hoch ist die staatliche Förderung?"
    breadcrumbLabel="Förderung"
    path="/altersvorsorgedepot-foerderung"
    description="Wie hoch ist die Förderung beim Altersvorsorgedepot? Erfahren Sie, wie Grundzulage, Kinderzulage und steuerliche Vorteile im Gesetzentwurf vorgesehen sind."
    ogTitle="Altersvorsorgedepot Förderung"
    ogDescription="Grundzulage, Kinderzulage und steuerliche Vorteile beim geplanten Altersvorsorgedepot verständlich erklärt."
    relatedLinks={[
      { to: "/altersvorsorgedepot", label: "Altersvorsorgedepot einfach erklärt" },
      { to: "/altersvorsorgedepot-auszahlung", label: "So funktioniert die Auszahlung" },
      { to: "/blog/altersvorsorgedepot-2027", label: "Ratgeber: Altersvorsorgedepot 2027" },
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
        Die Grundzulage beträgt laut aktuellem Entwurf 30 % auf Eigenbeiträge bis 1.200 € pro Jahr und 20 % auf weitere 600 €.
      </p>
      <ul className="mt-3 space-y-2">
        <li className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
          Mindestbeitrag: 120 € pro Jahr
        </li>
        <li className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
          Maximale Grundzulage: bis zu 480 € pro Jahr
        </li>
        <li className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
          Ab 2029 steigt die Grundzulage auf bis zu 540 € pro Jahr
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Kinderzulage</h2>
      <p className="text-muted-foreground leading-relaxed">
        Für jedes kindergeldberechtigte Kind sieht der Entwurf eine zusätzliche Zulage von bis zu 300 € pro Jahr vor (25 % der Beiträge bis 1.800 €/Jahr). Die volle Kinderzulage von 300 € wird erst ab einem Eigenbeitrag von 1.200 €/Jahr (100 €/Monat) erreicht.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">Wichtig zu wissen</h2>
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Maximal 2 geförderte Verträge:</strong> Ab dem dritten zertifizierten Altersvorsorgevertrag werden Beiträge steuerlich nicht mehr als Altersvorsorgebeiträge anerkannt (§ 82 Abs. 5 EStG). Wer also z.B. bereits einen Riester-Vertrag hat und ein Altersvorsorgedepot eröffnet, nutzt bereits beide möglichen geförderten Slots.
        </p>
      </div>
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
