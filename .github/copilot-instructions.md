# GitHub Copilot instructions

This repository is the **Quiet Design System** for the Alder family. It is not an application.

- Read [`AGENTS.md`](../AGENTS.md) before any UI task. It is canonical.
- Use semantic roles from [`design-system/tokens/tokens.json`](../design-system/tokens/tokens.json). Never add raw hex values.
- One accent; one primary action; no card shadows; one sans-serif; tabular numbers.
- Deliver light and night, all states, accessible keyboard paths.
- Do not edit tokens, generated token files or the reference to make a screen pass. Propose a system change instead.
- Run `npm run check` before proposing changes.
