import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { calculate } from "./AltersvorsorgedepotRechner";

export const HERO_PERSONAS = [
  { name: "Julia", age: 28 },
  { name: "Lukas", age: 35 },
  { name: "Sabine", age: 46 },
] as const;

export function getHeroExample(age: number) {
  return calculate({ monthlyContribution: 150, incomeBand: 2, birthYear: new Date().getFullYear() - age, children: [], retirementAge: 67, returnRate: 0.07 });
}

const HeroContext = createContext({ index: 1, setIndex: (_index: number) => {}, visible: false, setVisible: (_visible: boolean) => {} });

export function HeroPersonaProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(1);
  const [visible, setVisible] = useState(false);
  const value = useMemo(() => ({ index, setIndex, visible, setVisible }), [index, visible]);
  return <HeroContext.Provider value={value}>{children}</HeroContext.Provider>;
}

export const useHeroPersona = () => useContext(HeroContext);
export const formatHeroEuro = (value: number) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value);