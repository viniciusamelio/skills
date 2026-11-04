# Changesets

Every change that should reach plugin installs needs a changeset. Run `npx changeset`, pick `patch` (fix or wording), `minor` (new skill or behaviour), or `major` (removed or renamed skill), and describe the change for someone who installed the skills.

On every push to `main`, the Release workflow opens a "chore: version skills" pull request that bumps `package.json`, copies the version into `.claude-plugin/plugin.json`, and updates `CHANGELOG.md`. Merging it releases the new version and tags it. See the [changesets docs](https://github.com/changesets/changesets).
