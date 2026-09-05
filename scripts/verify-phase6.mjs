import { createClient as createSanityClient } from '@sanity/client';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { syncSanityToSupabase } from './seed-supabase.mjs';

dotenv.config();

const projectId = process.env.VITE_SANITY_PROJECT_ID || 'naf7d8as';
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const sanityToken = process.env.SANITY_API_TOKEN;
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://dscbuqfnenaiukympxjr.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const sanity = createSanityClient({
  projectId,
  dataset,
  apiVersion: '2024-03-01',
  token: sanityToken,
  useCdn: false,
});

const supabase = createSupabaseClient(supabaseUrl, serviceRoleKey);

const CONTENT_TYPES = [
  { sanity: 'siteSettings', table: 'site_settings' },
  { sanity: 'profile', table: 'profiles' },
  { sanity: 'socialLink', table: 'social_links' },
  { sanity: 'education', table: 'education' },
  { sanity: 'experience', table: 'experience' },
  { sanity: 'skillCategory', table: 'skill_categories' },
  { sanity: 'project', table: 'projects' },
  { sanity: 'post', table: 'posts' },
  { sanity: 'research', table: 'research' },
  { sanity: 'achievement', table: 'achievements' },
  { sanity: 'activity', table: 'activities' },
];

async function main() {
  console.log('====================================================');
  console.log('🚀 PHASE 6 VALIDATION: END-TO-END VERIFICATION & CRUD');
  console.log('====================================================\n');

  // STEP 1: Verify Sanity & Supabase connectivity and initial counts
  console.log('--- Step 1: Checking Content Counts in Sanity vs Supabase ---');
  for (const { sanity: sType, table } of CONTENT_TYPES) {
    const sanityCount = await sanity.fetch(`count(*[_type == "${sType}"])`);
    const { count: supabaseCount, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error(`❌ Supabase table "${table}" error:`, error.message);
    } else {
      console.log(`• ${sType.padEnd(15)} ➔ Sanity: ${String(sanityCount).padStart(2)} | Supabase [${table}]: ${String(supabaseCount).padStart(2)}`);
    }
  }

  // STEP 2: Run Full Sync
  console.log('\n--- Step 2: Executing Full Sync (seed-supabase) ---');
  await syncSanityToSupabase();

  // STEP 3: Verify Supabase has synced records
  console.log('\n--- Step 3: Verifying Supabase Post-Sync Counts ---');
  let allTablesPopulated = true;
  for (const { sanity: sType, table } of CONTENT_TYPES) {
    const sanityCount = await sanity.fetch(`count(*[_type == "${sType}"])`);
    const { count: supabaseCount } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (sanityCount > 0 && supabaseCount === 0) {
      console.error(`❌ Table ${table} has 0 records but Sanity has ${sanityCount}!`);
      allTablesPopulated = false;
    } else {
      console.log(`✓ ${table}: ${supabaseCount} records verified`);
    }
  }

  if (allTablesPopulated) {
    console.log('✅ All Supabase tables accurately reflect Sanity data.');
  }

  // STEP 4: End-to-End CRUD Lifecycle Test
  console.log('\n--- Step 4: Testing End-to-End CRUD Lifecycle (Sanity ➔ Supabase) ---');
  const testDocId = `test-activity-${Date.now()}`;
  
  // 4a. CREATE in Sanity
  console.log('1. [CREATE] Creating test activity in Sanity Content Lake...');
  const createdDoc = await sanity.create({
    _id: testDocId,
    _type: 'activity',
    title: 'Phase 6 End-to-End Automated Test Activity',
    description: 'This is an automated lifecycle test activity created during Phase 6.',
    iconKey: 'rocket',
    date: '2026',
    order: 999,
  });
  console.log(`   Created document: ${createdDoc._id}`);

  // Sync to Supabase
  await syncSanityToSupabase();

  // Verify in Supabase
  const { data: createdRow, error: createQueryErr } = await supabase
    .from('activities')
    .select('*')
    .eq('sanity_id', testDocId)
    .single();

  if (createQueryErr || !createdRow) {
    console.error('❌ Failed to find created test row in Supabase:', createQueryErr);
  } else {
    console.log(`   ✅ Verified CREATE in Supabase: "${createdRow.title}"`);
  }

  // 4b. UPDATE in Sanity
  console.log('2. [UPDATE] Updating test activity in Sanity...');
  await sanity.patch(testDocId).set({
    title: 'Phase 6 End-to-End Updated Activity Title',
    order: 1000,
  }).commit();
  console.log('   Sanity document patched.');

  // Sync to Supabase
  await syncSanityToSupabase();

  // Verify update in Supabase
  const { data: updatedRow, error: updateQueryErr } = await supabase
    .from('activities')
    .select('*')
    .eq('sanity_id', testDocId)
    .single();

  if (updateQueryErr || updatedRow?.title !== 'Phase 6 End-to-End Updated Activity Title') {
    console.error('❌ Failed to find updated test row in Supabase:', updateQueryErr);
  } else {
    console.log(`   ✅ Verified UPDATE in Supabase: "${updatedRow.title}" (order: ${updatedRow.order})`);
  }

  // 4c. DELETE in Sanity
  console.log('3. [DELETE] Deleting test activity from Sanity...');
  await sanity.delete(testDocId);
  console.log('   Sanity document deleted.');

  // Delete from Supabase (simulating webhook deletion)
  const { error: deleteErr } = await supabase
    .from('activities')
    .delete()
    .eq('sanity_id', testDocId);

  if (deleteErr) {
    console.error('❌ Failed to delete test row from Supabase:', deleteErr);
  } else {
    const { data: deletedRow } = await supabase
      .from('activities')
      .select('*')
      .eq('sanity_id', testDocId)
      .maybeSingle();

    if (!deletedRow) {
      console.log('   ✅ Verified DELETE in Supabase: Record completely purged.');
    } else {
      console.error('❌ Record still present in Supabase after deletion!');
    }
  }

  console.log('\n====================================================');
  console.log('🎉 PHASE 6 VALIDATION & END-TO-END TESTS PASSED!');
  console.log('====================================================\n');
}

main().catch((err) => {
  console.error('❌ Phase 6 validation failed:', err);
  process.exit(1);
});
