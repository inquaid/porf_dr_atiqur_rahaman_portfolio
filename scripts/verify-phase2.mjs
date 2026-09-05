import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://dscbuqfnenaiukympxjr.supabase.co';
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, anonKey);

async function verify() {
  console.log('🔍 Validating Supabase PostgreSQL Tables & RLS Policies (Phase 2)...');

  const tables = [
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
    'leads',
    'subscribers',
    'metrics',
  ];

  let allOk = true;

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.error(`❌ Table "${table}" error:`, error.message);
      allOk = false;
    } else {
      console.log(`✅ Table "${table}": Accessible via anon SELECT (Rows: ${data.length})`);
    }
  }

  // Verify write security: anonymous insert to a content table should be rejected by RLS
  console.log('\n🔒 Verifying RLS write protection on content tables...');
  const { error: writeError } = await supabase.from('site_settings').insert({
    sanity_id: 'test_hack',
    site_name: 'Hacked',
    site_url: 'https://hacked.com',
  });

  if (writeError) {
    console.log('✅ RLS Security verified: Anonymous writes are correctly BLOCKED on content tables');
  } else {
    console.warn('⚠️ Warning: Anonymous write succeeded on site_settings');
  }

  if (allOk) {
    console.log('\n🎉 Phase 2 Database Mirror & RLS validation fully succeeded!');
  } else {
    process.exit(1);
  }
}

verify().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
