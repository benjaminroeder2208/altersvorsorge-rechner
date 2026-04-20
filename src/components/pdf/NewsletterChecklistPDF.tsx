import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import {
  GRUNDZULAGE_SATZ_T1,
  GRUNDZULAGE_T1_MAX,
  GRUNDZULAGE_SATZ_T2,
  MAX_GRUNDZULAGE,
  MAX_EIGENANTEIL_GEFOERDERT,
} from "@/lib/foerderung";

Font.register({
  family: "Helvetica",
  fonts: [{ src: "Helvetica" }, { src: "Helvetica-Bold", fontWeight: "bold" }],
});

const PRIMARY = "#1B4FD8";
const MUTED = "#6B7280";
const LIGHT_BG = "#F4F6FA";
const BORDER = "#E5E7EB";
const INFO_BG = "#EEF3FF";
const AMBER = "#F59E0B";

const fmt = (v: number) => v.toLocaleString("de-DE", { maximumFractionDigits: 0 });

// ─────────────────────────────────────────────
// Berechnung: 150 €/Monat Eigenbeitrag bis 67,
// 7 % p.a., max. Grundzulage 540 €/Jahr (= 45 €/M).
// Auszahlung gleichverteilt bis Lebensjahr 85.
// ─────────────────────────────────────────────
function futureValue(monthly: number, years: number, rate: number) {
  const n = years * 12;
  const r = rate / 12;
  return (monthly * ((Math.pow(1 + r, n) - 1) / r));
}

const MONTHLY_OWN = 150;
const MONTHLY_SUBSIDY = MAX_GRUNDZULAGE / 12; // 45 €/M
const MONTHLY_TOTAL = MONTHLY_OWN + MONTHLY_SUBSIDY;
const RATE = 0.07;
const RETIRE = 67;
const PAYOUT_MONTHS = (85 - RETIRE) * 12;

function buildScenario(startAge: number) {
  const years = RETIRE - startAge;
  const capital = futureValue(MONTHLY_TOTAL, years, RATE);
  const monthlyPayout = capital / PAYOUT_MONTHS;
  const totalSubsidy = MONTHLY_SUBSIDY * 12 * years;
  const totalOwn = MONTHLY_OWN * 12 * years;
  return { startAge, years, capital, monthlyPayout, totalSubsidy, totalOwn };
}

const SCENARIOS = [buildScenario(25), buildScenario(35), buildScenario(45)];

const s = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, color: "#1a1a2e", padding: 0 },
  header: {
    backgroundColor: PRIMARY,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerLogo: { fontSize: 9, color: "rgba(255,255,255,0.7)", marginBottom: 8 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#ffffff", marginBottom: 4 },
  headerSubtitle: { fontSize: 10, color: "rgba(255,255,255,0.85)" },

  body: { padding: 30 },
  intro: { fontSize: 10, color: "#333", lineHeight: 1.6, marginBottom: 16 },

  scenarioCard: {
    backgroundColor: LIGHT_BG,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: PRIMARY,
  },
  scenarioHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  scenarioTitle: { fontSize: 13, fontWeight: "bold", color: "#1a1a2e" },
  scenarioBadge: { fontSize: 8, color: PRIMARY, fontWeight: "bold" },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  metric: { width: "48%", marginBottom: 6 },
  metricLabel: { fontSize: 8, color: MUTED, marginBottom: 2 },
  metricValue: { fontSize: 14, fontWeight: "bold", color: "#1a1a2e" },
  metricValueBlue: { fontSize: 14, fontWeight: "bold", color: PRIMARY },

  takeawaysBox: {
    backgroundColor: INFO_BG,
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    marginBottom: 14,
  },
  takeawayTitle: { fontSize: 11, fontWeight: "bold", color: PRIMARY, marginBottom: 6 },
  takeawayItem: { fontSize: 9.5, color: "#333", lineHeight: 1.5, marginBottom: 4 },

  noteBox: {
    backgroundColor: "#FEF3C7",
    borderRadius: 6,
    padding: 10,
    marginBottom: 14,
    borderLeftWidth: 3,
    borderLeftColor: AMBER,
  },
  noteText: { fontSize: 9, color: "#7C2D12", lineHeight: 1.5 },

  sectionTitle: { fontSize: 12, fontWeight: "bold", color: "#1a1a2e", marginBottom: 6, marginTop: 4 },
  bodyText: { fontSize: 9, color: "#444", lineHeight: 1.55, marginBottom: 8 },
  link: { color: PRIMARY, textDecoration: "underline" },

  footerBar: {
    marginTop: 20,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: BORDER,
  },
  footerText: { fontSize: 8, color: "#9CA3AF", textAlign: "center" },
});

