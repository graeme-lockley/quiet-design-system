# 0001 — Adopt Quiet as the family language

- **Status:** accepted
- **Date:** 2026-10-24
- **Deciders:** Graeme Lockley
- **Supersedes:** none

## Context

Four complete directions were built and compared against the running application: Quiet, Nocturne, Folio and Calibre. The owner's taste is Investec-like cleanliness with Apple-like sophistication and a strong preference for calm over clutter. The language must work across a family of applications that share one account, one navigation model and one identity, not just a single screen.

## Decision

Adopt **Quiet** as the family design language: warm paper, near-black ink, one deep green, hairlines, one sans-serif, type-led hierarchy and a designed night mode.

## Alternatives considered

- **Nocturne** — graphite and champagne, dark-first. Strong, but it proposes a second brand hue and weakens dense tables. Its material informed the night mode instead.
- **Folio** — warm editorial serif, terracotta, rules. The most ownable identity, but it resists dense operational screens and dark mode. It remains a reference for brand surfaces only.
- **Calibre** — cool, technical, dark spine, inspector. Excellent for expert operations, too cold for client-facing work. It remains a reference for operational density, not a second language.

## Consequences

- One accent, one typeface, one shell, one grammar. The system is intentionally narrow.
- Card shadows are out; hairlines and space carry structure.
- Certain products will want more density. They use the compact density tokens, not a different visual language.
- The full exploration and its rationale are preserved in [`archive/exploration/STYLE-OPTIONS.md`](../../archive/exploration/STYLE-OPTIONS.md). It is history, not guidance.

## References

- [`../docs/design-language.md`](../docs/design-language.md)
- [`../../archive/exploration/STYLE-OPTIONS.md`](../../archive/exploration/STYLE-OPTIONS.md)
