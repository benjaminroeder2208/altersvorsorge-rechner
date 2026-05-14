import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export interface StackedChartDataPoint {
  age: number;
  contributions: number;
  subsidies: number;
  gains: number;
  total: number;
}

const fmt = (v: number) => v.toLocaleString("de-DE", { maximumFractionDigits: 0 });
const fmtEur = (v: number) => `${fmt(v)} €`;

const StackedTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload as StackedChartDataPoint | undefined;
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
      <p className="text-[10px] text-muted-foreground mt-3 leading-tight">
        Vereinfachte Simulation auf Basis Ihrer Eingaben.
      </p>
    </div>
  );
};

interface Props {
  data: StackedChartDataPoint[];
}

const StackedAreaChart = ({ data }: Props) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
        axisLine={false}
        tickLine={false}
        interval="preserveStartEnd"
      />
      <YAxis
        tick={{ fill: "hsl(240, 1%, 44%)", fontSize: 12 }}
        axisLine={false}
        tickLine={false}
        tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : fmt(v))}
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
);

export default StackedAreaChart;
