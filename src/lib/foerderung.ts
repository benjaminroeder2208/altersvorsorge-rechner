/**
 * Zentrale Quelle aller Förderungs-Kennzahlen für das Altersvorsorgedepot.
 * Quelle: Gesetzentwurf Drucksache 21/4088, § 84 und § 85
 * Stand: 11.02.2026 — bei Gesetzesänderungen NUR HIER anpassen.
 */

// ── Grundzulage ──────────────────────────────────────────────────────────────
export const GRUNDZULAGE_SATZ_AB_2027 = 0.30;        // 30 % ab 01.01.2027
export const GRUNDZULAGE_SATZ_AB_2029 = 0.35;        // 35 % ab 01.01.2029
export const GRUNDZULAGE_BASIS_MAX = 1200;            // auf max. 1.200 € Eigenbeitrag

// Erhöhter Fördersatz für Kleinsparer (≤ 100 €/Monat Eigenbeitrag)
export const GRUNDZULAGE_KLEINSPAR_SATZ_AB_2027 = 0.35;
export const GRUNDZULAGE_KLEINSPAR_SATZ_AB_2029 = 0.40;

// ── Zusatzzulage (zweite Tranche) ────────────────────────────────────────────
export const ZUSATZZULAGE_SATZ = 0.20;               // 20 % auf 2. Tranche
export const ZUSATZZULAGE_BASIS_MIN = 1200;           // ab 1.200 € Eigenbeitrag
export const ZUSATZZULAGE_BASIS_MAX = 1800;           // bis 1.800 € Eigenbeitrag
// → max. Zusatzzulage: (1800 - 1200) * 0.20 = 120 €

// ── Maximale Grundzulage pro Jahr ────────────────────────────────────────────
export const MAX_GRUNDZULAGE_AB_2027 =
  GRUNDZULAGE_BASIS_MAX * GRUNDZULAGE_SATZ_AB_2027 +
  (ZUSATZZULAGE_BASIS_MAX - ZUSATZZULAGE_BASIS_MIN) * ZUSATZZULAGE_SATZ;
// = 360 + 120 = 480 €

export const MAX_GRUNDZULAGE_AB_2029 =
  GRUNDZULAGE_BASIS_MAX * GRUNDZULAGE_SATZ_AB_2029 +
  (ZUSATZZULAGE_BASIS_MAX - ZUSATZZULAGE_BASIS_MIN) * ZUSATZZULAGE_SATZ;
// = 420 + 120 = 540 €

// ── Kinderzulage ─────────────────────────────────────────────────────────────
export const KINDERZULAGE_PRO_KIND = 300;             // 300 € je Kind/Jahr
export const KINDERZULAGE_MINDESTEIGENBEITRAG = 1200; // ab 1.200 € Eigenbeitrag voll

// ── Mindesteigenbeitrag ───────────────────────────────────────────────────────
export const MINDESTEIGENBEITRAG = 120;               // 120 €/Jahr (§ 86)

// ── Maximaler geförderter Eigenbeitrag ───────────────────────────────────────
export const MAX_EIGENANTEIL_GEFOERDERT = 1800;       // 1.800 €/Jahr

// ── Hilfsfunktionen ───────────────────────────────────────────────────────────
export function getGrundzulageSatz(jahr: number): number {
  return jahr >= 2029 ? GRUNDZULAGE_SATZ_AB_2029 : GRUNDZULAGE_SATZ_AB_2027;
}

export function berechneGrundzulage(
  eigenanteilJaehrlich: number,
  jahr: number = 2027
): number {
  const satz = getGrundzulageSatz(jahr);
  const tranche1 = Math.min(eigenanteilJaehrlich, GRUNDZULAGE_BASIS_MAX) * satz;
  const tranche2 =
    Math.max(0, Math.min(eigenanteilJaehrlich, ZUSATZZULAGE_BASIS_MAX) - ZUSATZZULAGE_BASIS_MIN) *
    ZUSATZZULAGE_SATZ;
  return tranche1 + tranche2;
}

export function berechneGesamtfoerderung(
  eigenanteilJaehrlich: number,
  anzahlKinder: number = 0,
  jahr: number = 2027
): number {
  return (
    berechneGrundzulage(eigenanteilJaehrlich, jahr) +
    anzahlKinder * KINDERZULAGE_PRO_KIND
  );
}
