import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { syncSanityToSupabase } from './seed-supabase.mjs';

dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'oxu258yz',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function seedResearch() {
  const existing = await client.fetch('count(*[_type == "research"])');
  if (existing > 0) {
    console.log(`Research documents already exist (${existing}). Skipping seed.`);
    return;
  }

  console.log('Seeding sample research paper into Sanity...');
  await client.create({
    _id: 'sample-research-paper',
    _type: 'research',
    title: 'An Efficient Approach to Natural Language Understanding in Limited Resource Settings',
    slug: { _type: 'slug', current: 'efficient-nlu-limited-resources' },
    conference: 'Conference on Computational Linguistics (CCL), 2024',
    year: '2024',
    abstract: 'This paper presents a novel approach to natural language understanding that requires significantly fewer computational resources than state-of-the-art models while maintaining comparable performance on benchmark evaluation sets.',
    authors: ['Prof. Dr. GM Atiqur Rahaman', 'Collaborator One'],
    pdfUrl: 'https://arxiv.org',
    doi: '10.1145/sample.2024.01',
    order: 1,
  });

  console.log('✅ Sample research paper created in Sanity!');
  await syncSanityToSupabase();
}

seedResearch().catch((err) => {
  console.error('Error seeding research:', err);
  process.exit(1);
});
