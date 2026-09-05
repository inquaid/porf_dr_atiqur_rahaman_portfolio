import { supabase } from '../lib/supabase';
import type { NewLead, Metric } from '../db/schema';

export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Submits a new contact form inquiry directly to the Supabase CRM leads table.
 * Secured via PostgreSQL Row-Level-Security (RLS): Public can insert, admin can view/manage.
 */
export async function submitContactInquiry(
  lead: Omit<NewLead, 'id' | 'status' | 'createdAt'>
): Promise<ServiceResponse<{ submitted: boolean }>> {
  try {
    if (!lead.name?.trim() || !lead.email?.trim() || !lead.message?.trim()) {
      return {
        success: false,
        error: 'Name, email, and message are required fields.',
      };
    }

    const { error } = await supabase.from('leads').insert([
      {
        name: lead.name.trim(),
        email: lead.email.trim(),
        subject: lead.subject?.trim() || 'General Inquiry',
        message: lead.message.trim(),
        status: 'new',
      },
    ]);

    if (error) {
      console.error('Failed to submit contact inquiry:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: { submitted: true },
    };
  } catch (err: any) {
    console.error('Unexpected error submitting contact inquiry:', err);
    return {
      success: false,
      error: err.message || 'An unexpected error occurred.',
    };
  }
}

/**
 * Subscribes an email to the newsletter/updates list.
 */
export async function subscribeNewsletter(
  email: string,
  source = 'website'
): Promise<ServiceResponse<{ subscribed: boolean }>> {
  try {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return {
        success: false,
        error: 'Please enter a valid email address.',
      };
    }

    const { error } = await supabase.from('subscribers').insert([
      {
        email: trimmedEmail,
        status: 'subscribed',
        source,
      },
    ]);

    if (error) {
      // If already subscribed (unique constraint), treat as success
      if (error.code === '23505') {
        return {
          success: true,
          data: { subscribed: true },
        };
      }
      console.error('Failed to subscribe newsletter:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: { subscribed: true },
    };
  } catch (err: any) {
    console.error('Unexpected error subscribing newsletter:', err);
    return {
      success: false,
      error: err.message || 'An unexpected error occurred.',
    };
  }
}

/**
 * Retrieves dynamic metrics (views, likes) for a specific item (post, project, research).
 */
export async function getMetrics(itemSlug: string): Promise<ServiceResponse<Metric | null>> {
  try {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .eq('item_slug', itemSlug)
      .maybeSingle();

    if (error) {
      console.error('Failed to fetch item metrics:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: data as Metric | null,
    };
  } catch (err: any) {
    console.error('Unexpected error fetching metrics:', err);
    return {
      success: false,
      error: err.message || 'An unexpected error occurred.',
    };
  }
}

/**
 * Atomically increments the view count for a specific item via PostgreSQL RPC.
 */
export async function incrementViews(
  itemSlug: string,
  itemType = 'post'
): Promise<ServiceResponse> {
  try {
    const { error } = await supabase.rpc('increment_views', {
      target_slug: itemSlug,
      target_type: itemType,
    });

    if (error) {
      console.error('Failed to increment views:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Unexpected error incrementing views:', err);
    return {
      success: false,
      error: err.message || 'An unexpected error occurred.',
    };
  }
}

/**
 * Atomically increments the likes count for a specific item via PostgreSQL RPC.
 */
export async function incrementLikes(
  itemSlug: string,
  itemType = 'post'
): Promise<ServiceResponse> {
  try {
    const { error } = await supabase.rpc('increment_likes', {
      target_slug: itemSlug,
      target_type: itemType,
    });

    if (error) {
      console.error('Failed to increment likes:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Unexpected error incrementing likes:', err);
    return {
      success: false,
      error: err.message || 'An unexpected error occurred.',
    };
  }
}
