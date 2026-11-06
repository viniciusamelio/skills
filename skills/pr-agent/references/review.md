# Review

Give constructive, concise feedback a human reviewer can act on. Find what could go wrong in the new code; do not restate the diff.

## Assess

Work through the changes with the shared rules in mind:

1. Understand intent from the title, description, linked issues, and commits, then check the code against it. Treat stated intent as a claim to verify, not as fact.
2. Follow each changed path into its callers and callees. Check error handling, edge inputs, state transitions, concurrency, resource cleanup, and contract changes visible to other code.
3. Check security: exposed secrets or credentials, injection (SQL, command, path), XSS, CSRF, missing authorization, unsafe deserialization, sensitive data in logs.
4. Check tests: whether the changed behavior is covered and whether new tests assert something meaningful. Run focused tests only when it is cheap and the user's request allows it, and say whether you ran them.
5. Discard candidate issues that fail the bar in SKILL.md. Flag a repeated pattern once and list its locations.

Do not flag intentional design choices or stylistic preferences unless they cause a clear defect. Do not suggest that a change might break other code unless you identified the affected path.

## Report

Use these sections, in this order. Keep each short.

- **Effort to review (1–5):** Time and attention an experienced developer needs. 1 is short and easy; 5 is long and hard.
- **Risk:** `low`, `medium`, or `high`. Use `high` only for a clear bug, security issue, or major regression risk. Give a one-line reason.
- **Tests:** `Yes` or `No`, whether relevant tests were added or updated, with one line on gaps.
- **Security concerns:** `No`, or each concern with a short title and explanation.
- **Key issues:** Up to 3 by default (the user may set another limit), ordered by severity. Each has:
  - a one- or two-word header (`Possible bug`, `Race condition`, `Data loss`, ...),
  - `path:start-end` at the head commit,
  - why it matters and the input or state that triggers it,
  - an evidence level when relevant: *confirmed* (traced or reproduced) or *plausible* (state what is missing).
  Report no issues rather than padding the list.
- **Merge recommendation:** `no concerns found`, `needs review`, or `changes required`.

Add these sections only when they apply or the user asks:

- **Ticket compliance:** When the PR links an issue or ticket you can read. List its requirements in your own words, then which are met, not met, and need human verification (for example UI or behavior you cannot check from code).
- **Failure modes:** Up to 3 concrete ways the change could fail after merge: what, where (`path:function`), trigger, what would detect it (a specific test, alert, or signal, or "nothing"), and whether a check in this PR covers it.
- **Review first:** For large PRs, the few files a human should inspect first.
- **Can be split:** For large PRs with independent concerns, up to 3 proposed sub-PRs, each with a title and its files.
- **TODOs:** TODO comments the PR adds, with locations.
