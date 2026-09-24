// content.config.ts
// Content Layer API collections. `services` is code-managed (not
// CMS-editable — see STYLE-GUIDE.md section 7). `projects` backs the
// Projects/Gallery page and is edited via Pages CMS after launch; keep
// this schema in sync with .pages.yml by hand.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
  }),
});

const projectCategories = [
  'Remodels & Renovations',
  'Additions & Structural',
  'Decks, Outdoor & Exteriors',
] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(projectCategories),
    description: z.string(),
    // Plain URLs for now (placeholder/stock images). Once Dave supplies
    // real photos via Pages CMS uploads (local files under
    // src/assets/media), switch this to the image() schema helper so
    // astro:assets can optimize them.
    gallery: z.array(z.string()),
    completedDate: z.date().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { services, projects };
export { projectCategories };
