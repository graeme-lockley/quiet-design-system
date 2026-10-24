# Component contracts

**Anatomy, states and behaviour for the Quiet core set. Version 1.2.0.**

A component contract is a promise: if you build this, it behaves like this in every app. Visual values come from [`tokens.json`](../tokens/tokens.json); this document describes structure and behaviour. The rendered proof is [`reference/index.html`](../reference/index.html).

> **The one rule that governs all others:** one primary action per view or dialog. If you find yourself needing two, one of them belongs in the page header or an overflow menu.

---

## Index

| Group | Components |
| --- | --- |
| Shell | App rail & switcher · Sidebar nav · Top bar & breadcrumbs · Page header |
| Actions | Button |
| Input | Text field · Select & combobox · Checkbox, radio & switch · Segmented control · Tabs |
| Display | Card & panel · Stat (KPI) · Data table · Status badge · Avatar & entity row · Chart |
| Feedback | Dialog · Drawer / side panel · Toast & inline alert · Empty, loading & error |
| Global | Command palette · Tooltip · Pagination |
| Family-specific | Conversation surface · Agent activity |

---

## 1. Shell

### 1.1 App rail & switcher

**Purpose.** Establish the family and move between apps without losing place.

**Solo-app rule.** Render the rail only when the workspace has **2+ apps**. A one-app workspace has no rail; the sidebar head carries the 36px monogram, the app name and the workspace context. Help and account move to the sidebar nav/footer or the top bar. Do not shrink a one-item rail to an icon strip.

**Anatomy.** 68px rail. Brand mark (36px) at the top, then app monograms (36px), then a flexible gap, then Help and the person avatar at the bottom. Active app has an `accentWash` tile, accent monogram and a 2px accent rule on the left edge.

**States.**
- Default: transparent, `inkTertiary` monogram.
- Hover: `hover` background, `ink` monogram.
- Active: `accentWash`, `accent` monogram, 2px accent edge.
- Focus: 2px focus ring inside the tile.
- Unavailable app: hidden, not disabled — never show what the person cannot open.

**Behaviour.**
- 1–7 apps. More than 7 goes behind a "More" menu, never a scrolling rail.
- Fixed order across sessions.
- Switch restores each app's last section and scroll position.
- `⌘⇧A` opens a centred switcher overlay with app names, current object context and a keyboard hint.
- The transition is a 200ms content crossfade. The rail never moves.

**Accessibility.** The rail is `<nav aria-label="Applications">`. Each monogram has the full app name as its accessible label and a tooltip. The active item uses `aria-current="page"`.

**Do / Don't.** Do keep monograms to 1–2 characters. Do omit the rail entirely for a solo app and put the monogram in the sidebar head. Don't render a one-item rail, use app logos, coloured icon sets or per-app accents in the default system.

---

### 1.2 Sidebar navigation

**Purpose.** Show the sections of the current app and where the person is.

**Anatomy.** App name (18px/600) + organisation context (11.5px). Group label (10.5px uppercase), items 36px tall with 16px icon and 13.5px label. Optional count badge on the right. Bottom contextual card. Footer: Settings, Sign out. A 34px `panel-left` toggle lives at the start of the top bar, never inside the sidebar header. **Solo-app variant:** a 36px monogram + app name + workspace context sit at the top of the sidebar; the rail is absent.

**States.** Expanded, collapsed (0px), and mobile sheet. Default `inkSecondary`; hover `hover` + `ink`; active `selected` + `ink` + accent icon + 2px inset accent rule; focus ring; badge `pill` background.

