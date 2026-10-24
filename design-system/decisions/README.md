# Decisions

Numbered architecture decisions for the Quiet design system. An accepted decision is not edited to reverse it; write a new one that supersedes it.

| ADR | Decision | Status |
| --- | --- | --- |
| [0001](0001-adopt-quiet.md) | Adopt Quiet as the family language | accepted |
| [0002](0002-one-family-accent.md) | One family accent; scoped monogram tint only | accepted |
| [0003](0003-designed-night-mode.md) | Night mode is designed, not inverted | accepted |
| [0004](0004-system-typeface.md) | System UI typeface, Inter fallback | accepted |
| [0005](0005-tokens-are-the-source-of-truth.md) | Tokens are canonical; adapters are generated | accepted |
| [0006](0006-repository-is-the-contract.md) | The repository is the contract, not a component library | accepted |

## Format

- **Status:** proposed · accepted · superseded · rejected
- **Date**
- **Deciders**
- **Context** — the forces, not just the preference.
- **Decision** — what is now true.
- **Alternatives** — what was considered and why it lost.
- **Consequences** — what becomes easier, harder or impossible.
- **References**

## When to add one

- A change of meaning: the accent, the language, the typeface, the accent policy.
- A new foundational rule: tokens as source of truth, generated adapters.
- A breaking change to tokens or components.
- A recurring question that has been answered more than once.

A new component or a small additive token usually does not need an ADR; a change to the language does.

## Proposing one

Use [`../../.github/ISSUE_TEMPLATE/system-gap.md`](../../.github/ISSUE_TEMPLATE/system-gap.md) first. If the answer changes the system, open a PR with the new ADR and update this index.
