import { describe, expect, it, vi } from "vitest";
import { getHeroExample, HERO_PERSONAS } from "./heroPersonas";

describe("Hero examples use the full calculator", () => {
  it("offers the approved persona ages", () => {
    expect(HERO_PERSONAS.map(({ age }) => age)).toEqual([28, 35, 46]);
  });
  it("starts Lukas's projection in 2027, not in the current year", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-10T10:56:00Z"));
    try {
      const example = getHeroExample(35);
      expect(example.yearsToRetirement).toBe(31);
      expect(example.chartData[0].age).toBe(37);
      expect(example.chartData.at(-1)?.age).toBe(67);
    } finally { vi.useRealTimers(); }
  });
  it("includes 540 EUR annual funding on the 150 EUR monthly example", () => {
    const example = getHeroExample(35);
    expect(example.annualOwn).toBe(1800);
    expect(example.grundzulage).toBe(540);
    expect(example.totalSubsidies).toBe(540 * example.yearsToRetirement);
    expect(example.chartData[0].total).toBe(2504);
  });
});
