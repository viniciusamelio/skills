# Semantic software vocabulary

A name is the cheapest documentation the code has. Name every element by what it is and why it exists, in the words the domain and the project already use, so the reader never has to ask. For the full conventions, per kind of element, invoke the `semantic-software-vocabulary` skill.

## Rules

- Reveal intent: the name says why the element exists, what it does, and how it is used. If a name needs a comment to be understood, change the name.
- Name the role and the domain concept, not the mechanism or the storage technology. A repository field in a customer use case is `_customerRepository`, not `_state`.
- Prefer the project's established vocabulary and the domain's ubiquitous language: one term per concept, the same term in code, tests, and conversation. Drop empty words (`Info`, `Item`, `Base`, `Entity`, `Aggregate`) unless the business itself uses them.
- Avoid generic names (`data`, `info`, `obj`, `value`, `result`, `temp`, `flag`, `state`, `manager`, `handler`, `helper`, `util`, `processor`, `doIt`) and numbered siblings (`user1`, `user2`). They are acceptable only when they are the real concept in a generic utility. Otherwise name the role.
- Use one word per concept (not `fetch`, `get`, and `retrieve` for the same job) and never one word for two concepts.
- Make differing names differ in meaning. Don't mislead: a name must not claim a type or behavior the code doesn't have.
- Spell words out. Use pronounceable, searchable dictionary words; keep an abbreviation only when the whole team and the domain already use it.
- Classes and types are nouns; functions are verb phrases; booleans are positive true/false states; collections are plural; constants name the concept, not the value.
- Follow the language's casing and visibility conventions and the project's suffix and layer patterns.
- Fix names only in the code you are writing or changing. Don't rename untouched code, public APIs, persisted fields, or wire formats unless asked, and never mix a rename with a behavior change.
