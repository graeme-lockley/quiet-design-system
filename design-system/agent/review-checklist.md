# Review checklist

**Quiet 1.1.0 · the definition of done for every delivery.**

Copy this checklist into the delivery's `DESIGN.md` or pull request. Every box is either checked or explicitly waived with a reason and an owner. Do not delete rows.

---

## A. System integrity

- [ ] The delivery cites `Quiet 1.1.0` and the commit/tag it was built from.
- [ ] Every colour is a semantic role from `tokens.json`; no raw hex, no approximate grey.
- [ ] Every type size, space value, radius and control height comes from the scales.
- [ ] There is **one accent** and it is used only for links, focus, active navigation, selection or the primary data series.
- [ ] There is no second accent, no gradient brand colour and no unscoped app tint.
- [ ] Primary actions are ink (light) or paper (night); no coloured primary button.
- [ ] Cards, tables, inputs and the page have no drop shadows; elevation is only on transient surfaces.
- [ ] The delivery has not forked or overwritten tokens/columns/components.
- [ ] The reference was used as a comparison, not copied as production code.

## B. Composition

- [ ] The screen follows the family grammar: shell → page header → lead thought → 3–4 stats → one main signal → needs attention → recent activity → family bridge (as applicable).
- [ ] There is one page title and one primary thought.
- [ ] There are no more than 4 KPIs, one chart and one needs-attention queue.
- [ ] The main signal is obvious in the first viewport.
- [ ] There is no decorative band, promo, second sidebar or nested modal.
- [ ] Reading pages respect the 1180px measure and 62ch prose; canvas pages fill the main column with 40px padding and no extra max-width.
- [ ] The main content uses the full space between the sidebar boundary and the viewport on canvas pages; no unexplained 58px gutters.
- [ ] The density is consistent within each screen (comfortable or compact, not mixed).
- [ ] The shell uses the 68 / 236 / 56px rail, sidebar and top bar (or the documented responsive behaviour).
- [ ] A sparse desktop sidebar can collapse to 0px; the state persists and the collapsed sidebar is inert.

## C. Components

- [ ] Buttons: one primary, correct variant, 34px default, 28px small, visible hover/focus/disabled/loading.
- [ ] Inputs: label above, helper/error below, 36px, focus ring, error not colour-only.
- [ ] Selection controls: checkbox/radio/switch used for the right job; keyboard operable.
- [ ] Tables: tabular right-aligned numerals, row separators only, no zebra, status in words.
- [ ] Status pills: dot + word, at most three tones on the screen, no accent status.
- [ ] Conversation (if present): no chat bubbles, human message has the accent rule, agent uses name + monogram, composer has a visible send rule.
- [ ] Dialogs/drawers: focus trapped (if modal), Escape closes, focus returns to the trigger, no nested dialogs.
- [ ] Toasts: polite, one action max, 5s, no focus steal.
- [ ] Command palette (if present): `⌘K`, grouped results, keyboard complete, no dead ends.
- [ ] Charts: ≤4 series, ≤12% area fill, dashed grid, text summary or table alternative.
- [ ] Icons follow the reference style (24px grid, 1.5px stroke, `currentColor`); icon-only buttons have accessible names.

## D. States

- [ ] Loading uses skeletons that match the final layout; no spinner in the content area.
- [ ] Empty — nothing yet: title + one sentence + one action.
- [ ] Empty — no results: identifies the filter and offers a reset.
- [ ] Error — field/section/page: what happened, what still works, next step, reference.
- [ ] Offline / stale: quiet banner and a timestamp.
- [ ] Permission: says what is unavailable and how to request it.
- [ ] Success: inline confirmation or quiet toast; no celebratory modal.
- [ ] Destructive: names the object and the consequence; Cancel is the default focus.
- [ ] Long-running / streaming: visible stop, step-level progress, completion announced once.

## E. Both modes

- [ ] Light and night are both designed for every screen and state.
- [ ] Night uses graphite surfaces and the verdigris accent, not an inversion.
- [ ] Primary action inverts correctly (ink in light, paper in night).
- [ ] No pure black or pure white large surfaces in night mode.
- [ ] Focus rings, disabled states, status, charts, skeletons and empty states are verified in both modes.
- [ ] Images/logos are authored for both modes, not CSS-filtered.
- [ ] The mode switch (or system preference) causes no flash and no reload.

## F. Responsive

- [ ] ≥1440: full shell and content measure verified.
- [ ] 1120–1439: layout, tables and content max behave.
- [ ] 860–1119: rail collapse, sidebar/pane behaviour, table scroll.
- [ ] 640–859: sheet navigation, stacked content, sticky actions.
- [ ] <640: single column, 44px touch targets, no clipped primary action.
- [ ] Tested with long names, long amounts, empty data and 200% text zoom.
- [ ] No horizontal page scroll; intentional table scroll only.

## G. Accessibility

- [ ] All text meets AA in both modes; tertiary text is the floor.
- [ ] Focus is visible on every interactive element; no `outline: none` without a replacement.
- [ ] Tab order is logical; dialogs/drawers trap focus and return it.
- [ ] Every action has a keyboard path; composite widgets use arrow keys.
- [ ] Landmarks, headings, labels and errors are programmatically associated.
- [ ] Toasts/status are announced politely; errors assertively; streaming announces start/end, not every token.
- [ ] Status is not colour-only.
- [ ] `prefers-reduced-motion` removes non-essential motion.
- [ ] 34px minimum targets (44px touch); no hover-only actions.
- [ ] Charts have a text summary and/or table alternative.

## H. Content

- [ ] Sentence case; only labels/micro are uppercase.
- [ ] Buttons are verb + object; no "Submit", "OK", "Yes".
- [ ] Money is `R 4,286,410.22`; negative `−R 3,842.18`; percentages one decimal.
- [ ] Dates `24 Oct 2026`; times `14:02`; timezone once.
- [ ] Empty/error/confirmation copy follows the patterns and does not blame the person.
- [ ] No exclamation marks, "Oops", or marketing voice inside the product.
- [ ] No lorem ipsum or placeholder copy remains.

## I. Delivery record

- [ ] `DESIGN.md` is complete and follows the contract.
- [ ] Screens are named by screen + mode + state.
- [ ] The token map is filled in.
- [ ] The state inventory is filled in.
- [ ] Deviations are documented with reason, scope and reconciliation date.
- [ ] System gaps are logged with a proposal and owner.
- [ ] A second reviewer has compared the result with the reference in both modes.
- [ ] Waivers (if any) are listed with names and reasons.

---

## Waivers

| Check | Reason | Owner | Reconcile by |
| --- | --- | --- | --- |
| | | | |

No waiver is valid without a named owner. An undocumented waiver is a defect.
