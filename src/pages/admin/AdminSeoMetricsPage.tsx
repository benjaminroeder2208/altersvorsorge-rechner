import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertTriangle, ExternalLink, Search as SearchIcon, X, Settings } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ROUTES as SSOT_ROUTES, BASE_URL } from "../../../scripts/seo-routes";
import {
  loadSeoSettings,
  getLimitsForRoute,
  getExpectedOgType,
} from "@/lib/seoSettings";

interface MetricRow {
  path: string;
  title: string;
  description: string;
  ogType: "website" | "article";
  source: "SSOT" | "Blog";
  sourceFile: string;
}

interface Suggestion {
  field: string;
  value: string;
  note?: string;
}

type ViolationType =
  | "title-missing"
  | "title-too-long"
  | "desc-missing"
  | "desc-too-long"
  | "desc-too-short"
  | "ogtype-should-article"
  | "ogtype-should-website";

interface Violation {
  type: ViolationType;
  message: string;
  severity: number;
}

const VIOLATION_LABELS: Record<ViolationType, string> = {
  "title-missing": "Titel fehlt",
  "title-too-long": "Titel zu lang",
  "desc-missing": "Description fehlt",
  "desc-too-long": "Description zu lang",
  "desc-too-short": "Description zu kurz",
  "ogtype-should-article": "ogType sollte 'article' sein",
  "ogtype-should-website": "ogType sollte 'website' sein",
};

interface RowWithViolations extends MetricRow {
  titleLen: number;
  descLen: number;
  violations: Violation[];
  suggestions: Suggestion[];
  blogOptimizations: Suggestion[];
  severity: number;
  limits: { titleMin: number; titleMax: number; descMin: number; descMax: number };
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const severityBucket = (s: number): { label: string; cls: string } => {
  if (s === 0) return { label: "OK", cls: "bg-emerald-500/10 text-emerald-700" };
  if (s <= 2) return { label: "Niedrig", cls: "bg-amber-500/10 text-amber-700" };
  if (s <= 5) return { label: "Mittel", cls: "bg-orange-500/10 text-orange-700" };
  return { label: "Hoch", cls: "bg-destructive/10 text-destructive" };
};

// Eagerly load all Blog page sources as raw text. Vite resolves this at build
// time, so the bundle stays self-contained.
const blogSources = import.meta.glob("/src/pages/Blog*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function extractAttr(src: string, attr: string): string | null {
  // Match attr="..."  (allows escaped quotes inside)
  const re = new RegExp(`${attr}\\s*=\\s*"((?:[^"\\\\]|\\\\.)*)"`);
  const m = src.match(re);
  return m ? m[1] : null;
}

function extractPathConstant(src: string): string | null {
  const m = src.match(/const\s+PATH\s*=\s*"([^"]+)"/);
  return m ? m[1] : null;
}

