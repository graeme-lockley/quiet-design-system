# 0007 — Reading and canvas modes, plus desktop sidebar collapse

- **Status:** accepted
- **Date:** 2026-10-24
- **Deciders:** Graeme Lockley
- **Supersedes:** none
- **Prompted by:** Relay 0.1.0, where a sparse 236px sidebar had no desktop collapse and the board was capped at the 1180px reading measure while the top bar ran full width.

## Context

Quiet 1.0.0 defined a 1180px content measure as a signature ("the open margin") and only covered sidebar collapse at responsive breakpoints: the rail at 1120px, the sidebar as a sheet below 860px. That works for reading and forms. It does not work for two common delivery needs:

- A sparse desktop sidebar can leave most of a 236px column empty, making the navigation feel lost.
- A board, timeline or wide table needs the full main column. Capping it at 1180px creates unexplained gutters against a full-width top bar.

## Decision

### Layout modes

Every page chooses one:

- **Reading** — overview prose, settings, forms and detail copy. 1180px measure centred in the main column, with open margins.
- **Canvas** — boards, wide tables, timelines and visual canvases. Fluid inside the main column, 40px inline padding, filling the space between the sidebar's right edge and the viewport. No second max-width and no page-level card frame.

A reading page may contain a canvas region; the region becomes fluid, not the page. Both modes share the type, space and density scales.

### Desktop sidebar collapse

- A 34px `panel-left` toggle at the start of the top bar collapses the sidebar to 0px; the app rail remains.
- The toggle carries `aria-expanded` and `aria-controls`; `⌘\` toggles the same state.
- The state is stored per device and applied before first paint.
- While collapsed, the sidebar is `inert` and hidden from the accessibility tree; focus stays on the toggle.
- The sidebar never becomes a second icon rail: the app rail carries identity, and section labels carry navigation. Below 860px the sheet is the collapsed form.
- The transition is 200ms; reduced motion makes it instant.

## Consequences

- Boards and wide tables can use the full main column, while reading surfaces keep their measure.
- Sparse sidebars can be removed without losing navigation.
- The "open margin" signature is now explicitly reading-only; it is no longer a universal max-width.
- Deliveries that hard-coded a 1180px page wrapper must opt into the canvas mode for board surfaces.
- New tokens: `layout.canvasMax`, `layout.canvasPadX`, `layout.sidebarCollapsedWidth`, `layout.sidebarToggleWidth`, `layout.modes`, `component.sidebar`.
- New reference icon: `i-panel-left`.
- Version 1.1.0 (minor, additive). Existing reading screens remain valid; canvas screens become more complete.

## Alternatives considered

- **Icon-only collapsed sidebar** — preserves navigation but creates two icon rails side by side and loses the labels that make the family readable. Rejected.
- **Overlay drawer on desktop** — hides navigation behind a transient layer; feels like a tablet pattern on a wide screen and adds a second interaction. Rejected.
- **Keep 1180 everywhere** — the original problem: a board does not fill a wide window, and the top bar looks disconnected from the content. Rejected.
- **Make every page full width** — forms and prose would become too wide. Reading mode is retained. Rejected.
- **Per-app layout invention** — would drift between deliveries. This is recorded as a system pattern instead.

## References

- [`../docs/ux-architecture.md`](../docs/ux-architecture.md) §2, §3.4, §3.8, §11
- [`../docs/components.md`](../docs/components.md) §1.2, §1.5
- [`../tokens/tokens.json`](../tokens/tokens.json) `layout`, `component.sidebar`
- Relay delivery: `agent-kanban` `DESIGN.md`
