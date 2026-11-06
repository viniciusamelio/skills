# viniciusamelio-skills

## 0.3.0

### Minor Changes

- [#3](https://github.com/viniciusamelio/skills/pull/3) [`b0373e1`](https://github.com/viniciusamelio/skills/commit/b0373e195d4d44c59bb3858b62d050da17819ea3) Thanks [@viniciusamelio](https://github.com/viniciusamelio)! - Add `pr-agent`, a skill that runs PR-Agent's `describe`, `review`, `improve`, and `ask` tools inside the agent, with no hosted bot or model API key. It reads whole files at the PR's head commit instead of compressed diffs, scores every code suggestion in a second pass and drops the weak ones, fills the repository's PR template, and publishes to the PR only when asked, updating its own earlier comments instead of duplicating them.

- [#3](https://github.com/viniciusamelio/skills/pull/3) [`b0373e1`](https://github.com/viniciusamelio/skills/commit/b0373e195d4d44c59bb3858b62d050da17819ea3) Thanks [@viniciusamelio](https://github.com/viniciusamelio)! - `modular-thinking`: the visual plan is now a static, responsive document that can be attached to an issue or pull request. A new `scripts/render-diagrams.mjs` pre-renders its Mermaid diagrams into inline SVG, fails on diagrams that do not parse, and warns about diagrams too wide for narrow screens. Long text, paths, tables, and diagrams no longer widen the page, and the browser-only review controls are gone; tracing, filtering, and navigation remain as extras when scripts run.

## 0.2.0

### Minor Changes

- [#1](https://github.com/viniciusamelio/skills/pull/1) [`49d02c5`](https://github.com/viniciusamelio/skills/commit/49d02c55e2d9ef634873b55085d1d5a143cf6a98) Thanks [@viniciusamelio](https://github.com/viniciusamelio)! - Add `modular-thinking`, a skill that analyzes a feature or a whole project through DDD bounded contexts and vertical slices. It recommends where new work belongs within the existing architecture, and only restructures code when asked to migrate, protecting every step with migrated, characterization, or test-first tests. Before asking for confirmation, it presents the plan as a temporary HTML page with diagrams of every change, its reasons, and its internal and external sources.
