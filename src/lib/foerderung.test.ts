/**
 * Unit Tests: src/lib/foerderung.ts
 *
 * Quelle: Altersvorsorgereformgesetz, beschlossen 27.03.2026
 * § 84 EStG (Grundzulage), § 85 EStG (Kinderzulage), § 86 EStG (Mindesteigenbeitrag)
 * Drucksache 21/4996
 *
 * WICHTIG: Diese Tests sind die einzige automatisierte Verifikation
 * der Förderberechnung. Bei Gesetzesänderungen erst Tests anpassen,
 * dann foerderung.ts anpassen — nie umgekehrt.
 */

import { describe, it, expect } from "vitest";
import {
  berechneGrundzulage,
  berechneKinderzulage,
  berechneGesamtfoerderung,
  MINDESTEIGENBEITRAG,
  MAX_GRUNDZULAGE,
  KINDERZULAGE_PRO_KIND,
  BERUFSEINSTEIGER_BONUS,
  Child,
} from "./foerderung";

// ─────────────────────────────────────────────
// GRUNDZULAGE (§ 84 EStG neue Fassung)
// ─────────────────────────────────────────────

describe("berechneGrundzulage", () => {
  describe("Mindesteigenbeitrag-Grenze (§ 86)", () => {
    it("gibt 0 zurück bei 0 € Eigenbeitrag", () => {
      expect(berechneGrundzulage(0)).toBe(0);
    });
    it("gibt 0 zurück bei Eigenbeitrag unter Mindestbeitrag (119 €)", () => {
      expect(berechneGrundzulage(119)).toBe(0);
    });
    it("gibt 0 zurück bei exakt 119 € (unter 120 € Schwelle)", () => {
      expect(berechneGrundzulage(MINDESTEIGENBEITRAG - 1)).toBe(0);
    });
    it("gewährt Förderung ab exakt 120 € Mindesteigenbeitrag", () => {
      expect(berechneGrundzulage(MINDESTEIGENBEITRAG)).toBeGreaterThan(0);
    });
  });

  describe("Tranche 1: 50% auf Eigenbeiträge bis 360 €/Jahr", () => {
    it("berechnet 50% auf 120 € = 60 €", () => {
      expect(berechneGrundzulage(120)).toBe(60);
    });
    it("berechnet 50% auf 200 € = 100 €", () => {
      expect(berechneGrundzulage(200)).toBe(100);
    });
    it("berechnet 50% auf 360 € = 180 € (Maximum Tranche 1)", () => {
      expect(berechneGrundzulage(360)).toBe(180);
    });
  });

  describe("Tranche 2: 25% auf Eigenbeiträge 360–1.800 €/Jahr", () => {
    it("berechnet T1 + T2 korrekt bei 600 € (180 + 60 = 240 €)", () => {
      expect(berechneGrundzulage(600)).toBe(240);
    });
    it("berechnet T1 + T2 korrekt bei 1.080 € (180 + 180 = 360 €)", () => {
      expect(berechneGrundzulage(1080)).toBe(360);
    });
    it("erreicht Maximum 540 € bei 1.800 € Eigenbeitrag", () => {
      expect(berechneGrundzulage(1800)).toBe(MAX_GRUNDZULAGE);
      expect(berechneGrundzulage(1800)).toBe(540);
    });
    it("überschreitet 540 € nicht bei Eigenbeitrag über 1.800 €", () => {
      expect(berechneGrundzulage(2400)).toBe(540);
      expect(berechneGrundzulage(3600)).toBe(540);
    });
  });

  describe("Standardpersona (150 €/Monat = 1.800 €/Jahr)", () => {
    it("ergibt volle Grundzulage 540 € bei 150 €/Monat", () => {
      expect(berechneGrundzulage(150 * 12)).toBe(540);
    });
  });
});

// ─────────────────────────────────────────────
// KINDERZULAGE (§ 85 EStG neue Fassung)
// ─────────────────────────────────────────────

