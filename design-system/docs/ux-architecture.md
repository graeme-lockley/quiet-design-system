# UX architecture

**The family model, shell, navigation and behaviour for Quiet. Version 1.2.0.**

This document is implementation-neutral. It describes what the user experiences, not how it is built.

---

## 1. The family model

Alder is a **family of applications**, not a suite of unrelated tools.

- One person, one sign-in, one organisation context.
- One shared model of people, organisations, documents, conversations, schedules and money.
- Each app is an **application of the same grammar** to a different kind of work. The nouns change; the shell, navigation, states and formatting do not.
- Apps are peers. None is "the main app" with the others bolted on. The rail treats them equally.
- A user may only have access to some apps. The rail shows what they can use; it does not tease what they cannot.

Example family (from the exploration):

| App | Domain | Example object |
| --- | --- | --- |
| **Ledger** | Money, accounts, payments, approvals | a payment, an account, a statement |
| **Studio** | Work, briefs, documents, decisions | a brief, a deliverable, a review |
| **Atlas** | Relationships, parties, introductions | a person, an organisation, a relationship |
| **Signal** | Operations, schedules, alerts | a schedule, an alert, an incident |

The system does not prescribe these names. It prescribes that every app in the family answers the same six questions in the same order: **where am I, what is the state, what changed, what needs me, what happened recently, what else is happening in the family.**

---

## 2. The shell

```
┌──────┬───────────────────┬─────────────────────────────────────────────────────┐
│  A   │  Ledger           │  Alder / Ledger / Overview        ⌘K   ◔   GL      │
│      │  Alder Family     ├─────────────────────────────────────────────────────┤
│  L   │  ─────────────    │                                                     │
│  S   │  WORKSPACE        │  —— SATURDAY, 24 OCTOBER · ZAR                      │
│  A   │  ● Overview       │  Good afternoon, Graeme              [ This month ] │
│  G   │    Accounts       │  Three approvals are waiting.        [ New payment ] │
│      │    Payments       │                                                     │
│      │    Statements     │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│      │    Approvals  3  │  │  KPI    │ │  KPI    │ │  KPI    │ │  KPI    │   │
│      │    Team           │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
│      │                   │                                                     │
│  ?   │  ADMINISTRATION   │  ┌───────────────────────────┐ ┌─────────────────┐  │
│  GL  │    Recipients     │  │  Main signal / chart      │ │ Needs attention │  │
│      │    Integrations   │  └───────────────────────────┘ └─────────────────┘  │
│      │    Audit log      │  ┌─────────────────────────────────────────────┐    │
│      │                   │  │  Recent activity                            │    │
│      │  ┌─────────────┐  │  └─────────────────────────────────────────────┘    │
│      │  │ Month-end   │  │                                                     │
│      │  └─────────────┘  │                                                     │
└──────┴───────────────────┴─────────────────────────────────────────────────────┘
```

### Zones

| Zone | Width | Responsibility |
| --- | --- | --- |
| **App rail** | 68px with 2+ apps · 0 for a solo app | Identity and app switching. Omitted when there is only one app; the sidebar head carries the monogram. |
| **Sidebar** | 236px | Place. Sections of the current app. One contextual progress card at the bottom. |
| **Top bar** | 56px | Context and global action. Breadcrumbs, global search/command, notifications, identity. |
| **Canvas** | 1180px reading · fluid for canvas surfaces | The work. Owns the page title, page actions, content and states. |
| **Inspector** | 320px (optional) | Detail or context for a selected object. Only where comparison and context are part of the task; otherwise use a page or a panel. |

The shell is fixed. Content scrolls independently of the rail, sidebar and top bar. The sidebar never scrolls horizontally; if it has more than 9 items, group or prioritise.

**Solo-app shell.** When the workspace has exactly one app, omit the rail and let the sidebar be the only navigation column. Move the monogram, app name and workspace context into the sidebar head; keep help and account in the nav or top bar. The rail returns as soon as a second app exists. A one-item rail is chrome, not identity.

**Two content modes.** Reading surfaces (overview prose, settings, forms, detail copy) hold a 1180px measure and centre it in the main column. Canvas surfaces (boards, wide tables, timelines, canvases) fill the main column edge-to-edge with 40px inline padding. The sidebar's right edge and the viewport are the canvas boundaries; a canvas never adds a second max-width or a floating frame. Choose the mode by the task, not by app.

---

## 3. Navigation and information architecture

### 3.1 Depth

