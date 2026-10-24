# 0003 — Night mode is designed, not inverted

- **Status:** accepted
- **Date:** 2026-10-24
- **Deciders:** Graeme Lockley
- **Supersedes:** none

## Context

Night mode is a launch requirement. The initial recommendation paired Quiet by day with Nocturne's material at night. Nocturne's palette is graphite and champagne; Quiet's accent is green. A literal pairing would introduce a second brand hue.

## Decision

Night mode keeps Quiet's identity:

- Graphite canvas `#0B0C0B`, surfaces `#111312` / `#171A18`.
- Warm paper ink `#F2F1E9`, never pure white.
- Accent shifts in value, not identity: evergreen becomes verdigris `#A7C8B2`.
- The primary action inverts from ink to paper.
- Structure remains hairlines; shadows are reserved for floating surfaces.
- Mode strategy: follow the system by default, allow a per-device Light/Dark/System override, apply before first paint.

Nocturne's champagne is **not** used. It would be a second accent and would break the one-colour meaning.

## Consequences

- One accent across both modes; the brand is recognisable at night without a second hue.
- The dark mode needs its own contrast and component review; it is not a filter.
- If the owner later prefers champagne at night, it is a token swap (`color.accent` and related), not a redesign.

## References

- [`../docs/dark-mode.md`](../docs/dark-mode.md)
- [`../reference/index.html`](../reference/index.html)
