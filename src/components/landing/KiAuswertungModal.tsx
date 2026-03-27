import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Loader2, Check, TrendingDown, PiggyBank, Target, Clock } from "lucide-react";


import { MAX_GRUNDZULAGE, KINDERZULAGE_PRO_KIND } from "@/lib/foerderung";
import { supabase } from "@/integrations/supabase/client";

const fmt = (v: number) => v.toLocaleString("de-DE", { maximumFractionDigits: 0 });
const fmtEur = (v: number) => `${fmt(v)} €`;

interface KiAuswertungModalProps {
  open: boolean;
  onClose: () => void;
  data: {
    birth_year: number;
    monthly_contribution: number;
    monthly_payout: number;
    total_capital: number;
    subsidies: number;
    tax_benefits: number;
    retirement_age: number;
    return_assumption: number;
    children: number;
    income_bracket: string;
  };
}

/* ── Typewriter hook ── */
function useTypewriter(text: string, speed = 20) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);

  useEffect(() => {
    setDisplayed("");
    idx.current = 0;
    if (!text) return;
    const timer = setInterval(() => {
      idx.current++;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return displayed;
}

/* ── Metric card ── */
const MetricCard = ({
  icon: Icon,
  label,
  value,
  bgClass,
  textClass,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  bgClass: string;
  textClass: string;
}) => (
  <div className={`rounded-2xl p-5 ${bgClass}`}>
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${textClass}`} />
      <span className={`text-xs font-medium ${textClass}`}>{label}</span>
    </div>
    <p className={`text-xl font-bold tabular-nums ${textClass}`}>{value}</p>
  </div>
);

/* ── Product card ── */
const ProductCard = ({
  emoji,
  title,
  description,
  subtitle,
  badge,
  badgeClass,
}: {
  emoji: string;
  title: string;
  description: string;
  subtitle?: string;
  badge: string;
  badgeClass: string;
}) => (
  <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-background hover:border-primary/40 transition-colors">
    <span className="text-2xl">{emoji}</span>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <p className="text-sm font-semibold">{title}</p>
        {badge && <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>{badge}</span>}
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
      {subtitle && <p className="text-[10px] text-muted-foreground/60 mt-1 italic">{subtitle}</p>}
    </div>
  </div>
);

export default function KiAuswertungModal({ open, onClose, data }: KiAuswertungModalProps) {
  const [loading, setLoading] = useState(false);
  const [analyse, setAnalyse] = useState("");
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const typewriterText = useTypewriter(analyse);

  // Derived metrics
  const currentAge = new Date().getFullYear() - data.birth_year;
  const yearsToRetirement = Math.max(data.retirement_age - currentAge, 0);
  const estimatedRente = data.monthly_contribution * 0.4;
  const monthlyGap = Math.max(data.monthly_payout - estimatedRente, 0);
  const recommendedRate = Math.round((data.monthly_contribution * 1.6) / 10) * 10;
  const targetCapital = monthlyGap * 12 * 25;

  // Fetch AI analysis when modal opens
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setAnalyse("");
    setError("");

    supabase.functions
      .invoke("ki-auswertung", { body: data })
      .then(({ data: response, error }) => {
        if (error) throw error;
        if (response?.error) throw new Error(response.error);
        setAnalyse(response?.analyse ?? "");
      })
      .catch((err: any) => {
        const msg = err?.message ?? "";
        if (msg === "Rate limit exceeded. Try again later." || msg.includes("429")) {
          setError("Zu viele Anfragen — bitte warte einen Moment und versuche es erneut.");
        } else if (msg === "API key not configured" || msg === "AI service error") {
          setError("Der KI-Dienst ist vorübergehend nicht verfügbar. Bitte versuche es später erneut.");
        } else {
          setError("Analyse konnte nicht geladen werden. Bitte versuche es erneut.");
        }
      })
      .finally(() => setLoading(false));
  }, [open, data]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[5vh] sm:pt-[10vh] overflow-y-auto"
          onClick={onClose}
        >
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            ref={scrollRef}
            className="relative z-10 w-full max-w-lg bg-background rounded-[20px] shadow-2xl border border-border overflow-hidden mb-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <Sparkles className="w-3 h-3" /> KI-Analyse
                </span>
                <h2 className="text-lg font-bold tracking-tight">Deine persönliche Auswertung</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 pb-6 space-y-6">
              {/* Loading state */}
              {loading && (
                <div className="flex items-center gap-3 py-8 justify-center">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Analysiere deine Situation...</span>
                </div>
              )}

              {/* Error state */}
              {error && !loading && (
                <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* AI text box */}
              {analyse && !loading && (
                <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-sm leading-relaxed text-foreground">{typewriterText}</p>
                </div>
              )}

              {/* 4 Metric cards */}
              {!loading && (
                <div className="grid grid-cols-2 gap-3">
                  <MetricCard
                    icon={TrendingDown}
                    label="Monatliche Lücke"
                    value={fmtEur(Math.round(monthlyGap))}
                    bgClass="bg-red-50 dark:bg-red-950/30"
                    textClass="text-red-600 dark:text-red-400"
                  />
                  <MetricCard
                    icon={PiggyBank}
                    label="Empf. Sparrate"
                    value={fmtEur(recommendedRate)}
                    bgClass="bg-amber-50 dark:bg-amber-950/30"
                    textClass="text-amber-600 dark:text-amber-400"
                  />
                  <MetricCard
                    icon={Target}
                    label="Ziel-Kapital"
                    value={fmtEur(Math.round(targetCapital))}
                    bgClass="bg-emerald-50 dark:bg-emerald-950/30"
                    textClass="text-emerald-600 dark:text-emerald-400"
                  />
                  <MetricCard
                    icon={Clock}
                    label="Jahre bis Rente"
                    value={`${yearsToRetirement} Jahre`}
                    bgClass="bg-blue-50 dark:bg-blue-950/30"
                    textClass="text-blue-600 dark:text-blue-400"
                  />
                </div>
              )}

              {/* Product recommendations */}
              {!loading && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold mb-3">Passende Strategien</p>
                  <ProductCard
                    emoji="📈"
                    title="ETF-Sparplan (Weltportfolio)"
                    description="Flexibel, kostengünstig, langfristig stark"
                    badge="Empfohlen"
                    badgeClass="bg-primary/10 text-primary"
                  />
                  <ProductCard
                    emoji="🏛️"
                    title="Altersvorsorgedepot (2027)"
                    description={`Bis zu ${MAX_GRUNDZULAGE} € Grundzulage + ${KINDERZULAGE_PRO_KIND} € je Kind/Jahr`}
                    subtitle="Beschlossenes Gesetz, 27. März 2026."
                    badge="Ab 2027"
                    badgeClass="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  />
                  <ProductCard
                    emoji="🏢"
                    title="Betriebliche Altersvorsorge"
                    description="Steuerersparnis durch Entgeltumwandlung"
                    badge=""
                    badgeClass=""
                  />
                </div>
              )}

              {/* Disclaimer */}
              {!loading && (
                <p className="text-[11px] text-muted-foreground/50 leading-relaxed">
                  Diese KI-Auswertung dient ausschließlich der allgemeinen Information und stellt keine individuelle
                  Finanz- oder Anlageberatung dar. Bitte konsultiere bei konkreten Entscheidungen einen zugelassenen
                  Finanzberater.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
