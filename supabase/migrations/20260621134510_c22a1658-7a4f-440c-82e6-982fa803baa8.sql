
CREATE TABLE public.content_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  url_path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  page_type TEXT NOT NULL,
  topics TEXT[] NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true
);

GRANT SELECT ON public.content_pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_pages TO authenticated;
GRANT ALL ON public.content_pages TO service_role;

ALTER TABLE public.content_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active content pages"
  ON public.content_pages FOR SELECT
  USING (active = true);

CREATE POLICY "Authenticated can insert content pages"
  ON public.content_pages FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update content pages"
  ON public.content_pages FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can delete content pages"
  ON public.content_pages FOR DELETE TO authenticated
  USING (true);

CREATE INDEX content_pages_topics_idx ON public.content_pages USING GIN (topics);
CREATE INDEX content_pages_active_idx ON public.content_pages (active);

INSERT INTO public.content_pages (url_path, title, summary, page_type, topics) VALUES
('/blog/altersvorsorge-30-jahre', 'Altersvorsorge mit 30', 'Wie du mit 30 startest und den Zinseszins-Effekt voll nutzt.', 'blog', ARRAY['berufseinsteiger','30er','start']),
('/blog/altersvorsorge-50-jahre', 'Altersvorsorge mit 50', 'Welche Optionen kurz vor der Rente noch realistisch sind.', 'blog', ARRAY['spaeter_start','50er']),
('/blog/altersvorsorge-ab-40', 'Altersvorsorge ab 40', 'Strategien zum Aufholen, wenn der Start später kommt.', 'blog', ARRAY['40er','aufholen']),
('/blog/altersvorsorge-berechnen', 'Altersvorsorge berechnen', 'So ermittelst du deinen monatlichen Sparbedarf und deine Zielrente.', 'blog', ARRAY['berechnung','sparbedarf']),
('/blog/altersvorsorge-berufseinsteiger', 'Altersvorsorge für Berufseinsteiger', 'Schritt-für-Schritt-Einstieg für den Berufsstart.', 'blog', ARRAY['berufseinsteiger','start']),
('/blog/altersvorsorge-fuer-frauen', 'Altersvorsorge für Frauen', 'Warum Frauen oft eine größere Rentenlücke haben und wie sie sie schließen.', 'blog', ARRAY['frauen','rentenluecke']),
('/blog/altersvorsorge-fuer-freiberufler', 'Altersvorsorge für Freiberufler', 'Pflichten und private Optionen für Selbstständige ohne gesetzliche Rente.', 'blog', ARRAY['selbststaendige','freiberufler']),
('/blog/altersvorsorge-portfolio', 'Altersvorsorge-Portfolio aufbauen', 'Aktienquote, Diversifikation und Kosten für ein robustes Portfolio.', 'blog', ARRAY['portfolio','etf','diversifikation']),
('/blog/altersvorsorge-selbststaendige', 'Altersvorsorge für Selbstständige', 'Welche Bausteine sich für Selbstständige sinnvoll kombinieren lassen.', 'blog', ARRAY['selbststaendige']),
('/blog/altersvorsorgedepot-2027', 'Altersvorsorgedepot ab 2027', 'Förderung, Steuerregeln und Auszahlungsphase im Überblick.', 'blog', ARRAY['altersvorsorgedepot','2027','foerderung']),
('/blog/altersvorsorgedepot-beschlossen', 'Altersvorsorgedepot beschlossen', 'Die wichtigsten Eckpunkte des am 27.03.2026 beschlossenen Gesetzes.', 'blog', ARRAY['altersvorsorgedepot','gesetz']),
('/blog/altersvorsorgedepot-koalitionseinigung', 'Die Koalitionseinigung im Detail', 'Eckpunkte, Förderhöhen und Aktienquote verständlich erklärt.', 'blog', ARRAY['altersvorsorgedepot','gesetz']),
('/blog/altersvorsorgedepot-vs-etf-sparplan', 'Altersvorsorgedepot vs. ETF-Sparplan', 'Förderung, Steuern und Flexibilität im direkten Vergleich.', 'blog', ARRAY['altersvorsorgedepot','etf','vergleich']),
('/blog/altersvorsorgedepot-vs-riester', 'Altersvorsorgedepot vs. Riester', 'Unterschiede bei Förderung, Aktienquote, Kosten und Auszahlung.', 'blog', ARRAY['altersvorsorgedepot','riester','vergleich']),
('/blog/betriebliche-altersvorsorge', 'Betriebliche Altersvorsorge (bAV)', 'Lohnt sich die bAV? Förderung, Steuer- und Sozialabgabenersparnis erklärt.', 'blog', ARRAY['bav','arbeitgeber']),
('/blog/etf-sparplan-anfaenger', 'ETF-Sparplan für Anfänger', 'Auswahl, Broker und Sparrate Schritt für Schritt erklärt.', 'blog', ARRAY['etf','anfaenger']),
('/blog/etf-sparplan-steuern', 'ETF-Sparplan und Steuern', 'Vorabpauschale, Teilfreistellung und Freistellungsauftrag verständlich erklärt.', 'blog', ARRAY['etf','steuern']),
('/blog/fruehstart-rente', 'Frühstart-Rente', 'Wie Eltern ihre Kinder mit der neuen Frühstart-Rente früh fördern können.', 'blog', ARRAY['kinder','fruehstart','familie']),
('/blog/rentenlucke-berechnen', 'Rentenlücke berechnen', 'Mit einer einfachen Formel die eigene Rentenlücke ermitteln.', 'blog', ARRAY['rentenluecke','berechnung']),
('/blog/rentenlucke-mit-30-40-50', 'Rentenlücke mit 30, 40 und 50', 'Typische Rentenlücken in verschiedenen Lebensphasen mit Aufhol-Strategien.', 'blog', ARRAY['rentenluecke','altersgruppen']),
('/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst', 'Rentenlücke – was sie ist', 'Definition, Ursachen und konkrete Strategien zur Vorsorge.', 'blog', ARRAY['rentenluecke','grundlagen']),
('/blog/rentenpunkte-kaufen', 'Rentenpunkte kaufen', 'Wann sich die freiwillige Einzahlung in die gesetzliche Rente lohnt.', 'blog', ARRAY['gesetzliche_rente','rentenpunkte']),
('/blog/riester-kuendigen', 'Riester kündigen oder ruhen lassen?', 'Warum Ruhenlassen meist die bessere Option ist.', 'blog', ARRAY['riester']),
('/blog/riester-rente', 'Riester-Rente 2026', 'Lohnt sich Riester noch? Alternativen und Fakten im Überblick.', 'blog', ARRAY['riester']),
('/blog/ruerup-rente', 'Rürup-Rente', 'Für wen sich die Basisrente lohnt und welche Steuervorteile sie bietet.', 'blog', ARRAY['ruerup','selbststaendige']),
('/blog/steuern-sparen-altersvorsorge', 'Steuern sparen mit Altersvorsorge', 'Sonderausgabenabzug, Förderung und Auszahlungsbesteuerung erklärt.', 'blog', ARRAY['steuern']),
('/blog/was-darf-ins-altersvorsorgedepot', 'Was darf ins Altersvorsorgedepot?', 'ETFs, Aktien und Fonds — die Anlageregeln und Grenzen erklärt.', 'blog', ARRAY['altersvorsorgedepot','anlage']),
('/blog/wie-viel-geld-braucht-man-im-alter', 'Wie viel Geld braucht man im Alter?', 'Faustformeln und realistische Einschätzung der Lebenshaltungskosten.', 'blog', ARRAY['bedarf','lebenshaltung']),
('/blog/wie-viel-rente-reicht-aus', 'Wie viel Rente reicht aus?', 'Methoden, um den eigenen Rentenbedarf realistisch einzuschätzen.', 'blog', ARRAY['rentenbedarf']),
('/blog/zinseszins-frueh-starten', 'Zinseszins – warum früh starten zählt', 'Der mächtigste Hebel beim Vermögensaufbau, mit Beispielen erklärt.', 'blog', ARRAY['zinseszins','frueh_starten']),
('/altersvorsorgedepot', 'Altersvorsorgedepot – Übersicht', 'Hub-Seite zu Förderung, Auszahlung und Vergleich des Altersvorsorgedepots.', 'hub', ARRAY['altersvorsorgedepot','uebersicht']),
('/altersvorsorgedepot-auszahlung', 'Altersvorsorgedepot Auszahlung', 'Wie die Auszahlungsphase ab Renteneintritt funktioniert.', 'hub', ARRAY['altersvorsorgedepot','auszahlung']),
('/altersvorsorgedepot-foerderung', 'Altersvorsorgedepot Förderung', 'Grundzulage, Zusatzzulage und Kinderzulage im Detail erklärt.', 'hub', ARRAY['altersvorsorgedepot','foerderung']),
('/altersvorsorgedepot-gesetz', 'Altersvorsorgedepot Gesetz', 'Der Gesetzestext und die Eckpunkte des Reformgesetzes vom 27.03.2026.', 'hub', ARRAY['altersvorsorgedepot','gesetz']),
('/altersvorsorgedepot-vs-etf-sparplan', 'Altersvorsorgedepot vs. ETF-Sparplan (Hub)', 'Förderung, Steuern und Auszahlung im direkten Vergleich.', 'hub', ARRAY['altersvorsorgedepot','etf','vergleich']),
('/altersvorsorgedepot-vs-riester', 'Altersvorsorgedepot vs. Riester (Hub)', 'Aktienquote, Kosten und Übertragbarkeit alter Riester-Verträge.', 'hub', ARRAY['altersvorsorgedepot','riester','vergleich']),
('/rentenluecken-rechner', 'Rentenlücken-Rechner', 'Berechne deine persönliche Rentenlücke aus Einkommen und gesetzlicher Rente.', 'rechner', ARRAY['rentenluecke','rechner']),
('/fruehstart-rente-rechner', 'Frühstart-Rente Rechner', 'Berechne, wie viel dein Kind mit der Frühstart-Rente bis zur Rente spart.', 'rechner', ARRAY['kinder','fruehstart','rechner']),
('/riester-vergleich-rechner', 'Riester vs. Altersvorsorgedepot Rechner', 'Vergleiche dein Vermögen nach 30 Jahren mit beiden Systemen.', 'rechner', ARRAY['riester','vergleich','rechner']),
('/renten-check', 'Renten-Check', 'In 3 Schritten anonym prüfen, ob die eigene Rente später reicht.', 'rechner', ARRAY['rentencheck','rechner']);
