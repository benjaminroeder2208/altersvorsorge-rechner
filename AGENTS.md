# Architecture rules

- Keep all app color roles as HSL channel tokens mapped through Tailwind; convert reference OKLCH colors at the design-system boundary so existing opacity utilities remain compatible.
- Keep neutral secondary surfaces distinct from dedicated trust colors so shared controls remain legible during staged redesigns.
- Self-host display and body fonts and retain existing Inter files for legacy consumers; font loading must not depend on third-party requests.
- Implement shared site navigation in Navbar, retaining existing routes and explicit calculator-anchor scrolling; share the homepage persona status through a page-scoped context so other pages remain independent.
- Derive hero persona projections from the existing calculator engine rather than maintaining separate financial formulas, so illustrated totals and the full calculator cannot diverge.
- Keep topic-compass suggestions as local editorial matching and link personal AI discussion to the existing assistant, so a visual redesign adds no new backend or AI processing.
- Keep the homepage knowledge grid and guides in EditorialSections, separate from calculator components, so editorial presentation changes cannot alter financial logic.