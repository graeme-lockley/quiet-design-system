# Working with an agent

Three files do three different jobs. Use them in order.

| File | Job |
| --- | --- |
| [`../../AGENTS.md`](../../AGENTS.md) | The standing contract for any delivery: reading order, non-negotiables, workflow, definition of done. |
| [`brief.md`](brief.md) | The task brief for one screen or flow. Fill in the bracketed context and paste it into the agent. |
| [`delivery-contract.md`](delivery-contract.md) | What the delivery must return: `DESIGN.md`, screens, state inventory, token map, checklist, deviations, gaps. |
| [`review-checklist.md`](review-checklist.md) | The auditable definition of done. Complete it in the delivery or PR. |

Examples of the composition grammar live in [`examples/`](examples/).

---

## The shortest path

1. Point the agent at the repository and say: *read `AGENTS.md` first*.
2. Give it `brief.md` with the context filled in.
3. Attach or link `tokens.json` and the reference.
4. Require the `DESIGN.md` from `delivery-contract.md` and the completed `review-checklist.md`.
5. Reject any delivery that has an undocumented deviation or a missing state.

## The chat-only path

If the agent cannot read the repository:

1. Paste `brief.md` (it includes the non-negotiables and a standalone token card).
2. Paste the relevant sections of `review-checklist.md`.
3. Attach screenshots of the reference in light and night.
4. Require the delivery record as described in `delivery-contract.md` — it can be a single markdown file in the conversation.

Do not let a chat-only agent invent tokens because it cannot see `tokens.json`. The brief's token card is sufficient to start; the delivery must not introduce values outside it.
