# Contributing to Quiet Design System

This repository is the **design system**. Deliveries live elsewhere. A change here changes every future delivery, so the bar is deliberately high. Contributions are accepted under the MIT license (see [`LICENSE`](LICENSE)).

---

## Two different kinds of change

### 1. Building a screen or an app
Do not change this repository to fit a screen. Use [`AGENTS.md`](AGENTS.md), [`tokens.json`](design-system/tokens/tokens.json) and the [delivery contract](design-system/agent/delivery-contract.md). Record gaps and deviations in the delivery's `DESIGN.md`.

If the screen genuinely needs something the system does not have, raise it as a **system change** below.

### 2. Changing the system
Token additions, new components, new patterns, rule changes, version bumps, ADRs. Follow the process.

---

## Ground rules

1. **One source of truth.** Values live in [`design-system/tokens/tokens.json`](design-system/tokens/tokens.json). Everything else is generated or prose.
2. **No raw values in components.** Components use semantic roles. If a role is missing, propose it.
3. **Every colour has a light and a night value.** No mode is an afterthought.
4. **Contrast is a gate, not a preference.** Text roles meet WCAG AA in both modes. The validator checks the core pairs.
5. **One accent.** No second brand hue. App tints are scoped to the monogram and are off by default.
6. **One primary action.** Adding a second filled button is a design error, not an emphasis choice.
7. **No card shadows.** Elevation is for dialogs, drawers, popovers and toasts.
8. **Accessibility is part of the definition.** Keyboard, focus, names, live regions and reduced motion are in the component contract.
9. **No silent forks.** A deviation is documented or it is a defect.
10. **No dependencies.** The validation tooling uses only Node's standard library.

---

## Change types and versioning

| Type | Version bump | Examples |
| --- | --- | --- |
| **Patch** | 1.0.x | Typo, link fix, clarification that does not change behaviour, reference polish. |
| **Minor** | 1.x.0 | New token role, new component, new pattern, new example, additive rule. Existing deliveries remain valid. |
| **Major** | x.0.0 | Rename/remove a token or component, change a role's meaning, change the accent, change the typeface, break a layout contract. Requires an ADR and a migration note. |

Update `VERSION`, `package.json` and `CHANGELOG.md` together. The validator checks `VERSION` and `package.json` agree with `tokens.json.$meta.version`.

---

## Token change process

1. Open [`design-system/tokens/tokens.json`](design-system/tokens/tokens.json).
2. Add or change the role. Every colour role needs `role`, `light`, `dark`.
3. Check contrast against its actual surface in both modes. Text must be AA; large text 3:1; non-text UI 3:1.
4. If the change introduces a new **meaning** (not just a value), add an ADR in [`design-system/decisions/`](design-system/decisions/).
5. Run `npm run build:tokens` to regenerate [`quiet.tokens.css`](design-system/tokens/quiet.tokens.css) and [`token-reference.md`](design-system/tokens/token-reference.md).
6. Update any prose in `docs/` that names the role or value.
7. Run `npm run check`.
8. Update `VERSION`, `package.json` and `CHANGELOG.md`.
9. Open a PR using the template. Include the contrast evidence and the ADR link if applicable.

### Adding a component or pattern

1. Compose it from existing primitives first. Most "new components" are compositions.
2. If it is genuinely new, add a contract to [`components.md`](design-system/docs/components.md): purpose, anatomy, states, behaviour, tokens, accessibility, do/don't.
3. Add it to the reference page in both modes if it is a core primitive.
4. Add an example if the composition is non-obvious.
5. Add acceptance checks to [`review-checklist.md`](design-system/agent/review-checklist.md).
6. Add an ADR if the pattern changes the language (not just adds a component).
7. Bump minor or major according to the table.

---

## Decisions

Architecture decisions live in [`design-system/decisions/`](design-system/decisions/) as numbered ADRs:

- Status: proposed, accepted, superseded, rejected.
- Context, decision, alternatives, consequences, references.
- Never edit an accepted decision to reverse it; write a new one that supersedes it.

The exploration that produced Quiet is in [`archive/exploration/`](archive/exploration/). It is history.

---

## Validation

```bash
npm run check        # tokens, contrast, generated files, versions, links
npm run build:tokens # regenerate generated artifacts
```

`npm run check` must pass in CI. It checks:

- JSON is valid and required sections/roles are present.
- Every colour role has both modes and a valid value.
- Core text-role contrast is AA in both modes, and the published ratios match.
- `VERSION`, `package.json` and `tokens.json.$meta.version` agree.
- Generated CSS and token reference are current.
- Local links in Markdown, HTML and `llms.txt` resolve.
- Required entry-point files exist.

---

## Review

A reviewer asks:

1. Does this solve a real, recurring need, or one delivery's exception?
2. Does it use existing roles and patterns? If not, why?
3. Does it work in light and night?
4. Is it accessible by contract, not by hope?
5. Is the decision recorded, and is the version bumped?
6. Are the docs, reference, checklist and examples consistent?

The PR template carries the same questions.
