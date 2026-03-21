import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { ArrowRight, ChevronLeft, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { captureChart, generatePDFBase64 } from "@/utils/generatePDF";
import PageHead from "@/components/seo/PageHead";

/* ─── helpers ─── */
const fmt = (v: number) => v.toLocaleString("de-DE", { maximumFractionDigits: 0 });
const fmtEur = (v: number) => `${fmt(v)} €`;
const CURRENT_YEAR = new Date().getFullYear();

/* ─── URL params ─── */
function useEmbedParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    color: params.get("color") || "#1B4FD8",
    utmSource: params.get("utm_source") || null,
    lang: params.get("lang") || "de",
  };
}

/* ─── types ─── */
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

  const grundzulage = annualOwn >= 120
    ? Math.min(annualOwn, 1200) * 0.35 + Math.min(Math.max(annualOwn - 1200, 0), 600) * 0.20
    : 0;
  const kinderzulagePerChild = annualOwn >= 120 ? Math.min(annualOwn * 0.25, 300) : 0;
  const totalKinderzulage = children * kinderzulagePerChild;
  const berufseinsteiger = currentAge < 25;
  const annualSubsidy = grundzulage + totalKinderzulage;

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
    chartData.push({ age, contributions: totalContributions, subsidies: totalSubsidies, gains, total: Math.round(capital) });
  }

  const payoutYears = Math.max(85 - retirementAge, 1);
  const monthlyPayout = capital / (payoutYears * 12);
  const monthlyPayoutWithout = capitalWithout / (payoutYears * 12);
  const monthlyPayoutSavings = capitalSavings / (payoutYears * 12);

  return {
    totalContributions, totalSubsidies, capitalWithFunding: capital, capitalWithout, capitalSavings,
    monthlyPayout, monthlyPayoutWithout, monthlyPayoutSavings, yearsToRetirement, currentAge, chartData,
  };
}

/* ─── animated number ─── */
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

/* ─── chart tooltip ─── */
const StackedTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload as ChartDataPoint | undefined;
  if (!point) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg text-xs min-w-[180px]">
      <p className="text-gray-500 mb-2 font-medium">Alter {label}</p>
      {[
        { label: "Eigenbeiträge", value: point.contributions, color: "#9CA3AF" },
        { label: "Zulagen", value: point.subsidies, color: "#1B4FD8" },
        { label: "Kapitalerträge", value: point.gains, color: "#2DD4A8" },
      ].map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: row.color }} />
            <span className="text-gray-500">{row.label}</span>
          </div>
          <span className="font-semibold text-gray-900">{fmtEur(row.value)}</span>
        </div>
      ))}
      <div className="pt-2 mt-1 border-t border-gray-100 flex justify-between">
        <span className="font-semibold text-gray-900">Gesamt</span>
        <span className="font-bold text-gray-900">{fmtEur(point.total)}</span>
      </div>
    </div>
  );
};

/* ─── stepper ─── */
const StepperCard = ({ label, value, min, max, onChange, primaryColor }: {
  label: string; value: number; min: number; max: number;
  onChange: (v: number) => void; primaryColor: string;
}) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
    <span className="text-sm text-gray-600">{label}</span>
    <div className="flex items-center gap-2">
      <button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}
        className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium flex items-center justify-center hover:bg-gray-200 disabled:opacity-20">−</button>
      <span className="text-lg font-bold tabular-nums min-w-[4ch] text-center text-gray-900">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}
        className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium flex items-center justify-center hover:bg-gray-200 disabled:opacity-20">+</button>
    </div>
  </div>
);

