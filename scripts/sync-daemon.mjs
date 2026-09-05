import { createClient as createSanityClient } from '@sanity/client';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import imageUrlBuilder from '@sanity/image-url';
import dotenv from 'dotenv';

dotenv.config();

const projectId = process.env.VITE_SANITY_PROJECT_ID || 'naf7d8as';
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

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://dscbuqfnenaiukympxjr.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY in environment');
  process.exit(1);
}

const supabase = createSupabaseClient(supabaseUrl, serviceRoleKey);

const typeToTableMap = {
  siteSettings: 'site_settings',
  profile: 'profiles',
  socialLink: 'social_links',
  education: 'education',
  experience: 'experience',
  skillCategory: 'skill_categories',
  project: 'projects',
  post: 'posts',
  research: 'research',
  achievement: 'achievements',
  activity: 'activities',
};

async function handleDocumentChange(doc, transition) {
  const type = doc?._type;
  const id = doc?._id;

  if (!type || !id || id.startsWith('drafts.')) {
    return; // Ignore drafts or system docs
  }

  const tableName = typeToTableMap[type];
  if (!tableName) {
    return;
  }

  if (transition === 'disappear') {
    console.log(`🗑️ Deleting ${type} [${id}] from Supabase table ${tableName}...`);
    const { error } = await supabase.from(tableName).delete().eq('sanity_id', id);
    if (error) console.error(`Error deleting from ${tableName}:`, error.message);
    else console.log(`✅ Successfully deleted ${id} from ${tableName}`);
    return;
  }

  console.log(`⚡ Syncing ${type} [${id}] to Supabase table ${tableName}...`);

  let row = null;
  switch (type) {
    case 'siteSettings':
      row = {
        sanity_id: id,
        site_name: doc.siteName || 'Azmain Inquaid Haque',
        site_url: doc.siteUrl || 'https://azmaininquaid.mind-byte.com',
        site_description: doc.siteDescription || null,
        site_keywords: doc.siteKeywords || [],
        site_image_url: getImageUrl(doc.siteImage) || '/profile-image.jpg',
        logo_initials: doc.logoInitials || 'AI',
        twitter_handle: doc.twitterHandle || '@azmain_inquaid',
        theme_color: doc.themeColor || '#6366f1',
        updated_at: new Date().toISOString(),
      };
      break;

    case 'profile':
      row = {
        sanity_id: id,
        full_name: doc.fullName || 'Azmain Inquaid Haque',
        short_name: doc.shortName || 'Azmain Inquaid',
        profile_image_url: getImageUrl(doc.profileImage) || '/profile_pic.jpg',
        hero_image_url: getImageUrl(doc.heroImage) || '/home2.webp',
        typewriter_titles: doc.typewriterTitles || [],
        hero_bio: doc.heroBio || '',
        about_paragraphs: doc.aboutParagraphs || [],
        info_grid: doc.infoGrid || {},
        resume_file_url: getFileUrl(doc.resumeFile) || '/resume.pdf',
        resume_file_name: doc.resumeFileName || 'Resume_Azmain_Inquaid_Haque.pdf',
        drive_url: doc.driveUrl || 'https://drive.google.com',
        drive_password: doc.drivePassword || '1234',
        updated_at: new Date().toISOString(),
      };
      break;

    case 'socialLink':
      row = {
        sanity_id: id,
        platform: doc.platform,
        label: doc.label,
        url: doc.url,
        section: doc.section || 'both',
        order: doc.order ?? 10,
        updated_at: new Date().toISOString(),
      };
      break;

    case 'education':
      row = {
        sanity_id: id,
        period: doc.period,
        title: doc.title,
        institution: doc.institution,
        description: doc.description || null,
        order: doc.order ?? 10,
        updated_at: new Date().toISOString(),
      };
      break;

    case 'experience':
      row = {
        sanity_id: id,
        period: doc.period,
        title: doc.title,
        location: doc.location,
        description: doc.description,
        order: doc.order ?? 10,
        updated_at: new Date().toISOString(),
      };
      break;

    case 'skillCategory':
      row = {
        sanity_id: id,
        category_id: doc.categoryId,
        title: doc.title,
        order: doc.order ?? 10,
        skills: doc.skills || [],
        updated_at: new Date().toISOString(),
      };
      break;

    case 'project':
      row = {
        sanity_id: id,
        title: doc.title,
        slug: doc.slug?.current || id,
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
      break;

    case 'post':
      row = {
        sanity_id: id,
        title: doc.title,
        slug: doc.slug?.current || id,
        author: doc.author || 'Inquaid',
        image_url: getImageUrl(doc.mainImage) || '/demo.png',
        category: doc.category || 'General',
        tags: doc.tags || [],
        published_at: doc.publishedAt || new Date().toISOString(),
        excerpt: doc.excerpt || '',
        featured: Boolean(doc.featured),
        body: doc.body || [],
        updated_at: new Date().toISOString(),
      };
      break;

    case 'research':
      row = {
        sanity_id: id,
        title: doc.title,
        slug: doc.slug?.current || id,
        conference: doc.conference,
        year: String(doc.year),
        abstract: doc.abstract,
        authors: doc.authors || [],
        pdf_url: doc.pdfUrl || null,
        doi: doc.doi || null,
        order: doc.order ?? 10,
        updated_at: new Date().toISOString(),
      };
      break;

    case 'achievement':
      row = {
        sanity_id: id,
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
      break;

    case 'activity':
      row = {
        sanity_id: id,
        title: doc.title,
        description: doc.description,
        icon_key: doc.iconKey,
        date: doc.date,
        order: doc.order ?? 10,
        updated_at: new Date().toISOString(),
      };
      break;
  }

  if (row) {
    const { error } = await supabase.from(tableName).upsert(row, { onConflict: 'sanity_id' });
    if (error) console.error(`❌ Upsert error on ${tableName}:`, error.message);
    else console.log(`✅ Successfully synced ${type} [${id}] to ${tableName}`);
  }
}

console.log('📡 Starting Sanity ➔ Supabase Live Real-time Sync Daemon...');
console.log('Listening for live document mutations in Sanity Content Lake...');

sanity.listen('*[!(_id in path("_.**"))]').subscribe({
  next: async (update) => {
    try {
      const { result, transition, documentId } = update;
      if (transition === 'disappear') {
        const type = update.previous?._type;
        if (type) {
          await handleDocumentChange({ _id: documentId, _type: type }, 'disappear');
        }
      } else if (result) {
        await handleDocumentChange(result, transition);
      }
    } catch (err) {
      console.error('Error handling live mutation:', err);
    }
  },
  error: (err) => {
    console.error('Subscription error:', err);
  },
});
