# 0004 — System UI typeface, with Inter as the cross-platform fallback

- **Status:** accepted
- **Date:** 2026-10-24
- **Deciders:** Graeme Lockley
- **Supersedes:** none

## Context

The reference aesthetic is Apple-like restraint. No brand constraints, licences or existing typefaces were supplied. The family may be delivered on Apple platforms, the web, Windows, Android and embedded surfaces. A distinctive display face would add identity but also licensing, loading and consistency costs.

## Decision

Use **one sans-serif family**:

- Default: the system UI stack, with SF Pro as the Apple reference rendering.
- When identical cross-platform rendering is required: Inter, with a `+0.01em` body tracking adjustment.
- Numerals: tabular, lining figures for money, counts and tables.
- No serif, display face, script or second sans in the core system.
- Mono is reserved for code, identifiers and technical strings, not general UI numbers.

## Consequences

- Zero font licensing and no webfont payload in the default path.
- Rendering differs slightly by platform; the system values proportions and hierarchy over pixel-identical glyphs.
- Inter is the documented escape hatch, not a second brand.
- A future licensed typeface would be a major version with a re-cut of the scale, not a silent swap.

## References

- [`../tokens/tokens.json`](../tokens/tokens.json) `typography.family`
- [`../docs/design-language.md`](../docs/design-language.md) §2.2
