# blog-kit

The article renderer: theme tokens, CSS, MDX components, and the small helpers around them.

**This folder is copied verbatim into `sde_portfolio` when the blog ships.** It exists so the
preview in this repo and the published page render from the *same* code — otherwise the two
drift and "preview shows exactly what publishes" quietly stops being true.

Rules:

1. Edit here. Copy to `sde_portfolio`. Never fork it and edit the copy.
2. Nothing in here may import from `preview/` or from anything app-specific.
3. No colour literals outside `article.css` and `theme.ts`.

## Contents

| | |
|---|---|
| `article.css` | every token (light + dark + six accents) and all article styling |
| `theme.ts` | accent presets, storage keys, and the blocking anti-flash script |
| `components/` | MDX component set — figure, aside, table, code, theme toggle |
| `lib/` | reading time (computed) and the frontmatter contract |

## Theming contract

Light is the base on `:root`. Dark is applied three ways and all three must work:

- device preference — `@media (prefers-color-scheme: dark)` guarded with `:not([data-theme="light"])`
- explicit dark — `:root[data-theme="dark"]`
- explicit light — wins over the device by simply not matching the guard above

A colour defined *only* inside the media query makes the toggle work in one direction only.
That is the single easiest mistake to make here.
