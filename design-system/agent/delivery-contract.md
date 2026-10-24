# Delivery contract

**What every UI delivery built with Quiet must contain. Version 1.0.0.**

This contract is stack-agnostic. It does not care whether the delivery is React, Swift, Flutter, a server-rendered page or a design file. It cares that the work is **legible, reviewable and consistent with the family language**.

Use it at the start of a delivery (to plan) and at the end (to prove). Copy the template into the delivery repository's `DESIGN.md`.

---

## 1. The non-negotiables

A delivery must:

1. Cite the design-system version and commit/tag it was built from.
2. Use the semantic roles from `tokens.json`; no raw colours, no approximate greys.
3. Use the type, space, radius and density scales; no invented steps.
4. Have one primary action per view or dialog.
5. Design light **and** night.
6. Design every applicable state, not only the happy path.
7. Be keyboard-complete and focus-visible.
8. Meet WCAG AA contrast in both modes.
9. Work at desktop, tablet and mobile widths.
10. Record every deviation and every missing token/pattern.

If any of these is impossible, raise it before building. Do not silently fix it in the delivery.

---

## 2. Required artifacts

| Artifact | Where | Why |
| --- | --- | --- |
| `DESIGN.md` | Delivery root | The context, decisions, token map, states and gaps. The reviewer's entry point. |
| Screen renders | `/design/screens/` | Light, night, mobile, and key states. Named, not scattered. |
| `TOKENS.md` (optional if `DESIGN.md` includes it) | Delivery root | The semantic role map. |
| State inventory | In `DESIGN.md` | Proves the states were considered, not discovered later. |
| Review checklist | In `DESIGN.md` or PR | The definition of done, completed. |
| Deviations log | In `DESIGN.md` | Every exception with a reason and a reconciliation date. |
| System gaps | In `DESIGN.md` | What the system needs next; proposed back to the system. |

The delivery's stack determines the implementation directories. `design/` is for evidence and can exist in any stack.

---

## 3. `DESIGN.md` template

Copy this exactly. Delete sections only when they are genuinely not applicable, and say why.

```md
# Design record — {Product} / {Screen or flow}

- **Design system:** Quiet 1.0.0
- **Commit/tag:** {git sha or tag}
- **Date:** {YYYY-MM-DD}
- **Author:** {name}
- **Status:** draft | in review | delivered

## 1. Context
- **Product / app:** {name and one sentence}
- **Person:** {role, context, frequency}
- **Primary job:** {the one thing this screen must make obvious}
- **Primary action:** {verb + object}
- **What must not be lost:** {constraint, number, deadline, consequence}
- **Out of scope:** {explicit}

## 2. Screens and states
| Screen / overlay | Purpose | Light | Night | Mobile | Key states |
| --- | --- | --- | --- | --- | --- |
| {Overview} | {…} | {link} | {link} | {link} | loading, empty, error, partial |
| {…} | | | | | |

State coverage: {list states and where they are demonstrated}

## 3. Composition
- **Shell:** rail + sidebar + top bar + content. {Any deviation?}
- **Page grammar:** {how the overview/detail/form recipe was applied}
- **Hierarchy:** {what leads, what supports, what was removed}
- **Density:** comfortable | compact. {Why}
- **Inspector / panel:** {used or not, why}

## 4. Token map
| Role | Where used | Notes |
| --- | --- | --- |
| canvas | page background | |
| surface | cards, table | |
| ink | titles, values | |
| inkSecondary | body copy | |
| accent | links, active nav, primary series | |
| … | | |

No raw values are permitted outside this table. If a role is missing, log it under §8.

## 5. Responsive
| Width | Behaviour |
| --- | --- |
| ≥1440 | full shell |
| 1120–1439 | {…} |
| 860–1119 | {rail collapses, inspector becomes drawer, table scrolls} |
| 640–859 | {sidebar sheet, …} |
| <640 | {single column, sticky actions} |

## 6. Accessibility
- **Contrast:** {verified pairs and method}
- **Focus order and traps:** {dialogs, drawers, command palette}
- **Keyboard paths:** {tab order, shortcuts, composite widgets}
- **Screen reader:** {landmarks, names, live regions, status announcements}
- **Motion:** {reduced-motion behaviour}
- **Zoom:** {200% and 360px check}
- **Known gaps:** {none, or explicit}

## 7. Content
- **Voice:** {how the product voice was applied}
- **Numbers and dates:** {format examples}
- **Empty / error / confirmation copy:** {where reviewed}

## 8. Deviations
| Deviation | Why | Scope | Reconcile by |
| --- | --- | --- | --- |
| {e.g. a fifth KPI} | {reason} | {this screen only} | {date / owner} |

If none: "No deviations."

## 9. System gaps
| Gap | Proposal | Blocking? | Owner |
| --- | --- | --- | --- |
| {e.g. no "hold" status tone} | {add a semantic role with values + contrast} | yes/no | {name} |

## 10. Open questions
- {question, owner, date}
```

---

## 4. File layout

```
{delivery-repo}/
├── DESIGN.md                  # this record
├── design/
│   ├── screens/
│   │   ├── overview-light.png
│   │   ├── overview-dark.png
│   │   ├── overview-mobile.png
│   │   ├── overview-empty.png
│   │   └── overview-error.png
│   └── notes/
│       └── {optional exploratory work}
├── {implementation directories}
└── README.md                  # how to run the delivery
```

Screens must be named by **screen + mode + state**, not `Screenshot 2026-10-24.png`.

---

## 5. State inventory

Every screen must consider these. Mark "n/a" only with a reason.

| State | Required? | Where demonstrated |
| --- | --- | --- |
| Initial loading | yes | skeleton |
| Refreshing | if data can change | inline indicator |
| Empty — nothing yet | yes | empty state with next action |
| Empty — no results | if search/filter | reset/filter action |
| Error — section | yes | inline alert + retry |
| Error — page | if the page can fail | page-level error |
| Offline / stale | if data is remote | banner + timestamp |
| Permission | if access varies | explicit access state |
| Partial | if data can be incomplete | label + scope |
| Success | for async work | inline confirmation / toast |
| Destructive confirmation | if irreversible | dialog with object name |

---

## 6. Review and sign-off

1. Self-review against [`review-checklist.md`](review-checklist.md).
2. Compare the rendered screens with [`../reference/index.html`](../reference/index.html) in both modes.
3. A second reviewer checks:
   - one accent, one primary, no shadows;
   - all states;
   - keyboard and focus;
   - both modes;
   - the deviation and gap logs.
4. Merge only when the checklist is complete or every exception is explicitly accepted.

The delivery is **not** reviewed by asking "does it look nice?" It is reviewed by asking "does it obey the contract, and where does it not?"

---

## 7. What not to do

- Do not copy the reference HTML/CSS into a delivery. It is a proof, not a library.
- Do not edit the design system to make the delivery pass. Fix the delivery or propose a change.
- Do not hide a deviation in a commit message. Put it in `DESIGN.md`.
- Do not ship a light-only screen and call night mode "for later" unless the delivery's scope explicitly excludes it.
- Do not substitute a "close enough" colour, radius or font. The system is precise; use the roles.