**App → section → object.** That is the maximum. Two levels of chrome, then content.

- **Section** = a page in the sidebar.
- **Object** = a record inside a section.
- An object can open **in place** (side panel) or **as a page** (its own URL, its own title).
- Never a third nested sidebar. Never a modal that contains navigation.

### 3.2 Choosing page vs panel

| Use a **panel** when | Use a **page** when |
| --- | --- |
| The user is glancing, comparing or acting quickly. | The object is the work for more than a moment. |
| The list must stay visible for context. | The object has its own sections, history or tabs. |
| The content is a summary or a single action. | The content is long-form or has a deep link worth sharing. |
| Closing returns to exactly the same list position. | Opening a new window or sharing a URL is expected. |

Panels are 400–520px, right side, with a scrim only if they are modal. On small screens, a panel becomes a full-height sheet.

### 3.3 The app rail

- Render the rail only when the workspace has **2+ apps**. For a solo app, omit it entirely and put the monogram in the sidebar head. Do not shrink it to an icon strip; that keeps the double-column problem.
- Maximum **7** apps. Beyond that, a "More" item opens a menu; do not shrink the monograms.
- Monogram: 1–2 characters, 600 weight, `title`/accessible name is the full app name.
- Order is stable across sessions and devices. Never reorder by usage.
- Active app: `accentWash` tile, accent monogram, plus a 2px accent indicator on the left edge of the rail. Inactive: `inkTertiary` monogram on transparent.
- Switching preserves each app's last section and scroll position. A deep link always wins.
- Keyboard: `⌘⇧A` opens the app switcher overlay; arrow keys move; `Enter` opens.

### 3.4 The sidebar

