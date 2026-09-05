import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

const tableToQueryKeyMap: Record<string, string[]> = {
  site_settings: ['siteSettings'],
  profiles: ['profile'],
  social_links: ['socialLinks'],
  education: ['education'],
  experience: ['experience'],
  skill_categories: ['skillCategories'],
  projects: ['projects'],
  posts: ['blogPosts'],
  research: ['research'],
  achievements: ['achievements'],
  activities: ['activities'],
};

/**
 * Hook to listen to real-time changes in Supabase PostgreSQL content tables.
 * When a row is inserted, updated, or deleted, it automatically invalidates
 * the corresponding TanStack Query cache key for instant UI updates.
 */
export function useSupabaseRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    try {
      const channel = supabase
        .channel('realtime-portfolio-content')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public' },
          (payload) => {
            const queryKey = tableToQueryKeyMap[payload.table];
            if (queryKey) {
              queryClient.invalidateQueries({ queryKey });
            } else {
              queryClient.invalidateQueries();
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn('Realtime subscription could not be established:', err);
    }
  }, [queryClient]);
}
