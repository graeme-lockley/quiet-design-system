# 0002 — One family accent

- **Status:** accepted
- **Date:** 2026-10-24
- **Deciders:** Graeme Lockley
- **Supersedes:** none

## Context

The family includes several applications with distinct domains. The owner asked whether every app should share one accent or carry a small per-app accent, and was unsure. The system needs a decision that preserves colour as meaning and still allows orientation between apps.

## Decision

Use **one family accent** — evergreen `#1F4D3D` in light, verdigris `#A7C8B2` in night — for links, focus, active navigation, selection and the primary data series.

App identity is carried by the **monogram and the app name**, not a colour. A per-app tint is documented as an optional, strictly scoped extension: the monogram tile and the 2px active-app indicator only. It is off by default and never applies to buttons, links, charts, status, selection or focus.

## Consequences

- Colour keeps a single meaning: “this is live or interactive”.
- Adding an app does not add a colour or require a brand decision.
- If per-app tints are enabled later, the surface area is small and reversible.
- A product team may want an app colour for brand reasons; the system says no by default. That is deliberate.

## Alternatives considered

- **Per-app accent** — better orientation, but four apps become four brands and colour loses semantic value.
- **Accent-free (ink only)** — purer, but removes the signal for interaction and data, and makes the language harder to read at a glance.

## References

- [`../tokens/tokens.json`](../tokens/tokens.json) (`color.accent`, `color.appTint`)
- [`../docs/design-language.md`](../docs/design-language.md) §3