**Behaviour.**
- 5–7 primary items. Group with one label if necessary; never two levels of groups.
- Counts only for action or status. No "new" labels.
- The contextual card is one time-bound task with a progress rule and a single link.
- **Desktop collapse.** The top-bar toggle collapses the sidebar to 0px with a 200ms width transition; the rail remains. The state persists per device and is applied before first paint. Hide the sidebar from the accessibility tree with `inert` while collapsed. The sidebar never becomes a second icon rail.
- `⌘\` toggles the same state; focus remains on the toggle. On mobile, the sheet is the only collapsed form.
- `1`–`9` jump to sections when the shell has focus.
- Scrolling is vertical and independent; the app name stays visible.

**Accessibility.** `<nav aria-label="{App}">`; active `aria-current="page"`; badge text included in the accessible name ("Approvals, 3 waiting"); a skip link precedes the sidebar. The toggle has `aria-expanded` and `aria-controls`; the collapsed sidebar is `inert`; the toggle stays in the tab order.

**Do / Don't.** Do offer desktop collapse for sparse sidebars, and do collapse to a sheet below 860px. Don't add a second sidebar inside a page, and don't replace the sidebar with an icon-only strip.

---

### 1.3 Top bar & breadcrumbs

**Purpose.** Context and global action.

**Anatomy.** 56px bar, 40px side padding, 1px `line` bottom border. Breadcrumbs: family / app / section. Right: command trigger (`⌘K`), notifications, avatar. No page actions.

**States.** Breadcrumb links are `inkSecondary`, hover `ink`; current is `ink`. The command trigger is a 226px outlined field with a search icon and a `⌘K` key cap. Notifications show a 5px accent dot only for unread actions.

**Behaviour.**
- Sticky at the top; content scrolls beneath.
- On narrow screens, drop the family crumb first, then the section crumb; the page title carries the context.
- The avatar menu holds account, appearance, settings and sign-out.
- Never put a primary action in the top bar.

**Accessibility.** `<header>` landmark; breadcrumbs are a labelled `<nav>` with an ordered list; the notification button has an accessible name that includes the unread count.

---

### 1.4 Page header

**Purpose.** Say what this page is and what can be done here.

**Anatomy.** Optional eyebrow (accent 18×1px rule + 10.5px uppercase context), display-2 title (44px), one sentence of state (14.5px `inkSecondary`, max 54ch), actions aligned to the title baseline.

**States.** Actions wrap below the title below 860px. If there is a single page action, it may sit beside the title on all widths.

**Behaviour.**
- One page title per screen. No title duplication in the top bar.
- The sentence answers "what is true now?" — not a description of the feature.
- One filled primary action at most. Secondary actions are outlined or ghost.
- No tabs in the header.

**Accessibility.** The page title is `<h1>`; the eyebrow is not a heading; page actions are grouped in a labelled region.

---

### 1.5 Page container

**Purpose.** Decide how much of the main column a page should use.

**Modes.**
| Mode | Use | Measure | Behaviour |
| --- | --- | --- | --- |
| **Reading** | overview prose, settings, forms, long copy | 1180px centred | Open margins; content never touches the sidebar or viewport edge |
| **Canvas** | boards, wide tables, timelines, visual canvases | Fluid, 40px inline padding | Fills the main column between the sidebar edge and the viewport |

**Behaviour.**
- Choose the mode by the task. A board is a canvas; a settings form is reading.
- A canvas never adds a second max-width or a card frame around the whole page.
- Reading pages can contain a canvas region; the region, not the page, becomes fluid.
- Both modes share the same type and spacing scales; full width is not permission for denser content.
- On mobile both modes collapse to a single column with 16px padding.

**Accessibility.** Keep the content landmark and skip-link target on the page container in both modes. Full width does not change the reading order or the maximum line length of prose.

**Do / Don't.** Do let a board use the entire main column. Don't leave 58px of empty gutter on each side of a dense canvas because a reading max-width leaked into it.

---

## 2. Actions

### 2.1 Button

**Purpose.** Trigger an action with a clear verb.

**Anatomy.** Height 34px (default), 28px (small), 40px (large). Padding 13px / 10px / 16px. 4px radius. 12.5px medium label. Optional 15px leading icon. 7px gap.

**Variants.**
| Variant | Use | Visual |
| --- | --- | --- |
| Primary | The one consequential action | `primaryAction` fill, `primaryActionInk` label |
| Secondary | Supporting action | transparent, 1px `lineStrong`, ink label |
| Ghost | Low-emphasis or repetitive action | transparent, no border, `inkSecondary`; hover `hover` |
| Destructive | Delete/revoke | transparent, negative label and border; filled negative only inside a confirm dialog |
| Quiet link | Navigation or inline action | accent text + optional 11px arrow |

**States.** Default, hover (`hover` background or primary hover), active (same as hover, no scale), focus (2px ring, 2px offset), disabled (`disabledSurface`, `disabledInk`, no hover), loading (14px spinner replaces the icon, label remains, width is preserved, pointer disabled).

**Behaviour.**
- One primary per view/dialog.
- Loading never changes the button width.
- Buttons do not navigate; links do. A button that navigates should be styled as a link or use a link element.
- Full-width only in dialogs and stacked mobile actions.

**Accessibility.** 34px default target, 44px on touch. The accessible name is the visible verb; an icon-only button needs an `aria-label`. Loading announces `aria-busy` and the label change.

**Do / Don't.** Do use "Approve payment", not "Submit". Don't use colour alone for destructive; include the verb and the confirmation.

---

## 3. Input

### 3.1 Text field

**Purpose.** Capture a single line or a short block of text.

**Anatomy.** Label above (10.5px uppercase, `inkTertiary`), control 36px (4px radius, 1px `lineStrong`, white surface), optional leading icon (14px), optional trailing unit or clear, helper text below (11.5px), error text replacing the helper (negative + 14px icon).

**States.** Default; hover (border `inkTertiary` at 50%); focus (2px accent ring, border accent); filled; disabled (`disabledSurface`); read-only (no border, `surfaceSunken` background); error (negative border + icon + message); success (only for validation on blur, not decoration).

**Behaviour.**
- Labels are never placeholders. Placeholders are examples, not labels.
- Validate on blur and on submit, not on every keystroke (except for availability checks).
- Error messages say what is wrong and how to fix it.
- Character count only when there is a limit; place it below on the right.
- `Enter` submits only in single-line forms; `⌘Enter` submits in text areas.

**Accessibility.** Label is associated programmatically; helper and error are linked with `aria-describedby`; error is announced once; required state is text, not only an asterisk.

---

### 3.2 Select & combobox

**Purpose.** Choose one option from a known set.

**Anatomy.** Same field shell; trailing chevron (14px); menu surface (`overlaySurface`, 4px radius, e2, 4px padding); option rows 36px with a 16px check for the selected item.

**States.** Default, open, hover option (`hover`), selected (accent check, ink label), disabled option (`disabledInk`), error, empty ("No matches").

**Behaviour.**
- Use a native-style select for fewer than 8 options and no search.
- Use a combobox when there are more than 8 options or the list is remote.
- Never pre-select a destructive or irreversible option.
- The menu opens below by default; flip above if there is less than 200px of space.
- Type-ahead is supported in the combobox; arrow keys move; Enter selects; Escape closes.

**Accessibility.** `aria-expanded`, `aria-controls`, `aria-activedescendant`; the selected option is announced; the menu is reachable and closable by keyboard.

---

### 3.3 Checkbox, radio & switch

**Purpose.** Make a choice or toggle a state.

**Anatomy.**
- Checkbox: 16px, 2px radius, accent fill with a 10px check when selected; label 13px to the right; 8px gap; 44px minimum row on touch.
- Radio: 16px circle, accent dot when selected; labels same as checkbox.
- Switch: 30×17px, accent track when on, 13px paper thumb, 2px inset; label 13px; only for immediate changes.

**Behaviour.**
- Checkbox for multiple independent choices; radio for one of a small set; switch for an instant on/off effect.
- A switch never sits inside a form that requires "Save" — use a checkbox if the change is submitted.
- Group label and optional helper above; group error below.
- No "select all" unless the table supports partial selection (show an indeterminate state).

**Accessibility.** 44px touch target; label click toggles; space toggles; arrows move within a radio group; switch has `aria-checked` and a clear name.

---

### 3.4 Segmented control

**Purpose.** Switch between 2–5 peer views or ranges within the same context.

**Anatomy.** Track (`surfaceSunken`, 4px radius, 2px padding); segments 22–24px; active segment `surface` with a hairline or e1, ink label; inactive `inkTertiary`. Font 10.5px.

**States.** Default, hover (ink label), active, focus ring, disabled.

**Behaviour.**
- Always exactly one active segment.
- Use for time ranges, filters and views that do not change the URL structure. Use tabs for peer pages; use the sidebar for sections.
- Never use for navigation between apps.
- Below 640px, allow horizontal scroll rather than shrinking labels.

**Accessibility.** `role="tablist"` or a group of buttons with `aria-pressed`; arrow keys move; the active item is announced.

---

### 3.5 Tabs

**Purpose.** Move between peer sections of one object or page.

**Anatomy.** 32–36px height; 12.5px labels; 2px accent underline on the active tab; 1px `line` bottom rule across the full width.

**Behaviour.**
- 2–6 tabs. More than 6 means the object is too broad; use the sidebar.
- Tabs are not a substitute for the sidebar and never appear in the page header if the sidebar already lists the sections.
- The tab row scrolls horizontally on narrow screens; no wrapping.
- Deep-linkable: the active tab is reflected in the URL.

**Accessibility.** `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, arrow-key navigation, focus follows activation.

