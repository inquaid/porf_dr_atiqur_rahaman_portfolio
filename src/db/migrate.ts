import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

const connectionString =
  process.env.DATABASE_POOLER_URL ||
  process.env.DATABASE_URL ||
  'postgresql://postgres.dscbuqfnenaiukympxjr:lOnKOimh3JKanvCD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

async function runMigrations() {
  console.log('🔄 Connecting to Supabase PostgreSQL for migrations...');
  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  console.log('📦 Applying Drizzle schema migrations...');
  await migrate(db, { migrationsFolder: resolve(process.cwd(), 'drizzle') });
  console.log('✅ Drizzle tables migrated successfully!');

  console.log('🔒 Applying Row Level Security (RLS) policies & RPC functions...');

  const contentTables = [
    'site_settings',
    'profiles',
    'social_links',
    'education',
    'experience',
    'skill_categories',
    'projects',
    'posts',
    'research',
    'achievements',
    'activities',
  ];

  let rlsPoliciesScript = `
    -- 1. Enable RLS on user interaction tables
    ALTER TABLE IF EXISTS leads ENABLE ROW LEVEL SECURITY;
    ALTER TABLE IF EXISTS subscribers ENABLE ROW LEVEL SECURITY;
    ALTER TABLE IF EXISTS metrics ENABLE ROW LEVEL SECURITY;

    -- 2. Drop existing user interaction policies
    DROP POLICY IF EXISTS "Public can submit contact leads" ON leads;
    DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON subscribers;
    DROP POLICY IF EXISTS "Public can view metrics" ON metrics;
    DROP POLICY IF EXISTS "Public can insert metrics" ON metrics;
    DROP POLICY IF EXISTS "Public can update metrics" ON metrics;

    -- 3. Leads & Subscribers policies
    CREATE POLICY "Public can submit contact leads"
      ON leads FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);

    CREATE POLICY "Public can subscribe to newsletter"
      ON subscribers FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);

    -- 4. Metrics policies
    CREATE POLICY "Public can view metrics"
      ON metrics FOR SELECT
      TO anon, authenticated
      USING (true);

    CREATE POLICY "Public can insert metrics"
      ON metrics FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);

    CREATE POLICY "Public can update metrics"
      ON metrics FOR UPDATE
      TO anon, authenticated
      USING (true)
      WITH CHECK (true);
  `;

  // Add RLS and public SELECT policies for all content tables
  for (const table of contentTables) {
    rlsPoliciesScript += `
      ALTER TABLE IF EXISTS "${table}" ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Public can read ${table}" ON "${table}";
      CREATE POLICY "Public can read ${table}"
        ON "${table}" FOR SELECT
        TO anon, authenticated
        USING (true);
    `;
  }

  // Add atomic increment functions
  rlsPoliciesScript += `
    CREATE OR REPLACE FUNCTION increment_views(target_slug text, target_type text DEFAULT 'post')
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      INSERT INTO metrics (item_slug, item_type, views_count, likes_count, updated_at)
      VALUES (target_slug, target_type, 1, 0, now())
      ON CONFLICT (item_slug)
      DO UPDATE SET
        views_count = metrics.views_count + 1,
        updated_at = now();
    END;
    $$;

    CREATE OR REPLACE FUNCTION increment_likes(target_slug text, target_type text DEFAULT 'post')
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      INSERT INTO metrics (item_slug, item_type, views_count, likes_count, updated_at)
      VALUES (target_slug, target_type, 0, 1, now())
      ON CONFLICT (item_slug)
      DO UPDATE SET
        likes_count = metrics.likes_count + 1,
        updated_at = now();
    END;
    $$;
  `;

  await sql.unsafe(rlsPoliciesScript);
  console.log('✅ RLS Policies and atomic RPC functions configured successfully!');
  await sql.end();
  console.log('🎉 Database setup and migration complete!');
}

runMigrations().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
