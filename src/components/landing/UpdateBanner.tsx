import { useState } from "react";
import { Info, X } from "lucide-react";

{/* TODO: Nach Beschluss am 26.03.2026 entfernen und foerderung.ts aktualisieren */}

const UpdateBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="w-full py-3 px-6 text-center relative"
      style={{ backgroundColor: "#FEF3C7", borderBottom: "1px solid #F59E0B" }}
    >
      <div className="container max-w-4xl mx-auto flex items-center justify-center gap-2">
        <Info className="w-4 h-4 shrink-0" style={{ color: "#92400E" }} />
        <p className="text-sm" style={{ color: "#92400E" }}>
          <span className="font-medium">Neu:</span> Die Koalition hat sich am 24. März auf verbesserte Konditionen geeinigt — höhere Zulagen, niedrigerer Kostendeckel, Selbstständige inklusive. Abstimmung im Bundestag: 26. März. Wir aktualisieren alle Zahlen nach Beschluss.
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors"
        style={{ color: "#D97706" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#92400E")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#D97706")}
        aria-label="Banner schließen"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default UpdateBanner;