---

## 4. Display

### 4.1 Card & panel

**Purpose.** Group related content without competing with it.

**Anatomy.** `surface`, 1px `line`, 8px radius, 20px padding, no shadow. Header: title 15px/600 + optional 11.5px sub; tools on the right. Content. Optional footer separated by a 1px `line` rule.

**States.** Static; clickable (whole card is one link/button, hover e1 + `lineStrong`; never a clickable card with an internal button); selected (`accentLine` + `accentWash` at low opacity); loading (skeleton lines); error (inline alert replaces content).

**Behaviour.**
- A card never contains another card. Nested surfaces use `surfaceSunken` or a rule, not another border.
- Cards are containers, not decoration. Do not put a card around a single line of text.
- The whole card is clickable only if there is one destination. If there are actions, use a static card with a clear action row.

**Accessibility.** Clickable cards are links/buttons with a visible focus ring; the accessible name includes the card title; nested interactive elements do not exist inside a clickable card.

---

### 4.2 Stat (KPI)

**Purpose.** Answer one question with one number.

**Anatomy.** Label 10.5px uppercase `inkTertiary`; value `numeric-xl` 26px tabular, `ink`; optional delta pill and context line; optional 58×22 sparkline top-right or bottom-right.

**States.** Default; loading (skeleton); error (dash + "Unavailable" in `inkTertiary`, never 0); stale (clock icon + "as of 14:02"); clickable (whole card, hover e1).

