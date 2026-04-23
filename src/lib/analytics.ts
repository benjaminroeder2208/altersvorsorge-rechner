// Helper for pushing events to the GTM dataLayer (GA4)
//
// Usage:
//   import { trackEvent } from "@/lib/analytics";
//   trackEvent("newsletter_signup", { source: "blog" });
//
// Standard event names used across the app:
// - newsletter_signup     → Newsletter sign-ups
// - lead_magnet_download  → PDF / checklist downloads
// - calculator_used       → Calculator interactions
// - lead_generated        → Completed lead capture

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export type TrackEventData = Record<string, unknown>;

export const trackEvent = (
  eventName: string,
  eventData?: TrackEventData
): void => {
  if (typeof window === "undefined") return;

  // Lazily initialize dataLayer in case GTM hasn't loaded yet —
  // queued events will be picked up once the GTM snippet runs.
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  window.dataLayer.push({
    event: eventName,
    ...(eventData ?? {}),
    timestamp: new Date().toISOString(),
  });
};

export default trackEvent;
