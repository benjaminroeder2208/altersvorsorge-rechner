import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

/* ─────────────── helpers ─────────────── */

const fmt = (v: number) =>
  v.toLocaleString("de-DE", { maximumFractionDigits: 0 });

const fmtEur = (v: number) => `${fmt(v)} €`;

const CURRENT_YEAR = new Date().getFullYear();

/* ─────────────── types ─────────────── */

interface Inputs {
  monthlyContribution: number;
  incomeBand: number; // 0-3
  birthYear: number;
  children: number;
  retirementAge: number;
  returnRate: number; // 0.05, 0.075, 0.09
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

/* ─────────────── calculation engine ─────────────── */

function calculate(inputs: Inputs) {
  const { monthlyContribution, incomeBand, birthYear, children, retirementAge, returnRate, lumpSumRate } = inputs;

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

  // Berufseinsteigerbonus
  const berufseinsteiger = currentAge < 25;

  const annualFunding = grundzulage + totalKinderzulage + taxBenefit;

  // Growth data
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

  // Payout
  const payoutYears = Math.max(85 - retirementAge, 1);
  const lumpSum = capitalWithFunding * lumpSumRate;
  const remainingCapital = capitalWithFunding - lumpSum;
  const monthlyPayout = remainingCapital / (payoutYears * 12);

  const monthlyPayoutWithout = capitalWithout / (payoutYears * 12);
  const monthlyPayoutSavings = capitalSavings / (payoutYears * 12);

  return {
    annualOwn,
    grundzulage,
    totalKinderzulage,
    taxBenefit,
    annualFunding,
    berufseinsteiger,
    capitalWithFunding,
    capitalWithout,
    capitalSavings,
    monthlyPayout,
    monthlyPayoutWithout,
    monthlyPayoutSavings,
    lumpSum,
    yearsToRetirement,
    currentAge,
    growthData,
    totalContributions,
    totalFunding,
    payoutYears,
  };
}

/* ─────────────── sub-components ─────────────── */

const SliderInput = ({
  label,
  value,
  min,
  max,
  step = 1,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <span className="text-sm text-neutral-400">{label}</span>
      <span className="text-lg font-semibold text-white tabular-nums">{format(value)}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-teal-400 h-1.5 bg-neutral-700 rounded-full appearance-none cursor-pointer
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-400
        [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(45,212,191,0.4)]
        [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-shadow
        [&::-webkit-slider-thumb]:hover:shadow-[0_0_16px_rgba(45,212,191,0.6)]"
    />
  </div>
);

const SegmentedControl = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: number }[];
  value: number;
  onChange: (v: number) => void;
}) => (
  <div className="space-y-3">
    <span className="text-sm text-neutral-400">{label}</span>
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-2 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
            value === o.value
              ? "bg-teal-400/15 text-teal-400 ring-1 ring-teal-400/30"
              : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  </div>
);

const Stepper = ({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) => (
  <div className="space-y-3">
    <span className="text-sm text-neutral-400">{label}</span>
    <div className="flex items-center gap-4">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-10 h-10 rounded-xl bg-neutral-800 text-neutral-300 font-bold text-lg flex items-center justify-center hover:bg-neutral-700 transition-colors disabled:opacity-30"
        disabled={value <= min}
      >
        −
      </button>
      <span className="text-2xl font-semibold text-white tabular-nums min-w-[2ch] text-center">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-10 h-10 rounded-xl bg-neutral-800 text-neutral-300 font-bold text-lg flex items-center justify-center hover:bg-neutral-700 transition-colors disabled:opacity-30"
        disabled={value >= max}
      >
        +
      </button>
    </div>
  </div>
);

const StatRow = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-neutral-400">{label}</span>
    <span className={`text-sm font-semibold tabular-nums ${accent ? "text-teal-400" : "text-white"}`}>{value}</span>
  </div>
);

const ComparisonCard = ({
  title,
  capital,
  monthly,
  highlight,
}: {
  title: string;
  capital: number;
  monthly: number;
  highlight?: boolean;
}) => (
  <div
    className={`rounded-2xl p-6 ${
      highlight ? "bg-teal-400/10 ring-1 ring-teal-400/20" : "bg-neutral-800/60"
    }`}
  >
    <p className={`text-sm font-medium mb-4 ${highlight ? "text-teal-400" : "text-neutral-400"}`}>{title}</p>
    <p className="text-2xl font-bold text-white tabular-nums mb-1">{fmtEur(capital)}</p>
    <p className="text-xs text-neutral-500">Kapital zum Rentenbeginn</p>
    <div className="mt-4 pt-4 border-t border-neutral-700/50">
      <p className="text-lg font-semibold text-white tabular-nums">{fmtEur(monthly)} / Monat</p>
      <p className="text-xs text-neutral-500">Auszahlung bis 85</p>
    </div>
  </div>
);

