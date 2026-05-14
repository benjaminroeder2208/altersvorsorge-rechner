import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trophy, Target, Lightbulb, Gauge } from "lucide-react";

/**
 * Snapshot von Semrush SERP-Daten (Datenbank: DE).
 * Manuell aktualisieren, wenn neue Auswertung gewünscht.
 */
const SNAPSHOT_DATE = "14. Mai 2026";

interface SerpEntry {
  pos: number;
  domain: string;
  url: string;
  type: "official" | "media" | "bank" | "fintech" | "wiki" | "video" | "competitor";
}

interface KeywordBlock {
  keyword: string;
  volume: string;
  difficulty: string;
  difficultyLabel: string;
  results: SerpEntry[];
  angles: string[];
  ourEdge: string;
}

const TYPE_LABEL: Record<SerpEntry["type"], { label: string; tone: string }> = {
  official: { label: "Behörde", tone: "bg-disclaimer text-disclaimer-foreground" },
  media: { label: "Ratgeber", tone: "bg-secondary text-foreground" },
  bank: { label: "Bank", tone: "bg-secondary text-foreground" },
  fintech: { label: "Fintech", tone: "bg-secondary text-foreground" },
  wiki: { label: "Wiki", tone: "bg-secondary text-foreground" },
  video: { label: "Video", tone: "bg-secondary text-foreground" },
  competitor: { label: "Wettbewerber", tone: "bg-secondary text-foreground" },
};

