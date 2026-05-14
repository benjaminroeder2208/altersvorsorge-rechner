// SEO threshold + ogType heuristic settings, editable via the admin UI.
// Persisted in localStorage so the SEO-Metriken page can pick up overrides
// without a deploy. Defaults match the original public seo_chat checks.

export interface OgTypeRule {
  /** Glob-like pattern. "*" matches any chars. Examples: "/blog/*", "/*" */
  pattern: string;
  /** Expected ogType for routes matching this pattern */
  expected: "article" | "website";
}

export interface RouteOverride {
  /** Exact route path (e.g. "/blog/altersvorsorgedepot") */
  path: string;
  titleMin?: number;
  titleMax?: number;
  descMin?: number;
  descMax?: number;
  /** Override expected ogType for this exact route */
  expectedOgType?: "article" | "website";
}

export interface SeoSettings {
  defaults: {
    titleMin: number;
    titleMax: number;
    descMin: number;
    descMax: number;
  };
  ogTypeRules: OgTypeRule[];
  /** Routes that should be EXCLUDED from any ogType check (e.g. "/blog") */
  ogTypeExceptions: string[];
  overrides: RouteOverride[];
}

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  defaults: {
    titleMin: 0,
    titleMax: 60,
    descMin: 50,
    descMax: 160,
  },
  ogTypeRules: [
    { pattern: "/blog/*", expected: "article" },
    { pattern: "/*", expected: "website" },
  ],
  ogTypeExceptions: ["/blog"],
  overrides: [],
};

const STORAGE_KEY = "admin.seoSettings.v1";

export function loadSeoSettings(): SeoSettings {
  if (typeof window === "undefined") return DEFAULT_SEO_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SEO_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<SeoSettings>;
    return {
      defaults: { ...DEFAULT_SEO_SETTINGS.defaults, ...(parsed.defaults ?? {}) },
      ogTypeRules: parsed.ogTypeRules ?? DEFAULT_SEO_SETTINGS.ogTypeRules,
      ogTypeExceptions: parsed.ogTypeExceptions ?? DEFAULT_SEO_SETTINGS.ogTypeExceptions,
      overrides: parsed.overrides ?? [],
    };
  } catch {
    return DEFAULT_SEO_SETTINGS;
  }
}

export function saveSeoSettings(s: SeoSettings): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export function resetSeoSettings(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

function matchPattern(path: string, pattern: string): boolean {
  // Convert simple glob ("*") to RegExp
  const re = new RegExp(
    "^" +
      pattern
        .split("*")
        .map((p) => p.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
        .join(".*") +
      "$",
  );
  return re.test(path);
}

/** Resolve effective limits for a route, applying overrides on top of defaults. */
export function getLimitsForRoute(settings: SeoSettings, path: string) {
  const ov = settings.overrides.find((o) => o.path === path);
  return {
    titleMin: ov?.titleMin ?? settings.defaults.titleMin,
    titleMax: ov?.titleMax ?? settings.defaults.titleMax,
    descMin: ov?.descMin ?? settings.defaults.descMin,
    descMax: ov?.descMax ?? settings.defaults.descMax,
  };
}

/**
 * Resolve expected ogType for a route, or null if the route is excepted from
 * the check. Override > exceptions > first matching rule.
 */
export function getExpectedOgType(
  settings: SeoSettings,
  path: string,
): "article" | "website" | null {
  const ov = settings.overrides.find((o) => o.path === path);
  if (ov?.expectedOgType) return ov.expectedOgType;
  if (settings.ogTypeExceptions.includes(path)) return null;
  for (const rule of settings.ogTypeRules) {
    if (matchPattern(path, rule.pattern)) return rule.expected;
  }
  return null;
}