- 5–7 primary items per app. Group with one label if needed (`Workspace`, `Administration`).
- Active item: `selected` background, ink text, accent icon, 2px inset accent rule.
- Badges are for **counts that need action** (approvals) or **status** (error). Never for "new" marketing, never above 99.
- The bottom contextual card is for one time-bound task ("Month-end close · 2 days remaining"). It is not a promotion slot.
- **Desktop collapse.** A 34px toggle at the start of the top bar collapses the sidebar to 0px; the app rail remains. The toggle carries `aria-expanded` and `aria-controls`; `⌘\` does the same. The state is stored per device and applied before first paint. When collapsed the sidebar is `inert`; focus stays on the toggle.
- Do not replace the sidebar with a second icon rail. The app rail already carries identity; section labels are the navigation. On mobile the existing sheet is the collapsed form.
- Keyboard: `1`–`9` select the visible sections in order while the shell has focus; `⌘K` is always available.

### 3.5 The top bar

- Breadcrumbs show the family, the app and the current section. The current page title lives in the page header, not the top bar.
- Global search/command (`⌘K`) is the only global input. It searches across the whole family.
- Notifications are one inbox for the family, grouped by app.
- Page-level actions live in the page header, not the top bar. The top bar never has a primary action.
- The avatar opens account, settings, mode and sign-out. It is the only place for "signed in as".

### 3.6 The page header

- Optional eyebrow: context, date, currency, environment. 10.5px uppercase, accent rule.
- One page title (display-2). One sentence of state beneath it, if the user needs orientation.
- Page actions on the right, aligned to the title baseline. One filled primary at most.
- No tabs in the page header. If sections are needed, use the sidebar, a segmented control in the content, or a page-level tab row beneath the header — pick one per app and keep it consistent.

### 3.7 Deep links and back

- Every object and section has a stable, shareable URL.
- Opening a panel appends state to the URL and does not create a new history entry (replace). Opening a page pushes one.
- Back closes the current overlay before navigating. Escape does the same.
- At a cold start, a deep link restores the app, section, object and panel.

### 3.8 Reading and canvas

| Mode | Use for | Measure | Boundary |
| --- | --- | --- | --- |
| **Reading** | overview prose, settings, forms, object detail copy | 1180px, centred in the main column | Open margin; the whitespace is intentional |
| **Canvas** | boards, wide tables, timelines, canvases | Fluid inside the main column, 40px inline padding | Sidebar right edge and viewport edge |

Rules:

- A canvas fills the space between the sidebar and the right edge. Do not centre a 1180px column on a board.
- A reading page may contain a canvas region (for example, a board embedded in an overview); the region, not the page, adopts the fluid mode.
- A canvas still respects the type and spacing scales. Full width is not permission for denser or smaller content.
- At ≤1120px, canvas padding drops with the reading padding; at ≤860px the sidebar is a sheet and the canvas is the full viewport.

### 3.9 Solo-app shell

| Apps in the workspace | Shell |
| --- | --- |
| **1** | Sidebar 236px (collapsible to 0) + main. Monogram, app name and workspace context in the sidebar head. No rail. |
| **2–7** | Rail 68px + sidebar 236px + main. The rail carries the monograms; the sidebar carries the sections. |

Rules:

- The threshold is the number of apps, not a per-screen preference.
- In solo mode, Help / API guide and account live in the sidebar navigation, sidebar footer or top bar. Do not rebuild the rail's content as a second strip.
- The sidebar collapse, the top-bar toggle and `⌘\` work identically in both shells.
- A one-item rail is never rendered, even if the app is "the main one".

---

## 4. App identity

- **One accent for the family.** The accent marks interaction, focus and live data. It is never per-app in the default system.
- **Identity is the monogram.** App names in the rail, masthead, sidebar head and switcher; monograms in compact contexts. In a solo app the monogram lives in the sidebar head.
- **Optional app tints** are allowed only on the monogram tile and the 2px active indicator. Never on buttons, links, charts, status, selection or navigation icons. Off by default.
- **Transitions between apps** are a 200ms crossfade of the content area; the rail and window chrome stay still. No sliding panels, no 3D.
- **Empty apps** still appear in the rail if the person has access; they show a purposeful empty state, not a "coming soon" page.
- **Different audiences, one language.** If a client-facing app and an internal ops app coexist, they share the language and differ in density and surface area — not in colour or shape. Use the compact density for expert surfaces.

---

## 5. Page grammar

Every app's main screen follows the same order. This is what makes the family feel like one product.

### 5.1 Overview

1. **Eyebrow** — date, context, currency.
2. **Title + one sentence** of state (what is true now).
3. **3–4 KPIs** — no more. The first is the headline figure; the last is a comparison or a count that needs action.
4. **One main signal** — a chart, a list or a single statement. Not three competing panels.
5. **A needs-attention queue** — 3 items maximum, with a clear action.
6. **Recent activity** — 5–10 recent objects; link to the full history.
7. **Across the family** — 3 items from other apps that are relevant to this person.

A screen may omit sections it does not need. It may not add a fifth KPI, a second chart or a promotional card.

### 5.2 Object detail

- Identity header: name, type, status, one-sentence summary.
- Key facts: 3–6 fields, aligned labels, tabular values.
- Actions: one primary, the rest secondary or in an overflow menu.
- Activity: chronological, grouped by day, with the actor and the change.
- Relationships: linked people, documents, conversations.
- Destructive actions: last, separated, negative, requiring confirmation.

### 5.3 Task and form

- Single column, max 640px, one primary column of attention.
- Fields grouped in 3–7 logical blocks with a heading and one sentence.
- Labels above fields; helper text below; errors replace helper text in place.
- Sticky action bar at the bottom on long forms; "Cancel" is a ghost, "Save"/"Continue" is primary. One primary.
- More than three fields never live in a modal.
- Review step for consequential actions: show a summary, not a second form.
- Autosave only when the user expects it; otherwise explicit save with a "Saved 14:02" confirmation.

### 5.4 Conversation

- Transcript column max 760px.
- Context panel optional: the object or person the conversation is about.
- Composer pinned to the bottom, 1–8 lines, `⌘Enter` sends, `Enter` sends when the composer is single-line; always show the rule.
- Streaming: announce the start and end to assistive tech; provide a visible "Stop"; never steal scroll if the user has scrolled up.
- Tool or agent activity: collapsible, secondary, with a clear state (running, done, failed) and a timestamp.
- Empty conversation: a short prompt and 2–3 suggested starts, not a wall of capabilities.

### 5.5 Settings

- Left sub-navigation inside the app; single column of settings; one save model per page.
- Group by object (Profile, Organisation, Notifications, Security), not by UI control.
- Destructive and irreversible actions at the bottom, separated by a rule.
- Mode (light/dark/system) lives in Appearance, with a live preview.

### 5.6 Empty states

Empty states are screens, not leftovers. They need: a short title, one sentence of orientation, one action, and — if useful — a quiet illustration or a relevant example. Distinguish **no data yet** ("Start by adding your first account") from **no results** ("No matches for 'Makro'. Clear the filter.") and **no permission** ("Ask your administrator for access to Operations · 6204.").

---

## 6. Cross-app continuity

- **One command palette.** `⌘K` searches objects, sections and actions across all apps. Results are grouped by app and type. Recent items come first. It is not a marketing search.
- **One notification inbox.** Grouped by app; each item deep-links to the exact object. Marking all read is explicit. Badge count is unread actions, not unread marketing.
- **One people and organisation model.** A person opens the same way in every app; the app shows its own lens on them.
- **One "Across the family" surface.** Each overview can show three items from other apps that concern this person or object. It is a bridge, not a dashboard.
- **One format.** Dates, currency, numbers, names and timezones follow section 9 everywhere.
- **One session.** Signing in once signs in to all apps. Signing out signs out of all. Permissions are per app and per object; the rail reflects access.
- **One place for preferences.** Notifications, appearance, language, timezone and density are family-level unless an app explicitly needs a local override.

---

## 7. States and feedback

### 7.1 Loading

- Use a **skeleton that matches the final layout** (no spinner in the content area for the first paint).
- Show skeletons after 300ms; before that, render nothing. Never flash a skeleton for a fast response.
- Keep the shell, sidebar and page title stable while content loads.
- For actions, use the button's own loading state (label changes, spinner 14px, width preserved) rather than a page spinner.
- If loading exceeds 10 seconds, show a sentence with a retry and a reference, not an infinite animation.

### 7.2 Errors

Four levels, each with one job:

| Level | Where | What it says |
| --- | --- | --- |
| Field | Inline, below the field | What is wrong and the fix. Never "Invalid input". |
| Section | Inline panel in place of the section | What failed, what still works, retry. |
| Page | Full content area | What happened, whether data is safe, one action. |
| Global | Banner across the top | What is degraded, what still works, link to status. |

Rules: no raw error codes in the primary sentence (put a reference at the end); never blame the user; never offer a dead-end "OK". Destructive failures explain what state the object is now in.

### 7.3 Offline and stale

- A quiet top banner: "Offline. Changes will sync when you reconnect." Not a modal.
- Read-only mode is explicit: "You are viewing a saved copy from 14:02."
- Optimistic updates must show a pending state and a way to undo or retry.

### 7.4 Success

- Inline confirmation near the action, or a quiet toast for asynchronous work.
- No confetti, no modal "Success!", no full-screen celebration.
- A toast is one sentence, with at most one action ("View"). It dismisses itself after 5 seconds; it does not steal focus.
- Undo is offered for reversible destructive actions; irreversible ones require confirmation before, not after.

### 7.5 Destructive confirmation

- Name the object and the consequence. "Delete payment to Makro? This cannot be undone."
- The destructive action is the secondary-looking control unless the dialog exists solely for it; then it may be filled negative.
- Type-to-confirm only for irreversible, high-consequence actions (delete account, revoke all access).
- Default focus is on Cancel, never on the destructive action.

---

## 8. Behaviour rules

- **One primary action per view or dialog.** If two actions are equally primary, one belongs in the page header and one belongs in the object's overflow.
- **No nested modals.** A dialog never opens another dialog; use a step in the same dialog or a page.
- **No auto-opening dialogs** on load. Onboarding is a page, not a modal.
- **No hover-only actions** on touch or keyboard; reveal on focus too.
- **No layout shift** when data loads. Reserve the space.
- **No toast for something the user can see** (a row appearing in a list). Toasts are for work that completes out of sight.
- **No infinite scroll without a count or a "load more"**. Prefer pagination for tables with actions.
- **No silent data loss.** Unsaved changes prompt before navigation; auto-save states are visible.

---

## 9. Content and format rules

| Thing | Rule | Example |
| --- | --- | --- |
| Sentence case | Everything except labels and proper nouns. | "New payment", "Needs your attention" |
| Labels | 10.5px uppercase, 0.14em tracking, no colon in the label. | `AVAILABLE BALANCE` |
| Dates | `24 Oct 2026`. No leading zero. Day + date in eyebrows. | `Saturday, 24 October` |
| Times | 24-hour, `14:02`. Show timezone once per screen. | `Updated 14:02 SAST` |
| Relative time | Only within 7 days and only in activity, with an absolute value on hover/focus. | "2 hours ago" |
| Currency | Symbol + non-breaking space + grouped amount; two decimals for money. | `R 4,286,410.22` |
| Negative money | Minus sign for outflow, no parentheses. | `−R 3,842.18` |
| Positive change | Explicit plus in deltas only. | `+2.4%` |
| Percentages | One decimal place. | `−8.1%` |
| Counts | No decimals; `99+` in badges. | `3 waiting` |
| Names | Full name first, initials in avatars. Never "user" in the interface. | `Sipho Naidoo` |
| App names | Proper nouns, never translated. | `Ledger` |
| Buttons | Verb + object; no "Submit", "OK", "Yes". | `Approve payment` |
| Errors | What happened + consequence + next step. | `The payment was not sent. Your account still has the funds. Try again.` |
| Empty states | What is missing + one action. | `No statements yet. Close your first month to create one.` |
| Confirmation | Question + consequence. | `Delete this schedule? It will stop running immediately.` |

---

## 10. Accessibility

- **Landmarks**: app rail = navigation (labelled "Applications"), sidebar = navigation (labelled by the app name), top bar = banner, content = main. A collapsed sidebar is `inert`; the toggle remains the only focusable entry point.
- **Skip link**: "Skip to content" is the first focusable element.
- **Focus management**: dialogs and drawers trap focus, return it to the trigger on close, and close on Escape. Panels that are not modal do not trap.
- **Composite widgets**: arrows move within a segmented control, tab list, menu and grid. Home/End jump to the first/last item.
- **Live regions**: toasts are `polite`; field errors are announced once, near the field; destructive alerts are `assertive`.
- **Streaming AI output**: announce "Response started" and "Response complete"; do not announce every token. The stop control is reachable before the stream starts.
- **Charts**: provide a text summary and a table alternative. The summary names the series, range and the main takeaway.
- **Status**: dot + word, icon + word, or text. Colour is never the only carrier.
- **Contrast**: AA as verified in the tokens. Tertiary text is the floor; do not invent a lighter grey.
- **Targets**: 34px default, 28px minimum on mouse-dense surfaces, 44px on touch.
- **Motion**: honour reduced motion. Remove transforms and parallax; keep opacity changes at 0ms.
- **Zoom**: 200% text must not clip; avoid fixed-height text containers. Tables may scroll horizontally; controls may wrap.
- **Dark mode**: test every state in both modes; focus rings and disabled styles must remain visible.

---

## 11. Responsive behaviour

| Width | Shell | Sidebar | Inspector | Table |
| --- | --- | --- | --- | --- |
| ≥ 1440px | Full | Persistent, collapsible to 0 | Persistent if the app uses one | Full columns |
| 1120–1439px | Full | Persistent, collapsible | Persistent | Reading 1180; canvas fluid |
| 860–1119px | Rail collapses to monograms | Persistent or sheet | Becomes a drawer | Horizontal scroll, sticky first column |
| 640–859px | Rail hidden; app switcher in the top bar | Sheet | Full-height sheet | Horizontal scroll; secondary columns hidden |
| < 640px | Single column | Sheet | Full-screen | Card rows only if fewer than 4 fields; otherwise scroll |

- Page actions move into a sticky bottom bar when they are consequential and the viewport is short.
- The command palette becomes a full-screen search sheet on small screens.
- Never reduce body text below 14px to fit more. Remove content or reorganise instead.

---

## 12. Dark mode behaviour

- Default to the system setting; offer Light / Dark / System in Appearance; persist per device.
- Never invert images, charts or brand marks. Provide a mode-specific asset or a token-driven rendering.
- The accent becomes verdigris; the primary action becomes paper. See [`dark-mode.md`](dark-mode.md).
- Elevation becomes a lit hairline plus shadow only for transient surfaces.
- No pure black (`#000`) and no pure white (`#FFF`) as large surfaces.
- Test contrast, charts, status, focus, disabled states, skeleton and empty states in both modes.

---

## 13. Governance

- **Tokens are the contract.** A new screen uses the semantic roles; it does not introduce a colour or size.
- **New components** are proposed with: purpose, anatomy, states, token usage, accessibility notes and one example in context. Add them to [`components.md`](components.md) and the reference page.
- **New tokens** are rare. They need a role that cannot be expressed by an existing token, and they must work in both modes. Document the contrast.
- **Deprecation**: keep a deprecated token for one minor version, map it to its replacement, and remove it in the next major.
- **Versioning**: semantic versioning of the design system; the version appears in the reference page and the agent brief.
- **Review**: every new screen is checked against the acceptance list in [`../agent/review-checklist.md`](../agent/review-checklist.md).

---

*Next: [`components.md`](components.md) for the component contracts · [`dark-mode.md`](dark-mode.md) for the night system.*
