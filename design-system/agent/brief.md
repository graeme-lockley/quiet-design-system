# Design agent brief — Quiet

**Alder family design language · v1.2.0 · 24 October 2026**

> Paste this file into your design agent before the task. Replace the `[bracketed]` context with the app and screen you are asking for. Then attach or reference [`../tokens/tokens.json`](../tokens/tokens.json) and, if the agent can read images, [`../reference/index.html`](../reference/index.html) or its screenshots.
>
> If the agent has the repository, tell it to read [`../../AGENTS.md`](../../AGENTS.md) first. The full delivery requirements are in [`delivery-contract.md`](delivery-contract.md), and the definition of done is [`review-checklist.md`](review-checklist.md).

---

## 1. Your role and the job

You are designing a screen for **Alder**, a family of applications that share one account, one person, one navigation model and one visual language. The language is called **Quiet**.

**The product you are designing for:** `[APP — e.g. Ledger, Studio, Atlas, Signal]`
**The screen:** `[SCREEN — e.g. overview, account detail, new payment, conversation]`
**The person using it:** `[ROLE — e.g. private client, operator, analyst, advisor]`
**The one thing this screen must make obvious:** `[PRIMARY JOB]`
**The primary action:** `[VERB + OBJECT — e.g. Approve payment]`
**What must not be lost:** `[CONSTRAINT — e.g. the pending total, the payee name, the deadline]`

Do not propose a new visual direction. Your job is to **apply Quiet with taste**, not to reinterpret it. If you think the language cannot carry the job, say so and explain why — do not silently invent a new one.

---

## 2. The language in 60 seconds

Quiet is a daylight language for consequential software. It removes what competes with the work and uses what remains — type, space, a hairline, one accent — with precision. It should feel **calm, precise, trustworthy and quietly expensive**.

- Warm paper (`#F7F6F2`), near-black ink (`#15150F`), one deep green (`#1F4D3D`).
- One sans-serif family. Hierarchy from size, weight and space — not colour.
- Cards are 1px hairlines, 8px radius, 20px padding, **no shadow**.
- The only filled control is the primary button: ink in light, paper in dark.
- The accent is rare: links, focus, active nav, selection, the primary data series. Never wallpaper.
- Generous margins. Content column max 1180px. Prose max 62 characters.
- Money and counts are tabular, right-aligned in columns.
- Motion settles (120–280ms), never performs.
- Dark mode is a real mode, not an inversion: graphite, verdigris, paper action.

---

## 3. Non-negotiables

1. **Use semantic roles.** Colour comes from `../tokens/tokens.json` — `canvas`, `surface`, `ink`, `inkSecondary`, `inkTertiary`, `line`, `lineStrong`, `accent`, `accentWash`, `positive`, `negative`, `warning`, `primaryAction`, `primaryActionInk`, `focus`. Never invent a hex value; never use a raw grey where a role exists.
2. **One accent for the family.** Accent is `#1F4D3D` (light) / `#A7C8B2` (dark). Do not introduce a second brand colour. Do not tint an app; the monogram carries app identity.
3. **One primary action per view or dialog.** Primary = filled ink (light) or paper (dark). Secondary = outlined. Tertiary = ghost. Destructive = outlined negative, filled only inside a confirmation dialog.
4. **No shadows on cards, tables or inputs.** Use a 1px `line` or space. Elevation is only for dialogs, drawers, popovers and toasts (`e2`/`e3`).
5. **One typeface.** System UI stack (SF Pro reference). No serif, no display face, no script, no all-caps paragraphs. Only the label and micro steps are uppercase.
6. **Type scale only.** `display-1 56`, `display-2 44`, `title-1 28`, `title-2 22`, `heading 17`, `body 14`, `body-sm 12.5`, `label 10.5`, `micro 9.5`, `numeric-xl 26`, `numeric-l 20`, `numeric-m 15`. Do not invent intermediate sizes.
7. **Space scale only.** 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96. Prefer fewer, larger gaps.
8. **Radii only.** 2 (tags), 4 (controls), 8 (cards), 14 (overlays), pill (status/avatars). No other values.
9. **Numbers.** Tabular, lining figures. Money: `R 4,286,410.22`; negative: `−R 3,842.18`; percentages one decimal: `−8.1%`; counts no decimals. Right-aligned in columns.
10. **Status is never colour alone.** Dot + word, icon + word. Use at most three status tones on one screen.
11. **Accessibility is the material.** AA contrast, 2px focus ring with 2px offset, 34px default targets (44px touch), complete keyboard path, reduced motion honoured, errors linked to fields.
12. **Both modes.** Every screen, state and component must work in light and dark. Design dark as a mode with its own surface and accent rules, not as an inversion.
13. **No dead ends.** Every empty, loading, error, offline and permission state is designed. The screen is not done at the happy path.
14. **No invented product copy.** Follow the content rules in section 7. If you need a line of copy, write it in the product's voice, not in marketing voice.
15. **Icons follow the reference style.** 24px grid, 1.5px stroke, round joins, `currentColor`; 16px in controls and navigation, 20px in page headers. No filled or mixed icon sets. Icon-only controls have accessible names.
16. **Choose reading or canvas.** Reading pages hold the 1180px measure. Boards, wide tables and timelines fill the main column (40px inline padding) between the sidebar and the viewport. A sparse desktop sidebar can collapse to 0px with a top-bar toggle. If the workspace has one app, omit the rail and put the monogram in the sidebar head; the rail returns at two apps.

