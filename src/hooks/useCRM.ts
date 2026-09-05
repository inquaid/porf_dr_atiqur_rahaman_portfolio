import { useMutation } from '@tanstack/react-query';
import { submitContactInquiry, subscribeNewsletter } from '../services/crmService';
import type { NewLead } from '../db/schema';

/**
 * Mutation hook for submitting contact form leads directly to Supabase CRM
 */
export function useSubmitContact() {
  return useMutation({
    mutationFn: async (lead: Omit<NewLead, 'id' | 'status' | 'createdAt'>) => {
      const res = await submitContactInquiry(lead);
      if (!res.success) {
        throw new Error(res.error || 'Failed to submit contact inquiry');
      }
      return res.data;
    },
  });
}

/**
 * Mutation hook for subscribing to the newsletter
 */
export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: async ({ email, source }: { email: string; source?: string }) => {
      const res = await subscribeNewsletter(email, source);
      if (!res.success) {
        throw new Error(res.error || 'Failed to subscribe');
      }
      return res.data;
    },
  });
}
