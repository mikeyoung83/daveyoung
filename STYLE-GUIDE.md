# [Site Name] — Style Guide

> Fill this out — ideally as a conversation with Claude, not alone. This is
> the single source of truth for the site's design and content decisions;
> `CLAUDE.md` just points here. Fill placeholders in `[brackets]`. Delete
> guidance text (in *italics*) as you go if you want a cleaner file, or
> leave it — it doesn't hurt anything.

---

## 1. Brand & voice

**Who is this for?** *(the business, and their audience)*
- Business: [name, what they do, in one sentence]
- Audience: [who's visiting this site, and what they need from it]
- Primary goal of the site: [book a call / get a quote / show credibility / explain a service / drive to a store, etc.]

**Personality** *(pick 3–5 adjectives that describe the brand, not the industry)*
[e.g. warm, no-nonsense, precise, playful, established]

**Voice dos and don'ts**
- Do: [e.g. short sentences, address the reader as "you," concrete claims]
- Don't: [e.g. jargon, exclamation points, generic stock phrases like "we're passionate about..."]

**One line of example copy in this voice**
[Write one real headline or sentence, in the target voice, as a calibration point.]

---

## 2. Color palette

*Think in terms of DaisyUI's semantic roles, not raw colors — this maps
directly onto the theme block below.*

| Role | Direction (plain language) | oklch value |
|---|---|---|
| `primary` | [main brand color — where it's used: CTAs, links, key accents] | `oklch(__% __ __)` |
| `secondary` | [supporting color] | `oklch(__% __ __)` |
| `accent` | [pop color for highlights, small accents] | `oklch(__% __ __)` |
| `neutral` | [dark, used for footers/high-contrast blocks] | `oklch(__% __ __)` |
| `base-100/200/300` | [background, light→slightly darker, for cards/sections] | `oklch(__% __ __)` each |
| `base-content` | [default text color] | `oklch(__% __ __)` |
| `info / success / warning / error` | [usually leave DaisyUI defaults unless brand-critical] | default or `oklch(__% __ __)` |

**Ready-to-paste theme block** *(fill in the values above, then hand this whole block to Claude to drop into `src/styles/global.css`, replacing the placeholder theme already there)*

```css
@plugin "daisyui/theme" {
  name: "[theme-name]";
  default: true;
  color-scheme: light;

  --color-base-100: oklch(__% __ __);
  --color-base-200: oklch(__% __ __);
  --color-base-300: oklch(__% __ __);
  --color-base-content: oklch(__% __ __);

  --color-primary: oklch(__% __ __);
  --color-primary-content: oklch(__% __ __);
  --color-secondary: oklch(__% __ __);
  --color-secondary-content: oklch(__% __ __);
  --color-accent: oklch(__% __ __);
  --color-accent-content: oklch(__% __ __);
  --color-neutral: oklch(__% __ __);
  --color-neutral-content: oklch(__% __ __);

  --color-info: oklch(__% __ __);
  --color-success: oklch(__% __ __);
  --color-warning: oklch(__% __ __);
  --color-error: oklch(__% __ __);

  --radius-box: [e.g. 1rem — see shape section below];
  --radius-field: [e.g. 0.5rem];
  --radius-selector: [e.g. 0.5rem];
}
```

*Tip: don't hand-pick oklch values blind — describe the palette in words to Claude ("deep forest green primary, warm cream background, terracotta accent") and let it propose values, or use daisyUI's theme generator (daisyui.com/theme-generator) and paste the export here.*

---

## 3. Typography

- Heading font: [name] — via Google Fonts, weight(s) used: [e.g. 600, 700]
- Body font: [name] — weight(s) used: [e.g. 400, 500]
- Pairing feel: [e.g. "serif display heading against a clean sans body," or "single geometric sans throughout"]

**Astro Fonts API config** *(fill in, hand to Claude for `astro.config.mjs` — replaces the placeholder Inter/Inter entries already there)*
```js
fonts: [
  {
    provider: fontProviders.google(),
    name: "[Heading Font Name]",
    cssVariable: "--font-heading-family",
  },
  {
    provider: fontProviders.google(),
    name: "[Body Font Name]",
    cssVariable: "--font-body-family",
  },
],
```

**Type scale notes**
- Headings: [e.g. tight tracking, bold, all-caps for eyebrows only]
- Body: [e.g. generous line-height ~1.6, max line length ~65ch]
- Any special treatment: [e.g. large display number stats, oversized H1 on hero]

---

## 4. Shape & feel

- Corner rounding: [sharp / subtle / very rounded] → sets `--radius-box`, `--radius-field`, `--radius-selector` above
- Density: [spacious/airy vs compact]
- Borders: [thin hairlines vs none vs bold outlines] → `--border` if customized
- Shadows: [flat/no shadow vs soft elevation vs bold offset shadow]
- Overall reference: [e.g. "feels like a boutique studio site," "feels like a regional law firm — trustworthy, low flash"]

---

## 5. Imagery direction

- Style: [candid photography / polished product shots / illustration / abstract gradients / no imagery, type-led]
- Source: [client-provided photos / stock — which library / to be generated / placeholder for now]
- Do: [e.g. natural light, real people, close crops]
- Don't: [e.g. generic corporate handshake stock, busy backgrounds behind text]
- Aspect ratios to standardize: [e.g. 16:9 for hero, 4:5 for team photos, 1:1 for logos]

---

## 6. Site map

| Page | Purpose | Key sections |
|---|---|---|
| Home | [primary conversion goal] | [hero, value props, social proof, CTA...] |
| About | [build trust/credibility] | [story, team, values...] |
| Services | [explain offerings] | [service list, pricing if any, process...] |
| Contact | [capture a lead] | [form, map/address, hours...] |
| [+ any others] | | |

---

## 7. CMS (optional)

*Claude: always ask this explicitly while filling out the site map above — don't skip it and don't assume. "Will any part of this site need to be edited after launch without touching code — a Projects/Gallery page, blog, team roster, testimonials, pricing list? If so, which sections?" Most brochure sites don't need this. If the answer is no, leave this section as "Not needed" and do nothing further — no `.pages.yml`, no CMS setup, no mention of it elsewhere. If yes, use the `pagescms` skill (`~/.claude/skills/pagescms/`) to draft `.pages.yml` and the matching `src/content.config.ts` entry for each section named below.*

**Needed?** [Yes / No]

**If yes, which sections and what's editable in each:**

| Section | What's editable | Content type |
|---|---|---|
| [e.g. Projects] | [e.g. title, description, photo gallery, completion date] | [collection / file] |

---

## 8. Components & patterns

- **Navbar**: [sticky vs static, transparent-over-hero vs solid, mobile menu style]
- **Hero**: [text-only vs split with an image — see `src/components/Hero.astro`'s `visual` slot; headline + subhead + CTA count; alignment left vs center]
- **Cards**: [used for: services/team/testimonials — border vs shadow vs flat]
- **CTA buttons**: [primary style — solid `btn-primary`; when to use `btn-outline`/`btn-ghost`]
- **Footer**: [what it contains beyond the defaults already in `Footer.astro` — nav links, contact info, social, legal]
- **Forms**: [Netlify Forms vs other; field styling; validation/error states]

---

## 9. Accessibility & performance notes
*(anything beyond the global baseline in `~/.claude/CLAUDE.md` — most sites can leave this section as "no exceptions")*
[e.g. specific contrast requirement, client accessibility mandate, target Lighthouse score]
