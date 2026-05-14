// Postbuild-Prerendering: erzeugt pro Route eine statische dist/<path>/index.html
// mit Meta-Tags, OG/Twitter, JSON-LD und einem H1+Intro-Fallback im Body.
// React hydratisiert nach JS-Load und ersetzt den Fallback transparent.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { ROUTES, BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE, type SeoRoute } from "./seo-routes";

const DIST = resolve("dist");
const TEMPLATE_PATH = resolve(DIST, "index.html");

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s: string): string {
  return escapeHtml(s);
}

function buildHead(route: SeoRoute): string {
  const url = `${BASE_URL}${route.path}`;
  const ogImageRaw = route.ogImage || DEFAULT_OG_IMAGE;
  const ogImage = ogImageRaw.startsWith("http")
    ? ogImageRaw
    : `${BASE_URL}${ogImageRaw.startsWith("/") ? "" : "/"}${ogImageRaw}`;
  const ogType = route.ogType || "website";

  const lines = [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeAttr(route.description)}" />`,
    `<meta name="robots" content="index,follow" />`,
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />`,
    `<meta property="og:locale" content="de_DE" />`,
    `<meta property="og:image" content="${escapeAttr(ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(route.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttr(route.title)}" />`,
  ];

  if (route.jsonLd?.length) {
    for (const item of route.jsonLd) {
      const json = JSON.stringify({ "@context": "https://schema.org", ...item });
      lines.push(
        `<script type="application/ld+json">${json.replace(/</g, "\\u003c")}</script>`,
      );
    }
  }

  return lines.join("\n    ");
}

function buildBodyFallback(route: SeoRoute): string {
  // Statisches HTML in #root als SEO/Social-Fallback. React ersetzt es nach Hydration.
  // Inline-Styles, weil Tailwind erst nach JS aktiv ist.
  return `
      <div style="max-width:720px;margin:0 auto;padding:48px 24px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a;line-height:1.6">
        <h1 style="font-size:32px;font-weight:700;letter-spacing:-0.02em;margin:0 0 16px">${escapeHtml(route.h1)}</h1>
        <p style="font-size:17px;color:#475569;margin:0 0 24px">${escapeHtml(route.intro)}</p>
        <p style="font-size:14px;color:#64748b">
          <a href="/" style="color:#1B4FD8;text-decoration:none">Zur Startseite</a> ·
          <a href="/altersvorsorgedepot" style="color:#1B4FD8;text-decoration:none">Altersvorsorgedepot</a> ·
          <a href="/rentenluecken-rechner" style="color:#1B4FD8;text-decoration:none">Rentenlückenrechner</a> ·
          <a href="/blog" style="color:#1B4FD8;text-decoration:none">Blog</a>
        </p>
      </div>`;
}

function injectIntoTemplate(template: string, route: SeoRoute): string {
  let html = template;

  // 1) Head: vor </head> einfügen.
  // Vorhandene <title> aus dem Template entfernen, falls Vite eine generiert hat.
  html = html.replace(/<title>[\s\S]*?<\/title>\s*/i, "");
  const headTags = buildHead(route);
  html = html.replace(/<\/head>/i, `    ${headTags}\n  </head>`);

  // 2) Body: <div id="root"></div> mit Fallback befüllen.
  html = html.replace(
    /<div id="root">\s*<\/div>/i,
    `<div id="root">${buildBodyFallback(route)}</div>`,
  );

  return html;
}

function writeRoute(template: string, route: SeoRoute) {
  const out = injectIntoTemplate(template, route);
  // / -> dist/index.html, /foo -> dist/foo/index.html, /foo/bar -> dist/foo/bar/index.html
  const target =
    route.path === "/"
      ? resolve(DIST, "index.html")
      : resolve(DIST, route.path.replace(/^\//, ""), "index.html");

  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, out, "utf8");
}

function main() {
  if (!existsSync(TEMPLATE_PATH)) {
    console.error(`[prerender] dist/index.html nicht gefunden – wird vite build vorher ausgeführt?`);
    process.exit(1);
  }
  const template = readFileSync(TEMPLATE_PATH, "utf8");

  let count = 0;
  for (const route of ROUTES) {
    writeRoute(template, route);
    count++;
  }
  console.log(`[prerender] ${count} statische Routen erzeugt.`);
}

main();
