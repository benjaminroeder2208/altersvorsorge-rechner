/**
 * Brand colors for non-CSS contexts (SVG, canvas, react-pdf, email HTML).
 * Keep in sync with the HSL tokens in `src/index.css`.
 * In React/Tailwind components ALWAYS use semantic token classes instead.
 */
export const BRAND = {
  primary: "#D7352A",          // --primary (Koralle)
  primaryDark: "#B42A20",      // Koralle für Textlinks (Kontrast)
  coralSoft: "#FFE9E3",        // --coral-soft (aufgehellt)
  trust: "#003536",            // --trust (Waldgrün)
  trustSoft: "#E3EFEC",
  background: "#FDFAF4",       // --background (Off-White)
  sand: "#F1EFE9",             // --secondary
  foreground: "#05171B",       // --foreground (Anthrazit)
  muted: "#536265",            // --muted-foreground
  border: "#D6D0C4",           // --border
  // Legacy keys kept for existing consumers
  primarySoft: "#E3EFEC",
  primarySoftBorder: "#D6D0C4",
  amber: "#D7352A",
  red: "#EF4444",
  success: "#059669",
  warningBg: "#FFE9E3",
  warningFg: "#7A1F18",
  chartGray: "#6E6E72",
  chartBlue: "#003536",
  chartTeal: "#2DB8A8",
} as const;
