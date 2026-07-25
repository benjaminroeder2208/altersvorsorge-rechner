/**
 * Zentrale Quelle aller Förderungs-Kennzahlen
 * für das Altersvorsorgedepot.
 * Quelle: Beschlussempfehlung Drucksache 21/4996,
 * § 84 und § 85 EStG (neue Fassung)
 * Stand: 27.03.2026 — beschlossene Fassung
 * Bei Gesetzesänderungen NUR HIER anpassen.
 */

export interface Child {
  birthYear: number; // Geburtsjahr des Kindes
  kindergeldBis: 18 | 25; // 18 = Grundfall, 25 = Ausbildung/Studium
}

// ── Grundzulage ──────────────────────────────
// § 84 neue Fassung (Beschlussempfehlung)
// Tranche 1: 50% auf Eigenbeiträge bis 360€/Jahr
// Tranche 2: 25% auf Eigenbeiträge 360-1.800€/Jahr
export const GRUNDZULAGE_SATZ_T1 = 0.50;
export const GRUNDZULAGE_T1_MAX = 360;       // €/Jahr
export const GRUNDZULAGE_SATZ_T2 = 0.25;
export const GRUNDZULAGE_T2_MIN = 360;       // €/Jahr
export const GRUNDZULAGE_T2_MAX = 1800;      // €/Jahr

// Max. Grundzulage:
// 360 × 50% + 1440 × 25% = 180 + 360 = 540 €
export const MAX_GRUNDZULAGE = 540;

// ── Kinderzulage ─────────────────────────────
// § 85 neue Fassung:
// 100% der Eigenbeiträge bis 1.800€/Jahr,
// max. 300€ pro Kind
// Volle 300€ bereits ab 300€/Jahr = 25€/Monat
export const KINDERZULAGE_SATZ = 1.00;
export const KINDERZULAGE_BASIS_MAX = 1800;  // €/Jahr
export const KINDERZULAGE_PRO_KIND = 300;    // € max.

// ── Berufseinsteiger-Bonus ───────────────────
// § 84 Satz 2: einmalig +200€ für unter 25-J.
export const BERUFSEINSTEIGER_BONUS = 200;
export const BERUFSEINSTEIGER_ALTERSGRENZE = 25;

// ── Mindesteigenbeitrag ──────────────────────
// § 86: 120€/Jahr Voraussetzung für Förderung
export const MINDESTEIGENBEITRAG = 120;

// ── Maximaler geförderter Eigenbeitrag ───────
export const MAX_EIGENANTEIL_GEFOERDERT = 1800;

// ── Hilfsfunktionen ──────────────────────────

export function berechneGrundzulage(
  eigenanteilJaehrlich: number
): number {
  if (eigenanteilJaehrlich < MINDESTEIGENBEITRAG) {
    return 0;
  }
  const t1 =
    Math.min(eigenanteilJaehrlich, GRUNDZULAGE_T1_MAX)
    * GRUNDZULAGE_SATZ_T1;
  const t2 =
    Math.max(
      0,
      Math.min(eigenanteilJaehrlich, GRUNDZULAGE_T2_MAX)
      - GRUNDZULAGE_T2_MIN
    ) * GRUNDZULAGE_SATZ_T2;
  return t1 + t2;
}

export function berechneKinderzulage(
  eigenanteilJaehrlich: number,
  kinder: Child[],
  calendarYear: number
): number {
  if (eigenanteilJaehrlich < MINDESTEIGENBEITRAG || kinder.length === 0) {
    return 0;
  }

  // Pro Kind prüfen, ob es im calendarYear noch kindergeldberechtigt ist.
  // Ein Kind ist berechtigt solange:
  // calendarYear <= child.birthYear + child.kindergeldBis
  const berechtigteKinder = kinder.filter(
    (child) => calendarYear <= child.birthYear + child.kindergeldBis
  );
  if (berechtigteKinder.length === 0) return 0;

  // Zulage pro berechtigtem Kind: 100% des Eigenbeitrags, max. 300€
  // Volle 300€ bereits ab 300€/Jahr Eigenbeitrag (25€/Monat)
  const zulageProKind = Math.min(
    eigenanteilJaehrlich * KINDERZULAGE_SATZ,
    KINDERZULAGE_PRO_KIND
  );
  return zulageProKind * berechtigteKinder.length;
}

export function berechneGesamtfoerderung(
  eigenanteilJaehrlich: number,
  kinder: Child[] = [],
  jahr: number = 2027
): number {
  return (
    berechneGrundzulage(eigenanteilJaehrlich) +
    berechneKinderzulage(eigenanteilJaehrlich, kinder, jahr)
  );
}

// Rückwärtskompatibilität — wird noch referenziert
export const GRUNDZULAGE_SATZ_AB_2027 = 0.50;
export const GRUNDZULAGE_SATZ_AB_2029 = 0.50;
export const GRUNDZULAGE_BASIS_MAX = 360;
export const ZUSATZZULAGE_SATZ = 0.25;
export const ZUSATZZULAGE_BASIS_MIN = 360;
export const ZUSATZZULAGE_BASIS_MAX = 1800;
export const MAX_GRUNDZULAGE_AB_2027 = 540;
export const MAX_GRUNDZULAGE_AB_2029 = 540;
export const KINDERZULAGE_MINDESTEIGENBEITRAG = 300;

export function getGrundzulageSatz(
  jahr: number
): number {
  return GRUNDZULAGE_SATZ_T1;
}
