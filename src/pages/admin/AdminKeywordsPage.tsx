import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TrendingUp, HelpCircle, Target, Search } from "lucide-react";

/**
 * Snapshot von Semrush DE-Daten. Manuell aktualisieren bei neuer Recherche.
 */
const SNAPSHOT_DATE = "14. Mai 2026";

type Intent = "broad" | "transactional" | "comparison" | "question" | "branded";

interface Kw {
  term: string;
  volume: number; // Monatliches Suchvolumen (DE)
  kd: number; // Keyword Difficulty 0–100
  intent: Intent;
  /** Bereits abgedeckt durch interne Seite (Pfad). */
  covered?: string;
  /** Empfohlene Ziel-URL, falls nicht abgedeckt. */
  suggested?: string;
}

const KEYWORDS: Kw[] = [
  // Hochvolumige Top-of-Funnel
  { term: "riester rente", volume: 27100, kd: 31, intent: "broad", covered: "/altersvorsorgedepot-vs-riester" },
  { term: "altersvorsorge", volume: 18100, kd: 46, intent: "broad", covered: "/" },
  { term: "private altersvorsorge", volume: 6600, kd: 56, intent: "broad", suggested: "/blog/altersvorsorgedepot-2027" },
  { term: "altersvorsorgedepot", volume: 3600, kd: 23, intent: "broad", covered: "/altersvorsorgedepot" },
  { term: "riester rente auszahlung", volume: 3600, kd: 30, intent: "broad", suggested: "/altersvorsorgedepot-auszahlung" },
  { term: "rürup", volume: 1900, kd: 49, intent: "broad", covered: "/blog/ruerup-rente" },
  { term: "vorsorgeaufwendungen", volume: 1000, kd: 24, intent: "broad", suggested: "/blog/steuern-sparen-altersvorsorge" },

  // Förder- / Zulagen-Keywords
  { term: "riester zulage", volume: 2400, kd: 34, intent: "transactional", covered: "/" },
  { term: "altersvorsorgezulage", volume: 2400, kd: 28, intent: "transactional", suggested: "/altersvorsorgedepot-foerderung" },
  { term: "kinderzulage riester", volume: 1900, kd: 22, intent: "transactional", suggested: "/altersvorsorgedepot-foerderung" },
  { term: "altersvorsorge staatlich gefördert", volume: 170, kd: 39, intent: "transactional", covered: "/altersvorsorgedepot-foerderung" },

  // Vergleichs-Keywords (kommerziell wertvoll)
  { term: "altersvorsorgedepot vs etf", volume: 90, kd: 18, intent: "comparison", covered: "/altersvorsorgedepot-vs-etf-sparplan" },
  { term: "altersvorsorgedepot vs riester", volume: 50, kd: 20, intent: "comparison", covered: "/altersvorsorgedepot-vs-riester" },
  { term: "rentenreform 2026", volume: 1900, kd: 26, intent: "comparison", covered: "/blog/altersvorsorgedepot-beschlossen" },
  { term: "frühstartrente", volume: 1900, kd: 38, intent: "comparison", suggested: "/blog/altersvorsorgedepot-2027" },

  // High-Intent Fragen (niedriges Volumen, hohe Conversion)
  { term: "wann wird die riester zulage gutgeschrieben", volume: 90, kd: 12, intent: "question", suggested: "/blog/riester-kuendigen" },
  { term: "wie hoch ist die riester zulage", volume: 30, kd: 15, intent: "question", suggested: "/altersvorsorgedepot-foerderung" },
  { term: "wer bekommt riester zulage", volume: 20, kd: 14, intent: "question", suggested: "/altersvorsorgedepot-foerderung" },
  { term: "wie funktioniert die riester zulage", volume: 20, kd: 13, intent: "question", suggested: "/blog/riester-kuendigen" },
  { term: "wie beantrage ich riester zulage", volume: 20, kd: 16, intent: "question", suggested: "/blog/riester-kuendigen" },
  { term: "welches gesetz regelt die staatliche förderung von privater altersvorsorge", volume: 20, kd: 11, intent: "question", covered: "/altersvorsorgedepot-gesetz" },
  { term: "wie heißt die staatlich geförderte private altersvorsorge", volume: 10, kd: 10, intent: "question", covered: "/altersvorsorgedepot" },
  { term: "was sind vorsorgeaufwendungen", volume: 480, kd: 18, intent: "question", suggested: "/blog/steuern-sparen-altersvorsorge" },
];

const INTENT_META: Record<Intent, { label: string; tone: string }> = {
  broad: { label: "Breit", tone: "bg-secondary text-foreground" },
  transactional: { label: "Förderung", tone: "bg-primary text-primary-foreground" },
  comparison: { label: "Vergleich", tone: "bg-disclaimer text-disclaimer-foreground" },
  question: { label: "Frage", tone: "bg-secondary text-foreground" },
  branded: { label: "Marke", tone: "bg-secondary text-foreground" },
};

function volumeBand(v: number): "xl" | "l" | "m" | "s" {
  if (v >= 5000) return "xl";
  if (v >= 1000) return "l";
  if (v >= 100) return "m";
  return "s";
}

function priorityScore(k: Kw): number {
  // Einfache Heuristik: Volumen / (KD + 10) * Intent-Gewicht
  const intentWeight = { transactional: 1.5, comparison: 1.4, question: 1.2, broad: 1.0, branded: 0.8 }[k.intent];
  return (k.volume / (k.kd + 10)) * intentWeight;
}

