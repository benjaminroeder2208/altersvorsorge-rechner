import { useState, useMemo, useCallback, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StackedAreaChart = lazy(() => import("./StackedAreaChart"));
import { ArrowRight, ChevronLeft, Check, Mail, Sparkles, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import KiAuswertungModal from "./KiAuswertungModal";
import NewsletterCard from "./NewsletterCard";
import { trackEvent } from "@/lib/analytics";

import {
  berechneGesamtfoerderung,
  MINDESTEIGENBEITRAG,
  MAX_EIGENANTEIL_GEFOERDERT,
  KINDERZULAGE_PRO_KIND,
  GRUNDZULAGE_SATZ_AB_2027,
  ZUSATZZULAGE_SATZ,
  GRUNDZULAGE_BASIS_MAX,
  ZUSATZZULAGE_BASIS_MAX,
  GRUNDZULAGE_SATZ_AB_2029,
  BERUFSEINSTEIGER_BONUS,
  Child,
} from "@/lib/foerderung";

/* ─────────────── helpers ─────────────── */

const fmt = (v: number) => v.toLocaleString("de-DE", { maximumFractionDigits: 0 });

const fmtEur = (v: number) => `${fmt(v)} €`;

const CURRENT_YEAR = new Date().getFullYear();

/* ─────────────── types ─────────────── */

export interface Inputs {
  monthlyContribution: number;
  incomeBand: number;
  birthYear: number;
  children: Child[];
  retirementAge: number;
  returnRate: number;
}

export type CalculationResult = ReturnType<typeof calculate>;

const INCOME_BANDS = [
  { label: "bis 17.000 €", taxRate: 0, key: "bis_30k" },
  { label: "17.000 – 37.000 €", taxRate: 0.2, key: "30k_50k" },
  { label: "37.000 – 57.000 €", taxRate: 0.3, key: "50k_70k" },
  { label: "über 57.000 €", taxRate: 0.42, key: "ueber_100k" },
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

export function calculate(inputs: Inputs) {
  const { monthlyContribution, incomeBand, birthYear, children, retirementAge, returnRate } = inputs;

  const currentAge = CURRENT_YEAR - birthYear;
  const yearsToRetirement = Math.max(retirementAge - currentAge, 0);
  const annualOwn = monthlyContribution * 12;

  // Tax benefit
  const marginalTaxRate = INCOME_BANDS[incomeBand].taxRate;
  const taxBenefit = Math.min(annualOwn, MAX_EIGENANTEIL_GEFOERDERT) * marginalTaxRate * 0.7;

  const berufseinsteiger = currentAge < 25;

  // Derived values for display
  const grundzulage = berechneGesamtfoerderung(annualOwn, [], 2027);
  const totalKinderzulage = berechneGesamtfoerderung(annualOwn, children, 2027) - grundzulage;

  // Growth simulation
  const chartData: ChartDataPoint[] = [];
  let capital = 0;
  let capitalWithout = 0;
  let capitalSavings = 0;
  let totalContributions = 0;
  let totalSubsidies = 0;

  for (let y = 0; y < yearsToRetirement; y++) {
    const age = currentAge + y + 1;
    const startYear = Math.max(CURRENT_YEAR, 2027);
    const calendarYear = startYear + y;
    const yearSubsidy =
      berechneGesamtfoerderung(annualOwn, children, calendarYear) +
      (y === 0 && berufseinsteiger ? BERUFSEINSTEIGER_BONUS : 0);

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
    if (Math.abs(diff) < 1) {
      setDisplay(value);
      return;
    }
    const duration = 600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + diff * ease));
      if (t < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      {fmt(display)}
      {suffix}
    </>
  );
};

/* ─────────────── helper text component ─────────────── */

const InfoText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-xs text-muted-foreground/70 leading-relaxed ${className}`}>{children}</p>
);


/* ─────────────── stepper input ─────────────── */

const StepperCard = ({
  label,
  value,
  min,
  max,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) => (
  <div className="bg-background border border-border rounded-2xl p-6 flex items-center justify-between">
    <span className="text-base text-muted-foreground">{label}</span>
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-9 h-9 rounded-full bg-secondary text-foreground font-medium text-lg flex items-center justify-center hover:bg-border transition-colors disabled:opacity-20"
      >
        −
      </button>
      <span className="text-xl font-bold tabular-nums min-w-[4ch] text-center">{format ? format(value) : value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-9 h-9 rounded-full bg-secondary text-foreground font-medium text-lg flex items-center justify-center hover:bg-border transition-colors disabled:opacity-20"
      >
        +
      </button>
    </div>
  </div>
);

/* ─────────────── newsletter signup card ─────────────── */


/* ─────────────── main component ─────────────── */

const AltersvorsorgedepotRechner = () => {
  const [step, setStep] = useState(1);
  const [kiModalOpen, setKiModalOpen] = useState(false);
  const [inputs, setInputs] = useState<Inputs>({
    monthlyContribution: 150,
    incomeBand: 2,
    birthYear: 1990,
    children: [],
    retirementAge: 67,
    returnRate: 0.07,
  });

  const set = useCallback(
    <K extends keyof Inputs>(key: K, value: Inputs[K]) => setInputs((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const r = useMemo(() => calculate(inputs), [inputs]);

  // Track calculator usage (debounced) when inputs change
  useEffect(() => {
    const t = setTimeout(() => {
      trackEvent("calculator_used", {
        calculator_type: "retirement_calculator",
        monthly_contribution: inputs.monthlyContribution,
        age: CURRENT_YEAR - inputs.birthYear,
        retirement_age: inputs.retirementAge,
      });
    }, 800);
    return () => clearTimeout(t);
  }, [inputs]);

  const stepVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
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
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Wie viel möchten Sie ab 2027 monatlich in das neue Altersvorsorgedepot investieren?
                </h2>
                <p className="text-muted-foreground text-lg mb-16 max-w-xl mx-auto">
                  Je höher Ihr monatlicher Beitrag, desto stärker kann der langfristige Vermögensaufbau ausfallen.
                </p>

                {/* Large value display */}
                <p className="text-6xl md:text-8xl font-bold tracking-tight mb-10" style={{ letterSpacing: "-0.03em" }}>
                  <AnimatedNumber value={inputs.monthlyContribution} suffix=" €" />
                </p>

                {/* Slider */}
                <div className="max-w-lg mx-auto mb-4">
                  <input
                    type="range"
                    min={10}
                    max={600}
                    step={10}
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
                  Jährlicher Eigenbeitrag:{" "}
                  <span className="font-semibold text-foreground">{fmtEur(inputs.monthlyContribution * 12)}</span>
                </p>
                <InfoText className="mt-2 max-w-sm mx-auto">
                  Dieser Wert ergibt sich aus Ihrem monatlichen Beitrag hochgerechnet auf ein Jahr.
                </InfoText>

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
                className="text-center"
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
                <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
                  Wir nutzen Ihr Einkommen ausschließlich zur Schätzung Ihrer Steuerersparnis durch den
                  Sonderausgabenabzug — nicht zur Berechnung der Zulagen. Zulagen erhält jede förderberechtigte Person
                  unabhängig vom Einkommen.
                </p>

                <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto">
                  {INCOME_BANDS.map((band, i) => (
                    <button
                      key={i}
                      onClick={() => set("incomeBand", i)}
                      className={`rounded-2xl p-5 text-center transition-all border ${
                        inputs.incomeBand === i
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-border bg-background hover:bg-secondary"
                      }`}
                    >
                      <span
                        className={`text-sm font-semibold ${inputs.incomeBand === i ? "text-primary" : "text-foreground"}`}
                      >
                        {band.label}
                      </span>
                    </button>
                  ))}
                </div>

                <InfoText className="mt-6 max-w-md mx-auto">
                  Der Sonderausgabenabzug ermöglicht es, Eigenbeiträge und Zulagen bis zu 1.800 €/Jahr in der
                  Steuererklärung geltend zu machen. Je höher Ihr Grenzsteuersatz, desto größer die zusätzliche
                  Steuerersparnis — diese ist jedoch immer eine Schätzung und individuell verschieden.
                </InfoText>

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
                className="text-center"
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
                <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
                  Ihre Angaben bestimmen die Ansparphase bis zum Rentenbeginn.
                </p>

                <div className="space-y-4 max-w-xl mx-auto">
                  <StepperCard
                    label="Geburtsjahr"
                    value={inputs.birthYear}
                    min={1955}
                    max={CURRENT_YEAR - 18}
                    onChange={(v) => set("birthYear", v)}
                  />
                  <div className="bg-background border border-border rounded-2xl p-6 text-left">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-base text-muted-foreground">Kinder</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (inputs.children.length >= 6) return;
                          set("children", [
                            ...inputs.children,
                            { birthYear: CURRENT_YEAR - 5, kindergeldBis: 18 as const },
                          ]);
                        }}
                        disabled={inputs.children.length >= 6}
                        className="text-sm font-medium text-primary hover:opacity-80 disabled:opacity-30 transition-opacity"
                      >
                        + Kind hinzufügen
                      </button>
                    </div>

                    {inputs.children.length === 0 && (
                      <p className="text-sm text-muted-foreground/70">Keine Kinder hinzugefügt.</p>
                    )}

                    <div className="space-y-3">
                      {inputs.children.map((child, idx) => (
                        <div
                          key={idx}
                          className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-secondary/60"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Geburtsjahr</span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  const next = [...inputs.children];
                                  next[idx] = { ...child, birthYear: Math.max(1990, child.birthYear - 1) };
                                  set("children", next);
                                }}
                                disabled={child.birthYear <= 1990}
                                className="w-7 h-7 rounded-full bg-background text-foreground text-base flex items-center justify-center hover:bg-border disabled:opacity-20"
                              >
                                −
                              </button>
                              <span className="text-sm font-semibold tabular-nums min-w-[4ch] text-center">
                                {child.birthYear}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const next = [...inputs.children];
                                  next[idx] = {
                                    ...child,
                                    birthYear: Math.min(CURRENT_YEAR, child.birthYear + 1),
                                  };
                                  set("children", next);
                                }}
                                disabled={child.birthYear >= CURRENT_YEAR}
                                className="w-7 h-7 rounded-full bg-background text-foreground text-base flex items-center justify-center hover:bg-border disabled:opacity-20"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 ml-auto">
                            {[18, 25].map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => {
                                  const next = [...inputs.children];
                                  next[idx] = { ...child, kindergeldBis: v as 18 | 25 };
                                  set("children", next);
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                  child.kindergeldBis === v
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-background text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                bis {v}
                              </button>
                            ))}
                            <button
                              type="button"
                              aria-label="Kind entfernen"
                              onClick={() => {
                                const next = inputs.children.filter((_, i) => i !== idx);
                                set("children", next);
                              }}
                              className="ml-1 w-7 h-7 rounded-full bg-background text-muted-foreground hover:text-foreground flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-muted-foreground/70 mt-4 leading-snug">
                      „Bis 18" gilt im Grundfall. „Bis 25" wenn das Kind voraussichtlich in Ausbildung oder Studium ist.
                    </p>
                  </div>
                  <StepperCard
                    label="Renteneintritt"
                    value={inputs.retirementAge}
                    min={65}
                    max={70}
                    onChange={(v) => set("retirementAge", v)}
                  />
                </div>

                <InfoText className="mt-6 max-w-sm mx-auto">
                  Kinder können in dieser Simulation zusätzliche Zulagen beeinflussen.
                </InfoText>

                <button
                  onClick={() => {
                    setStep(4);
                    window.__calculatorContext = {
                      monthly_contribution: inputs.monthlyContribution,
                      total_capital: Math.round(r.capitalWithFunding),
                      monthly_payout: Math.round(r.monthlyPayout),
                      retirement_age: inputs.retirementAge,
                      birth_year: inputs.birthYear,
                      children: inputs.children.length,
                      subsidies: Math.round(r.totalSubsidies),
                    };
                    // Anonymous tracking
                    supabase
                      .from("calculator_results")
                      .insert({
                        birth_year: inputs.birthYear,
                        monthly_contribution: inputs.monthlyContribution,
                        monthly_payout: Math.round(r.monthlyPayout),
                        total_capital: Math.round(r.capitalWithFunding),
                        subsidies: Math.round(r.totalSubsidies),
                        tax_benefits: Math.round(r.totalTaxBenefit),
                        capital_gains: Math.round(r.capitalGains),
                        own_contributions: Math.round(r.totalContributions),
                        retirement_age: inputs.retirementAge,
                        return_assumption: inputs.returnRate * 100,
                        children: inputs.children.length,
                        income_bracket: INCOME_BANDS[inputs.incomeBand].key,
                      })
                      .then(({ error }) => {
                        if (error) console.warn("Tracking insert failed:", error.message);
                      });
                  }}
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
                className="text-center"
              >
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Angaben ändern
                </button>

                {/* Primary results */}
                <div className="mb-12">
                  <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">
                    Kapital zum Rentenbeginn
                  </p>
                  <p
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-3"
                    style={{ letterSpacing: "-0.03em" }}
                  >
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

                <InfoText className="max-w-md mx-auto mb-16">
                  Die monatliche Auszahlung wird in dieser Simulation vereinfacht bis zum Alter von 85 Jahren
                  dargestellt.
                </InfoText>

                {/* Result interpretation */}
                <div className="max-w-xl mx-auto mb-20 p-6 bg-secondary/50 rounded-2xl">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Wenn Sie monatlich{" "}
                    <span className="font-semibold text-foreground">{fmtEur(inputs.monthlyContribution)}</span>{" "}
                    investieren, könnte Ihr Altersvorsorgedepot bis zum Rentenbeginn mit{" "}
                    <span className="font-semibold text-foreground">{inputs.retirementAge}</span> auf etwa{" "}
                    <span className="font-semibold text-foreground">{fmtEur(Math.round(r.capitalWithFunding))}</span>{" "}
                    anwachsen. Das entspricht einer möglichen monatlichen Auszahlung von etwa{" "}
                    <span className="font-semibold text-foreground">{fmtEur(Math.round(r.monthlyPayout))}</span> bis zum
                    Alter von 85 Jahren.
                  </p>
                </div>

                {/* KI-Auswertung button */}
                <div className="max-w-lg mx-auto mb-12">
                  <button
                    onClick={() => setKiModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity shadow-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    KI-Auswertung ansehen
                  </button>
                </div>

                {/* KI-Auswertung Modal */}
                <KiAuswertungModal
                  open={kiModalOpen}
                  onClose={() => setKiModalOpen(false)}
                  data={{
                    birth_year: inputs.birthYear,
                    monthly_contribution: inputs.monthlyContribution,
                    monthly_payout: Math.round(r.monthlyPayout),
                    total_capital: Math.round(r.capitalWithFunding),
                    subsidies: Math.round(r.totalSubsidies),
                    tax_benefits: Math.round(r.totalTaxBenefit),
                    retirement_age: inputs.retirementAge,
                    return_assumption: inputs.returnRate * 100,
                    children: inputs.children,
                    income_bracket: INCOME_BANDS[inputs.incomeBand].label,
                  }}
                />

                {/* Newsletter signup */}
                <NewsletterCard inputs={inputs} result={r} />

                {/* Return assumption selector */}
                <div className="mb-12">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Renditeannahme</p>
                  <InfoText className="mb-4 max-w-sm mx-auto">
                    Die Renditeannahme ist eine vereinfachte Szenario-Auswahl und keine Prognose.
                  </InfoText>
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
                  <InfoText className="mb-8 max-w-md mx-auto">
                    Die Darstellung zeigt die simulierte Entwicklung bis zum Rentenbeginn auf Basis Ihrer Angaben.
                  </InfoText>

                  <div id="pdf-chart-capture" className="h-[300px] md:h-[360px]">
                    <Suspense fallback={<div className="w-full h-full bg-muted/30 rounded-lg animate-pulse" />}>
                      <StackedAreaChart data={r.chartData} />
                    </Suspense>
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
                  <h3 className="text-xl font-bold mb-8">Zusammensetzung Ihres Kapitals</h3>
                  <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {[
                      { label: "Eigenbeiträge", value: r.totalContributions, color: "text-foreground" },
                      { label: "Staatliche Zulagen", value: r.totalSubsidies, color: "text-primary" },
                      { label: "Steuervorteile", value: r.totalTaxBenefit, color: "text-primary" },
                    ].map((item) => (
                      <div key={item.label} className="bg-secondary rounded-2xl p-6">
                        <p className="text-sm text-muted-foreground mb-3">{item.label}</p>
                        <p className={`text-2xl font-bold tabular-nums ${item.color}`}>
                          <AnimatedNumber value={Math.round(item.value)} suffix=" €" />
                        </p>
                        {item.label === "Staatliche Zulagen" && (
                          <p className="text-[11px] text-muted-foreground/60 mt-2 leading-snug">
                            Summe aller staatlichen Grundzulagen (und ggf. Kinderzulagen) über die gesamte Ansparzeit —
                            direkt in Ihr Depot eingezahlt, unabhängig von Ihrem Einkommen.
                          </p>
                        )}
                        {item.label === "Steuervorteile" && (
                          <p className="text-[11px] text-muted-foreground/60 mt-2 leading-snug">
                            Geschätzter kumulierter Steuervorteil durch den Sonderausgabenabzug, basierend auf Ihrer
                            Einkommensklasse. Individuelle Abweichungen sind möglich.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-background border border-border rounded-2xl p-6 max-w-2xl mx-auto text-left">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Eingezahltes Kapital gesamt</p>
                        <p className="text-xl font-bold tabular-nums">
                          <AnimatedNumber value={Math.round(r.totalContributions + r.totalSubsidies)} suffix=" €" />
                        </p>
                        <p className="text-[11px] text-muted-foreground/60 mt-1 leading-snug">
                          Eigenbeiträge + Staatliche Zulagen
                        </p>
                      </div>
                      <div className="text-muted-foreground text-2xl font-light">+</div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Wertentwicklung (Kapitalerträge)</p>
                        <p className="text-xl font-bold tabular-nums text-[hsl(174,60%,38%)]">
                          <AnimatedNumber
                            value={Math.round(r.capitalWithFunding - r.totalContributions - r.totalSubsidies)}
                            suffix=" €"
                          />
                        </p>
                        <p className="text-[11px] text-muted-foreground/60 mt-1 leading-snug">
                          Simulierte Erträge bei {Math.round(inputs.returnRate * 100)} % p.a.
                        </p>
                      </div>
                      <div className="text-muted-foreground text-2xl font-light">=</div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Kapital zum Rentenbeginn</p>
                        <p className="text-xl font-bold tabular-nums text-primary">
                          <AnimatedNumber value={Math.round(r.capitalWithFunding)} suffix=" €" />
                        </p>
                        <p className="text-[11px] text-muted-foreground/60 mt-1 leading-snug">
                          Entspricht dem oben angezeigten Gesamtkapital
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-5 leading-snug border-t border-border pt-4">
                      Kapitalerträge sind keine Garantie. Die Simulation basiert auf vereinfachten Annahmen ohne
                      Inflation, Kosten oder Steuern auf Erträge. Frühere Wertentwicklungen sind kein verlässlicher
                      Indikator für die Zukunft.
                    </p>
                  </div>

                  <InfoText className="mt-6 max-w-md mx-auto">
                    Die Zusammensetzung zeigt, wie sich Eigenbeiträge, staatliche Zulagen und Kapitalerträge ergänzen
                    können.
                  </InfoText>

                  {/* Funding advantage */}
                  <div className="mt-8">
                    <p className="text-sm text-muted-foreground">Ihr Vorteil durch Förderung</p>
                    <p className="text-3xl font-bold text-primary tabular-nums mt-1">
                      +<AnimatedNumber value={Math.round(r.capitalWithFunding - r.capitalWithout)} suffix=" €" />
                    </p>
                    <InfoText className="mt-2 max-w-md mx-auto">
                      Dieser Betrag zeigt, wie viel mehr Kapital zum Rentenbeginn durch staatliche Förderung entsteht —
                      im Vergleich zu identischen Einzahlungen ohne Förderung (z. B. in ein normales Depot).
                    </InfoText>
                    <InfoText className="mt-2 max-w-md mx-auto">
                      Enthält Zulagen und Steuervorteile, die über die gesamte Laufzeit mitwachsen. Basiert auf dem
                      Altersvorsorgereformgesetz (beschlossen 27.03.2026).
                    </InfoText>
                  </div>
                </div>

                {/* Comparison cards */}
                <div className="mb-20">
                  <h3 className="text-xl font-bold mb-8">Vergleich</h3>
                  <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {[
                      {
                        title: "Altersvorsorgedepot",
                        capital: r.capitalWithFunding,
                        monthly: r.monthlyPayout,
                        highlight: true,
                      },
                      {
                        title: "Normales Depot",
                        capital: r.capitalWithout,
                        monthly: r.monthlyPayoutWithout,
                        highlight: false,
                      },
                      {
                        title: "Sparkonto (2 %)",
                        capital: r.capitalSavings,
                        monthly: r.monthlyPayoutSavings,
                        highlight: false,
                      },
                    ].map((c) => (
                      <div
                        key={c.title}
                        className={`rounded-2xl p-6 transition-shadow ${
                          c.highlight ? "bg-primary/5 ring-1 ring-primary/15" : "bg-secondary"
                        }`}
                      >
                        <p
                          className={`text-sm font-medium mb-5 ${c.highlight ? "text-primary" : "text-muted-foreground"}`}
                        >
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

                  <InfoText className="mt-6 max-w-md mx-auto">
                    Der Vergleich soll die Wirkung von Förderung und langfristiger Kapitalanlage verdeutlichen.
                  </InfoText>
                </div>

                {/* Disclaimer */}
                <div className="max-w-xl mx-auto p-5 bg-muted/50 border border-border/60 rounded-xl text-center">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Hinweise & Haftungsausschluss
                  </p>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">
                    Diese Simulation basiert auf dem Altersvorsorgereformgesetz (beschlossen 27.03.2026). Steuerliche
                    Effekte und Produktausgestaltung sind vereinfacht dargestellt. Kapitalanlagen bergen Risiken.
                    Frühere Wertentwicklungen sind kein verlässlicher Indikator für die Zukunft. Sie stellt keine
                    Anlage-, Steuer- oder Rechtsberatung dar.
                  </p>
                </div>

                {/* Restart */}
                <div className="mt-12">
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

      {/* ── FOOTNOTES SECTION ── */}
      {step === 4 && (
        <section className="bg-muted/30 border-t border-border/40 py-24 md:py-32">
          <div className="container max-w-3xl mx-auto px-6 text-center">
            <p className="text-muted-foreground text-base mb-16 max-w-xl mx-auto">
              Weitere Erläuterungen zur Simulation, zu Annahmen und zum beschlossenen Gesetz.
            </p>

            <div className="text-left max-w-2xl mx-auto space-y-6 text-sm text-muted-foreground leading-relaxed">
              <p>
                Die dargestellten Berechnungen basieren auf dem Altersvorsorgereformgesetz, das am 27. März 2026 vom
                Deutschen Bundestag beschlossen wurde. Die lektorierte Fassung des Gesetzes kann geringfügig von der
                Beschlussempfehlung abweichen.
              </p>
              <p>
                Die Simulation verwendet vereinfachte Annahmen. Die Renditeannahmen (5 %, 7 %, 9 %) orientieren sich am
                historischen Durchschnitt breit gestreuter Aktienindizes (siehe z.{"\u00A0"}B.{" "}
                <a
                  href="https://www.dai.de/detail/msci-world-rendite-dreieck-fuer-die-monatliche-geldanlage-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  MSCI-World-Renditedreieck des Deutschen Aktieninstituts
                </a>
                ) und stellen keine Prognose dar. Die tatsächliche Wertentwicklung hängt von der gewählten Anlageform,
                der Marktentwicklung und den anfallenden Kosten ab.
              </p>
              <p>
                Die steuerlichen Vorteile werden auf Basis vereinfachter Grenzsteuersätze geschätzt. Die tatsächliche
                steuerliche Wirkung kann je nach individueller Situation, Familienstand, weiteren Einkünften und
                geltenden Freibeträgen erheblich abweichen. Eine individuelle steuerliche Beratung wird empfohlen.
              </p>
              <p>
                Die Grundzulage wird gemäß dem beschlossenen Gesetz mit {GRUNDZULAGE_SATZ_AB_2027 * 100} % auf
                Eigenbeiträge bis {fmt(GRUNDZULAGE_BASIS_MAX)} € und {ZUSATZZULAGE_SATZ * 100} % auf Beiträge zwischen{" "}
                {fmt(GRUNDZULAGE_BASIS_MAX)} € und {fmt(ZUSATZZULAGE_BASIS_MAX)} € jährlich berechnet. Die Kinderzulage
                beträgt bis zu 100 % des Eigenbeitrags, maximal {KINDERZULAGE_PRO_KIND} € pro Kind und Jahr. Eine
                Mindestsparleistung von {MINDESTEIGENBEITRAG} € pro Jahr ist Voraussetzung für die Förderung.
              </p>
              <p>
                Die monatliche Auszahlung wird vereinfacht als gleichmäßige Entnahme des angesparten Kapitals bis zum
                Alter von 85 Jahren berechnet. In der Praxis können Auszahlungsmodelle (z. B. Teilverrentung, flexible
                Entnahme oder lebenslange Rente) die tatsächlichen monatlichen Beträge erheblich beeinflussen.
              </p>
              <p>
                Der Vergleich mit einem ungeförderten Depot und einem Sparkonto dient ausschließlich der
                Veranschaulichung. Das Sparkonto wird mit einer pauschalen Verzinsung von 2 % p.a. simuliert. Inflation,
                Steuern auf Erträge und individuelle Kosten sind in keiner der Varianten berücksichtigt.
              </p>
              <p>
                Kapitalanlagen bergen Risiken, einschließlich des möglichen Verlusts des eingesetzten Kapitals. Frühere
                Wertentwicklungen sind kein verlässlicher Indikator für künftige Ergebnisse. Diese Simulation stellt
                keine Anlageberatung, Steuerberatung oder Rechtsberatung dar.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AltersvorsorgedepotRechner;
