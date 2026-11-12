# Custom skills and rules

Keep all skill instructions, metadata, and supporting resources in English.
Store each skill in its own directory under `skills/`, with a `SKILL.md` entrypoint whose frontmatter `name` matches the directory.

Keep skills agent-agnostic: name other skills by their bare name and say to invoke them as skills, without assuming a harness's slash-command syntax or tool names.

Every skill must be installable by every route described in `README.md`:

- `skills/<name>/agents/openai.yaml` holds Codex picker metadata (`interface.display_name`, `interface.short_description`).
- `.claude-plugin/plugin.json` lists every skill in its `skills` array. Claude Code, Codex, and Copilot install from it through `.claude-plugin/marketplace.json`. Never edit its `version` by hand: add a changeset (`npx changeset`) for every change that should reach plugin installs, and the Release workflow bumps `package.json` and `plugin.json` together.
- `README.md` links every skill to its `SKILL.md`.

After adding, removing, or renaming a skill, run `npm run check`, `claude plugin validate .`, and `scripts/link-skills.sh`.

## Rules

Store each rule as `rules/<name>.md`, in English and kebab-case, starting with a `# ` title and no frontmatter, so every agent can load it as plain instructions. Keep rules agent-agnostic like skills. List every rule in the Rules section of `README.md`. Rules don't ship in the plugin, so they need no changeset.

After adding, removing, or renaming a rule, run `npm run check` and `scripts/link-skills.sh`.
