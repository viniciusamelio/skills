# Visual plan presentation

Before asking the user to confirm a plan, render it as a temporary HTML page so the user can review what will be created, changed, moved, or removed, and why, without reading the whole chat.

## When

- Always before confirmation in **Migrate**, and in **Place new work** when the user will confirm a plan before you build.
- In **Assess**, when the recommendations include structural changes, so the user can compare the current and proposed structure.
- Again whenever the plan changes after feedback. Regenerate the page; do not patch it piecemeal.

## Where and how

- Start from [../assets/plan-template.html](../assets/plan-template.html). Replace every `{{PLACEHOLDER}}`, repeat the marked blocks, and delete blocks that do not apply. Leave no placeholder in the final page.
- Write the file to the OS temp directory (`$TMPDIR`, else `/tmp`; `%TEMP%` on Windows), named `modular-thinking-<project>-<yyyymmdd-hhmm>.html`. Never write it inside the repository, and never commit it.
- Write all visible text in the user's language. Keep code, paths, and identifiers as they are.
- Pre-render the diagrams: `node <skill-dir>/scripts/render-diagrams.mjs <page.html>`. It replaces each Mermaid block with an inline SVG, using a local Chromium-based browser (Chrome, Edge, Chromium, Brave; `CHROME_PATH` picks one), Node 22 or later, and network access to the Mermaid CDN. When it reports a parse error, fix that diagram and run it again. When it warns that a diagram is too wide, reshape the diagram (see Diagrams) and run it again. If it cannot run, tell the user that the diagrams will render only where the page's scripts and network access work; the Mermaid source stays readable either way.
- Open it with the platform's opener (`open` on macOS, `xdg-open` on Linux, `start` on Windows) when the environment allows. Always give the user the absolute path.
- In the chat, give a short summary and ask for confirmation. The page is the detailed version; do not repeat it in full.
- The page is a proposal: show the status as awaiting confirmation, and do not edit code until the user confirms. Confirmation and adjustments come through the conversation, or through comments where the user shared the page, such as an issue or pull request.

## A static document

The page is a static document that the user may attach to an issue or a pull request. Viewers there can block scripts and network requests, and readers use any screen size, so:

- Everything must read with scripts disabled: content, labels, legend, diagrams (pre-rendered), and file tree. Scripts only add extras (see Extras).
- Keep the template's responsive rules: long words, paths, and code wrap; tables and diagrams scroll inside their panels instead of widening the page. Do not add fixed widths.
- Do not add controls that only work in one browser, such as approval buttons, notes, or state saved in the browser. Reviewers answer where the page is shared.

## What the page must contain

1. **Summary**: one paragraph with what changes, why, and what stays the same.
2. **Context map, current and target** side by side. Show every context the plan touches, its key terms, and each relationship labeled with its context-mapping pattern and direction.
3. **Structure**: a file tree of every folder and file the plan adds, changes, moves, or removes, colored by kind, with moves shown as `old → new`. Group unchanged siblings into one line instead of omitting them silently.
4. **Flow**: how a representative request crosses slices and contexts after the change, including contracts and translation layers.
5. **Steps**: every increment in order, with the tests that guard each one and the point where transitional code is removed.
6. **One card per change** with:
   - **What**: the change, in concrete terms.
   - **Why**: the problem it solves and the benefit, stated plainly. A change without a clear reason does not belong in the plan.
   - **Internal sources**: evidence from the repository, such as `path:line` references, tests, configuration, git history (co-changes, commits), documentation, or what the user said.
   - **External sources**: the principle that justifies it, linked to the skill's sources (Fowler, Evans, Bogard, and the others listed in `SKILL.md`), with the specific idea that applies.
   - **Tests**: baseline, characterization, migrated, or test-first tests for this change.
   - **Risk**: what could break and how to roll back.
7. **Test plan** table: every test to run, create, migrate, or write test-first, with the behavior it protects and its step.
8. **What stays unchanged** and why, so the user can see the plan respects the current architecture.
9. **Optional follow-ups** outside this plan.
10. **Open questions and hypotheses**, marked as such.

Separate verified facts from inferences everywhere: an inferred context or boundary is labeled as a hypothesis, with the evidence behind it.

## Visual language

The template follows a monochrome interface: hierarchy comes from stepped surface tones, type weight, and size, inside hairline panels with nearly square corners (2 to 4px). Each panel has a header with its label and an interaction hint, and a dashed footer with the caption and live metadata. Keep it that way.

- **Surfaces**: the page background is the darkest (or lightest) tone; sections sit on `surface-1`, content inside them on `surface-2`, and emphasis on `surface-3` and `surface-4`. Separate elements by tone and spacing, not by borders.
- **Type**: large, tight display headings for sections; small uppercase labels for metadata; body text in a muted tone, with the most important sentence (the reason for a change) in the brightest tone.
- **Change kinds** are told apart by tone, line style, and a glyph, so they stay readable without color:
  - add `+`: solid fill in the foreground tone, like a primary button
  - change `~`: raised surface with a light border
  - move `→`: dashed border
  - remove `−`: dotted border, faded and struck through
  - keep `·`: lowest surface, muted text
- **Labels and interaction state** are the one accent: blue, uppercase monospace with wide tracking, wrapped in brackets (`[ HYPOTHESIS ]`). Use the template's label classes (`eyebrow`, `kicker`, table headers, `hypothesis`) for every label, such as section kickers, source and risk headings, and hypotheses. The CSS adds the brackets; write only the word.
- The accent also marks interaction state: traced elements, the active filter, and focus. Do not use it anywhere else, and do not add other colors, gradients, shadows, or fonts.

## Extras

When scripts run, the template adds these extras; the page only needs consistent markup:

- **Tracing**: hovering a diagram node, a file row, or a change card highlights everything that shares one of its ref tokens and dims the rest. A Mermaid node's token is its id (`B` in `B["Billing"]`). Give each change card and file row a `data-refs` attribute listing the node ids and any extra tokens that connect them, so every change is reachable from its diagram nodes and files. Clicking a node or a row opens the first change card that shares a token.
- **Filter**: the legend chips filter every diagram, row, and card by change kind.
- **Navigation**: a contents list with scroll tracking, expandable diagram panels, click-to-copy on code and paths, and `j`/`k`/`Esc` shortcuts.
- Translate the strings in the `ui-text` block with the rest of the page.

## Diagrams

- Prefer clean diagrams: rounded nodes, short labels, few node shapes, and left-to-right or top-to-bottom flow without crossing edges where possible. Use top-to-bottom for sequences of more than four steps.
- Keep every diagram within 960px of natural width, so it fits a narrow screen at a legible size; the render script warns past that. Node labels are names, not sentences (about 24 characters; details go in the change cards), and edge labels are a pattern name or a short verb. Siblings line up across the flow: in `flowchart TB` they form a row, in `flowchart LR` a column, so pick the direction that stacks the larger group and keep the other direction to about four nodes. Keep sequence diagrams to about five participants. When a diagram still does not fit, split it.
- Mark Mermaid nodes with `:::add`, `:::change`, `:::move`, `:::remove`, or `:::keep`. The page styles these classes; do not add `classDef` or `style` lines, or colors of any kind.
- Cover everything the plan does. Every context, slice, moved group of files, contract, and step must appear in at least one diagram. When a diagram gets crowded, split it, for example one diagram per context, instead of dropping detail.
- Use `flowchart` for context maps and steps, and `sequenceDiagram` for request flow. Quote labels that contain punctuation (`A["Billing: Invoice"]`). Keep each diagram's source readable, because it is the fallback when Mermaid cannot load.
- Give each diagram a caption that says what to look at.
