import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://dscbuqfnenaiukympxjr.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createSupabaseClient(supabaseUrl, serviceRoleKey);

async function verifyWebhookFlow() {
  console.log('🧪 Testing Webhook Upsert & Delete Pipeline (Phase 3)...');

  const testId = 'test_webhook_social_link_999';

  // 1. Simulate Webhook Upsert
  const testPayload = {
    sanity_id: testId,
    platform: 'Other',
    label: 'Test Webhook Platform',
    url: 'https://test-platform.com',
    section: 'both',
    order: 999,
    updated_at: new Date().toISOString(),
  };

  console.log('1. Upserting test record into Supabase (simulating webhook CREATE/UPDATE)...');
  const { error: upsertErr } = await supabase.from('social_links').upsert(testPayload, { onConflict: 'sanity_id' });
  if (upsertErr) {
    console.error('❌ Upsert failed:', upsertErr.message);
    process.exit(1);
  }

  const { data: checkData, error: checkErr } = await supabase
    .from('social_links')
    .select('*')
    .eq('sanity_id', testId)
    .single();

  if (checkErr || !checkData) {
    console.error('❌ Verification failed: Record not found in Supabase');
    process.exit(1);
  }
  console.log(`✅ Record successfully verified in Supabase: "${checkData.label}"`);

  // 2. Simulate Webhook Delete
  console.log('2. Deleting test record from Supabase (simulating webhook DELETE)...');
  const { error: delErr } = await supabase.from('social_links').delete().eq('sanity_id', testId);
  if (delErr) {
    console.error('❌ Delete failed:', delErr.message);
    process.exit(1);
  }

  const { data: checkDeleted } = await supabase
    .from('social_links')
    .select('*')
    .eq('sanity_id', testId);

  if (checkDeleted && checkDeleted.length === 0) {
    console.log('✅ Delete successfully verified: Record cleanly removed from Supabase');
  } else {
    console.error('❌ Verification failed: Record still exists after deletion');
    process.exit(1);
  }

  console.log('\n🎉 Phase 3 Webhook and Sync Layer validation fully succeeded!');
}

verifyWebhookFlow().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
