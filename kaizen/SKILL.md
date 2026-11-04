---
name: kaizen
description: Identify, propose, or implement small continuous improvements using mistake prevention, YAGNI, explicit error values, incremental refactoring, and established project conventions. Use for focused maintainability improvements and cohesive contributions, rather than broad rewrites or architecture migrations.
---

# Kaizen

Improve the project through small, deliberate steps with observable feedback. Apply the continuous-improvement spirit of The Pragmatic Programmer alongside the complementary engineering practices below. Prefer a concrete reduction in mistakes, complexity, or contributor friction over abstract cleanliness.

## Start from evidence and scope

Read applicable instructions, the relevant code and tests, and representative neighboring implementations. Inspect configuration and shared utilities before proposing a new convention. Identify the behavior to preserve and the specific friction or failure to improve.

Match the requested mode: present recommendations when asked for opportunities or review; implement bounded changes when asked to improve or fix code. Do not turn a request for suggestions into edits. During another task, apply these principles within its scope; unrelated findings can be mentioned briefly without expanding the implementation.

Prefer improvements with demonstrated impact, a small affected surface, easy verification, and low adoption cost. State uncertainty when evidence is incomplete. Do not invent findings to produce a list, and do not infer measured performance gains from simpler-looking code.

## Follow the project's established practices

- Reuse existing naming, module boundaries, libraries, formatting, error contracts, and testing practices. Cite a representative file or configuration when recommending alignment.
- Infer conventions from relevant maintained code and explicit configuration, rather than treating an isolated legacy example as the standard. If patterns conflict, choose the closest applicable maintained pattern and explain the choice; ask only when the ambiguity materially affects the delivery.
- Favor changes that make contributions fit together and reduce the number of patterns contributors must learn. Do not introduce a parallel abstraction or library merely because it is personally preferred.
- An explicit request to use a different pattern takes precedence over the inferred convention. Implement the requested departure coherently in the authorized area and explain any integration consequences; do not use it as permission for a project-wide conversion.
- Do not preserve an established defect or unsafe behavior merely for consistency. Address the demonstrated issue at the narrowest responsible layer and make any necessary convention departure explicit.

## Prevent mistakes with Poka-Yoke

Move protection as close as practical to the source of a mistake. Prefer making an invalid operation difficult or impossible over relying on a reminder or a later review.

Use the simplest mechanism supported by the project: explicit types or valid-state models, validated construction, boundary validation, exhaustive handling, safer defaults, or existing automated checks. For example, replace ambiguous positional flags with an existing options pattern, or validate external input once at the boundary instead of scattering defensive checks through trusted internal code.

Choose a mechanism that prevents an evidenced or plausible task-specific mistake. Avoid redundant validation, new tooling, elaborate type machinery, and speculative guardrails whose maintenance cost outweighs the risk they address. Preserve legitimate workflows and existing public contracts.

## Apply YAGNI

Solve the current requirement. Reuse what exists before introducing configuration, dependencies, extension points, generic frameworks, or fallback paths. Similar syntax alone does not justify a shared abstraction when the responsibilities differ.

Keep necessary validation, tests, and sound design for current behavior. YAGNI does not justify ignoring confirmed requirements or leaving an observed defect unresolved. Defer speculative needs explicitly rather than building infrastructure for an imagined future.

## Prefer errors as values for expected failures

When compatible with the language and project, represent expected, recoverable failures explicitly through the established result, error-return, or discriminated-union convention. Make success and failure distinguishable and require callers to handle relevant outcomes. Preserve useful error identity and context without exposing sensitive data.

Distinguish expected failures, such as invalid input or a missing entity, from programmer defects and violated invariants. Do not convert every exception into a result or disguise a failure as successful empty data, `null`, a default value, or a log entry. Keep cancellation and unexpected failures visible according to the runtime's conventions.

Respect existing APIs and framework boundaries. Translate between returned errors and exceptions at the appropriate boundary when needed; do not force a result wrapper into every layer, add a dependency by default, or change public signatures without handling callers and compatibility. If an established exception contract makes a local conversion disproportionate, retain it and explain why. An explicit request for a different error pattern takes precedence.

## Refactor incrementally

Choose the smallest cohesive change that removes the identified friction. Examples include clarifying a misleading name, simplifying a branch, removing confirmed dead code, or extracting a repeated responsibility when it already has a stable boundary.

Establish relevant existing behavior before structural edits, then verify it afterward. Preserve outputs, side effects, ordering, and failure semantics unless the task authorizes a behavior change. Keep behavior fixes distinguishable from structural cleanup so reviewers can assess each.

Avoid unrelated formatting, broad renaming, dependency upgrades, and architectural reshaping. A short diff can still have wide impact: assess affected callers and contracts rather than using line count as the measure of risk. If a candidate requires substantial migration, present it separately instead of treating it as a small refactor.

## Verify, explain, and stop

Use checks proportional to the risk: relevant existing tests, type checks, linting, or focused manual verification. Add regression coverage when it demonstrates an actual failure mode or protects meaningful behavior; avoid tests that merely mirror the implementation. Report checks actually performed and any verification limits.

For recommendations, give a short prioritized list containing the location, observed problem, smallest useful change, expected benefit, and verification approach. Prioritize prevented defects and recurring contributor friction over cosmetic preferences. Do not manufacture numerical scores.

For completed edits, explain the concrete improvement, preserved behavior or intentional change, and validation evidence. Stop when the selected improvement meets its acceptance conditions. Continuous improvement means successive bounded contributions, not an unending cleanup loop. Leave larger opportunities as optional follow-ups without implementing them automatically.

## Sources and interpretation

- Andrew Hunt and David Thomas, The Pragmatic Programmer: continuous improvement is the guiding inspiration. The publisher's [Pragmatic Programmer Tips](https://pragprog.com/tips/) reinforce small steps, feedback, and avoiding speculative future design.
- Lean Enterprise Institute, [Poka Yoke](https://www.lean.org/lexicon-terms/poka-yoke/): simple mistake prevention near the source of defects.
- Martin Fowler, [Yagni](https://martinfowler.com/bliki/Yagni.html): defer capabilities until they are needed.

The preference for errors as values and adherence to existing project conventions are explicit requirements of this skill. They are complementary practices, not claims that all these concepts originate in Kaizen or in the book. This skill is self-contained; fetching the sources is unnecessary for ordinary use.
