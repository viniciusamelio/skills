# Visual plan presentation

Before asking the user to confirm a plan, render it as a temporary HTML page so the user can review what will be created, changed, moved, or removed, and why, without reading the whole chat.

The page serves a reviewer who has a few minutes. It leads with what the reviewer must decide, shows the shape of the change, and keeps everything that only backs the plan up out of the way. A page that lists every fact it knows fails that reviewer: the important points drown, and the review turns into reading.

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

## What the page contains

The order is the point: each section answers a question the reviewer has after the one before it. The sections run from "what must I decide" to "what backs this up".

1. **Summary**: at most three sentences. What changes, why it matters now, what stays the same. Add the counts that fit the plan (files moved, files added, behavior changes, steps) and only counts the plan really has.
2. **Decide**: the questions the reviewer must answer before work starts, three at most. Each one has the options, the recommended one first and marked, a few words on why each option wins or loses, and one sentence with the recommendation and what would change it. If there is nothing to decide, say "no open decisions" in the summary and drop the section.
3. **Shape**: the target, not the history.
   - One context-map diagram of the target, nodes marked by change kind and edges labeled with their context-mapping pattern.
   - The file tree of what the plan adds, changes, moves, or removes, with untouched siblings grouped in one line.
   - A "before" diagram only when the target cannot be read without it. A request-flow diagram only when a request crosses contexts through a contract the plan introduces.
4. **Changes**: one short row each, in the order the work happens.
   - What changes, in the title.
   - Why, in one sentence that names the problem it solves. A change without a reason does not belong in the plan.
   - The test that guards it, and the risk as low, medium, or high.
   - An evidence disclosure (`path:line`, history, rollback) only where the change is contested, medium or high risk, or not obvious from the diff. Do not attach one to every row.
   - With more than about twelve changes, group them by slice or context and write one row per group.
5. **Steps**: every increment in order, each shippable, each with its guard tests, and the point where transitional code goes away.
6. **Appendix**, collapsed so skipping it costs nothing. Only the blocks that have content:
   - Sources: the repository evidence behind the plan and the external principles, each principle named once for the whole plan, not repeated per change.
   - Test plan: every test to run, create, migrate, or write test-first, with the behavior it protects and its step.
   - What stays unchanged, and why.
   - Optional follow-ups that this plan does not include.
   - Hypotheses and the evidence behind each.

Separate verified facts from inferences everywhere: an inferred context or boundary is labeled as a hypothesis. A hypothesis whose answer changes the plan is a decision and belongs in **Decide**, not in the appendix.

## Keep it short

Check each of these before you write the page:

- **Lead with the decision.** A reader who stops after the first screen knows what the plan does, what it costs, and what they must answer.
- **Say a thing once.** A reason lives in one place: the change row, or the decision. A principle lives in the appendix. If two sections say the same thing, cut one.
- **Cut what does not move the decision.** Do not list files that are only moved without a reason, tests that already exist and are not touched, or sources that nobody will open. When unsure whether the reviewer needs a fact, put it in the appendix.
- **One sentence per reason.** If a reason needs a paragraph, it is a decision or an open question, so promote it.
- **Numbers come from the plan.** Never invent a count, a score, or a metric to make the summary look measured.
- **Empty sections are deleted.** A section with filler is worse than no section.

## Visual language

The template follows a monochrome interface: hierarchy comes from stepped surface tones, type weight, and size, inside hairline panels with nearly square corners (2 to 4px). Each panel has a header with its label and an interaction hint, and a dashed footer with the caption and live metadata. Keep it that way.

- **Surfaces**: the page background is the darkest (or lightest) tone; sections sit on `surface-1`, content inside them on `surface-2`, and emphasis on `surface-3` and `surface-4`. Separate elements by tone and spacing, not by borders.
- **Type**: large, tight display headings for sections; small uppercase labels for metadata; body text in a muted tone, with the most important sentence (the recommendation, the reason for a change) in the brightest tone.
- **Change kinds** are told apart by tone, line style, and a glyph, so they stay readable without color:
  - add `+`: solid fill in the foreground tone, like a primary button
  - change `~`: raised surface with a light border
  - move `→`: dashed border
  - remove `−`: dotted border, faded and struck through
  - keep `·`: lowest surface, muted text
- **The recommended option** carries the filled marker and the raised surface; rejected options stay muted. **High risk** is the one filled label among the rows.
- **Labels and interaction state** are the one accent: blue, uppercase monospace with wide tracking, wrapped in brackets (`[ HYPOTHESIS ]`). Use the template's label classes (`eyebrow`, `kicker`, table headers, `hypothesis`) for every label, such as section kickers and hypotheses. The CSS adds the brackets; write only the word.
- The accent also marks interaction state: traced elements, the active filter, and focus. Do not use it anywhere else, and do not add other colors, gradients, shadows, or fonts.

## Extras

When scripts run, the template adds these extras; the page only needs consistent markup:

- **Tracing**: hovering a diagram node, a file row, or a change row highlights everything that shares one of its ref tokens and dims the rest. A Mermaid node's token is its id (`B` in `B["Billing"]`). Give each change row and file row a `data-refs` attribute listing the node ids and any extra tokens that connect them, so every change is reachable from its diagram nodes and files. Clicking a node or a row opens the first change row that shares a token.
- **Filter**: the legend chips filter every diagram, row, and change by change kind.
- **Navigation**: a contents list with scroll tracking, expandable diagram panels, click-to-copy on code and paths, and `j`/`k`/`Esc` shortcuts.
- Translate the strings in the `ui-text` block with the rest of the page.

## Diagrams

- Prefer clean diagrams: rounded nodes, short labels, few node shapes, and left-to-right or top-to-bottom flow without crossing edges where possible. Use top-to-bottom for sequences of more than four steps.
- Keep every diagram within 960px of natural width, so it fits a narrow screen at a legible size; the render script warns past that. Node labels are names, not sentences (about 24 characters; details go in the change rows), and edge labels are a pattern name or a short verb. Siblings line up across the flow: in `flowchart TB` they form a row, in `flowchart LR` a column, so pick the direction that stacks the larger group and keep the other direction to about four nodes. Keep sequence diagrams to about five participants. When a diagram still does not fit, split it by context.
- Mark Mermaid nodes with `:::add`, `:::change`, `:::move`, `:::remove`, or `:::keep`. The page styles these classes; do not add `classDef` or `style` lines, or colors of any kind.
- Show every context, slice, and contract the plan touches in some diagram or in the file tree, and leave untouched parts out or group them in one `:::keep` node.
- Use `flowchart` for context maps and `sequenceDiagram` for request flow. Quote labels that contain punctuation (`A["Billing: Invoice"]`). Keep each diagram's source readable, because it is the fallback when Mermaid cannot load.
- Give each diagram a caption that says what to look at.
