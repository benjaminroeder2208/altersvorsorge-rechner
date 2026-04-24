// Helper for opening the Cookiebot consent dialog (renew consent).
// Cookiebot is loaded via index.html (id="Cookiebot", data-blockingmode="explicit").

declare global {
  interface Window {
    Cookiebot?: {
      renew?: () => void;
      show?: () => void;
      withdraw?: () => void;
    };
  }
}

/**
 * Opens the Cookiebot consent banner so the user can change their choices.
 * Falls back gracefully if Cookiebot has not (yet) loaded.
 */
export const openCookieSettings = (): void => {
  if (typeof window === "undefined") return;

  const cb = window.Cookiebot;
  if (cb?.renew) {
    cb.renew();
    return;
  }
  if (cb?.show) {
    cb.show();
    return;
  }

  // Cookiebot not ready — inform the user instead of failing silently.
  // eslint-disable-next-line no-console
  console.warn("[cookieConsent] Cookiebot not loaded yet.");
};

export {};
