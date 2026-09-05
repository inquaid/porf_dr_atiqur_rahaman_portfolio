import { useQuery } from '@tanstack/react-query';
import { getActivities } from '../services/contentService';
import type { Activity } from '../db/schema';

/**
 * Hook to retrieve extracurricular activities from Supabase.
 */
export function useActivities() {
  return useQuery<Activity[]>({
    queryKey: ['activities'],
    queryFn: async () => {
      return await getActivities();
    },
  });
}
