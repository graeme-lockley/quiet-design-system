# Iconography

**One line style, one stroke weight, one grid.**

The reference set is in [`../assets/icons.svg`](../assets/icons.svg) — 26 symbols on a 24px viewBox with a 1.5px stroke. It is a **shape reference and a usable sprite**, not a mandatory library. If a delivery uses a different icon source, it must match these rules.

---

## The rules

- **24px viewBox.** Icons are drawn on a 24×24 grid.
- **1.5px stroke.** Round caps and joins. No variable stroke weight.
- **No fill** except status dots and the app monogram. Icons are strokes, not illustrations.
- **`currentColor`.** Icons inherit the text colour of their context. Never hard-code an icon colour.
- **Sizes:** 14px (dense metadata), 16px (navigation and controls, the default), 20px (page headers and standalone actions), 24px (empty states and large affordances). Do not scale between these without a reason.
- **Optical alignment:** icons are centred in their target; a 16px icon in a 34px control leaves 9px on each side.
- **One style.** Do not mix this outline set with filled icons, rounded-square icon packs, duotone icons, or an icon font.

---

## Accessibility

- An **icon-only button** needs an accessible name (`aria-label` or visually hidden text) and a tooltip if the meaning is not universally understood.
- An icon beside a visible label is decorative: hide it from assistive technology (`aria-hidden="true"`).
- Icons never carry meaning alone when the meaning is consequential. Pair with text.
- Status dots are decorative; the status word is the accessible signal.

---

## The reference set

| Symbol | Use |
| --- | --- |
| `i-grid` | Overview / dashboard |
| `i-wallet` | Accounts, balances |
| `i-arrows` | Payments, transfers |
| `i-file` | Statements, documents |
| `i-check` | Approvals, completed |
| `i-users` | Team, people |
| `i-shield` | Recipients, permissions, security |
| `i-sliders` | Integrations, settings |
| `i-audit` | Audit log, history |
| `i-search` | Search, command palette |
| `i-bell` | Notifications |
| `i-plus` | Create / add |
| `i-calendar` | Date, period, schedule |
| `i-filter` | Filter |
| `i-download` | Download, export |
| `i-chevron` | Disclosure, next |
| `i-up-right` | External link, open |
| `i-x` | Close, remove |
| `i-alert` | Warning, error |
| `i-help` | Help, support |
| `i-settings` | Settings |
| `i-logout` | Sign out |
| `i-send` | Send message |
| `i-empty` | Empty state |
| `i-check-sm` | Inline success |
| `i-clock` | Time, pending, schedule |

Use the symbol IDs directly from the sprite in web deliveries:

```html
<svg class="ico" aria-hidden="true"><use href="icons.svg#i-search"></use></svg>
```

with:

```css
.ico {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex: 0 0 auto;
}
```

---

## Adding an icon

1. Draw it on the 24px grid with a 1.5px stroke and round joins.
2. Match the existing optical weight and corner treatment.
3. Add it to the sprite with an `i-` prefixed ID.
4. Add it to the table above with its intended use.
5. Propose it as an additive change; do not introduce a second icon style for one screen.

---

## What not to do

- Use an emoji as a UI icon.
- Use filled, duotone or multi-colour icons in the core interface.
- Put a brand logo inside an icon slot; app identity is the monogram.
- Draw an icon at a size other than 14 / 16 / 20 / 24px.
- Hard-code a colour on the SVG instead of `currentColor`.
- Use an icon without a label for a consequential action.
