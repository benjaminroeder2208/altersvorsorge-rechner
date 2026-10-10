import ChapterHeading from "./ChapterHeading";
import { MAX_GRUNDZULAGE_AB_2027 } from "@/lib/foerderung";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const figures = [
  { value: "~1.100 €", label: "Die mögliche Rentenlücke", sub: "pro Monat im vereinfachten Beispiel mit 3.500 € Brutto", tone: "text-primary" },
  { value: "48 %", label: "Das gesetzliche Rentenniveau", sub: "vor Steuern — nicht dein persönlicher Netto-Ersatz", tone: "text-foreground" },
  { value: `${MAX_GRUNDZULAGE_AB_2027} €`, label: "Grundzulage pro Jahr", sub: "maximal bei 1.800 € jährlichem Eigenbeitrag ab 2027", tone: "text-trust" },
];

export default function KeyFiguresSection() {
  return <section className="border-t border-border bg-background py-16 md:py-24">
    <div className="container max-w-6xl px-6">
      <ChapterHeading number="01" label="Warum jetzt"><h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">Eine kleine Entscheidung.<br />Ein großer Unterschied.</h2></ChapterHeading>
      <div className="grid gap-8 border-y border-border py-8 md:grid-cols-3 md:gap-0">{figures.map((figure, index) => <div key={figure.label} className={`min-w-0 ${index ? "md:border-l md:border-border md:pl-8" : "md:pr-8"}`}><p className={`font-display text-4xl font-semibold tabular-nums md:text-5xl ${figure.tone}`}>{figure.value}</p><h3 className="mt-4 text-sm font-semibold">{figure.label}</h3><p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">{figure.sub}</p></div>)}</div>
      <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-start"><p className="max-w-2xl text-[11px] leading-relaxed text-disclaimer-foreground">~1.100 €: eigene vereinfachte Modellrechnung für einen 35-Jährigen bei 3.500 € Brutto und 32 Beitragsjahren. 48 %: Rentenniveau vor Steuern, Rentenversicherungsbericht 2024 (Deutsche Rentenversicherung). Förderung: Drs. 21/4996, § 84 EStG. Individuelle Werte können abweichen. Keine Anlageberatung.</p><Button variant="link" className="h-auto justify-start px-0 text-xs" onClick={() => document.getElementById("rechner")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>Deine Zahlen berechnen<ArrowUpRight /></Button></div>
    </div>
  </section>;
}
