#!/usr/bin/env node
// Checks that every skill in skills/ is installable by every route:
// valid frontmatter, Codex metadata, an entry in the plugin manifest, and a
// README entry. Exits 1 and lists the problems when any check fails.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = join(repo, "skills");
const problems = [];

const skills = readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => existsSync(join(skillsDir, name, "SKILL.md")))
  .sort();

for (const name of skills) {
  const source = readFileSync(join(skillsDir, name, "SKILL.md"), "utf8");
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n/)?.[1];
  if (!frontmatter) {
    problems.push(`${name}: SKILL.md has no frontmatter`);
    continue;
  }
  const field = (key) => frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1].trim();
  const declared = field("name");
  if (declared !== name) problems.push(`${name}: frontmatter name is "${declared}", expected "${name}"`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) problems.push(`${name}: name must be lowercase kebab-case`);
  const description = field("description");
  if (!description) problems.push(`${name}: frontmatter has no description`);
  else if (description.length > 1024) problems.push(`${name}: description is over 1024 characters`);
  if (!existsSync(join(skillsDir, name, "agents", "openai.yaml"))) {
    problems.push(`${name}: missing agents/openai.yaml`);
  }
}

const plugin = JSON.parse(readFileSync(join(repo, ".claude-plugin", "plugin.json"), "utf8"));
const listed = new Set(plugin.skills ?? []);
for (const name of skills) {
  if (!listed.has(`./skills/${name}`)) problems.push(`${name}: not listed in .claude-plugin/plugin.json`);
}
for (const path of listed) {
  if (!existsSync(join(repo, path, "SKILL.md"))) problems.push(`plugin.json lists ${path}, which has no SKILL.md`);
}

const readme = readFileSync(join(repo, "README.md"), "utf8");
for (const name of skills) {
  if (!readme.includes(`(./skills/${name}/SKILL.md)`)) problems.push(`${name}: not linked from README.md`);
}

if (problems.length > 0) {
  console.error(problems.map((problem) => `- ${problem}`).join("\n"));
  process.exit(1);
}
console.log(`${skills.length} skills OK`);
