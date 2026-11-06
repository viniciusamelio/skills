# Mid-fidelity prototype

A mid-fi is a grayscale prototype that settles **structure, hierarchy, content, and flow**. It is more than a sketch: blocks are well defined, spacing is consistent, surfaces have distinct tones, and key copy is real. It leaves open everything about brand and final style.

| Decided in mid-fi | Left for hi-fi |
| --- | --- |
| Screens, order, and transitions between them | Brand color, color roles |
| Layout, blocks, grouping, and alignment | Final typeface and type scale |
| Hierarchy: what is primary, secondary, tertiary | Imagery, illustration, icon set |
| Key copy: headings, actions, labels, messages | Shadows, gradients, motion |
| Which states exist and what each shows | Micro-interactions and polish |
| Chosen variant for each open decision | |

## Theme and tones

Pick light or dark to match the product (existing app, brief, or the user's references). Use the tokens below in every tool; in HTML they are already in the template.

Surfaces form a ladder. Each nested surface is one step away from the page tone: darker in light theme, lighter in dark theme. Never skip more than one step between a surface and its container, and never use more than four steps in one screen.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `canvas` | `#fafaf8` | `#1b1b1b` | Area around frames, labels, and notes |
| `frame-edge` | `#262624` | `#2e2e2e` | Device outline or frame border |
| `page` | `#ecebe7` | `#0e0e0e` | Screen background |
| `surface-1` | `#e1e0db` | `#171717` | Sections, cards, sheets in dark theme |
| `surface-2` | `#d5d4ce` | `#202020` | Cards inside sections, wells, inputs |
| `surface-3` | `#c8c7c1` | `#2a2a2a` | Placeholders for media and avatars |
| `hero` | `#8e8d87` | `#262626` | Large header or hero area that dominates a screen |
| `on-hero` | `#c8c7c1` | `#3d3d3d` | Placeholders on top of the hero |
| `ink-strong` | `#2b2a27` | `#f2f2f2` | Real headings |
| `ink` | `#57564f` | `#a6a6a6` | Real body text |
| `ink-weak` | `#8a8983` | `#6e6e6e` | Captions, metadata |
| `bar-strong` | `#9e9d97` | `#4a4a4a` | Placeholder bar for a heading |
| `bar` | `#c6c5bf` | `#333333` | Placeholder bar for body text |
| `action` | `#7a7973` | `#f2f2f2` | Primary action fill |
| `action-ink` | `#ffffff` | `#111111` | Text on the primary action |
| `action-2` | `#a9a8a2` | `#2a2a2a` | Secondary action fill |
| `line` | `#d0cfc9` | `#262626` | Dividers and outlines |
| `note` | `#6f6e68` | `#9a9a9a` | Annotations |

Only one soft shadow is allowed, for overlays that sit above the page (sheets, dialogs, menus). Everything else separates by tone and spacing.

## Hierarchy

Build hierarchy with these levers, in this order of preference:

1. **Position and size**: the primary element is the largest and comes first in reading order.
2. **Tone**: stronger tone means more emphasis. One primary action per screen uses `action`; secondary actions use `action-2`; tertiary actions are text only.
3. **Grouping**: related items share a surface; unrelated items are separated by space or a surface change, not by lines alone.
4. **Spacing**: an 8 px grid (4 px for tight inner spacing). Space between groups is larger than space within a group.

Type in mid-fi uses one neutral sans-serif (system UI font) with a small scale: display, title, body, caption. Weight and size carry hierarchy; no decorative styles.

## Blocks

Every screen is made of explicit blocks. Typical ones: status or navigation bar, header, hero, section, card, list row, form field, segmented control, tab bar, bottom sheet, dialog, action bar, empty state. Rules:

- Each block has a clear boundary (a surface tone or consistent spacing) and a consistent radius: large for sheets and frames, medium for cards, small for inputs and buttons.
- Align blocks to shared edges; keep one content width per screen.
- Repeated items (list rows, cards in a grid) show at least two or three instances so density and rhythm are visible.
- Show the real container sizes: a sheet covers as much of the screen as it will in the product; a list is as long as a typical case.

## Content

- **Real copy** for headings, buttons, navigation, form labels, empty and error messages, and any text whose wording affects the decision being reviewed.
- **Bars** only for text that is repetitive or not yet written. Size them to the expected length (a name is short, a description is two or three lines) and use `bar-strong` for headings, `bar` for body.
- **Labeled placeholders** for images, charts, maps, and video: a `surface-3` block with a short caption saying what goes there. Circles for avatars and thumbnails; a dashed circle or block for an empty or optional slot.
- **Realistic data lengths**: long names, large numbers, and multi-line values where they occur in practice.
- **Never lorem ipsum.** It hides hierarchy problems that real word lengths reveal.
- No brand logos or real photos. A logo is a small block labeled "logo".

## Annotations

Two kinds, both in the `note` tone and smaller than body text:

- **In-frame notes** sit next to the element they explain: what a placeholder represents, what a tap does, a rule ("the second time, 'Not now' disappears"). Use `→` for "leads to". Keep them to one or two short lines.
- **Designer notes** sit on the canvas beside the frame: rationale, constraints, open questions, and what the reviewer should focus on. One note per frame at most.

Annotations explain behavior and intent, not styling.

## Flow layout on the canvas

- Lay screens out left to right in flow order; put each variant group on its own row or next to each other.
- Label every frame above it: `Screen · A: what is different` (for example, `Account · A: sheet over Today`, `Account · B: full screen with header`). A single-option screen omits the letter.
- Mobile frames are 360 × 760 with a device outline; desktop frames are 1280 wide with a thin border. Show both only if the brief asks for both.
- Put the flow name, version tag (`V1`), date, and status ("mid-fi · awaiting review") at the top of the canvas.
- Include state frames (empty, loading, error) next to the screen they belong to, labeled `Screen · state`.

## Interactivity

Mid-fi is static by default. Show transitions with annotations and frame order. Add clickable links between frames only if the user wants to walk the flow or test it with people; keep them to the main path.

## Checklist before presenting

- [ ] Every screen and state from the screen map is present, in flow order, and labeled.
- [ ] Each open decision has two or three variants, and no other screen has variants.
- [ ] No color outside the tokens; theme matches the product.
- [ ] Each screen has one primary action, and it is the strongest tone on the screen.
- [ ] Surface ladder respected: nested surfaces step one tone at a time, at most four steps.
- [ ] Key copy is real; every bar and placeholder that is not obvious has a note.
- [ ] No lorem ipsum, logos, photos, or icons beyond neutral shapes.
- [ ] Nothing overflows its frame; text does not collide; alignment and spacing are consistent.
- [ ] Version tag and status are on the canvas.
