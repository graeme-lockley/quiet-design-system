# 0008 — Solo-app shell: omit the one-item rail

- **Status:** accepted
- **Date:** 2026-10-24
- **Deciders:** Graeme Lockley
- **Supersedes:** none
- **Prompted by:** Relay 0.1.0, where a 68px rail containing only the Relay monogram, help and avatar sat beside the 236px sidebar. It read as a left menu followed by a sub-menu and spent 68px on one item.

## Context

The family shell was designed for several apps: the rail carries family identity and switches between peers; the sidebar carries the current app's sections. When a delivery has exactly one app, the rail has nothing to switch between. It repeats identity, duplicates help/account and creates a second navigation column where there should be one.

Shrinking the rail does not solve this. A 44px one-item rail is still a menu beside a sub-menu; it only makes the same redundancy narrower.

## Decision

If the workspace has **one app**, use the solo-app shell:

- Omit the app rail entirely (`layout.railWidthSolo: 0px`).
- Move the monogram, app name and workspace context into the **sidebar head**.
- Keep Help / API guide and account in the sidebar navigation, sidebar footer or top bar.
- The sidebar remains collapsible to 0px, exactly as in the multi-app shell.
- The main column starts after the sidebar.

If the workspace has **two or more apps**, the rail returns at 68px and the sidebar sits beside it. The threshold is the number of apps, not a preference or a per-screen choice.

## Consequences

- A solo app gains 68px of content width and loses a redundant navigation layer.
- The sidebar head must carry identity; it can no longer be a bare title.
- The app rail component is conditional chrome, not a permanent fixture.
- `layout.railWidthSolo` and `component.appRail.visibleFromApps` record the rule.
- A delivery that later adds a second app switches shell without redesigning the sidebar.

## Alternatives considered

- **Shrink the rail to 44–48px** — still a second column, still a one-item menu. Rejected.
- **Icon-only sidebar** — loses the section labels and confuses the remaining single column. Rejected.
- **App tabs in the top bar** — works for two or three apps, but conflicts with breadcrumb/command space and does not scale. Rejected.
- **Keep the rail permanently for consistency** — consistent chrome is not the same as useful chrome. A one-item rail is empty structure. Rejected.

## References

- [`../docs/ux-architecture.md`](../docs/ux-architecture.md) §2, §3.3, §3.9
- [`../docs/components.md`](../docs/components.md) §1.1, §1.2
- [`../tokens/tokens.json`](../tokens/tokens.json) `layout.railWidthSolo`, `component.appRail`
- Relay delivery: `agent-kanban` `DESIGN.md`