**Behaviour.**
- 3–4 stats per overview. Never 5 or more.
- The first is the headline. The last can be a count of work waiting.
- A stat without a comparison is still useful; do not invent a delta.
- Sparklines are optional and never the only representation of the trend.
- Values are tabular; money is right-aligned when in a column, left-aligned when in a KPI.

**Accessibility.** The accessible name includes the label and value; the sparkline has a text summary or is hidden; the delta is text, not colour only.

---

### 4.3 Data table

**Purpose.** Compare many records with precision and act on them.

**Anatomy.** Container card (or borderless section in a dense surface). Header 36px, 9.5px uppercase labels, bottom 1px `line`. Rows 44px comfortable / 36px compact, 1px `lineSoft` separators, 12px cells. Numeric columns right-aligned and tabular. Status column at the end unless status is the primary filter. Optional leading checkbox (16px) and trailing overflow menu.

**States.** Default; hover (`hover`); selected (`accentWash` or `selected`); focus row (`focus` ring on the first cell); loading (5 skeleton rows matching the columns); empty (empty state inside the table area); error (inline alert); sorted column (accent arrow, header ink); filtered (a visible filter summary above the table).

**Behaviour.**
- No zebra striping. Row separators only; no vertical grid lines.
- Row click opens the object if there is one primary destination. If the row has multiple actions, use an overflow menu; the row itself is not clickable.
- Sorting is explicit and indicated; default sort is stated in the table subheading ("Newest first").
- Column priority: at narrow widths, hide secondary columns first, keep the identifier, amount and status; horizontal scroll with a sticky first column.
- Actions that affect many rows appear in a selection bar above the table, not in a floating mystery bar.
- Pagination for tables with actions; infinite scroll only for read-only feeds.
- Never show a blank cell for missing data; use an em dash `—` with an accessible label.