---

## 4. How to compose any screen

Use this order. It is the family grammar, not a suggestion.

1. **Shell.** App rail (68px) + sidebar (236px) + top bar (56px) + content (max 1180px). Do not add a third navigation column. Optional inspector only where the task requires side-by-side context.
2. **Page header.** An optional eyebrow (accent rule + 10.5px uppercase context) · one `display-2` title · one sentence of state · up to two page actions, one primary.
3. **Lead with one thought.** The first content block answers the primary job. It can be a headline number, a chart, a list or a single sentence — but only one.
4. **Support with 3–4 stats.** No more. A stat has a label, a value and optional context; a delta only if it is real.
5. **One main signal.** A chart or a focused list. One chart per screen.
6. **A needs-attention queue.** At most 3 items, each with one clear action and a consequence.
7. **Recent activity.** 5–10 objects. Rows, not cards. Link to the full history.
8. **Across the family.** Up to 3 items from other apps, only if relevant. A bridge, not a dashboard.
9. **Footer / provenance.** A quiet line: system, last reconciled time, version or source. No legal boilerplate unless required.

Omit any band the screen does not need. Never add a band to fill space.

---

## 5. Screen patterns

### Overview
Eyebrow → title + state sentence → 3–4 stats → one main signal → needs attention (max 3) → recent activity → across the family. The title says what is true now, not the feature name.

### Object detail
Identity header (name, type, status, actions) → 3–6 key facts → activity timeline → relationships → destructive action last. Use a side panel for glanceable detail; a page for depth.

### Task / form
Single column max 640px → groups of 3–7 fields with a heading and one sentence → labels above fields → inline validation → sticky action bar → review step for consequential actions. More than three fields is a page, never a dialog.

### Conversation
Transcript max 760px, one column, no chat bubbles. Human messages: 2px accent rule + sunken background. Agent messages: same anatomy, agent monogram and name. Composer pinned bottom, 1–8 lines, visible Enter/⌘Enter rule, Stop while streaming. Tool activity collapsible, never the main event.

### Settings
Left sub-nav + single column. Group by object, not by control. One save model. Destructive actions at the bottom, separated by a rule. Appearance (Light / Dark / System) has a live preview.

---

## 6. Required states

Design these for every screen. They are part of the deliverable, not an afterthought.

- **Loading:** skeleton matching the final layout; stable shell; no spinner in the content area; after 10s, a sentence and retry.
- **Empty:** distinguish nothing-yet, no-results, no-access and all-caught-up. Each gets a title, one sentence and one action.
- **Error:** field, section, page or global. Say what happened, what still works, the next step, and a reference.
- **Offline / stale:** quiet banner; read-only is explicit with a timestamp.
- **Success:** inline confirmation or quiet toast; no modal celebration.
- **Destructive:** confirm with the object name and the consequence; Cancel is the default focus.
- **Partial / permission:** say what is available and how to request the rest.
- **Streaming / long-running:** visible stop, progress by step (never a fake percentage), completion announced once.

---

## 7. Content rules

- Sentence case everywhere except labels and proper nouns.
- Buttons are verbs + object: "Approve payment", "Create schedule", "Review invoice" — not "Submit", "OK", "Yes".
- Labels are 10.5px uppercase, `0.14em` tracking, no colon.
- Dates `24 Oct 2026`; times `14:02`; timezone once per screen.
- Currency `R 4,286,410.22`. Negative money `−R 3,842.18`.
- Full name first; initials in avatars. Never "user" in the interface.
- Empty state = what is missing + one action. Error = what happened + consequence + next step. Confirmation = question + consequence.
- No exclamation marks. No "Oops". No "Let's get started". No marketing tone inside the product.
- Never blame the person. Never offer a dead-end "OK".

