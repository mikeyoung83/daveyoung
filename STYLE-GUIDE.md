# Dave Young Renovations — Style Guide

> The single source of truth for the site's design and content decisions;
> `CLAUDE.md` just points here. Backfilled on 2026-09-24 from what was
> already built (the original filled-in copy was never committed). Items
> marked **(confirm)** were inferred from the code rather than recorded
> decisions — check them and delete the marker.

---

## 1. Brand & voice

**Who is this for?**
- Business: Dave Young Renovations (renamed from Dave Young Contracting, Sept 2026) — residential renovations, additions, and decks, based in Wiarton since 2016. Licensed & insured.
- Service area: Wiarton (base), Owen Sound, Sauble Beach, Southampton, Lion's Head, Tobermory — "Owen Sound to Tobermory" / "Grey-Bruce". The town list lives in `site-config.ts` (`serviceTowns`).
- Confirmed selling points (use only these — don't invent others): free quotes; Dave is on site for every job; he loves working with cottage owners and keeps away-from-home owners updated; licensed & insured since 2016.
- **Never mention permits** anywhere on the site.
- Audience: homeowners (and cottage owners) on the Bruce Peninsula planning a renovation, addition, or outdoor build, looking for someone local and reliable. **(confirm)**
- Primary goal of the site: get a quote — every page funnels to the contact form.

**Personality**
Straightforward, dependable, local, unpretentious, proud of the work.

**Voice dos and don'ts**
- Do: first person as Dave ("I", "me" — never "we"/"our" for the business); short, plain sentences; concrete claims (since 2016, licensed & insured, free quotes, real town names); address the reader as "you". CTAs say "Get a Free Quote".
- Don't: jargon, hype, exclamation points, "we're passionate about…" filler, invented testimonials or stats.

**One line of example copy in this voice**
"Built right, the first time."

---

## 2. Color palette

Warm clay/earth palette — theme `dyc-clay`.

| Role | Direction (plain language) | oklch value |
|---|---|---|
| `primary` | Clay/rust brown — CTAs, links, eyebrows, key accents | `oklch(48% 0.09 45)` |
| `secondary` | Deep forest green — supporting color, used sparingly | `oklch(38% 0.06 150)` |
| `accent` | Warm amber — icons, stars, eyebrows on dark backgrounds | `oklch(72% 0.15 70)` |
| `neutral` | Dark espresso brown — dark CTA band, hero overlay | `oklch(24% 0.02 45)` |
| `base-100/200/300` | Warm cream, stepping slightly darker for alternating sections/borders | `oklch(97% 0.012 80)` / `oklch(94% 0.012 80)` / `oklch(90% 0.012 80)` |
| `base-content` | Near-black warm brown text | `oklch(22% 0.02 45)` |
| `granite` / `granite-deep` / `granite-content` | Cool slate blue-grey for the footer only (custom `@theme` tokens, not daisyUI roles) | `oklch(34% 0.018 250)` / `oklch(23% 0.014 250)` / `oklch(93% 0.006 250)` |
| `info / success / warning / error` | Near-defaults, warmed slightly | see theme block |

```css
@plugin "daisyui/theme" {
  name: "dyc-clay";
  default: true;
  color-scheme: light;

  --color-base-100: oklch(97% 0.012 80);
  --color-base-200: oklch(94% 0.012 80);
  --color-base-300: oklch(90% 0.012 80);
  --color-base-content: oklch(22% 0.02 45);

  --color-primary: oklch(48% 0.09 45);
  --color-primary-content: oklch(98% 0.01 80);
  --color-secondary: oklch(38% 0.06 150);
  --color-secondary-content: oklch(97% 0.01 80);
  --color-accent: oklch(72% 0.15 70);
  --color-accent-content: oklch(20% 0.02 45);
  --color-neutral: oklch(24% 0.02 45);
  --color-neutral-content: oklch(95% 0.01 80);

  --color-info: oklch(58% 0.1 230);
  --color-success: oklch(56% 0.12 145);
  --color-warning: oklch(75% 0.15 85);
  --color-error: oklch(55% 0.18 25);

  --radius-box: 0.5rem;
  --radius-field: 0.375rem;
  --radius-selector: 0.375rem;
}
```

Light theme only — daisyUI's built-in dark theme is deliberately disabled.

---

## 3. Typography

- Heading font: Barlow Condensed — via Google Fonts, weights 500, 600, 700
- Body font: Inter — default weights
- Pairing feel: tall, condensed, slightly industrial display headings against a clean neutral sans body.

```js
fonts: [
  {
    provider: fontProviders.google(),
    name: 'Barlow Condensed',
    cssVariable: '--font-heading-family',
    weights: [500, 600, 700],
  },
  {
    provider: fontProviders.google(),
    name: 'Inter',
    cssVariable: '--font-body-family',
  },
],
```

**Type scale notes**
- Headings: bold/semibold, tight leading; oversized H1 on the home hero (up to `text-8xl`).
- Eyebrows: small, uppercase, wide tracking, primary color — the only all-caps treatment (`Eyebrow.astro`).
- Body: `text-lg` for intro copy, muted with `text-base-content/70`; `max-w-prose` line length.
- Special treatment: large bare stat numbers on About (`text-5xl` heading font, primary color).

---

## 4. Shape & feel

- Corner rounding: subtle — `0.5rem` boxes, `0.375rem` fields/selectors.
- Density: spacious — sections use `py-16 sm:py-24`, content width `max-w-6xl`.
- Borders: thin hairlines (`card-border`, `border-base-300`) between sections and on cards.
- Shadows: soft, warm elevation — layered low-opacity shadows tinted with the brown text color, never grey. Cards rest with a faint shadow and lift slightly on hover; feature photos get a slightly deeper one. Tokens: `shadow-soft`, `shadow-lift`, `shadow-lift-lg` in `global.css`.
- Texture & gradients (subtle): a faint topographic-contour texture (nod to the Peninsula/Escarpment) on the home dark CTA band and some light sections, via the `topo` utility — inline SVG mask, one small cached file, colored by `currentColor`. The footer instead gets a slate-grey gradient with a speckled granite texture (`granite` utility, SVG noise). Gentle gradients only: the hero overlay darkens toward the text side, sections get a soft warm glow. The treatment should make the site feel richer without being pointable-at.
- Overall reference: a trusted local tradesperson — solid, warm, well-made; no flash.

---

## 5. Imagery direction

- Style: real residential project photography — decks, kitchens, bathrooms, framing.
- Source: Unsplash stock stand-ins for now (`src/assets/`); Dave's own project photos to replace them before/after launch. Project gallery images are picsum placeholders until uploaded via Pages CMS.
- Do: natural light, finished work, real materials, Bruce Peninsula / cottage-country settings.
- Don't: generic corporate stock, people posing with tools, busy images behind text. **(confirm)**
- Aspect ratios: full-bleed background on the home hero; 4:3 for cards, galleries, and feature photos.

---

## 6. Site map

| Page | Purpose | Key sections |
|---|---|---|
| Home | Get a quote | Full-bleed photo hero with 2 CTAs, "why us" value cards, featured projects, dark CTA band |
| About | Build trust | Intro + photo, stat strip, recent work strip, "what you can expect" service rows, footer CTA |
| Services | Explain offerings | Photo-led service cards, "our approach", testimonial block (placeholder), footer CTA |
| Projects | Show proof | Filterable project grid (by category), per-project detail pages with gallery |
| Contact | Capture a lead | Netlify contact form |

---

## 7. Inspiration folder (optional)

**Using it?** Yes — `inspiration/` is local-only (gitignored). Pages so far were built from `about`, `services-1`, `services-2`, and `footer-cta` references.

**Naming convention:** `inspiration/<page-name>-1.jpg`, `inspiration/<page-name>-2.jpg`, etc. — matching the page names in the site map above.

---

## 8. CMS (optional)

**Needed?** Yes

| Section | What's editable | Content type |
|---|---|---|
| Projects | name\*, type of work\*, town, date finished\*, short description\*, photos\* (1–12, each with optional caption; first is the cover), show-on-homepage toggle, optional write-up | collection (`src/content/projects`, see `.pages.yml`) |

\* required in the editor.

Services are code-managed, not CMS-editable.

**Editor is non-technical (Dave).** Keep it that way:
- Every field has plain-language help text (`description`) with an example and where it appears on the site.
- The raw config editor is hidden (`settings.hide`), renaming is off (a project's web address is set from its name at creation), and uploads are limited to JPG/PNG/WebP.
- Content mistakes must never block a deploy: the Astro schema is lenient (`.catch` fallbacks), and `src/lib/projects.ts` skips an incomplete project, or leaves out a photo whose file is missing, with a `[projects] …` warning in the Netlify build log instead of failing the build. All pages read projects only through that helper.
- Homepage/About "recent work" shows the 3 newest featured projects, falling back to the 3 newest if none are featured.
- The three `example-*` projects (and `src/assets/media/example-*.jpg`) are demo content to delete once real projects exist.

---

## 9. Components & patterns

- **Navbar**: static, solid `base-100` with a hairline bottom border. Active link is primary-colored text only — no pill background or shadow. Desktop: brand left, centered links, "Get a Quote" right. Mobile: brand left, hamburger right, opening a full-screen `<dialog>` menu with large heading-font links that slides down and fades in.
- **Hero**: home uses a full-bleed photo (`<Picture>`, eager/high priority) under a dark neutral gradient overlay; left-aligned, eyebrow + oversized H1 + subhead + two CTAs. Interior pages open with a plain eyebrow + H1 section.
- **Cards**: `card-border` on `base-100` with a soft warm shadow; linked cards lift on hover. Service cards inset the photo inside the card border.
- **CTA buttons**: solid `btn-primary` for "Get a Quote" everywhere; `btn-outline` on dark backgrounds for secondary actions; `btn-neutral` uppercase for section-level links.
- **Footer**: slate-grey gradient (`granite` → `granite-deep`) with a subtle granite texture — brand + tagline, page links, contact info and socials when supplied, copyright strip. Interior pages get `FooterCta` (text + form) above it.
- **Forms**: Netlify Forms (`ContactForm.astro`), reused on Contact and in `FooterCta`.
- **Scroll reveal**: photo-led cards and standalone photos carry `data-reveal` and fade/slide up as they scroll into view (`src/scripts/reveal.ts`, ~0.7KB inline, no library). Anything on screen at load is never hidden, so it can't delay LCP. Never put `data-reveal` on the home hero.

---

## 10. Accessibility & performance notes

No exceptions to the global baseline. Performance matters (PageSpeed mobile is tracked): decoration is CSS/SVG only, the hero image must stay eager and unhidden (it's the LCP element), and nothing above the fold should start hidden for an animation.
