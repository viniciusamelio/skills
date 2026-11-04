# Context-mapping patterns

Use these patterns, from Eric Evans' Domain-Driven Design Reference, to name the relationship between two bounded contexts. Name the pattern that describes the relationship today, then the one you recommend, and the reason for any change. Upstream contexts influence downstream ones; downstream contexts depend on what upstream provides.

| Pattern | What it means | Recommend it when |
| --- | --- | --- |
| Partnership | Two contexts succeed or fail together, so their teams coordinate changes and releases. | Both sides change together often and the same people or closely aligned teams own them. |
| Shared Kernel | A small, explicitly agreed subset of the model is shared and changed only by agreement. | A tiny, stable piece of the model is truly identical in both contexts. Keep it minimal and tested. |
| Customer/Supplier | Upstream plans its changes around downstream needs, with agreed contracts. | Downstream depends on upstream, and upstream is willing to accommodate it. |
| Conformist | Downstream adopts the upstream model as is. | Upstream will not accommodate, and its model is good enough for downstream. |
| Anticorruption Layer | Downstream translates the upstream model into its own model at the boundary. | The upstream model is legacy, external, or would distort the downstream language. |
| Open Host Service | Upstream exposes a protocol or API designed for many consumers. | Several contexts integrate with the same upstream. |
| Published Language | A documented, shared exchange format (schemas, events) used across the boundary. | Often paired with Open Host Service, or when contexts integrate through messages. |
| Separate Ways | No integration; each context solves its needs independently. | Integration costs more than the duplication it would remove. |
| Big Ball of Mud | An area with tangled, inconsistent models. | Not a target. Draw a boundary around it and protect other contexts with an Anticorruption Layer. |

## Applying them in code

- Translate at the boundary, in one place per relationship. Test the translation directly.
- Prefer exchanging only what needs to be communicated. A shared model across contexts should cover the overlap, not every concept on either side.
- In a monolith, express the contract as the context's public module interface and keep everything else internal, using the language's visibility rules or the project's existing lint rules for imports.
- Draw the map as a short list or a small diagram: contexts as nodes, relationships as edges labeled with the pattern and direction.
