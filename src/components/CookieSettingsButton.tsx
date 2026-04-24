import { Cookie } from "lucide-react";
import { openCookieSettings } from "@/lib/cookieConsent";

/**
 * Floating button (bottom-left) that re-opens the Cookiebot consent dialog
 * so users can adjust their cookie preferences at any time.
 */
const CookieSettingsButton = () => {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      aria-label="Cookie-Einstellungen anpassen"
      title="Cookie-Einstellungen"
      className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:text-foreground hover:bg-background"
    >
      <Cookie className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Cookie-Einstellungen</span>
    </button>
  );
};

export default CookieSettingsButton;