const AdminKeywordsPage = () => {
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return q ? KEYWORDS.filter((k) => k.term.includes(q)) : KEYWORDS;
  }, [filter]);

  const groups = useMemo(() => {
    const highVolume = filtered
      .filter((k) => k.volume >= 1000)
      .sort((a, b) => b.volume - a.volume);
    const subsidy = filtered
      .filter((k) => k.intent === "transactional" || k.intent === "comparison")
      .sort((a, b) => b.volume - a.volume);
    const questions = filtered
      .filter((k) => k.intent === "question")
      .sort((a, b) => b.volume - a.volume);
    const opportunities = [...filtered]
      .sort((a, b) => priorityScore(b) - priorityScore(a))
      .slice(0, 8);
    return { highVolume, subsidy, questions, opportunities };
  }, [filtered]);

  const totalVolume = filtered.reduce((s, k) => s + k.volume, 0);
  const coveredCount = filtered.filter((k) => k.covered).length;

  return (
    <AdminLayout title="Keyword-Chancen">
      <p className="text-sm text-muted-foreground mb-6">
        Snapshot der wichtigsten Keywords (Semrush DE). Stand: {SNAPSHOT_DATE}. Gruppiert nach Volumen und Suchintention,
        priorisiert nach Volumen-zu-Schwierigkeit-Verhältnis.
      </p>

      {/* KPI-Zeile */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Keywords</p>
          <p className="text-2xl font-bold tabular-nums">{filtered.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Volumen / Monat</p>
          <p className="text-2xl font-bold tabular-nums">{totalVolume.toLocaleString("de-DE")}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Bereits abgedeckt</p>
          <p className="text-2xl font-bold tabular-nums">{coveredCount} / {filtered.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Lücken</p>
          <p className="text-2xl font-bold tabular-nums">{filtered.length - coveredCount}</p>
        </Card>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Keyword filtern…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="space-y-6">
        <KeywordGroup
          icon={<Target className="w-4 h-4 text-primary" />}
          title="Top-Chancen (priorisiert)"
          subtitle="Bestes Volumen-zu-Schwierigkeit-Verhältnis, nach Intent gewichtet"
          items={groups.opportunities}
          showPriority
        />
        <KeywordGroup
          icon={<TrendingUp className="w-4 h-4 text-primary" />}
          title="Hochvolumige Keywords (≥ 1.000 / Monat)"
          subtitle="Top-of-Funnel — Reichweite und Markenpräsenz"
          items={groups.highVolume}
        />
        <KeywordGroup
          icon={<Target className="w-4 h-4 text-primary" />}
          title="Förderung & Vergleiche"
          subtitle="Kommerziell wertvolle Keywords nahe an der Conversion"
          items={groups.subsidy}
        />
        <KeywordGroup
          icon={<HelpCircle className="w-4 h-4 text-primary" />}
          title="High-Intent Fragen"
          subtitle="Niedriges Volumen, hohe Conversion — ideal für FAQ-Blöcke"
          items={groups.questions}
        />
      </div>

      <p className="text-xs text-muted-foreground mt-8">
        Quelle: Semrush, Datenbank DE. Keine Echtzeit-Daten — manuelle Aktualisierung nötig.
      </p>
    </AdminLayout>
  );
};

interface GroupProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: Kw[];
  showPriority?: boolean;
}

const KeywordGroup = ({ icon, title, subtitle, items, showPriority }: GroupProps) => {
  if (items.length === 0) return null;
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold inline-flex items-center gap-2">
          {icon} {title}
          <span className="text-xs font-normal text-muted-foreground">({items.length})</span>
        </h2>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </div>

      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="text-xs text-muted-foreground">
              <th className="text-left py-2 px-2 font-medium">Keyword</th>
              <th className="text-right py-2 px-2 font-medium">Volumen</th>
              <th className="text-right py-2 px-2 font-medium">KD</th>
              <th className="text-left py-2 px-2 font-medium">Intent</th>
              <th className="text-left py-2 px-2 font-medium">Status</th>
              {showPriority && <th className="text-right py-2 px-2 font-medium">Score</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((k) => {
              const meta = INTENT_META[k.intent];
              const band = volumeBand(k.volume);
              return (
                <tr key={k.term} className="border-t border-border/60">
                  <td className="py-2.5 px-2 align-top">
                    <span className="font-medium break-words">{k.term}</span>
                  </td>
                  <td className="py-2.5 px-2 text-right tabular-nums align-top">
                    <span className={band === "xl" || band === "l" ? "font-semibold" : ""}>
                      {k.volume.toLocaleString("de-DE")}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-right tabular-nums align-top">
                    <span className={k.kd <= 25 ? "text-primary font-semibold" : "text-muted-foreground"}>
                      {k.kd}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 align-top">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${meta.tone}`}>{meta.label}</span>
                  </td>
                  <td className="py-2.5 px-2 align-top">
                    {k.covered ? (
                      <a href={k.covered} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                        ✓ {k.covered}
                      </a>
                    ) : k.suggested ? (
                      <span className="text-xs text-muted-foreground">
                        Lücke → <a href={k.suggested} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{k.suggested}</a>
                      </span>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">Lücke</Badge>
                    )}
                  </td>
                  {showPriority && (
                    <td className="py-2.5 px-2 text-right tabular-nums align-top text-xs text-muted-foreground">
                      {Math.round(priorityScore(k))}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AdminKeywordsPage;
