import { useState } from "react";
import { Info, X } from "lucide-react";

const UpdateBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full py-3 px-6 text-center relative bg-warning border-b border-warning-border">
      <div className="container max-w-4xl mx-auto flex items-center justify-center gap-2">
        <Info className="w-4 h-4 shrink-0 text-warning-foreground" />
        <p className="text-sm text-warning-foreground">
          <span className="font-medium">Wichtige Information:</span> Der Bundestag hat die Reform der Altersvorsorge
          inklusive dem Altersvorsorgedepot beschlossen.
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-warning-foreground/80 hover:text-warning-foreground transition-colors"
        aria-label="Banner schließen"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default UpdateBanner;
