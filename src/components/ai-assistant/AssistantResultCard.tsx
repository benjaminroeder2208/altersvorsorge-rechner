import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import {
  berechneGrundzulage,
  berechneKinderzulage,
  type Child,
} from "@/lib/foerderung";
import NewsletterCard from "@/components/landing/NewsletterCard";
import type { Inputs } from "@/components/landing/AltersvorsorgedepotRechner";
import { calculate } from "@/components/landing/AltersvorsorgedepotRechner";

export interface CalculationTrigger {
  vorname?: string | null;
  alter: number;
  sparbetrag_monatlich: number;
  rendite_prozent: number;
  renteneintrittsalter: number;
  kinder: { birthYear: number; kindergeldBis: 18 | 25 }[];
}

interface Props {
  trigger: CalculationTrigger;
  sessionId: string;
}

const fmtEur = (v: number) =>
  `${Math.round(v).toLocaleString("de-DE")} €`;

const CURRENT_YEAR = new Date().getFullYear();

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

export default function AssistantResultCard({ trigger }: Props) {
  const {
    alter,
    sparbetrag_monatlich,
    rendite_prozent,
    renteneintrittsalter,
    kinder,
    vorname,
  } = trigger;

  const kinderList: Child[] = useMemo(
    () =>
      (kinder ?? []).map((k) => ({
        birthYear: k.birthYear,
        kindergeldBis: k.kindergeldBis,
      })),
    [kinder],
  );
  const kinder_anzahl = kinderList.length;

  const jahre = Math.max(renteneintrittsalter - alter, 1);
  const eigenanteilJaehrlich = sparbetrag_monatlich * 12;

  const grundzulage = berechneGrundzulage(eigenanteilJaehrlich);
  const kinderzulage = berechneKinderzulage(eigenanteilJaehrlich, kinderList, CURRENT_YEAR);

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

  // Inputs/Result für die wiederverwendete NewsletterCard (gleiche Logik wie Hauptrechner)
  const newsletterInputs: Inputs = useMemo(
    () => ({
      monthlyContribution: sparbetrag_monatlich,
      incomeBand: 2,
      birthYear: CURRENT_YEAR - alter,
      children: kinderList,
      retirementAge: renteneintrittsalter,
      returnRate: rendite_prozent / 100,
    }),
    [sparbetrag_monatlich, alter, kinderList, renteneintrittsalter, rendite_prozent],
  );
  const newsletterResult = useMemo(() => calculate(newsletterInputs), [newsletterInputs]);

  const chartData = hauptSerie.series.map((p) => ({
    jahr: alter + p.jahr,
    kapital: p.kapital,
  }));

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

      {/* Chart — id ist Pflicht für captureChart() der NewsletterCard */}
      <div id="pdf-chart-capture" className="h-44 -mx-1 bg-background">
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

      {/* Wiederverwendeter Lead-Flow: simulation_leads + send-confirmation-email + PDF */}
      <div className="pt-2 [&>div]:mb-0 [&>div]:max-w-full [&_.p-8]:p-5">
        <NewsletterCard inputs={newsletterInputs} result={newsletterResult} />
      </div>
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
