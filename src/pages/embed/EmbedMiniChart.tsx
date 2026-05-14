import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BRAND } from "@/lib/brandColors";

export interface EmbedChartDataPoint {
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
  const point = payload[0]?.payload as EmbedChartDataPoint | undefined;
  if (!point) return null;
  return (
    <div className="bg-embed border border-embed-border rounded-xl p-3 shadow-lg text-xs min-w-[180px]">
      <p className="text-embed-foreground-muted mb-2 font-medium">Alter {label}</p>
      {[
        { label: "Eigenbeiträge", value: point.contributions, color: BRAND.chartGray },
        { label: "Zulagen", value: point.subsidies, color: BRAND.chartBlue },
        { label: "Kapitalerträge", value: point.gains, color: BRAND.chartTeal },
      ].map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: row.color }} />
            <span className="text-embed-foreground-muted">{row.label}</span>
          </div>
          <span className="font-semibold text-embed-foreground-strong">{fmtEur(row.value)}</span>
        </div>
      ))}
      <div className="pt-2 mt-1 border-t border-embed-border-subtle flex justify-between">
        <span className="font-semibold text-embed-foreground-strong">Gesamt</span>
        <span className="font-bold text-embed-foreground-strong">{fmtEur(point.total)}</span>
      </div>
    </div>
  );
};

interface Props {
  data: EmbedChartDataPoint[];
  primaryColor: string;
}

const EmbedMiniChart = ({ data, primaryColor }: Props) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="embedGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.2} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="age"
        tick={{ fill: BRAND.chartGray, fontSize: 11 }}
        axisLine={false}
        tickLine={false}
        interval="preserveStartEnd"
      />
      <YAxis
        tick={{ fill: BRAND.chartGray, fontSize: 11 }}
        axisLine={false}
        tickLine={false}
        tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(v))}
        width={45}
      />
      <Tooltip content={<StackedTooltip />} />
      <Area type="monotone" dataKey="total" stroke={primaryColor} fill="url(#embedGrad)" strokeWidth={2} />
    </AreaChart>
  </ResponsiveContainer>
);

export default EmbedMiniChart;
