// content.config.ts
// Content Layer API collections. `services` is code-managed (not
// CMS-editable — see STYLE-GUIDE.md section 8). `projects` backs the
// Projects/Gallery page and is edited via Pages CMS after launch; keep
// this schema in sync with .pages.yml by hand.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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

// Deliberately lenient: every field falls back (.catch) instead of throwing,
// so a malformed CMS edit can never fail the build and block a deploy.
// The real checks — required fields, photos that actually exist — happen
// in src/lib/projects.ts, which skips an incomplete project with a build
// log warning rather than publishing it half-broken. .pages.yml enforces
// the same rules up front in the editor.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().trim().catch(''),
    category: z.enum(projectCategories).optional().catch(undefined),
    location: z.string().trim().optional().catch(undefined),
    description: z.string().trim().catch(''),
    completedDate: z.coerce.date().optional().catch(undefined),
    // Paths as Pages CMS writes them (e.g. "/media/deck.jpg"), resolved to
    // optimizable images in src/lib/projects.ts.
    photos: z
      .array(
        z.object({
          image: z.string().trim().catch(''),
          caption: z.string().trim().optional().catch(undefined),
        }),
      )
      .catch([]),
    featured: z.boolean().catch(false),
  }),
});

export const collections = { services, projects };
export { projectCategories };
