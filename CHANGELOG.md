# Changelog

All notable changes to the Quiet design system are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/); the project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.1.0] — 2026-10-24

### Added

- Reading and canvas layout modes: reading surfaces hold the 1180px measure; boards, wide tables and timelines fill the main column with 40px inline padding.
- Desktop sidebar collapse to 0px with a top-bar toggle, `⌘\` shortcut, per-device persistence, inert hidden content and a 200ms transition.
- `layout.canvasMax`, `layout.canvasPadX`, `layout.sidebarCollapsedWidth`, `layout.sidebarToggleWidth`, `layout.modes` and `component.sidebar` tokens.
- `i-panel-left` reference icon and sidebar toggle guidance.
- ADR 0007 recording the layout and collapse decision.

### Changed

- The open margin is now explicitly a reading-mode signature, not a universal content max-width.
- Canvas surfaces may use the full main column; the sidebar edge and viewport are the boundaries.

### Notes

- Relay 0.1.0 adopts both patterns and cites Quiet 1.1.0.

## [1.0.0] — 2026-10-24

### Added

- Quiet as the Alder family design language: warm paper, ink, one evergreen accent, hairlines, one sans-serif, type-led hierarchy.
- Designed light and night modes, with a system-default and per-device override strategy.
- Canonical semantic tokens for colour, type, space, layout, density, radii, elevation, motion and data visualisation, with verified contrast ratios.
- Generated web token adapter (`quiet.tokens.css`) and human token reference.
- UX architecture: family shell, navigation, page grammar, cross-app continuity, states, content rules, responsive and accessibility.
- Component contracts, including the conversation surface and agent activity.
- Agent-facing brief, delivery contract, review checklist and two worked examples.
- Living reference with Light / Dark / System switching.
- Architecture decision records for the language, accent policy, night mode, typeface and token source.
- MIT license.
- Validation script and CI workflow for tokens, contrast, generated files, versions and links.

### Changed

- Project named `quiet-design-system`; the design language remains Quiet.
- The four-direction exploration is preserved in `archive/exploration/` as the decision record; it is no longer the entry point.

### Notes

- The initial capture, the reference and the archive use illustrative data. `Alder`, `Ledger`, `Studio`, `Atlas` and `Signal` are placeholder names.
