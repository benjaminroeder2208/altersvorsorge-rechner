/**
 * Live-Monitoring: prüft, dass
 *   1. https://altersvorsorge-rechner.com/sitemap.xml erreichbar ist (200)
 *   2. jede sitemap-loc HTTP 200 liefert (kein 404/500/Redirect-Schleife)
 *   3. alle in CRITICAL_ROUTES gelisteten Pflichtrouten in der sitemap stehen
 *
 * Exit 1 bei Fehler → bricht den GitHub-Actions-Job ab und löst Notification aus.
 */
const SITE = process.env.MONITOR_BASE_URL || "https://altersvorsorge-rechner.com";
const SITEMAP_URL = `${SITE}/sitemap.xml`;

/** Routen, die NIE aus der sitemap verschwinden dürfen. */
const CRITICAL_ROUTES = [
  "/",
  "/altersvorsorgedepot",
  "/altersvorsorgedepot-foerderung",
  "/altersvorsorgedepot-auszahlung",
  "/altersvorsorgedepot-gesetz",
  "/rentenluecken-rechner",
  "/renten-check",
  "/blog",
];

const TIMEOUT_MS = 15_000;
const CONCURRENCY = 6;

async function fetchWithTimeout(url: string, init?: RequestInit) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal, redirect: "manual" });
  } finally {
    clearTimeout(t);
  }
}

async function pool<T>(items: T[], n: number, fn: (x: T) => Promise<void>) {
  const it = items[Symbol.iterator]();
  const workers = Array.from({ length: n }, async () => {
    for (const item of it as unknown as Iterable<T>) await fn(item);
  });
  await Promise.all(workers);
}

const errors: string[] = [];

console.log(`🔎 Monitoring ${SITE}`);
const sitemapRes = await fetchWithTimeout(SITEMAP_URL);
if (sitemapRes.status !== 200) {
  console.error(`❌ sitemap.xml liefert HTTP ${sitemapRes.status}`);
  process.exit(1);
}
const xml = await sitemapRes.text();
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const paths = new Set(locs.map((l) => new URL(l).pathname));
console.log(`   sitemap.xml: ${locs.length} URLs`);

// 1. Pflicht-Routen vorhanden?
for (const route of CRITICAL_ROUTES) {
  if (!paths.has(route) && !paths.has(route + "/")) {
    errors.push(`Kritische Route ${route} fehlt in sitemap.xml`);
  }
}

// 2. Status-Codes prüfen
const results: Array<{ url: string; status: number }> = [];
await pool(locs, CONCURRENCY, async (url) => {
  try {
    const res = await fetchWithTimeout(url, { method: "GET" });
    results.push({ url, status: res.status });
    if (res.status !== 200) {
      errors.push(`${url} → HTTP ${res.status}`);
    }
  } catch (e) {
    errors.push(`${url} → Fetch-Fehler: ${(e as Error).message}`);
  }
});

const ok = results.filter((r) => r.status === 200).length;
console.log(`   ${ok}/${locs.length} URLs liefern 200`);

if (errors.length) {
  console.error(`\n❌ Monitoring fehlgeschlagen (${errors.length} Probleme):`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log(`\n✅ Alle ${locs.length} sitemap-URLs OK; ${CRITICAL_ROUTES.length} Pflichtrouten vorhanden.`);
