---
name: modular-thinking
description: Analyze a project, one feature, or the whole codebase through DDD bounded contexts and vertical slices, then recommend where new work belongs or how to migrate toward that structure. Use when the user asks how to organize or modularize code, where a feature should live, which contexts a system has, or wants a test-protected migration to bounded contexts and vertical slices; not for small local refactors.
---

# Modular thinking

Help the project draw its model boundaries on purpose. A bounded context is the area where one model and its language stay consistent; a vertical slice groups everything one use case needs inside that context. Use both lenses to recommend where code belongs, and change the architecture only when the user asks for that change.

## Choose the mode first

Read the request and pick one mode. When it is unclear whether the user wants advice or structural change, ask before editing anything.

- **Assess**: map the contexts and slices of a feature or of the whole project, and recommend improvements. Produce recommendations only; do not edit code.
- **Place new work**: decide which context a new feature belongs to and shape it as a slice, inside the architecture the project already has.
- **Migrate**: move existing code toward explicit contexts and slices, or define new contexts. Only enter this mode when the user asks to migrate, restructure, or define contexts. It edits code, and every step is protected by tests (see below).

Assess and Place new work are non-invasive. Express every suggestion in the project's existing idiom, and keep any suggestion that requires a different architecture as a clearly marked, optional follow-up that you do not implement.

## Learn the current architecture

Read applicable repository instructions, the directory structure, build and module configuration, representative maintained features, and their tests. Identify:

- The architectural style in use (layered, hexagonal, clean, MVC, feature folders, packages in a monorepo, a modular monolith, services) and the structure the framework imposes, such as Django apps, NestJS modules, Rails engines, or Next.js route segments. Treat framework units as the natural place to express a context or a slice.
- Existing module boundaries and how they communicate: imports, shared models, shared database tables, events, HTTP or RPC calls.
- How tests are organized, how they run, and what behavior they actually cover.

Cite representative files for every claim about the architecture. When conventions conflict, follow the closest maintained pattern and say which one you chose.

## Find the bounded contexts

Look for where the language and the rules change, not for technical layers or database tables. Useful evidence:

- **Polysemes**: one term (`Customer`, `Order`, `Product`, `Account`) carrying different attributes, rules, or lifecycles in different parts of the code. Each meaning usually belongs to a different context.
- **Divergent rules**: the "same" entity validated, priced, or transitioned differently depending on the caller.
- **Change coupling**: files that change together in history (`git log` co-changes) reveal a cohesive area; frequent changes spanning several areas reveal a boundary in the wrong place.
- **Data ownership**: which code writes which data. Data written from many unrelated places is a boundary smell.
- **Business capabilities and journeys**: routes, screens, jobs, and integrations grouped by what the business does.
- **People**: code owners, team structure, and the vocabulary in issues and documentation. Boundaries often follow human communication.

Keep each context internally consistent: one meaning per term inside it. Allow different contexts to model the same concept differently, and translate between them only where they actually exchange information. Do not force a single enterprise-wide model, and do not treat a context as a deployable service: in a monolith a context is a module, package, or namespace. Recommend separate deployables only when the user asks.

Model only as much as the problem needs. DDD pays off where domain complexity is the main challenge; for thin CRUD or mostly technical code, say so and keep the structure simple. When the boundary is uncertain, present two or three candidate splits, test them against concrete scenarios from the code, and recommend one with its tradeoffs. Mark inferred contexts as hypotheses the user or domain experts should confirm.

## Shape the vertical slices

Inside a context, organize by use case rather than by technical layer:

- One slice per request, command, query, job, or event handler. It owns its entry point, input validation, logic, data access, and tests.
- Minimize coupling between slices and maximize it within a slice. Adding a feature should mostly add a slice instead of editing shared code.
- Share code inside a context only for the context's model and real invariants that several slices enforce. Do not create shared services or repositories just because code looks similar.
- Start each slice simple, such as a transaction script, and push logic into a richer domain model only when duplication or complexity in the slice calls for it.
- Cross a context boundary only through an explicit contract: a public module interface, a published event or message, or a translation layer. Never reach into another context's internals or tables.

Map each relationship between contexts with a context-mapping pattern; see [references/context-mapping.md](references/context-mapping.md) for the patterns and when to recommend each.

