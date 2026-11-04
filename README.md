# Skills

My agent skills. Each one is a folder under `skills/` with a `SKILL.md`, following the [Agent Skills](https://agentskills.io) format, so any agent that reads that format can use them.

## Installation

Pick one route per agent. A plugin is a read-only bundle that updates from this repo; skills.sh and the local links give you files. Installing two routes in the same agent shows every skill twice.

### Claude Code

```bash
claude plugin marketplace add viniciusamelio/skills
claude plugin install viniciusamelio-skills@viniciusamelio
```

To update, run `claude plugin marketplace update viniciusamelio`.

### Codex

```bash
codex plugin marketplace add viniciusamelio/skills
codex plugin add viniciusamelio-skills@viniciusamelio
```

### GitHub Copilot (CLI and VS Code)

```bash
copilot plugin marketplace add viniciusamelio/skills
copilot plugin install viniciusamelio-skills@viniciusamelio
```

In VS Code, run **Chat: Install Plugin From Source** and enter `https://github.com/viniciusamelio/skills`.

### Gemini CLI

```bash
gemini skills install https://github.com/viniciusamelio/skills.git --path skills
```

Re-run the command to update.

### Any other agent (Cursor, OpenCode, Windsurf, Amp, ...)

```bash
npx skills@latest add viniciusamelio/skills -a <agent>  # omit -a to choose
```

To update, run `npx skills@latest update`, and re-run `add` to pick up new skills.

### Local development (every agent at once)

```bash
git clone git@github.com:viniciusamelio/skills.git
cd skills
scripts/link-skills.sh
```

This symlinks every skill into `~/.agents/skills` (Codex, Gemini CLI, OpenCode and other Agent Skills harnesses) and into the skill directory of each harness found on the machine: `~/.claude/skills`, `~/.cursor/skills`, `~/.copilot/skills`. Edits in the repo take effect right away, and `git pull` keeps them current. Re-run it after adding, removing, or renaming a skill.

- `scripts/link-skills.sh --dry-run` prints what would change.
- `scripts/link-skills.sh --unlink` removes every link into this repo.
- `SKILLS_DESTS=dir1:dir2 scripts/link-skills.sh` links into the given directories instead.

Don't combine local links with a plugin install in the same agent.

## Skills

- **[kaizen](./skills/kaizen/SKILL.md)**: Identify, propose, or implement small continuous improvements using mistake prevention, YAGNI, explicit error values, and incremental refactoring.
- **[modular-thinking](./skills/modular-thinking/SKILL.md)**: Analyze a feature or the whole project through DDD bounded contexts and vertical slices, recommend where new work belongs, or run a test-protected migration toward that structure.
- **[pr-runtime-evidence](./skills/pr-runtime-evidence/SKILL.md)**: Investigate stored crashes and logs related to code planned for or changed in a PR, connecting them to scoped prevention and regression coverage.
- **[rfc](./skills/rfc/SKILL.md)**: Draft or revise a PR-scoped RFC, ready for the Issue and pull request descriptions.

## Adding a skill

1. Create `skills/<name>/SKILL.md` with `name` (matching the folder) and `description` in the frontmatter.
2. Add `skills/<name>/agents/openai.yaml` with the Codex picker metadata.
3. Add `./skills/<name>` to the `skills` array in `.claude-plugin/plugin.json`.
4. List the skill in this README.
5. Run `npm run check` and `claude plugin validate .`, then `scripts/link-skills.sh`.
6. Run `npx changeset` to describe the change.

## Releasing

Any change that should reach plugin installs needs a changeset (`npx changeset`). On every push to `main`, the Release workflow opens a "chore: version skills" pull request that bumps the version in `package.json` and `.claude-plugin/plugin.json` and updates `CHANGELOG.md`. Merging it publishes the release: plugin installs only update when that version changes. Never edit either version by hand.