const Scenario = ({
  data,
  label,
}: {
  data: ReturnType<typeof buildScenario>;
  label: string;
}) => (
  <View style={s.scenarioCard} wrap={false}>
    <View style={s.scenarioHeader}>
      <Text style={s.scenarioTitle}>
        Szenario: Start mit {data.startAge} Jahren
      </Text>
      <Text style={s.scenarioBadge}>{label}</Text>
    </View>
    <View style={s.row}>
      <View style={s.metric}>
        <Text style={s.metricLabel}>Laufzeit bis Rente (67)</Text>
        <Text style={s.metricValue}>{data.years} Jahre</Text>
      </View>
      <View style={s.metric}>
        <Text style={s.metricLabel}>Monatlicher Eigenbeitrag</Text>
        <Text style={s.metricValue}>{fmt(MONTHLY_OWN)} €</Text>
      </View>
      <View style={s.metric}>
        <Text style={s.metricLabel}>Kapital zum Rentenbeginn</Text>
        <Text style={s.metricValueBlue}>{fmt(data.capital)} €</Text>
      </View>
      <View style={s.metric}>
        <Text style={s.metricLabel}>Monatliche Auszahlung bis 85</Text>
        <Text style={s.metricValueBlue}>{fmt(data.monthlyPayout)} €</Text>
      </View>
      <View style={s.metric}>
        <Text style={s.metricLabel}>Eigene Einzahlungen gesamt</Text>
        <Text style={s.metricValue}>{fmt(data.totalOwn)} €</Text>
      </View>
      <View style={s.metric}>
        <Text style={s.metricLabel}>Staatliche Förderung gesamt</Text>
        <Text style={s.metricValueBlue}>{fmt(data.totalSubsidy)} €</Text>
      </View>
    </View>
  </View>
);

