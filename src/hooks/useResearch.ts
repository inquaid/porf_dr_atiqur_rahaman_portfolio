import { useQuery } from '@tanstack/react-query';
import { getResearch } from '../services/contentService';
import type { ResearchItem } from '../db/schema';

export type NormalizedResearch = Omit<ResearchItem, 'authors'> & {
  _id: string;
  pdfUrl?: string | null;
  authors: string[];
};

/**
 * Hook to retrieve research publications directly from Supabase.
 */
export function useResearch() {
  return useQuery<NormalizedResearch[]>({
    queryKey: ['research'],
    queryFn: async () => {
      const items = await getResearch();
      return items.map((r: any) => ({
        ...r,
        _id: r.sanity_id || r.id,
        pdfUrl: r.pdf_url || r.pdfUrl || null,
        authors: r.authors || [],
      }));
    },
  });
}