---

## 8. Hard don'ts

- Don't use a second accent, a gradient brand colour, or an app-specific colour for anything other than the app monogram.
- Don't use drop shadows on cards, tables, inputs or the page.
- Don't use coloured primary buttons. Primary is ink (light) or paper (dark).
- Don't put a card inside a card.
- Don't use a modal for more than three fields, for navigation, or for a second modal.
- Don't add a fifth KPI, a second chart, or a promotional banner to an overview.
- Don't cap a board or wide table at the 1180px reading measure, and don't leave a sparse 236px sidebar permanently open on desktop.
- Don't use all-caps sentences, a serif, a script, or a second sans.
- Don't use pure black or pure white as large surfaces in dark mode.
- Don't use colour as the only status signal.
- Don't use tiny grey text for essential instructions. If it matters, it gets `inkSecondary` or `ink`.
- Don't animate every card on entry; don't bounce, spring or loop.
- Don't invent tokens. If a role is missing, stop and propose it with a contrast check and both mode values.
- Don't redesign the shell per app. The family grammar is fixed; the content changes.

---

## 9. What to deliver back

For the requested screen, return:

1. **A short design intent** (3–5 sentences): what the screen makes obvious, what was removed, what remains.
2. **The screen** at desktop and mobile, in **light and dark**, with the mode shown.
3. **All required states** from section 6, at least as annotated snippets.
4. **Token usage:** a list of the semantic roles used and where. No raw hex values.
5. **Responsive notes:** what collapses, hides, moves or becomes a sheet at each breakpoint.
6. **Accessibility notes:** focus order, landmarks, live regions, keyboard, contrast, touch targets.
7. **Content:** every label, empty state, error and confirmation in the product voice.
8. **Open questions** where the brief is genuinely ambiguous. Do not silently guess.

If the deliverable is code, add: the component names, the token mapping, and a note on how dark mode is switched.

The full evidence requirements are in [`delivery-contract.md`](delivery-contract.md): `DESIGN.md`, light/night/mobile screens, state inventory, token map, completed checklist, deviations and system gaps.

---

## 10. Definition of done

Before you return, check the following. The full, auditable checklist is [`review-checklist.md`](review-checklist.md); complete it in the delivery's `DESIGN.md` or PR.

- [ ] The screen has one primary thought and **one** primary action.
- [ ] It uses only the type, space and radius scales from the tokens.
- [ ] Every colour is a semantic role; no raw hex is visible in the design.
- [ ] The accent appears only on links, focus, active nav, selection or the primary data series — and covers well under 5% of the surface.
- [ ] There is no second accent, no tinted app, and no coloured primary button.
- [ ] No card, table or input has a shadow.
- [ ] Money is tabular and right-aligned in columns.
- [ ] Status is a dot or icon **and** a word.
- [ ] Empty, loading, error, offline, permission and destructive states are designed.
- [ ] Focus is visible everywhere; the keyboard path is complete.
- [ ] Text passes AA in both modes.
- [ ] Night is a designed mode, not an inversion; no pure black or white surfaces.
- [ ] Every button is verb + object; no "Submit", "OK" or "Yes".
- [ ] Nothing is clipped at 200% text zoom or at 360px width.
- [ ] The delivery record is complete, with deviations and system gaps.

## 11. Worked examples

Two illustrations of the family grammar, at delivery level:

- [`examples/ledger-overview.md`](examples/ledger-overview.md) — the full band-by-band overview, including how to choose the one primary action.
- [`examples/conversation.md`](examples/conversation.md) — the conversation surface: transcript, composer, streaming, tool activity and controls.

They are illustrative, not exhaustive. The docs and tokens are authoritative.

## 12. When you are unsure

1. **Ask.** Return the ambiguity with the screen. A good question is cheaper than a confident wrong decision.
2. **Remove.** If two options are equally plausible, choose the one with fewer elements.
3. **Reuse.** If a pattern exists in the component contracts, use it. Do not invent a new one for a single screen.
4. **Escalate the missing token.** If the language genuinely lacks a role, propose it with: purpose, light and dark values, contrast ratios, and where else it would be used. Do not hard-code a one-off.
5. **Check both modes** before showing a single option. A screen that only works in light is not a design.

---

## 13. Reference pack

