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
    padding: 32,
    paddingBottom: 24,
  },
  headerLogo: {
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
  },
  headerDate: {
    fontSize: 9,
    color: "rgba(255,255,255,0.6)",
  },
  body: {
    padding: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 12,
    marginTop: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  card: {
    width: "48%",
    backgroundColor: LIGHT_BG,
    borderRadius: 8,
    padding: 14,
  },
  cardHighlight: {
    width: "48%",
    backgroundColor: "#EEF3FF",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: PRIMARY,
  },
  cardLabel: {
    fontSize: 9,
    color: MUTED,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  cardValueBlue: {
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARY,
  },
  explanationBox: {
    backgroundColor: LIGHT_BG,
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
  },
  explanationText: {
    fontSize: 10,
    color: "#333",
    lineHeight: 1.6,
  },
  chartImage: {
    width: "100%",
    height: 180,
    marginBottom: 20,
    borderRadius: 6,
  },
  table: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingVertical: 8,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY,
    paddingVertical: 8,
  },
  tableCell: {
    width: "25%",
    fontSize: 9,
    color: "#333",
  },
  tableCellHeader: {
    width: "25%",
    fontSize: 9,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  tableCellHighlight: {
    width: "25%",
    fontSize: 9,
    fontWeight: "bold",
    color: PRIMARY,
  },
  productRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  productName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1a1a2e",
    width: "40%",
  },
  productDesc: {
    fontSize: 9,
    color: MUTED,
    width: "60%",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 32,
    right: 32,
  },
  footerLine: {
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7,
    color: "#9CA3AF",
  },
  disclaimer: {
    fontSize: 7,
    color: "#9CA3AF",
    lineHeight: 1.5,
    marginTop: 8,
    maxWidth: "90%",
  },
});

export const AuswertungPDF = ({ data }: { data: AuswertungData }) => {
  const foerderProzent =
    data.total_capital > 0
      ? ((data.subsidies / data.total_capital) * 100).toFixed(1)
      : "0";

  const today = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.headerLogo}>altersvorsorge-rechner.com</Text>
          <Text style={s.headerTitle}>
            Deine persönliche Altersvorsorge-Auswertung
          </Text>
          <Text style={s.headerDate}>Erstellt am {today}</Text>
        </View>

        <View style={s.body}>
          {/* Section 1: Key Figures */}
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
              <Text style={s.cardValue}>
                {fmt(data.monthly_contribution)} €
              </Text>
            </View>
          </View>

          {/* Section 2: Explanation */}
          <Text style={s.sectionTitle}>Was das bedeutet</Text>
          <View style={s.explanationBox}>
            <Text style={s.explanationText}>
              Mit einem monatlichen Eigenbeitrag von{" "}
              {fmt(data.monthly_contribution)} € könnten Sie bis zu Ihrem
              Rentenbeginn ein Kapital von {fmt(data.total_capital)} € aufbauen.
              Die staatliche Förderung trägt dabei {fmt(data.subsidies)} € bei —
              das sind {foerderProzent} % Ihres Endkapitals.
            </Text>
          </View>

          {/* Section 3: Chart */}
          {data.chart_image && (
            <>
              <Text style={s.sectionTitle}>Kapitalentwicklung</Text>
              <Image
                style={s.chartImage}
                src={`data:image/png;base64,${data.chart_image}`}
              />
            </>
          )}

          {/* Section 4: Comparison */}
          <Text style={s.sectionTitle}>Vergleich</Text>
          <View style={s.table}>
            <View style={s.tableHeader}>
              <Text style={s.tableCellHeader}></Text>
              <Text style={s.tableCellHighlight}>Altersvorsorgedepot</Text>
              <Text style={s.tableCellHeader}>Normales Depot</Text>
              <Text style={s.tableCellHeader}>Sparkonto</Text>
            </View>
            <View style={s.tableRow}>
              <Text style={s.tableCell}>Kapital</Text>
              <Text style={s.tableCellHighlight}>
                {fmt(data.total_capital)} €
              </Text>
              <Text style={s.tableCell}>{fmt(data.capital_without)} €</Text>
              <Text style={s.tableCell}>{fmt(data.capital_savings)} €</Text>
            </View>
            <View style={s.tableRow}>
              <Text style={s.tableCell}>Monatl. Auszahlung</Text>
              <Text style={s.tableCellHighlight}>
                {fmt(data.monthly_payout)} €
              </Text>
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

          {/* Section 5: Product Options */}
          <Text style={s.sectionTitle}>Produktoptionen</Text>
          <View>
            <View style={s.productRow}>
              <Text style={s.productName}>ETF-Sparplan (Weltportfolio)</Text>
              <Text style={s.productDesc}>
                Flexibel, kostengünstig, langfristig stark
              </Text>
            </View>
            <View style={s.productRow}>
              <Text style={s.productName}>Altersvorsorgedepot (ab 2027)</Text>
              <Text style={s.productDesc}>
                Staatliche Förderung, ETF-Investition, kein Garantiezwang
              </Text>
            </View>
            <View style={s.productRow}>
              <Text style={s.productName}>Betriebliche Altersvorsorge</Text>
              <Text style={s.productDesc}>
                Steuerersparnis durch Entgeltumwandlung
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.disclaimer}>
            Diese Auswertung dient ausschließlich der allgemeinen Information und
            stellt keine Anlage-, Steuer- oder Rechtsberatung dar. Berechnungen
            basieren auf vereinfachten Annahmen (7 % Rendite p.a.). Angaben zum
            Altersvorsorgedepot basieren auf dem aktuellen Gesetzentwurf —
            Änderungen im Gesetzgebungsverfahren sind möglich.
          </Text>
          <View style={s.footerLine}>
            <Text style={s.footerText}>altersvorsorge-rechner.com</Text>
            <Text style={s.footerText}>Seite 1/1</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
