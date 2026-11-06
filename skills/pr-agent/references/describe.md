# Describe

Write a PR title and description from what the code does. The existing title, description, and commits may be partial, generic, or stale: compare them with the diff and use them only as hints.

## Gather

Read the full diff and enough of each changed file to understand its role. Identify the main change, the secondary changes, and any behavior change visible to users or other systems. Collect linked issue or ticket references, the repository's PR template, and title conventions from instructions, CI checks (for example a title-format workflow), or recent merged PRs.

## Produce

- **Title:** Concise, describing the main theme. When the repository has a title convention, follow it exactly; do not invent a ticket number. If it requires one you cannot find, leave a visible placeholder and say so.
- **Type:** One or more of `Bug fix`, `Tests`, `Enhancement`, `Documentation`, `Other`. Map to the repository's own change types when its template defines them.
- **Description:** 1–4 bullets of up to about 8 words each, most important first. For a large PR, add sub-bullets.
- **Files walkthrough:** For each changed file (up to about 20; group the rest by directory), a 5–10 word title of the change, 1–4 bullets of what changed, and one label (`bug fix`, `tests`, `enhancement`, `documentation`, `error handling`, `configuration changes`, `dependencies`, `formatting`, `miscellaneous`, ...). Present it as a table or a collapsible section.
- **Diagram:** Only when the user asks or the change has a flow worth showing: a short Mermaid `flowchart LR`.

## Fill the PR template

When a PR template exists, the output is that template filled in: keep its headings, order, checklists, and required fields, and put the summary and walkthrough in the matching sections. Leave checkboxes unchecked unless the evidence establishes them, for example tests you ran. Do not invent links, screenshots, test evidence, or ticket IDs: mark them as pending for the author.

When the PR already has a description written by the author, preserve the author's content that is still accurate and add what is missing. When updating, show what you would replace.
