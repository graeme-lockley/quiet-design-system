# Tokens

**One canonical source, two modes, generated adapters.**

---

## The source

[`tokens.json`](tokens.json) is the only place values are authored. It is a portable, implementation-neutral document: semantic roles, type scale, spacing, layout, density, radii, elevation, motion, data visualisation and verified contrast pairs.

```json
"accent": {
  "role": "The family accent. Links, active navigation, primary data series.",
  "light": "#1F4D3D",
  "dark": "#A7C8B2"
}
```

Rules:

- Every colour role has `role`, `light` and `dark`.
- The role name describes **meaning**, not appearance. Use `inkTertiary`, not `grey`.
- No raw values in screens or components. Map the role to the delivery's mechanism.
- `appTint` is optional and off by default. Its only permitted use is the app monogram and the 2px active-app indicator. See [`../decisions/0002-one-family-accent.md`](../decisions/0002-one-family-accent.md).

---

## Files

| File | Status | Purpose |
| --- | --- | --- |
| `tokens.json` | **Source** | Canonical values and roles. Edit this. |
| `quiet.tokens.css` | Generated | CSS custom properties for light and night. Consumed by the reference. |
| `token-reference.md` | Generated | Human-readable tables (colour, type, space, radius, elevation, motion, contrast). |
| `README.md` | Source | This file. |

Generated files are committed so agents can read them without running a build. CI fails if they are stale.

---

## Naming

Token names are lowerCamelCase in JSON. The CSS adapter kebab-cases them, with a few intentional aliases:

| JSON | CSS |
| --- | --- |
| `color.inkSecondary` | `--ink-2` |
| `color.inkTertiary` | `--ink-3` |
| `color.surfaceRaised` | `--surface-raised` |
| `color.primaryAction` | `--primary` |
| `color.primaryActionInk` | `--primary-ink` |
| `color.primaryActionHover` | `--primary-hover` |
| `color.overlaySurface` | `--overlay` |
| `color.disabledSurface` | `--disabled-bg` |
| `color.disabledInk` | `--disabled-ink` |
| `dataViz.grid` | `--chart-grid` |
| `dataViz.area` | `--chart-fill` |
| `dataViz.neutral` | `--chart-muted` |
| `dataViz.series.1…6` | `--series-1…--series-6` |
| `elevation.light.e0…e3` | `--e0…--e3` |
| `elevation.dark.e0…e3` | `--e0…--e3` |

Typography, space, layout, radii and motion live in the JSON and in the reference; the CSS adapter exposes the colour and elevation roles most deliveries need. A platform adapter can expose the rest.

---

## Modes

- Two modes: `light` and `dark` (the product calls the dark mode **Night**).
- No pure black or pure white as large surfaces. See [`../docs/dark-mode.md`](../docs/dark-mode.md).
- Strategy: follow the system by default; allow a per-device Light / Dark / System override; apply before first paint.
- The accent changes value (evergreen → verdigris), not identity.
- The primary action inverts (ink → paper).

---

## Consuming the tokens

**Any stack:** read `tokens.json` and map `color.*.light` / `color.*.dark` to the platform's theme mechanism. Use the role names in the delivery's code.

**Web (reference path):** import `quiet.tokens.css` and use the custom properties. The file defines `:root, [data-mode="light"]` and `[data-mode="dark"]`, plus elevation. Nested `[data-mode="dark"]` scopes work, which is how the reference shows both modes side by side.

**Do not** copy values out of the reference CSS; it imports the generated adapter and does not define colours itself.

---

## Changing a token

1. Edit `tokens.json` only.
2. Check contrast against the actual surface in both modes. Text must be AA; large text 3:1; UI boundaries 3:1.
3. If the change alters **meaning** (new role, renamed role, changed accent), write an ADR and bump major.
4. Run `npm run build:tokens` from the repository root.
5. Update prose in `docs/` that names the role or value.
6. Run `npm run check`.
7. Update `VERSION`, `package.json` and `CHANGELOG.md`.
8. Submit the generated files with the JSON change.

CI verifies the same sequence. A PR that edits `quiet.tokens.css` or `token-reference.md` by hand will fail the freshness check.

---

## Contrast

`tokens.json` contains a `contrast` section with the verified pairs and ratios. The validator recomputes the core pairs and fails if a text role drops below AA. The current floor is `inkTertiary` at 4.90:1 (light) and 5.59:1 (dark) on the surface.

Contrast is a property of a **role against its intended surface**, not of a swatch in isolation. Do not move a text role onto a surface it was not verified against.

---

## Optional app tints

`color.appTint.*` exists for one narrow purpose: the monogram tile and the 2px active-app indicator. It is off by default. It must never be used for buttons, links, focus, charts, status, selection or navigation icons. If a product wants a stronger per-app identity, that is a design-system decision, not a local one.
