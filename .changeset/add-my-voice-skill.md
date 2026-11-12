---
"viniciusamelio-skills": minor
---

Add `my-voice`, a skill that writes in the user's own voice. `setup` chooses a formal or an informal tone, collects samples of the user's messages and speech, and saves them with a derived style profile in `~/.agents/my-voice/`, where every agent on the machine can read them. `express` drafts a text from those samples, waits for the user's approval, and then delivers it to the target: a Slack message, an email, a PR comment, a GitHub issue, or similar.
