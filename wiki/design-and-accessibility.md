# Design & Accessibility Guidelines

Derived from the accessibility audit applied across all pages (April 2026). These rules prevent the contrast and semantic failures that required the audit. Follow them when writing or reviewing any HTML.

---

## WCAG AA Contrast Requirements

| Text type | Minimum ratio |
|---|---|
| Normal body text (< 18 px regular, < 14 px bold) | 4.5 : 1 |
| Large text (≥ 18 px regular, ≥ 14 px bold) | 3 : 1 |
| UI components, borders, focus rings | 3 : 1 |

The rules below are the practical Tailwind translations of these ratios for the site's white/slate-900 base.

---

## Base Text Colors

### Light mode (white / slate-50 / slate-100 backgrounds)

| Use case | Minimum token | Notes |
|---|---|---|
| Body paragraphs | `text-slate-700` | `text-slate-600` fails at small sizes; use 700 universally for `text-sm` or smaller |
| Body paragraphs (normal / large size) | `text-slate-600` | Acceptable for `text-base` and above only |
| Metadata labels / secondary descriptors | `text-slate-500` | Sub-labels inside a metadata grid (e.g. "Role", "Status") |
| Headings | `text-slate-900` | No constraint; always safe |

### Dark mode (slate-900 / slate-950 backgrounds)

| Use case | Minimum token | Notes |
|---|---|---|
| Body paragraphs (any size) | `dark:text-slate-300` | `dark:text-slate-400` fails WCAG AA — never use it for body or descriptive text |
| Metadata values (mono, `text-[11px]`) | `dark:text-slate-50` | Very small font needs very high contrast |
| Metadata labels (`font-semibold` spans) | `dark:text-slate-300` | One notch below the value it labels |
| Headings | `dark:text-white` or `dark:text-slate-50` | Always safe |

---

## Accent Colors (Track-Specific)

Three semantic tracks each have a dedicated accent colour. **Do not use accent colours decoratively outside their assigned track context.** Shade requirements differ between light and dark because the backgrounds have opposite luminance.

### Blue — Architecture / Recruitment track

#### Light mode

| Element type | Token |
|---|---|
| Large heading span / `h1` inline accent | `text-blue-600` |
| Subheading accent (`text-sm`, `font-bold`) | `text-blue-800` |
| Small label / mono / `tracking-widest` (≤ `text-xs`) | `text-blue-800` |
| Status badge / pill text | `text-blue-900` |
| CTA / filled button background | `bg-blue-800` (`bg-blue-700` minimum) |
| Inline link (underlined) | `text-blue-600` |
| Inline link hover | `hover:text-blue-500` |

#### Dark mode

| Element type | Token |
|---|---|
| Large heading span / `h1` inline accent | `dark:text-blue-400` |
| Subheading accent (`text-sm`, `font-bold`) | `dark:text-blue-200` |
| Small label / mono / `tracking-widest` (≤ `text-xs`) | `dark:text-blue-200` |
| Status badge / pill text | `dark:text-blue-200` |
| Inline link (underlined) | `dark:text-blue-400` |
| Inline link hover | `dark:hover:text-blue-300` |
| Card / block hover (`group-hover:`) | `dark:group-hover:text-blue-300` |

### Green — Advisory / Industrial SEO track

#### Light mode

| Element type | Token |
|---|---|
| Large heading span / `h1` inline accent | `text-green-700` |
| Subheading accent / section label (≤ `text-sm`) | `text-green-800` |
| Small mono label / PHASE markers (≤ `text-xs`) | `text-green-900` |
| Status badge / pill text | `text-green-700` (with `border-green-600`) |
| CTA section background | `bg-green-800` (`bg-green-700` minimum) |

#### Dark mode

| Element type | Token |
|---|---|
| Large heading span | `dark:text-green-400` |
| Subheading accent / section label (≤ `text-sm`) | `dark:text-green-300` |
| Small mono label / PHASE markers (≤ `text-xs`) | `dark:text-green-300` |
| Status badge / pill text | `dark:text-green-300` (with `dark:border-green-600`) |
| Card / block hover | `dark:group-hover:text-green-400` |

### Purple — Research / Labs track

#### Light mode

| Element type | Token |
|---|---|
| Large heading span / `h1` inline accent | `text-purple-600` |
| Subheading accent / section label (≤ `text-sm`) | `text-purple-800` |
| Small mono label / REF tags (≤ `text-xs`) | `text-purple-900` |
| Status badge / pill text | `text-purple-900` |
| Inline link (underlined) | `text-purple-600` |
| Inline link hover | `hover:text-purple-500` |

#### Dark mode

| Element type | Token |
|---|---|
| Large heading span | `dark:text-purple-400` |
| Subheading accent / section label (≤ `text-sm`) | `dark:text-purple-200` |
| Small mono label / REF tags (≤ `text-xs`) | `dark:text-purple-200` |
| Inline label in heading accent | `dark:text-purple-400` |
| Inline link (underlined) | `dark:text-purple-200` |
| Inline link hover | `dark:hover:text-purple-100` |
| Card / block hover | `dark:group-hover:text-purple-300` |

