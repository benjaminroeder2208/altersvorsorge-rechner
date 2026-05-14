import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Plus, Trash2, RotateCcw, Save, CheckCircle2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ROUTES as SSOT_ROUTES } from "../../../scripts/seo-routes";
import {
  DEFAULT_SEO_SETTINGS,
  loadSeoSettings,
  resetSeoSettings,
  saveSeoSettings,
  type OgTypeRule,
  type RouteOverride,
  type SeoSettings,
} from "@/lib/seoSettings";

const NumberInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: number | undefined;
  onChange: (n: number | undefined) => void;
  placeholder?: string;
}) => (
  <input
    type="number"
    min={0}
    max={300}
    value={value ?? ""}
    placeholder={placeholder}
    onChange={(e) => {
      const v = e.target.value;
      onChange(v === "" ? undefined : Number(v));
    }}
    className="w-20 px-2 py-1 text-sm rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
  />
);

const TextInput = ({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (s: string) => void;
  placeholder?: string;
  className?: string;
}) => (
  <input
    type="text"
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
    className={`px-2 py-1 text-sm rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${className ?? ""}`}
  />
);

const SectionCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
    <h2 className="text-base font-semibold text-foreground">{title}</h2>
    {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
    <div className="mt-3">{children}</div>
  </section>
);