**Accessibility.** Real `<table>` with `<th scope>`; caption or `aria-label`; sortable headers are buttons with `aria-sort`; selected rows announced; the selection count is live; horizontal scroll is keyboard-accessible.

---

### 4.4 Status badge

**Purpose.** Show the state of an object in one word.

**Anatomy.** Pill, 9.5px uppercase, 3px 7px padding, 4px dot + label. Tones: neutral (`hover`/`inkSecondary`), positive (`positiveWash`/`positive`), warning (`warningWash`/`warning`), negative (`negativeWash`/`negative`). **There is no accent status tone** — scheduled, draft and unknown states are neutral; colour is reserved for meaning.

**Behaviour.**
- The label carries the meaning; the dot reinforces it.
- Use at most three tones on one screen. If everything is coloured, nothing is. "Scheduled" is neutral, not accent: accent means interaction or live data, not a state.
- Do not use a badge for a count; use a count badge (pill, no dot).
- Do not use a badge as a button.

**Accessibility.** The dot is decorative (`aria-hidden`); the text is the status. Contrast verified in both modes.

---

### 4.5 Avatar & entity row

**Purpose.** Identify a person, organisation or app at a glance; make a row scannable.

**Anatomy.**
- Avatar: 22/28/32/40px circle, `accentWash` fill, `accent` initials, 600 weight, 10px for 28px. App monogram: 2px radius tile, 1–2 characters.
- Entity row: 44px comfortable, avatar 28px + name (12.5px ink) + meta (11px `inkTertiary`) + trailing action/count. 10px gap. 1px `lineSoft` divider.

**Behaviour.**
- Initials from the first and last word; if one word, first two letters.
- No photographic avatars in the core system. If they are added later, they must have an initials fallback.
- Names truncate with an ellipsis; the full name is available on hover/focus.
- The trailing action is a small button or an arrow, never a whole-row hover-only control.

**Accessibility.** The avatar is decorative when the name is adjacent; entity rows that are links are focusable and have a clear accessible name.

---

### 4.6 Chart

**Purpose.** Show a trend or a comparison that a table cannot make obvious.

**Anatomy.** Card with title + range; optional summary figures; plot area 160–190px; dashed grid lines; x-axis labels 9.5px uppercase; legend in the footer; direct label or end dot for the primary series.

**Behaviour.**
- One chart per overview. More than four series means a table.
- Lines 1.8px, primary 2px; area fill ≤ 12% opacity; no 3D, no gradients beyond a single soft area fade.
- Grid lines are horizontal only, dashed 2/5, `dataViz.grid`.
- The x-axis shows the range; the y-axis starts at zero for bars and may be truncated for lines only when labelled.
- Empty: "No data for this range" with a range reset, not an empty plot.
- Loading: skeleton plot; error: inline alert.

**Accessibility.** Provide a text summary ("Inflow rose 18% from April to September; outflow was flat.") and a table alternative behind a disclosure. Do not rely on colour to distinguish series; use line style and direct labels.

---

## 5. Feedback

### 5.1 Dialog

**Purpose.** A focused decision or a short task that must interrupt.

**Anatomy.** Scrim (`scrim`), centred surface (`overlaySurface`, 14px radius, e3, 480px default / 640px large, 24px padding). Title 22px/600, body 14px `inkSecondary`, actions right-aligned at the bottom with 8px gap. Close icon top-right.

