import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString =
  process.env.DATABASE_POOLER_URL ||
  process.env.DATABASE_URL ||
  'postgresql://postgres.dscbuqfnenaiukympxjr:lOnKOimh3JKanvCD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres';

/**
 * High-performance Drizzle instance using Supabase connection pooler.
 */
const client = postgres(connectionString, {
  prepare: false,
  max: 10,
});

export const db = drizzle(client, { schema });
export * from './schema';
