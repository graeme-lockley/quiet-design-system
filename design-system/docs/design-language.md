# Quiet

**The family design language for Alder. Version 1.1.0 — captured 24 October 2026.**

Chosen from four explorations. This document is the idea and the rules. The machine-readable source is [`tokens.json`](../tokens/tokens.json); the rendered proof is [`reference/index.html`](../reference/index.html).

> Quiet is a daylight language for consequential software. It removes everything that competes with the work, then uses the few things that remain — type, space, a hairline, one accent — with precision. It should feel expensive because it is well-proportioned, not because it is decorated.

---

## 1. The idea

Most financial software is either dense and grey, or bright and playful. Quiet takes a third position: **calm confidence**. It assumes the person using it is capable and busy, and that the product's job is to make the next decision obvious without raising its voice.

The visual signature is easy to describe and hard to fake:

- Warm paper, near-black ink, one deep green.
- Structure from 1px rules and alignment, not from cards floating on shadows.
- A single sans-serif family, tightly tracked at display sizes and quietly tracked in labels.
- Generous margins; a narrow measure for prose; right-aligned tabular numbers.
- Almost no decorative motion. What moves, settles.

Quiet is not a neutral default. It is a deliberate point of view: **the interface recedes; the information does not.**

---

## 2. Principles

### 2.1 Confidence through omission
Every element must earn its place. Before adding a border, a background, an icon or a colour, try removing something else. The most important element on a screen is usually the one we choose not to decorate.

### 2.2 Type carries hierarchy
Hierarchy comes from size, weight, measure and space — not from colour. A screen with one typeface can still have seven clear levels. Use the scale in the tokens; do not invent intermediate sizes.

### 2.3 Structure with a line, not a shadow
A hairline is enough. Cards are containers, not floating objects. Reserve shadows for things that genuinely sit above the page: dialogs, popovers, toasts. If two surfaces need separation and neither is transient, use a rule or space instead.

### 2.4 One accent, spent sparingly
The accent marks **where something is live, interactive or in motion**: links, focus, the active navigation indicator, the primary data series, a positive change. It is never wallpaper. If a screen shows the accent in more than roughly 5% of its surface, it is being used as decoration.

### 2.5 Motion settles; it does not perform
Movement explains a change: something opened, something moved, something completed. 120–280 ms, one easing family, no bounce, no parallax, no looping decoration. If removing the animation loses no meaning, remove it.

### 2.6 Accessible by default
Accessibility is a material property, not a review step. Every text role in this system meets WCAG AA against its intended surface. Focus is always visible. Every action has a keyboard path. Status never relies on colour alone. Reduced-motion preferences are honoured without losing function.

---

## 3. The accent, explained

An **accent** is the one chromatic voice in the interface. It is the colour the eye follows when it needs to know "where can I act?" or "what is live?". In Quiet it is a deep evergreen (`#1F4D3D`) by day and a light verdigris (`#A7C8B2`) at night.

It is used for:

| Use | Example | Token |
| --- | --- | --- |
| Interactive text | links, "View all", inline actions | `color.accent` |
| Focus | focus rings, active field | `color.focus` |
| Navigation | the active section indicator and icon | `color.accent` |
| Selection | selected row tint, selected segment | `color.accentWash` |
| Primary data | the main chart series, a highlighted value | `color.accent` |
| Positive signal | inflow, cleared, completed | `color.positive` (a sibling, not the accent) |

It is **not** used for:

- primary buttons — those are ink (or paper in dark mode);
- large backgrounds or headers;
- decorative gradients;
- status by colour alone;
- every app in the family at once.

### One accent for the family

**Decision: the family shares one accent.** App identity is carried by the monogram, the app name and the content — not by a second colour. This is what makes four products read as one family rather than four skins.

A **per-app tint is optional and scoped**. If you later want more orientation, the only permitted use is:

- the app monogram tile in the rail (tinted background or glyph);
- a 2px active-app indicator beneath the monogram.

Never use an app tint for buttons, links, charts, status, selection or focus. Those belong to the family accent. The tints are defined in the tokens under `color.appTint.*` and are off by default.

**Why.** Colour is meaning in this system. If green sometimes means "action" and sometimes means "this is the Ledger app", the user has to decode it. The monogram is a cheaper, clearer identity signal.

---

## 4. Signature elements

These are the details that make a Quiet screen recognisable, even without the logo.

1. **The eyebrow rule.** A 18×1px accent line before a small uppercase context label: `—— SATURDAY, 24 OCTOBER · ZAR`. It is the only ornament on the page.
2. **The two-level rail.** A narrow app rail (monograms) beside a 236px section sidebar. The rail is identity; the sidebar is place.
3. **The hairline card.** 1px line, 8px radius, 20px padding, no shadow. On hover, only the rule darkens.
4. **The ink primary button.** The only solid near-black surface in a light interface; in dark mode it becomes paper. Never a coloured primary button.
5. **Tabular figures, right-aligned.** Money and counts use tabular numerals. Columns align on the decimal, not on the left edge.
6. **The quiet status dot.** A 4px dot inside a small pill, always paired with a word. Colour reinforces; the word carries the meaning.
7. **The open margin — for reading.** A content column that stops at 1180px and leaves air on both sides. The whitespace is part of the identity. **Canvas surfaces are the exception:** boards, wide tables and timelines fill the main column between the sidebar edge and the viewport. The open margin is for reading, not for empty gutters around dense work.

