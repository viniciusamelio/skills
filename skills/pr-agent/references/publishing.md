# Publishing

Publishing is visible to others and notifies people. Do it only when the user asks, publish exactly what they saw, and report what was posted with links. If publishing fails, give the prepared text and say which destination is still pending.

Examples use the GitHub CLI (`gh`). On another host, use its CLI or connected tools with the same structure. If no authenticated tool is available, return ready-to-paste Markdown.

## Shared conventions

- Write bodies to a temporary file and pass the file (`--body-file`, `--input`), never long text inline in the shell.
- Start each comment with a hidden marker so the next run updates it instead of adding a duplicate: `<!-- pr-agent:review -->`, `<!-- pr-agent:improve -->`, `<!-- pr-agent:describe -->`.
- Collapse long sections with `<details><summary>…</summary>…</details>`.
- Do not write a bare `@name` unless you mean to notify that person.
- Use only the `COMMENT` review event. Approving or requesting changes needs an explicit request.

## Collect PR data

```bash
gh pr view <n> --json number,url,title,body,author,baseRefName,headRefName,headRefOid,files,commits,closingIssuesReferences
gh pr diff <n>
gh api repos/{owner}/{repo}/pulls/<n>/comments --paginate   # inline review comments
gh api repos/{owner}/{repo}/issues/<n>/comments --paginate  # conversation comments
```

`{owner}` and `{repo}` are filled by `gh` from the current repository.

## Summary comment (review, improve, ask)

Find an earlier comment by the current user that contains the marker; update it if found, otherwise create one:

```bash
me=$(gh api user --jq .login)
id=$(gh api repos/{owner}/{repo}/issues/<n>/comments --paginate \
  --jq ".[] | select(.user.login == \"$me\" and (.body | contains(\"<!-- pr-agent:review -->\"))) | .id" | tail -n 1)
if [ -n "$id" ]; then
  gh api -X PATCH repos/{owner}/{repo}/issues/comments/$id -F body=@review.md
else
  gh pr comment <n> --body-file review.md
fi
```

## Inline comments and committable suggestions (improve)

Post everything as one review so it sends one notification. Each comment needs `path`, `line` (last line), `side: "RIGHT"`, and for a range `start_line` with `start_side: "RIGHT"`. Lines must fall inside a diff hunk on the head side; otherwise GitHub rejects the whole review, so put those suggestions in the summary comment instead.

A committable suggestion replaces lines `start_line`–`line` with the block's contents:

````json
{
  "commit_id": "<headRefOid>",
  "event": "COMMENT",
  "body": "<!-- pr-agent:improve -->\nCode suggestions: 2 posted inline.",
  "comments": [
    {
      "path": "lib/example.dart",
      "start_line": 40,
      "start_side": "RIGHT",
      "line": 42,
      "side": "RIGHT",
      "body": "**Possible bug** (score 8): explain the problem.\n\n```suggestion\nreplacement lines\n```"
    }
  ]
}
````

```bash
gh api -X POST repos/{owner}/{repo}/pulls/<n>/reviews --input review.json
```

For a single-line suggestion, omit `start_line` and `start_side`. Use the head commit from the same data you reviewed: if the PR received new commits since then, review again before posting.

## Title and description (describe)

Show the new title and body and confirm before overwriting the author's text, unless the user already asked to update it:

```bash
gh pr edit <n> --title "<title>" --body-file description.md
```
