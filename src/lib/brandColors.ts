/**
 * Single source of truth for brand colors used in non-CSS contexts:
 * SVG `fill`/`stroke`, `<canvas>`, react-pdf, recharts series, and
 * email-template HTML strings. Keep these in sync with the HSL
 * tokens declared in `src/index.css`.
 *
 * For React/Tailwind components, ALWAYS prefer the semantic token
 * classes (`bg-primary`, `text-primary`, `text-brand-amber`, …)
 * instead of importing these hex constants.
 */
export const BRAND = {
  primary: "#1B4FD8",          // --primary
  primarySoft: "#EEF3FF",      // --primary-soft
  primarySoftBorder: "#BFDBFE",// --primary-soft-border
  amber: "#F59E0B",            // --brand-amber
  red: "#EF4444",              // --brand-red
  success: "#059669",          // --success
  warningBg: "#FEF3C7",        // --warning
  warningFg: "#92400E",        // --warning-foreground
  // Chart series (recharts / canvas)
  chartGray: "#9CA3AF",
  chartBlue: "#1B4FD8",
  chartTeal: "#2DD4A8",
} as const;