/* custom chart tooltip */
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 shadow-xl">
      <p className="text-xs text-neutral-400 mb-2">Alter {label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs mb-1">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-neutral-300">{p.name}:</span>
          <span className="font-semibold text-white tabular-nums">{fmtEur(p.value)}</span>
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

  const [showDetails, setShowDetails] = useState(false);

  const set = useCallback(
    <K extends keyof Inputs>(key: K, value: Inputs[K]) =>
      setInputs((prev) => ({ ...prev, [key]: value })),
    []
  );

  const r = useMemo(() => calculate(inputs), [inputs]);

  const miniBarData = [
    { name: "Ohne Förderung", value: r.annualOwn, fill: "#525252" },
    { name: "Mit Förderung", value: r.annualOwn + r.annualFunding, fill: "#2dd4bf" },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
            Altersvorsorgedepot-Rechner
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-base">
            Simulieren Sie, wie sich ein Altersvorsorgedepot nach dem aktuellen Gesetzentwurf entwickeln könnte.
          </p>
        </motion.div>

        {/* ── main grid ── */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT – inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-neutral-800 p-6 md:p-8 space-y-7"
          >
            <SliderInput
              label="Monatlicher Eigenbeitrag"
              value={inputs.monthlyContribution}
              min={10}
              max={570}
              step={10}
              format={(v) => fmtEur(v)}
              onChange={(v) => set("monthlyContribution", v)}
            />

            <SegmentedControl
              label="Bruttojahreseinkommen"
              options={INCOME_BANDS.map((b, i) => ({ label: b.label, value: i }))}
              value={inputs.incomeBand}
              onChange={(v) => set("incomeBand", v)}
            />

            <SliderInput
              label="Geburtsjahr"
              value={inputs.birthYear}
              min={1960}
              max={2005}
              format={(v) => String(v)}
              onChange={(v) => set("birthYear", v)}
            />

            <Stepper
              label="Kinder"
              value={inputs.children}
              min={0}
              max={6}
              onChange={(v) => set("children", v)}
            />

            <SliderInput
              label="Rentenbeginn"
              value={inputs.retirementAge}
              min={65}
              max={70}
              format={(v) => `${v} Jahre`}
              onChange={(v) => set("retirementAge", v)}
            />

            <SegmentedControl
              label="Erwartete Nettorendite p.a."
              options={RETURN_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
              value={inputs.returnRate}
              onChange={(v) => set("returnRate", v)}
            />

            {r.annualOwn > 1800 && (
              <div className="flex items-start gap-2 text-xs text-amber-400/80 bg-amber-400/5 rounded-xl p-3">
                <Info className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Für Förderung und Steuerdarstellung werden max. 1.800 € jährlicher Eigenbeitrag berücksichtigt.</span>
              </div>
            )}
          </motion.div>

          {/* RIGHT – results summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-neutral-800 p-6 md:p-8 flex flex-col"
          >
            <p className="text-sm text-neutral-400 mb-2">Staatliche Förderung für Ihr Depot</p>
            <p className="text-4xl md:text-5xl font-bold text-teal-400 tabular-nums mb-6">
              {fmtEur(r.annualFunding)}
              <span className="text-lg font-normal text-neutral-500 ml-2">/ Jahr</span>
            </p>

            <div className="space-y-0.5 mb-6">
              <StatRow label="Eigenbeitrag / Jahr" value={fmtEur(r.annualOwn)} />
              <StatRow label="Grundzulage" value={fmtEur(r.grundzulage)} accent />
              <StatRow label="Kinderzulage" value={fmtEur(r.totalKinderzulage)} accent />
              <StatRow label="Geschätzter Steuervorteil" value={`≈ ${fmtEur(r.taxBenefit)}`} accent />
              {r.berufseinsteiger && (
                <StatRow label="Berufseinsteigerbonus (einmalig)" value="200 €" accent />
              )}
            </div>

            {/* mini bar chart */}
            <div className="flex-1 min-h-[140px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={miniBarData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#a3a3a3", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#a3a3a3", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${fmt(v)} €`} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {miniBarData.map((entry, i) => (
                      <Bar key={i} dataKey="value" fill={entry.fill as string} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* capital preview */}
            <div className="bg-neutral-800/50 rounded-2xl p-5 mb-4">
              <p className="text-sm text-neutral-400 mb-1">Mögliches Kapital mit {r.yearsToRetirement} Jahren Ansparzeit</p>
              <p className="text-3xl font-bold text-white tabular-nums">{fmtEur(r.capitalWithFunding)}</p>
            </div>

            <button
              onClick={() => setShowDetails(true)}
              className="w-full py-4 rounded-2xl bg-teal-400 text-neutral-900 font-semibold text-sm transition-all duration-200 hover:bg-teal-300 hover:shadow-lg hover:shadow-teal-400/20"
            >
              Detaillierte Ergebnisse ansehen
            </button>
          </motion.div>
        </div>

        {/* ── detailed results ── */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mt-8 space-y-6"
            >
              {/* accumulation chart */}
              <div className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-neutral-800 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Ansparen bis {inputs.retirementAge}</p>
                    <p className="text-2xl font-bold text-white">{fmtEur(r.capitalWithFunding)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-400 mb-1">Auszahlen bis 85</p>
                    <p className="text-2xl font-bold text-teal-400 tabular-nums">{fmtEur(r.monthlyPayout)} / Monat</p>
                  </div>
                </div>

                {/* lump sum slider */}
                <div className="mb-8">
                  <SliderInput
                    label="Einmalentnahme zu Rentenbeginn"
                    value={inputs.lumpSumRate}
                    min={0}
                    max={0.3}
                    step={0.05}
                    format={(v) => `${Math.round(v * 100)} %`}
                    onChange={(v) => set("lumpSumRate", v)}
                  />
                  {inputs.lumpSumRate > 0 && (
                    <p className="text-xs text-neutral-500 mt-2">
                      Einmalentnahme: {fmtEur(r.lumpSum)} · Verbleibendes Kapital: {fmtEur(r.capitalWithFunding - r.lumpSum)}
                    </p>
                  )}
                </div>

                {/* growth chart */}
                <div className="h-[320px] md:h-[380px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={r.growthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradEigen" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#737373" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="#737373" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="gradFoerderung" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="gradErtraege" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#818cf8" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="#818cf8" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                      <XAxis
                        dataKey="age"
                        tick={{ fill: "#a3a3a3", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        tick={{ fill: "#a3a3a3", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => v >= 1000 ? `${Math.round(v / 1000)}k` : fmt(v)}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Legend
                        verticalAlign="top"
                        height={36}
                        formatter={(value: string) => <span className="text-xs text-neutral-300">{value}</span>}
                      />
                      <Area
                        type="monotone"
                        dataKey="eigenbeitraege"
                        name="Eigenbeiträge"
                        stackId="1"
                        stroke="#737373"
                        fill="url(#gradEigen)"
                        strokeWidth={0}
                      />
                      <Area
                        type="monotone"
                        dataKey="foerderung"
                        name="Zulagen & Steuervorteile"
                        stackId="1"
                        stroke="#2dd4bf"
                        fill="url(#gradFoerderung)"
                        strokeWidth={0}
                      />
                      <Area
                        type="monotone"
                        dataKey="ertraege"
                        name="Kapitalerträge"
                        stackId="1"
                        stroke="#818cf8"
                        fill="url(#gradErtraege)"
                        strokeWidth={0}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* comparison cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <ComparisonCard
                  title="Altersvorsorgedepot"
                  capital={r.capitalWithFunding}
                  monthly={r.monthlyPayout}
                  highlight
                />
                <ComparisonCard
                  title="Normales Depot"
                  capital={r.capitalWithout}
                  monthly={r.monthlyPayoutWithout}
                />
                <ComparisonCard
                  title="Sparkonto (2 % p.a.)"
                  capital={r.capitalSavings}
                  monthly={r.monthlyPayoutSavings}
                />
              </div>

              {/* advantages */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-neutral-800 p-6">
                  <p className="text-sm text-neutral-400 mb-1">Mehrwert ggü. normalem Depot</p>
                  <p className="text-2xl font-bold text-teal-400 tabular-nums">
                    + {fmtEur(r.capitalWithFunding - r.capitalWithout)}
                  </p>
                </div>
                <div className="bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-neutral-800 p-6">
                  <p className="text-sm text-neutral-400 mb-1">Mehrwert ggü. Sparkonto</p>
                  <p className="text-2xl font-bold text-teal-400 tabular-nums">
                    + {fmtEur(r.capitalWithFunding - r.capitalSavings)}
                  </p>
                </div>
              </div>

              {/* hide details */}
              <div className="text-center">
                <button
                  onClick={() => setShowDetails(false)}
                  className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                  Weniger anzeigen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── disclaimers ── */}
        <div className="mt-10 space-y-2 text-center max-w-2xl mx-auto">
          <p className="text-xs text-neutral-600">
            Diese Simulation basiert auf dem aktuellen Gesetzentwurf und vereinfacht steuerliche sowie produktspezifische Details.
            Sie stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
          </p>
          <p className="text-xs text-neutral-600">
            Kapitalanlagen bergen Risiken. Frühere Wertentwicklungen sind kein verlässlicher Indikator für die Zukunft.
          </p>
          <p className="text-xs text-neutral-600">
            Gesamte jährliche Eigenbeiträge in Altersvorsorgeverträge sind im Entwurf auf 6.840 € begrenzt.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AltersvorsorgedepotRechner;