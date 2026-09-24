// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO: no real domain registered yet — swap this for the production
  // domain before launch. The sitemap and every canonical/OG URL derive
  // from this value, so this placeholder will leak into their output
  // until it's updated.
  site: 'https://example.com', // update per project
  output: 'static', // no adapter needed for a brochure site on Netlify

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  // Fonts per STYLE-GUIDE.md's typography section. cssVariable names are
  // intentionally "-family" suffixed; see the comment at the top of
  // src/layouts/BaseLayout.astro for why.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Barlow Condensed',
      cssVariable: '--font-heading-family',
      // Unlike Archivo Black (a single static weight), Barlow Condensed is
      // a real weight family — request the weights headings actually use
      // (font-semibold in pages, daisyUI's card-title at 600) so the
      // browser doesn't fake-bold a fetched-400-only face.
      weights: [500, 600, 700],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body-family',
    },
  ],
});
