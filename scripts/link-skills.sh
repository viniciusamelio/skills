#!/usr/bin/env bash
set -euo pipefail

# Links every skill in skills/ into the global skill directories of each agent
# harness found on this machine, and every rule in rules/ into the harnesses
# that load a global rules directory. Each entry is a symlink into this repo,
# so a `git pull` keeps them current. Re-run after adding, removing, or
# renaming a skill or rule.
#
# Usage:
#   scripts/link-skills.sh            link into the detected directories
#   scripts/link-skills.sh --unlink   remove every link that points into this repo
#   scripts/link-skills.sh --dry-run  print what would change
#
# Set SKILLS_DESTS or RULES_DESTS to a colon-separated list of directories to
# override detection. Setting only SKILLS_DESTS links no rules.

REPO="$(cd "$(dirname "$0")/.." && pwd)"
MODE="link"
DRY_RUN=0

for arg in "$@"; do
  case "$arg" in
    --unlink) MODE="unlink" ;;
    --dry-run) DRY_RUN=1 ;;
    -h|--help) sed -n '4,17p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "error: unknown option $arg" >&2; exit 2 ;;
  esac
done

run() {
  if [ "$DRY_RUN" -eq 1 ]; then echo "would run: $*"; else "$@"; fi
}

say() {
  [ "$DRY_RUN" -eq 1 ] || echo "$@"
}

# ~/.agents/skills is the shared Agent Skills directory (Codex, Gemini CLI,
# OpenCode and others). Harness-specific directories are added only when the
# harness's home exists. ~/.codex/skills is left out on purpose: Codex already
# reads ~/.agents/skills, and linking both shows every skill twice.
KNOWN_DESTS=(
  "$HOME/.agents/skills"
  "$HOME/.claude/skills"
  "$HOME/.cursor/skills"
  "$HOME/.copilot/skills"
)
# Directories that may hold links created by an older setup. They are cleaned,
# never linked into.
LEGACY_DESTS=("$HOME/.codex/skills")

if [ -n "${SKILLS_DESTS:-}" ]; then
  IFS=':' read -r -a DESTS <<< "$SKILLS_DESTS"
else
  DESTS=("$HOME/.agents/skills")
  for dest in "${KNOWN_DESTS[@]:1}"; do
    [ -d "$(dirname "$dest")" ] && DESTS+=("$dest")
  done
fi

# Claude Code loads every Markdown file in ~/.claude/rules. The other harnesses
# read a single global instructions file instead, which README.md covers.
if [ -n "${RULES_DESTS:-}" ]; then
  IFS=':' read -r -a RULE_DESTS <<< "$RULES_DESTS"
elif [ -n "${SKILLS_DESTS:-}" ]; then
  RULE_DESTS=()
else
  RULE_DESTS=()
  [ -d "$HOME/.claude" ] && RULE_DESTS+=("$HOME/.claude/rules")
fi

points_into_repo() {
  local target
  target="$(readlink "$1")"
  case "$target" in "$REPO"/*) return 0 ;; *) return 1 ;; esac
}

# Remove links into this repo that no longer resolve (renamed or deleted
# skills, or a previous layout). With --unlink, remove all links into this repo.
clean() {
  local dest="$1" entry
  [ -d "$dest" ] || return 0
  for entry in "$dest"/*; do
    [ -L "$entry" ] && points_into_repo "$entry" || continue
    if [ "$MODE" = "unlink" ] || [ ! -e "$entry" ]; then
      run rm "$entry"
      say "removed $entry"
    fi
  done
}

skill_names=()
skill_srcs=()
while IFS= read -r -d '' skill_md; do
  src="$(dirname "$skill_md")"
  skill_names+=("$(basename "$src")")
  skill_srcs+=("$src")
done < <(find "$REPO/skills" -mindepth 2 -maxdepth 2 -name SKILL.md -print0 | sort -z)

rule_names=()
rule_srcs=()
if [ -d "$REPO/rules" ]; then
  while IFS= read -r -d '' rule; do
    rule_names+=("$(basename "$rule")")
    rule_srcs+=("$rule")
  done < <(find "$REPO/rules" -mindepth 1 -maxdepth 1 -name '*.md' -print0 | sort -z)
fi

# Bash 3.2 (macOS) has no namerefs, so callers set names/srcs before calling.
link_into() {
  local dest="$1" i target
  # A destination that is itself a link into this repo would make us write
  # links back into the working copy.
  if [ -L "$dest" ] && points_into_repo "$dest"; then
    echo "error: $dest is a symlink into this repo. Remove it and re-run." >&2
    exit 1
  fi
  run mkdir -p "$dest"

  for i in "${!names[@]}"; do
    target="$dest/${names[$i]}"
    if [ -e "$target" ] && [ ! -L "$target" ]; then
      echo "skip $target: a real file or directory exists there (installed by another tool?)" >&2
      continue
    fi
    if [ -L "$target" ] && ! points_into_repo "$target"; then
      echo "skip $target: links somewhere else ($(readlink "$target"))" >&2
      continue
    fi
    run ln -sfn "${srcs[$i]}" "$target"
    say "linked ${names[$i]} -> $dest"
  done
}

for dest in "${DESTS[@]}" "${LEGACY_DESTS[@]}" ${RULE_DESTS[@]+"${RULE_DESTS[@]}"}; do
  clean "$dest"
done

[ "$MODE" = "unlink" ] && exit 0

names=(${skill_names[@]+"${skill_names[@]}"})
srcs=(${skill_srcs[@]+"${skill_srcs[@]}"})
for dest in "${DESTS[@]}"; do
  link_into "$dest"
done

names=(${rule_names[@]+"${rule_names[@]}"})
srcs=(${rule_srcs[@]+"${rule_srcs[@]}"})
for dest in ${RULE_DESTS[@]+"${RULE_DESTS[@]}"}; do
  link_into "$dest"
done
