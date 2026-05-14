# Plan: Statisches Prerendering für Crawler & Social Previews

## Ziel
Jede öffentliche Route soll im **Quellcode** (View-Source, ohne JS) folgendes enthalten:
- Korrekten `<title>`, `<meta description>`, `<link rel="canonical">`
- Vollständige Open-Graph- und Twitter-Tags
- JSON-LD Structured Data
- Statischen H1 + kurzer Intro-Text als SEO/Social-Fallback

Damit funktionieren LinkedIn/WhatsApp/Slack-Previews, ChatGPT/Perplexity sehen Inhalt, Bing indexiert ohne JS und View-Source ist „professionell". React übernimmt nach Hydration ganz normal — der Fallback wird ersetzt.

## Ansatz
Statt echtes SSR (sehr invasiv mit den vielen `window`/Browser-APIs) bauen wir ein **head-only Prerendering** mit statischem Body-Fallback. Funktioniert deterministisch ohne Browser/Puppeteer im Build.

## Was gebaut wird

### 1. Zentrale SEO-Registry
Neue Datei `scripts/seo-routes.ts` als Single Source of Truth für alle Routen:
```
{ path, title, description, h1, intro, ogImage?, ogType?, jsonLd?, robots? }
```
- Enthält alle indexierbaren Routen (Startseite, Hub, Förderung, Auszahlung, Gesetz, vs-ETF, vs-Riester, Rentenlücke-Rechner, Renten-Check, Reicht-meine-Rente, Newsletter, Einbetten, Impressum, Datenschutz, Blog-Index + alle 27 Blog-Artikel)
- noindex-Routen (Confirm, Unsubscribe, Embed, Admin, Result-Pages) bleiben außen vor

### 2. Build-Script `scripts/prerender.ts`
Läuft als `postbuild` nach `vite build`:
1. Liest `dist/index.html` als Template
2. Für jede Route in der Registry:
   - Generiert die Meta-Tags (title, description, canonical, og:*, twitter:*, robots)
   - Generiert JSON-LD Script-Tags
   - Generiert statisches `<noscript>`-freundliches HTML in `<div id="root">` mit `<h1>`, Intro-Paragraph, Link zu Hauptbereichen
   - Schreibt `dist/<path>/index.html` (z.B. `dist/altersvorsorgedepot-foerderung/index.html`)
3. Überschreibt zusätzlich `dist/index.html` mit den Tags der Startseite

### 3. NPM-Script
```json
"postbuild": "bunx tsx scripts/prerender.ts"
```
Läuft automatisch nach jedem Lovable-Publish-Build. Lokal kein Setup nötig.

### 4. PageHead-Komponente
Bleibt unverändert — sie überschreibt zur Laufzeit die statischen Tags für Googlebot (der JS rendert) und für In-App-Navigation. Statisch + Helmet ergänzen sich.

### 5. Static-Hosting-Hinweis
Die generierten Unterordner-`index.html` funktionieren auf Lovable-Hosting automatisch (SPA-Fallback fängt unbekannte Pfade auf, bekannte Pfade bekommen die statische Datei).

## Was sich nicht ändert
- Kein Refactor der React-Komponenten
- Kein neuer Stack (kein Next.js, kein TanStack Start)
- Keine Änderung an Routing, Auth, Cookiebot, GTM
- Helmet/PageHead bleiben für Client-seitige Updates

## Trade-offs / Limitationen
- **Body-Content** ist statisch nur als kurzer H1+Intro-Fallback vorhanden (nicht der vollständige Calculator etc.). Für SEO/Social genügt das; für AI-Crawler liefert llms.txt zusätzlich das volle Inhaltsverzeichnis.
- Wenn neue Routen entstehen, muss die Registry ergänzt werden (gleiche Pflege wie heute schon bei der sitemap.xml).
- Hydration: React 18 hydratisiert auch wenn das Initial-HTML abweicht (es wird einmalig client-rendert ersetzt) — kein Konflikt.

## Verifikation nach Implementierung
1. `bun run build` lokal in der Sandbox ausführen
2. `cat dist/altersvorsorgedepot-foerderung/index.html` — muss korrekten Title, Description, OG-Tags und H1 enthalten
3. Stichproben: Startseite, ein Blog-Artikel, eine Hub-Seite

## Aufwand
~30–45 Minuten Implementierung. Ein neues Script + ein npm-Hook + eine Registry-Datei. Kein bestehender Code wird gebrochen.
