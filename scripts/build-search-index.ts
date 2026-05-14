/**
 * Build-time site search index.
 *
 * Reads the SSOT routes (`scripts/seo-routes.ts`) and, for blog routes,
 * extracts the rendered German body text from the matching React component
 * by stripping JSX/JS expressions.
 *
 * Output: public/search-index.json — fetched at runtime by /suche.
 *
 * Excluded: noindex routes, /admin/*, /embed/*.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { ROUTES } from "./seo-routes";

const ROOT = resolve(import.meta.dir ?? __dirname, "..");
const APP_TSX = resolve(ROOT, "src/App.tsx");
const PAGES_DIR = resolve(ROOT, "src/pages");
const OUT = resolve(ROOT, "public/search-index.json");

interface IndexEntry {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  body: string;
  kind: "page" | "blog";
}

/** Map blog slug -> page component name from <Route path="/blog/..." element={<Comp/>}/> */
function getBlogComponentMap(): Map<string, string> {
  const src = readFileSync(APP_TSX, "utf8");
  const map = new Map<string, string>();
  const re = /<Route\s+[^>]*path=["'](\/blog\/[^"']+)["'][^>]*element=\{<\s*(\w+)\s*\/?>\s*\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) map.set(m[1], m[2]);
  return map;
}

/** Best-effort plain-text extraction from a TSX file. */
function extractText(src: string): string {
  let out = src
    // strip imports/exports
    .replace(/^\s*(?:import|export)\b[^;]*;?$/gm, "")
    // block + line comments
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/^\s*\/\/.*$/gm, " ");

  // strip {expression} blocks (two passes for shallow nesting)
  for (let i = 0; i < 3; i++) out = out.replace(/\{[^{}]*\}/g, " ");

  // strip JSX/HTML tags
  out = out.replace(/<[^>]+>/g, " ");

  // unescape common entities
  out = out
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&shy;/g, "");

  return out.replace(/\s+/g, " ").trim();
}

function main() {
  const blogMap = getBlogComponentMap();
  const entries: IndexEntry[] = [];

  for (const r of ROUTES) {
    if (r.noindex) continue;
    if (r.path.startsWith("/admin")) continue;
    if (r.path.startsWith("/embed")) continue;

    const isBlog = r.path.startsWith("/blog/");
    let body = "";

    if (isBlog) {
      const compName = blogMap.get(r.path);
      if (compName) {
        const file = resolve(PAGES_DIR, `${compName}.tsx`);
        if (existsSync(file)) {
          body = extractText(readFileSync(file, "utf8"));
        }
      }
    }

    entries.push({
      path: r.path,
      title: r.title,
      description: r.description,
      h1: r.h1,
      intro: r.intro,
      body,
      kind: isBlog ? "blog" : "page",
    });
  }

  writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), entries }), "utf8");
  const size = (JSON.stringify(entries).length / 1024).toFixed(1);
  console.log(`✓ search-index.json — ${entries.length} entries, ${size} KB`);
}

main();
