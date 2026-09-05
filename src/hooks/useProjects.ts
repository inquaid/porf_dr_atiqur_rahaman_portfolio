import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../services/contentService';
import type { Project } from '../db/schema';

export type NormalizedProject = Omit<Project, 'techStack'> & {
  _id: string;
  mainImage?: any;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
};

/**
 * Hook to retrieve portfolio projects directly from Supabase.
 */
export function useProjects() {
  return useQuery<NormalizedProject[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const projects = await getProjects();
      return projects.map((p: any) => ({
        ...p,
        _id: p.sanity_id || p.id,
        mainImage: p.image_url || null,
        techStack: p.tech_stack || p.techStack || [],
        githubUrl: p.github_url || p.githubUrl || null,
        liveUrl: p.live_url || p.liveUrl || null,
      }));
    },
  });
}
