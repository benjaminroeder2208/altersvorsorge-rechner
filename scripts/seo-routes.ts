// SSOT für Prerendering. Wird von scripts/prerender.ts gelesen.
// Pflege bei neuen Routen: hier Eintrag ergänzen + sitemap.xml aktualisieren.

export interface SeoRoute {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  ogType?: "website" | "article";
  ogImage?: string;
  jsonLd?: Record<string, unknown>[];
  /** true = noindex,nofollow – Route wird prerendert, aber NICHT in sitemap erwartet. */
  noindex?: boolean;
}

export const BASE_URL = "https://altersvorsorge-rechner.com";
export const SITE_NAME = "altersvorsorge-rechner.com";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

const article = (title: string, description: string): Record<string, unknown>[] => [
  {
    "@type": "Article",
    headline: title,
    description,
    publisher: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
  },
];

const webPage = (title: string, description: string, path: string): Record<string, unknown>[] => [
  {
    "@type": "WebPage",
    name: title,
    description,
    url: `${BASE_URL}${path}`,
    isPartOf: { "@type": "WebSite", url: `${BASE_URL}/`, name: SITE_NAME },
  },
];

export const ROUTES: SeoRoute[] = [
  {
    path: "/",
    title: "Altersvorsorgedepot Rechner",
    description:
      "Berechne mit dem kostenlosen Altersvorsorgedepot-Rechner deine staatliche Förderung, Endkapital und Steuervorteil nach dem Reformgesetz vom 27.03.2026.",
    h1: "Altersvorsorgedepot Rechner",
    intro:
      "Berechne kostenlos und unabhängig, wie sich monatliche Beiträge bis zur Rente entwickeln, wie hoch deine staatliche Förderung ausfällt und welcher Steuervorteil dir bleibt – nach dem Altersvorsorgereformgesetz (beschlossen 27.03.2026).",
    jsonLd: [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: `${BASE_URL}/`,
        potentialAction: {
          "@type": "SearchAction",
          target: `${BASE_URL}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: `${BASE_URL}/`,
      },
    ],
  },
  {
    path: "/altersvorsorgedepot",
    title: "Altersvorsorgedepot – Hub: Förderung, Auszahlung, Vergleich",
    description:
      "Übersicht zum geplanten Altersvorsorgedepot: Förderung, Auszahlung, Vergleich mit ETF-Sparplan und Riester sowie der Gesetzesstand vom 27.03.2026.",
    h1: "Altersvorsorgedepot – Übersicht",
    intro:
      "Alles Wichtige zum Altersvorsorgedepot: staatliche Förderung, Auszahlungsregeln, Vergleich mit ETF-Sparplan und Riester sowie der aktuelle Gesetzesstand.",
    jsonLd: webPage(
      "Altersvorsorgedepot",
      "Hub-Seite zu Förderung, Auszahlung, Gesetz und Vergleichen rund um das Altersvorsorgedepot.",
      "/altersvorsorgedepot",
    ),
  },
  {
    path: "/altersvorsorgedepot-foerderung",
    title: "Altersvorsorgedepot Förderung",
    description:
      "50 % Grundförderung bis 360 €, 25 % bis 1.800 €, 100 % Kinderzulage: So funktioniert die staatliche Förderung des Altersvorsorgedepots ab 2027.",
    h1: "Altersvorsorgedepot Förderung",
    intro:
      "Die staatliche Förderung im Altersvorsorgedepot besteht aus Grundzulage, erhöhter Förderung für höhere Beiträge und einer Kinderzulage. Erfahre, wie viel der Staat zu deinen Beiträgen dazugibt.",
    jsonLd: webPage(
      "Altersvorsorgedepot Förderung",
      "Staatliche Zulagen im Altersvorsorgedepot: Grundzulage, erhöhte Förderung und Kinderzulage.",
      "/altersvorsorgedepot-foerderung",
    ),
  },
  {
    path: "/altersvorsorgedepot-auszahlung",
    title: "Altersvorsorgedepot Auszahlung – So funktioniert die Rentenphase",
    description:
      "Wie funktioniert die Auszahlung beim Altersvorsorgedepot? Rentenbeginn 65–70, monatliche Rente bis mind. 85 und bis zu 30 % Kapitalentnahme erklärt.",
    h1: "Altersvorsorgedepot Auszahlung",
    intro:
      "Die Auszahlungsphase des Altersvorsorgedepots beginnt frühestens mit 65 und spätestens mit 70 Jahren. Bis zu 30 % können als Einmalzahlung entnommen werden, der Rest als monatliche Rente.",
    jsonLd: webPage(
      "Altersvorsorgedepot Auszahlung",
      "Rentenbeginn, Auszahlungsplan und Kapitalentnahme beim Altersvorsorgedepot.",
      "/altersvorsorgedepot-auszahlung",
    ),
  },
  {
    path: "/altersvorsorgedepot-gesetz",
    title: "Altersvorsorgedepot Gesetz – Reformgesetz vom 27.03.2026",
    description:
      "Das Altersvorsorgereformgesetz (Drs. 21/4996) wurde am 27.03.2026 beschlossen. Was im Gesetz steht, ab wann es gilt und welche Eckpunkte für Sparer wichtig sind.",
    h1: "Altersvorsorgedepot Gesetz",
    intro:
      "Mit dem Altersvorsorgereformgesetz schafft der Gesetzgeber den Rahmen für das Altersvorsorgedepot. Hier findest du die Eckpunkte, den Zeitplan und die Quellen zum offiziellen Gesetz.",
    jsonLd: webPage(
      "Altersvorsorgedepot Gesetz",
      "Eckpunkte des Altersvorsorgereformgesetzes (Drs. 21/4996), beschlossen am 27.03.2026.",
      "/altersvorsorgedepot-gesetz",
    ),
  },
  {
    path: "/altersvorsorgedepot-vs-etf-sparplan",
    title: "Altersvorsorgedepot vs. ETF-Sparplan – Der ehrliche Vergleich",
    description:
      "Altersvorsorgedepot oder klassischer ETF-Sparplan? Förderung, Steuern, Flexibilität und Auszahlung im direkten Vergleich – mit Beispielrechnung.",
    h1: "Altersvorsorgedepot vs. ETF-Sparplan",
    intro:
      "Wann lohnt sich das Altersvorsorgedepot gegenüber dem klassischen ETF-Sparplan? Wir vergleichen Förderung, Steuern, Flexibilität und Auszahlung sachlich – ohne Empfehlung.",
    jsonLd: webPage(
      "Altersvorsorgedepot vs. ETF-Sparplan",
      "Vergleich von Altersvorsorgedepot und ETF-Sparplan in Förderung, Steuern und Flexibilität.",
      "/altersvorsorgedepot-vs-etf-sparplan",
    ),
  },
  {
    path: "/altersvorsorgedepot-vs-riester",
    title: "Altersvorsorgedepot vs. Riester – Was ändert sich für Sparer?",
    description:
      "Altersvorsorgedepot oder Riester-Rente? Unterschiede bei Förderung, Aktienquote, Kosten, Auszahlung und Übertragbarkeit alter Riester-Verträge im Überblick.",
    h1: "Altersvorsorgedepot vs. Riester",
    intro:
      "Das Altersvorsorgedepot ersetzt nicht Riester, ergänzt es aber strukturell. Wir zeigen die Unterschiede bei Förderung, Aktienquote, Kosten und Auszahlung.",
    jsonLd: webPage(
      "Altersvorsorgedepot vs. Riester",
      "Unterschiede zwischen Altersvorsorgedepot und der Riester-Rente.",
      "/altersvorsorgedepot-vs-riester",
    ),
  },
  {
    path: "/rentenluecken-rechner",
    title: "Rentenlückenrechner – Rentenlücke kostenlos berechnen",
    description:
      "Berechne kostenlos deine persönliche Rentenlücke aus Nettoeinkommen, Inflation und gesetzlicher Rente – mit transparenten Annahmen und ohne Anmeldung.",
    h1: "Rentenlückenrechner",
    intro:
      "Wie viel fehlt dir später? Mit dem Rentenlückenrechner ermittelst du die Differenz zwischen deinem heutigen Nettoeinkommen und der voraussichtlichen gesetzlichen Rente.",
    jsonLd: webPage(
      "Rentenlückenrechner",
      "Persönliche Rentenlücke kostenlos und transparent berechnen.",
      "/rentenluecken-rechner",
    ),
  },
  {
    path: "/renten-check",
    title: "Renten-Check – Reicht meine Rente? In 3 Schritten prüfen",
    description:
      "Prüfe in 3 schnellen Schritten, ob deine Rente später reicht. Anonymer, kostenloser Renten-Check ohne Anmeldung – mit individueller Auswertung.",
    h1: "Renten-Check",
    intro:
      "Drei kurze Fragen genügen, um eine erste Einschätzung zu deiner Rentensituation zu erhalten. Anonym, kostenlos, ohne Anmeldung.",
    jsonLd: webPage(
      "Renten-Check",
      "3-Schritt-Quickcheck zur Frage: Reicht meine Rente?",
      "/renten-check",
    ),
  },
  {
    path: "/reicht-meine-rente",
    title: "Reicht meine Rente? – So findest du es heraus",
    description:
      "Reicht meine Rente später aus? Was die gesetzliche Rente leistet, wie groß deine Rentenlücke wirklich ist und wie du sie sicher schließen kannst.",
    h1: "Reicht meine Rente?",
    intro:
      "Die meisten Menschen unterschätzen ihre Rentenlücke. Wir erklären, was die gesetzliche Rente realistisch leistet und wie du deine Lücke sauber berechnest.",
    jsonLd: webPage(
      "Reicht meine Rente?",
      "Erklärseite und Quickcheck zur Frage, ob die spätere Rente ausreicht.",
      "/reicht-meine-rente",
    ),
  },
  {
    path: "/newsletter",
    title: "Kostenlose Altersvorsorge-Checkliste – 3 Szenarien als PDF",
    description:
      "Hol dir die kostenlose Altersvorsorge-Checkliste mit 3 konkreten Szenarien als PDF. Ohne Werbung, ohne Datenverkauf, jederzeit abbestellbar.",
    h1: "Kostenlose Altersvorsorge-Checkliste",
    intro:
      "Drei konkrete Szenarien, eine klare Checkliste, eine PDF zum Mitnehmen. Trag dich ein und bekomme deine Checkliste per E-Mail.",
    jsonLd: webPage(
      "Newsletter & Checkliste",
      "Kostenlose Altersvorsorge-Checkliste mit 3 Szenarien als PDF.",
      "/newsletter",
    ),
  },
  {
    path: "/einbetten",
    title: "Altersvorsorgedepot Rechner einbetten – kostenloser Iframe",
    description:
      "Bette den Altersvorsorgedepot-Rechner kostenlos auf deiner Website ein. Kopiere den Iframe-Code und integriere den Rechner in wenigen Minuten.",
    h1: "Rechner auf deiner Website einbetten",
    intro:
      "Du betreibst eine Website rund um Finanzen, Versicherungen oder Verbraucherschutz? Bette den Altersvorsorgedepot-Rechner kostenlos per Iframe ein.",
    jsonLd: webPage(
      "Rechner einbetten",
      "Iframe-Einbettung des Altersvorsorgedepot-Rechners für externe Websites.",
      "/einbetten",
    ),
  },
  {
    path: "/impressum",
    title: "Impressum – altersvorsorge-rechner.com",
    description: "Impressum und Anbieterkennzeichnung von altersvorsorge-rechner.com nach § 5 TMG.",
    h1: "Impressum",
    intro: "Anbieterkennzeichnung gemäß § 5 TMG.",
    jsonLd: webPage("Impressum", "Anbieterkennzeichnung nach § 5 TMG.", "/impressum"),
    noindex: true,
  },
  {
    path: "/datenschutz",
    title: "Datenschutzerklärung – altersvorsorge-rechner.com",
    description:
      "Datenschutzerklärung von altersvorsorge-rechner.com: Welche Daten verarbeitet werden, warum, und welche Rechte du hast.",
    h1: "Datenschutzerklärung",
    intro: "Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
    jsonLd: webPage(
      "Datenschutzerklärung",
      "Datenschutzhinweise nach DSGVO.",
      "/datenschutz",
    ),
    noindex: true,
  },
  {
    path: "/blog",
    title: "Blog – Altersvorsorgedepot Ratgeber & Analysen",
    description:
      "Aktuelle Artikel, Analysen und Ratgeber rund um Altersvorsorgedepot, Rentenlücke, ETF-Sparpläne und gesetzliche Rente.",
    h1: "Blog",
    intro:
      "Ratgeberartikel zu Altersvorsorgedepot, Rentenlücke, ETFs, Riester, Rürup und gesetzlicher Rente – sachlich, unabhängig und auf dem Stand des aktuellen Gesetzes.",
    jsonLd: [
      {
        "@type": "Blog",
        name: "altersvorsorge-rechner.com Blog",
        url: `${BASE_URL}/blog`,
      },
    ],
  },
  // BLOG ARTIKEL
  ...blogArticles(),
];

function blogArticles(): SeoRoute[] {
  const a = (
    slug: string,
    title: string,
    description: string,
    h1: string,
    intro: string,
  ): SeoRoute => ({
    path: `/blog/${slug}`,
    title,
    description,
    h1,
    intro,
    ogType: "article",
    jsonLd: article(title, description),
  });

  return [
    a(
      "altersvorsorgedepot-beschlossen",
      "Altersvorsorgedepot beschlossen – Das ändert sich ab 2027",
      "Der Bundestag hat am 27.03.2026 das Altersvorsorgereformgesetz beschlossen. Die wichtigsten Eckpunkte und was sich für Sparer ab 2027 ändert.",
      "Altersvorsorgedepot beschlossen",
      "Am 27.03.2026 hat der Bundestag das Altersvorsorgereformgesetz beschlossen. Wir fassen die Eckpunkte verständlich zusammen.",
    ),
    a(
      "altersvorsorgedepot-2027",
      "Altersvorsorgedepot ab 2027 – Förderung, Steuern, Auszahlung",
      "Was ändert sich beim Altersvorsorgedepot ab 2027? Förderung, Steuerregeln, Auszahlungsphase und Übergangsregeln im Überblick.",
      "Altersvorsorgedepot ab 2027",
      "Ab 2027 startet das Altersvorsorgedepot. Wir zeigen, was sich gegenüber Riester ändert und worauf du beim Start achten solltest.",
    ),
    a(
      "altersvorsorgedepot-koalitionseinigung",
      "Altersvorsorgedepot – Die Koalitionseinigung im Detail",
      "Die Koalitionseinigung zum Altersvorsorgedepot im Detail: Eckpunkte, Förderhöhen, Aktienquote und Auszahlungsregeln verständlich erklärt.",
      "Koalitionseinigung zum Altersvorsorgedepot",
      "Wir analysieren die Koalitionseinigung zum Altersvorsorgedepot und erklären die wichtigsten Punkte.",
    ),
    a(
      "altersvorsorgedepot-vs-etf-sparplan",
      "Altersvorsorgedepot vs. ETF-Sparplan – Was lohnt sich mehr?",
      "Altersvorsorgedepot oder ETF-Sparplan: In welcher Situation lohnt sich was? Förderung, Steuern und Flexibilität im direkten Vergleich.",
      "Altersvorsorgedepot vs. ETF-Sparplan",
      "Ein klassischer ETF-Sparplan ist flexibel, das Altersvorsorgedepot bringt Förderung. Wir vergleichen beide ehrlich.",
    ),
    a(
      "altersvorsorgedepot-vs-riester",
      "Altersvorsorgedepot vs. Riester – Was ist besser?",
      "Altersvorsorgedepot oder Riester: Wie unterscheiden sich Förderung, Aktienquote, Kosten und Auszahlung? Klarer Vergleich für Sparer.",
      "Altersvorsorgedepot vs. Riester",
      "Riester war komplex und renditeschwach. Wie das Altersvorsorgedepot es besser machen will – und wo es weiter Schwächen gibt.",
    ),
    a(
      "was-darf-ins-altersvorsorgedepot",
      "Was darf ins Altersvorsorgedepot? – ETFs, Aktien, Fonds",
      "Welche Wertpapiere dürfen ins Altersvorsorgedepot? ETFs, Aktien, Fonds – wir erklären die Anlageregeln und Grenzen.",
      "Was darf ins Altersvorsorgedepot?",
      "Nicht jedes Wertpapier ist im Altersvorsorgedepot zulässig. Wir zeigen, welche Anlagen erlaubt sind.",
    ),
    a(
      "altersvorsorge-portfolio",
      "Altersvorsorge-Portfolio aufbauen – So geht's richtig",
      "Wie baust du ein robustes Altersvorsorge-Portfolio auf? Aktienquote, Diversifikation, Kosten und langfristige Strategie erklärt.",
      "Altersvorsorge-Portfolio aufbauen",
      "Ein gutes Altersvorsorge-Portfolio ist breit gestreut, kostengünstig und langfristig ausgelegt. So baust du es auf.",
    ),
    a(
      "altersvorsorge-30-jahre",
      "Altersvorsorge mit 30 – Jetzt clever vorsorgen",
      "Wer mit 30 mit der Altersvorsorge startet, hat den Zinseszins voll auf seiner Seite. Strategien, Beträge und Produkte im Überblick.",
      "Altersvorsorge mit 30",
      "Mit 30 hast du noch 35+ Jahre Zinseszins vor dir. So nutzt du diesen Vorsprung richtig.",
    ),
    a(
      "altersvorsorge-ab-40",
      "Altersvorsorge ab 40 – Jetzt aufholen",
      "Mit 40 ist der Start in die Altersvorsorge nicht zu spät. Strategien zum Aufholen, realistische Renditeerwartungen und Beispielrechnung.",
      "Altersvorsorge ab 40",
      "Mit 40 bleibt noch genug Zeit, um eine relevante Rentenlücke zu schließen – wenn du systematisch vorgehst.",
    ),
    a(
      "altersvorsorge-50-jahre",
      "Altersvorsorge mit 50 – Was jetzt noch geht",
      "Altersvorsorge mit 50: Welche Optionen es noch gibt, wie viel monatlich nötig ist und welche Produkte sich kurz vor der Rente eignen.",
      "Altersvorsorge mit 50",
      "Mit 50 wird die Zeit knapper. Welche Stellschrauben dir bleiben und worauf es jetzt ankommt.",
    ),
    a(
      "altersvorsorge-berufseinsteiger",
      "Altersvorsorge für Berufseinsteiger – Schritt für Schritt",
      "Berufseinstieg geschafft? So baust du als Berufseinsteiger eine solide Altersvorsorge auf – mit konkreten Schritten und Beispielen.",
      "Altersvorsorge für Berufseinsteiger",
      "Direkt zum Berufsstart vorsorgen lohnt sich am meisten. Wir zeigen, wie du als Einsteiger startest.",
    ),
    a(
      "altersvorsorge-fuer-frauen",
      "Altersvorsorge für Frauen – Rentenlücke gezielt schließen",
      "Frauen haben statistisch eine größere Rentenlücke. Wie du sie als Frau gezielt schließt – mit konkreten Strategien und Beispielen.",
      "Altersvorsorge für Frauen",
      "Teilzeit, Care-Arbeit, Erwerbslücken: Frauen haben strukturell eine größere Rentenlücke. So gleichst du sie aus.",
    ),
    a(
      "altersvorsorge-fuer-freiberufler",
      "Altersvorsorge für Freiberufler – Pflicht und Optionen",
      "Freiberufler stehen oft ohne gesetzliche Rente da. Welche Pflichten gelten und welche privaten Optionen sich für Selbstständige lohnen.",
      "Altersvorsorge für Freiberufler",
      "Als Freiberufler bist du selbst für deine Altersvorsorge verantwortlich. Wir zeigen Pflichten und sinnvolle Optionen.",
    ),
    a(
      "altersvorsorge-selbststaendige",
      "Altersvorsorge für Selbstständige – Sicher in die Rente",
      "Selbstständige müssen ihre Altersvorsorge selbst aufbauen. Welche Bausteine sich kombinieren lassen und worauf zu achten ist.",
      "Altersvorsorge für Selbstständige",
      "Ohne gesetzliche Rente musst du selbst vorsorgen. Welche Bausteine sich für Selbstständige kombinieren lassen.",
    ),
    a(
      "altersvorsorge-berechnen",
      "Altersvorsorge berechnen – So ermittelst du deinen Bedarf",
      "Wie viel Altersvorsorge brauchst du? So berechnest du deinen monatlichen Spar­bedarf, deine Rentenlücke und deine Zielrente.",
      "Altersvorsorge berechnen",
      "Mit einer einfachen Formel und realistischen Annahmen berechnest du deinen tatsächlichen Vorsorgebedarf.",
    ),
    a(
      "betriebliche-altersvorsorge",
      "Betriebliche Altersvorsorge – Lohnt sich die bAV?",
      "Lohnt sich die betriebliche Altersvorsorge wirklich? Förderung, Steuer- und Sozialabgabenersparnis und die typischen Fallstricke.",
      "Betriebliche Altersvorsorge",
      "Die bAV bringt Steuervorteile, kann aber auch teuer werden. Wir zeigen, wann sie sich wirklich lohnt.",
    ),
    a(
      "etf-sparplan-anfaenger",
      "ETF-Sparplan für Anfänger – Schritt-für-Schritt-Anleitung",
      "Wie startest du als Anfänger einen ETF-Sparplan? Auswahl, Broker, Sparrate und Steuern – alles in einer Anleitung erklärt.",
      "ETF-Sparplan für Anfänger",
      "Ein ETF-Sparplan ist der einfachste Einstieg in den Vermögensaufbau. So startest du Schritt für Schritt.",
    ),
    a(
      "etf-sparplan-steuern",
      "ETF-Sparplan und Steuern – Vorabpauschale & Co. erklärt",
      "Wie werden ETF-Sparpläne in Deutschland besteuert? Vorabpauschale, Teilfreistellung und Freistellungsauftrag verständlich erklärt.",
      "ETF-Sparplan und Steuern",
      "Vorabpauschale, Teilfreistellung, Freistellungsauftrag: So funktioniert die Besteuerung von ETF-Sparplänen.",
    ),
    a(
      "rentenlucke-berechnen",
      "Rentenlücke berechnen – So ermittelst du deine Lücke",
      "Mit einer einfachen Formel berechnest du deine Rentenlücke. Wir erklären die Schritte, typische Fehler und liefern den Rechner dazu.",
      "Rentenlücke berechnen",
      "Die Rentenlücke ist die Differenz zwischen Wunschrente und gesetzlicher Rente. So rechnest du sauber.",
    ),
    a(
      "rentenlucke-mit-30-40-50",
      "Rentenlücke mit 30, 40 und 50 – Beispiele zum Aufholen",
      "Wie groß ist die Rentenlücke typischerweise mit 30, 40 oder 50 Jahren? Beispiele und konkrete Aufhol-Strategien.",
      "Rentenlücke mit 30, 40 und 50",
      "Wir zeigen Beispielrechnungen für drei Lebensphasen und welche Sparrate die Lücke realistisch schließt.",
    ),
    a(
      "rentenlucke-was-sie-ist-und-was-du-tun-kannst",
      "Rentenlücke – Was sie ist und was du tun kannst",
      "Was ist die Rentenlücke und wie schließt du sie? Definition, Ursachen und konkrete Strategien zur Vorsorge erklärt.",
      "Was ist die Rentenlücke?",
      "Die Rentenlücke ist eines der größten finanziellen Risiken in Deutschland. Wir erklären sie verständlich.",
    ),
    a(
      "rentenpunkte-kaufen",
      "Rentenpunkte kaufen – Lohnt sich die freiwillige Einzahlung?",
      "Rentenpunkte freiwillig kaufen: Wann sich die Einzahlung in die gesetzliche Rente lohnt – mit Beispielrechnung und Steueraspekten.",
      "Rentenpunkte kaufen",
      "Freiwillige Einzahlungen können steuerlich attraktiv sein. Wir prüfen, wann sich der Kauf von Rentenpunkten lohnt.",
    ),
    a(
      "riester-kuendigen",
      "Riester kündigen oder ruhen lassen? Das ist besser",
      "Solltest du deinen Riester-Vertrag kündigen? Warum Ruhenlassen meist besser ist und welche Kosten beim Kündigen entstehen.",
      "Riester kündigen?",
      "Eine Kündigung kostet die Förderung. Warum Ruhenlassen meist die bessere Wahl ist – und wann nicht.",
    ),
    a(
      "ruerup-rente",
      "Rürup-Rente – Für wen lohnt sich die Basisrente?",
      "Rürup-Rente erklärt: Wie sie funktioniert, für wen sie sich lohnt und welche Steuervorteile die Basisrente bietet.",
      "Rürup-Rente",
      "Die Rürup-Rente bietet hohe Steuervorteile, ist aber unflexibel. Für wen sie sich tatsächlich rechnet.",
    ),
    a(
      "steuern-sparen-altersvorsorge",
      "Steuern sparen mit Altersvorsorge – So geht's legal",
      "Welche Altersvorsorge-Produkte sparen wirklich Steuern? Sonderausgabenabzug, Förderung und Auszahlungsbesteuerung erklärt.",
      "Steuern sparen mit Altersvorsorge",
      "Altersvorsorge ist eines der wirksamsten Steuersparmodelle. Wir zeigen die Hebel.",
    ),
    a(
      "wie-viel-geld-braucht-man-im-alter",
      "Wie viel Geld braucht man im Alter? – Realistisch geschätzt",
      "Wie viel Geld brauchst du wirklich im Alter? Faustformeln, Lebenshaltungskosten und Inflation realistisch eingeschätzt.",
      "Wie viel Geld brauchst du im Alter?",
      "Eine Faustformel ist nett, eine ehrliche Rechnung ist besser. So schätzt du deinen tatsächlichen Bedarf ein.",
    ),
    a(
      "wie-viel-rente-reicht-aus",
      "Wie viel Rente reicht aus? – So findest du deinen Bedarf",
      "Wie viel Rente brauchst du, damit dein Lebensstandard gehalten wird? Wir zeigen Methoden und konkrete Beispielrechnungen.",
      "Wie viel Rente reicht aus?",
      "80 % vom Netto, 70 %, 100 %? Welche Quote realistisch ist und was du wirklich rechnen solltest.",
    ),
    a(
      "zinseszins-frueh-starten",
      "Zinseszins – Warum früh starten so viel ausmacht",
      "Der Zinseszins ist der mächtigste Hebel beim Vermögensaufbau. Mit Beispielen, Tabellen und einer einfachen Faustregel erklärt.",
      "Zinseszins: Früh starten lohnt sich",
      "Wer früh anfängt, lässt das Geld für sich arbeiten. Wir zeigen den Effekt mit konkreten Zahlen.",
    ),
  ];
}
