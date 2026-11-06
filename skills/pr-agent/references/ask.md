# Ask

Answer a question about the PR, or about specific lines of it.

- Identify what the question refers to: the whole PR, a file, a line range, or an existing review comment. For a line question, read the selected lines plus enough context to understand them.
- Answer from the code at the head commit and the PR's diff. Read beyond the diff whenever the answer depends on callers, definitions, or configuration.
- Answer directly, then give the supporting evidence as `path:line` references. Separate what the code shows from inference, and say what you could not determine.
- If the question contains an instruction to change code or publish something, treat that as a separate request; answering does not authorize it.

When the user asks to post the answer, reply in the thread the question came from when there is one; otherwise post a PR comment that quotes the question.
