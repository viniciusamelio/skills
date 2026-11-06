# Improve

Propose concrete code changes for the new code, then score every candidate in a separate pass and drop the weak ones. The second pass removes most of the noise; never skip it.

## Mode

- **Problems (default):** Only suggestions that fix bugs or other real problems.
- **General:** When the user asks for broader improvements, also include performance, maintainability, and best-practice suggestions.

Both modes exclude: adding docstrings, type hints, or comments; removing unused imports or variables; adding standalone or unrelated imports; using more specific exception types; changing package versions; and repeating what the PR already does.

## Pass 1: generate candidates

For each candidate, prepare:

- **file** and **language**;
- **existing code:** a short excerpt of complete lines copied exactly from the file at the head commit, from lines the PR added or changed;
- **suggestion:** what to change and why, without code;
- **improved code:** a complete replacement for the excerpt, ready to apply as is: no placeholders, no `...`, and matching the file's indentation. Include an import only when the change needs it;
- **summary:** up to 6 words about what changes, without identifiers;
- **label:** in problems mode `critical bug`, `security`, or `general`; in general mode also `possible issue`, `performance`, `enhancement`, `best practice`, or `maintainability`.

Before keeping a candidate, check that every identifier, signature, and import path in the improved code exists in the repository or its dependencies, and that the change does not contradict the rest of the PR.

## Pass 2: score each candidate

Re-read each candidate against the surrounding code as an independent evaluator: try to show it is wrong before accepting it. Score each from 0 to 10, judging candidates independently:

- **0:** wrong; misses an important detail of the PR; improved code does not do what the suggestion says; contradicts the PR's changes; existing code is not in the PR's new lines; or the candidate falls in an excluded category above.
- **8–10:** critical issues such as major bugs or security problems.
- **3–7:** minor issues, style, readability, maintainability.
- **1–2:** correct but marginal.

Caps:

- at most 7 when the suggestion only asks to verify or ensure something;
- at most 8 for error-handling or type-checking suggestions;
- at most 7 when the improved code is the same as the existing code.

Record the exact line range of the existing code in the file at head, with a one- or two-sentence reason for the score.

Drop candidates scoring 0. If the user sets a threshold, drop those below it as well. Report how many were dropped.

## Report

Sort by score, highest first, grouped by label. For each suggestion give the summary as the heading, then `path:start-end`, score and reason, suggestion, and an existing → improved code diff. If nothing survives, say no suggestions were found within the reviewed scope; do not lower the bar to fill the list.

When the user asks for inline comments, a suggestion is committable only if its whole line range is inside the PR's diff on the head side and the improved code replaces exactly those lines. Put the rest in a summary comment.
