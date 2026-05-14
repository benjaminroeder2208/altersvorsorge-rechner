/**
 * CI/Build-Check: Konsistenz zwischen indexierbaren Routen, sitemap.xml und robots.txt.
 *
 * Fehlerfälle (Exit 1):
 *  1. Eine indexierbare Route (in scripts/seo-routes.ts ROUTES) fehlt in public/sitemap.xml.
 *  2. Ein sitemap-Eintrag wird in robots.txt per Disallow blockiert (Widerspruch).
 *  3. Eine indexierbare Route ist per Disallow in robots.txt blockiert.
 *  4. Ein sitemap-Eintrag verweist auf eine Route, die nicht (mehr) als indexierbar geführt wird.
 *
 * Wird via `prebuild` automatisch im Build und in CI ausgeführt.
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import { ROUTES, BASE_URL } from "./seo-routes";

const SITEMAP_PATH = resolve("public/sitemap.xml");
const ROBOTS_PATH = resolve("public/robots.txt");

function parseSitemapPaths(xml: string): string[] {
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return locs.map((loc) => {
    try {
      return new URL(loc).pathname.replace(/\/$/, "") || "/";
    } catch {
      return loc;
    }
  });
}

function parseRobotsDisallow(txt: string): string[] {
  // Sammle alle Disallow-Regeln des `*`-Blocks (bzw. globalen Blocks).
  const lines = txt.split(/\r?\n/);
  const rules: string[] = [];
  let inStarBlock = true; // default: vor dem ersten User-agent zählen wir als globaler Kontext nicht
  let sawUA = false;
  for (const raw of lines) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const ua = line.match(/^User-agent:\s*(.+)$/i);
    if (ua) {
      sawUA = true;
      inStarBlock = ua[1].trim() === "*";
      continue;
    }
    if (!sawUA) continue;
    if (!inStarBlock) continue;
    const dis = line.match(/^Disallow:\s*(.*)$/i);
    if (dis && dis[1].trim()) rules.push(dis[1].trim());
  }
  return rules;
}

function norm(p: string): string {
  return (p.replace(/\/$/, "") || "/").toLowerCase();
}

function isBlockedBy(path: string, disallows: string[]): string | null {
  const p = norm(path);
  for (const rule of disallows) {
    const r = norm(rule);
    if (p === r || p.startsWith(r + "/")) return rule;
  }
  return null;
}

const errors: string[] = [];
const warnings: string[] = [];

const sitemapXml = readFileSync(SITEMAP_PATH, "utf8");
const robotsTxt = readFileSync(ROBOTS_PATH, "utf8");

const sitemapPaths = parseSitemapPaths(sitemapXml).map(norm);
const sitemapSet = new Set(sitemapPaths);
const disallows = parseRobotsDisallow(robotsTxt);
const indexableRoutes = ROUTES.filter((r) => !r.noindex).map((r) => norm(r.path));
const indexableSet = new Set(indexableRoutes);
const noindexRoutes = new Set(ROUTES.filter((r) => r.noindex).map((r) => norm(r.path)));

// 1. Indexierbare Route fehlt in sitemap?
for (const route of indexableRoutes) {
  if (!sitemapSet.has(route)) {
    errors.push(`Indexierbare Route ${route} fehlt in public/sitemap.xml`);
  }
}

// 2./3. Widerspruch: sitemap- oder indexierbare Route ist in robots.txt geblockt
for (const route of indexableRoutes) {
  const blockedBy = isBlockedBy(route, disallows);
  if (blockedBy) {
    errors.push(
      `Indexierbare Route ${route} ist in robots.txt durch "Disallow: ${blockedBy}" blockiert`,
    );
  }
}
for (const sp of sitemapPaths) {
  const blockedBy = isBlockedBy(sp, disallows);
  if (blockedBy) {
    errors.push(`Sitemap-Eintrag ${sp} ist in robots.txt durch "Disallow: ${blockedBy}" blockiert`);
  }
}

// 4. Sitemap-Eintrag, der nicht in der ROUTES-SSOT auftaucht (Hinweis: Blog-Routen werden hier nicht
// erfasst, daher nur Warnung statt Fehler).
for (const sp of sitemapPaths) {
  if (!indexableSet.has(sp) && !sp.startsWith("/blog")) {
    if (noindexRoutes.has(sp)) {
      errors.push(`Sitemap-Eintrag ${sp} ist als noindex markiert (Widerspruch)`);
      continue;
    }
    warnings.push(`Sitemap-Eintrag ${sp} ist nicht in ROUTES (scripts/seo-routes.ts) gelistet`);
  }
}

// Prüfe Base-URL stimmt
const wrongBase = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1])
  .filter((loc) => !loc.startsWith(BASE_URL));
if (wrongBase.length) {
  errors.push(
    `${wrongBase.length} sitemap-Einträge verwenden nicht BASE_URL=${BASE_URL}: ${wrongBase
      .slice(0, 3)
      .join(", ")}${wrongBase.length > 3 ? " …" : ""}`,
  );
}

if (warnings.length) {
  console.warn("⚠️  Sitemap/robots Hinweise:");
  for (const w of warnings) console.warn("  - " + w);
}

if (errors.length) {
  console.error("❌ Sitemap/robots Konsistenzfehler:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log(
  `✅ Sitemap/robots konsistent – ${indexableRoutes.length} indexierbare Routen, ${sitemapPaths.length} sitemap-Einträge, ${disallows.length} Disallow-Regeln.`,
);
