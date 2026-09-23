// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://example.com', // update per project
  output: 'static', // no adapter needed for a brochure site on Netlify

  vite: {
    plugins: [tailwindcss()],
  },

  // Placeholder fonts (Inter/Inter) — swap per STYLE-GUIDE.md's typography
  // section. cssVariable names are intentionally "-family" suffixed; see
  // the comment at the top of src/layouts/BaseLayout.astro for why.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-heading-family',
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body-family',
    },
  ],
});
