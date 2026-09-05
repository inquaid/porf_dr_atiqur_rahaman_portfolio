import { queryClient } from '../contexts/QueryProvider';
import { getPostBySlug, getProjects, getPosts } from '../services/contentService';
import { urlFor } from '../lib/sanity';
import type { SanityImage } from '../sanity/types';

/**
 * Builds responsive WebP/AVIF image attributes with width, quality, and format optimization.
 */
export function getOptimizedImageProps(
  imageSource: SanityImage | any,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    alt?: string;
  } = {}
) {
  const { width = 800, quality = 80, alt = 'Portfolio Asset' } = options;

  if (!imageSource) {
    return {
      src: '/demo.png',
      srcSet: '',
      alt,
      loading: 'lazy' as const,
      decoding: 'async' as const,
    };
  }

  try {
    const primaryUrl = urlFor(imageSource).width(width).quality(quality).auto('format').url();
    const retinaUrl = urlFor(imageSource).width(width * 2).quality(quality).auto('format').url();
    const mobileUrl = urlFor(imageSource).width(Math.round(width / 2)).quality(quality).auto('format').url();

    return {
      src: primaryUrl,
      srcSet: `${mobileUrl} 400w, ${primaryUrl} 800w, ${retinaUrl} 1600w`,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      alt,
      loading: 'lazy' as const,
      decoding: 'async' as const,
    };
  } catch {
    return {
      src: typeof imageSource === 'string' ? imageSource : '/demo.png',
      srcSet: '',
      alt,
      loading: 'lazy' as const,
      decoding: 'async' as const,
    };
  }
}

/**
 * Prefetches blog post data into TanStack Query cache on hover or link visibility.
 * Enables instant (<10ms) transitions when clicked.
 */
export function prefetchBlogPost(slug: string) {
  if (!slug) return;
  queryClient.prefetchQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => getPostBySlug(slug),
    staleTime: 1000 * 60,
  });
}

/**
 * Prefetches all blog posts.
 */
export function prefetchAllBlogPosts() {
  queryClient.prefetchQuery({
    queryKey: ['blogPosts'],
    queryFn: () => getPosts(),
    staleTime: 1000 * 60,
  });
}

/**
 * Prefetches all portfolio projects.
 */
export function prefetchProjects() {
  queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
    staleTime: 1000 * 60,
  });
}