- [`../../AGENTS.md`](../../AGENTS.md) — the standing agent contract.
- [`../docs/design-language.md`](../docs/design-language.md) — the idea, principles, accent policy.
- [`../tokens/tokens.json`](../tokens/tokens.json) — the canonical values and roles.
- [`../docs/ux-architecture.md`](../docs/ux-architecture.md) — the family shell, navigation and states.
- [`../docs/components.md`](../docs/components.md) — anatomy and behaviour for every core component.
- [`../docs/dark-mode.md`](../docs/dark-mode.md) — the night rules and mapping.
- [`delivery-contract.md`](delivery-contract.md) — what the delivery must contain.
- [`review-checklist.md`](review-checklist.md) — the full definition of done.
- [`../reference/index.html`](../reference/index.html) — a rendered proof, light and dark.

**Version 1.2.0.** If the brief and a token disagree, the token wins. If neither covers the case, propose an addition — don't invent a style.

## 14. Token card — if you cannot open the JSON

Use these values only when the token file is unavailable. The JSON is authoritative; this card is the minimum needed to start.

### Colour roles

| Role | Light | Dark |
| --- | --- | --- |
| canvas | `#F7F6F2` | `#0B0C0B` |
| surface | `#FFFFFF` | `#111312` |
| surface-raised | `#FBFAF7` | `#171A18` |
| surface-sunken | `#F1F0EA` | `#0D0F0E` |
| ink | `#15150F` | `#F2F1E9` |
| ink-2 | `#5F5F58` | `#B8B7AD` |
| ink-3 | `#6C6C64` | `#8E8D84` |
| line | `#E6E3DA` | `#262825` |
| line-soft | `#EFEDE6` | `#1E211E` |
| line-strong | `#D4D0C4` | `#3A3D39` |
| accent | `#1F4D3D` | `#A7C8B2` |
| accent-hover | `#173D30` | `#BBD8C5` |
| accent-wash | `#E7EEE8` | `#16211A` |
| accent-line | `#C9D9CE` | `#2C4034` |
| focus | `#1F4D3D` | `#A7C8B2` |
| primary (action) | `#171713` | `#F2F1E9` |
| primary-ink | `#FAFAF7` | `#0F110F` |
| primary-hover | `#2B2B25` | `#FFFFFF` |
| hover | `#F0EEE7` | `#191C19` |
| selected | `#EDEBE3` | `#1B1F1B` |
| positive | `#2C6A4F` | `#8FD3AC` |
| positive-wash | `#E7F0EA` | `#14241B` |
| negative | `#963A2C` | `#E8A08C` |
| negative-wash | `#F7E9E5` | `#2A1815` |
| warning | `#8A6416` | `#E3C286` |
| warning-wash | `#F6EEDB` | `#2A2315` |
| overlay surface | `#FFFFFF` | `#171A18` |
| scrim | `rgba(21,21,15,.55)` | `rgba(0,0,0,.62)` |

### Type scale

| Step | px | Line height | Tracking | Weight |
| --- | --- | --- | --- | --- |
| display-1 | 56 | 1.0 | −0.04em | 600 |
| display-2 | 44 | 1.02 | −0.035em | 600 |
| title-1 | 28 | 1.15 | −0.025em | 600 |
| title-2 | 22 | 1.2 | −0.02em | 600 |
| heading | 17 | 1.3 | −0.01em | 600 |
| body | 14 | 1.55 | 0 | 400 |
| body-sm | 12.5 | 1.5 | 0 | 400 |
| label | 10.5 | 1.2 | 0.14em | 500 (uppercase) |
| micro | 9.5 | 1.2 | 0.12em | 500 (uppercase) |
| numeric-xl | 26 | 1.15 | −0.02em | 500 (tabular) |
| numeric-l | 20 | 1.2 | −0.01em | 500 (tabular) |
| numeric-m | 15 | 1.3 | 0 | 500 (tabular) |

### Space, radius, measure

- Space: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96 px.
- Radius: 2 (tags), 4 (controls), 8 (cards), 14 (overlays), pill (status/avatars).
- Layout: app rail 68 · sidebar 236 · top bar 56 · content max 1180 · prose 62ch · card padding 20 · gap 16.
- Controls: 34 px default, 28 px small; rows 44 px comfortable, 36 px compact.
- Border: 1 px hairlines; 2 px only for focus rings and section openings.
- Elevation: cards/tables/inputs are flat. e2 for popovers, e3 for dialogs.
- Motion: 120 ms fast, 200 ms base, 280 ms slow; `cubic-bezier(.2,.7,.3,1)`; no bounce.

If a value you need is not here, stop and ask for the token file. Do not approximate with a different grey or green.
