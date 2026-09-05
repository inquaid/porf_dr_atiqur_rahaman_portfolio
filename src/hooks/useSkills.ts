import { useQuery } from '@tanstack/react-query';
import { getSkillCategories } from '../services/contentService';
import type { SkillCategory } from '../db/schema';

/**
 * Hook to retrieve skill categories and skills list from Supabase.
 */
export function useSkills() {
  return useQuery<SkillCategory[]>({
    queryKey: ['skillCategories'],
    queryFn: async () => {
      return await getSkillCategories();
    },
  });
}
