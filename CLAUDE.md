# Claude Code — start here

This repository is the **Quiet Design System**, not an application. Before any UI work, read [`AGENTS.md`](AGENTS.md); it is the canonical contract.

## The five things that must not drift

1. One accent: evergreen `#1F4D3D` light / verdigris `#A7C8B2` night. Links, focus, active nav, selection, primary data series only.
2. One primary action per view or dialog: ink in light, paper in night. Never accent-coloured.
3. No shadows on cards, tables or inputs. Hairlines and space.
4. One sans-serif. System UI stack (SF Pro reference) or Inter. Tabular numerals for money.
5. Every screen in both modes, every state, keyboard-complete, AA contrast.

Use semantic roles from [`design-system/tokens/tokens.json`](design-system/tokens/tokens.json). Do not edit tokens, generated files or the reference to make a delivery pass; propose a system change instead.

For a screen task, use [`design-system/agent/brief.md`](design-system/agent/brief.md) and the [delivery contract](design-system/agent/delivery-contract.md). The definition of done is [`review-checklist.md`](design-system/agent/review-checklist.md).

Run `npm run check` before committing.
