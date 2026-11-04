---
name: rfc
description: Draft or revise a PR-scoped RFC from existing context or focused questions, ready for the Issue and pull request descriptions. Use when defining or documenting what a specific delivery will accomplish.
---

# PR-scoped RFC

Produce a concise, reviewable agreement about the delivery of one pull request. Use the conversation and available evidence first; ask focused questions when essential information is missing. Write skill-maintained resources in English. Write the generated RFC in the user's requested language, following repository conventions when no language is specified.

## Establish the delivery

- Read applicable repository instructions and relevant Issue/PR descriptions, code, tests, and supplied references. Inspect a diff when documenting work already implemented. Use connected tools when available; do not assume a particular hosting provider or CLI.
- Identify the problem, affected users or systems, intended behavior, and boundary of this PR. Separate existing behavior from proposed behavior and verified facts from assumptions.
- Reuse answers already present in context. Ask only questions whose answers materially affect scope, constraints, observable behavior, or acceptance. Group a few related questions at a time, prioritizing delivery blockers; do not make the user fill out a whole questionnaire.
- When context is sufficient, draft immediately. If the user requests a draft before all answers are known, document unresolved points explicitly. Never invent metrics, deadlines, approvals, owners, architecture agreements, or implementation details.
- If the initiative spans several PRs, describe this PR's slice and identify dependencies or later work without presenting the entire initiative as this delivery.

## Write the RFC

Choose the level of detail to match the delivery:

- **Mini RFC:** For a bounded fix, endpoint, refactor, or small feature, keep the proposal compact. Explain key technical choices and tradeoffs, and define observable success in the acceptance criteria.
- **Tech-Spec RFC:** For a significant architectural change or complex delivery, expand the relevant sections with component interactions, data flows, user journeys, API or schema changes, testing strategy, and implementation phases or dependencies. Add a diagram when it makes the design easier to review. Keep the document scoped to this PR even when referencing a broader design.

Use plain language accessible to reviewers across roles. Invite feedback on an early draft when review is part of the requested workflow; do not impose a fixed review duration or approval ceremony.

Use a descriptive title and the six sections below. Keep each proportional to the change; a small fix can use a sentence or a few bullets per section. Preserve equivalent sections in existing Issue/PR templates rather than duplicating them. Include all six concepts; explicitly state when there are no known constraints, exclusions, or open questions instead of fabricating content.

### Problem Statement

Explain the current problem, who it affects, and why it matters before describing a solution. Include evidence or a concrete failure example when available. Link supporting context where it helps reviewers verify a claim.

### Proposed Solution

Describe what this PR will deliver, including observable before/after behavior and the main flow. Explain implementation choices only to the degree needed to assess the proposal. Distinguish agreed decisions from recommendations. Include alternatives, tradeoffs, compatibility, rollout, or rollback details when material to this delivery, without making them mandatory sections for every change.

### Constraints

Record actual boundaries: existing components to reuse, interface contracts, dependencies, technical or business rules, compatibility, or verified time limits. Distinguish requirements from preferences. Do not promote a suggestion into an established rule.

### Non-Goals

Explicitly exclude adjacent work that a reasonable reader might otherwise assume is included. Make the boundary concrete. Link follow-up work if it exists; do not invent future commitments or silently exclude behavior necessary to solve the stated problem.

### Open Questions

List unresolved decisions and their impact. Label proposed answers and assumptions. Include an owner only when known, and identify questions that block implementation or acceptance. Move resolved answers into the relevant section when revising the RFC. Do not label a document ready for implementation while blocking questions remain.

### Acceptance Criteria

Use Markdown checkboxes for specific, observable outcomes that define completion of this PR. Cover relevant success, failure, and boundary behavior. State how completion can be verified through appropriate tests or manual checks; avoid vague criteria such as “works correctly” or “all tests pass” alone. Do not invent numerical thresholds. Leave criteria unchecked unless evidence establishes they are satisfied, and distinguish planned validation from checks actually performed.

## Place the RFC where work is reviewed

- Prefer the Issue description as the planning home and include the RFC in the PR description as well. A link alone in either description does not replace the delivery scope and acceptance criteria there.
- If one Issue maps to one PR, keep the substantive RFC aligned in both descriptions. If an Issue covers multiple PRs, preserve its broader scope and clearly distinguish this PR's slice; do not overwrite the initiative with a narrower RFC. Include the relevant context, constraints, exclusions, questions, and acceptance criteria for this PR in its description.
- Preserve unrelated content and required template sections. Add reciprocal Issue/PR links when known. When scope changes, revise the affected sections in both descriptions within the authorized task, preserving meaningful review context.
- Creating a local RFC file is secondary: do so only when requested or required by repository conventions. A standalone file or comment should not become the only home by default.
- Drafting an RFC does not authorize publishing it. If the user requests creating or updating Issue/PR descriptions, perform those authorized actions using available tools. Otherwise return ready-to-paste Markdown and name the intended destinations. Do not require another confirmation for publication already authorized by the user.
- If no Issue or PR exists, return the draft without inventing identifiers or creating external artifacts unless requested. If publishing is unavailable or fails, provide the prepared text and report which destination remains pending; never claim it was published.

## Review before handing off

Check that the solution addresses the problem, stays within constraints and non-goals, and maps to verifiable acceptance criteria. Remove unrelated scope and unsupported claims. For an existing PR, reconcile the RFC with the actual diff and flag promised behavior that has not been delivered. Report document readiness separately from implementation or validation status.

## Sources

- Iago Cavalcante, [Anatomia de um Bom RFC](https://imasters.com.br/desenvolvimento/anatomia-de-um-bom-rfc), iMasters, May 11, 2026: the six-section foundation.
- Ilai Fallach, [Writing Technical Specifications: The Art of Tailoring RFCs](https://www.pointfive.co/blog/writing-technical-specifications-the-art-of-tailoring-rfcs), PointFive, March 18, 2025: Mini RFC versus Tech-Spec depth, accessible language, useful diagrams, early feedback, and keeping the document current as implementation evolves.

The Issue/PR placement and delivery workflow are repository-specific guidance. This skill is self-contained and does not require fetching these articles on every invocation.
