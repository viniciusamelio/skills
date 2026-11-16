---
name: semantic-software-vocabulary
description: Name variables, fields, parameters, functions, classes, files, and modules with precise, intention-revealing words from the project's domain, and replace generic or inconsistent names such as `_state`, `data`, `manager`, `temp`, or `flag`. Use when writing or reviewing code that introduces or changes names, or when the user asks to improve naming; not for formatting or for renaming that the user did not ask for outside the code being changed.
---

# Semantic software vocabulary

A name is the cheapest documentation the code has, and the one every reader sees first. A good name says what the thing is and why it exists, in the words the business and the team already use. Choose names that make the next reader's question unnecessary, instead of the first name that comes to mind.

## Workflow

1. **Learn the vocabulary.** Before naming, read the surrounding code, the domain terms in the project (types, modules, tests, docs, issues), and the language's own conventions. The project's established word for a concept always beats a better-sounding synonym.
2. **Name by role and meaning.** For each new element, answer: what is it, what is it for, and what would a domain expert call it? Write that as the name.
3. **Run the checks below** on every name you introduce or touch.
4. **Rename within scope.** Fix names in the code you are writing or changing. Do not rename untouched code, public APIs, persisted fields, or wire formats unless the user asks; report them as suggestions instead.
5. **Keep behavior identical.** Rename with the editor's or compiler's refactoring support when available, and run the tests and type checks afterwards. A rename never rides along with a behavior change.

## Principles

**Reveal intent.** The name explains why the element exists, what it does, and how it is used. If a name needs a comment to be understood, change the name.

**Name what it is, not how it is made.** Describe the effect and purpose, not the mechanism or the storage technology: `UserRepository`, not `UserSqlRepository`; `signUpForMagazine`, not `createCustomerRow`.

**Use the ubiquitous language.** Take the term the domain experts use, one term per concept inside a bounded context, and the same term in code, tests, and conversation. Drop empty words that add no business meaning (`Info`, `Item`, `Base`, `Entity`, `Aggregate`, `ValueObject`): `User`, not `UserInfo`. Keep a suffix only when the business itself uses it (`CustomerRegisteredEvent`).

**Carry the role, not the incidental detail.** A field that holds a collaborator is named after the collaborator's role in this class, with the qualifier that distinguishes it from its neighbors and nothing more.

**One word per concept, one concept per word.** Pick one verb for one responsibility (`fetch`, `get`, or `retrieve`, never all three) and never reuse a word for a different concept (`add` that appends in one place and sums in another).

**Make differences visible.** Two names that differ must differ in a way that tells the reader what the difference means. Never separate names with numbers (`user1`, `user2`), noise words (`dataObject` vs `data`), or near-identical spelling (`accounts` vs `accountList`).

**Do not mislead.** Never use a word with an established technical meaning for something else (`accountList` that is not a list), and avoid names that differ only slightly or look alike (`l`, `O`, `1`). Remove a name's claim when the code stops honoring it.

**Spell it out.** Use dictionary words, pronounceable and searchable, instead of abbreviations (`modificationTimestamp`, not `modymdhms`) and single letters (except the conventional loop index in a tiny scope and well-known math or domain symbols). Keep a project abbreviation only when the whole team and the domain already use it (`url`, `id`, `http`).

**Fit length to meaning.** Longer names are fine when they add information; they are a smell when they repeat context (`CustomerRepository.customerRepositorySave`), pile up past four or five words, or signal that the element does too much. A name that cannot be shortened without losing meaning may point to a missing concept or intermediate variable.

## Name by kind of element

| Element | Rule | Weak | Stronger |
| --- | --- | --- | --- |
| Class, type, interface | Noun or noun phrase for the concept. Avoid generic roles that hide the responsibility (`Manager`, `Processor`, `Handler`, `Helper`, `Util`, `Service` on its own, `Data`, `Info`) | `OrderProcessor` | `OrderPlacement`, `DiscountRule` |
| Function, method | Verb phrase naming the effect and its subject. Reserve `get`, `is`, and `has` for cheap, side-effect-free reads; use `validate`, `check`, and `ensure` only when the call returns a verdict or throws; use `convert`, `to`, and `parse` only when it returns the result | `process(order)` | `reserveStock(order)` |
| Variable, field, parameter | Noun that says what it holds, in the domain's words. A collaborator is named after its role | `_state`, `data`, `tmp` | `_customerRepository`, `pendingInvoices`, `retryDelay` |
| Boolean | A true/false state or question in positive form, without type noise | `flag`, `notSuccessful`, `isValidBoolean` | `paid`, `successful`, `canRetry` |
| Collection | Plural noun, or a collective noun when one exists | `userList`, `appointments` | `users`, `calendar` |
| Constant | The concept the value stands for, never the value | `SEVEN`, `3.14` | `DAYS_IN_WEEK`, `pi` |
| Enum value, event, command | Event in the past tense (`OrderPlaced`), command in the imperative (`PlaceOrder`), enum values as states or categories that fit every member | `OrderEvent1`, `Start` | `OrderPlaced`, `Extremity` |
| Test | A sentence stating the behavior and the condition; see the project's test naming first | `test1`, `testSave` | `rejects an order when the store is closed` |
| File, module, package | The one concept or capability it holds, matching its main export. Avoid `utils`, `helpers`, `common`, `misc` as catch-alls | `helpers.ts` | `shipping-cost.ts` |

