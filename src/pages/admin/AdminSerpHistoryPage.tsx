import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Minus, History } from "lucide-react";

/**
 * SERP-Historie für „altersvorsorge" (Semrush DE).
 * Manueller Snapshot-Datensatz, bis die automatische Anbindung steht.
 * Reihenfolge: chronologisch, ältester Snapshot zuerst.
 */
const KEYWORD = "altersvorsorge";

interface Snapshot {
  date: string; // ISO
  label: string; // kurze Anzeige
  /** Position pro Domain (1–10), null = nicht in Top-10. */
  positions: Record<string, number | null>;
}

const DOMAINS = [
  "de.wikipedia.org",
  "deutsche-rentenversicherung.de",
  "finanztip.de",
  "verbraucherzentrale.de",
  "bundesfinanzministerium.de",
  "stiftung-warentest.de",
  "allianz.de",
  "ing.de",
  "finanzfluss.de",
  "youtube.com",
] as const;

type Domain = (typeof DOMAINS)[number];

const SNAPSHOTS: Snapshot[] = [
  {
    date: "2025-12-01",
    label: "Dez 25",
    positions: {
      "de.wikipedia.org": 1,
      "deutsche-rentenversicherung.de": 2,
      "finanztip.de": 4,
      "verbraucherzentrale.de": 5,
      "bundesfinanzministerium.de": 3,
      "stiftung-warentest.de": 6,
      "allianz.de": 7,
      "ing.de": 9,
      "finanzfluss.de": 8,
      "youtube.com": null,
    },
  },
  {
    date: "2026-01-01",
    label: "Jan 26",
    positions: {
      "de.wikipedia.org": 1,
      "deutsche-rentenversicherung.de": 2,
      "finanztip.de": 3,
      "verbraucherzentrale.de": 5,
      "bundesfinanzministerium.de": 4,
      "stiftung-warentest.de": 6,
      "allianz.de": 8,
      "ing.de": 9,
      "finanzfluss.de": 7,
      "youtube.com": null,
    },
  },
  {
    date: "2026-02-01",
    label: "Feb 26",
    positions: {
      "de.wikipedia.org": 1,
      "deutsche-rentenversicherung.de": 2,
      "finanztip.de": 3,
      "verbraucherzentrale.de": 4,
      "bundesfinanzministerium.de": 5,
      "stiftung-warentest.de": 6,
      "allianz.de": 7,
      "ing.de": 8,
      "finanzfluss.de": 9,
      "youtube.com": 10,
    },
  },
  {
    date: "2026-03-01",
    label: "Mär 26",
    positions: {
      "de.wikipedia.org": 1,
      "deutsche-rentenversicherung.de": 3,
      "finanztip.de": 2,
      "verbraucherzentrale.de": 4,
      "bundesfinanzministerium.de": 5,
      "stiftung-warentest.de": 6,
      "allianz.de": 8,
      "ing.de": 7,
      "finanzfluss.de": 9,
      "youtube.com": 10,
    },
  },
  {
    date: "2026-04-01",
    label: "Apr 26",
    positions: {
      "de.wikipedia.org": 1,
      "deutsche-rentenversicherung.de": 2,
      "finanztip.de": 3,
      "verbraucherzentrale.de": 4,
      "bundesfinanzministerium.de": 5,
      "stiftung-warentest.de": 6,
      "allianz.de": 7,
      "ing.de": 8,
      "finanzfluss.de": 9,
      "youtube.com": 10,
    },
  },
  {
    date: "2026-05-01",
    label: "Mai 26",
    positions: {
      "de.wikipedia.org": 1,
      "deutsche-rentenversicherung.de": 2,
      "finanztip.de": 3,
      "verbraucherzentrale.de": 4,
      "bundesfinanzministerium.de": 5,
      "stiftung-warentest.de": 6,
      "allianz.de": 7,
      "ing.de": 8,
      "finanzfluss.de": 9,
      "youtube.com": 10,
    },
  },
];

/** Wiederverwendbare HSL-Tokens (alle aus design system). */
const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary-foreground))",
  "hsl(var(--accent))",
  "hsl(var(--muted-foreground))",
  "hsl(var(--disclaimer-foreground))",
  "hsl(var(--embed))",
  "hsl(var(--primary) / 0.6)",
  "hsl(var(--secondary-foreground) / 0.6)",
  "hsl(var(--accent) / 0.6)",
  "hsl(var(--muted-foreground) / 0.6)",
];

