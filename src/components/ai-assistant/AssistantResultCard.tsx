import { useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ArrowRight } from "lucide-react";
import {
  berechneGrundzulage,
  berechneKinderzulage,
} from "@/lib/foerderung";
import { supabase } from "@/integrations/supabase/client";

export interface CalculationTrigger {
  vorname?: string | null;
  alter: number;
  sparbetrag_monatlich: number;
  rendite_prozent: number;
  renteneintrittsalter: number;
  kinder_anzahl: number;
}

interface Props {
  trigger: CalculationTrigger;
  sessionId: string;
}

const fmtEur = (v: number) =>
  `${Math.round(v).toLocaleString("de-DE")} €`;

/** Endkapital bei Renteneintritt mit jährlichem Beitrag + Zinseszins */
function projektion(
  monatlich: number,
  jahre: number,
  renditeProzent: number,
  zusatzlicherJahresbetrag: number,
) {
  const r = renditeProzent / 100;
  const jahresbeitrag = monatlich * 12 + zusatzlicherJahresbetrag;
  const series: { jahr: number; kapital: number }[] = [];
  let k = 0;
  for (let i = 1; i <= jahre; i++) {
    k = k * (1 + r) + jahresbeitrag;
    series.push({ jahr: i, kapital: Math.round(k) });
  }
  return { end: k, series };
}

export default function AssistantResultCard({ trigger, sessionId }: Props) {
  const updated = useRef(false);

  const {
    alter,
    sparbetrag_monatlich,
    rendite_prozent,
    renteneintrittsalter,
    kinder_anzahl,
    vorname,
  } = trigger;

  const jahre = Math.max(renteneintrittsalter - alter, 1);
  const eigenanteilJaehrlich = sparbetrag_monatlich * 12;

  const grundzulage = berechneGrundzulage(eigenanteilJaehrlich);
  const kinderzulage = berechneKinderzulage(eigenanteilJaehrlich, kinder_anzahl);

  const ohne = useMemo(
    () => projektion(sparbetrag_monatlich, jahre, rendite_prozent, 0),
    [sparbetrag_monatlich, jahre, rendite_prozent],
  );
  const mitFoerderung = useMemo(
    () => projektion(sparbetrag_monatlich, jahre, rendite_prozent, grundzulage),
    [sparbetrag_monatlich, jahre, rendite_prozent, grundzulage],
  );
  const mitKinder = useMemo(
    () =>
      projektion(
        sparbetrag_monatlich,
        jahre,
        rendite_prozent,
        grundzulage + kinderzulage,
      ),
    [sparbetrag_monatlich, jahre, rendite_prozent, grundzulage, kinderzulage],
  );

  const hauptSerie = kinder_anzahl > 0 ? mitKinder : mitFoerderung;
  const endKapital = hauptSerie.end;

  // Lead-Update: ergebnis_kapital nachtragen (einmalig, server-seitig)
  useEffect(() => {
    if (updated.current || !sessionId) return;
    updated.current = true;
    supabase.functions
      .invoke("update-ai-lead", {
        body: {
          session_id: sessionId,
          ergebnis_kapital: Math.round(endKapital),
        },
      })
      .then(({ error }) => {
        if (error) console.error("Lead-Update fehlgeschlagen:", error);
      });
  }, [sessionId, endKapital]);

  const chartData = hauptSerie.series.map((p) => ({
    jahr: alter + p.jahr,
    kapital: p.kapital,
  }));

  const rechnerUrl = `/rentenluecken-rechner?alter=${alter}&sparbetrag=${sparbetrag_monatlich}&rendite=${rendite_prozent}&renteneintritt=${renteneintrittsalter}&kinder=${kinder_anzahl}`;

  return (
    <div className="w-full rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-5 sm:p-6 space-y-5">
      {/* Kernzahl */}
      <div>
        <div className="text-3xl sm:text-4xl font-bold tabular-nums text-primary">
          {fmtEur(endKapital)}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Kapital bei Renteneintritt mit {renteneintrittsalter}
          {vorname ? `, ${vorname}` : ""}
        </p>
      </div>

      {/* Chart */}
      <div className="h-44 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis
              dataKey="jahr"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `${Math.round(v / 1000)}k`}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <Tooltip
              formatter={(v: number) => fmtEur(v)}
              labelFormatter={(l) => `Alter ${l}`}
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--background))",
              }}
            />
            <Line
              type="monotone"
              dataKey="kapital"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Szenarien */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <ScenarioCard label="Ohne Förderung" value={fmtEur(ohne.end)} />
        <ScenarioCard label="Mit Förderung" value={fmtEur(mitFoerderung.end)} highlight={kinder_anzahl === 0} />
        {kinder_anzahl > 0 && (
          <ScenarioCard
            label="Mit Kinderzulage"
            value={fmtEur(mitKinder.end)}
            highlight
            className="col-span-2"
          />
        )}
      </div>

      <p className="text-[11px] text-muted-foreground leading-relaxed">
        Vereinfachte Modellrechnung, keine Anlageberatung.
      </p>

      <Link
        to={rechnerUrl}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Vollen Rechner öffnen <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function ScenarioCard({
  label,
  value,
  highlight = false,
  className = "",
}: {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg p-3 ${
        highlight
          ? "bg-primary/10 border border-primary/20"
          : "bg-muted border border-border"
      } ${className}`}
    >
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`text-sm font-semibold tabular-nums mt-0.5 ${highlight ? "text-primary" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}
