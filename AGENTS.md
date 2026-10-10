# Architecture rules

- Keep all app color roles as HSL channel tokens mapped through Tailwind; convert reference OKLCH colors at the design-system boundary so existing opacity utilities remain compatible.
- Keep neutral secondary surfaces distinct from dedicated trust colors so shared controls remain legible during staged redesigns.
- Self-host display and body fonts and retain existing Inter files for legacy consumers; font loading must not depend on third-party requests.
- Implement shared site navigation in Navbar, retaining existing routes and explicit calculator-anchor scrolling; persona-aware status belongs to the later hero integration.