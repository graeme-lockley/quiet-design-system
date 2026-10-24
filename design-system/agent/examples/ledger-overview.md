# Example — Ledger overview

**Illustrative delivery brief. The docs and tokens are authoritative; this shows how the family grammar is applied.**

---

## Context

- **Product / app:** Ledger, the money application in the Alder family.
- **Person:** a private client with three accounts, checking the state of their money on a Saturday morning.
- **Primary job:** “Am I okay, and what needs me now?”
- **Primary action:** `Approve payment` for the most urgent item in the queue. (`New payment` is available, but secondary.)
- **What must not be lost:** total balance; the three waiting approvals; the most recent movement.

## Shell

Rail 68px (app monograms, Ledger active), sidebar 236px (Overview active, Approvals count 3), top bar 56px (breadcrumbs, `⌘K` search, notifications, avatar), content max 1180px. No inspector.

## Bands

1. **Eyebrow** — `SATURDAY, 24 OCTOBER · ZAR` with the 18×1px accent rule.
2. **Title** — `Good afternoon, Graeme` (display-2, 44px, 600, −0.035em).
3. **State sentence** — `Three approvals are waiting. Everything else is settled.` One sentence, no exclamation.
4. **Actions** — `This month` (secondary, calendar icon) · `New payment` (secondary, plus icon). The page primary lives in the queue, not the header.
5. **KPI row** — exactly four:
   - Total balance `R 4,286,410.22`, `+2.4%` vs September.
   - Available `R 2,940,000.00`, 3 accounts.
   - Awaiting approval `3`, `R 118,400.00 in total`.
   - Spent this month `R 318,904.10`, `−8.1%` vs September (neutral, not green).
6. **Main signal** — cash flow, Apr–Sep, one accent area and one muted dashed outflow line. Summary above: net movement `+R 412,806.14`, average month `R 68,801.02`. Range control 1M / 6M / 1Y with 6M active.
7. **Needs your attention** — three rows: Sipho Naidoo (`Approve`, the one primary on the page), Makro (`Review`), L. Botha (`Review`). Footer link “All approvals”.
8. **Recent activity** — five rows: date, description, account, category, amount, status. Money right-aligned and tabular; status dot + word.
9. **Across Alder** — Studio 3, Atlas 1, Signal 2. A bridge, not a dashboard.
10. **Footer** — `Alder Ledger · Reconciled 14:02 SAST · Illustrative data`.

## Token notes

- **One primary.** In this example it is `Approve` in the queue, because the job is “what needs me now”. If the product prioritises creation, make `New payment` primary and demote the approvals to secondary or a link — never both.
- Accent appears in: eyebrow rule, active nav, “All approvals” link, chart line, focus. It is **not** on the primary button or the status pills.
- Primary button is `primaryAction` (ink) with `primaryActionInk`; hover `primaryActionHover`.
- Cards are `surface`, 1px `line`, 8px radius, 20px padding, no shadow.
- `inkTertiary` is used for labels, timestamps and secondary metadata only; it is the AA floor.
- Night: `canvas` graphite, `accent` verdigris, primary becomes paper. The same composition; no new layout.

## States to deliver

- Initial loading: KPI skeletons and chart skeleton, stable shell.
- Empty (new account): “No movements yet” with “Add an account” / “Import a statement”.
- Error: section-level alert for the activity table, with retry; chart error with retry.
- Offline: top banner, timestamp, read-only.
- Partial: “Showing 3 of 12 approvals” with a link.
- Success: inline confirmation after an approval; no modal celebration.
- Destructive: not applicable on the overview, but the approval dialog must name the payment and amount.

## What not to add

A fifth KPI, a second chart, a promo banner, a “Welcome back!” greeting, badges on every nav item, coloured headers, a card inside the attention panel, or a primary button in the top bar.

## Success test

A person can answer “am I okay?” and “what needs me?” without reading the table, and can see the detail if they want it. In both modes.

## Reference

The composed screen in [`../../reference/index.html`](../../reference/index.html) and the captures in [`../../reference/screens/`](../../reference/screens/). Compare; do not copy the implementation.
