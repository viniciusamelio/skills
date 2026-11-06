# High-fidelity refinement

Start only after the user explicitly approves the mid-fi (or part of it). Hi-fi turns the approved structure into the final look and behavior. The question it answers is "is this how it should look and behave?", not "is this the right structure?".

## Freeze the structure

- Keep the approved screens, block order, grouping, content, and chosen variants.
- Allowed: changes that the visual language requires without changing meaning, such as spacing adjusted to the type scale or a block's radius.
- Not allowed without asking: moving, merging, adding, or removing blocks; reordering steps; changing approved copy. If refinement shows a structural problem (for example, real type no longer fits the approved layout), stop, show it, and propose the change.

## Find the visual language

Use the first source that exists, and say which one you used:

1. **The project's design system**: tokens and theme files (CSS custom properties, Tailwind or other theme config, design-token JSON, platform theme files) and the component library. Use existing components wherever one matches a block, and note the component name and path for handoff.
2. **Existing product screens**: screenshots, the live app, or design files the user points to.
3. **References from the user**: images, sites, or apps they name. Take principles (density, contrast, type character), not copies of another product's identity.
4. **A proposed token set**, only when none of the above exists: color roles (background, surfaces, text levels, primary, accent, success, warning, danger, border), a type scale (4 to 6 sizes, two weights), spacing on the mid-fi grid, radii, and elevation. Show it as a small sheet and get a quick OK before applying it.

## What to add

- **Typography**: the real typeface and scale, line lengths of 45 to 75 characters for reading text, consistent line heights.
- **Color by role**, not by element: one accent for the primary action and focus, semantic colors only for status. Keep the mid-fi surface ladder as the base for surface tones.
- **Imagery and icons**: real or representative images where the mid-fi had labeled placeholders, or a refined placeholder if the asset does not exist yet (and say so). One icon set, one stroke weight.
- **Interaction states** for every interactive element: default, hover (pointer devices), focus, pressed, disabled, loading, and selected where they apply.
- **Screen states** from the brief: empty, loading (skeletons that match the real layout), error with a recovery action, success.
- **Motion** only where it explains a change (a sheet entering, an item being removed); state duration and easing in notes.
- **Responsive behavior**: if the brief covers several sizes, show the breakpoints and what reflows.

## Accessibility

- Text contrast at least 4.5:1 (3:1 for large text and for UI component boundaries).
- Never signal state with color alone; pair it with text, an icon, or shape.
- Visible focus indicator on every interactive element; logical focus order that follows the visual order.
- Touch targets at least 44 × 44 px on mobile (24 × 24 px minimum on pointer devices).
- Labels on every form field, and error messages that say how to fix the problem.
- Respect reduced-motion preferences for any animation.

## In HTML

- Copy the approved mid-fi file to a new hi-fi file (or a new version section) and keep the mid-fi untouched as the record.
- Replace the mid-fi tokens with the visual language tokens as CSS custom properties at the top of the file, so handoff can list them.
- Use semantic, native elements (`button`, `a`, `input`, `label`, `nav`, `main`, `dialog`) so the prototype also demonstrates the accessible structure.
- Keep the file self-contained: inline CSS, embedded or local images, no external requests required to render. Scripts are optional; the screens must read with scripts disabled.
- Show interaction states as additional labeled frames or a state strip under the screen, so they are visible without interacting.

## Presenting

Show the hi-fi next to the approved mid-fi for each screen, list the visual language source and any token decisions, call out anything that deviates from the mid-fi and why, and ask for approval with the same rules as the mid-fi gate.
