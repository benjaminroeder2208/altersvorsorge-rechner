- [x] Add an interactive homepage introduction linking to the existing AI assistant with a selected example question.
- [x] Verify example selection and unsent draft handoff at 1280/375/320px with mocked assistant responses: no overflow or browser errors, 51 regression tests pass. Existing model calls and calculator logic unchanged.

- [x] Refine main calculator inputs, progress and results in the approved design; preserve formulas, tracking and email flow.
- [x] Verify complete calculator flow and scenario selection at 1280/375/320px: no overflow or browser errors, 51 regression tests pass; calculation engine unchanged. Added reusable E2E spec.

# Design refresh

- [x] Align Rentenlücke, Frühstart and Riester comparison calculator pages with the approved editorial design, preserving all formulas and functionality.
- [x] Verify unchanged baseline amounts, numeric controls and child management at 1280/375/320px; no browser errors, 51 regression tests pass and build OK. Added reusable E2E coverage.

- [x] Restyle the remaining topic compass and FAQ with chapter headings and editorial rows; keep removed editorial/blog sections absent and calculator unchanged.
- [x] Verify question suggestions, FAQ interaction and 320/375px layouts; no browser errors or horizontal overflow, build OK and all 51 tests pass.

- [x] Refine remaining landing sections: editorial grid, guides and topic compass in the approved design; leave the calculator unchanged.
- [x] Verify remaining sections and topic links on desktop and 375/320 layouts; 51 tests pass and no browser errors.

- [x] Step 1: Visual foundation and floating header; retain calculator logic, page content, routes, and neutral secondary surfaces. Verified local fonts, mobile menu navigation, calculator anchor, and 43 regression tests.
- [x] Step 2: Interactive persona hero, capital curve and header status; use actual full-calculator projections rather than the reference's unverified 280,813 EUR.
- [x] Step 2: Chapter markers, key figures, trust band, editorial guides and topic compass; harmonize calculator presentation without changing its rules.
- [x] Verify examples, interactions, reduced motion and 320/375/1280/1536 layouts. All 51 unit tests pass; Python Playwright confirms browser flows without runtime errors. Added reusable E2E spec; the existing JS E2E runner requires its missing harness package/browser installation.
- [x] Remove homepage sections "Früh starten lohnt sich — in Zahlen" (#vergleich) and "Riester Zulage — wie sie heute funktioniert" (#riester-zulage), plus the hero link to #vergleich. Verified: 51 tests pass, build OK, browser shows no dead anchors and no horizontal overflow at 375px.
