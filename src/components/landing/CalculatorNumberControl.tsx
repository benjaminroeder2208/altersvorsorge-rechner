import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CalculatorNumberControlProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

export default function CalculatorNumberControl({ id, label, value, min, max, step, unit, onChange }: CalculatorNumberControlProps) {
  const update = (next: number) => {
    if (Number.isFinite(next)) onChange(Math.min(max, Math.max(min, next)));
  };
  return <div className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border bg-card p-1">
    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" disabled={value <= min} aria-label={`${label} verringern`} title={`${label} verringern`} onClick={() => update(Number((value - step).toFixed(2)))}><Minus className="h-3.5 w-3.5" /></Button>
    <Input id={id} aria-label={label} type="number" inputMode={step < 1 ? "decimal" : "numeric"} min={min} max={max} step={step} value={value} onChange={(event) => update(Number(event.target.value))} className="h-8 w-[5.5rem] border-0 bg-transparent px-1 text-center font-display text-base font-semibold tabular-nums shadow-none md:text-base" />
    {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" disabled={value >= max} aria-label={`${label} erhöhen`} title={`${label} erhöhen`} onClick={() => update(Number((value + step).toFixed(2)))}><Plus className="h-3.5 w-3.5" /></Button>
  </div>;
}