## Worked example

A use case that depends on a `CustomerStateRepository`:

```dart
class DeactivateCustomer {
  DeactivateCustomer(this._state);
  final CustomerStateRepository _state;
}
```

`_state` says nothing about what the field is, and it lies by omission: it is a repository, and it belongs to the customer concept. Prefer the role the collaborator plays and the domain word it serves:

```dart
class DeactivateCustomer {
  DeactivateCustomer(this._customerRepository);
  final CustomerStateRepository _customerRepository;
}
```

Keep the qualifier when it separates collaborators in the same class, such as `_customerStateRepository` next to `_customerBillingRepository`. Drop the part of the type name that adds no distinction, such as a storage or pattern word the reader does not need, and keep the part that does.

## Generic names to replace

Treat these as prompts to look for a real name, not as banned words. They stay acceptable when they are the actual concept in a generic utility (`map` over a `T`, `i` in a three-line loop).

`data`, `info`, `item`, `obj`, `value`, `result`, `temp`, `tmp`, `flag`, `state`, `status` (when it hides the meaning), `list`, `map`, `manager`, `handler`, `helper`, `util`, `processor`, `service` (alone), `doIt`, `run`, `handle`, `execute` (alone), `foo`, `blah`, and numbered siblings (`user1`, `user2`).

For each hit, ask what the value is for, and what the domain calls it. If no domain word exists, name the role (`pendingInvoices`, `retryDelay`, `selectedPlan`), not the container.

## Respect the project and the language

- Follow the language's casing and visibility conventions (a leading underscore for private members in Dart, `snake_case` in Python and Rust, `camelCase` in JavaScript, Java, Kotlin, and Swift), and enforce them with the project's linter when it has one.
- Follow the project's established patterns for suffixes, prefixes, and layer names (`*Controller`, `*Repository`, `use-*`) when they exist, and do not import a different scheme.
- When the project vocabulary conflicts with these principles, follow the project in code that already exists and apply the principles to new names. Mention the conflict when it matters.
- Do not rename a name that is already precise just to match a preference.

## Report

When asked to review naming, list each weak name with its location, why it is weak (generic, misleading, inconsistent, mechanism-focused, or abbreviated), and a concrete replacement, most valuable first. When writing code, apply the names directly and mention only the non-obvious choices, such as a domain term you took from the project and an inconsistency you left alone because it was out of scope.

## Sources

- Robert C. Martin, *Clean Code*, ch. 2 "Meaningful Names": intention-revealing, non-misleading, distinct, pronounceable, searchable names; one word per concept. Summarized in [Writing clean code: Naming](https://thenewdeveloper.substack.com/p/clean-code-naming) and [Clean Code Naming Conventions](https://medium.com/@pabashani.herath/clean-code-naming-conventions-4cac223de3c6) (descriptive, unambiguous names).
- Eric Evans, [Domain-Driven Design Reference](https://www.domainlanguage.com/ddd/reference/) and Khalil Stemmler, [Intention Revealing Interfaces](https://khalilstemmler.com/articles/typescript-domain-driven-design/intention-revealing-interfaces): name by effect and purpose, not by mechanism; avoid techy names such as `Processor` and `Manager`.
- Vladimir Khorikov, [Ubiquitous Language and Naming](https://enterprisecraftsmanship.com/posts/ubiquitous-language-naming/): business vocabulary in domain classes, weasel words, no storage technology in names.
- Peter Hilton and Felienne Hermans, [Naming guidelines](https://hilton.org.uk/presentations/naming-guidelines): precise vocabulary, singular and plural, boolean and method-verb conventions, no numbered or abbreviated names.

This skill is self-contained; fetching the sources is unnecessary for ordinary use.
