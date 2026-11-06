# Choosing where to prototype

Offer only what the agent can use right now, plus HTML. Do not guess that an app is connected.

## Recognize prototyping apps

Inspect the tools, connectors, MCP servers, and installed skills the harness exposes. A prototyping app usually shows up as tools or a server whose name contains the product name, with operations to create or edit frames, nodes, layers, or files. Known examples:

| App | Typical signs | Notes |
| --- | --- | --- |
| Figma | `figma` tools or skills; create file, write to canvas, get design context, screenshot | Read-only Dev Mode tools cannot build a prototype; you need a tool that writes to the canvas. Follow any Figma skills installed alongside the tools. |
| Paper | `paper` tools that create or edit artboards | HTML/CSS-based canvas; mid-fi primitives map directly. |
| Pencil | `pencil` tools working on `.pen` files | File lives in the repository, next to the code. |
| OpenPencil | `openpencil` tools | Open-source canvas; check which operations are exposed. |
| Penpot | `penpot` tools | Open-source; check for write operations. |
| Wonder, Framer, others | Tools named after the product | Treat any tool that can create and edit visual frames as a candidate. |

An app is an option only if its tools can **create and edit** frames. If the tools exist but need authentication, list the app as "available after you sign in" and let the user decide.

If a tool behaves differently from what this table says, trust the tool's own description.

## What each option gives the user

- **Prototyping app**: an editable canvas the user and their team can change by hand, comments, and sharing in a tool designers already use. Mid-fi tokens become local styles or variables; primitives become components. Handoff annotations live in the file.
- **HTML**: built here with no account or install; versions are plain files that diff in git; opens in any browser and can be attached to an issue or pull request. The handoff documentation is added to the same file. The user cannot drag things around, so revisions go through the agent.

## How to ask

Present the options in one message, recommend one, and give the reason in a line. A good default:

- Recommend the app the team already uses (check the repository, tickets, and links in the brief for design-file URLs).
- Otherwise recommend HTML when the prototype will mainly be reviewed in conversation, in a pull request, or by developers.

Example:

> Where should I build the prototype?
> 1. **Figma** (connected): editable file your team can comment on. Recommended, since the existing screens are there.
> 2. **HTML file** in `design/prototypes/onboarding/`: self-contained, versioned in git, becomes the handoff document.

If no app is connected, say so and name the apps that would add options once connected, then proceed with HTML if the user agrees.

## Working in an app

- Create one file or page per flow, with a section per screen group and the version tag (`V1`) on the canvas.
- Recreate the mid-fi tokens from [mid-fi.md](mid-fi.md) as variables or styles before drawing, and build the primitives (bar, block, button, card, sheet, note) as components, so revisions stay consistent.
- Use auto layout or the app's equivalent so blocks keep their spacing when content changes.
- After each batch of edits, capture a screenshot through the app's tools and review it before presenting.
- Give the user the file link and the exact page or frame names.
