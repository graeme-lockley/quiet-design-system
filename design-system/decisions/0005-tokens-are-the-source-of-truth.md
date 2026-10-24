# 0005 — Tokens are the source of truth; adapters are generated

- **Status:** accepted
- **Date:** 2026-10-24
- **Deciders:** Graeme Lockley
- **Supersedes:** none

## Context

Deliveries will use different technologies. If each delivery copies values from a document or a reference implementation, they will drift. A design system that an agent can be pointed at needs one machine-readable contract and generated artifacts, not several hand-maintained copies.

## Decision

- [`../tokens/tokens.json`](../tokens/tokens.json) is the only source of truth for values and semantic roles, in light and night.
- `quiet.tokens.css` and `token-reference.md` are **generated** from it and checked in so agents can read them without building.
- The reference imports the generated CSS; it does not redefine colour values.
- `node scripts/validate.mjs` verifies token completeness, contrast, version consistency, generated-file freshness and local links.
- Deliveries must use semantic roles, not raw values, and must record the version/commit they were built from.

## Consequences

- A token change is one edit plus `npm run build:tokens`; generated files update everywhere.
- CI fails if generated files are stale or a text role drops below AA.
- A delivery that forks a value is detectable; the contract requires it to be recorded.
- Platform-specific adapters (Tailwind, Swift, Compose) are additions, not sources of truth.

## Alternatives considered

- **CSS-first** — convenient for web, wrong for native and harder to validate.
- **Figma-first** — good for visual work, poor as a text-readable contract for agents and CI.
- **Per-stack copies** — guarantees drift.

## References

- [`../tokens/README.md`](../tokens/README.md)
- [`../../scripts/validate.mjs`](../../scripts/validate.mjs)
