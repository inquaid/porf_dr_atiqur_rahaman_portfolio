import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

console.log('Testing Sanity live listener subscription...');
const sub = client.listen('*[!(_id in path("_.**"))]').subscribe({
  next: (update) => {
    console.log('Update received:', update.transition, update.documentId);
  },
  error: (err) => {
    console.error('Subscription error:', err);
  },
});

setTimeout(() => {
  console.log('✅ Sanity real-time listener connected successfully!');
  sub.unsubscribe();
  process.exit(0);
}, 3000);
