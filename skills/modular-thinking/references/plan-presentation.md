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
- Open it with the platform's opener (`open` on macOS, `xdg-open` on Linux, `start` on Windows) when the environment allows. Always give the user the absolute path.
- In the chat, give a short summary and ask for confirmation. The page is the detailed version; do not repeat it in full.
- The page is a proposal: show the status as awaiting confirmation, and do not edit code until the user confirms.

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

## Diagrams

- Prefer clean diagrams: few node shapes, short labels, consistent colors that match the legend (`add`, `change`, `move`, `remove`), and left-to-right or top-to-bottom flow without crossing edges where possible.
- Cover everything the plan does. Every context, slice, moved group of files, contract, and step must appear in at least one diagram. When a diagram gets crowded, split it, for example one diagram per context, instead of dropping detail.
- Use the Mermaid blocks in the template (`flowchart` for context maps and steps, `sequenceDiagram` for request flow). Quote labels that contain punctuation (`A["Billing: Invoice"]`). Keep each diagram's source readable, because it is the fallback when Mermaid cannot load.
- Give each diagram a caption that says what to look at.
