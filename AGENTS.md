# AGENTS.md — Quiet Design System

**Project `quiet-design-system` · Alder family design language · v1.2.0**

You are building UI for an application in the Alder family. This repository is the **design contract**. A delivery is not complete because it looks close; it is complete when it follows this file, uses the canonical tokens, and passes the review checklist.

This repository is **not an application**. Do not add product UI to it. Build the delivery in its own repository and cite this design system by version.

`Alder`, `Ledger`, `Studio`, `Atlas` and `Signal` are placeholder names from the reference. The design language is **Quiet**. Rename the family in a delivery without changing the tokens, the accent policy or the grammar.

---

## 1. Read in this order

1. This file.
2. [`design-system/tokens/tokens.json`](design-system/tokens/tokens.json) — the exact values and semantic roles.
3. [`design-system/docs/design-language.md`](design-system/docs/design-language.md) — the idea, principles and accent policy.
4. [`design-system/agent/delivery-contract.md`](design-system/agent/delivery-contract.md) — what the delivery must contain.
5. [`design-system/docs/ux-architecture.md`](design-system/docs/ux-architecture.md) and [`design-system/docs/components.md`](design-system/docs/components.md).
6. [`design-system/agent/review-checklist.md`](design-system/agent/review-checklist.md) — the definition of done.
7. [`design-system/reference/index.html`](design-system/reference/index.html) — the rendered proof. Compare against it; do not copy its implementation.

**Do not read `archive/` for guidance.** It is the historical exploration that led to Quiet. It is not current.

---

## 2. Non-negotiables

These are not suggestions. If a product requirement conflicts with one, raise it; do not silently override it.

1. **One accent for the family.** Evergreen `#1F4D3D` in light, verdigris `#A7C8B2` in dark. It is used for links, focus, active navigation, selection and the primary data series. Never for the primary button, never for a status, never as an app tint in the default system.
2. **One primary action per view or dialog.** Primary is ink (light) or paper (dark). One filled control. If two actions are equally primary, one belongs in a page header or an overflow menu.
3. **No shadows on cards, tables, inputs or the page.** Structure comes from a 1px hairline and space. Elevation is only for dialogs, drawers, popovers and toasts.
4. **One typeface.** Use the system UI stack (SF Pro reference) or Inter when cross-platform consistency is required. No serif, no display face, no second sans. Only labels and micro text are uppercase.
5. **Semantic roles only.** Colours come from `tokens.json` roles — `canvas`, `surface`, `ink`, `inkSecondary`, `inkTertiary`, `line`, `lineStrong`, `accent`, `accentWash`, `positive`, `negative`, `warning`, `primaryAction`, `primaryActionInk`, `focus`. No raw hex, no approximate grey, no token forks.
6. **Type, space and radii come from the scales.** Do not invent intermediate sizes, spacing values or corner radii.
7. **Money and comparable numbers are tabular and aligned.** Right-aligned in columns; `R 4,286,410.22`, `−R 3,842.18`, `−8.1%`.
8. **Status is never colour alone.** Dot or icon plus a word. Use at most three status tones on one screen.
9. **Both modes are designed.** Every screen, component and state must be checked in light and night. Night is not an inversion; see [`design-system/docs/dark-mode.md`](design-system/docs/dark-mode.md).
10. **All states are designed.** Loading, empty, no-results, error, offline, stale, permission, success and destructive confirmation. A happy-path screen is not done.
11. **Accessibility is material.** WCAG AA contrast, a visible 2px focus ring with 2px offset, a complete keyboard path, 34px targets (44px touch), reduced-motion support, and accessible names.
12. **Follow the family grammar.** App → section → object. Two levels of chrome, then content. Every overview uses the same bands. Do not add a third navigation column, a fifth KPI, or a second chart.
13. **Icons follow the reference style.** 24px viewBox, 1.5px stroke, round caps and joins, `currentColor`, 16px in navigation and controls, 20px in page headers. No filled or mixed icon sets. See [`docs/iconography.md`](design-system/docs/iconography.md).
14. **Choose the layout mode.** Reading pages (overview prose, settings, forms) hold the 1180px measure. Canvas pages (boards, wide tables, timelines) fill the main column with 40px padding. Never cap a canvas at the reading measure. A sparse desktop sidebar can collapse to 0px. If the workspace has exactly one app, omit the 68px rail and put the monogram in the sidebar head; the rail returns at two apps.

---

## 3. Source of truth and precedence

| Rank | Source | If it conflicts |
| --- | --- | --- |
| 1 | [`tokens.json`](design-system/tokens/tokens.json) | The token wins. |
| 2 | [`design-language.md`](design-system/docs/design-language.md), [`ux-architecture.md`](design-system/docs/ux-architecture.md), [`components.md`](design-system/docs/components.md), [`dark-mode.md`](design-system/docs/dark-mode.md) | The written contract wins over a rendering. |
| 3 | [`reference/index.html`](design-system/reference/index.html) | The proof wins over an example. |
| 4 | [`agent/examples/`](design-system/agent/examples/) | Examples are illustrative, not exhaustive. |

If the token file and a document conflict, **the token wins**. Report the conflict. If neither covers the case, propose an addition (see §7) — do not invent a one-off.

The rendered reference is **plain HTML/CSS only to make the language judgeable**. It is not a component library and does not imply the delivery's stack. Do not copy its CSS wholesale; implement the contracts in the delivery's own technology.

---

## 4. Delivery workflow

