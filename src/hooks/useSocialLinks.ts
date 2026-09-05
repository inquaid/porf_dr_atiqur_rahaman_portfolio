import { useQuery } from '@tanstack/react-query';
import { getSocialLinks } from '../services/contentService';
import type { SocialLink } from '../db/schema';

/**
 * Hook to retrieve social and coding profile links from Supabase.
 */
export function useSocialLinks(section?: 'home' | 'contact') {
  return useQuery<SocialLink[]>({
    queryKey: ['socialLinks', section],
    queryFn: async () => {
      return await getSocialLinks(section);
    },
  });
}
