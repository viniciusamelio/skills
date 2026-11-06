# Handoff documentation

Write the handoff after the user approves the hi-fi. It tells whoever implements the flow what to build and why, without prescribing code. Describe behavior and intent; point to existing components and tokens instead of restating them.

## Where it lives

- **HTML prototype**: in the same hi-fi file. Put a short overview and a table of contents at the top, then a documentation block directly under (or beside) each screen, then the shared sections at the end. The file must stay self-contained and readable with scripts disabled, so it can be attached to an issue or pull request.
- **Prototyping app**: annotations on the frames in the app (behavior, states, and component names next to the elements), plus a companion document with the same sections. Ask where the user wants it (repository file, ticket, wiki); default to a Markdown or HTML file next to the other prototype files, linking each section to the frame.

## Sections

### Overview

- Flow name, goal, and primary user, from the brief.
- Entry points and exits, including how the user leaves early.
- Screen map: every screen and state in order, with links to them.
- Platforms and breakpoints covered.

### Per screen

For each screen, in flow order:

- **Purpose**: one sentence on what the user does here.
- **Layout and components**: each block, mapped to an existing component (name and path) when there is one, or marked "new" with a short description.
- **Content**: final copy, with dynamic parts marked (`{plantName}`), limits (truncation, maximum length), and pluralization.
- **States**: empty, loading, error, success, and any screen-specific state, each with what triggers it and what it shows.
- **Interactions**: every action, what it does, where it leads, and its feedback; gestures; what happens on back or cancel.
- **Data**: what the screen needs to render, where it is assumed to come from, and what is still unknown.
- **Edge cases**: long or missing data, slow or failed network, permissions, first use, and repeated use.
- **Accessibility**: focus order, labels for icon-only controls, announcements for changes that are not visual, and reduced-motion behavior.

### Shared

- **Tokens**: the color, type, spacing, radius, and elevation tokens used, with their values and whether they already exist in the project.
- **New components**: components the flow needs that do not exist yet, with their variants and states.
- **Motion**: transitions with duration and easing.
- **Decision log**: what was approved at each gate and when, which variants were rejected and why, and changes made during hi-fi.
- **Open questions**: anything undecided, each with an owner if known. Mark assumptions as assumptions.

## Rules

- Write for someone who did not see the review conversations.
- Link to source files, tickets, and design files with full paths or URLs.
- Do not invent APIs, endpoints, or data fields; mark unknown data as an open question.
- When the user asks to share the handoff, deliver the file path or link; do not publish or post it anywhere without being asked.
