# Design refresh

- [x] Refine remaining landing sections: editorial grid, guides and topic compass in the approved design; leave the calculator unchanged.
- [x] Verify remaining sections and topic links on desktop and 375/320 layouts; 51 tests pass and no browser errors.

- [x] Step 1: Visual foundation and floating header; retain calculator logic, page content, routes, and neutral secondary surfaces. Verified local fonts, mobile menu navigation, calculator anchor, and 43 regression tests.
- [x] Step 2: Interactive persona hero, capital curve and header status; use actual full-calculator projections rather than the reference's unverified 280,813 EUR.
- [x] Step 2: Chapter markers, key figures, trust band, editorial guides and topic compass; harmonize calculator presentation without changing its rules.
- [x] Verify examples, interactions, reduced motion and 320/375/1280/1536 layouts. All 51 unit tests pass; Python Playwright confirms browser flows without runtime errors. Added reusable E2E spec; the existing JS E2E runner requires its missing harness package/browser installation.
- [x] Remove homepage sections "Früh starten lohnt sich — in Zahlen" (#vergleich) and "Riester Zulage — wie sie heute funktioniert" (#riester-zulage), plus the hero link to #vergleich. Verified: 51 tests pass, build OK, browser shows no dead anchors and no horizontal overflow at 375px.
