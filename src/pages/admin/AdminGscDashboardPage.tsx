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
import { Loader2, RefreshCw, MousePointerClick, Eye, Percent, Hash, AlertCircle, CheckCircle2, Info, Clock } from "lucide-react";

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
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const load = async () => {
    setLoading(true);
    setError(null);
    setErrorDetails(null);
    try {
      const { data, error } = await supabase.functions.invoke("gsc-analytics", {
        body: { days, dimension, rowLimit: dimension === "date" ? 200 : 25 },
      });
      if (error) throw new Error(error.message);
      if (data?.error) {
        const detail = data.details ? JSON.stringify(data.details).slice(0, 300) : null;
        setErrorDetails(detail);
        throw new Error(data.error);
      }
      setRows((data?.rows ?? []) as Row[]);
      setMeta({ startDate: data?.startDate, endDate: data?.endDate });
      setLastFetched(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fehler beim Laden der GSC-Daten");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount((c) => c + 1);
    void load();
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, dimension]);

  const fmtTime = (d: Date) =>
    d.toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" });

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

        {/* Verbindungs- & Datenstatus */}
        <Card
          className={`p-4 text-sm border ${
            error
              ? "border-destructive bg-destructive/5"
              : rows.length === 0 && !loading
              ? "border-amber-500/40 bg-amber-50 dark:bg-amber-950/20"
              : "border-border bg-muted/30"
          }`}
        >
          <div className="flex flex-wrap items-start gap-3">
            <div className="mt-0.5">
              {error ? (
                <AlertCircle className="w-5 h-5 text-destructive" />
              ) : loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              ) : rows.length === 0 ? (
                <Info className="w-5 h-5 text-amber-600" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium">
                {error
                  ? "Verbindung fehlgeschlagen"
                  : loading
                  ? "Lade Search-Console-Daten…"
                  : rows.length === 0
                  ? "Verbunden – noch keine Daten"
                  : "Verbunden – Daten aktuell"}
              </div>
              <div className="mt-1 text-xs text-muted-foreground space-y-0.5">
                <div>
                  Property: <span className="font-mono">altersvorsorge-rechner.com</span>
                </div>
                {meta.startDate && (
                  <div>
                    Zeitraum: {meta.startDate} – {meta.endDate} (GSC liefert mit ~2 Tagen Verzug)
                  </div>
                )}
                {lastFetched && (
                  <div className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Letzter Abruf: {fmtTime(lastFetched)}
                    {retryCount > 0 && ` · ${retryCount} Wiederholung${retryCount > 1 ? "en" : ""}`}
                  </div>
                )}
                {!error && rows.length === 0 && !loading && (
                  <div className="text-amber-700 dark:text-amber-400 mt-1">
                    Hinweis: Nach Verifizierung einer Property dauert es typischerweise 2–4 Tage,
                    bis Google die ersten Impressionen erfasst.
                  </div>
                )}
                {error && (
                  <>
                    <div className="text-destructive mt-1">{error}</div>
                    {errorDetails && (
                      <details className="mt-1">
                        <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                          Technische Details
                        </summary>
                        <pre className="mt-1 p-2 bg-muted rounded text-[10px] overflow-x-auto whitespace-pre-wrap break-all">
                          {errorDetails}
                        </pre>
                      </details>
                    )}
                  </>
                )}
              </div>
            </div>
            {error && (
              <Button size="sm" variant="outline" onClick={handleRetry} disabled={loading}>
                <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
                Erneut versuchen
              </Button>
            )}
          </div>
        </Card>

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
