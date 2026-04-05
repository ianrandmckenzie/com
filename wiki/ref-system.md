# REF Identifier System

## Purpose

Every content item on the portfolio — case studies, lab experiments, articles — carries a `REF` identifier. These are purely stylistic labels rendered in `font-mono` that signal a technical, archival aesthetic. This document defines the canonical format so identifiers are consistent, predictable, and easy to guess from context.

---

## Format

```
REF: [TRACK]-[SEQ]-[SLUG]
```

| Segment | Rules |
|---|---|
| `TRACK` | 3–4 uppercase chars. One of the authorised track codes (see below). Never abbreviated differently. |
| `SEQ` | 3-digit zero-padded integer, unique within the track. Assigned in chronological order of creation. |
| `SLUG` | 3–8 uppercase alphanumeric chars. A short memorable keyword describing the content — not the track or technology. |

**The rendered label is always `REF` — never `Project_Ref`, `Bench_Ref`, `Ref`, or any other variant.**

---

## Track Codes

| Code | Discipline | Colour | Used On |
|---|---|---|---|
| `ARCH` | Architecture / Recruitment | Blue (`blue-*`) | Case study pages |
| `ADV` | Advisory / Industrial SEO | Green (`green-*`) | Consulting pages |
| `LAB` | Research / Labs | Purple (`purple-*`) | Lab experiment pages |
| `ART` | Articles / Writing | Blue (`blue-*`) | Article pages |

> Track colour follows the design system's semantic track colours. The REF pill itself may be rendered in neutral slate to avoid competing with other track-coloured pills on the same page (see voxel.html, article pages).

---

## Registered Identifiers

| REF Code | Title | URL |
|---|---|---|
| `ARCH-001-REV` | Revenue-Driven SEO Architecture | `/case-studies/seo-case-study.html` |
| `ARCH-002-CLINIC` | Clinic Sites / Jane Acquisition | `/case-studies/jane-sites.html` |
| `ARCH-003-MEDIA` | Failure Unit Media Platform | `/case-studies/failureunit.html` |
| `LAB-001-VIZ` | Prime Spiral Visualization Engine | `/labs/spiral.html` |
| `LAB-002-VOXEL` | Deterministic Volumetric Orchestration | `/labs/voxel.html` |
| `ART-001-HIPAA` | Zero-Trust HIPAA SaaS Architecture | `/articles/zero-trust-hipaa-saas-architecture.html` |

---

## Assignment Rules

1. **Next SEQ** — Find the highest existing SEQ in the track and increment by 1.
2. **SLUG** — Pick a word that identifies the *subject* of the piece, not the technology or track colour. Keep it short enough to be immediately recognisable.
3. **No reuse** — Once assigned, a REF code is permanent, even if the page is archived.
4. **One REF per page** — Each content item has exactly one REF identifier. Index/listing pages display REFs sourced from the content pages — do not invent separate listing REFs.

---

## Rendering

### Standard pill (listing pages)

```html
<div class="text-[track]-600 dark:text-[track]-500 font-mono text-[10px] tracking-widest uppercase">
  REF: ARCH-001-REV
</div>
```

### Bordered pill (detail page headers — track-coloured)

```html
<div class="inline-block px-3 py-1 text-[10px] font-mono font-bold tracking-[0.3em] text-[track]-600 dark:text-[track]-400 border border-[track]-500/30 rounded uppercase bg-[track]-500/5">
  REF: ARCH-001-REV
</div>
```

### Bordered pill (detail page headers — neutral, alongside another track pill)

```html
<div class="inline-block px-3 py-1 text-[10px] font-mono font-bold tracking-[0.3em] text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 rounded uppercase">
  REF: ART-001-HIPAA
</div>
```

Use the neutral variant when a separate track-indicator pill already appears on the same line (as on article and lab detail pages), to avoid colour redundancy.

---

## Examples

Good:
```
REF: LAB-001-VIZ
REF: ARCH-002-CLINIC
REF: ART-001-HIPAA
```

Bad (do not use):
```
Project_Ref: JS-VIZ-01       ← wrong prefix, tech-named, wrong seq format
Bench_Ref: RUST-SYS-01       ← wrong prefix, tech-named
Ref: ART-001-BLUE            ← wrong prefix, BLUE is a track colour not a slug
Ref: SYS-SPATIAL-01          ← wrong prefix, domain-named, wrong seq position
```
