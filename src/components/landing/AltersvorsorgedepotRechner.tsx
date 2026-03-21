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
import { ArrowRight, ChevronLeft, Check, Mail, Sparkles, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import KiAuswertungModal from "./KiAuswertungModal";
import { generatePDFBase64, captureChart } from "@/utils/generatePDF";

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

/* ─────────────── helper text component ─────────────── */

const InfoText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-xs text-muted-foreground/70 leading-relaxed ${className}`}>{children}</p>
);

/* ─────────────── chart tooltip ─────────────── */

const StackedTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload as ChartDataPoint | undefined;
  if (!point) return null;

  return (
    <div className="bg-background border border-border rounded-xl p-4 shadow-lg min-w-[200px]">
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
          <span className="text-xs font-semibold">Gesamtvermögen</span>
          <span className="text-sm font-bold tabular-nums">{fmtEur(point.total)}</span>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground/50 mt-3 leading-tight">
        Vereinfachte Simulation auf Basis Ihrer Eingaben.
      </p>
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

/* ─────────────── newsletter signup card ─────────────── */

const NewsletterCard = ({ inputs, result }: { inputs: Inputs; result: ReturnType<typeof calculate> }) => {
  const [email, setEmail] = useState("");
  const [dsgvoAccepted, setDsgvoAccepted] = useState(false);
  const [dsgvoError, setDsgvoError] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "sending" || status === "sent") return;
    if (!dsgvoAccepted) {
      setDsgvoError(true);
      return;
    }

    setStatus("sending");
    try {
      // Generate PDF
      let pdfBase64 = "";
      try {
        const chartImg = await captureChart();
        pdfBase64 = await generatePDFBase64({
          monthly_contribution: inputs.monthlyContribution,
          total_capital: Math.round(result.capitalWithFunding),
          monthly_payout: Math.round(result.monthlyPayout),
          subsidies: Math.round(result.totalSubsidies),
          capital_without: Math.round(result.capitalWithout),
          payout_without: Math.round(result.monthlyPayoutWithout),
          capital_savings: Math.round(result.capitalSavings),
          payout_savings: Math.round(result.monthlyPayoutSavings),
          retirement_age: inputs.retirementAge,
          birth_year: inputs.birthYear,
          chart_image: chartImg,
        });
      } catch (pdfErr) {
        console.error("PDF generation failed:", pdfErr);
      }

      const confirmToken = crypto.randomUUID();
      const { error } = await supabase.from("simulation_leads").insert({
        email,
        monthly_contribution: inputs.monthlyContribution,
        birth_year: inputs.birthYear,
        children: inputs.children,
        retirement_age: inputs.retirementAge,
        return_assumption: inputs.returnRate * 100,
        calculated_capital: Math.round(result.capitalWithFunding),
        monthly_payout: Math.round(result.monthlyPayout),
        total_subsidies: Math.round(result.totalSubsidies),
        confirmation_token: confirmToken,
        pdf_base64: pdfBase64 || null,
      } as any);
      if (error) throw error;

      // Send confirmation email (DOI)
      supabase.functions.invoke("send-confirmation-email", {
        body: { email, token: confirmToken },
      }).catch(() => {});

      setStatus("sent");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="max-w-lg mx-auto mb-20">
      <div className="bg-background border border-border rounded-2xl p-8 shadow-sm text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="text-lg font-semibold">Deine persönliche PDF-Auswertung</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto leading-relaxed">
          Gib deine E-Mail ein und erhalte deine persönliche Auswertung als PDF — mit deinen Kennzahlen, Kapitalentwicklungs-Chart und Vergleich. Kostenlos, kein Newsletter.
        </p>

        {status === "sent" ? (
          <div className="flex items-center justify-center gap-2 text-primary text-sm font-medium py-3">
            <FileText className="w-4 h-4" /> Fast geschafft! Wir haben dir eine Bestätigungsmail gesendet. Nach der Bestätigung erhältst du dein PDF sofort.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Deine E-Mail-Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-secondary/50 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                disabled={status === "sending" || !dsgvoAccepted}
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "sending" ? "..." : "Jetzt informieren"}
              </button>
            </div>
            <div className="flex items-start gap-2 text-left">
              <Checkbox
                id="dsgvo-newsletter"
                checked={dsgvoAccepted}
                onCheckedChange={(v) => { setDsgvoAccepted(!!v); setDsgvoError(false); }}
                className={`mt-0.5 ${dsgvoError ? "border-destructive ring-1 ring-destructive" : ""}`}
              />
              <label htmlFor="dsgvo-newsletter" className="text-[11px] text-muted-foreground leading-relaxed cursor-pointer">
                Ich stimme der Verarbeitung meiner E-Mail-Adresse gemäß der{" "}
                <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Datenschutzerklärung</a>{" "}
                zu. Die Adresse wird ausschließlich zur Zusendung meiner Auswertung und gelegentlicher Updates verwendet.
              </label>
            </div>
            {dsgvoError && (
              <p className="text-[11px] text-destructive text-left">Bitte stimme der Datenschutzerklärung zu.</p>
            )}
            {status === "error" && (
              <p className="text-xs text-destructive">Fehler beim Speichern. Bitte versuche es erneut.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

/* ─────────────── main component ─────────────── */

const AltersvorsorgedepotRechner = () => {
  const [step, setStep] = useState(1);
  const [kiModalOpen, setKiModalOpen] = useState(false);
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
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                  Wie viel möchten Sie monatlich
                  <br className="hidden md:block" />
                  {" "}für Ihre Altersvorsorge investieren?
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
                  Das Einkommen beeinflusst in dieser Simulation die geschätzten steuerlichen Vorteile.
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
                      <span className={`text-sm font-semibold ${inputs.incomeBand === i ? "text-primary" : "text-foreground"}`}>
                        {band.label}
                      </span>
                    </button>
                  ))}
                </div>

                <InfoText className="mt-6 max-w-sm mx-auto">
                  Die steuerliche Wirkung wird vereinfacht dargestellt.
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
                      children: inputs.children,
                      subsidies: Math.round(r.totalSubsidies),
                    };
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

                <InfoText className="max-w-md mx-auto mb-16">
                  Die monatliche Auszahlung wird in dieser Simulation vereinfacht bis zum Alter von 85 Jahren dargestellt.
                </InfoText>

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
                      </div>
                    ))}
                  </div>

                  <InfoText className="mt-6 max-w-md mx-auto">
                    Die Zusammensetzung zeigt, wie sich Eigenbeiträge, staatliche Zulagen und Kapitalerträge ergänzen können.
                  </InfoText>

                  {/* Funding advantage */}
                  <div className="mt-8">
                    <p className="text-sm text-muted-foreground">Ihr Vorteil durch Förderung</p>
                    <p className="text-3xl font-bold text-primary tabular-nums mt-1">
                      +<AnimatedNumber value={Math.round(r.capitalWithFunding - r.capitalWithout)} suffix=" €" />
                    </p>
                    <InfoText className="mt-2 max-w-xs mx-auto">
                      Diese Darstellung basiert auf den Annahmen des aktuellen Gesetzentwurfs.
                    </InfoText>
                  </div>
                </div>

                {/* Comparison cards */}
                <div className="mb-20">
                  <h3 className="text-xl font-bold mb-8">Vergleich</h3>
                  <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
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

                  <InfoText className="mt-6 max-w-md mx-auto">
                    Der Vergleich soll die Wirkung von Förderung und langfristiger Kapitalanlage verdeutlichen.
                  </InfoText>
                </div>

                {/* Disclaimer */}
                <div className="max-w-xl mx-auto space-y-2">
                  <p className="text-xs text-muted-foreground/60 leading-relaxed">
                    Diese Simulation basiert auf dem aktuellen Gesetzentwurf zur Reform der privaten Altersvorsorge.
                    Steuerliche Effekte und Produktausgestaltung sind vereinfacht dargestellt.
                    Sie stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
                  </p>
                  <p className="text-xs text-muted-foreground/60 leading-relaxed">
                    Kapitalanlagen bergen Risiken. Frühere Wertentwicklungen sind kein verlässlicher Indikator für die Zukunft.
                  </p>
                  <InfoText className="max-w-xs mx-auto">
                    Die genaue Ausgestaltung hängt vom finalen Gesetz ab.
                  </InfoText>
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
        <section className="bg-secondary py-24 md:py-32">
          <div className="container max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Fußnoten und Hinweise
            </h2>
            <p className="text-muted-foreground text-base mb-16 max-w-xl mx-auto">
              Weitere Erläuterungen zur Simulation, zu Annahmen und zum aktuellen Gesetzentwurf.
            </p>

            <div className="text-left max-w-2xl mx-auto space-y-6 text-sm text-muted-foreground leading-relaxed">
              <p>
                Die dargestellten Berechnungen basieren auf dem Gesetzentwurf zur Reform der geförderten privaten Altersvorsorge
                in der zum Zeitpunkt der Erstellung verfügbaren Fassung. Änderungen im Gesetzgebungsverfahren können dazu führen,
                dass einzelne Förderbedingungen, Zulagenhöhen oder steuerliche Regelungen im finalen Gesetz abweichen.
              </p>
              <p>
                Die Simulation verwendet vereinfachte Annahmen. Die Renditeannahmen (5 %, 7 %, 9 %) dienen ausschließlich der
                Veranschaulichung und stellen keine Prognose dar. Die tatsächliche Wertentwicklung hängt von der gewählten
                Anlageform, der Marktentwicklung und den anfallenden Kosten ab.
              </p>
              <p>
                Die steuerlichen Vorteile werden auf Basis vereinfachter Grenzsteuersätze geschätzt. Die tatsächliche steuerliche
                Wirkung kann je nach individueller Situation, Familienstand, weiteren Einkünften und geltenden Freibeträgen
                erheblich abweichen. Eine individuelle steuerliche Beratung wird empfohlen.
              </p>
              <p>
                Die Grundzulage wird gemäß dem Entwurf mit 35 % auf Eigenbeiträge bis 1.200 € und 20 % auf Beiträge zwischen
                1.200 € und 1.800 € jährlich berechnet. Die Kinderzulage beträgt bis zu 25 % des Eigenbeitrags, maximal 300 €
                pro Kind und Jahr. Eine Mindestsparleistung von 120 € pro Jahr ist Voraussetzung für die Förderung.
              </p>
              <p>
                Die monatliche Auszahlung wird vereinfacht als gleichmäßige Entnahme des angesparten Kapitals bis zum Alter von
                85 Jahren berechnet. In der Praxis können Auszahlungsmodelle (z. B. Teilverrentung, flexible Entnahme oder
                lebenslange Rente) die tatsächlichen monatlichen Beträge erheblich beeinflussen.
              </p>
              <p>
                Der Vergleich mit einem ungeförderten Depot und einem Sparkonto dient ausschließlich der Veranschaulichung.
                Das Sparkonto wird mit einer pauschalen Verzinsung von 2 % p.a. simuliert. Inflation, Steuern auf Erträge und
                individuelle Kosten sind in keiner der Varianten berücksichtigt.
              </p>
              <p>
                Kapitalanlagen bergen Risiken, einschließlich des möglichen Verlusts des eingesetzten Kapitals.
                Frühere Wertentwicklungen sind kein verlässlicher Indikator für künftige Ergebnisse.
                Diese Simulation stellt keine Anlageberatung, Steuerberatung oder Rechtsberatung dar.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AltersvorsorgedepotRechner;
