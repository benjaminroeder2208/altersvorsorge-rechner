import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
  ],
});

const PRIMARY = "#1B4FD8";
const MUTED = "#6B7280";
const LIGHT_BG = "#F4F6FA";
const BORDER = "#E5E7EB";
const INFO_BG = "#EEF3FF";

const fmt = (v: number) =>
  v.toLocaleString("de-DE", { maximumFractionDigits: 0 });

export interface AuswertungData {
  monthly_contribution: number;
  total_capital: number;
  monthly_payout: number;
  subsidies: number;
  capital_without: number;
  payout_without: number;
  capital_savings: number;
  payout_savings: number;
  retirement_age: number;
  birth_year: number;
  chart_image?: string;
}

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a2e",
    padding: 0,
  },
  header: {
    backgroundColor: PRIMARY,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerLogo: { fontSize: 9, color: "rgba(255,255,255,0.7)", marginBottom: 8 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#ffffff", marginBottom: 4 },
  headerDate: { fontSize: 8, color: "rgba(255,255,255,0.6)" },
  body: { padding: 30 },
  sectionTitle: { fontSize: 12, fontWeight: "bold", color: "#1a1a2e", marginBottom: 8, marginTop: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  card: { width: "48%", backgroundColor: LIGHT_BG, borderRadius: 8, padding: 10, minHeight: 50 },
  cardHighlight: { width: "48%", backgroundColor: INFO_BG, borderRadius: 8, padding: 10, minHeight: 50, borderWidth: 1, borderColor: PRIMARY },
  cardLabel: { fontSize: 8, color: MUTED, marginBottom: 3 },
  cardValue: { fontSize: 18, fontWeight: "bold", color: "#1a1a2e" },
  cardValueBlue: { fontSize: 18, fontWeight: "bold", color: PRIMARY },
  explanationBox: { backgroundColor: LIGHT_BG, borderRadius: 8, padding: 10, marginBottom: 12 },
  explanationText: { fontSize: 10, color: "#333", lineHeight: 1.6 },
  chartImage: { width: "100%", height: 160, marginBottom: 12, borderRadius: 6 },
  table: { marginBottom: 12 },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: BORDER, paddingVertical: 6 },
  tableHeader: { flexDirection: "row", borderBottomWidth: 2, borderBottomColor: PRIMARY, paddingVertical: 6 },
  tableCell: { width: "25%", fontSize: 9, color: "#333" },
  tableCellHeader: { width: "25%", fontSize: 9, fontWeight: "bold", color: "#1a1a2e" },
  tableCellHighlight: { width: "25%", fontSize: 9, fontWeight: "bold", color: PRIMARY },
  productRow: { flexDirection: "row", paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: BORDER },
  productName: { fontSize: 9, fontWeight: "bold", color: "#1a1a2e", width: "40%" },
  productDesc: { fontSize: 9, color: MUTED, width: "60%" },
  footer: { position: "absolute", bottom: 20, left: 30, right: 30 },
  footerText: { fontSize: 8, color: "#9CA3AF", textAlign: "center" },
  // Page 2 styles
  p2SectionTitle: { fontSize: 13, fontWeight: "bold", color: "#111", marginBottom: 10 },
  p2SectionTitleBlue: { fontSize: 13, fontWeight: "bold", color: PRIMARY, marginBottom: 10 },
  p2Text: { fontSize: 9, color: "#444", lineHeight: 1.6 },
  infoBox: { backgroundColor: INFO_BG, padding: 16, borderRadius: 6, marginBottom: 16 },
  legalSection: { marginBottom: 16 },
});

