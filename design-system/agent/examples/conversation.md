# Example — Conversation with a digital person

**Illustrative delivery brief. The docs and tokens are authoritative; this shows the family-specific conversation pattern.**

---

## Context

- **Product / app:** a family app with a conversation surface (for a person, a group or a digital person).
- **Person:** an operator reviewing a cash-flow summary with a digital person.
- **Primary job:** continue the conversation, understand what the agent did, and keep control.
- **Primary action:** `Send` (or `Stop` while a response streams).
- **What must not be lost:** the human’s request, the agent’s answer, the activity that produced it, and the ability to stop.

## Shell

Transcript column max 760px. Optional context panel for the object or person the conversation is about (400–520px) on desktop; a full-height sheet below 860px. Composer pinned to the bottom of the column. No second sidebar; the app’s sidebar remains the app’s navigation.

## Transcript

- **No chat bubbles.** Messages are blocks separated by 20–28px.
- **Human message:** 2px accent rule on the left, `surfaceSunken` background, name and time above the body.
- **Agent / digital person:** the same anatomy with the agent monogram and name. If it is a digital person, treat it exactly like a human participant, with a quiet “Digital person” role label. No “AI” gradient, no sparkle icon.
- **Body:** 14px `/1.55`, `ink`; secondary detail `inkSecondary`. Links use the accent and are underlined on hover.
- **Attachments:** name, size and action; never an unlabeled chip.
- **Tool / agent activity:** one collapsible row per action with a 14px icon, a verb phrase, a timestamp and a state (running, done, failed, needs input). Collapsed by default; never the main event.
- **Timestamps:** `14:02` in `micro`, `inkTertiary`.

## Composer

- 1–8 lines, 12.5px, 1px `lineStrong`, 8px radius, 12px padding.
- Leading attach action; trailing `Send` (34px icon button, `primaryAction` fill) which becomes `Stop` while streaming.
- Visible rule: `Enter to send · ⌘Enter for a new line` (or the platform equivalent).
- The composer never hides behind a modal.

## States

- **Empty:** a short prompt and 2–3 suggested starts. No wall of capabilities.
- **Loading older messages:** skeleton lines above the transcript; preserve scroll position.
- **Streaming:** visible cursor, `Stop`, and a “Responding…” status; announce start and end, not every token.
- **Stopped:** the partial message remains with a “Stopped” label and a retry.
- **Error:** inline alert under the last message with retry; the composer remains usable.
- **Offline:** banner; queued messages clearly marked.
- **Permission:** the conversation is read-only; the composer is replaced by a one-sentence explanation.

## Accent and identity

- The accent appears on the human message rule, links, focus and the streaming end-dot. The send button is the one primary control and uses `primaryAction` (ink/paper), not the accent.
- The agent’s identity is its monogram + name. No colour is assigned to “AI”.
- Status (running/done/failed) uses semantics, not accent.

## Accessibility

- The transcript is a labelled log; new completed messages are announced politely once.
- Streaming announces “Response started” and “Response complete”; it does not read tokens.
- The stop control is reachable before the stream begins.
- If the user has scrolled up, do not steal scroll; show “Jump to latest”.
- Attachments are announced by name and size.
- Long code blocks preserve whitespace and are keyboard scrollable.

## What not to add

Chat bubbles, gradients, glowing avatars, looping typing dots, “AI magic” iconography, autoplay sound, a full-screen modal composer, or a second primary action beside Send.

## Success test

A person can see their request, the answer, what the agent did, and how to stop it — in both modes, with the keyboard, without the interface performing.
