import { useQuery } from '@tanstack/react-query';
import { getPosts, getPostBySlug } from '../services/contentService';
import type { Post } from '../db/schema';

export type NormalizedPost = Omit<Post, 'publishedAt' | 'body' | 'tags'> & {
  _id: string;
  publishedAt: string;
  mainImage?: any;
  body?: any[];
  tags?: string[];
  slug: string;
};

/**
 * Hook to retrieve all published blog posts directly from Supabase.
 */
export function useBlogPosts() {
  return useQuery<NormalizedPost[]>({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      const posts = await getPosts();
      return posts.map((p: any) => ({
        ...p,
        _id: p.sanity_id || p.id,
        slug: p.slug,
        publishedAt: p.published_at || p.publishedAt ? new Date(p.published_at || p.publishedAt).toISOString() : new Date().toISOString(),
        mainImage: p.image_url || null,
        body: p.body || undefined,
        tags: p.tags || [],
      }));
    },
  });
}

/**
 * Hook to retrieve a single blog post by slug directly from Supabase.
 */
export function useBlogPost(slug: string | undefined) {
  return useQuery<NormalizedPost | null>({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      if (!slug) return null;
      const p = (await getPostBySlug(slug)) as any;
      if (!p) return null;
      return {
        ...p,
        _id: p.sanity_id || p.id,
        slug: p.slug,
        publishedAt: p.published_at || p.publishedAt ? new Date(p.published_at || p.publishedAt).toISOString() : new Date().toISOString(),
        mainImage: p.image_url || null,
        body: p.body || undefined,
        tags: p.tags || [],
      };
    },
    enabled: Boolean(slug),
  });
}
