---
name: ui-ux-pro-max
description: "UI/UX design intelligence. Searchable local database with UI styles, color palettes, font pairings, chart types, and UX guidelines across many tech stacks (this project: vanilla HTML/CSS/JS). Use when designing, building, or reviewing UI: pages, components, color schemes, typography, layout, accessibility, animation, or responsive/mobile behavior."
license: MIT
metadata:
  author: nextlevelbuilder (vendored for Finca Santa Fe project)
  source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
  version: "vendored"
---

# UI/UX Pro Max — Design Intelligence (Finca Santa Fe)

Local, offline design-intelligence database vendored into this project. Pure Python 3
standard library — no third-party packages, no network access, nothing gets installed
or run automatically.

Project stack for this repo: **vanilla HTML5 + CSS3 + JavaScript** (see `css/styles.css`,
`css/responsive.css`, `js/main.js`, `js/whatsapp.js`). When using the `--stack` flag below,
use `html-tailwind` as the closest match for CSS conventions, or omit `--stack` for
stack-agnostic guidance.

## Prerequisites

```bash
python3 --version || python --version
```

If Python 3 isn't available, don't install it yourself — ask the user to install it first,
or skip straight to reading the CSV data files directly.

## How to Use

### Step 1 — Generate a design system recommendation

Start here for any new section, page, or visual redesign:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "artisan farm dairy products rustic warm" --design-system -p "Finca Santa Fe"
```

This searches product type, style, color, typography, and landing-page domains in
parallel and returns a coherent design system with reasoning (and anti-patterns to avoid).

### Step 2 — Targeted searches by domain

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain color
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain typography
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain ux
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain chart
```

Useful checks for this project specifically:
- `"accessibility focus contrast"` — verify the dark `.section--dark` contact section and
  amber CTA buttons meet contrast guidelines.
- `"mobile navigation hamburger"` — cross-check against `css/responsive.css`.
- `"form validation error states"` — cross-check against the pedido form in `js/whatsapp.js`.
- `"card hover animation"` — cross-check against `.producto__card` / `.proceso__card`.

### Step 3 — Stack-specific guidance

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "responsive grid form" --stack html-tailwind
```

## Data available

| File | Contents |
|------|----------|
| `data/styles.csv` | UI style archetypes (minimal, rustic, editorial, etc.) |
| `data/colors.csv` | Curated color palettes by product/industry |
| `data/typography.csv` | Font pairings |
| `data/ux-guidelines.csv` | UX best practices / anti-patterns |
| `data/charts.csv` | Data-viz recommendations |
| `data/products.csv` | Product-type-specific design patterns |
| `data/landing.csv` | Landing page structure patterns |
| `data/stacks/` | Per-framework implementation notes |
| `data/ui-reasoning.csv` | Rules used to justify recommendations |

## Notes

- Vendored (copied) from the upstream project for offline use in this repo — not synced
  automatically. To update, re-copy from the upstream `src/ui-ux-pro-max` source.
- Read-only reference data: running `search.py` never modifies files in this project.
