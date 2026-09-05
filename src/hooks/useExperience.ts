import { useQuery } from '@tanstack/react-query';
import { getExperience } from '../services/contentService';
import type { Experience } from '../db/schema';

/**
 * Hook to retrieve experience milestones from Supabase.
 */
export function useExperience() {
  return useQuery<Experience[]>({
    queryKey: ['experience'],
    queryFn: async () => {
      return await getExperience();
    },
  });
}
