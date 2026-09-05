import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services/contentService';
import type { Profile } from '../db/schema';

/**
 * Hook to retrieve user profile and biographical information from Supabase.
 */
export function useProfile() {
  return useQuery<Profile | null>({
    queryKey: ['profile'],
    queryFn: async () => {
      return await getProfile();
    },
  });
}
