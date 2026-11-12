# Skills

My agent skills and rules. Each skill is a folder under `skills/` with a `SKILL.md`, following the [Agent Skills](https://agentskills.io) format, so any agent that reads that format can use them. Each rule is a plain Markdown file under `rules/`: always-on instructions that any agent can load. Rules aren't part of the plugin installs below; see [Rules](#rules) for how to install them.

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

This symlinks every skill into `~/.agents/skills` (Codex, Gemini CLI, OpenCode and other Agent Skills harnesses) and into the skill directory of each harness found on the machine: `~/.claude/skills`, `~/.cursor/skills`, `~/.copilot/skills`. It also symlinks every rule into `~/.claude/rules` when Claude Code is installed. Edits in the repo take effect right away, and `git pull` keeps them current. Re-run it after adding, removing, or renaming a skill or rule.

- `scripts/link-skills.sh --dry-run` prints what would change.
- `scripts/link-skills.sh --unlink` removes every link into this repo.
- `SKILLS_DESTS=dir1:dir2 scripts/link-skills.sh` links skills into the given directories instead, and links no rules.
- `RULES_DESTS=dir1:dir2 scripts/link-skills.sh` links rules into the given directories instead.

Don't combine local links with a plugin install in the same agent.

## Skills

- **[kaizen](./skills/kaizen/SKILL.md)**: Identify, propose, or implement small continuous improvements using mistake prevention, YAGNI, explicit error values, and incremental refactoring.
- **[modular-thinking](./skills/modular-thinking/SKILL.md)**: Analyze a feature or the whole project through DDD bounded contexts and vertical slices, recommend where new work belongs, or run a test-protected migration toward that structure.
- **[my-voice](./skills/my-voice/SKILL.md)**: Write in your own voice: `setup` saves samples of your formal or informal writing in `~/.agents/my-voice/`, and `express` drafts a text from them, waits for your approval, and delivers it to Slack, email, a PR, or an issue.
- **[pr-agent](./skills/pr-agent/SKILL.md)**: Describe, review, improve, or answer questions about a pull request or local diff using PR-Agent's methods, with code suggestions scored in a second pass that drops weak ones, and optional publishing to the PR.
- **[pr-runtime-evidence](./skills/pr-runtime-evidence/SKILL.md)**: Investigate stored crashes and logs related to code planned for or changed in a PR, connecting them to scoped prevention and regression coverage.
- **[rfc](./skills/rfc/SKILL.md)**: Draft or revise a PR-scoped RFC, ready for the Issue and pull request descriptions.
- **[ui-prototype](./skills/ui-prototype/SKILL.md)**: Prototype the front end of a flow as a grayscale mid-fi, then, after approval, refine it into a hi-fi with handoff documentation, in a connected prototyping app or a self-contained HTML file.

## Rules

- **[code-comments](./rules/code-comments.md)**: Comment why, not what, following *The Pragmatic Programmer*: no comments that restate the code, no comment required on every block or test phase.

Rules are plain Markdown with no frontmatter, so every agent reads them as ordinary instructions. Each agent loads always-on instructions from a different place:

| Agent | Global (all projects) | Per project |
| --- | --- | --- |
| Claude Code | `scripts/link-skills.sh` links them into `~/.claude/rules/` | Copy into `.claude/rules/` |
| Codex | Paste into `~/.codex/AGENTS.md` | Paste into `AGENTS.md` |
| Gemini CLI | Paste into `~/.gemini/GEMINI.md` | Paste into `GEMINI.md` |
| Cursor | Paste into **Settings > Rules > User Rules** | Copy into `.cursor/rules/<name>.mdc` |
| GitHub Copilot | Paste into your personal custom instructions | Copy into `.github/instructions/<name>.instructions.md` with `applyTo: "**"` frontmatter |
| Others | The agent's global instructions file | `AGENTS.md` |

Pasted copies don't update with the repo; re-copy after pulling changes.

## Adding a skill

1. Create `skills/<name>/SKILL.md` with `name` (matching the folder) and `description` in the frontmatter.
2. Add `skills/<name>/agents/openai.yaml` with the Codex picker metadata.
3. Add `./skills/<name>` to the `skills` array in `.claude-plugin/plugin.json`.
4. List the skill in this README.
5. Run `npm run check` and `claude plugin validate .`, then `scripts/link-skills.sh`.
6. Run `npx changeset` to describe the change.

## Adding a rule

1. Create `rules/<name>.md`, in kebab-case, starting with a `# ` title and no frontmatter.
2. List the rule in the [Rules](#rules) section of this README.
3. Run `npm run check`, then `scripts/link-skills.sh`.

## Releasing

Any change that should reach plugin installs needs a changeset (`npx changeset`). On every push to `main`, the Release workflow opens a "chore: version skills" pull request that bumps the version in `package.json` and `.claude-plugin/plugin.json` and updates `CHANGELOG.md`. Merging it publishes the release: plugin installs only update when that version changes. Never edit either version by hand.
