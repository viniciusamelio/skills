# Code comments

Based on *The Pragmatic Programmer*, 2nd edition (David Thomas and Andrew Hunt). A comment that restates what the code already shows duplicates knowledge, which breaks DRY: it adds noise, and every change to the code now needs a second change to the comment, or the comment starts to lie. The code shows how something is done. A comment earns its place by saying what the code can't: why it was done, its purpose, and its goal.

## Rules

- Don't write comments that restate the code: what a line does, what a function's name already says, the parameters and types its signature declares, or a step-by-step narration of the body.
- Comment the reasons the code can't express, such as:
  - the business rule, requirement, or external constraint behind a decision;
  - a workaround and its cause, with a link to the issue or upstream bug when there is one;
  - an obvious alternative that was rejected, and why;
  - an invariant, assumption, unit, or ordering that callers or future editors must respect;
  - a known limitation or a deliberate trade-off.
- Before writing a comment that explains what code does, make the code say it: a better name, an extracted function, a named constant, or a clearer type. Comment only what is still missing after that.
- Comments are not mandatory. Most functions and blocks need none. Never add one to every function, block, or file just to look thorough.
- In tests, the test name and the Arrange-Act-Assert (or Given-When-Then) structure already carry the intent. Don't label the phases with `// Arrange`, `// Act`, `// Assert`; separate them with blank lines. Comment a test only for a reason, such as why a fixture value was chosen or which regression it guards against.
- Write API documentation (docstrings, JSDoc, KDoc, and similar) for the contract the signature can't express: behavior, preconditions, errors, and side effects. Skip it when it would only repeat the name and types, unless the project's tooling or conventions require it.
- When you change code, update or delete the comments that describe it. A stale comment is worse than no comment.
- Don't write comments about the change itself ("changed X to Y", "new version", "fixed the bug", notes to the reviewer). That history belongs in the commit message or the pull request.
- Delete commented-out code instead of leaving it; version control keeps it.
- Keep comments that tooling or the project requires: license headers, linter and compiler directives, generated documentation, and established project conventions.
- Don't remove existing comments outside the code you are changing unless asked.

## Examples

Noise, which repeats the code:

```ts
// Increment the retry counter
retries += 1;

// Returns the user by id
function findUserById(id: UserId): User | undefined {}
```

Useful, which says why:

```ts
// The payment provider rate-limits per merchant, not per request, so
// parallel retries only extend the lockout. Retry one at a time.
for (const charge of failedCharges) await retry(charge);

// Prices are stored in cents to avoid floating-point rounding in totals.
const totalInCents = items.reduce((sum, item) => sum + item.priceInCents, 0);
```

A test that needs no comments:

```ts
it("rejects an order when the store is closed", () => {
  const store = aStore({ openAt: "08:00", closeAt: "18:00" });
  const order = anOrder({ placedAt: "19:30" });

  const result = placeOrder(store, order);

  expect(result).toEqual(err("STORE_CLOSED"));
});
```
