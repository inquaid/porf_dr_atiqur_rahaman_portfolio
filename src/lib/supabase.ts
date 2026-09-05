import { createClient } from '@supabase/supabase-js';
import { envConfig } from '../config/env';

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

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || envConfig.supabase.url;
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || envConfig.supabase.anonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase configuration missing: Neither environment variables nor fallback credentials could be resolved. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