describe("berechneKinderzulage", () => {
  const KIND_2020_BIS18: Child = { birthYear: 2020, kindergeldBis: 18 };
  const KIND_2020_BIS25: Child = { birthYear: 2020, kindergeldBis: 25 };
  const KIND_2005_BIS18: Child = { birthYear: 2005, kindergeldBis: 18 };
  const KIND_2002_BIS25: Child = { birthYear: 2002, kindergeldBis: 25 };

  describe("Mindesteigenbeitrag-Grenze", () => {
    it("gibt 0 zurück bei Eigenbeitrag unter 120 €", () => {
      expect(berechneKinderzulage(100, [KIND_2020_BIS18], 2027)).toBe(0);
    });
    it("gibt 0 zurück bei leerer Kinderliste", () => {
      expect(berechneKinderzulage(1800, [], 2027)).toBe(0);
    });
  });

  describe("Zeitabhängigkeit (nur bei Kindergeldberechtigung)", () => {
    it("gewährt Zulage wenn Kind im Jahr noch berechtigt ist", () => {
      expect(berechneKinderzulage(1800, [KIND_2020_BIS18], 2030)).toBe(300);
    });
    it("gewährt keine Zulage wenn Kind nicht mehr berechtigt ist", () => {
      expect(berechneKinderzulage(1800, [KIND_2020_BIS18], 2039)).toBe(0);
    });
    it("gewährt noch Zulage im letzten Berechtigungsjahr (Grenzfall)", () => {
      expect(berechneKinderzulage(1800, [KIND_2020_BIS18], 2038)).toBe(300);
    });
    it("unterscheidet korrekt zwischen bis 18 und bis 25", () => {
      expect(berechneKinderzulage(1800, [KIND_2020_BIS18], 2040)).toBe(0);
      expect(berechneKinderzulage(1800, [KIND_2020_BIS25], 2040)).toBe(300);
    });
    it("filtert bereits ausgeschiedene Kinder korrekt", () => {
      expect(berechneKinderzulage(1800, [KIND_2005_BIS18], 2027)).toBe(0);
    });
    it("behandelt Grenzfall foerderEnde == calendarYear korrekt", () => {
      expect(berechneKinderzulage(1800, [KIND_2002_BIS25], 2027)).toBe(300);
      expect(berechneKinderzulage(1800, [KIND_2002_BIS25], 2028)).toBe(0);
    });
  });

  describe("Betragsgrenzen (max. 300 € pro Kind)", () => {
    it("gibt volle 300 € ab 300 €/Jahr Eigenbeitrag (25 €/Monat)", () => {
      expect(berechneKinderzulage(300, [KIND_2020_BIS18], 2027)).toBe(300);
    });
    it("gibt anteilig unter 300 €/Jahr (100% Satz, max 300 €)", () => {
      expect(berechneKinderzulage(200, [KIND_2020_BIS18], 2027)).toBe(200);
    });
    it("überschreitet 300 € pro Kind nicht", () => {
      expect(berechneKinderzulage(1800, [KIND_2020_BIS18], 2027)).toBe(300);
      expect(berechneKinderzulage(3600, [KIND_2020_BIS18], 2027)).toBe(300);
    });
  });

  describe("Mehrere Kinder", () => {
    it("summiert Zulagen für mehrere berechtigte Kinder", () => {
      const kinder: Child[] = [KIND_2020_BIS18, KIND_2020_BIS25];
      expect(berechneKinderzulage(1800, kinder, 2030)).toBe(600);
    });
    it("berücksichtigt nur berechtigte Kinder bei gemischter Liste", () => {
      const kinder: Child[] = [KIND_2020_BIS18, KIND_2005_BIS18];
      expect(berechneKinderzulage(1800, kinder, 2030)).toBe(300);
    });
    it("gibt 0 wenn alle Kinder ausgeschieden sind", () => {
      const kinder: Child[] = [KIND_2005_BIS18, KIND_2002_BIS25];
      expect(berechneKinderzulage(1800, kinder, 2028)).toBe(0);
    });
    it("berechnet 3 Kinder mit unterschiedlichen Laufzeiten korrekt", () => {
      const kinder: Child[] = [
        { birthYear: 2023, kindergeldBis: 25 },
        { birthYear: 2018, kindergeldBis: 18 },
        { birthYear: 2025, kindergeldBis: 25 },
      ];
      expect(berechneKinderzulage(1800, kinder, 2030)).toBe(900);
      expect(berechneKinderzulage(1800, kinder, 2037)).toBe(600);
      expect(berechneKinderzulage(1800, kinder, 2049)).toBe(300);
      expect(berechneKinderzulage(1800, kinder, 2051)).toBe(0);
    });
  });
});

// ─────────────────────────────────────────────
// GESAMTFÖRDERUNG
// ─────────────────────────────────────────────

describe("berechneGesamtfoerderung", () => {
  it("gibt nur Grundzulage zurück ohne Kinder", () => {
    expect(berechneGesamtfoerderung(1800, [], 2027)).toBe(540);
  });
  it("addiert Grund- und Kinderzulage korrekt", () => {
    const kinder: Child[] = [{ birthYear: 2020, kindergeldBis: 18 }];
    expect(berechneGesamtfoerderung(1800, kinder, 2027)).toBe(840);
  });
  it("gibt 0 zurück bei Eigenbeitrag unter Mindestbeitrag", () => {
    const kinder: Child[] = [{ birthYear: 2020, kindergeldBis: 18 }];
    expect(berechneGesamtfoerderung(100, kinder, 2027)).toBe(0);
  });
  it("Standardpersona: 150€/Monat, 0 Kinder = 540 €", () => {
    expect(berechneGesamtfoerderung(150 * 12, [], 2027)).toBe(540);
  });
  it("Standardpersona mit 1 Kind (Jg. 2020, bis 18) = 840 €", () => {
    const kinder: Child[] = [{ birthYear: 2020, kindergeldBis: 18 }];
    expect(berechneGesamtfoerderung(150 * 12, kinder, 2027)).toBe(840);
  });
  it("berücksichtigt Kinderzulage zeitabhängig", () => {
    const kinder: Child[] = [{ birthYear: 2020, kindergeldBis: 18 }];
    expect(berechneGesamtfoerderung(1800, kinder, 2038)).toBe(840);
    expect(berechneGesamtfoerderung(1800, kinder, 2039)).toBe(540);
  });
});

// ─────────────────────────────────────────────
// GESETZLICHE KONSTANTEN — Regressionstests
// ─────────────────────────────────────────────

describe("Gesetzliche Konstanten (Regressionstests)", () => {
  it("Mindesteigenbeitrag ist 120 €/Jahr (§ 86)", () => {
    expect(MINDESTEIGENBEITRAG).toBe(120);
  });
  it("Maximale Grundzulage ist 540 €/Jahr", () => {
    expect(MAX_GRUNDZULAGE).toBe(540);
  });
  it("Maximale Kinderzulage ist 300 €/Kind/Jahr (§ 85)", () => {
    expect(KINDERZULAGE_PRO_KIND).toBe(300);
  });
  it("Berufseinsteiger-Bonus ist 200 € (§ 84 Satz 2)", () => {
    expect(BERUFSEINSTEIGER_BONUS).toBe(200);
  });
  it("Tranche-1-Grenze ist 360 €/Jahr", () => {
    expect(berechneGrundzulage(360)).toBe(180);
  });
  it("Tranche-2-Grenze ist 1.800 €/Jahr", () => {
    expect(berechneGrundzulage(1800)).toBe(540);
  });
});
