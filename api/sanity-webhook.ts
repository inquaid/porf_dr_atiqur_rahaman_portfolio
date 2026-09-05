import { createClient } from '@supabase/supabase-js';

const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || 'oxu258yz';
const SANITY_DATASET = process.env.VITE_SANITY_DATASET || 'production';
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET || 'atiqur_sanity_webhook_secret_2026_secure';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabaseClient() {
  const url = process.env.VITE_SUPABASE_URL || '';
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    '';
  return createClient(url, key);
}

function getSanityImageUrl(source: any): string | null {
  if (!source?.asset?._ref) return null;
  const ref: string = source.asset._ref;
  const parts = ref.split('-');
  if (parts.length >= 4) {
    const assetId = parts[1];
    const dimensions = parts[2];
    const ext = parts[3];
    return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${assetId}-${dimensions}.${ext}`;
  }
  return null;
}

function getSanityFileUrl(source: any): string | null {
  if (!source?.asset?._ref) return null;
  const ref: string = source.asset._ref;
  const parts = ref.split('-');
  if (parts.length >= 3) {
    const assetId = parts[1];
    const ext = parts[2];
    return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${assetId}.${ext}`;
  }
  return null;
}

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, sanity-webhook-secret, authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Verify Secret
  const secretHeader = req.headers['sanity-webhook-secret'] || req.headers['x-sanity-webhook-secret'];
  const authHeader = req.headers['authorization'];
  const isAuthorized =
    secretHeader === SANITY_WEBHOOK_SECRET ||
    authHeader === `Bearer ${SANITY_WEBHOOK_SECRET}` ||
    authHeader === `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`;

  if (!isAuthorized) {
    return res.status(401).json({ error: 'Unauthorized: Invalid webhook secret' });
  }

  try {
    const supabase = getSupabaseClient();
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { _id, _type, operation } = payload;

    if (!_id || !_type) {
      return res.status(400).json({ error: 'Invalid payload: missing _id or _type' });
    }

    // Handle Deletion
    if (operation === 'delete' || payload.transition === 'disappear') {
      const typeToTableMap: Record<string, string> = {
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

      const targetTable = typeToTableMap[_type];
      if (targetTable) {
        await supabase.from(targetTable).delete().eq('sanity_id', _id);
      }

      return res.status(200).json({ success: true, action: 'deleted', table: targetTable, id: _id });
    }

    // Handle Upsert
    let syncResult: any = null;

    switch (_type) {
      case 'siteSettings': {
        const row = {
          sanity_id: _id,
          site_name: payload.siteName || '',
          site_url: payload.siteUrl || '',
          site_description: payload.siteDescription || null,
          site_keywords: payload.siteKeywords || [],
          site_image_url: getSanityImageUrl(payload.siteImage) || '/profile-image.jpg',
          logo_initials: payload.logoInitials || '',
          twitter_handle: payload.twitterHandle || '',
          theme_color: payload.themeColor || '#6366f1',
          updated_at: new Date().toISOString(),
        };
        syncResult = await supabase.from('site_settings').upsert(row, { onConflict: 'sanity_id' });
        break;
      }

      case 'profile': {
        const row = {
          sanity_id: _id,
          full_name: payload.fullName || '',
          short_name: payload.shortName || '',
          profile_image_url: getSanityImageUrl(payload.profileImage) || '/profile_pic.jpg',
          hero_image_url: getSanityImageUrl(payload.heroImage) || '/home2.webp',
          typewriter_titles: payload.typewriterTitles || [],
          hero_bio: payload.heroBio || '',
          about_paragraphs: payload.aboutParagraphs || [],
          info_grid: payload.infoGrid || {},
          resume_file_url: getSanityFileUrl(payload.resumeFile) || '/resume.pdf',
          resume_file_name:
            payload.resumeFileName ||
            (payload.fullName ? `Resume_${payload.fullName.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf` : 'Resume.pdf'),
          drive_url: payload.driveUrl || '',
          drive_password: payload.drivePassword || '',
          updated_at: new Date().toISOString(),
        };
        syncResult = await supabase.from('profiles').upsert(row, { onConflict: 'sanity_id' });
        break;
      }

      case 'socialLink': {
        const row = {
          sanity_id: _id,
          platform: payload.platform,
          label: payload.label,
          url: payload.url,
          section: payload.section || 'both',
          order: payload.order ?? 10,
          updated_at: new Date().toISOString(),
        };
        syncResult = await supabase.from('social_links').upsert(row, { onConflict: 'sanity_id' });
        break;
      }

      case 'education': {
        const row = {
          sanity_id: _id,
          period: payload.period,
          title: payload.title,
          institution: payload.institution,
          description: payload.description || null,
          order: payload.order ?? 10,
          updated_at: new Date().toISOString(),
        };
        syncResult = await supabase.from('education').upsert(row, { onConflict: 'sanity_id' });
        break;
      }

      case 'experience': {
        const row = {
          sanity_id: _id,
          period: payload.period,
          title: payload.title,
          location: payload.location,
          description: payload.description,
          order: payload.order ?? 10,
          updated_at: new Date().toISOString(),
        };
        syncResult = await supabase.from('experience').upsert(row, { onConflict: 'sanity_id' });
        break;
      }

      case 'skillCategory': {
        const row = {
          sanity_id: _id,
          category_id: payload.categoryId,
          title: payload.title,
          order: payload.order ?? 10,
          skills: payload.skills || [],
          updated_at: new Date().toISOString(),
        };
        syncResult = await supabase.from('skill_categories').upsert(row, { onConflict: 'sanity_id' });
        break;
      }

      case 'project': {
        const row = {
          sanity_id: _id,
          title: payload.title,
          slug: payload.slug?.current || _id,
          category: payload.category || 'all',
          description: payload.description,
          image_url: getSanityImageUrl(payload.mainImage) || '/demo.png',
          tech_stack: payload.techStack || [],
          github_url: payload.githubUrl || null,
          live_url: payload.liveUrl || null,
          featured: Boolean(payload.featured),
          order: payload.order ?? 10,
          updated_at: new Date().toISOString(),
        };
        syncResult = await supabase.from('projects').upsert(row, { onConflict: 'sanity_id' });
        break;
      }

      case 'post': {
        const row = {
          sanity_id: _id,
          title: payload.title,
          slug: payload.slug?.current || _id,
          author: payload.author || '',
          image_url: getSanityImageUrl(payload.mainImage) || '/demo.png',
          category: payload.category || 'General',
          tags: payload.tags || [],
          published_at: payload.publishedAt || new Date().toISOString(),
          excerpt: payload.excerpt || '',
          featured: Boolean(payload.featured),
          body: payload.body || [],
          updated_at: new Date().toISOString(),
        };
        syncResult = await supabase.from('posts').upsert(row, { onConflict: 'sanity_id' });
        break;
      }

      case 'research': {
        const row = {
          sanity_id: _id,
          title: payload.title,
          slug: payload.slug?.current || _id,
          conference: payload.conference,
          year: String(payload.year),
          abstract: payload.abstract,
          authors: payload.authors || [],
          pdf_url: payload.pdfUrl || null,
          doi: payload.doi || null,
          order: payload.order ?? 10,
          updated_at: new Date().toISOString(),
        };
        syncResult = await supabase.from('research').upsert(row, { onConflict: 'sanity_id' });
        break;
      }

      case 'achievement': {
        const row = {
          sanity_id: _id,
          type: payload.type,
          platform_name: payload.platformName || null,
          account: payload.account || null,
          account_url: payload.accountUrl || null,
          highest_rating: payload.highestRating || null,
          solve_count: payload.solveCount || null,
          contest_count: payload.contestCount || null,
          contest_name: payload.contestName || null,
          date: payload.date || null,
          result: payload.result || null,
          description: payload.description || null,
          order: payload.order ?? 10,
          updated_at: new Date().toISOString(),
        };
        syncResult = await supabase.from('achievements').upsert(row, { onConflict: 'sanity_id' });
        break;
      }

      case 'activity': {
        const row = {
          sanity_id: _id,
          title: payload.title,
          description: payload.description,
          icon_key: payload.iconKey,
          date: payload.date,
          order: payload.order ?? 10,
          updated_at: new Date().toISOString(),
        };
        syncResult = await supabase.from('activities').upsert(row, { onConflict: 'sanity_id' });
        break;
      }

      default:
        return res.status(200).json({ message: `Ignored unhandled document type: ${_type}` });
    }

    if (syncResult?.error) {
      console.error('Supabase upsert error:', syncResult.error);
      return res.status(500).json({ error: syncResult.error.message });
    }

    return res.status(200).json({ success: true, action: 'upserted', type: _type, id: _id });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
