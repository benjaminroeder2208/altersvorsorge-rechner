import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { formatHeroEuro, getHeroExample, HERO_PERSONAS, useHeroPersona } from "./heroPersonas";

export default function HeroIllustration() {
  const { index } = useHeroPersona();
  const persona = HERO_PERSONAS[index];
  const example = useMemo(() => getHeroExample(persona.age), [persona.age]);
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState(1);
  const [scrubbing, setScrubbing] = useState(false);
  const points = [{ age: persona.age + 1, contributions: 0, total: 0 }, ...example.chartData];
  const maximum = example.capitalWithFunding * 1.12;
  const x = (step: number) => 30 + step / (points.length - 1) * 940;
  const y = (value: number) => 265 - value / maximum * 235;
  // Fixed sample count keeps all persona paths compatible for smooth morphing.
  const sampled = Array.from({ length: 61 }, (_, sample) => {
    const fraction = sample / 60 * (points.length - 1);
    const left = points[Math.floor(fraction)];
    const right = points[Math.min(Math.ceil(fraction), points.length - 1)];
    const weight = fraction % 1;
    return { x: 30 + sample / 60 * 940, total: left.total + (right.total - left.total) * weight, contributions: left.contributions + (right.contributions - left.contributions) * weight };
  });
  const totalPath = sampled.map((p, i) => `${i ? "L" : "M"}${p.x},${y(p.total)}`).join(" ");
  const ownPath = sampled.map((p, i) => `${i ? "L" : "M"}${p.x},${y(p.contributions)}`).join(" ");
  const activeIndex = Math.round(position * (points.length - 1));
  const active = points[activeIndex];
  const selectedYear = Math.max(new Date().getFullYear() + 1, 2027) + activeIndex;
  const transition = { duration: reducedMotion ? 0 : 0.7 };

  return <div className="relative min-w-0" onPointerLeave={() => setScrubbing(false)}>
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground"><span>Kapitalentwicklung bis zum 67. Lebensjahr</span><div className="flex gap-4"><span className="flex items-center gap-2"><span className="h-2 w-2 bg-trust" />Eigenbeiträge</span><span className="flex items-center gap-2"><span className="h-2 w-2 bg-primary" />Mit Förderung & Rendite*</span></div></div>
    <svg viewBox="0 0 1000 300" className="h-[180px] w-full touch-pan-y sm:h-[240px] md:h-[270px]" role="img" aria-label={`Kapitalentwicklung für ${persona.name}: ${formatHeroEuro(example.capitalWithFunding)} Euro mit 67 Jahren`} onPointerMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setPosition(Math.max(0, Math.min(1, ((event.clientX - rect.left) / rect.width * 1000 - 30) / 940)));
      setScrubbing(true);
    }}>
      <defs><linearGradient id="hero-capital-area" x1="0" y1="0" x2="1" y2="0"><stop offset="0" className="[stop-color:hsl(var(--teal-soft))]" /><stop offset="1" className="[stop-color:hsl(var(--coral-soft))]" /></linearGradient></defs>
      {[70, 135, 200, 265].map((line) => <line key={line} x1="30" x2="970" y1={line} y2={line} className="stroke-border" strokeWidth="1" strokeDasharray="3 7" />)}
      <motion.path animate={{ d: `${totalPath} L970,265 L30,265 Z` }} transition={transition} fill="url(#hero-capital-area)" />
      <motion.path animate={{ d: `${ownPath} L970,265 L30,265 Z` }} transition={transition} className="fill-trust" fillOpacity="0.16" />
      <motion.path animate={{ d: ownPath }} transition={transition} className="stroke-trust" strokeWidth="2" fill="none" />
      <motion.path animate={{ d: totalPath }} transition={transition} className="stroke-primary" strokeWidth="3" fill="none" />
      <circle cx="970" cy={y(example.capitalWithFunding)} r="5" className="fill-primary stroke-background" strokeWidth="2" />
      {scrubbing && <g><line x1={x(activeIndex)} x2={x(activeIndex)} y1="20" y2="265" className="stroke-muted-foreground" strokeDasharray="4 4" /><circle cx={x(activeIndex)} cy={y(active.total)} r="5" className="fill-primary stroke-background" strokeWidth="2" /><circle cx={x(activeIndex)} cy={y(active.contributions)} r="4" className="fill-trust stroke-background" strokeWidth="2" /></g>}
    </svg>
    <div className="flex justify-between text-[11px] text-muted-foreground"><span>Start {Math.max(new Date().getFullYear() + 1, 2027)} · {persona.age + 1} Jahre</span><span>Mit 67 Jahren</span></div>
    <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
      <Slider aria-label="Jahr der Kapitalentwicklung" value={[Math.round(position * 100)]} max={100} step={1} onValueChange={([value]) => { setPosition(value / 100); setScrubbing(true); }} onFocus={() => setScrubbing(true)} className="py-3" />
      <p aria-live="polite" className="min-h-9 text-xs text-muted-foreground sm:min-w-[290px] sm:text-right">{scrubbing ? <>{selectedYear} · Alter {active.age}<br /><span className="font-semibold text-foreground">{formatHeroEuro(active.total)} €</span> gesamt · {formatHeroEuro(active.contributions)} € eingezahlt</> : <>{example.yearsToRetirement} Jahre Ansparzeit · 150 € monatlich</>}</p>
    </div>
  </div>;
}