**States.** Enter: 200ms scale from 0.98 + opacity; exit: 120ms opacity. Focus trapped; Escape closes; the trigger receives focus on close.

**Behaviour.**
- One primary action. Cancel is ghost or secondary and is the default focus for destructive dialogs.
- More than three fields is a page, not a dialog.
- No nested dialogs. A second step replaces the content of the same dialog.
- The title names the object; the body states the consequence.
- Mobile: becomes a bottom sheet or a full-height page.

**Accessibility.** `role="dialog"` + `aria-modal="true"` + labelled by the title; focus moves to the first interactive element or the dialog container; background is inert; Escape works.

---

### 5.2 Drawer / side panel

**Purpose.** Detail or context alongside the list, without losing the list.

**Anatomy.** 400–520px, `overlaySurface` or `surface`, left 1px `line`, 20–24px padding, sticky header with title + close, scrollable body, optional sticky footer actions.

**States.** Non-modal (desktop, list remains interactive) or modal (small screens, scrim + focus trap); enter/exit 200ms translate 8px + fade.

**Behaviour.**
- Use for glanceable detail, quick edits and comparison. Deep work goes to a page.
- URL state is reflected so the panel is shareable; closing returns focus to the row.
- Do not stack drawers.

**Accessibility.** Non-modal panel gets `role="complementary"` and a labelled heading; modal panel follows the dialog contract.

---

### 5.3 Toast & inline alert

**Purpose.** Confirm asynchronous work or explain a non-blocking condition.

**Toast.** Bottom-right on desktop, bottom-centre above the safe area on mobile; max 400px; `overlaySurface`, 8px radius, e2; 12.5px text; one action ("View", "Undo"); auto-dismiss after 5s; no focus steal; polite live region; one at a time, queue the rest.

**Inline alert.** Full-width within the content column; 1px border + wash (positive, warning, negative or neutral); 16px icon; title 12.5px/600; body 11.5px; optional action; used for section-level errors, offline, stale data and permissions.

**Behaviour.**
- Do not toast what the user can already see. Use inline confirmation.
- Destructive failure explains the current state of the object.
- Toasts never contain form fields or more than one action.
- Offline is a top banner, not a toast.

**Accessibility.** `role="status"` / `aria-live="polite"` for toasts; `role="alert"` for errors; the close button has an accessible label; auto-dismiss is paused on hover/focus.

---

### 5.4 Empty, loading & error

**Empty.** 24px top/bottom breathing room; optional 32px line icon in `inkTertiary`; title `heading`; one sentence `body-sm` `inkSecondary` max 46ch; one primary action and one quiet link. Distinguish "nothing yet", "no results", "no access" and "nothing to do today".

**Loading.** Skeleton matching the final layout; 6px radius; `skeleton` fill; no shimmer, a 1.6s opacity pulse at most; after 10s add a sentence and a retry.

**Error.** Section-level inline panel or page-level composition with: what happened (one sentence), what still works (one sentence), one retry action, and a reference in small text. Never show raw stack traces. Never use a red full-page background.

---

## 6. Global

### 6.1 Command palette

**Purpose.** Reach any object, section or action in the family without navigating.

**Anatomy.** Centred overlay 640px, 14px radius, e3, scrim; 44px search input with a 16px search icon; results grouped by app/type with 10.5px group labels; rows 40px with icon, title, meta and an optional shortcut; active row `hover`; footer with keyboard hints.

**Behaviour.**
- `⌘K` opens from anywhere; `Esc` closes; arrows move; `Enter` opens; `⌘Enter` opens in a new panel/window where supported.
- Shows recent objects before typing (max 5), then grouped results, then actions.
- Actions include navigation, creation and object-specific commands; destructive commands are not in the palette.
- No results: one sentence + "Search all apps" link; never a blank list.
- Search is server-backed when the family is large; the palette never blocks on a slow query (show the local results first).

**Accessibility.** Combobox pattern; the input is labelled; results are announced as a list; the active option is announced; focus returns to the previous element on close.

---

### 6.2 Tooltip

**Purpose.** Explain an icon or a truncated value.

