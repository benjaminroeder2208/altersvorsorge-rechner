import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroIllustration from "./HeroIllustration";
import { formatHeroEuro, getHeroExample, HERO_PERSONAS, useHeroPersona } from "./heroPersonas";

export default function HeroSection() {
  const { index, setIndex, setVisible } = useHeroPersona();
  const persona = HERO_PERSONAS[index];
  const example = useMemo(() => getHeroExample(persona.age), [persona.age]);
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(Math.round(example.capitalWithFunding));
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(element);
    return () => { observer.disconnect(); setVisible(false); };
  }, [setVisible]);
  useEffect(() => {
    if (reducedMotion) { setDisplay(Math.round(example.capitalWithFunding)); return; }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1400, 1);
      setDisplay(Math.round(example.capitalWithFunding * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [example.capitalWithFunding, reducedMotion]);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });

  return <section className="relative overflow-hidden bg-background pb-10 pt-8 md:pb-12 md:pt-12">
    <div className="container max-w-6xl px-6">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-[11px] font-medium text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Das neue Altersvorsorgedepot<span className="text-primary">Ab 2027</span></div>
      <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.06] md:text-6xl lg:text-7xl">Altersvorsorge.<br />Mit Zukunft gerechnet.</h1>
      <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end"><p className="max-w-xl text-base leading-relaxed text-muted-foreground">Was können 150 € im Monat für deine Zukunft bewegen? Entdecke das neue Altersvorsorgedepot — mit staatlicher Förderung und einem Plan, der zu dir passt.</p><Button onClick={() => scrollTo("rechner")} size="lg" className="h-12 self-start rounded-lg px-6 md:shrink-0">Persönliche Altersvorsorge berechnen<ArrowUpRight /></Button></div>
      <div ref={ref} id="rechenbeispiel" className="hero-example relative mt-10 border-t border-border pt-6 md:mt-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><p className="mb-2 text-[11px] font-medium uppercase text-muted-foreground">{persona.name}s mögliches Kapital mit 67*</p><p className="flex items-baseline gap-2 font-display text-5xl font-semibold leading-none tabular-nums text-trust md:text-7xl lg:text-8xl"><span>{formatHeroEuro(display)}</span><span className="text-3xl font-normal text-muted-foreground md:text-5xl">€</span></p></div>
          <div><div role="group" aria-label="Rechenbeispiel auswählen" className="flex gap-1 border-b border-border">{HERO_PERSONAS.map((person, i) => <Button key={person.name} variant="ghost" aria-pressed={i === index} onClick={() => setIndex(i)} className={`h-11 rounded-none border-b-2 px-3 text-xs sm:px-4 ${i === index ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}>{person.name}<span className="font-normal">{person.age}</span></Button>)}</div><p className="mt-2 text-[11px] text-muted-foreground">Beispielpersonen · 150 €/Monat · ohne Kinder</p></div>
        </div>
        <div className="mt-7"><HeroIllustration /></div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4"><div className="flex flex-wrap gap-5 text-[11px] text-muted-foreground">{["Kostenlos", "Unabhängig", "Ohne Anmeldung"].map((text) => <span key={text} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-trust" />{text}</span>)}</div><Button variant="ghost" size="sm" onClick={() => scrollTo("vergleich")} className="text-xs text-muted-foreground">Früh starten lohnt sich<ArrowDown /></Button></div>
      <p className="mt-4 max-w-4xl text-[11px] leading-relaxed text-disclaimer-foreground">*Modellrechnung ab {Math.max(new Date().getFullYear() + 1, 2027)}: 150 € monatlich, {example.grundzulage} € Grundzulage jährlich, 7 % p.a. angenommene Rendite, jährliche Verzinsung. Ohne Kosten, Steuern und Inflation. Keine Garantie, keine Anlageberatung. Kapitalverluste sind möglich. Renditeannahme: <a className="underline underline-offset-2" href="https://www.dai.de/detail/msci-world-rendite-dreieck-fuer-die-monatliche-geldanlage-1" target="_blank" rel="noopener noreferrer">Deutsches Aktieninstitut</a>. Gesetzesstand: 27.03.2026.</p>
    </div>
  </section>;
}
