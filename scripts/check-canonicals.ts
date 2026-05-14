/**
 * Postbuild-Validator: jede sitemap-URL hat im prerenderten HTML genau eine
 * <link rel="canonical">, die exakt auf die sitemap-loc zeigt. Erkennt:
 *  - fehlende prerenderte HTML-Datei
 *  - fehlendes canonical-Tag
 *  - mehrere widersprüchliche canonical-Tags
 *  - canonical zeigt auf andere URL als sitemap-loc
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const SITEMAP_PATH = resolve("public/sitemap.xml");
const DIST = resolve("dist");

function parseSitemapLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function htmlPathFor(pathname: string): string {
  if (pathname === "/" || pathname === "") return resolve(DIST, "index.html");
  return resolve(DIST, pathname.replace(/^\//, ""), "index.html");
}

function extractCanonicals(html: string): string[] {
  const re = /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi;
  const tags = html.match(re) ?? [];
  return tags
    .map((t) => t.match(/\bhref=["']([^"']+)["']/i)?.[1])
    .filter((h): h is string => Boolean(h));
}

const errors: string[] = [];
const xml = readFileSync(SITEMAP_PATH, "utf8");
const locs = parseSitemapLocs(xml);

if (!existsSync(DIST)) {
  console.warn(`⚠️  dist/ existiert nicht – Canonical-Validierung übersprungen.`);
  process.exit(0);
}

let checked = 0;
for (const loc of locs) {
  const url = new URL(loc);
  const file = htmlPathFor(url.pathname);
  if (!existsSync(file)) {
    errors.push(`Sitemap-loc ${loc} hat kein prerenderter HTML unter ${file}`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const canonicals = extractCanonicals(html);
  if (canonicals.length === 0) {
    errors.push(`Sitemap-loc ${loc} – HTML hat KEIN <link rel="canonical">`);
    continue;
  }
  const unique = [...new Set(canonicals)];
  if (unique.length > 1) {
    errors.push(
      `Sitemap-loc ${loc} – HTML hat ${canonicals.length} widersprüchliche canonicals: ${unique.join(", ")}`,
    );
    continue;
  }
  if (canonicals.length > 1) {
    errors.push(
      `Sitemap-loc ${loc} – HTML hat ${canonicals.length}× dasselbe canonical (Duplikat): ${unique[0]}`,
    );
    continue;
  }
  if (unique[0] !== loc) {
    errors.push(`Sitemap-loc ${loc} ↔ canonical ${unique[0]} stimmen nicht überein`);
    continue;
  }
  checked++;
}

if (errors.length) {
  console.error("❌ Canonical-Validierung fehlgeschlagen:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log(`✅ Canonicals konsistent – ${checked}/${locs.length} sitemap-URLs validiert.`);