/* ─── main ─── */
const EmbedPage = () => {
  const { color: primaryColor, utmSource } = useEmbedParams();
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<Inputs>({
    monthlyContribution: 150, incomeBand: 2, birthYear: 1990, children: 0, retirementAge: 67, returnRate: 0.07,
  });
  const set = useCallback(<K extends keyof Inputs>(key: K, value: Inputs[K]) => setInputs((p) => ({ ...p, [key]: value })), []);
  const r = useMemo(() => calculate(inputs), [inputs]);

  // Email capture
  const [email, setEmail] = useState("");
  const [dsgvoAccepted, setDsgvoAccepted] = useState(false);
  const [dsgvoError, setDsgvoError] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || emailStatus === "sending" || emailStatus === "sent") return;
    if (!dsgvoAccepted) { setDsgvoError(true); return; }
    setEmailStatus("sending");
    try {
      const confirmToken = crypto.randomUUID();
      const chartImg = await captureChart("embed-chart-capture").catch(() => "");
      const pdfBase64 = await generatePDFBase64({
        monthly_contribution: inputs.monthlyContribution,
        total_capital: Math.round(r.capitalWithFunding),
        monthly_payout: Math.round(r.monthlyPayout),
        subsidies: Math.round(r.totalSubsidies),
        capital_without: Math.round(r.capitalWithout),
        payout_without: Math.round(r.monthlyPayoutWithout),
        capital_savings: Math.round(r.capitalSavings),
        payout_savings: Math.round(r.monthlyPayoutSavings),
        retirement_age: inputs.retirementAge,
        birth_year: inputs.birthYear,
        chart_image: chartImg,
      }).catch(() => null);
      const { error } = await supabase.from("simulation_leads").insert({
        email,
        monthly_contribution: inputs.monthlyContribution,
        birth_year: inputs.birthYear,
        children: inputs.children,
        retirement_age: inputs.retirementAge,
        return_assumption: inputs.returnRate * 100,
        calculated_capital: Math.round(r.capitalWithFunding),
        monthly_payout: Math.round(r.monthlyPayout),
        total_subsidies: Math.round(r.totalSubsidies),
        confirmation_token: confirmToken,
        embed_source: utmSource,
        pdf_base64: pdfBase64,
      } as any);
      if (error) throw error;
      supabase.functions.invoke("send-confirmation-email", { body: { email, token: confirmToken } }).catch(() => {});
      setEmailStatus("sent");
    } catch {
      setEmailStatus("error");
      setTimeout(() => setEmailStatus("idle"), 3000);
    }
  };

  const stepVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -15 } };

  return (
    <div className="min-h-screen bg-white" style={{ "--embed-primary": primaryColor } as React.CSSProperties}>
      <PageHead title="Altersvorsorgedepot Rechner" description="" path="/embed" robots="noindex,nofollow" />

      <div className="max-w-[600px] mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: Contribution */}
          {step === 1 && (
            <motion.div key="s1" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ letterSpacing: "-0.01em" }}>
                Wie viel möchten Sie monatlich investieren?
              </h2>
              <p className="text-sm text-gray-500 mb-8">Monatlicher Beitrag für Ihre Altersvorsorge</p>

              <p className="text-5xl font-bold text-gray-900 mb-6" style={{ letterSpacing: "-0.02em" }}>
                <AnimatedNumber value={inputs.monthlyContribution} suffix=" €" />
              </p>

              <div className="max-w-sm mx-auto mb-3">
                <input type="range" min={10} max={600} step={10} value={inputs.monthlyContribution}
                  onChange={(e) => set("monthlyContribution", Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: primaryColor }} />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>10 €</span><span>600 €</span></div>
              </div>

              <button onClick={() => setStep(2)}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-opacity"
                style={{ background: primaryColor }}>
                Weiter <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: Income */}
          {step === 2 && (
            <motion.div key="s2" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="text-center">
              <button onClick={() => setStep(1)} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
                <ChevronLeft className="w-4 h-4" /> Zurück
              </button>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Ihr Bruttojahreseinkommen?</h2>
              <p className="text-sm text-gray-500 mb-8">Beeinflusst die geschätzten steuerlichen Vorteile</p>
              <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                {INCOME_BANDS.map((band, i) => (
                  <button key={i} onClick={() => set("incomeBand", i)}
                    className={`rounded-xl p-4 text-center transition-all border text-sm font-medium ${
                      inputs.incomeBand === i ? "border-2 bg-opacity-5" : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                    }`}
                    style={inputs.incomeBand === i ? { borderColor: primaryColor, color: primaryColor, background: `${primaryColor}0D` } : {}}>
                    {band.label}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(3)}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-opacity"
                style={{ background: primaryColor }}>
                Weiter <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 3: Personal data + results */}
          {step === 3 && (
            <motion.div key="s3" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="text-center">
              <button onClick={() => setStep(2)} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
                <ChevronLeft className="w-4 h-4" /> Zurück
              </button>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Persönliche Angaben</h2>
              <div className="space-y-3 max-w-sm mx-auto mb-8">
                <StepperCard label="Geburtsjahr" value={inputs.birthYear} min={1955} max={CURRENT_YEAR - 18} onChange={(v) => set("birthYear", v)} primaryColor={primaryColor} />
                <StepperCard label="Kinder" value={inputs.children} min={0} max={6} onChange={(v) => set("children", v)} primaryColor={primaryColor} />
                <StepperCard label="Renteneintritt" value={inputs.retirementAge} min={65} max={70} onChange={(v) => set("retirementAge", v)} primaryColor={primaryColor} />
              </div>
              <button onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-opacity"
                style={{ background: primaryColor }}>
                Ergebnis anzeigen <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 4: Results */}
          {step === 4 && (
            <motion.div key="s4" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }} className="text-center">
              <button onClick={() => setStep(3)} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
                <ChevronLeft className="w-4 h-4" /> Angaben ändern
              </button>

              {/* Primary result */}
              <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Kapital zum Rentenbeginn</p>
              <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2" style={{ letterSpacing: "-0.02em" }}>
                <AnimatedNumber value={Math.round(r.capitalWithFunding)} suffix=" €" />
              </p>
              <p className="text-sm text-gray-500 mb-6">bei {fmtEur(inputs.monthlyContribution)} monatlich über {r.yearsToRetirement} Jahre</p>

              <div className="inline-block bg-gray-50 rounded-xl px-6 py-4 mb-6">
                <p className="text-2xl font-bold text-gray-900"><AnimatedNumber value={Math.round(r.monthlyPayout)} suffix=" €" /></p>
                <p className="text-xs text-gray-500 mt-1">monatliche Auszahlung bis 85</p>
              </div>

              {/* Key figures */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Staatliche Förderung</p>
                  <p className="text-lg font-bold" style={{ color: primaryColor }}>{fmtEur(Math.round(r.totalSubsidies))}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Eigenbeiträge gesamt</p>
                  <p className="text-lg font-bold text-gray-900">{fmtEur(Math.round(r.totalContributions))}</p>
                </div>
              </div>

              {/* Mini chart */}
              <div id="embed-chart-capture" className="h-[180px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={r.chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="embedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={primaryColor} stopOpacity={0.2} />
                        <stop offset="100%" stopColor={primaryColor} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="age" tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                    <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)} width={45} />
                    <Tooltip content={<StackedTooltip />} />
                    <Area type="monotone" dataKey="total" stroke={primaryColor} fill="url(#embedGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Email capture */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FileText className="w-4 h-4" style={{ color: primaryColor }} />
                  <h3 className="text-base font-semibold text-gray-900">Deine PDF-Auswertung</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4">Erhalte deine persönliche Auswertung als PDF — kostenlos.</p>

                {emailStatus === "sent" ? (
                  <p className="text-sm font-medium py-2" style={{ color: primaryColor }}>
                    ✓ Bestätigungsmail gesendet — nach Bestätigung erhältst du dein PDF.
                  </p>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <div className="flex gap-2">
                      <input type="email" required placeholder="Deine E-Mail" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2" style={{ focusRingColor: primaryColor } as any} />
                      <button type="submit" disabled={emailStatus === "sending" || !dsgvoAccepted}
                        className="px-4 py-2.5 rounded-lg text-white font-medium text-sm hover:opacity-90 disabled:opacity-50"
                        style={{ background: primaryColor }}>
                        {emailStatus === "sending" ? "..." : "PDF →"}
                      </button>
                    </div>
                    <div className="flex items-start gap-2 text-left">
                      <Checkbox id="dsgvo-embed" checked={dsgvoAccepted}
                        onCheckedChange={(v) => { setDsgvoAccepted(!!v); setDsgvoError(false); }}
                        className={`mt-0.5 ${dsgvoError ? "border-red-500 ring-1 ring-red-500" : ""}`} />
                      <label htmlFor="dsgvo-embed" className="text-[10px] text-gray-500 leading-relaxed cursor-pointer">
                        Ich stimme der Verarbeitung meiner E-Mail gemäß der{" "}
                        <a href="https://altersvorsorge-rechner.com/datenschutz" target="_blank" rel="noopener noreferrer" className="underline">Datenschutzerklärung</a>{" "}zu.
                      </label>
                    </div>
                    {dsgvoError && <p className="text-[10px] text-red-500 text-left">Bitte stimme der Datenschutzerklärung zu.</p>}
                    {emailStatus === "error" && <p className="text-xs text-red-500">Fehler. Bitte erneut versuchen.</p>}
                  </form>
                )}
              </div>

              {/* Restart */}
              <button onClick={() => setStep(1)} className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-4 mb-4">
                Neue Berechnung
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Powered by */}
        <div className="text-center mt-6 pt-4 border-t border-gray-100">
          <a href="https://altersvorsorge-rechner.com?ref=embed" target="_blank" rel="noopener noreferrer"
            className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors">
            Powered by altersvorsorge-rechner.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmbedPage;
