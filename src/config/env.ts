/**
 * Centralized, validated environment configuration
 */

export interface AppConfig {
  supabase: {
    url: string;
    anonKey: string;
    publishableKey?: string;
  };
  sanity: {
    projectId: string;
    dataset: string;
    apiVersion: string;
  };
  emailjs?: {
    serviceId?: string;
    templateId?: string;
    publicKey?: string;
  };
}

const getEnvVar = (key: string): string | undefined => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  } catch {}
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch {}
  return undefined;
};

export const envConfig: AppConfig = {
  supabase: {
    url: getEnvVar('VITE_SUPABASE_URL') || 'https://dscbuqfnenaiukympxjr.supabase.co',
    anonKey:
      getEnvVar('VITE_SUPABASE_ANON_KEY') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzY2J1cWZuZW5haXVreW1weGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyOTEzMzMsImV4cCI6MjEwMzg2NzMzM30.76Lt7YdmqwQHW8W_FnVffAwU_cuBp1Fi1CoRy22GOk8',
    publishableKey: getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY'),
  },
  sanity: {
    projectId: getEnvVar('VITE_SANITY_PROJECT_ID') || 'naf7d8as',
    dataset: getEnvVar('VITE_SANITY_DATASET') || 'production',
    apiVersion: getEnvVar('VITE_SANITY_API_VERSION') || '2024-03-01',
  },
  emailjs: {
    serviceId: getEnvVar('VITE_EMAILJS_SERVICE_ID'),
    templateId: getEnvVar('VITE_EMAILJS_TEMPLATE_ID'),
    publicKey: getEnvVar('VITE_EMAILJS_PUBLIC_KEY'),
  },
};

/**
 * Validates that essential environment variables are properly defined.
 */
export function validateEnvironment(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!envConfig.supabase.url) {
    errors.push('VITE_SUPABASE_URL is not configured.');
  }
  if (!envConfig.supabase.anonKey) {
    errors.push('VITE_SUPABASE_ANON_KEY is not configured.');
  }
  if (!envConfig.sanity.projectId) {
    errors.push('VITE_SANITY_PROJECT_ID is not configured.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
