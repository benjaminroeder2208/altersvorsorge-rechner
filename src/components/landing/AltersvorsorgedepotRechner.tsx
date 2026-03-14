import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Info } from "lucide-react";

/* ─────────────── helpers ─────────────── */

const fmt = (v: number) =>
  v.toLocaleString("de-DE", { maximumFractionDigits: 0 });

const fmtEur = (v: number) => `${fmt(v)} €`;

const CURRENT_YEAR = new Date().getFullYear();

/* ─────────────── types ─────────────── */

interface Inputs {
  monthlyContribution: number;
  incomeBand: number;
  birthYear: number;
  children: number;
  retirementAge: number;
  returnRate: number;
  lumpSumRate: number;
}

const INCOME_BANDS = [
  { label: "Bis 17.000 €", taxRate: 0 },
  { label: "17.000 – 37.000 €", taxRate: 0.2 },
  { label: "37.000 – 57.000 €", taxRate: 0.3 },
  { label: "Über 57.000 €", taxRate: 0.42 },
];

const RETURN_OPTIONS = [
  { label: "5 %", value: 0.05 },
  { label: "7,5 %", value: 0.075 },
  { label: "9 %", value: 0.09 },
];

/* ─────────────── calculation engine (unchanged) ─────────────── */

function calculate(inputs: Inputs) {
  const { monthlyContribution, incomeBand, birthYear, children, retirementAge, returnRate, lumpSumRate } = inputs;

  const currentAge = CURRENT_YEAR - birthYear;
  const yearsToRetirement = Math.max(retirementAge - currentAge, 0);
  const annualOwn = monthlyContribution * 12;

  const grundzulage = annualOwn >= 120
    ? Math.min(annualOwn, 1200) * 0.35 + Math.min(Math.max(annualOwn - 1200, 0), 600) * 0.20
    : 0;

  const kinderzulagePerChild = annualOwn >= 120 ? Math.min(annualOwn * 0.25, 300) : 0;
  const totalKinderzulage = children * kinderzulagePerChild;

  const marginalTaxRate = INCOME_BANDS[incomeBand].taxRate;
  const taxBenefit = Math.min(annualOwn, 1800) * marginalTaxRate * 0.7;

  const berufseinsteiger = currentAge < 25;
  const annualFunding = grundzulage + totalKinderzulage + taxBenefit;

  const growthData: { age: number; eigenbeitraege: number; foerderung: number; ertraege: number; total: number }[] = [];
  let capitalWithFunding = 0;
  let capitalWithout = 0;
  let capitalSavings = 0;
  let totalContributions = 0;
  let totalFunding = 0;

  for (let y = 0; y < yearsToRetirement; y++) {
    const age = currentAge + y + 1;
    const yearFunding = annualFunding + (y === 0 && berufseinsteiger ? 200 : 0);

    totalContributions += annualOwn;
    totalFunding += yearFunding;

    capitalWithFunding = (capitalWithFunding + annualOwn + yearFunding) * (1 + returnRate);
    capitalWithout = (capitalWithout + annualOwn) * (1 + returnRate);
    capitalSavings = (capitalSavings + annualOwn) * 1.02;

    const ertraege = capitalWithFunding - totalContributions - totalFunding;

    growthData.push({
      age,
      eigenbeitraege: Math.round(totalContributions),
      foerderung: Math.round(totalFunding),
      ertraege: Math.round(Math.max(ertraege, 0)),
      total: Math.round(capitalWithFunding),
    });
  }

  const payoutYears = Math.max(85 - retirementAge, 1);
  const lumpSum = capitalWithFunding * lumpSumRate;
  const remainingCapital = capitalWithFunding - lumpSum;
  const monthlyPayout = remainingCapital / (payoutYears * 12);
  const monthlyPayoutWithout = capitalWithout / (payoutYears * 12);
  const monthlyPayoutSavings = capitalSavings / (payoutYears * 12);

  return {
    annualOwn, grundzulage, totalKinderzulage, taxBenefit, annualFunding,
    berufseinsteiger, capitalWithFunding, capitalWithout, capitalSavings,
    monthlyPayout, monthlyPayoutWithout, monthlyPayoutSavings, lumpSum,
    yearsToRetirement, currentAge, growthData, totalContributions, totalFunding, payoutYears,
  };
}

/* ─────────────── animated number ─────────────── */

const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [display, setDisplay] = useState(value);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    if (Math.abs(diff) < 1) { setDisplay(value); return; }
    const duration = 400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + diff * ease));
      if (t < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{prefix}{fmt(display)}{suffix}</>;
};

/* ─────────────── sub-components (light theme) ─────────────── */

