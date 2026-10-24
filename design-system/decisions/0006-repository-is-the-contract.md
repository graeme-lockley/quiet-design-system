# 0006 — This repository is the contract, not a component library

- **Status:** accepted
- **Date:** 2026-10-24
- **Deciders:** Graeme Lockley
- **Supersedes:** none

## Context

The family is delivered through different projects, stacks and agents. If each delivery copies a reference implementation or a screenshot, they drift. If the design system becomes a component library, it assumes one stack and excludes the others. The owner needs to point an agent at one GitHub project and get consistent UI across deliveries.

## Decision

The repository is an **agent-first design contract**, not a runtime UI library:

- `AGENTS.md` is the standing instruction and reading order.
- `tokens.json` is the only source of values; adapters are generated and validated.
- The docs define language, UX architecture, components and night mode.
- A delivery contract and review checklist define what every delivery must return.
- The reference is a plain HTML/CSS **proof** for comparison, not a library to copy.
- The archive is history and is never guidance.
- Deliveries are built in their own repositories and cite the design-system version and commit.

## Consequences

- No runtime dependency, no package lock-in, no framework assumptions.
- Agents must translate contracts into the delivery's own stack; that is intentional.
- Consistency is enforced by tokens, rules, a checklist, and a delivery record — not by shared code.
- The reference must remain dependency-free so any agent can open it.
- The repo can grow platform adapters (CSS today; Tailwind, Swift, Compose later) without becoming a library.

## Alternatives considered

- **Component library** — strongest code reuse, but locks the family to one stack and makes the reference an implementation. Rejected.
- **Figma library** — good for visual work, poor as a text-readable contract for agents and CI. Rejected as the primary source.
- **Starter repository per stack** — useful later as adapters, but they drift if they are the source of truth. Rejected as the primary contract.
- **Documentation-only** — readable, but unenforceable. The checklist and validation exist to close that gap.

## References

- [`../../AGENTS.md`](../../AGENTS.md)
- [`../agent/delivery-contract.md`](../agent/delivery-contract.md)
- [`../tokens/README.md`](../tokens/README.md)
- [`0005-tokens-are-the-source-of-truth.md`](0005-tokens-are-the-source-of-truth.md)
