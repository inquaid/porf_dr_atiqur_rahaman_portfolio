import dotenv from 'dotenv';
dotenv.config();

const projectId = process.env.VITE_SANITY_PROJECT_ID || 'naf7d8as';
const token = process.env.SANITY_API_TOKEN;
const webhookSecret = process.env.SANITY_WEBHOOK_SECRET || 'turjo_sanity_webhook_secret_2026_secure';
const targetUrl = 'https://azmaininquaid.mind-byte.com/api/sanity-webhook';

async function setupWebhook() {
  console.log(`Checking existing webhooks for Sanity project ${projectId}...`);
  const listRes = await fetch(`https://api.sanity.io/v2024-03-01/hooks/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const existingHooks = await listRes.json();
  console.log(`Existing webhooks count: ${existingHooks.length}`);

  for (const hook of existingHooks) {
    console.log(`Found webhook "${hook.name}" (ID: ${hook.id}) -> ${hook.url}`);
    if (hook.url !== targetUrl) {
      console.log(`Updating webhook ${hook.id} URL to ${targetUrl}...`);
      const updateRes = await fetch(`https://api.sanity.io/v2024-03-01/hooks/projects/${projectId}/${hook.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: targetUrl,
          headers: {
            'sanity-webhook-secret': webhookSecret,
          },
        }),
      });
      const updated = await updateRes.json();
      console.log('✅ Webhook updated successfully:', updated.url);
      return updated;
    } else {
      console.log('✅ Webhook already configured with target URL!');
      return hook;
    }
  }

  // If no webhooks exist, create one
  console.log(`Creating new Sanity Webhook targeting ${targetUrl}...`);
  const hookPayload = {
    name: 'Vercel Supabase Sync Webhook',
    url: targetUrl,
    type: 'document',
    dataset: 'production',
    apiVersion: 'v2024-03-01',
    rule: {
      on: ['create', 'update', 'delete'],
    },
    headers: {
      'sanity-webhook-secret': webhookSecret,
    },
  };

  const createRes = await fetch(`https://api.sanity.io/v2024-03-01/hooks/projects/${projectId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hookPayload),
  });

  const created = await createRes.json();
  if (!createRes.ok) {
    console.error('Failed to create webhook:', createRes.status, created);
  } else {
    console.log('✅ Successfully created Sanity Webhook:', created);
  }
  return created;
}

setupWebhook().catch(console.error);