---

## 5. Voice

Quiet sounds like a competent person who respects your time.

- Sentence case everywhere except the small uppercase labels.
- Short, specific sentences. One idea per line.
- Buttons are verbs: "Approve payment", "Create schedule", "Review invoice".
- Empty states say what is missing and what to do next.
- Errors say what happened, what it means, and the next step. Never blame the user.
- No exclamation marks. No "Oops!". No "Let's get started!".
- Use "you" sparingly and never in system messages. Prefer the passive or the object: "Payment scheduled for 24 October" over "You scheduled a payment".
- Numbers, dates and currencies follow the shared format rules in [`ux-architecture.md`](ux-architecture.md#9-content-and-format-rules).

---

## 6. Light and night

Quiet is designed in light first and **has a proper night mode**, not an inverted filter.

| | Light | Night |
| --- | --- | --- |
| Canvas | warm paper `#F7F6F2` | near-black graphite `#0B0C0B` |
| Surface | white | `#111312`, raised `#171A18` |
| Ink | near-black `#15150F` | warm paper `#F2F1E9` |
| Accent | evergreen `#1F4D3D` | verdigris `#A7C8B2` |
| Primary action | ink fill, paper text | paper fill, ink text |
| Elevation | almost none | a lit hairline; shadow only for overlays |

The accent changes value, not identity: it stays green, and it stays the only accent. The full mapping and rules are in [`dark-mode.md`](dark-mode.md).

---

## 7. Do / Don't

| Do | Don't |
| --- | --- |
| Let one number, one sentence or one action lead the screen. | Fill the first viewport with equal-weight cards. |
| Use the canvas mode for boards, wide tables and timelines; fill the main column. | Cap a kanban or a wide table at the 1180px reading measure. |
| Let a sparse sidebar collapse on desktop; provide a 34px toggle and `⌘\`. | Leave a 236px sidebar mostly empty and stick it to the viewport forever. |
| Use ink, space and type for hierarchy. | Use colour to distinguish sections. |
| Use 1px rules at `color.line`; 1px darker rules for section boundaries. | Use drop shadows on cards, tables or inputs. |
| Use a 34px control height (comfortable) or 30px (compact) consistently within a screen. | Mix comfortable and compact in the same form. |
| Right-align money and use tabular figures. | Use proportional figures in columns or KPIs. |
| Keep labels 10–10.5px, uppercase, `.14em` tracking, `color.inkTertiary`. | Use tiny grey text for essential instructions. |
| Use one primary button per view or dialog. | Use two filled buttons side by side. |
| Use an accent wash for selected rows, not a coloured border on every row. | Outline cards with accent to make them "pop". |
| Animate only what changed, 120–280ms, `ease-standard`. | Add entrance animations to every card. |
| Let an empty state teach. | Leave a blank panel that says "No data". |
| Design the error, the empty state and the loading state as first-class screens. | Treat states as an afterthought to the happy path. |

---

## 8. What Quiet is not

- **Not colourless.** The accent is real; it is simply rationed.
- **Not austere.** Warm paper, generous space and a human typeface keep it from feeling clinical.
- **Not a dashboard template.** There is no "card grid" formula. Each screen has one main thought.
- **Not an Apple imitation.** The proportions, the green and the rail are ours. Apple is a reference for restraint, not a source of assets.
- **Not dense.** When a surface genuinely needs density, use the compact density tokens. Do not switch to a different visual language.

---

## 9. Accessibility commitments

| Requirement | Commitment |
| --- | --- |
| Text contrast | ≥ 4.5:1 for normal text, ≥ 3:1 for large text, across light and dark. All core roles are verified in the tokens. |
| Focus | 2px ring in `color.focus`, 2px offset. Never `outline: none` without a replacement. |
| Targets | 34px default, 28px minimum for mouse-dense surfaces, 44px on touch. |
| Keyboard | Every action reachable in a logical order; `⌘K` command palette; `Esc` closes; arrows move within composite widgets. |
| Status | Never colour alone: dot + word, icon + text, or pattern + legend. |
| Motion | `prefers-reduced-motion` removes non-essential transitions; no essential motion is dependent on it. |
| Zoom | Layout remains usable at 200% text zoom; no fixed-height text containers. |
| Content | Errors identify the field and the fix; not just "Invalid input". |

---

## 10. The success test

Show a Quiet screen to someone who has not seen this document. They should describe it as **calm, precise, trustworthy and quietly expensive**. If they describe it as "minimal", "boring" or "like every other dashboard", the balance is wrong: either the type is too timid, the spacing too tight, or the accent has been used as decoration.

---

*Next: [`tokens.json`](../tokens/tokens.json) for the values · [`ux-architecture.md`](ux-architecture.md) for the family model · [`agent/brief.md`](../agent/brief.md) to direct a design agent.*
