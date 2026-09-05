import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMetrics, incrementViews, incrementLikes } from '../services/crmService';
import type { Metric } from '../db/schema';

/**
 * Hook to retrieve and interact with item metrics (views & likes)
 */
export function useMetrics(slug: string | undefined, itemType = 'post') {
  const queryClient = useQueryClient();

  const metricsQuery = useQuery<Metric | null>({
    queryKey: ['metrics', slug],
    queryFn: async () => {
      if (!slug) return null;
      const res = await getMetrics(slug);
      return res.data || null;
    },
    enabled: Boolean(slug),
  });

  const recordViewMutation = useMutation({
    mutationFn: async () => {
      if (!slug) return;
      await incrementViews(slug, itemType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metrics', slug] });
    },
  });

  const recordLikeMutation = useMutation({
    mutationFn: async () => {
      if (!slug) return;
      await incrementLikes(slug, itemType);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['metrics', slug] });
      const previousMetrics = queryClient.getQueryData<Metric | null>(['metrics', slug]);

      if (previousMetrics) {
        queryClient.setQueryData<Metric | null>(['metrics', slug], (old) =>
          old ? { ...old, likesCount: old.likesCount + 1 } : null
        );
      }

      return { previousMetrics };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousMetrics) {
        queryClient.setQueryData<Metric | null>(['metrics', slug], context.previousMetrics);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['metrics', slug] });
    },
  });

  return {
    metrics: metricsQuery.data,
    isLoading: metricsQuery.isLoading,
    recordView: recordViewMutation.mutate,
    recordLike: recordLikeMutation.mutate,
  };
}
