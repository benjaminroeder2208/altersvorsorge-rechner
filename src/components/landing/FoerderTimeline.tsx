import type { Child } from "@/lib/foerderung";

interface FoerderTimelineProps {
  children: Child[];
  retirementAge: number;
  birthYear: number;
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const CHILD_COLORS = [
  { bar: "bg-emerald-500/20", border: "border-emerald-500/50", text: "text-emerald-700" },
  { bar: "bg-amber-500/20", border: "border-amber-500/50", text: "text-amber-700" },
  { bar: "bg-violet-500/20", border: "border-violet-500/50", text: "text-violet-700" },
];

export default function FoerderTimeline({ children, retirementAge, birthYear }: FoerderTimelineProps) {
  const currentYear = new Date().getFullYear();
  const startYear = Math.max(currentYear, 2027);
  const endYear = birthYear + retirementAge;
  const totalYears = endYear - startYear;

  if (totalYears <= 0) return null;

  const grundzulageWidth = 100;

  const kinderBars = children
    .map((child, i) => {
      const rawEnd = child.birthYear + child.kindergeldBis;
      if (rawEnd < startYear) return null;
      const clampedEnd = Math.min(rawEnd, endYear);
      const rawDuration = clampedEnd - startYear;
      const width = clamp((rawDuration / totalYears) * 100, 3, 100);
      const endLabel = rawDuration < 1 ? "< 1 Jahr" : rawEnd > endYear ? "bis Rente" : String(clampedEnd);
      const colors = CHILD_COLORS[i % 3];
      return {
        key: `child-${i}`,
        label: `Kind ${i + 1} · Jg. ${child.birthYear} · bis ${child.kindergeldBis}`,
        width,
        endLabel,
        colors,
      };
    })
    .filter((b): b is NonNullable<typeof b> => b !== null);

  const midYear1 = Math.round(startYear + totalYears / 3);
  const midYear2 = Math.round(startYear + (2 * totalYears) / 3);

  return (
    <div className="rounded-2xl bg-secondary p-6 text-left">
      <h3 className="text-xl font-bold">Förderzeitraum auf einen Blick</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Die Kinderzulage gilt nur solange Kindergeldanspruch besteht.
      </p>

      <div className="space-y-3">
        {/* Grundzulage */}
        <div className="flex items-center gap-3">
          <span className="w-32 sm:w-48 shrink-0 text-[10px] sm:text-xs text-primary">
            <span className="font-semibold block">Grundzulage</span>
            <span className="text-muted-foreground">bis zu 540 €/Jahr</span>
          </span>
          <div className="relative flex-1 h-7 bg-muted/30 rounded-full overflow-visible">
            <div
              className="absolute left-0 top-0 h-full rounded-full border bg-primary/20 border-primary/40"
              style={{ width: `${grundzulageWidth}%` }}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-muted-foreground">
              {endYear}
            </span>
          </div>
        </div>

        {/* Kinder */}
        {kinderBars.map((b) => {
          const labelInside = b.width >= 20;
          return (
            <div key={b.key} className="flex items-center gap-3">
              <span className={`w-32 sm:w-48 shrink-0 text-[10px] sm:text-xs ${b.colors.text}`}>
                {b.label}
              </span>
              <div className="relative flex-1 h-7 bg-muted/30 rounded-full overflow-visible">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full border ${b.colors.bar} ${b.colors.border}`}
                  style={{ width: `${b.width}%` }}
                />
                <span
                  className={`absolute top-1/2 -translate-y-1/2 text-[10px] sm:text-xs ${b.colors.text} ${
                    labelInside ? "right-2" : ""
                  }`}
                  style={labelInside ? undefined : { left: `calc(${b.width}% + 6px)` }}
                >
                  {b.endLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Zeitachse */}
      <div className="mt-6 ml-32 sm:ml-48 pl-3">
        <div className="border-t border-border relative h-6">
          <span className="absolute -top-0.5 left-0 -translate-x-1/2 pt-2 text-[10px] sm:text-xs text-muted-foreground">
            {startYear}
          </span>
          <span
            className="absolute -top-0.5 pt-2 text-[10px] sm:text-xs text-muted-foreground -translate-x-1/2"
            style={{ left: "33%" }}
          >
            {midYear1}
          </span>
          <span
            className="absolute -top-0.5 pt-2 text-[10px] sm:text-xs text-muted-foreground -translate-x-1/2"
            style={{ left: "66%" }}
          >
            {midYear2}
          </span>
          <span className="absolute -top-3 right-0 h-4 border-l border-dashed border-primary" />
          <span className="absolute top-3 right-0 translate-x-1/2 text-[10px] sm:text-xs text-primary font-semibold whitespace-nowrap">
            Rente {endYear}
          </span>
        </div>
      </div>
    </div>
  );
}
