interface BlogDisclaimerProps {
  mitRechnung?: boolean;
}

const BlogDisclaimer = ({ mitRechnung = false }: BlogDisclaimerProps) => {
  return (
    <div className="mt-16 p-5 bg-muted/50 border border-border/60 rounded-xl">
      <p className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2">Hinweise & Haftungsausschluss</p>
      <p className="text-sm text-muted-foreground">
        {mitRechnung ? (
          <>
            Alle Beispielrechnungen verwenden vereinfachte Annahmen: angenommene Rendite von 7 % p.a.
            (historischer Durchschnitt breit gestreuter Aktienindizes — siehe z.&nbsp;B.{" "}
            <a
              href="https://www.dai.de/detail/msci-world-rendite-dreieck-fuer-die-monatliche-geldanlage-1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline"
            >
              MSCI-World-Renditedreieck des Deutschen Aktieninstituts
            </a>{" "}
            — keine Prognose), keine Inflation, keine Produktkosten, keine Steuern auf Erträge.
            Tatsächliche Ergebnisse können erheblich abweichen — auch ins Negative. Kapitalanlagen
            bergen Risiken, einschließlich des möglichen Verlusts des eingesetzten Kapitals. Frühere
            Wertentwicklungen sind kein verlässlicher Indikator für die Zukunft. Angaben zum
            Altersvorsorgedepot basieren auf dem Altersvorsorgereformgesetz (beschlossen 27.03.2026).
            Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
          </>
        ) : (
          <>
            Alle Angaben basieren auf dem Altersvorsorgereformgesetz (beschlossen 27.03.2026).
            Dieser Artikel stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
          </>
        )}
      </p>
    </div>
  );
};

export default BlogDisclaimer;