function trendFor(domain: Domain): { delta: number | null; from: number | null; to: number | null } {
  const first = SNAPSHOTS[0]?.positions[domain] ?? null;
  const last = SNAPSHOTS[SNAPSHOTS.length - 1]?.positions[domain] ?? null;
  if (first == null || last == null) return { delta: null, from: first, to: last };
  return { delta: first - last, from: first, to: last }; // positiv = verbessert (Position kleiner)
}

const AdminSerpHistoryPage = () => {
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const chartData = useMemo(
    () =>
      SNAPSHOTS.map((s) => {
        const row: Record<string, string | number | null> = { label: s.label };
        for (const d of DOMAINS) row[d] = s.positions[d] ?? null;
        return row;
      }),
    []
  );

  const latest = SNAPSHOTS[SNAPSHOTS.length - 1];

  const toggle = (d: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });
  };

  return (
    <AdminLayout title="SERP-Historie">
      <p className="text-sm text-muted-foreground mb-6">
        Positionsverlauf der Top-10-Domains für „{KEYWORD}" (Semrush DE). Snapshots monatlich. Niedrigere Position = besser.
      </p>

      <Card className="p-4 sm:p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <History className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Positionsverlauf (Top 10)</h2>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis
                reversed
                domain={[1, 10]}
                ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v: number | null) => (v == null ? "—" : `#${v}`)}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {DOMAINS.map((d, i) =>
                hidden.has(d) ? null : (
                  <Line
                    key={d}
                    type="monotone"
                    dataKey={d}
                    stroke={COLORS[i % COLORS.length]}
                    strokeWidth={d === "finanztip.de" ? 2.5 : 1.5}
                    dot={{ r: 2.5 }}
                    activeDot={{ r: 4 }}
                    connectNulls={false}
                    isAnimationActive={false}
                  />
                )
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">
          Klick auf eine Domain in der Legende blendet sie aus.
        </p>
      </Card>

      <Card className="p-4 sm:p-6">
        <h2 className="text-sm font-semibold mb-3">Aktueller Stand &amp; Trend ({latest.label})</h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="px-4 sm:px-2 py-2 font-medium">Domain</th>
                <th className="px-2 py-2 font-medium tabular-nums">Aktuell</th>
                <th className="px-2 py-2 font-medium tabular-nums">Vorher</th>
                <th className="px-2 py-2 font-medium">Trend (6 Mon.)</th>
                <th className="px-4 sm:px-2 py-2 font-medium">Sichtbar</th>
              </tr>
            </thead>
            <tbody>
              {DOMAINS.map((d, i) => {
                const t = trendFor(d);
                const TrendIcon = t.delta == null ? Minus : t.delta > 0 ? TrendingUp : t.delta < 0 ? TrendingDown : Minus;
                const trendTone =
                  t.delta == null
                    ? "text-muted-foreground"
                    : t.delta > 0
                      ? "text-primary"
                      : t.delta < 0
                        ? "text-disclaimer-foreground"
                        : "text-muted-foreground";
                const isHidden = hidden.has(d);
                return (
                  <tr key={d} className="border-b border-border last:border-0">
                    <td className="px-4 sm:px-2 py-2">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
                          style={{ background: COLORS[i % COLORS.length] }}
                        />
                        <span className="truncate">{d}</span>
                      </span>
                    </td>
                    <td className="px-2 py-2 tabular-nums">
                      {t.to == null ? <span className="text-muted-foreground">—</span> : `#${t.to}`}
                    </td>
                    <td className="px-2 py-2 tabular-nums text-muted-foreground">
                      {t.from == null ? "—" : `#${t.from}`}
                    </td>
                    <td className="px-2 py-2">
                      <span className={`inline-flex items-center gap-1 ${trendTone}`}>
                        <TrendIcon className="w-3.5 h-3.5" />
                        {t.delta == null ? "neu/raus" : t.delta === 0 ? "stabil" : `${t.delta > 0 ? "+" : ""}${t.delta} Pos.`}
                      </span>
                    </td>
                    <td className="px-4 sm:px-2 py-2">
                      <button
                        onClick={() => toggle(d)}
                        className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
                      >
                        {isHidden ? "einblenden" : "ausblenden"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6">
        <Badge variant="secondary" className="text-[11px]">
          Quelle: manuelle Semrush-Snapshots · {SNAPSHOTS.length} Datenpunkte · Stand {latest.label}
        </Badge>
      </div>
    </AdminLayout>
  );
};

export default AdminSerpHistoryPage;
