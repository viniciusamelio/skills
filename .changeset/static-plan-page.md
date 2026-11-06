---
"viniciusamelio-skills": minor
---

`modular-thinking`: the visual plan is now a static, responsive document that can be attached to an issue or pull request. A new `scripts/render-diagrams.mjs` pre-renders its Mermaid diagrams into inline SVG, fails on diagrams that do not parse, and warns about diagrams too wide for narrow screens. Long text, paths, tables, and diagrams no longer widen the page, and the browser-only review controls are gone; tracing, filtering, and navigation remain as extras when scripts run.