## Place new work without disrupting the architecture

Find the context whose language matches the feature. If none fits, say whether the feature reveals a new context or extends an existing one, with the evidence. Then design the feature as a slice using the existing structure. For example, in a layered codebase keep the layers and group the feature's files by its use case name inside them, or follow the existing feature-module convention. Implement it test-first when the user asks you to build it. Mention a larger restructuring only as an optional follow-up.

## Migrate with tests as the safety net

Preserving behavior is the priority of every migration. Never move code that no test protects.

1. **Agree the target and the first step.** Confirm the target contexts and slice layout, then choose a small first increment with a clear seam and visible value. Migrate gradually, in the spirit of the strangler fig: old and new structures can coexist through temporary delegation that is removed later. Do not propose a big-bang rewrite.
2. **Establish a baseline.** Run the relevant test suite, type checks, and linters, and record the results before any change. Report pre-existing failures instead of fixing them silently.
3. **Create missing tests first.** When the behavior to move has no tests, write characterization tests at the most stable boundary available (public function, handler, HTTP endpoint, message consumer). Pin outputs, side effects, and error cases of the current code, including surprising behavior. They must pass against the unmodified code. Avoid testing internals that are about to move.
4. **Migrate existing tests test-first.** For each slice, follow red, green, refactor. Move or adapt its tests to target the new location and contract first, and watch them fail because the slice does not exist there yet. Move the code until they pass. Then refactor inside the slice with the tests green. Keep the assertions identical: a test is migrated, not rewritten.
5. **Drive new boundary code with TDD.** Contracts, translation layers, and events that the migration introduces are new behavior: write a failing test for each before implementing it.
6. **Keep every step shippable.** After each increment, the full suite passes, old callers either delegate to the new slice or have moved, and the change fits a small, reviewable commit. Remove transitional code once nothing uses it.
7. **Treat behavior changes and data as separate steps.** If a test fails because behavior changed, stop and restore it; change an assertion only when the user authorized that behavior change, and keep that change in its own step. Plan schema or data moves as separate, reversible steps, and flag them for review.

If the user asks for the plan only, deliver the steps above as a proposal without editing code.

## Report

For Assess and Place new work, deliver:

- **Current state**: architectural style, existing boundaries, and test coverage, with cited files.
- **Context map**: each context with its key terms and their meaning there, the slices it owns, and its relationships with the pattern used, as a list or a small diagram.
- **Recommendations**, most valuable first: location, observed problem, suggested change in the project's idiom, benefit, and how to verify it. Mark which ones keep the current architecture and which are optional architectural follow-ups.
- **Open questions** for the user or domain experts, and the hypotheses they would confirm.

For Migrate, also report the baseline, the tests created or migrated, each completed increment, the checks run with their results, and the remaining steps. Do not invent findings, scores, or metrics, and stop when the agreed increment is complete.

## Sources

- Martin Fowler, [Bounded Context](https://martinfowler.com/bliki/BoundedContext.html): one unified model per context, polysemes, and context maps.
- Martin Fowler, [Multiple Canonical Models](https://martinfowler.com/bliki/MultipleCanonicalModels.html): several overlapping models with translation where they overlap, instead of one enterprise model.
- Elemar Jr., [Bounded Contexts e Context Mapping](https://elemarjr.com/clube-de-estudos/artigos/bounded-contexts-e-context-mapping-desmistificando-a-comunicacao-entre-contextos-delimitados/): contexts as logical boundaries between subdomains, found iteratively with domain experts and related through a context map.
- Eric Evans, [What is DDD](https://ddd.academy/blog/what-is-ddd-by-eric-evans): pragmatic, purpose-driven models; several alternatives tested against scenarios; DDD is most valuable when domain complexity is the main challenge.
- Eric Evans, [Domain-Driven Design Reference](https://www.domainlanguage.com/ddd/reference/): the context-mapping patterns.
- Jimmy Bogard, [Vertical Slice Architecture](https://www.jimmybogard.com/vertical-slice-architecture/): organizing by request and coupling along the axis of change.
- Martin Fowler, [Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html): gradual replacement through seams and transitional architecture.

This skill is self-contained; fetching the sources is unnecessary for ordinary use.
