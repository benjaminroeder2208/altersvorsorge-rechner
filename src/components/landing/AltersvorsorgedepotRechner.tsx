import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight, ChevronLeft } from "lucide-react";

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

/* ─────────────── calculation engine ─────────────── */

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

  const growthData: { age: number; total: number }[] = [];
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

    growthData.push({
      age,
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

const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [display, setDisplay] = useState(value);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    if (Math.abs(diff) < 1) { setDisplay(value); return; }
    const duration = 600;
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

  return <>{fmt(display)}{suffix}</>;
};

/* ─────────────── chart tooltip ─────────────── */

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-background border border-border rounded-xl p-3 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">Alter {label}</p>
      <p className="text-sm font-semibold tabular-nums">{fmtEur(payload[0].value)}</p>
    </div>
  );
};

/* ─────────────── stepper input ─────────────── */

const StepperCard = ({
  label, value, min, max, onChange, format,
}: {
  label: string; value: number; min: number; max: number;
  onChange: (v: number) => void; format?: (v: number) => string;
}) => (
  <div className="bg-background border border-border rounded-2xl p-6 flex items-center justify-between">
    <span className="text-base text-muted-foreground">{label}</span>
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-9 h-9 rounded-full bg-secondary text-foreground font-medium text-lg flex items-center justify-center hover:bg-border transition-colors disabled:opacity-20"
      >−</button>
      <span className="text-xl font-bold tabular-nums min-w-[4ch] text-center">
        {format ? format(value) : value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-9 h-9 rounded-full bg-secondary text-foreground font-medium text-lg flex items-center justify-center hover:bg-border transition-colors disabled:opacity-20"
      >+</button>
    </div>
  </div>
);

/* ─────────────── main component ─────────────── */

const AltersvorsorgedepotRechner = () => {
  const [step, setStep] = useState(1);
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

  const stepVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section id="rechner" className="section-padding">
      <div className="container max-w-3xl mx-auto px-6">

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                s === step ? "w-10 bg-primary" : s < step ? "w-6 bg-primary/40" : "w-6 bg-border"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── STEP 1: Contribution ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                Wie viel möchten Sie monatlich
                <br className="hidden md:block" />
                für Ihre Altersvorsorge investieren?
              </h2>
              <p className="text-muted-foreground text-lg mb-16">
                Der Staat könnte Ihre Einzahlung zusätzlich fördern.
              </p>

              {/* Large value display */}
              <p className="text-6xl md:text-8xl font-bold tracking-tight mb-10" style={{ letterSpacing: "-0.03em" }}>
                <AnimatedNumber value={inputs.monthlyContribution} suffix=" €" />
              </p>

              {/* Slider */}
              <div className="max-w-lg mx-auto mb-4">
                <input
                  type="range"
                  min={10} max={600} step={10}
                  value={inputs.monthlyContribution}
                  onChange={(e) => set("monthlyContribution", Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-primary
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
                    [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>10 €</span>
                  <span>600 €</span>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="mt-12 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity"
              >
                Weiter
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: Personal details ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ChevronLeft className="w-4 h-4" />
                Zurück
              </button>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
                Ein paar Angaben zu Ihrer Situation
              </h2>
              <p className="text-muted-foreground text-lg mb-12">
                Damit wir die staatliche Förderung berechnen können.
              </p>

              <div className="space-y-4 max-w-xl">
                <StepperCard
                  label="Geburtsjahr"
                  value={inputs.birthYear}
                  min={1955}
                  max={CURRENT_YEAR - 18}
                  onChange={(v) => set("birthYear", v)}
                />
                <StepperCard
                  label="Kinder"
                  value={inputs.children}
                  min={0}
                  max={6}
                  onChange={(v) => set("children", v)}
                />
                <StepperCard
                  label="Renteneintritt"
                  value={inputs.retirementAge}
                  min={65}
                  max={70}
                  onChange={(v) => set("retirementAge", v)}
                />
              </div>

              <button
                onClick={() => setStep(3)}
                className="mt-12 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity"
              >
                Ergebnis anzeigen
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ── STEP 3: Results ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ChevronLeft className="w-4 h-4" />
                Angaben ändern
              </button>

              {/* Primary result */}
              <div className="text-center mb-20">
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">
                  Kapital zum Rentenbeginn
                </p>
                <p className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-3" style={{ letterSpacing: "-0.03em" }}>
                  <AnimatedNumber value={Math.round(r.capitalWithFunding)} suffix=" €" />
                </p>
                <p className="text-muted-foreground text-lg mb-8">
                  bei {fmtEur(inputs.monthlyContribution)} monatlich über {r.yearsToRetirement} Jahre
                </p>

                <div className="inline-block bg-secondary rounded-2xl px-8 py-5">
                  <p className="text-3xl md:text-4xl font-bold tabular-nums">
                    <AnimatedNumber value={Math.round(r.monthlyPayout)} suffix=" €" />
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">monatliche Auszahlung bis 85</p>
                </div>
              </div>

              {/* Chart */}
              <div className="mb-20">
                <h3 className="text-xl font-bold mb-1">Kapitalentwicklung</h3>
                <p className="text-sm text-muted-foreground mb-8">bis zum Rentenbeginn mit {inputs.retirementAge}</p>

                <div className="h-[280px] md:h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={r.growthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(216, 100%, 34%)" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="hsl(216, 100%, 34%)" stopOpacity={0.01} />
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
                      <Area
                        type="monotone"
                        dataKey="total"
                        name="Kapital"
                        stroke="hsl(216, 100%, 34%)"
                        fill="url(#gradTotal)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Comparison */}
              <div className="mb-20">
                <h3 className="text-xl font-bold mb-8 text-center">Vergleich</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { title: "Altersvorsorgedepot", capital: r.capitalWithFunding, monthly: r.monthlyPayout, highlight: true },
                    { title: "Normales Depot", capital: r.capitalWithout, monthly: r.monthlyPayoutWithout, highlight: false },
                    { title: "Sparkonto (2 %)", capital: r.capitalSavings, monthly: r.monthlyPayoutSavings, highlight: false },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className={`rounded-2xl p-6 transition-shadow ${
                        c.highlight
                          ? "bg-primary/5 ring-1 ring-primary/15"
                          : "bg-secondary"
                      }`}
                    >
                      <p className={`text-sm font-medium mb-5 ${c.highlight ? "text-primary" : "text-muted-foreground"}`}>
                        {c.title}
                      </p>
                      <p className="text-2xl font-bold tabular-nums mb-0.5">
                        <AnimatedNumber value={Math.round(c.capital)} suffix=" €" />
                      </p>
                      <p className="text-xs text-muted-foreground">Kapital zum Rentenbeginn</p>
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-lg font-semibold tabular-nums">
                          <AnimatedNumber value={Math.round(c.monthly)} suffix=" € / Monat" />
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">Auszahlung bis 85</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Funding highlight */}
              <div className="mb-20 max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-2 text-center">Staatliche Förderung</h3>
                <p className="text-center text-3xl md:text-4xl font-bold text-primary tabular-nums mb-8">
                  <AnimatedNumber value={Math.round(r.totalFunding)} suffix=" €" />
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Grundzulage / Jahr", value: fmtEur(r.grundzulage) },
                    { label: "Kinderzulage / Jahr", value: fmtEur(r.totalKinderzulage) },
                    { label: "Geschätzter Steuervorteil / Jahr", value: `≈ ${fmtEur(r.taxBenefit)}` },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-border last:border-none">
                      <span className="text-sm text-muted-foreground">{row.label}</span>
                      <span className="text-sm font-semibold tabular-nums text-primary">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-center max-w-xl mx-auto space-y-2">
                <p className="text-xs text-muted-foreground/60 leading-relaxed">
                  Diese Simulation basiert auf dem aktuellen Gesetzentwurf zur Reform der privaten Altersvorsorge.
                  Steuerliche Effekte und Produktausgestaltung sind vereinfacht dargestellt.
                  Sie stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
                </p>
                <p className="text-xs text-muted-foreground/60 leading-relaxed">
                  Kapitalanlagen bergen Risiken. Frühere Wertentwicklungen sind kein verlässlicher Indikator für die Zukunft.
                </p>
              </div>

              {/* Restart */}
              <div className="text-center mt-12">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  Neue Berechnung starten
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AltersvorsorgedepotRechner;
