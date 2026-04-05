---
applyTo: '**'
---

# Overall Design

## Colors
The base palette is black, white, and slate. Three track-specific accent colors are also authorised for semantic differentiation — they must not be used decoratively outside their assigned track context.

**Base palette:**
* white / black
* slate-50 through slate-900

**Track accents (semantic use only):**
* `blue-*` — Architecture / Recruitment track (Blue)
* `green-*` — Advisory / Industrial SEO track (Green)
* `purple-*` — Research / Labs track (Purple)

Always include a dark-theme variant for every colour choice:
```html
<div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50"></div>
<span class="text-blue-600 dark:text-blue-400">Architecture</span>
<span class="text-green-600 dark:text-green-400">Advisory</span>
<span class="text-purple-600 dark:text-purple-400">Research</span>
```

## Fonts
Please use `font-black` (sans-serif, the project default) for title/headings — do **not** use `font-serif`, as the clinical/authoritative persona requires a high-density sans-serif aesthetic. Use `font-mono` for code, numbers, reference IDs, and technical metadata. Use `font-sans` for all body text.