const KEYWORDS: KeywordBlock[] = [
  {
    keyword: "riester zulage",
    volume: "2.400 / Monat",
    difficulty: "34/100",
    difficultyLabel: "machbar",
    results: [
      { pos: 1, domain: "riester.deutsche-rentenversicherung.de", url: "https://riester.deutsche-rentenversicherung.de/DE/Lohnt-sich-Riester/Staatliche-Foerderung-fuer-Sie/staatliche-foerderung-fuer-sie_node", type: "official" },
      { pos: 2, domain: "raisin.com", url: "https://www.raisin.com/de-de/altersvorsorge/riester-rente/zulagen/", type: "fintech" },
      { pos: 3, domain: "de.wikipedia.org", url: "https://de.wikipedia.org/wiki/Riester-Rente", type: "wiki" },
      { pos: 4, domain: "riester.deutsche-rentenversicherung.de", url: "https://riester.deutsche-rentenversicherung.de/DE/So-geht-Riester/vier-Schritte-bis-zur-Zulage/vier-schritte-bis-zur-zulage.html", type: "official" },
      { pos: 5, domain: "eap.bayern.de", url: "https://www.eap.bayern.de/informationen/dienstleistungen/themen/794900110317167/leistungsbeschreibung/433201573445", type: "official" },
      { pos: 6, domain: "vr.de", url: "https://www.vr.de/privatkunden/produkte/altersvorsorge/riester-rente/zulagen-riester-rente.html", type: "bank" },
      { pos: 7, domain: "finanztip.de", url: "https://www.finanztip.de/riester/riester-foerderung/", type: "media" },
      { pos: 8, domain: "allianz.de", url: "https://www.allianz.de/vorsorge/riester-rente/foerderung/", type: "competitor" },
      { pos: 9, domain: "youtube.com", url: "https://www.youtube.com/watch?v=z8WKAaVZPyw", type: "video" },
      { pos: 10, domain: "riester.deutsche-rentenversicherung.de", url: "https://riester.deutsche-rentenversicherung.de/DE/Riester-Rechner/riester-rechner-einstieg_node", type: "official" },
    ],
    angles: [
      'Bridge-Artikel »Riester-Zulage vs. Altersvorsorgedepot-Förderung 2027« — direkter Vergleich der Zulagenhöhen, Antragswege und Steuervorteile.',
      "Interaktiver Zulagenrechner mit Vergleichsanzeige (Riester heute vs. Depot ab 2027) — keine Top-10-Seite bietet das.",
      'FAQ-Block für die High-Intent-Fragen aus den Question Keywords: »Wann wird die Riester-Zulage gutgeschrieben?«, »Wie hoch ist die Riester-Zulage?«, »Wer bekommt keine Riester-Zulage?«.',
      'Ratgeber »Riester pausieren statt kündigen — und 2027 ins Depot wechseln« (passt zur Riester-Transfer-Policy).',
      "Schema.org `FAQPage` + `HowTo` Markup für die Zulagen-Schritte — Behörden-Seiten haben das nicht.",
    ],
    ourEdge: "Top-10 ist dominiert von Behörden (statisch, schwer aktualisiert) und Versicherern (eigeninteressiert). Eine unabhängige, aktuelle Vergleichsseite mit Rechner und 2027-Perspektive füllt eine echte Lücke.",
  },
  {
    keyword: "altersvorsorgedepot",
    volume: "3.600 / Monat",
    difficulty: "23/100",
    difficultyLabel: "leicht",
    results: [
      { pos: 1, domain: "bundesfinanzministerium.de", url: "https://www.bundesfinanzministerium.de/Content/DE/FAQ/reform-der-privaten-altersvorsorge.html", type: "official" },
      { pos: 2, domain: "finanztip.de", url: "https://www.finanztip.de/altersvorsorge/altersvorsorgedepot-rechner/", type: "media" },
      { pos: 3, domain: "bundestag.de", url: "https://www.bundestag.de/dokumente/textarchiv/2026/kw13-de-altersvorsorge-1156798", type: "official" },
      { pos: 4, domain: "union-investment.de", url: "https://www.union-investment.de/altersvorsorge/altersvorsorge_im_ueberblick/altersvorsorgedepot", type: "competitor" },
      { pos: 5, domain: "de.scalable.capital", url: "https://de.scalable.capital/altersvorsorgedepot", type: "fintech" },
      { pos: 6, domain: "ing.de", url: "https://www.ing.de/wissen/altersvorsorgedepot/", type: "bank" },
      { pos: 7, domain: "dkb.de", url: "https://www.dkb.de/finanzwissen/altersvorsorgedepot", type: "bank" },
      { pos: 8, domain: "growney.de", url: "https://growney.de/blog/altersvorsorgedepot-2027-vor-und-nachteile", type: "fintech" },
      { pos: 9, domain: "youtube.com", url: "https://www.youtube.com/shorts/Dia7G-yqF08", type: "video" },
      { pos: 10, domain: "fincite.de", url: "https://www.fincite.de/blog/altersvorsorgedepot", type: "competitor" },
    ],
    angles: [
      '»Altersvorsorgedepot 2027 — alle Regeln nach Beschluss vom 27.03.2026« als Hub-Seite mit Verweis auf Drs. 21/4996 (mehr juristische Tiefe als Finanztip, aktueller als BMF-FAQ).',
      "Interaktiver Endkapital-Rechner inkl. Förderung — Finanztip hat einen Rechner, aber ohne Kinderzulage und Berufseinsteiger-Bonus differenziert.",
      'Vergleichstabelle »Altersvorsorgedepot bei den Anbietern« (Scalable, ING, DKB, Union Investment) — neutrale, anbieterunabhängige Gegenüberstellung der 1,0%-Kostendeckel-Produkte.',
      "PDF-Auswertung als Lead-Magnet — hat keiner der Top-10.",
      "Video-Erklärbeiträge in eigene Seite einbetten + Transkript — bedient die Video-Intent in Position 9.",
      "Themen-Cluster: Auszahlung, Förderung, vs. Riester, vs. ETF — bereits aufgebaut, gezielt intern verlinken auf /altersvorsorgedepot.",
    ],
    ourEdge: "KD nur 23/100 — sehr gut erreichbar. Vorteil gegenüber Behörden: aktueller, mit Rechner. Vorteil gegenüber Banken/Fintechs: unabhängig (kein Produktverkauf). Sweet Spot.",
  },
  {
    keyword: "altersvorsorge",
    volume: "18.100 / Monat",
    difficulty: "46/100",
    difficultyLabel: "anspruchsvoll",
    results: [
      { pos: 1, domain: "de.wikipedia.org", url: "https://de.wikipedia.org/wiki/Altersvorsorge", type: "wiki" },
      { pos: 2, domain: "deutsche-rentenversicherung.de", url: "https://www.deutsche-rentenversicherung.de/DRV/DE/Rente/Allgemeine-Informationen/Drei-Saeulen-der-Altersvorsorge/drei-saeulen-der-altersvorsorge_node.html", type: "official" },
      { pos: 3, domain: "finanztip.de", url: "https://www.finanztip.de/altersvorsorge/", type: "media" },
      { pos: 4, domain: "verbraucherzentrale.de", url: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/altersvorsorge", type: "official" },
      { pos: 5, domain: "bundesfinanzministerium.de", url: "https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Steuerarten/Lohnsteuer/Private-Altersvorsorge/private-altersvorsorge.html", type: "official" },
      { pos: 6, domain: "stiftung-warentest.de", url: "https://www.test.de/thema/altersvorsorge/", type: "media" },
      { pos: 7, domain: "allianz.de", url: "https://www.allianz.de/vorsorge/altersvorsorge/", type: "competitor" },
      { pos: 8, domain: "ing.de", url: "https://www.ing.de/wissen/altersvorsorge/", type: "bank" },
      { pos: 9, domain: "finanzfluss.de", url: "https://www.finanzfluss.de/geldanlage/altersvorsorge/", type: "fintech" },
      { pos: 10, domain: "youtube.com", url: "https://www.youtube.com/results?search_query=altersvorsorge", type: "video" },
    ],
    angles: [
      'Hub-Seite »Altersvorsorge 2026/2027 — der komplette Überblick nach der Reform« als zentrale Landingpage mit Drei-Säulen-Modell + neuem Altersvorsorgedepot.',
      'Interaktiver Entscheidungsbaum »Welche Altersvorsorge passt zu mir?« nach Alter, Familienstand, Einkommen — keiner der Top-10 hat ein interaktives Tool.',
      "Vergleichstabelle aller Vorsorge-Formen 2027 (gesetzlich, Depot, bAV, Riester-Bestand, Rürup, ETF) mit Förderquote, Bindung, Kosten und Steuern.",
      "Zielgruppen-Cluster (Berufseinsteiger, Familien, Selbstständige, 50+) — Wikipedia und Behörden bieten nur generische Inhalte.",
      "Aktualitäts-Hebel: Reform-Updates aus Drs. 21/4996 prominent platziert. Wikipedia und BMF aktualisieren langsamer.",
      "Schema.org `Article` + `FAQPage` + `BreadcrumbList`, jährlich aktualisierter `dateModified`-Timestamp für News-Boost.",
    ],
    ourEdge: "KD 46/100 ist anspruchsvoll, aber die Top-10 ist breit und unspezifisch (Wikipedia, Behörden, Versicherer). Mit der Reform-Aktualität (2027) und einem echten interaktiven Tool gibt es einen klaren Differenzierungs-Hebel — kein Top-10-Ergebnis kombiniert beides.",
  },
];

const AdminCompetitorsPage = () => {
  return (
    <AdminLayout title="Wettbewerbs-Analyse">
      <p className="text-sm text-muted-foreground mb-6">
        Snapshot der Google-Top-10 (Semrush, Datenbank DE) für die wichtigsten Förder-Keywords. Stand: {SNAPSHOT_DATE}.
      </p>

      <div className="space-y-8">
        {KEYWORDS.map((kw) => (
          <Card key={kw.keyword} className="p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
              <h2 className="text-lg sm:text-xl font-bold">"{kw.keyword}"</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="secondary">Volumen: {kw.volume}</Badge>
                <Badge variant="secondary">KD: {kw.difficulty} ({kw.difficultyLabel})</Badge>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* SERP */}
              <div>
                <h3 className="text-sm font-semibold mb-3 inline-flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-primary" /> Aktuelle Top-10
                </h3>
                <ol className="space-y-1.5">
                  {kw.results.map((r) => {
                    const meta = TYPE_LABEL[r.type];
                    return (
                      <li key={r.pos} className="flex items-start gap-2 text-sm">
                        <span className="w-6 shrink-0 text-muted-foreground tabular-nums">#{r.pos}</span>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1 break-all"
                        >
                          {r.domain}
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                        <span className={`ml-auto shrink-0 text-[10px] px-1.5 py-0.5 rounded ${meta.tone}`}>
                          {meta.label}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Angles */}
              <div>
                <h3 className="text-sm font-semibold mb-3 inline-flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-primary" /> Content-Angles, um zu überholen
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed">
                  {kw.angles.map((a, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary shrink-0">•</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 p-3 rounded-lg bg-disclaimer text-disclaimer-foreground text-sm">
                  <div className="font-semibold mb-1 inline-flex items-center gap-1.5">
                    <Target className="w-4 h-4" /> Unser Vorteil
                  </div>
                  <p className="leading-relaxed">{kw.ourEdge}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-8">
        Quelle: Semrush SERP-Analyse, Datenbank DE. Aktualisierung manuell durch erneute Auswertung.
      </p>
    </AdminLayout>
  );
};

export default AdminCompetitorsPage;