**Anatomy.** 12.5px text, max 240px, 8px radius, `overlaySurface`, 1px `line`, e2, 8px offset; 8px arrow or none. Appears after 280ms; disappears on Escape or blur.

**Behaviour.** Never the only place for essential information. No interactive content. Not for touch as the only affordance.

---

### 6.3 Pagination

**Purpose.** Move through a large, action-bearing table.

**Anatomy.** Left: "1–25 of 312". Right: previous/next icon buttons and a page-size select (25/50/100). 34px controls; 1px `line` top border.

**Behaviour.** Page size persists per table. Changing filters resets to page 1. The count updates without a full-page reload. No infinite scroll for tables with actions.

---

## 7. Family-specific

### 7.1 Conversation surface

**Purpose.** A serious conversation with a person, an agent or a group, in the same visual language as the rest of the family.

**Anatomy.**
- Transcript column max 760px, 20px padding; messages separated by 20–28px, not bubbles.
- Message: avatar 28px + name (12.5px/600) + optional role chip ("Digital person") + time (9.5px, `inkTertiary`); body 14px/1.55; optional attachments and actions.
- Human messages: a 2px left accent rule and a subtle `surfaceSunken` background (the only distinction); no right-aligned bubbles.
- Agent messages: same structure, agent monogram, no special "AI" gradient. If the agent is a digital person, use its name and monogram exactly like a human's.
- Tool/agent activity: a collapsible row with an icon, a verb ("Searched statements"), a timestamp and a status; collapsed by default; never the main event.
- Composer: pinned bottom, 1–8 lines, 12.5px, 1px `lineStrong`, 8px radius, 12px padding; leading attach, trailing send (34px primary icon button); a visible rule for Enter vs ⌘Enter; Stop replaces Send while streaming.

**States.** Empty (prompt + 2–3 suggested starts), loading older messages (skeleton), streaming (cursor + Stop + "Responding…"), error (inline alert with retry), offline (banner, queue), stopped (message remains, with "Stopped" label).

**Behaviour.**
- Do not auto-scroll if the user has scrolled up; show a "Jump to latest" pill instead.
- Announce the start and end of a stream to assistive tech, not each token.
- Long messages preserve line breaks and code blocks; links are underlined on hover only if they are visually distinct.
- Never hide the composer behind a modal.

**Accessibility.** The transcript is a labelled log (`role="log"`, `aria-live="polite"`); the composer is a labelled text area; the send button has a label; streaming status is announced once; attachments are listed with names and sizes.

---

### 7.2 Agent activity

**Purpose.** Make delegated work legible without making it the show.

**Anatomy.** One row per action: 14px icon (search, file, calendar, check), 11.5px verb phrase, 9.5px timestamp, status dot/label; indented under the message or shown in a compact "Activity" section. Expand for the detail (query, result summary, duration).

**States.** Running (subtle pulse + "Running"), done ("Done · 1.4s"), failed ("Failed · Retry"), needs input (warning tone + one action).

**Behaviour.** Never invent a fake progress percentage. Show the last known step. A failed step offers retry or edit. Activity is part of the conversation history and is preserved.

**Accessibility.** The status is text; the running state is announced once; the row is a button that toggles detail with `aria-expanded`.

---

## 8. Cross-component rules

- **Focus** is always visible: 2px ring, 2px offset, `color.focus`.
- **One primary** per view or dialog; primary is ink/paper, never a coloured fill.
- **Spacing** comes from the 4px scale; components do not hard-code gaps.
- **Borders** are 1px hairlines; 2px is reserved for focus and section openings.
- **Radii** are 2 / 4 / 8 / 14 / pill; no other values.
- **Icons** are 1.5px stroke line icons on a 24px grid, 16px in controls and 20px in page headers. See [`iconography.md`](iconography.md).
- **Numbers** are tabular; money is right-aligned in columns.
- **Status** always has a word.
- **No component** may invent a colour, size or shadow outside the tokens.
- **Every component** ships with empty, loading, error, disabled and focus states.
