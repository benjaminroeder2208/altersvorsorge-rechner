import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

/**
 * Single source of truth for legacy → target redirects.
 * Keep this in sync with the <NoindexRedirect> routes in src/App.tsx.
 */
const LEGACY_REDIRECTS: Array<{ from: string; to: string }> = [
  { from: "/altersvorsorgedepot-rechner", to: "/" },
  { from: "/altersvorsorgedepot-gesetzesentwurf", to: "/altersvorsorgedepot-gesetz" },
];

const NOT_FOUND_MARKER = /404|nicht gefunden|not found/i;

function renderAt(path: string) {
  // Wrap App without its own BrowserRouter — App uses BrowserRouter, so we
  // render the page tree via MemoryRouter at the App-internal Routes level
  // by mounting App directly. App's BrowserRouter ignores `initialEntries`,
  // so we instead push the path via window.history before mount.
  window.history.replaceState({}, "", path);
  return render(
    <HelmetProvider>
      <App />
    </HelmetProvider>,
  );
}

describe("Legacy redirects", () => {
  it("has no duplicate sources and no self-loops", () => {
    const sources = LEGACY_REDIRECTS.map((r) => r.from);
    expect(new Set(sources).size).toBe(sources.length);
    for (const r of LEGACY_REDIRECTS) {
      expect(r.to, `Redirect ${r.from} -> ${r.to} loops back to itself`).not.toBe(r.from);
    }
  });

  it("does not chain into another legacy redirect (no multi-hop loops)", () => {
    const sources = new Set(LEGACY_REDIRECTS.map((r) => r.from));
    for (const r of LEGACY_REDIRECTS) {
      expect(
        sources.has(r.to),
        `Redirect target ${r.to} is itself a legacy redirect — collapse to final destination`,
      ).toBe(false);
    }
  });

  for (const { from, to } of LEGACY_REDIRECTS) {
    it(`${from} resolves to ${to} without 404`, async () => {
      const { container } = renderAt(from);
      await waitFor(() => {
        expect(window.location.pathname).toBe(to);
      });
      expect(container.textContent ?? "").not.toMatch(NOT_FOUND_MARKER);
    });
  }
});