export const NewsletterChecklistPDF = () => {
  const today = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Document>
      {/* ===== PAGE 1 ===== */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerLogo}>altersvorsorge-rechner.com</Text>
          <Text style={s.headerTitle}>Altersvorsorge-Checkliste</Text>
          <Text style={s.headerSubtitle}>3 Szenarien mit konkreten €-Zahlen — erstellt am {today}</Text>
        </View>

        <View style={s.body}>
          <Text style={s.intro}>
            Diese Checkliste zeigt, wie viel Kapital und monatliche Auszahlung mit
            150 € eigenem Beitrag pro Monat möglich sind — abhängig vom Startalter.
            Alle Beträge nutzen die maximale Grundzulage des neuen Altersvorsorgedepots
            (540 €/Jahr) und eine Renditeannahme von 7 % p.a.
          </Text>

          <Scenario data={SCENARIOS[0]} label="Bestmögliches Ergebnis" />
          <Scenario data={SCENARIOS[1]} label="Solide Basis" />
          <Scenario data={SCENARIOS[2]} label="Noch machbar" />

          <View style={s.takeawaysBox} wrap={false}>
            <Text style={s.takeawayTitle}>Drei Erkenntnisse aus den Zahlen</Text>
            <Text style={s.takeawayItem}>
              1. Wer mit 25 statt 35 startet, baut mit denselben 150 €/Monat rund
              das Doppelte an Kapital auf — ohne mehr einzuzahlen.
            </Text>
            <Text style={s.takeawayItem}>
              2. Die staatliche Grundzulage erhöht den effektiven Beitrag um 30 %
              (45 € pro Monat geschenkt) — über Jahrzehnte ein erheblicher Hebel.
            </Text>
            <Text style={s.takeawayItem}>
              3. Auch mit 45 ist es nicht zu spät: 564 €/Monat zusätzliche Rente
              sind realistisch erreichbar.
            </Text>
          </View>

          <View style={s.noteBox}>
            <Text style={s.noteText}>
              Hinweis: Die Berechnungen sind nominal (vor Inflation), gehen von
              konstanten Beiträgen aus und blenden steuerliche Effekte in der
              Auszahlungsphase aus. Für deine persönliche Situation nutze den
              Rechner unter altersvorsorge-rechner.com.
            </Text>
          </View>

          <View style={s.footerBar}>
            <Text style={s.footerText}>altersvorsorge-rechner.com · Seite 1/2 · Rechtliche Hinweise siehe Seite 2</Text>
          </View>
        </View>
      </Page>

      {/* ===== PAGE 2 ===== */}
      <Page size="A4" style={s.page}>
        <View style={s.body}>
          <Text style={s.sectionTitle}>So wurde gerechnet</Text>
          <Text style={s.bodyText}>
            Rendite: 7 % p.a. — entspricht der historischen Durchschnittsrendite eines
            breit gestreuten Aktien-ETF (z. B. MSCI World) auf lange Sicht. Quelle:
            DAI Renditedreieck (
            <Text style={s.link}>https://www.dai.de/renditedreieck</Text>
            ). Die tatsächliche Rendite kann höher oder niedriger ausfallen und ist
            nicht garantiert.{"\n\n"}
            Eigenbeitrag: 150 € pro Monat = 1.800 € pro Jahr. Damit wird der
            maximal geförderte Eigenbeitrag von {fmt(MAX_EIGENANTEIL_GEFOERDERT)} € voll ausgeschöpft.{"\n\n"}
            Staatliche Förderung: Grundzulage {GRUNDZULAGE_SATZ_T1 * 100} % auf die ersten
            {" "}{GRUNDZULAGE_T1_MAX} €/Jahr + {GRUNDZULAGE_SATZ_T2 * 100} % auf weitere 1.440 €/Jahr.
            Maximale Grundzulage: {MAX_GRUNDZULAGE} € pro Jahr (= 45 € pro Monat).
            Kinderzulage in dieser Beispielrechnung nicht berücksichtigt.{"\n\n"}
            Endkapital: Klassische Zinseszinsformel für eine monatliche Annuität,
            angewandt auf den Gesamtbeitrag (Eigenbeitrag + Zulage).{"\n\n"}
            Monatliche Auszahlung: Endkapital geteilt durch die Monate zwischen
            Renteneintritt (67) und Lebensjahr 85 — vereinfachte Modellrechnung,
            tatsächliche Rentenprodukte können abweichen.
          </Text>

          <Text style={s.sectionTitle}>Rechtliche Hinweise</Text>
          <Text style={s.bodyText}>
            Keine Anlageberatung{"\n"}
            Diese Checkliste dient ausschließlich der allgemeinen Information und stellt
            keine Anlage-, Steuer- oder Rechtsberatung dar. Für individuelle Empfehlungen
            wenden Sie sich an einen zugelassenen Finanzberater oder eine unabhängige
            Verbraucherzentrale.{"\n\n"}
            Altersvorsorgedepot — Rechtsstand{"\n"}
            Alle Angaben zur staatlichen Förderung basieren auf dem Altersvorsorgereformgesetz,
            das am 27. März 2026 vom Deutschen Bundestag beschlossen wurde.{"\n\n"}
            Datenschutz{"\n"}
            Ihre E-Mail-Adresse wurde ausschließlich zur Bereitstellung dieser
            Checkliste und — sofern Sie zugestimmt haben — zum Versand des
            Newsletters gespeichert. Vollständige Datenschutzerklärung unter
            altersvorsorge-rechner.com/datenschutz. Abmeldelink in jeder E-Mail.
          </Text>

          <Text style={s.sectionTitle}>Kontakt & Impressum</Text>
          <Text style={s.bodyText}>
            E-Mail: info@altersvorsorge-rechner.com — Impressum:
            altersvorsorge-rechner.com/impressum
          </Text>

          <View style={s.footerBar}>
            <Text style={s.footerText}>altersvorsorge-rechner.com · Seite 2/2</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
