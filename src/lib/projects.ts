// projects.ts
// The one place pages read projects from. Turns raw `projects` collection
// entries (edited by Dave in Pages CMS) into validated, display-ready
// objects, and skips anything incomplete instead of failing the build —
// a content mistake should never block a deploy. Skips are logged as
// build warnings ("[projects] Skipping …") so they show up in Netlify's
// deploy log.

import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

// Every uploadable image in the CMS media folder, keyed by path. Looking
// photos up here (rather than with the schema's image() helper) means a
// photo deleted from the media library while a project still uses it is
// skipped, instead of being a hard build error. Extensions mirror
// .pages.yml's media.extensions.
const mediaFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/media/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

export interface ProjectPhoto {
  src: ImageMetadata;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: NonNullable<CollectionEntry<'projects'>['data']['category']>;
  location?: string;
  description: string;
  completedDate?: Date;
  featured: boolean;
  photos: [ProjectPhoto, ...ProjectPhoto[]];
  // Kept for render() — the optional write-up is the Markdown body.
  entry: CollectionEntry<'projects'>;
}

// Pages CMS writes photo paths using media.output ("/media/…"), which
// lives on disk under media.input ("src/assets/media/…").
function resolvePhoto(path: string): ImageMetadata | undefined {
  const relative = path.replace(/^\/+/, '').replace(/^(src\/assets\/)?media\//, '');
  return mediaFiles[`/src/assets/media/${relative}`]?.default;
}

function warn(slug: string, message: string) {
  console.warn(`[projects] ${slug}: ${message}`);
}

function toProject(entry: CollectionEntry<'projects'>): Project | undefined {
  const { title, category, location, description, completedDate, photos, featured } = entry.data;

  const found = photos.flatMap((photo, i) => {
    const src = photo.image ? resolvePhoto(photo.image) : undefined;
    if (!src) {
      warn(entry.id, `photo ${i + 1} ("${photo.image}") not found in src/assets/media — left out.`);
      return [];
    }
    return [{ src, caption: photo.caption || undefined }];
  });

  const missing = [
    !title && 'a project name',
    !category && 'a type of work',
    !description && 'a short description',
    found.length === 0 && 'at least one photo',
  ].filter(Boolean);

  if (missing.length > 0 || !category) {
    warn(entry.id, `skipped — needs ${missing.join(', ')}.`);
    return undefined;
  }

  const withAlt = found.map((photo, i) => ({
    ...photo,
    alt: photo.caption ?? (found.length > 1 ? `${title} — photo ${i + 1} of ${found.length}` : title),
  }));

  return {
    slug: entry.id,
    title,
    category,
    location: location || undefined,
    description,
    completedDate,
    featured,
    photos: withAlt as Project['photos'],
    entry,
  };
}

async function loadProjects(): Promise<Project[]> {
  const entries = await getCollection('projects');
  return entries
    .map(toProject)
    .filter((p): p is Project => p !== undefined)
    .sort((a, b) => (b.completedDate?.getTime() ?? 0) - (a.completedDate?.getTime() ?? 0));
}

// Cached for production builds so each skip warning is logged once, not
// once per page that lists projects. Uncached in dev so edits show live.
let cached: Promise<Project[]> | undefined;

/** All publishable projects, newest first (undated ones last). */
export function getProjects(): Promise<Project[]> {
  if (!import.meta.env.PROD) return loadProjects();
  return (cached ??= loadProjects());
}

/**
 * Up to `limit` projects for "recent work" strips: the newest featured
 * ones, or — if Dave hasn't featured any — simply the newest, so the
 * section never disappears.
 */
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  return (featured.length > 0 ? featured : projects).slice(0, limit);
}

/** "June 2025" — month precision is plenty for a finished job. */
export function formatCompleted(date: Date): string {
  return date.toLocaleDateString('en-CA', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}
