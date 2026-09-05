import { useQuery } from '@tanstack/react-query';
import { getSiteSettings } from '../services/contentService';
import type { SiteSettings } from '../db/schema';

/**
 * Hook to retrieve site settings and SEO configuration from Supabase.
 */
export function useSiteSettings() {
  return useQuery<SiteSettings | null>({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      return await getSiteSettings();
    },
  });
}
