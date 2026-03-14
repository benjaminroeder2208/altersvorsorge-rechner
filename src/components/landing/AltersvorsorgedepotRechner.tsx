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
}

const INCOME_BANDS = [
  { label: "bis 17.000 €", taxRate: 0 },
  { label: "17.000 – 37.000 €", taxRate: 0.2 },
  { label: "37.000 – 57.000 €", taxRate: 0.3 },
  { label: "über 57.000 €", taxRate: 0.42 },
];

const RETURN_OPTIONS = [
  { label: "5 %", value: 0.05 },
  { label: "7 %", value: 0.07 },
  { label: "9 %", value: 0.09 },
];

/* ─────────────── calculation engine ─────────────── */

interface ChartDataPoint {
  age: number;
  contributions: number;
  subsidies: number;
  gains: number;
  total: number;
}

function calculate(inputs: Inputs) {
  const { monthlyContribution, incomeBand, birthYear, children, retirementAge, returnRate } = inputs;

  const currentAge = CURRENT_YEAR - birthYear;
  const yearsToRetirement = Math.max(retirementAge - currentAge, 0);
  const annualOwn = monthlyContribution * 12;

  // Grundzulage
  const grundzulage = annualOwn >= 120
    ? Math.min(annualOwn, 1200) * 0.35 + Math.min(Math.max(annualOwn - 1200, 0), 600) * 0.20
    : 0;

  // Kinderzulage
  const kinderzulagePerChild = annualOwn >= 120 ? Math.min(annualOwn * 0.25, 300) : 0;
  const totalKinderzulage = children * kinderzulagePerChild;

  // Tax benefit
  const marginalTaxRate = INCOME_BANDS[incomeBand].taxRate;
  const taxBenefit = Math.min(annualOwn, 1800) * marginalTaxRate * 0.7;

  const berufseinsteiger = currentAge < 25;
  const annualSubsidy = grundzulage + totalKinderzulage;
  const annualFunding = annualSubsidy + taxBenefit;

  // Growth simulation
  const chartData: ChartDataPoint[] = [];
  let capital = 0;
  let capitalWithout = 0;
  let capitalSavings = 0;
  let totalContributions = 0;
  let totalSubsidies = 0;

  for (let y = 0; y < yearsToRetirement; y++) {
    const age = currentAge + y + 1;
    const yearSubsidy = annualSubsidy + (y === 0 && berufseinsteiger ? 200 : 0);

    totalContributions += annualOwn;
    totalSubsidies += yearSubsidy;

    capital = (capital + annualOwn + yearSubsidy) * (1 + returnRate);
    capitalWithout = (capitalWithout + annualOwn) * (1 + returnRate);
    capitalSavings = (capitalSavings + annualOwn) * 1.02;

    const gains = Math.max(Math.round(capital) - totalContributions - totalSubsidies, 0);

    chartData.push({
      age,
      contributions: totalContributions,
      subsidies: totalSubsidies,
      gains,
      total: Math.round(capital),
    });
  }

  const payoutYears = Math.max(85 - retirementAge, 1);
  const monthlyPayout = capital / (payoutYears * 12);
  const monthlyPayoutWithout = capitalWithout / (payoutYears * 12);
  const monthlyPayoutSavings = capitalSavings / (payoutYears * 12);

  const totalTaxBenefit = taxBenefit * yearsToRetirement;
  const capitalGains = Math.max(Math.round(capital) - totalContributions - totalSubsidies, 0);

  return {
    annualOwn,
    grundzulage,
    totalKinderzulage,
    taxBenefit,
    annualFunding,
    totalContributions,
    totalSubsidies,
    totalTaxBenefit,
    capitalGains,
    capitalWithFunding: capital,
    capitalWithout,
    capitalSavings,
    monthlyPayout,
    monthlyPayoutWithout,
    monthlyPayoutSavings,
    yearsToRetirement,
    currentAge,
    chartData,
    payoutYears,
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

const StackedTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload as ChartDataPoint | undefined;
  if (!point) return null;

  return (
    <div className="bg-background border border-border rounded-xl p-4 shadow-lg min-w-[180px]">
      <p className="text-xs text-muted-foreground mb-3 font-medium">Alter {label}</p>
      <div className="space-y-1.5">
        {[
          { label: "Eigenbeiträge", value: point.contributions, color: "bg-muted-foreground/30" },
          { label: "Zulagen", value: point.subsidies, color: "bg-primary/60" },
          { label: "Kapitalerträge", value: point.gains, color: "bg-[hsl(174,60%,45%)]" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${row.color}`} />
              <span className="text-xs text-muted-foreground">{row.label}</span>
            </div>
            <span className="text-xs font-semibold tabular-nums">{fmtEur(row.value)}</span>
          </div>
        ))}
        <div className="pt-2 mt-2 border-t border-border flex items-center justify-between">
          <span className="text-xs font-semibold">Gesamt</span>
          <span className="text-sm font-bold tabular-nums">{fmtEur(point.total)}</span>
        </div>
      </div>
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
    returnRate: 0.07,
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

              {/* Annual contribution */}
              <p className="text-sm text-muted-foreground mt-6">
                Jährlicher Eigenbeitrag: <span className="font-semibold text-foreground">{fmtEur(inputs.monthlyContribution * 12)}</span>
              </p>

              <button
                onClick={() => setStep(2)}
                className="mt-12 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity"
              >
                Weiter
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: Income ── */}
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
                Wie hoch ist Ihr Bruttojahreseinkommen?
              </h2>
              <p className="text-muted-foreground text-lg mb-12">
                Ihr Einkommen beeinflusst den geschätzten Steuervorteil.
              </p>

              <div className="grid grid-cols-2 gap-3 max-w-xl">
                {INCOME_BANDS.map((band, i) => (
                  <button
                    key={i}
                    onClick={() => set("incomeBand", i)}
                    className={`rounded-2xl p-5 text-left transition-all border ${
                      inputs.incomeBand === i
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border bg-background hover:bg-secondary"
                    }`}
                  >
                    <span className={`text-sm font-semibold ${inputs.incomeBand === i ? "text-primary" : "text-foreground"}`}>
                      {band.label}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(3)}
                className="mt-12 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity"
              >
                Weiter
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ── STEP 3: Personal data ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => setStep(2)}
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
                onClick={() => setStep(4)}
                className="mt-12 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity"
              >
                Ergebnis anzeigen
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ── STEP 4: Results ── */}
          {step === 4 && (
            <motion.div
              key="step4"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ChevronLeft className="w-4 h-4" />
                Angaben ändern
              </button>

              {/* Primary results */}
              <div className="text-center mb-16">
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

              {/* Result interpretation */}
              <div className="max-w-xl mx-auto mb-20 p-6 bg-secondary/50 rounded-2xl">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wenn Sie monatlich <span className="font-semibold text-foreground">{fmtEur(inputs.monthlyContribution)}</span> investieren,
                  könnte Ihr Altersvorsorgedepot bis zum Rentenbeginn mit <span className="font-semibold text-foreground">{inputs.retirementAge}</span> auf
                  etwa <span className="font-semibold text-foreground">{fmtEur(Math.round(r.capitalWithFunding))}</span> anwachsen.
                  Das entspricht einer möglichen monatlichen Auszahlung von
                  etwa <span className="font-semibold text-foreground">{fmtEur(Math.round(r.monthlyPayout))}</span> bis
                  zum Alter von 85 Jahren.
                </p>
              </div>

              {/* Return assumption selector */}
              <div className="mb-8">
                <p className="text-sm font-medium text-muted-foreground mb-3">Renditeannahme</p>
                <div className="inline-flex bg-secondary rounded-full p-1">
                  {RETURN_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => set("returnRate", opt.value)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        inputs.returnRate === opt.value
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stacked area chart */}
              <div className="mb-20">
                <h3 className="text-xl font-bold mb-1">Kapitalentwicklung bis zum Rentenbeginn</h3>
                <p className="text-sm text-muted-foreground mb-8">Aufschlüsselung nach Eigenbeiträgen, Zulagen und Kapitalerträgen</p>

                <div className="h-[300px] md:h-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={r.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradContributions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(240, 1%, 44%)" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="hsl(240, 1%, 44%)" stopOpacity={0.03} />
                        </linearGradient>
                        <linearGradient id="gradSubsidies" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(216, 100%, 34%)" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="hsl(216, 100%, 34%)" stopOpacity={0.03} />
                        </linearGradient>
                        <linearGradient id="gradGains" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(174, 60%, 45%)" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="hsl(174, 60%, 45%)" stopOpacity={0.03} />
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
                      <Tooltip content={<StackedTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="contributions"
                        name="Eigenbeiträge"
                        stackId="1"
                        stroke="hsl(240, 1%, 44%)"
                        fill="url(#gradContributions)"
                        strokeWidth={0}
                      />
                      <Area
                        type="monotone"
                        dataKey="subsidies"
                        name="Zulagen"
                        stackId="1"
                        stroke="hsl(216, 100%, 34%)"
                        fill="url(#gradSubsidies)"
                        strokeWidth={0}
                      />
                      <Area
                        type="monotone"
                        dataKey="gains"
                        name="Kapitalerträge"
                        stackId="1"
                        stroke="hsl(174, 60%, 45%)"
                        fill="url(#gradGains)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Chart legend */}
                <div className="flex items-center justify-center gap-6 mt-4">
                  {[
                    { label: "Eigenbeiträge", color: "bg-muted-foreground/30" },
                    { label: "Zulagen", color: "bg-primary/60" },
                    { label: "Kapitalerträge", color: "bg-[hsl(174,60%,45%)]" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contribution breakdown */}
              <div className="mb-20">
                <h3 className="text-xl font-bold mb-8 text-center">Zusammensetzung Ihres Kapitals</h3>
                <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {[
                    { label: "Eigenbeiträge", value: r.totalContributions, color: "text-foreground" },
                    { label: "Staatliche Zulagen", value: r.totalSubsidies, color: "text-primary" },
                    { label: "Steuervorteile", value: r.totalTaxBenefit, color: "text-primary" },
                  ].map((item) => (
                    <div key={item.label} className="bg-secondary rounded-2xl p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-3">{item.label}</p>
                      <p className={`text-2xl font-bold tabular-nums ${item.color}`}>
                        <AnimatedNumber value={Math.round(item.value)} suffix=" €" />
                      </p>
                    </div>
                  ))}
                </div>

                {/* Funding advantage */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">Ihr Vorteil durch Förderung</p>
                  <p className="text-3xl font-bold text-primary tabular-nums mt-1">
                    +<AnimatedNumber value={Math.round(r.capitalWithFunding - r.capitalWithout)} suffix=" €" />
                  </p>
                </div>
              </div>

              {/* Comparison cards */}
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