export const AuswertungPDF = ({ data }: { data: AuswertungData }) => {
  const foerderProzent =
    data.total_capital > 0
      ? ((data.subsidies / data.total_capital) * 100).toFixed(1).replace(".", ",")
      : "0";

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
          <Text style={s.headerTitle}>Deine persönliche Altersvorsorge-Auswertung</Text>
          <Text style={s.headerDate}>Erstellt am {today}</Text>
        </View>

        <View style={s.body}>
          <Text style={s.sectionTitle}>Deine Kennzahlen</Text>
          <View style={s.grid}>
            <View style={s.cardHighlight}>
              <Text style={s.cardLabel}>Kapital zum Rentenbeginn</Text>
              <Text style={s.cardValueBlue}>{fmt(data.total_capital)} €</Text>
            </View>
            <View style={s.card}>
              <Text style={s.cardLabel}>Monatliche Auszahlung bis 85</Text>
              <Text style={s.cardValue}>{fmt(data.monthly_payout)} €</Text>
            </View>
            <View style={s.card}>
              <Text style={s.cardLabel}>Staatliche Förderung gesamt</Text>
              <Text style={s.cardValueBlue}>{fmt(data.subsidies)} €</Text>
            </View>
            <View style={s.card}>
              <Text style={s.cardLabel}>Monatlicher Eigenbeitrag</Text>
              <Text style={s.cardValue}>{fmt(data.monthly_contribution)} €</Text>
            </View>
          </View>

          <Text style={s.sectionTitle}>Was das bedeutet</Text>
          <View style={s.explanationBox}>
            <Text style={s.explanationText}>
              Mit einem monatlichen Eigenbeitrag von {fmt(data.monthly_contribution)} € könnten Sie bis zu Ihrem Rentenbeginn ein Kapital von {fmt(data.total_capital)} € aufbauen. Die staatliche Förderung trägt dabei {fmt(data.subsidies)} € bei — das sind {foerderProzent} % Ihres Endkapitals.
            </Text>
          </View>

          {data.chart_image && (
            <>
              <Text style={s.sectionTitle}>Kapitalentwicklung</Text>
              <Image style={s.chartImage} src={`data:image/png;base64,${data.chart_image}`} />
            </>
          )}

          <Text style={s.sectionTitle}>Vergleich</Text>
          <View style={s.table} wrap={false}>
            <View style={s.tableHeader}>
              <Text style={s.tableCellHeader}></Text>
              <Text style={s.tableCellHighlight}>Altersvorsorgedepot</Text>
              <Text style={s.tableCellHeader}>Normales Depot</Text>
              <Text style={s.tableCellHeader}>Sparkonto</Text>
            </View>
            <View style={s.tableRow}>
              <Text style={s.tableCell}>Kapital</Text>
              <Text style={s.tableCellHighlight}>{fmt(data.total_capital)} €</Text>
              <Text style={s.tableCell}>{fmt(data.capital_without)} €</Text>
              <Text style={s.tableCell}>{fmt(data.capital_savings)} €</Text>
            </View>
            <View style={s.tableRow}>
              <Text style={s.tableCell}>Monatl. Auszahlung</Text>
              <Text style={s.tableCellHighlight}>{fmt(data.monthly_payout)} €</Text>
              <Text style={s.tableCell}>{fmt(data.payout_without)} €</Text>
              <Text style={s.tableCell}>{fmt(data.payout_savings)} €</Text>
            </View>
            <View style={s.tableRow}>
              <Text style={s.tableCell}>Staatl. Förderung</Text>
              <Text style={s.tableCellHighlight}>Ja</Text>
              <Text style={s.tableCell}>Nein</Text>
              <Text style={s.tableCell}>Nein</Text>
            </View>
          </View>

          <Text style={s.sectionTitle}>Produktoptionen</Text>
          <View wrap={false}>
            <View style={s.productRow}>
              <Text style={s.productName}>ETF-Sparplan (Weltportfolio)</Text>
              <Text style={s.productDesc}>Flexibel, kostengünstig, langfristig stark</Text>
            </View>
            <View style={s.productRow}>
              <Text style={s.productName}>Altersvorsorgedepot (ab 2027)</Text>
              <Text style={s.productDesc}>Staatliche Förderung, ETF-Investition, kein Garantiezwang</Text>
            </View>
            <View style={s.productRow}>
              <Text style={s.productName}>Betriebliche Altersvorsorge</Text>
              <Text style={s.productDesc}>Steuerersparnis durch Entgeltumwandlung</Text>
            </View>
          </View>
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>altersvorsorge-rechner.com · Seite 1/2 · Rechtliche Hinweise siehe Seite 2</Text>
        </View>
      </Page>

      {/* ===== PAGE 2 ===== */}
      <Page size="A4" style={s.page}>
        <View style={s.body}>
          {/* A: Wie wurde berechnet? */}
          <View style={s.infoBox}>
            <Text style={s.p2SectionTitleBlue}>Wie wurde berechnet?</Text>
            <Text style={s.p2Text}>
              Die Berechnungen basieren auf folgenden Annahmen:{"\n\n"}
              Rendite: Es wurde eine vereinfachte Rendite von 7 % p.a. angenommen. Diese entspricht in etwa der historischen Durchschnittsrendite eines breit gestreuten Aktien-ETF (z. B. MSCI World) über lange Zeiträume. Die tatsächliche Rendite kann höher oder niedriger ausfallen und ist nicht garantiert.{"\n\n"}
              Beiträge: Die monatlichen Eigenbeiträge werden als konstant über die gesamte Laufzeit angenommen. Steuerliche Auswirkungen der Beiträge (z. B. Sonderausgabenabzug) sind nicht berücksichtigt.{"\n\n"}
              Staatliche Förderung: Die Förderung basiert auf dem Gesetzentwurf zur Reform der privaten Altersvorsorge (Stand März 2026). Grundzulage: 35 % auf bis zu 1.200 €/Jahr (max. 420 €) + 20 % auf 1.200–1.800 €/Jahr (max. 120 €) = max. 540 €/Jahr. Kinderzulage: bis zu 300 € pro Kind/Jahr. Das Gesetz ist noch nicht beschlossen — Änderungen sind möglich.{"\n\n"}
              Auszahlung: Die monatliche Auszahlung wird vereinfacht berechnet als Gesamtkapital geteilt durch die Anzahl der Monate bis zum 85. Lebensjahr. Tatsächliche Rentenprodukte können abweichen.{"\n\n"}
              Inflation: Die Berechnungen sind nominal — Kaufkraftverlust durch Inflation ist nicht berücksichtigt. Bei einer angenommenen Inflation von 2 % p.a. entspricht die reale Kaufkraft der berechneten Beträge etwa 60–70 % des nominalen Wertes.{"\n\n"}
              Vergleich: „Normales Depot" wurde mit gleicher Rendite (7 % p.a.) aber ohne staatliche Förderung berechnet. „Sparkonto" wurde mit 2 % p.a. berechnet.
            </Text>
          </View>

          {/* B: Rechtliche Hinweise */}
          <View style={s.legalSection}>
            <Text style={s.p2SectionTitle}>Rechtliche Hinweise</Text>
            <Text style={s.p2Text}>
              Keine Anlageberatung{"\n"}
              Diese Auswertung wurde automatisch auf Basis Ihrer Eingaben erstellt und dient ausschließlich der allgemeinen Information. Sie stellt keine Anlage-, Vermögens-, Steuer- oder Rechtsberatung dar und ersetzt diese nicht. Für individuelle Empfehlungen wenden Sie sich bitte an einen zugelassenen Finanzberater oder eine unabhängige Verbraucherzentrale.{"\n\n"}
              Keine Gewähr{"\n"}
              Trotz sorgfältiger Erstellung übernehmen wir keine Haftung für die Richtigkeit, Vollständigkeit oder Aktualität der Angaben. Berechnungen basieren auf vereinfachten Modellen und können von der tatsächlichen Wertentwicklung abweichen.{"\n\n"}
              Altersvorsorgedepot — Gesetzentwurf{"\n"}
              Alle Angaben zum Altersvorsorgedepot basieren auf dem aktuellen Referentenentwurf des Bundesministeriums der Finanzen (Stand März 2026). Das Gesetz ist noch nicht beschlossen. Förderbeträge, Bedingungen und Start-Datum können sich im Gesetzgebungsverfahren noch ändern.{"\n\n"}
              Steuerliche Hinweise{"\n"}
              Die steuerliche Behandlung der Erträge aus dem Altersvorsorgedepot (nachgelagerte Besteuerung im Alter) ist abhängig von Ihrer persönlichen Steuersituation und kann sich ändern. Bitte konsultieren Sie einen Steuerberater für individuelle Fragen.{"\n\n"}
              Datenschutz{"\n"}
              Ihre Daten wurden ausschließlich zur Erstellung dieser Auswertung verwendet. Die vollständige Datenschutzerklärung finden Sie unter: altersvorsorge-rechner.com/datenschutz
            </Text>
          </View>

          {/* C: Kontakt & Impressum */}
          <View style={s.legalSection}>
            <Text style={s.p2SectionTitle}>Kontakt & Impressum</Text>
            <Text style={s.p2Text}>
              altersvorsorge-rechner.com{"\n"}
              Betreiber: Benjamin Röder{"\n"}
              Mainkurstraße 16, 63075 Offenbach am Main{"\n"}
              E-Mail: info@altersvorsorge-rechner.com{"\n"}
              Vollständiges Impressum: altersvorsorge-rechner.com/impressum
            </Text>
          </View>
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>altersvorsorge-rechner.com · Seite 2/2</Text>
        </View>
      </Page>
    </Document>
  );
};
