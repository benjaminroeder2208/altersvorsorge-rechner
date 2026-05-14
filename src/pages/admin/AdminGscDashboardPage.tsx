import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
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
import { Loader2, RefreshCw, MousePointerClick, Eye, Percent, Hash } from "lucide-react";

type Row = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };
type Dimension = "date" | "query" | "page" | "device" | "country";

const DIMENSIONS: { id: Dimension; label: string }[] = [
  { id: "date", label: "Zeitverlauf" },
  { id: "query", label: "Suchanfragen" },
  { id: "page", label: "Seiten" },
  { id: "device", label: "Geräte" },
  { id: "country", label: "Länder" },
];

const RANGES = [7, 28, 90];

const AdminGscDashboardPage = () => {
  const [days, setDays] = useState(28);
  const [dimension, setDimension] = useState<Dimension>("date");
  const [rows, setRows] = useState<Row[]>([]);
  const [meta, setMeta] = useState<{ startDate?: string; endDate?: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("gsc-analytics", {
        body: { days, dimension, rowLimit: dimension === "date" ? 200 : 25 },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      setRows((data?.rows ?? []) as Row[]);
      setMeta({ startDate: data?.startDate, endDate: data?.endDate });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fehler beim Laden der GSC-Daten");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, dimension]);

  const totals = useMemo(() => {
    const clicks = rows.reduce((s, r) => s + r.clicks, 0);
    const impressions = rows.reduce((s, r) => s + r.impressions, 0);
    const ctr = impressions > 0 ? clicks / impressions : 0;
    const avgPos =
      impressions > 0
        ? rows.reduce((s, r) => s + r.position * r.impressions, 0) / impressions
        : 0;
    return { clicks, impressions, ctr, avgPos };
  }, [rows]);

  const timeSeries = useMemo(() => {
    if (dimension !== "date") return [];
    return [...rows]
      .sort((a, b) => a.keys[0].localeCompare(b.keys[0]))
      .map((r) => ({
        date: r.keys[0].slice(5),
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: +(r.ctr * 100).toFixed(2),
        position: +r.position.toFixed(1),
      }));
  }, [rows, dimension]);

  return (
    <AdminLayout title="Google Search Console">
      <div className="space-y-4 sm:space-y-6">
        {/* Controls */}
        <Card className="p-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-muted-foreground mr-2">Zeitraum:</span>
            {RANGES.map((d) => (
              <Button
                key={d}
                size="sm"
                variant={days === d ? "default" : "outline"}
                onClick={() => setDays(d)}
              >
                {d} Tage
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-muted-foreground mr-2">Dimension:</span>
            {DIMENSIONS.map((d) => (
              <Button
                key={d.id}
                size="sm"
                variant={dimension === d.id ? "default" : "outline"}
                onClick={() => setDimension(d.id)}
              >
                {d.label}
              </Button>
            ))}
          </div>
          <Button size="sm" variant="ghost" onClick={() => void load()} className="ml-auto">
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Aktualisieren
          </Button>
        </Card>

        {meta.startDate && (
          <p className="text-xs text-muted-foreground">
            altersvorsorge-rechner.com · {meta.startDate} – {meta.endDate}
          </p>
        )}

        {error && (
          <Card className="p-4 border-destructive bg-destructive/5 text-sm text-destructive">
            {error}
          </Card>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Kpi icon={<MousePointerClick className="w-4 h-4" />} label="Clicks" value={totals.clicks.toLocaleString("de-DE")} />
          <Kpi icon={<Eye className="w-4 h-4" />} label="Impressions" value={totals.impressions.toLocaleString("de-DE")} />
          <Kpi icon={<Percent className="w-4 h-4" />} label="CTR" value={`${(totals.ctr * 100).toFixed(2)}%`} />
          <Kpi icon={<Hash className="w-4 h-4" />} label="Ø Position" value={totals.avgPos.toFixed(1)} />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Lade Daten…
          </div>
        )}

        {!loading && dimension === "date" && timeSeries.length > 0 && (
          <>
            <Card className="p-4">
              <h2 className="text-sm font-semibold mb-3">Clicks & Impressions</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line yAxisId="left" dataKey="clicks" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                    <Line yAxisId="right" dataKey="impressions" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card className="p-4">
              <h2 className="text-sm font-semibold mb-3">CTR (%) & Ø Position</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" reversed tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line yAxisId="left" dataKey="ctr" name="CTR %" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                    <Line yAxisId="right" dataKey="position" name="Position" stroke="#F59E0B" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </>
        )}

        {!loading && dimension !== "date" && rows.length > 0 && (
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs">
                  <tr>
                    <th className="text-left p-3">{DIMENSIONS.find((d) => d.id === dimension)?.label}</th>
                    <th className="text-right p-3">Clicks</th>
                    <th className="text-right p-3">Impressions</th>
                    <th className="text-right p-3">CTR</th>
                    <th className="text-right p-3">Ø Pos.</th>
                  </tr>
                </thead>
                <tbody>
                  {[...rows]
                    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
                    .map((r, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="p-3 max-w-md truncate">{r.keys[0]}</td>
                        <td className="p-3 text-right">{r.clicks.toLocaleString("de-DE")}</td>
                        <td className="p-3 text-right">{r.impressions.toLocaleString("de-DE")}</td>
                        <td className="p-3 text-right">{(r.ctr * 100).toFixed(2)}%</td>
                        <td className="p-3 text-right">
                          <Badge variant="outline">{r.position.toFixed(1)}</Badge>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {!loading && rows.length === 0 && !error && (
          <Card className="p-8 text-center text-muted-foreground text-sm">
            Noch keine Daten. Google braucht typischerweise ein paar Tage nach der Verifizierung,
            bis erste Impressionen erfasst werden.
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

const Kpi = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <Card className="p-4">
    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
      {icon}
      {label}
    </div>
    <div className="text-2xl font-bold">{value}</div>
  </Card>
);

export default AdminGscDashboardPage;
