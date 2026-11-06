---
"viniciusamelio-skills": minor
---

Add `pr-agent`, a skill that runs PR-Agent's `describe`, `review`, `improve`, and `ask` tools inside the agent, with no hosted bot or model API key. It reads whole files at the PR's head commit instead of compressed diffs, scores every code suggestion in a second pass and drops the weak ones, fills the repository's PR template, and publishes to the PR only when asked, updating its own earlier comments instead of duplicating them.