function parseBlogSources(): MetricRow[] {
  const rows: MetricRow[] = [];
  for (const [file, src] of Object.entries(blogSources)) {
    if (file.endsWith("BlogIndexPage.tsx")) continue; // hub, in SSOT
    if (!src.includes("<PageHead")) continue;

    // Slice from <PageHead to its closing /> so attrs from other JSX don't leak in
    const start = src.indexOf("<PageHead");
    const end = src.indexOf("/>", start);
    const head = end > 0 ? src.slice(start, end) : src.slice(start);

    const title = extractAttr(head, "title") ?? "";
    const description = extractAttr(head, "description") ?? "";
    const ogType = (extractAttr(head, "ogType") as "article" | "website" | null) ?? "website";
    const path = extractPathConstant(src) ?? file;

    const sourceFile = file.replace(/^\//, "");
    rows.push({ path, title, description, ogType, source: "Blog", sourceFile });
  }
  return rows;
}

function buildRows(settings: ReturnType<typeof loadSeoSettings>): RowWithViolations[] {
  const ssot: MetricRow[] = SSOT_ROUTES.filter((r) => !r.noindex).map((r) => ({
    path: r.path,
    title: r.title,
    description: r.description,
    ogType: r.ogType ?? "website",
    source: "SSOT",
    sourceFile: "scripts/seo-routes.ts",
  }));

  const all = [...ssot, ...parseBlogSources()];
  // dedupe by path; SSOT wins
  const byPath = new Map<string, MetricRow>();
  for (const r of all) if (!byPath.has(r.path)) byPath.set(r.path, r);

  return Array.from(byPath.values())
    .map((r) => {
      const limits = getLimitsForRoute(settings, r.path);
      const titleLen = r.title.length;
      const descLen = r.description.length;
      const violations: Violation[] = [];
      const suggestions: Suggestion[] = [];

      if (titleLen === 0) {
        violations.push({ type: "title-missing", message: "Titel fehlt", severity: 5 });
      } else if (titleLen > limits.titleMax) {
        const sev = clamp(1 + Math.ceil((titleLen - limits.titleMax) / 4), 1, 4);
        violations.push({
          type: "title-too-long",
          message: `Titel zu lang (${titleLen} > ${limits.titleMax})`,
          severity: sev,
        });
        suggestions.push({ field: "title", value: shortenTitle(r.title, limits.titleMax) });
      }

      if (descLen === 0) {
        violations.push({ type: "desc-missing", message: "Description fehlt", severity: 4 });
      } else if (descLen < limits.descMin) {
        const sev = clamp(1 + Math.ceil((limits.descMin - descLen) / 15), 1, 3);
        violations.push({
          type: "desc-too-short",
          message: `Description zu kurz (${descLen} < ${limits.descMin})`,
          severity: sev,
        });
        suggestions.push({
          field: "description",
          value: r.description,
          note: `Um ≥ ${limits.descMin - descLen} Zeichen erweitern – z. B. konkreten Nutzen, Förderhöhe oder CTA ergänzen.`,
        });
      } else if (descLen > limits.descMax) {
        const sev = clamp(1 + Math.ceil((descLen - limits.descMax) / 15), 1, 3);
        violations.push({
          type: "desc-too-long",
          message: `Description zu lang (${descLen} > ${limits.descMax})`,
          severity: sev,
        });
        suggestions.push({ field: "description", value: shortenDescription(r.description, limits.descMax) });
      }

      const expectedOg = getExpectedOgType(settings, r.path);
      if (expectedOg === "article" && r.ogType !== "article") {
        violations.push({
          type: "ogtype-should-article",
          message: "ogType sollte 'article' sein",
          severity: 2,
        });
        suggestions.push({ field: "ogType", value: 'ogType="article"' });
      } else if (expectedOg === "website" && r.ogType !== "website") {
        violations.push({
          type: "ogtype-should-website",
          message: "ogType sollte 'website' sein",
          severity: 1,
        });
        suggestions.push({ field: "ogType", value: 'ogType="website"' });
      }

      const severity = violations.reduce((sum, v) => sum + v.severity, 0);
      const isBlog2 = r.path.startsWith("/blog/");
      const blogOptimizations = isBlog2
        ? buildBlogOptimizations(r.title, r.description, limits)
        : [];
      return { ...r, titleLen, descLen, violations, suggestions, blogOptimizations, severity, limits };
    })
    .sort((a, b) => {
      if (a.severity !== b.severity) return b.severity - a.severity;
      return a.path.localeCompare(b.path);
    });
}

/**
 * Heuristik: Erst an Trennzeichen kürzen (–, —, -, :, |), dabei den
 * Marken-/Brand-Teil bevorzugt entfernen. Falls weiterhin zu lang,
 * an Wortgrenze hart kürzen und mit "…" terminieren.
 */
function shortenTitle(title: string, max: number): string {
  if (title.length <= max) return title;
  const seps = [" – ", " — ", " - ", ": ", " | "];
  for (const sep of seps) {
    const idx = title.lastIndexOf(sep);
    if (idx > 0) {
      const head = title.slice(0, idx).trim();
      if (head.length <= max && head.length >= 20) return head;
    }
  }
  // Hard cut an Wortgrenze
  const cut = title.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 30 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

/**
 * Heuristik: Bevorzugt am letzten Satzende (., !, ?) vor `max` schneiden.
 * Falls keines vorhanden ist, an Wortgrenze kürzen und mit "…" beenden.
 */
function shortenDescription(desc: string, max: number): string {
  if (desc.length <= max) return desc;
  const slice = desc.slice(0, max);
  const sentenceEnds = [". ", "! ", "? "];
  let bestEnd = -1;
  for (const s of sentenceEnds) {
    const i = slice.lastIndexOf(s);
    if (i > bestEnd) bestEnd = i + 1; // include punctuation
  }
  if (bestEnd > 60) return desc.slice(0, bestEnd).trim();
  const cut = desc.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

/**
 * Blog-spezifische Optimierungsvorschläge: deterministische Varianten für
 * Title und Meta-Description, die innerhalb der SEO-Limits bleiben und sich
 * vom aktuellen Wert unterscheiden. Sortiert nach erwartetem CTR-Impact.
 */
function buildBlogOptimizations(
  title: string,
  description: string,
  limits: { titleMax: number; descMin: number; descMax: number },
): Suggestion[] {
  const TITLE_MAX = limits.titleMax;
  const DESC_MIN = limits.descMin;
  const DESC_MAX = limits.descMax;
  const out: Suggestion[] = [];
  const CURRENT_YEAR = "2026";
  const TITLE_TARGET_MIN = 50;
  const DESC_TARGET_MIN = 140;

  // ---------- Titel-Varianten ----------
  const titleHasYear = /\b20\d{2}\b/.test(title);
  const baseTitle = title.replace(/\s+\|\s+.*$/, "").trim();

  // 1) Jahr-Suffix für Aktualitätssignal
  if (!titleHasYear) {
    const v = `${baseTitle} ${CURRENT_YEAR}`;
    if (v.length <= TITLE_MAX && v !== title) {
      out.push({
        field: "title",
        value: v,
        note: "Aktualitäts-Signal: Jahreszahl steigert CTR in der SERP.",
      });
    } else {
      const vp = `${baseTitle} (${CURRENT_YEAR})`;
      if (vp.length <= TITLE_MAX && vp !== title) {
        out.push({
          field: "title",
          value: vp,
          note: "Aktualitäts-Signal: Jahreszahl in Klammern.",
        });
      }
    }
  }

  // 2) Brand-/Ratgeber-Suffix für Kontext
  if (!/\bRatgeber\b|\| /.test(title)) {
    const v = `${baseTitle} | Ratgeber`;
    if (v.length <= TITLE_MAX && v !== title && baseTitle.length < TITLE_MAX - 11) {
      out.push({
        field: "title",
        value: v,
        note: "Kontext-Signal: kennzeichnet die Seite als redaktionellen Ratgeber.",
      });
    }
  }

  // 3) Wenn Titel zu kurz ist, kombinierter Vorschlag mit Jahr + Ratgeber
  if (title.length < TITLE_TARGET_MIN && !titleHasYear) {
    const v = `${baseTitle} ${CURRENT_YEAR} – Ratgeber`;
    if (v.length <= TITLE_MAX && v !== title) {
      out.push({
        field: "title",
        value: v,
        note: `Aktuell ${title.length} Zeichen – Ziel ${TITLE_TARGET_MIN}–${TITLE_MAX} für maximale SERP-Sichtbarkeit.`,
      });
    }
  }

  // ---------- Description-Varianten ----------
  const desc = description.trim();
  const descLen = desc.length;
  const endsWithPunct = /[.!?]$/.test(desc);

  // 1) CTA-Suffix
  const cta = " Jetzt kostenlos im Ratgeber lesen.";
  const candidate = (endsWithPunct ? desc : desc + ".") + cta;
  if (candidate.length <= DESC_MAX && candidate.length >= DESC_MIN && candidate !== desc) {
    if (descLen < DESC_TARGET_MIN || descLen < DESC_MIN + 20) {
      out.push({
        field: "description",
        value: candidate,
        note: "CTA-Suffix erhöht Klickrate und nutzt den verfügbaren Platz aus.",
      });
    }
  }

  // 2) Stand-Prefix für Aktualität
  if (!/\b20\d{2}\b|Stand /.test(desc)) {
    const prefix = `Stand ${CURRENT_YEAR}: `;
    const v = prefix + (desc.charAt(0).toLowerCase() + desc.slice(1));
    if (v.length <= DESC_MAX && v.length >= DESC_MIN) {
      out.push({
        field: "description",
        value: v,
        note: "Stand-Prefix signalisiert Aktualität nach der Reform vom 27.03.2026.",
      });
    }
  }

  // 3) Kombination: Stand + CTA falls Description deutlich zu kurz
  if (descLen < DESC_TARGET_MIN && !/\b20\d{2}\b/.test(desc)) {
    const base = (endsWithPunct ? desc : desc + ".");
    const v = `Stand ${CURRENT_YEAR}: ${base.charAt(0).toLowerCase() + base.slice(1)}${cta}`;
    if (v.length <= DESC_MAX && v.length >= DESC_TARGET_MIN && !out.some((s) => s.value === v)) {
      out.push({
        field: "description",
        value: v,
        note: `Maximale Nutzung des SERP-Snippets (${v.length}/${DESC_MAX}).`,
      });
    }
  }

  return out;
}

function lengthClass(len: number, min: number, max: number): string {
  if (len === 0) return "text-destructive font-medium";
  if (len > max) return "text-destructive font-medium";
  if (len < min) return "text-amber-600 font-medium";
  return "text-muted-foreground";
}

const SERP_TITLE_MAX = 60;
const SERP_DESC_MAX = 160;

function truncateForSerp(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

function pathToBreadcrumb(path: string): string {
  const host = BASE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (path === "/" || path === "") return host;
  const parts = path.split("/").filter(Boolean);
  return [host, ...parts].join(" › ");
}

const SerpPreview = ({
  label,
  path,
  title,
  description,
  variant = "current",
}: {
  label: string;
  path: string;
  title: string;
  description: string;
  variant?: "current" | "suggested";
}) => {
  const cls =
    variant === "suggested"
      ? "rounded-md border border-primary/30 bg-primary/5 p-2.5"
      : "rounded-md border border-border bg-card p-2.5";
  return (
    <div className={cls}>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1.5">
        {label}
      </div>
      <div className="text-[11px] text-muted-foreground leading-tight truncate">
        {pathToBreadcrumb(path)}
      </div>
      <div className="text-[15px] leading-snug mt-0.5" style={{ color: "#1a0dab" }}>
        {truncateForSerp(title || "(kein Titel)", SERP_TITLE_MAX)}
      </div>
      <div className="text-[12.5px] leading-snug mt-0.5" style={{ color: "#4d5156" }}>
        {truncateForSerp(description || "(keine Description)", SERP_DESC_MAX)}
      </div>
    </div>
  );
};

/**
 * Build a Lovable-ready prompt that performs a precise, single-file overwrite
 * of one head field (title / description / ogType) in the project source.
 * Pasting the prompt into Lovable chat triggers an instant search-replace.
 */
function buildOverwritePrompt(
  row: { path: string; source: "SSOT" | "Blog"; sourceFile: string; title: string; description: string; ogType: string },
  field: string,
  newValue: string,
): string {
  // For ogType suggestions the value comes as `ogType="article"` — strip
  // wrappers so we can quote the bare value cleanly.
  const cleaned =
    field === "ogType"
      ? newValue.replace(/^ogType="?|"?$/g, "")
      : newValue;

  if (row.source === "SSOT") {
    const oldLine =
      field === "title"
        ? `    title: ${JSON.stringify(row.title)},`
        : field === "description"
          ? `    description: ${JSON.stringify(row.description)},`
          : `    ogType: ${JSON.stringify(row.ogType)},`;
    const newLine =
      field === "ogType"
        ? `    ogType: ${JSON.stringify(cleaned)},`
        : `    ${field}: ${JSON.stringify(cleaned)},`;
    return [
      `Bitte überschreibe in der SSOT-Route "${row.path}" das Feld "${field}".`,
      ``,
      `Datei: ${row.sourceFile}`,
      `Suche im Objekt mit \`path: "${row.path}"\` nach der Zeile:`,
      `\`\`\``,
      oldLine,
      `\`\`\``,
      `Ersetze sie durch:`,
      `\`\`\``,
      newLine,
      `\`\`\``,
      `Andere Routen unverändert lassen.`,
    ].join("\n");
  }

  // Blog: PageHead attribute
  const attr = field === "ogType" ? "ogType" : field;
  const oldAttr = `${attr}="${field === "ogType" ? row.ogType : field === "title" ? row.title : row.description}"`;
  const newAttr = `${attr}="${cleaned}"`;
  return [
    `Bitte überschreibe in der Blog-Seite "${row.path}" das PageHead-Feld "${field}".`,
    ``,
    `Datei: ${row.sourceFile}`,
    `Im <PageHead …/> ersetze:`,
    `\`\`\``,
    oldAttr,
    `\`\`\``,
    `durch:`,
    `\`\`\``,
    newAttr,
    `\`\`\``,
  ].join("\n");
}

const SuggestionList = ({
  label,
  items,
  tone = "default",
  row,
}: {
  label: string;
  items: Suggestion[];
  tone?: "default" | "primary";
  row: { path: string; source: "SSOT" | "Blog"; sourceFile: string; title: string; description: string; ogType: string };
}) => {
  const [copied, setCopied] = useState<{ idx: number; kind: "value" | "patch" } | null>(null);
  const labelCls =
    tone === "primary"
      ? "text-[10px] uppercase tracking-wide text-primary font-medium"
      : "text-[10px] uppercase tracking-wide text-muted-foreground";
  const boxCls =
    tone === "primary"
      ? "rounded bg-primary/10 px-2 py-1 text-foreground break-words"
      : "rounded bg-muted/60 px-2 py-1 text-foreground break-words";

  const handleCopy = (text: string, idx: number, kind: "value" | "patch") => {
    navigator.clipboard?.writeText(text);
    setCopied({ idx, kind });
    window.setTimeout(
      () => setCopied((c) => (c && c.idx === idx && c.kind === kind ? null : c)),
      1800,
    );
  };

  return (
    <div className="space-y-1.5 pt-1.5 border-t border-border">
      <div className={labelCls}>{label}</div>
      {items.map((s, i) => {
        const valueCopied = copied?.idx === i && copied.kind === "value";
        const patchCopied = copied?.idx === i && copied.kind === "patch";
        return (
          <div key={i} className="text-xs">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <span className="text-muted-foreground">
                {s.field}
                {s.field !== "ogType" && ` (${s.value.length} Z.)`}
              </span>
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(s.value, i, "value")}
                  className="text-muted-foreground hover:text-foreground text-[11px]"
                >
                  {valueCopied ? "kopiert ✓" : "Wert"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(buildOverwritePrompt(row, s.field, s.value), i, "patch")
                  }
                  className="text-primary hover:underline text-[11px] font-medium"
                  title="Lovable-Prompt kopieren – einfügen ins Chat überschreibt die Quelldatei"
                >
                  {patchCopied ? "Patch kopiert ✓" : "→ Lovable-Patch"}
                </button>
              </span>
            </div>
            <div className={boxCls}>{s.value}</div>
            {s.note && (
              <div className="text-[11px] text-muted-foreground mt-0.5">{s.note}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const AdminSeoMetricsPage = () => {
  const settings = useMemo(loadSeoSettings, []);
  const rows = useMemo(() => buildRows(settings), [settings]);
  const violationCount = rows.filter((r) => r.violations.length > 0).length;
  const totalSeverity = rows.reduce((s, r) => s + r.severity, 0);
  const { titleMax: defTitleMax, descMin: defDescMin, descMax: defDescMax } = settings.defaults;

  // Gruppierte Summary nach Verstoßtyp
  const summary = useMemo(() => {
    const byType = new Map<ViolationType, { count: number; severity: number }>();
    for (const r of rows) {
      for (const v of r.violations) {
        const cur = byType.get(v.type) ?? { count: 0, severity: 0 };
        cur.count += 1;
        cur.severity += v.severity;
        byType.set(v.type, cur);
      }
    }
    return Array.from(byType.entries())
      .map(([type, agg]) => ({ type, ...agg }))
      .sort((a, b) => b.severity - a.severity);
  }, [rows]);

  // Filter state
  const [onlyViolations, setOnlyViolations] = useState(false);
  const [activeTypes, setActiveTypes] = useState<Set<ViolationType>>(new Set());
  const [search, setSearch] = useState("");
  const [activeSeverities, setActiveSeverities] = useState<Set<string>>(new Set());

  const toggleType = (t: ViolationType) =>
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });

  const toggleSeverity = (label: string) =>
    setActiveSeverities((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  // Counts per severity bucket (computed on full row set so disabling stays stable)
  const severityCounts = useMemo(() => {
    const counts: Record<string, number> = { OK: 0, Niedrig: 0, Mittel: 0, Hoch: 0 };
    for (const r of rows) counts[severityBucket(r.severity).label] += 1;
    return counts;
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (activeTypes.size > 0) {
        if (!r.violations.some((v) => activeTypes.has(v.type))) return false;
      } else if (onlyViolations && r.violations.length === 0) return false;
      if (activeSeverities.size > 0) {
        if (!activeSeverities.has(severityBucket(r.severity).label)) return false;
      }
      if (q) {
        const hay = `${r.path} ${r.title} ${r.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [rows, onlyViolations, activeTypes, activeSeverities, search]);

  const filterActive =
    onlyViolations ||
    activeTypes.size > 0 ||
    activeSeverities.size > 0 ||
    search.trim().length > 0;

  return (
    <>
      <Helmet>
        <title>SEO-Metriken – Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminLayout title="SEO-Metriken">
        <p className="text-sm text-muted-foreground mb-4">
          Übersicht über Title-Länge, Description-Länge und ogType pro Route. Quellen:
          {" "}
          <code>scripts/seo-routes.ts</code> (SSOT-Routen) und <code>src/pages/Blog*.tsx</code>{" "}
          (PageHead-Props). Default-Limits: Title ≤ {defTitleMax}, Description {defDescMin}–{defDescMax}. <Link to="/admin/seo/settings" className="text-primary hover:underline inline-flex items-center gap-1"><Settings className="w-3 h-3" /> anpassen</Link>.
        </p>

        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground">
            {rows.length} Routen geprüft
          </span>
          <span
            className={`px-2 py-1 rounded-md ${
              violationCount > 0
                ? "bg-destructive/10 text-destructive font-medium"
                : "bg-emerald-500/10 text-emerald-700"
            }`}
          >
            {violationCount} mit Verstößen
          </span>
          <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground">
            Gesamt-Score: <span className="font-medium text-foreground">{totalSeverity}</span>
          </span>
        </div>

        {summary.length > 0 && (
          <div className="mb-6 rounded-lg border border-border bg-card p-3 sm:p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              Verstöße nach Typ (Priorität)
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              {summary.map((s) => {
                const bucket = severityBucket(s.severity);
                return (
                  <li key={s.type} className="flex items-center justify-between gap-3">
                    <span className="text-foreground">{VIOLATION_LABELS[s.type]}</span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {s.count}× · Score {s.severity}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${bucket.cls}`}>
                        {bucket.label}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="mb-3 relative">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suche nach Pfad, Title oder Description …"
            className="w-full pl-8 pr-9 py-2 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Suche leeren"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground mr-1">
            Schweregrad
          </span>
          {(["Hoch", "Mittel", "Niedrig", "OK"] as const).map((label) => {
            const active = activeSeverities.has(label);
            const count = severityCounts[label] ?? 0;
            const disabled = count === 0;
            const bucketCls = severityBucket(
              label === "Hoch" ? 99 : label === "Mittel" ? 4 : label === "Niedrig" ? 1 : 0,
            ).cls;
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleSeverity(label)}
                disabled={disabled}
                className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                  active
                    ? `${bucketCls} border-current font-medium`
                    : "bg-background text-foreground border-border hover:bg-muted"
                } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {label}
                <span className={`ml-1 ${active ? "" : "text-muted-foreground"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
          {activeSeverities.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveSeverities(new Set())}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              alle
            </button>
          )}
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setOnlyViolations((v) => !v)}
            disabled={activeTypes.size > 0}
            className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
              onlyViolations || activeTypes.size > 0
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-muted"
            } ${activeTypes.size > 0 ? "opacity-60 cursor-not-allowed" : ""}`}
            title={activeTypes.size > 0 ? "Aktiv durch Typ-Filter" : undefined}
          >
            Nur Verstöße
          </button>
          {(Object.keys(VIOLATION_LABELS) as ViolationType[]).map((t) => {
            const active = activeTypes.has(t);
            const count = summary.find((s) => s.type === t)?.count ?? 0;
            const disabled = count === 0;
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleType(t)}
                disabled={disabled}
                className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                  active
                    ? "bg-destructive/10 text-destructive border-destructive/40"
                    : "bg-background text-foreground border-border hover:bg-muted"
                } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {VIOLATION_LABELS[t]}
                <span className="ml-1 text-muted-foreground">({count})</span>
              </button>
            );
          })}
          {filterActive && (
            <button
              type="button"
              onClick={() => {
                setOnlyViolations(false);
                setActiveTypes(new Set());
                setActiveSeverities(new Set());
                setSearch("");
              }}
              className="text-xs px-2.5 py-1 rounded-md text-muted-foreground hover:text-foreground underline"
            >
              Filter zurücksetzen
            </button>
          )}
          <span className="ml-auto text-xs text-muted-foreground">
            {filteredRows.length} / {rows.length} sichtbar
          </span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-3 py-2 font-medium">Schwere</th>
                <th className="px-3 py-2 font-medium">Pfad</th>
                <th className="px-3 py-2 font-medium">Title (Länge)</th>
                <th className="px-3 py-2 font-medium">Description (Länge)</th>
                <th className="px-3 py-2 font-medium">og:type</th>
                <th className="px-3 py-2 font-medium">Verstöße</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r) => {
                const ok = r.violations.length === 0;
                return (
                  <tr
                    key={r.path}
                    className={`border-t border-border align-top ${
                      ok ? "" : "bg-destructive/5"
                    }`}
                  >
                    <td className="px-3 py-2 whitespace-nowrap">
                      {(() => {
                        const bucket = severityBucket(r.severity);
                        return (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${bucket.cls}`}
                            title={`Schweregrad-Score: ${r.severity}`}
                          >
                            {ok ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : (
                              <AlertTriangle className="w-3 h-3" />
                            )}
                            {bucket.label}
                            {!ok && <span className="text-muted-foreground">· {r.severity}</span>}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-3 py-2">
                      <a
                        href={r.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline break-all"
                      >
                        {r.path}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">
                        {r.source}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="line-clamp-2 text-foreground">{r.title || "—"}</div>
                      <div className={`text-xs mt-1 ${lengthClass(r.titleLen, 1, r.limits.titleMax)}`}>
                        {r.titleLen} Zeichen
                      </div>
                    </td>
                    <td className="px-3 py-2 max-w-md">
                      <div className="line-clamp-3 text-foreground">{r.description || "—"}</div>
                      <div className={`text-xs mt-1 ${lengthClass(r.descLen, r.limits.descMin, r.limits.descMax)}`}>
                        {r.descLen} Zeichen
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-xs ${
                          r.ogType === "article"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {r.ogType}
                      </span>
                    </td>
                    <td className="px-3 py-2 max-w-sm">
                      <div className="space-y-2">
                        <SerpPreview
                          label="SERP-Vorschau (aktuell)"
                          path={r.path}
                          title={r.title}
                          description={r.description}
                        />
                        {(() => {
                          // Build deterministic SERP previews per distinct
                          // title/description suggestion (regular + blog).
                          const all = [...r.suggestions, ...r.blogOptimizations];
                          const seen = new Set<string>();
                          const previews: { label: string; title: string; description: string }[] = [];
                          for (const s of all) {
                            if (s.field !== "title" && s.field !== "description") continue;
                            const nextTitle = s.field === "title" ? s.value : r.title;
                            const nextDesc = s.field === "description" ? s.value : r.description;
                            const key = `${nextTitle}|${nextDesc}`;
                            if (seen.has(key)) continue;
                            seen.add(key);
                            previews.push({
                              label: `Vorschau · ${s.field === "title" ? "Titel" : "Description"} angepasst`,
                              title: nextTitle,
                              description: nextDesc,
                            });
                          }
                          return previews.map((p, i) => (
                            <SerpPreview
                              key={i}
                              label={p.label}
                              path={r.path}
                              title={p.title}
                              description={p.description}
                              variant="suggested"
                            />
                          ));
                        })()}
                        {ok ? (
                          <span className="text-xs text-emerald-700">OK</span>
                        ) : (
                          <ul className="text-xs text-destructive space-y-0.5">
                            {r.violations.map((v) => (
                              <li key={v.type}>
                                • {v.message}
                                <span className="text-muted-foreground"> · +{v.severity}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {r.suggestions.length > 0 && (
                          <SuggestionList label="Vorschlag" items={r.suggestions} row={r} />
                        )}
                        {r.blogOptimizations.length > 0 && (
                          <SuggestionList
                            label="Blog-Optimierung"
                            items={r.blogOptimizations}
                            tone="primary"
                            row={r}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-muted-foreground">
                    Keine Routen entsprechen dem aktuellen Filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminSeoMetricsPage;