Do this in order for every screen or app.

1. **Pin the version.** Record `Quiet 1.2.0` and the commit/tag you are working from in the delivery's `DESIGN.md`.
2. **Write the context before the UI.** Use the template in [`delivery-contract.md`](design-system/agent/delivery-contract.md): product, person, primary job, primary action, constraints, what must not be lost.
3. **Inventory the screens and states.** List every screen, overlay and state before designing. Include light and night.
4. **Compose against the family grammar.** Shell → page header → lead thought → 3–4 stats → one main signal → needs-attention → recent activity → family bridge. Omit what is not needed; do not add bands to fill space.
5. **Implement using the delivery's stack.** Map semantic roles to its mechanism. Do not fork tokens, hard-code colours or create a parallel component language.
6. **Verify.** Both modes, all states, responsive breakpoints, keyboard, focus, contrast, reduced motion, 200% text zoom, real content lengths.
7. **Complete the review checklist.** Copy it into `DESIGN.md` or the PR. Every box is checked or explicitly waived with a reason.
8. **Record drift.** Any deviation and any missing pattern/token goes in the delivery record and back to this repo as a proposal.

---

## 5. Required delivery artifacts

Every delivery must contain these, regardless of stack:

- `DESIGN.md` — context, screens, token usage, states, responsive, accessibility, deviations, system gaps, version pin.
- Screens for **light, night and mobile**, plus the key states.
- A **state inventory** covering loading, empty, no-results, error, offline, permission, success and destructive.
- A **token map** naming the semantic roles used (not raw values).
- The **completed review checklist**.
- A **deviations + system gaps** section. Silence is not a waiver.

The contract and template are in [`design-system/agent/delivery-contract.md`](design-system/agent/delivery-contract.md).

---

## 6. Hard don'ts

- Don't use a second accent, a gradient brand colour, or an app-specific colour outside the documented, scoped monogram tint.
- Don't use a coloured primary button. Primary is ink or paper.
- Don't put a card inside a card.
- Don't use a modal for more than three fields, for navigation, or as a parent of another modal.
- Don't use a fifth KPI, a second chart, or a promotional banner on an overview.
- Don't use all-caps sentences, a serif, a script, or a second sans.
- Don't use pure black or pure white as large surfaces in night mode.
- Don't use tiny grey text for essential instructions. If it matters, it gets `inkSecondary` or `ink`.
- Don't animate every card on entry; no bounce, spring, parallax or looping decoration.
- Don't use colour as the only carrier of status, selection or error.
- Don't invent a token, component or page pattern. Propose it.
- Don't edit `tokens.json`, generated token files or the reference to make a delivery pass. Fix the delivery or propose a system change.
- Don't import the explorer or archive as current guidance.

---

## 7. When the system is missing something

You may encounter a real product need the system does not cover. Do not improvise a parallel style.

1. **Check** the tokens, components, patterns and examples first.
2. **Compose** from existing parts if possible. Most gaps are composition, not new components.
3. **Propose** with: purpose, where it appears, anatomy, states, token usage, light/dark values, contrast ratios, accessibility notes, and why an existing pattern cannot carry it.
4. **Record** the proposal in the delivery's `DESIGN.md` under "System gaps" and raise it against this repo.
5. **Proceed** with the smallest local exception only if the delivery is blocked; mark it explicitly and set a review date.

Never silently fork. A delivery with a silent fork is worse than a delivery with a documented gap.

---

## 8. Commands

```bash
npm run check        # validate tokens, contrast, generated files, links
npm run validate     # same, explicit
npm run build:tokens # regenerate quiet.tokens.css and token-reference.md
```

No install is required; the scripts use only Node's standard library.

Open `design-system/reference/index.html` directly in a browser to see the system. It has a live Light / Dark / System switch.

---

## 9. Definition of done

A delivery is done when:

- [ ] It cites `Quiet 1.2.0` and the commit it was built from.
- [ ] It uses only semantic roles from the tokens; no raw colours or sizes.
- [ ] It has one primary action per view/dialog.
- [ ] Light and night are both designed and verified.
- [ ] Every screen has loading, empty, error and permission states (where applicable).
- [ ] It is keyboard-complete and focus-visible.
- [ ] It passes AA contrast in both modes.
- [ ] It has been checked at desktop, tablet and mobile widths.
- [ ] Every deviation is documented with a reason.
- [ ] Every missing token/pattern is logged as a system gap.
- [ ] The review checklist is complete.

The full checklist is [`design-system/agent/review-checklist.md`](design-system/agent/review-checklist.md).

---

## 10. Short version, if context is limited

Quiet = warm paper, near-black ink, one deep green, hairlines, one sans, tabular numbers, no card shadows. One accent (evergreen / verdigris) for links, focus, active nav and data — never buttons, status or apps. Primary buttons are ink or paper. Cards are 1px lines with 8px radius and 20px padding. Page title 44px, body 14px, labels 10.5px uppercase. Reading max 1180px; canvases fill the main column. App rail 68px, sidebar 236px (collapsible to 0 on desktop), top bar 56px. 4px spacing scale, 4px control radius, 8px card radius, 14px overlay radius. 120–280ms motion. Night = graphite, verdigris, paper primary. Every screen has one primary thought, all states, and both modes.

If you remember nothing else: **use the roles, keep one accent, one primary, no shadows, design the night mode, and complete the checklist.** Icons: 24px grid, 1.5px stroke, `currentColor`.
