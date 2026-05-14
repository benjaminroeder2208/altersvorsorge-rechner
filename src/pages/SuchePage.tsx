import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Fuse, { type FuseResult, type FuseResultMatch } from "fuse.js";
import { Search as SearchIcon, X, FileText, Newspaper } from "lucide-react";
import PageHead from "@/components/seo/PageHead";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";

interface IndexEntry {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  body: string;
  kind: "page" | "blog";
}

interface IndexFile {
  generatedAt: string;
  entries: IndexEntry[];
}

const KIND_LABEL: Record<IndexEntry["kind"], string> = {
  page: "Seite",
  blog: "Blog-Artikel",
};

/** Build a short snippet around the first matched range for the given key. */
function buildSnippet(entry: IndexEntry, matches: readonly FuseResultMatch[] | undefined): string {
  // Prefer body/intro/description matches for context (title is already shown).
  const preferKeys = ["body", "intro", "description", "h1"];
  let chosen: { value: string; range: [number, number] } | null = null;

  for (const key of preferKeys) {
    const m = matches?.find((x) => x.key === key && x.value && x.indices.length > 0);
    if (m && m.value) {
      chosen = { value: m.value, range: m.indices[0] as [number, number] };
      break;
    }
  }

  // Fallback: first non-empty long-form field
  if (!chosen) {
    const fallback = entry.body || entry.intro || entry.description;
    if (!fallback) return "";
    const slice = fallback.slice(0, 180);
    return slice + (fallback.length > 180 ? "…" : "");
  }

  const { value, range } = chosen;
  const radius = 80;
  const start = Math.max(0, range[0] - radius);
  const end = Math.min(value.length, range[1] + radius);
  let snippet = value.slice(start, end);
  if (start > 0) snippet = "… " + snippet;
  if (end < value.length) snippet = snippet + " …";

  // Highlight the matched span
  const localStart = range[0] - start + (start > 0 ? 2 : 0);
  const localEnd = range[1] - start + (start > 0 ? 2 : 0) + 1;
  return (
    snippet.slice(0, localStart) +
    "\u0001" +
    snippet.slice(localStart, localEnd) +
    "\u0002" +
    snippet.slice(localEnd)
  );
}

const HighlightedSnippet = ({ raw }: { raw: string }) => {
  // Splits on the marker pair injected by buildSnippet.
  const parts: { text: string; mark: boolean }[] = [];
  let i = 0;
  while (i < raw.length) {
    const start = raw.indexOf("\u0001", i);
    if (start === -1) {
      parts.push({ text: raw.slice(i), mark: false });
      break;
    }
    if (start > i) parts.push({ text: raw.slice(i, start), mark: false });
    const end = raw.indexOf("\u0002", start + 1);
    if (end === -1) {
      parts.push({ text: raw.slice(start + 1), mark: false });
      break;
    }
    parts.push({ text: raw.slice(start + 1, end), mark: true });
    i = end + 1;
  }
  return (
    <>
      {parts.map((p, idx) =>
        p.mark ? (
          <mark key={idx} className="bg-primary/20 text-foreground rounded px-0.5">
            {p.text}
          </mark>
        ) : (
          <span key={idx}>{p.text}</span>
        ),
      )}
    </>
  );
};

const SuchePage = () => {
  const [params, setParams] = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [index, setIndex] = useState<IndexEntry[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch index once on mount (cached by browser)
  useEffect(() => {
    let cancelled = false;
    fetch("/search-index.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<IndexFile>;
      })
      .then((data) => {
        if (!cancelled) setIndex(data.entries);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(String(err));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Sync URL ?q= on debounce
  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (query) next.set("q", query);
      else next.delete("q");
      setParams(next, { replace: true });
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const fuse = useMemo(() => {
    if (!index) return null;
    return new Fuse(index, {
      keys: [
        { name: "title", weight: 4 },
        { name: "h1", weight: 3 },
        { name: "description", weight: 2 },
        { name: "intro", weight: 1.5 },
        { name: "body", weight: 1 },
      ],
      includeMatches: true,
      includeScore: true,
      ignoreLocation: true,
      threshold: 0.35,
      minMatchCharLength: 2,
    });
  }, [index]);

  const results: FuseResult<IndexEntry>[] = useMemo(() => {
    if (!fuse || !query.trim()) return [];
    return fuse.search(query.trim(), { limit: 30 });
  }, [fuse, query]);

  return (
    <>
      <PageHead
        title="Suche – altersvorsorge-rechner.com"
        description="Durchsuche alle Inhalte zu Altersvorsorgedepot, Förderung, Rente, ETF und Riester."
        path="/suche"
      />
      <Navbar />
      <main className="container max-w-3xl mx-auto px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2" style={{ letterSpacing: "-0.02em" }}>
          Suche
        </h1>
        <p className="text-muted-foreground mb-8">
          Durchsuche Ratgeber-Seiten und alle Blog-Artikel zu Altersvorsorgedepot, Förderung, Rente und ETF.
        </p>

        <div className="relative mb-2">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="z. B. Förderung, ETF, Riester kündigen, Steuern …"
            aria-label="Suchbegriff eingeben"
            className="w-full pl-10 pr-10 py-3 text-base rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Suche leeren"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="text-xs text-muted-foreground mb-6 min-h-[1rem]">
          {!index && !loadError && "Index wird geladen …"}
          {loadError && (
            <span className="text-destructive">
              Index konnte nicht geladen werden ({loadError}). Bitte Seite neu laden.
            </span>
          )}
          {index && query.trim() && (
            <>
              {results.length} Treffer für „{query.trim()}"
              {results.length === 30 && " (weitere möglich – Suchbegriff präzisieren)"}
            </>
          )}
          {index && !query.trim() && `${index.length} Seiten und Artikel im Index`}
        </div>

        {index && query.trim() && results.length === 0 && (
          <div className="rounded-lg border border-border bg-muted/40 p-6 text-sm text-muted-foreground">
            Keine Treffer. Versuche es mit einem anderen oder kürzeren Suchbegriff.
          </div>
        )}

        <ol className="space-y-4">
          {results.map(({ item, matches }) => {
            const snippet = buildSnippet(item, matches);
            const Icon = item.kind === "blog" ? Newspaper : FileText;
            return (
              <li
                key={item.path}
                className="rounded-lg border border-border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                  <Icon className="w-3 h-3" />
                  <span>{KIND_LABEL[item.kind]}</span>
                  <span aria-hidden>·</span>
                  <span className="truncate">{item.path}</span>
                </div>
                <Link
                  to={item.path}
                  className="text-base md:text-lg font-semibold text-primary hover:underline block mb-1"
                >
                  {item.title}
                </Link>
                {snippet && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <HighlightedSnippet raw={snippet} />
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </main>
      <FooterSection />
    </>
  );
};

export default SuchePage;