---

## Text on Filled Accent Backgrounds

When an accent colour is used as a **block background** (CTA sections, benchmark panels), all text must be `text-white`. Tinted variants like `text-blue-100`, `text-blue-200`, or `text-purple-100` do **not** pass at the contrast ratios required for small or light-weight text.

```html
<!-- Correct -->
<section class="bg-blue-800 text-white">
  <p class="text-white font-light">...</p>
  <div class="text-white font-bold tracking-widest">LABEL</div>
</section>

<!-- Incorrect — tinted text fails on accent bg -->
<section class="bg-blue-800">
  <p class="text-blue-100">...</p>       <!-- fails -->
  <div class="text-blue-200">LABEL</div> <!-- fails for small text -->
</section>
```

Minimum safe background shades for white text:

| Track | Minimum background |
|---|---|
| Blue | `bg-blue-800` |
| Green | `bg-green-800` |
| Purple | `bg-purple-800` |

---

## Status Badges & Pill Labels

Badges use a tinted background with a solid border. Do **not** use opacity/transparency on borders (e.g. `border-green-900/30`) — this produces insufficient contrast.

```html
<!-- Correct -->
<span class="px-2 py-1 text-[9px] font-mono
             text-green-700 dark:text-green-300
             border border-green-600 dark:border-green-600
             bg-white dark:bg-slate-900 rounded">
  COMPLETED
</span>

<!-- Status tag with coloured bg (track-coloured) -->
<div class="px-3 py-1 text-[10px] font-mono font-bold tracking-[0.3em] uppercase rounded
            text-blue-900  dark:text-blue-200
            border border-blue-200 dark:border-blue-700
            bg-blue-50 dark:bg-blue-950/40">
  Status: Active
</div>
```

---

## Focus Indicators

Every interactive element must have a visible focus ring. Use `focus-visible:` variants so it only appears for keyboard navigation.

**Standard pattern (cards, block links):**
```html
class="... focus-visible:outline focus-visible:outline-2
       focus-visible:outline-blue-500 focus-visible:outline-offset-2"
```

Use the track-appropriate accent colour (`blue-500`, `green-500`, or `purple-500`) depending on which track the element belongs to.

**Skip-to-main-content link (required on every page):**
```html
<a href="#main-content"
   class="sr-only
          focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4
          focus-visible:left-1/2 focus-visible:-translate-x-1/2 focus-visible:z-[100]
          focus-visible:px-6 focus-visible:py-3
          focus-visible:bg-white dark:focus-visible:bg-slate-900
          focus-visible:text-slate-900 dark:focus-visible:text-white
          focus-visible:border-2 focus-visible:border-blue-500
          focus-visible:font-bold focus-visible:text-sm focus-visible:rounded
          focus-visible:shadow-2xl focus-visible:outline-none">
  Skip to main content
</a>
```

---

## Semantic HTML Requirements

These are not colour rules but they were part of the same audit and must be followed to prevent repeat fixes.

### Heading hierarchy
- Do **not** use `<div>` as a section heading. Use `<h2>` / `<h3>` etc. with the same visual classes.
- Do not skip heading levels (h1 → h3 without an h2).
- Section labels styled as `text-xs font-black uppercase tracking-[0.4em]` are still semantic headings — use `<h2 id="...">` and pair the section with `aria-labelledby="..."`.

### Decorative characters
Arrows and purely decorative glyphs must carry `aria-hidden="true"`:
```html
<span class="...">Read Full Case Study <span aria-hidden="true">→</span></span>
```

### Section landmarks
`<section>` elements that contain a visible heading should use `aria-labelledby` pointing to that heading's `id`:
```html
<section aria-labelledby="implementation">
  <h2 id="implementation" class="text-xs font-black ...">Implementation</h2>
  ...
</section>
```

---

## Quick-Reference Cheat Sheet

```
LIGHT MODE body text:     slate-700 (sm/smaller) / slate-600 (base+)
DARK MODE body text:      slate-300 minimum (never slate-400)
DARK MODE very small:     slate-50 for values, slate-300 for their labels

LIGHT blue accent small:  blue-800
LIGHT green accent small: green-800 / green-900
LIGHT purple accent small: purple-800 / purple-900
LIGHT blue/green/purple large heading: blue-600 / green-700 / purple-600

DARK blue accent small:   blue-200
DARK green accent small:  green-300
DARK purple accent small: purple-200
DARK blue/green/purple large heading: blue-400 / green-400 / purple-400

Filled CTA bg min:        bg-blue-800 / bg-green-800 / bg-purple-800
Text on filled bg:        text-white only (no tinted variants)
Badge border:             solid colour (no /30 opacity)
Focus ring:               outline-2 outline-{track}-500 outline-offset-2
```