const SliderInput = ({
  label, value, min, max, step = 1, format, onChange,
}: {
  label: string; value: number; min: number; max: number;
  step?: number; format: (v: number) => string; onChange: (v: number) => void;
}) => (
  <div className="space-y-4">
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-2xl font-bold tracking-tight tabular-nums"><AnimatedNumber value={value} suffix={format(value).replace(fmt(value), "")} /></span>
    </div>
    <input
      type="range"
      min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-primary
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
        [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer
        [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:hover:shadow-md"
    />
  </div>
);

const SegmentedControl = ({
  label, options, value, onChange,
}: {
  label: string; options: { label: string; value: number }[];
  value: number; onChange: (v: number) => void;
}) => (
  <div className="space-y-3">
    <span className="text-sm text-muted-foreground">{label}</span>
    <div className="flex gap-2 flex-wrap">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
            value === o.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  </div>
);

const Stepper = ({
  label, value, min, max, onChange,
}: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void;
}) => (
  <div className="space-y-3">
    <span className="text-sm text-muted-foreground">{label}</span>
    <div className="flex items-center gap-4">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-10 h-10 rounded-full bg-secondary text-foreground font-medium text-lg flex items-center justify-center hover:bg-secondary/70 transition-colors disabled:opacity-25"
      >−</button>
      <span className="text-2xl font-bold tabular-nums min-w-[2ch] text-center">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-10 h-10 rounded-full bg-secondary text-foreground font-medium text-lg flex items-center justify-center hover:bg-secondary/70 transition-colors disabled:opacity-25"
      >+</button>
    </div>
  </div>
);

/* chart tooltip */
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-background border border-border rounded-xl p-4 shadow-lg">
      <p className="text-xs text-muted-foreground mb-2">Alter {label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs mb-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold tabular-nums">{fmtEur(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

/* ─────────────── main component ─────────────── */

const AltersvorsorgedepotRechner = () => {
  const [inputs, setInputs] = useState<Inputs>({
    monthlyContribution: 150,
    incomeBand: 2,
    birthYear: 1990,
    children: 0,
    retirementAge: 67,
    returnRate: 0.075,
    lumpSumRate: 0,
  });

  const set = useCallback(
    <K extends keyof Inputs>(key: K, value: Inputs[K]) =>
      setInputs((prev) => ({ ...prev, [key]: value })),
    []
  );

  const r = useMemo(() => calculate(inputs), [inputs]);
  const resultsRef = useRef<HTMLDivElement>(null);

  return (
    <section id="rechner" className="section-padding">
      <div className="container max-w-5xl mx-auto px-6">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="heading-section mb-6">
            Berechnen Sie Ihr mögliches
            <br className="hidden md:block" />
            Altersvorsorgedepot.
          </h2>
          <p className="text-body max-w-xl mx-auto">
            Eine vereinfachte Simulation auf Basis des aktuellen Gesetzentwurfs.
          </p>
        </motion.div>

        {/* ── STEP 1: Inputs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl mx-auto space-y-10 mb-24"
        >
          <SliderInput
            label="Monatlicher Sparbetrag"
            value={inputs.monthlyContribution}
            min={10} max={570} step={10}
            format={(v) => fmtEur(v)}
            onChange={(v) => set("monthlyContribution", v)}
          />

          <SliderInput
            label="Geburtsjahr"
            value={inputs.birthYear}
            min={1960} max={2005}
            format={(v) => String(v)}
            onChange={(v) => set("birthYear", v)}
          />

          <SliderInput
            label="Rentenbeginn"
            value={inputs.retirementAge}
            min={65} max={70}
            format={(v) => `${v} Jahre`}
            onChange={(v) => set("retirementAge", v)}
          />

          <Stepper
            label="Kinder"
            value={inputs.children}
            min={0} max={6}
            onChange={(v) => set("children", v)}
          />

          <SegmentedControl
            label="Erwartete Rendite p.a."
            options={RETURN_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
            value={inputs.returnRate}
            onChange={(v) => set("returnRate", v)}
          />

          <SegmentedControl
            label="Bruttojahreseinkommen"
            options={INCOME_BANDS.map((b, i) => ({ label: b.label, value: i }))}
            value={inputs.incomeBand}
            onChange={(v) => set("incomeBand", v)}
          />

          {r.annualOwn > 1800 && (
            <div className="flex items-start gap-2.5 text-sm text-muted-foreground bg-secondary rounded-2xl p-4">
              <Info className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <span>Für die Förderberechnung werden maximal 1.800 € jährlicher Eigenbeitrag berücksichtigt.</span>
            </div>
          )}
        </motion.div>

        {/* ── STEP 2: Results ── */}
        <div ref={resultsRef}>
          {/* primary result */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">
              Mögliches Ergebnis
            </p>
            <p className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.03em" }}>
              <AnimatedNumber value={Math.round(r.capitalWithFunding)} suffix=" €" />
            </p>
            <p className="text-muted-foreground text-lg">
              Kapital zum Rentenbeginn mit {inputs.retirementAge}
            </p>

            <div className="mt-8 inline-flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold tabular-nums">
                  <AnimatedNumber value={Math.round(r.monthlyPayout)} suffix=" €" />
                </p>
                <p className="text-sm text-muted-foreground mt-1">monatliche Auszahlung bis 85</p>
              </div>
            </div>
          </motion.div>

          {/* narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24 max-w-2xl mx-auto"
          >
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
              Bei einer monatlichen Einzahlung von <span className="text-foreground font-semibold">{fmtEur(inputs.monthlyContribution)}</span> könnte
              Ihr Altersvorsorgedepot über <span className="text-foreground font-semibold">{r.yearsToRetirement} Jahre</span> auf
              über <span className="text-primary font-semibold">{fmtEur(r.capitalWithFunding)}</span> anwachsen.
            </p>
          </motion.div>

          {/* ── Growth Chart ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h3 className="text-2xl font-bold mb-2">Ansparen bis {inputs.retirementAge}</h3>
            <p className="text-muted-foreground text-sm mb-10">Zusammensetzung Ihres möglichen Depotkapitals</p>

            {/* legend */}
            <div className="flex flex-wrap gap-6 mb-6">
              {[
                { color: "hsl(var(--primary))", label: "Eigenbeiträge" },
                { color: "hsl(170, 60%, 45%)", label: "Zulagen & Steuervorteile" },
                { color: "hsl(250, 60%, 68%)", label: "Kapitalerträge" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>

            <div className="h-[300px] md:h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={r.growthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradEigen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(216, 100%, 34%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(216, 100%, 34%)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gradFoerderung" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(170, 60%, 45%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(170, 60%, 45%)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gradErtraege" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(250, 60%, 68%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(250, 60%, 68%)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="age"
                    tick={{ fill: "hsl(240, 1%, 44%)", fontSize: 12 }}
                    axisLine={false} tickLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fill: "hsl(240, 1%, 44%)", fontSize: 12 }}
                    axisLine={false} tickLine={false}
                    tickFormatter={(v) => v >= 1000 ? `${Math.round(v / 1000)}k` : fmt(v)}
                    width={50}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="eigenbeitraege" name="Eigenbeiträge" stackId="1"
                    stroke="hsl(216, 100%, 34%)" fill="url(#gradEigen)" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="foerderung" name="Zulagen & Steuervorteile" stackId="1"
                    stroke="hsl(170, 60%, 45%)" fill="url(#gradFoerderung)" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="ertraege" name="Kapitalerträge" stackId="1"
                    stroke="hsl(250, 60%, 68%)" fill="url(#gradErtraege)" strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ── Comparison Cards ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h3 className="text-2xl font-bold mb-10 text-center">Vergleich</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: "Altersvorsorgedepot", capital: r.capitalWithFunding, monthly: r.monthlyPayout, highlight: true },
                { title: "Normales Depot", capital: r.capitalWithout, monthly: r.monthlyPayoutWithout, highlight: false },
                { title: "Sparkonto (2 % p.a.)", capital: r.capitalSavings, monthly: r.monthlyPayoutSavings, highlight: false },
              ].map((c) => (
                <div
                  key={c.title}
                  className={`rounded-2xl p-8 transition-shadow duration-300 ${
                    c.highlight
                      ? "bg-primary/5 ring-1 ring-primary/15 shadow-sm"
                      : "bg-secondary"
                  }`}
                >
                  <p className={`text-sm font-medium mb-6 ${c.highlight ? "text-primary" : "text-muted-foreground"}`}>
                    {c.title}
                  </p>
                  <p className="text-3xl font-bold tabular-nums mb-1">
                    <AnimatedNumber value={Math.round(c.capital)} suffix=" €" />
                  </p>
                  <p className="text-sm text-muted-foreground">Kapital zum Rentenbeginn</p>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xl font-semibold tabular-nums">
                      <AnimatedNumber value={Math.round(c.monthly)} suffix=" € / Monat" />
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Auszahlung bis 85</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Funding Explainer ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl mx-auto mb-24"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">So entsteht die Förderung</h3>
            <div className="space-y-4">
              {[
                { label: "Eigenbeitrag / Jahr", value: fmtEur(r.annualOwn), accent: false },
                { label: "Grundzulage", value: fmtEur(r.grundzulage), accent: true },
                { label: "Kinderzulage", value: fmtEur(r.totalKinderzulage), accent: true },
                { label: "Geschätzter Steuervorteil", value: `≈ ${fmtEur(r.taxBenefit)}`, accent: true },
                ...(r.berufseinsteiger ? [{ label: "Berufseinsteigerbonus (einmalig)", value: "200 €", accent: true }] : []),
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-3 border-b border-border last:border-none">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className={`text-sm font-semibold tabular-nums ${row.accent ? "text-primary" : ""}`}>
                    {row.value}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2">
                <span className="font-semibold">Gesamte Förderung / Jahr</span>
                <span className="text-lg font-bold text-primary tabular-nums">{fmtEur(r.annualFunding)}</span>
              </div>
            </div>
          </motion.div>

          {/* ── Disclaimer ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              Diese Simulation basiert auf dem aktuellen Gesetzentwurf zur Reform der privaten Altersvorsorge.
              Steuerliche Effekte und Produktausgestaltung sind vereinfacht dargestellt.
              Sie stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
            </p>
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              Kapitalanlagen bergen Risiken. Frühere Wertentwicklungen sind kein verlässlicher Indikator für die Zukunft.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AltersvorsorgedepotRechner;