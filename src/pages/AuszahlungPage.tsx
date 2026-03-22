import { Link } from "react-router-dom";
import ContentPageLayout from "@/components/landing/ContentPageLayout";

const AuszahlungPage = () => (
  <ContentPageLayout
    title="Altersvorsorgedepot Auszahlung – So könnte die Auszahlungsphase funktionieren"
    breadcrumbLabel="Auszahlung"
    path="/altersvorsorgedepot-auszahlung"
    description="Wie funktioniert die Auszahlung beim Altersvorsorgedepot? Erfahren Sie mehr über Rentenbeginn, Auszahlungspläne und mögliche Kapitalentnahmen."
    ogTitle="Altersvorsorgedepot Auszahlung"
    ogDescription="Rentenbeginn, Auszahlungsplan und Kapitalentnahme beim geplanten Altersvorsorgedepot verständlich erklärt."
    relatedLinks={[
      { to: "/altersvorsorgedepot", label: "Altersvorsorgedepot einfach erklärt" },
      { to: "/altersvorsorgedepot-foerderung", label: "Wie hoch ist die staatliche Förderung?" },
      { to: "/rentenluecken-rechner", label: "Wie groß ist meine Rentenlücke?" },
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
        Der frühestmögliche Auszahlungsbeginn liegt bei 65 Jahren — spätestens muss die Auszahlungsphase mit Vollendung des 70. Lebensjahres beginnen (§ 1 AltZertG). Ausnahme: Ein Beginn vor 65 ist möglich, wenn bereits eine gesetzliche Altersrente gezahlt wird. Je später der Renteneintritt, desto höher fällt die monatliche Auszahlung aus.
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

    <section>
      <h2 className="text-xl font-bold mb-3">Wichtig zu wissen</h2>
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Maximal 2 geförderte Verträge:</strong> Ab dem dritten zertifizierten Altersvorsorgevertrag werden Beiträge steuerlich nicht mehr als Altersvorsorgebeiträge anerkannt (§ 82 Abs. 5 EStG). Wer also z.B. bereits einen Riester-Vertrag hat und ein Altersvorsorgedepot eröffnet, nutzt bereits beide möglichen geförderten Slots.
        </p>
      </div>
    </section>
  </ContentPageLayout>
);

export default AuszahlungPage;
