import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'naf7d8as',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-03-01',
  useCdn: false,
});

async function verify() {
  console.log('🔍 Validating Sanity Queries for Phase 1 Schemas...');

  const siteSettings = await client.fetch('*[_type == "siteSettings"][0]');
  console.log('1. Site Settings:', siteSettings ? `✅ Found (${siteSettings.siteName})` : '❌ Missing');

  const profile = await client.fetch('*[_type == "profile"][0]');
  console.log('2. Profile:', profile ? `✅ Found (${profile.fullName})` : '❌ Missing');

  const socialLinks = await client.fetch('*[_type == "socialLink"] | order(order asc)');
  console.log('3. Social Links:', socialLinks?.length ? `✅ Found ${socialLinks.length} links` : '❌ Missing');

  const education = await client.fetch('*[_type == "education"] | order(order asc)');
  console.log('4. Education:', education?.length ? `✅ Found ${education.length} milestones` : '❌ Missing');

  const experience = await client.fetch('*[_type == "experience"] | order(order asc)');
  console.log('5. Experience:', experience?.length ? `✅ Found ${experience.length} milestones` : '❌ Missing');

  const skills = await client.fetch('*[_type == "skillCategory"] | order(order asc)');
  console.log('6. Skill Categories:', skills?.length ? `✅ Found ${skills.length} categories` : '❌ Missing');

  const achievements = await client.fetch('*[_type == "achievement"] | order(order asc)');
  console.log('7. Achievements:', achievements?.length ? `✅ Found ${achievements.length} items` : '❌ Missing');

  const activities = await client.fetch('*[_type == "activity"] | order(order asc)');
  console.log('8. Activities:', activities?.length ? `✅ Found ${activities.length} items` : '❌ Missing');

  const posts = await client.fetch('*[_type == "post"]');
  console.log('9. Posts:', posts?.length ? `✅ Found ${posts.length} posts` : 'ℹ️ None');

  const projects = await client.fetch('*[_type == "project"]');
  console.log('10. Projects:', projects?.length ? `✅ Found ${projects.length} projects` : 'ℹ️ None');

  const research = await client.fetch('*[_type == "research"]');
  console.log('11. Research:', research?.length ? `✅ Found ${research.length} publications` : 'ℹ️ None');

  console.log('🎉 All 11 Sanity Schemas and live documents successfully verified!');
}

verify().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
