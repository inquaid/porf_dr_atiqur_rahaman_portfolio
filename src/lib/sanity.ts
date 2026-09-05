import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'naf7d8as';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-03-01';

if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
  console.warn('Sanity configuration missing: VITE_SANITY_PROJECT_ID is not set.');
}

/**
 * Public Sanity client for fetching published content via the Global CDN.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `true` enables ultra-fast edge CDN responses
});

/**
 * Image URL builder for Sanity assets.
 */
const builder = imageUrlBuilder(sanityClient);

/**
 * Generates an optimized, modern WebP/AVIF image URL with responsive sizing.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max');
}

/**
 * Generates a low-quality placeholder URL (LQIP) for instant blur-up loading.
 */
export function urlForPlaceholder(source: SanityImageSource) {
  return builder.image(source).width(20).quality(20).blur(50).auto('format');
}
