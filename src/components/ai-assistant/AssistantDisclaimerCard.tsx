import {
  GRUNDZULAGE_SATZ_AB_2027,
  GRUNDZULAGE_BASIS_MAX,
  ZUSATZZULAGE_SATZ,
  ZUSATZZULAGE_BASIS_MAX,
  KINDERZULAGE_PRO_KIND,
  MINDESTEIGENBEITRAG,
} from "@/lib/foerderung";

const fmt = (v: number) =>
  v.toLocaleString("de-DE", { maximumFractionDigits: 0 });

const AssistantDisclaimerCard = () => {
  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Kurze Disclaimer-Box */}
      <div className="p-4 sm:p-5 bg-muted/50 border border-border/60 rounded-xl text-center">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Hinweise & Haftungsausschluss
        </p>
        <p className="text-xs text-muted-foreground/80 leading-relaxed">
          Diese Simulation basiert auf dem Altersvorsorgereformgesetz (beschlossen 27.03.2026).
          Steuerliche Effekte und Produktausgestaltung sind vereinfacht dargestellt. Kapitalanlagen
          bergen Risiken. Frühere Wertentwicklungen sind kein verlässlicher Indikator für die
          Zukunft. Sie stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
        </p>
      </div>

      {/* Ausführliche Fußnoten */}
      <div className="p-4 sm:p-5 bg-muted/30 border border-border/40 rounded-xl">
        <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <p>
            Die dargestellten Berechnungen basieren auf dem Altersvorsorgereformgesetz, das am 27.
            März 2026 vom Deutschen Bundestag beschlossen wurde. Die lektorierte Fassung des
            Gesetzes kann geringfügig von der Beschlussempfehlung abweichen.
          </p>
          <p>
            Die Simulation verwendet die Renditeannahmen des Nutzers. Die Standardannahme liegt bei
            7% und orientiert sich am historischen Durchschnitt breit gestreuter Aktienindizes
            (siehe z.{"\u00A0"}B.{" "}
            <a
              href="https://www.dai.de/detail/msci-world-rendite-dreieck-fuer-die-monatliche-geldanlage-1"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              MSCI-World-Renditedreieck des Deutschen Aktieninstituts
            </a>
            ) und stellen keine Prognose dar. Die tatsächliche Wertentwicklung hängt von der
            gewählten Anlageform, der Marktentwicklung und den anfallenden Kosten ab.
          </p>
          <p>
            Die steuerlichen Vorteile werden auf Basis vereinfachter Grenzsteuersätze geschätzt.
            Die tatsächliche steuerliche Wirkung kann je nach individueller Situation,
            Familienstand, weiteren Einkünften und geltenden Freibeträgen erheblich abweichen. Eine
            individuelle steuerliche Beratung wird empfohlen.
          </p>
          <p>
            Die Grundzulage wird gemäß dem beschlossenen Gesetz mit {GRUNDZULAGE_SATZ_AB_2027 * 100}{" "}
            % auf Eigenbeiträge bis {fmt(GRUNDZULAGE_BASIS_MAX)} € und {ZUSATZZULAGE_SATZ * 100} %
            auf Beiträge zwischen {fmt(GRUNDZULAGE_BASIS_MAX)} € und {fmt(ZUSATZZULAGE_BASIS_MAX)} €
            jährlich berechnet. Die Kinderzulage beträgt bis zu 100 % des Eigenbeitrags, maximal{" "}
            {KINDERZULAGE_PRO_KIND} € pro Kind und Jahr. Eine Mindestsparleistung von{" "}
            {MINDESTEIGENBEITRAG} € pro Jahr ist Voraussetzung für die Förderung.
          </p>
          <p>
            Die monatliche Auszahlung wird vereinfacht als gleichmäßige Entnahme des angesparten
            Kapitals bis zum Alter von 85 Jahren berechnet. In der Praxis können Auszahlungsmodelle
            (z. B. Teilverrentung, flexible Entnahme oder lebenslange Rente) die tatsächlichen
            monatlichen Beträge erheblich beeinflussen.
          </p>
          <p>
            Der Vergleich mit einem ungeförderten Depot und einem Sparkonto dient ausschließlich
            der Veranschaulichung. Das Sparkonto wird mit einer pauschalen Verzinsung von 2 % p.a.
            simuliert. Inflation, Steuern auf Erträge und individuelle Kosten sind in keiner der
            Varianten berücksichtigt.
          </p>
          <p>
            Kapitalanlagen bergen Risiken, einschließlich des möglichen Verlusts des eingesetzten
            Kapitals. Frühere Wertentwicklungen sind kein verlässlicher Indikator für künftige
            Ergebnisse. Diese Simulation stellt keine Anlageberatung, Steuerberatung oder
            Rechtsberatung dar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssistantDisclaimerCard;
