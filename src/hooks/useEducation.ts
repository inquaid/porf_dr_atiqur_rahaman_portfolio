import { useQuery } from '@tanstack/react-query';
import { getEducation } from '../services/contentService';
import type { Education } from '../db/schema';

/**
 * Hook to retrieve academic education history from Supabase.
 */
export function useEducation() {
  return useQuery<Education[]>({
    queryKey: ['education'],
    queryFn: async () => {
      return await getEducation();
    },
  });
}