const AdminSeoSettingsPage = () => {
  const [settings, setSettings] = useState<SeoSettings>(() => loadSeoSettings());
  const [saved, setSaved] = useState(false);

  const knownPaths = useMemo(
    () =>
      Array.from(new Set(SSOT_ROUTES.map((r) => r.path))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [],
  );

  const update = (patch: Partial<SeoSettings>) =>
    setSettings((s) => ({ ...s, ...patch }));

  const updateDefaults = (patch: Partial<SeoSettings["defaults"]>) =>
    setSettings((s) => ({ ...s, defaults: { ...s.defaults, ...patch } }));

  const handleSave = () => {
    saveSeoSettings(settings);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetSeoSettings();
    setSettings(DEFAULT_SEO_SETTINGS);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  // ogType rules helpers
  const updateRule = (idx: number, patch: Partial<OgTypeRule>) =>
    update({
      ogTypeRules: settings.ogTypeRules.map((r, i) =>
        i === idx ? { ...r, ...patch } : r,
      ),
    });
  const removeRule = (idx: number) =>
    update({ ogTypeRules: settings.ogTypeRules.filter((_, i) => i !== idx) });
  const addRule = () =>
    update({
      ogTypeRules: [...settings.ogTypeRules, { pattern: "/*", expected: "website" }],
    });

  // overrides helpers
  const updateOverride = (idx: number, patch: Partial<RouteOverride>) =>
    update({
      overrides: settings.overrides.map((o, i) => (i === idx ? { ...o, ...patch } : o)),
    });
  const removeOverride = (idx: number) =>
    update({ overrides: settings.overrides.filter((_, i) => i !== idx) });
  const addOverride = () =>
    update({ overrides: [...settings.overrides, { path: "" }] });

  return (
    <>
      <Helmet>
        <title>SEO-Einstellungen – Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminLayout title="SEO-Einstellungen">
        <p className="text-sm text-muted-foreground mb-4">
          Schwellenwerte für Title und Meta-Description sowie ogType-Heuristiken.
          Einstellungen werden lokal gespeichert und vom SEO-Dashboard sofort
          verwendet.
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90"
          >
            <Save className="w-4 h-4" /> Speichern
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-border text-foreground hover:bg-muted"
          >
            <RotateCcw className="w-4 h-4" /> Auf Defaults zurücksetzen
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" /> Gespeichert
            </span>
          )}
        </div>

        <div className="space-y-4">
          <SectionCard
            title="Globale Schwellenwerte"
            description="Gelten für alle Routen, sofern keine Route-Override gesetzt ist."
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="text-sm space-y-1">
                <span className="block text-xs text-muted-foreground">Title min</span>
                <NumberInput
                  value={settings.defaults.titleMin}
                  onChange={(n) => updateDefaults({ titleMin: n ?? 0 })}
                />
              </label>
              <label className="text-sm space-y-1">
                <span className="block text-xs text-muted-foreground">Title max</span>
                <NumberInput
                  value={settings.defaults.titleMax}
                  onChange={(n) => updateDefaults({ titleMax: n ?? 60 })}
                />
              </label>
              <label className="text-sm space-y-1">
                <span className="block text-xs text-muted-foreground">Description min</span>
                <NumberInput
                  value={settings.defaults.descMin}
                  onChange={(n) => updateDefaults({ descMin: n ?? 50 })}
                />
              </label>
              <label className="text-sm space-y-1">
                <span className="block text-xs text-muted-foreground">Description max</span>
                <NumberInput
                  value={settings.defaults.descMax}
                  onChange={(n) => updateDefaults({ descMax: n ?? 160 })}
                />
              </label>
            </div>
          </SectionCard>

          <SectionCard
            title="ogType-Heuristiken"
            description={`Reihenfolge entscheidet: die erste passende Regel gewinnt. Muster mit "*" als Wildcard, z. B. "/blog/*".`}
          >
            <div className="space-y-2">
              {settings.ogTypeRules.map((rule, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground w-6 shrink-0">
                    #{i + 1}
                  </span>
                  <TextInput
                    value={rule.pattern}
                    onChange={(s) => updateRule(i, { pattern: s })}
                    placeholder="/blog/*"
                    className="flex-1 min-w-[160px]"
                  />
                  <select
                    value={rule.expected}
                    onChange={(e) =>
                      updateRule(i, {
                        expected: e.target.value as "article" | "website",
                      })
                    }
                    className="px-2 py-1 text-sm rounded-md border border-border bg-background text-foreground"
                  >
                    <option value="website">website</option>
                    <option value="article">article</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeRule(i)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted"
                    aria-label="Regel entfernen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addRule}
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Plus className="w-4 h-4" /> Regel hinzufügen
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                Ausnahmen (kein ogType-Check)
              </div>
              <TextInput
                value={settings.ogTypeExceptions.join(", ")}
                onChange={(s) =>
                  update({
                    ogTypeExceptions: s
                      .split(",")
                      .map((p) => p.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="/blog, /admin"
                className="w-full"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Komma-getrennte Pfade, für die der ogType-Verstoß nie angezeigt wird.
              </p>
            </div>
          </SectionCard>

          <SectionCard
            title="Route-Overrides"
            description="Überschreibt globale Werte für eine konkrete Route. Leere Felder = globaler Default."
          >
            <div className="space-y-2">
              {settings.overrides.map((ov, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 sm:grid-cols-[1.6fr_repeat(4,minmax(0,1fr))_auto_auto] gap-2 items-center p-2 rounded-md bg-muted/40"
                >
                  <input
                    type="text"
                    list="ssot-routes"
                    value={ov.path}
                    onChange={(e) => updateOverride(i, { path: e.target.value })}
                    placeholder="/blog/altersvorsorgedepot"
                    className="px-2 py-1 text-sm rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  <NumberInput
                    value={ov.titleMin}
                    onChange={(n) => updateOverride(i, { titleMin: n })}
                    placeholder="t-min"
                  />
                  <NumberInput
                    value={ov.titleMax}
                    onChange={(n) => updateOverride(i, { titleMax: n })}
                    placeholder="t-max"
                  />
                  <NumberInput
                    value={ov.descMin}
                    onChange={(n) => updateOverride(i, { descMin: n })}
                    placeholder="d-min"
                  />
                  <NumberInput
                    value={ov.descMax}
                    onChange={(n) => updateOverride(i, { descMax: n })}
                    placeholder="d-max"
                  />
                  <select
                    value={ov.expectedOgType ?? ""}
                    onChange={(e) =>
                      updateOverride(i, {
                        expectedOgType:
                          e.target.value === ""
                            ? undefined
                            : (e.target.value as "article" | "website"),
                      })
                    }
                    className="px-2 py-1 text-sm rounded-md border border-border bg-background text-foreground"
                  >
                    <option value="">og: auto</option>
                    <option value="website">website</option>
                    <option value="article">article</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeOverride(i)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted"
                    aria-label="Override entfernen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <datalist id="ssot-routes">
                {knownPaths.map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
              <button
                type="button"
                onClick={addOverride}
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Plus className="w-4 h-4" /> Override hinzufügen
              </button>
            </div>
          </SectionCard>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminSeoSettingsPage;
