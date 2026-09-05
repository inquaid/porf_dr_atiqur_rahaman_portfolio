import { useQuery } from '@tanstack/react-query';
import { getAchievements } from '../services/contentService';
import type { Achievement } from '../db/schema';

/**
 * Hook to retrieve coding platforms and contest achievements from Supabase.
 */
export function useAchievements() {
  return useQuery<Achievement[]>({
    queryKey: ['achievements'],
    queryFn: async () => {
      return await getAchievements();
    },
  });
}
