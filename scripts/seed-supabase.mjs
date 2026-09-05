import { createClient as createSanityClient } from '@sanity/client';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import imageUrlBuilder from '@sanity/image-url';
import dotenv from 'dotenv';

dotenv.config();

const projectId = process.env.VITE_SANITY_PROJECT_ID || 'oxu258yz';
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const sanityToken = process.env.SANITY_API_TOKEN;

const sanity = createSanityClient({
  projectId,
  dataset,
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-03-01',
  token: sanityToken,
  useCdn: false,
});

const builder = imageUrlBuilder(sanity);

function getImageUrl(source) {
  if (!source?.asset?._ref) return null;
  try {
    return builder.image(source).auto('format').url();
  } catch {
    return null;
  }
}

function getFileUrl(source) {
  if (!source?.asset?._ref) return null;
  try {
    const ref = source.asset._ref;
    const parts = ref.split('-');
    if (parts.length >= 3) {
      const assetId = parts[1];
      const ext = parts[2];
      return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${ext}`;
    }
  } catch {}
  return null;
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY in environment');
  process.exit(1);
}

const supabase = createSupabaseClient(supabaseUrl, serviceRoleKey);

export async function syncSanityToSupabase() {
  console.log('🔄 Starting Full Sync: Sanity Content Lake ➔ Supabase Database...');

  // 1. Site Settings
  const siteSettingsDocs = await sanity.fetch('*[_type == "siteSettings"]');
  for (const doc of siteSettingsDocs) {
    const row = {
      sanity_id: doc._id,
      site_name: doc.siteName || '',
      site_url: doc.siteUrl || '',
      site_description: doc.siteDescription || null,
      site_keywords: doc.siteKeywords || [],
      site_image_url: getImageUrl(doc.siteImage) || '/profile-image.jpg',
      logo_initials: doc.logoInitials || '',
      twitter_handle: doc.twitterHandle || '',
      theme_color: doc.themeColor || '#6366f1',
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('site_settings').upsert(row, { onConflict: 'sanity_id' });
    if (error) console.error('Error syncing site_settings:', error.message);
  }
  console.log(`✅ Synced ${siteSettingsDocs.length} site_settings records`);

  // 2. Profile
  const profileDocs = await sanity.fetch('*[_type == "profile"]');
  for (const doc of profileDocs) {
    const row = {
      sanity_id: doc._id,
      full_name: doc.fullName || '',
      short_name: doc.shortName || '',
      profile_image_url: getImageUrl(doc.profileImage) || '/profile_pic.jpg',
      hero_image_url: getImageUrl(doc.heroImage) || '/home2.webp',
      typewriter_titles: doc.typewriterTitles || [],
      hero_bio: doc.heroBio || '',
      about_paragraphs: doc.aboutParagraphs || [],
      info_grid: doc.infoGrid || {},
      resume_file_url: getFileUrl(doc.resumeFile) || '/resume.pdf',
      resume_file_name:
        doc.resumeFileName ||
        (doc.fullName ? `Resume_${doc.fullName.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf` : 'Resume.pdf'),
      drive_url: doc.driveUrl || '',
      drive_password: doc.drivePassword || '',
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('profiles').upsert(row, { onConflict: 'sanity_id' });
    if (error) console.error('Error syncing profiles:', error.message);
  }
  console.log(`✅ Synced ${profileDocs.length} profiles records`);

  // 3. Social Links
  const socialDocs = await sanity.fetch('*[_type == "socialLink"]');
  for (const doc of socialDocs) {
    const row = {
      sanity_id: doc._id,
      platform: doc.platform,
      label: doc.label,
      url: doc.url,
      section: doc.section || 'both',
      order: doc.order ?? 10,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('social_links').upsert(row, { onConflict: 'sanity_id' });
    if (error) console.error('Error syncing social_links:', error.message);
  }
  console.log(`✅ Synced ${socialDocs.length} social_links records`);

  // 4. Education
  const eduDocs = await sanity.fetch('*[_type == "education"]');
  for (const doc of eduDocs) {
    const row = {
      sanity_id: doc._id,
      period: doc.period,
      title: doc.title,
      institution: doc.institution,
      description: doc.description || null,
      order: doc.order ?? 10,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('education').upsert(row, { onConflict: 'sanity_id' });
    if (error) console.error('Error syncing education:', error.message);
  }
  console.log(`✅ Synced ${eduDocs.length} education records`);

  // 5. Experience
  const expDocs = await sanity.fetch('*[_type == "experience"]');
  for (const doc of expDocs) {
    const row = {
      sanity_id: doc._id,
      period: doc.period,
      title: doc.title,
      location: doc.location,
      description: doc.description,
      order: doc.order ?? 10,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('experience').upsert(row, { onConflict: 'sanity_id' });
    if (error) console.error('Error syncing experience:', error.message);
  }
  console.log(`✅ Synced ${expDocs.length} experience records`);

  // 6. Skill Categories
  const skillDocs = await sanity.fetch('*[_type == "skillCategory"]');
  for (const doc of skillDocs) {
    const row = {
      sanity_id: doc._id,
      category_id: doc.categoryId,
      title: doc.title,
      order: doc.order ?? 10,
      skills: doc.skills || [],
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('skill_categories').upsert(row, { onConflict: 'sanity_id' });
    if (error) console.error('Error syncing skill_categories:', error.message);
  }
  console.log(`✅ Synced ${skillDocs.length} skill_categories records`);

  // 7. Projects
  const projectDocs = await sanity.fetch('*[_type == "project"]');
  for (const doc of projectDocs) {
    const row = {
      sanity_id: doc._id,
      title: doc.title,
      slug: doc.slug?.current || doc._id,
      category: doc.category || 'all',
      description: doc.description,
      image_url: getImageUrl(doc.mainImage) || '/demo.png',
      tech_stack: doc.techStack || [],
      github_url: doc.githubUrl || null,
      live_url: doc.liveUrl || null,
      featured: Boolean(doc.featured),
      order: doc.order ?? 10,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('projects').upsert(row, { onConflict: 'sanity_id' });
    if (error) console.error('Error syncing projects:', error.message);
  }
  console.log(`✅ Synced ${projectDocs.length} projects records`);

  // 8. Posts
  const postDocs = await sanity.fetch('*[_type == "post"]');
  for (const doc of postDocs) {
    const row = {
      sanity_id: doc._id,
      title: doc.title,
      slug: doc.slug?.current || doc._id,
      author: doc.author || '',
      image_url: getImageUrl(doc.mainImage) || '/demo.png',
      category: doc.category || 'General',
      tags: doc.tags || [],
      published_at: doc.publishedAt || new Date().toISOString(),
      excerpt: doc.excerpt || '',
      featured: Boolean(doc.featured),
      body: doc.body || [],
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('posts').upsert(row, { onConflict: 'sanity_id' });
    if (error) console.error('Error syncing posts:', error.message);
  }
  console.log(`✅ Synced ${postDocs.length} posts records`);

  // 9. Research
  const researchDocs = await sanity.fetch('*[_type == "research"]');
  for (const doc of researchDocs) {
    const row = {
      sanity_id: doc._id,
      title: doc.title,
      slug: doc.slug?.current || doc._id,
      conference: doc.conference,
      year: String(doc.year),
      abstract: doc.abstract,
      authors: doc.authors || [],
      pdf_url: doc.pdfUrl || null,
      doi: doc.doi || null,
      order: doc.order ?? 10,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('research').upsert(row, { onConflict: 'sanity_id' });
    if (error) console.error('Error syncing research:', error.message);
  }
  console.log(`✅ Synced ${researchDocs.length} research records`);

  // 10. Achievements
  const achieveDocs = await sanity.fetch('*[_type == "achievement"]');
  for (const doc of achieveDocs) {
    const row = {
      sanity_id: doc._id,
      type: doc.type,
      platform_name: doc.platformName || null,
      account: doc.account || null,
      account_url: doc.accountUrl || null,
      highest_rating: doc.highestRating || null,
      solve_count: doc.solveCount || null,
      contest_count: doc.contestCount || null,
      contest_name: doc.contestName || null,
      date: doc.date || null,
      result: doc.result || null,
      description: doc.description || null,
      order: doc.order ?? 10,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('achievements').upsert(row, { onConflict: 'sanity_id' });
    if (error) console.error('Error syncing achievements:', error.message);
  }
  console.log(`✅ Synced ${achieveDocs.length} achievements records`);

  // 11. Activities
  const activityDocs = await sanity.fetch('*[_type == "activity"]');
  for (const doc of activityDocs) {
    const row = {
      sanity_id: doc._id,
      title: doc.title,
      description: doc.description,
      icon_key: doc.iconKey,
      date: doc.date,
      order: doc.order ?? 10,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('activities').upsert(row, { onConflict: 'sanity_id' });
    if (error) console.error('Error syncing activities:', error.message);
  }
  console.log(`✅ Synced ${activityDocs.length} activities records`);

  console.log('🎉 Full Sanity ➔ Supabase database synchronization complete!');
}

if (process.argv[1]?.includes('seed-supabase.mjs')) {
  syncSanityToSupabase().catch((err) => {
    console.error('❌ Sync failed:', err);
    process.exit(1);
  });
}
