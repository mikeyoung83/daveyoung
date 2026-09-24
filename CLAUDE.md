# Dave Young Contracting — project memory

> This supplements `~/.claude/CLAUDE.md` (universal brochure-site rules,
> lives outside this repo) with facts specific to *this* site. Keep it
> short — point to `STYLE-GUIDE.md` for anything design/content related
> rather than duplicating it here.

@STYLE-GUIDE.md

## What this site is
Brochure site for Dave Young Contracting, a residential remodel/addition/
deck contractor in Wiarton serving the Bruce Peninsula, ON. Aimed at local
homeowners; the goal is quote requests.

## DaisyUI theme name in use
`dyc-clay` — defined in `src/styles/global.css`. Full rationale for the
palette lives in `STYLE-GUIDE.md`.

## Pages
- Home
- About
- Services
- Projects (index + `/projects/[slug]` detail pages)
- Contact

## Content source
Scaffolding copy written from the facts in `STYLE-GUIDE.md` (10 years,
licensed & insured, Bruce Peninsula). Bracketed `[...]` text and `TODO`
comments mark content still needed from Dave: his story (About), a real
testimonial (Services), contact details (`site-config.ts`), and real
project photos/entries. Photos are Unsplash stand-ins; project galleries
are demo `example-*` entries using the stock photos.

## Special integrations / exceptions
- Contact form uses Netlify Forms (`ContactForm.astro`).
- Projects collection is editable via Pages CMS by Dave (non-technical) —
  see `.pages.yml`; keep it in sync with `src/content.config.ts` by hand.
  Always read projects through `src/lib/projects.ts` (validates and skips
  bad entries so CMS mistakes can't fail the build) — never `getCollection
  ('projects')` directly in a page. Uploads land in `src/assets/media`.
- `.npmrc` pins `legacy-peer-deps` for the Netlify build.
- `site` in `astro.config.mjs` is still `https://example.com` — no domain yet.

## Status
In progress — pages built with placeholder content; tuning performance and
visual polish before client review.
