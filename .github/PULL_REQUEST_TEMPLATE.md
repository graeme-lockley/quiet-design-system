# Pull request

## What changed

- [ ] Tokens
- [ ] Generated token artifacts
- [ ] Documentation
- [ ] Reference / proof
- [ ] Tooling or validation
- [ ] Archive (history only)

## Summary

<!-- One paragraph: what changed and why. -->

## If tokens change

- [ ] Light and dark values are both defined.
- [ ] Contrast is verified at AA (or the role is explicitly non-text).
- [ ] The change is additive unless an ADR records a breaking change.
- [ ] `npm run build:tokens` was run; generated files are included.
- [ ] `npm run check` passes.
- [ ] The version and changelog are updated.

## If documentation changes

- [ ] Internal links resolve.
- [ ] The reading order in `AGENTS.md` is still correct.
- [ ] No claim contradicts `tokens.json`.

## If the reference changes

- [ ] Both light and night were checked.
- [ ] The reference still consumes the generated token CSS.
- [ ] Screenshots were refreshed if the composed screen changed.

## Reviewer

- [ ] The change is consistent with the ADRs.
- [ ] The system is not being widened for a single delivery.
