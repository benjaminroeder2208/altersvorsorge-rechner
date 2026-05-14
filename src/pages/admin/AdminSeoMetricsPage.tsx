import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ROUTES as SSOT_ROUTES } from "../../../scripts/seo-routes";

// SEO limits (aligned with public seo_chat checks)
const TITLE_MAX = 60;
const DESC_MIN = 50;
const DESC_MAX = 160;

interface MetricRow {
  path: string;
  title: string;
  description: string;
  ogType: "website" | "article";
  source: "SSOT" | "Blog";
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
  severity: number;
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

    rows.push({ path, title, description, ogType, source: "Blog" });
  }
  return rows;
}

function buildRows(): RowWithViolations[] {
  const ssot: MetricRow[] = SSOT_ROUTES.filter((r) => !r.noindex).map((r) => ({
    path: r.path,
    title: r.title,
    description: r.description,
    ogType: r.ogType ?? "website",
    source: "SSOT",
  }));

  const all = [...ssot, ...parseBlogSources()];
  // dedupe by path; SSOT wins
  const byPath = new Map<string, MetricRow>();
  for (const r of all) if (!byPath.has(r.path)) byPath.set(r.path, r);

  return Array.from(byPath.values())
    .map((r) => {
      const titleLen = r.title.length;
      const descLen = r.description.length;
      const violations: Violation[] = [];
      const suggestions: Suggestion[] = [];

      if (titleLen === 0) {
        violations.push({ type: "title-missing", message: "Titel fehlt", severity: 5 });
      } else if (titleLen > TITLE_MAX) {
        const sev = clamp(1 + Math.ceil((titleLen - TITLE_MAX) / 4), 1, 4);
        violations.push({
          type: "title-too-long",
          message: `Titel zu lang (${titleLen} > ${TITLE_MAX})`,
          severity: sev,
        });
        suggestions.push({ field: "title", value: shortenTitle(r.title, TITLE_MAX) });
      }

      if (descLen === 0) {
        violations.push({ type: "desc-missing", message: "Description fehlt", severity: 4 });
      } else if (descLen < DESC_MIN) {
        const sev = clamp(1 + Math.ceil((DESC_MIN - descLen) / 15), 1, 3);
        violations.push({
          type: "desc-too-short",
          message: `Description zu kurz (${descLen} < ${DESC_MIN})`,
          severity: sev,
        });
        suggestions.push({
          field: "description",
          value: r.description,
          note: `Um ≥ ${DESC_MIN - descLen} Zeichen erweitern – z. B. konkreten Nutzen, Förderhöhe oder CTA ergänzen.`,
        });
      } else if (descLen > DESC_MAX) {
        const sev = clamp(1 + Math.ceil((descLen - DESC_MAX) / 15), 1, 3);
        violations.push({
          type: "desc-too-long",
          message: `Description zu lang (${descLen} > ${DESC_MAX})`,
          severity: sev,
        });
        suggestions.push({ field: "description", value: shortenDescription(r.description, DESC_MAX) });
      }

      const isBlog = r.path.startsWith("/blog/");
      if (isBlog && r.ogType !== "article") {
        violations.push({
          type: "ogtype-should-article",
          message: "ogType sollte 'article' sein",
          severity: 2,
        });
        suggestions.push({ field: "ogType", value: 'ogType="article"' });
      }
      if (!isBlog && r.ogType === "article" && r.path !== "/blog") {
        violations.push({
          type: "ogtype-should-website",
          message: "ogType 'article' für Nicht-Blog-Route",
          severity: 1,
        });
        suggestions.push({ field: "ogType", value: 'ogType="website"' });
      }

      const severity = violations.reduce((sum, v) => sum + v.severity, 0);
      return { ...r, titleLen, descLen, violations, suggestions, severity };
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

function lengthClass(len: number, min: number, max: number): string {
  if (len === 0) return "text-destructive font-medium";
  if (len > max) return "text-destructive font-medium";
  if (len < min) return "text-amber-600 font-medium";
  return "text-muted-foreground";
}

const AdminSeoMetricsPage = () => {
  const rows = useMemo(buildRows, []);
  const violationCount = rows.filter((r) => r.violations.length > 0).length;
  const totalSeverity = rows.reduce((s, r) => s + r.severity, 0);

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

  const toggleType = (t: ViolationType) =>
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (activeTypes.size > 0) {
        if (!r.violations.some((v) => activeTypes.has(v.type))) return false;
        return true; // type filter implies "with violations"
      }
      if (onlyViolations && r.violations.length === 0) return false;
      return true;
    });
  }, [rows, onlyViolations, activeTypes]);

  const filterActive = onlyViolations || activeTypes.size > 0;

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
          (PageHead-Props). Limits: Title ≤ {TITLE_MAX}, Description {DESC_MIN}–{DESC_MAX}.
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
              {rows.map((r) => {
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
                      <div className={`text-xs mt-1 ${lengthClass(r.titleLen, 1, TITLE_MAX)}`}>
                        {r.titleLen} Zeichen
                      </div>
                    </td>
                    <td className="px-3 py-2 max-w-md">
                      <div className="line-clamp-3 text-foreground">{r.description || "—"}</div>
                      <div className={`text-xs mt-1 ${lengthClass(r.descLen, DESC_MIN, DESC_MAX)}`}>
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
                      {ok ? (
                        <span className="text-xs text-emerald-700">OK</span>
                      ) : (
                        <div className="space-y-2">
                          <ul className="text-xs text-destructive space-y-0.5">
                            {r.violations.map((v) => (
                              <li key={v.type}>
                                • {v.message}
                                <span className="text-muted-foreground"> · +{v.severity}</span>
                              </li>
                            ))}
                          </ul>
                          {r.suggestions.length > 0 && (
                            <div className="space-y-1.5 pt-1.5 border-t border-border">
                              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                Vorschlag
                              </div>
                              {r.suggestions.map((s, i) => (
                                <div key={i} className="text-xs">
                                  <div className="flex items-center justify-between gap-2 mb-0.5">
                                    <span className="text-muted-foreground">
                                      {s.field}
                                      {s.field !== "ogType" && ` (${s.value.length} Z.)`}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => navigator.clipboard?.writeText(s.value)}
                                      className="text-primary hover:underline text-[11px]"
                                    >
                                      kopieren
                                    </button>
                                  </div>
                                  <div className="rounded bg-muted/60 px-2 py-1 text-foreground break-words">
                                    {s.value}
                                  </div>
                                  {s.note && (
                                    <div className="text-[11px] text-muted-foreground mt-0.5">
                                      {s.note}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminSeoMetricsPage;
