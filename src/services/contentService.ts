import { supabase } from '../lib/supabase';
import { urlFor } from '../lib/sanity';
import {
  getSanitySiteSettings,
  getSanityProfile,
  getSanitySocialLinks,
  getSanityEducation,
  getSanityExperience,
  getSanitySkillCategories,
  getSanityProjects,
  getSanityPosts,
  getSanityPostBySlug,
  getSanityResearch,
  getSanityAchievements,
  getSanityActivities,
} from '../sanity/queries';
import type {
  SiteSettings,
  Profile,
  SocialLink,
  Education,
  Experience,
  SkillCategory,
  Project,
  Post,
  ResearchItem,
  Achievement,
  Activity,
} from '../db/schema';

// Helper for building Sanity file download URLs
const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'oxu258yz';
const sanityDataset = import.meta.env.VITE_SANITY_DATASET || 'production';

function getSanityFileUrl(source: any): string | null {
  if (!source?.asset?._ref) return null;
  try {
    const ref = source.asset._ref;
    const parts = ref.split('-');
    if (parts.length >= 3) {
      const assetId = parts[1];
      const ext = parts[2];
      return `https://cdn.sanity.io/files/${sanityProjectId}/${sanityDataset}/${assetId}.${ext}`;
    }
  } catch {
    // fallback
  }
  return null;
}

function getSanityImageUrl(source: any): string | null {
  if (!source?.asset?._ref) return null;
  try {
    return urlFor(source).url();
  } catch {
    return null;
  }
}

// Normalization Helpers to bridge PostgreSQL snake_case rows and TypeScript camelCase schemas

function normalizeSiteSettings(row: any): SiteSettings {
  if (!row) return row;
  return {
    ...row,
    id: row.id,
    sanityId: row.sanity_id || row.sanityId,
    siteName: row.site_name || row.siteName,
    siteUrl: row.site_url || row.siteUrl,
    siteDescription: row.site_description || row.siteDescription,
    siteKeywords: row.site_keywords || row.siteKeywords || [],
    siteImageUrl: row.site_image_url || row.siteImageUrl,
    logoInitials: row.logo_initials || row.logoInitials,
    twitterHandle: row.twitter_handle || row.twitterHandle,
    themeColor: row.theme_color || row.themeColor,
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  };
}

function normalizeProfile(row: any): Profile {
  if (!row) return row;
  return {
    ...row,
    id: row.id,
    sanityId: row.sanity_id || row.sanityId,
    fullName: row.full_name || row.fullName,
    shortName: row.short_name || row.shortName,
    profileImageUrl: row.profile_image_url || row.profileImageUrl,
    heroImageUrl: row.hero_image_url || row.heroImageUrl,
    typewriterTitles: row.typewriter_titles || row.typewriterTitles || [],
    heroBio: row.hero_bio || row.heroBio,
    aboutParagraphs: row.about_paragraphs || row.aboutParagraphs || [],
    infoGrid: row.info_grid || row.infoGrid || {},
    resumeFileUrl: row.resume_file_url || row.resumeFileUrl,
    resumeFileName: row.resume_file_name || row.resumeFileName,
    driveUrl: row.drive_url || row.driveUrl,
    drivePassword: row.drive_password || row.drivePassword,
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  };
}

function normalizeSocialLink(row: any): SocialLink {
  return {
    ...row,
    id: row.id,
    sanityId: row.sanity_id || row.sanityId,
    platform: row.platform,
    label: row.label,
    url: row.url,
    section: row.section,
    order: row.order ?? 10,
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  };
}

function normalizeEducation(row: any): Education {
  return {
    ...row,
    id: row.id,
    sanityId: row.sanity_id || row.sanityId,
    period: row.period,
    title: row.title,
    institution: row.institution,
    description: row.description,
    order: row.order ?? 10,
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  };
}

function normalizeExperience(row: any): Experience {
  return {
    ...row,
    id: row.id,
    sanityId: row.sanity_id || row.sanityId,
    period: row.period,
    title: row.title,
    location: row.location,
    description: row.description,
    order: row.order ?? 10,
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  };
}

function normalizeSkillCategory(row: any): SkillCategory {
  return {
    ...row,
    id: row.id,
    sanityId: row.sanity_id || row.sanityId,
    categoryId: row.category_id || row.categoryId,
    title: row.title,
    order: row.order ?? 10,
    skills: row.skills || [],
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  };
}

function normalizeProject(row: any): Project {
  return {
    ...row,
    id: row.id,
    sanityId: row.sanity_id || row.sanityId,
    title: row.title,
    slug: row.slug,
    category: row.category,
    description: row.description,
    imageUrl: row.image_url || row.imageUrl,
    techStack: row.tech_stack || row.techStack || [],
    githubUrl: row.github_url || row.githubUrl,
    liveUrl: row.live_url || row.liveUrl,
    featured: Boolean(row.featured),
    order: row.order ?? 10,
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  };
}

function normalizePost(row: any): Post {
  return {
    ...row,
    id: row.id,
    sanityId: row.sanity_id || row.sanityId,
    title: row.title,
    slug: row.slug,
    author: row.author,
    imageUrl: row.image_url || row.imageUrl,
    category: row.category,
    tags: row.tags || [],
    publishedAt: row.published_at ? new Date(row.published_at) : new Date(),
    excerpt: row.excerpt,
    featured: Boolean(row.featured),
    body: row.body || [],
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  };
}

function normalizeResearch(row: any): ResearchItem {
  return {
    ...row,
    id: row.id,
    sanityId: row.sanity_id || row.sanityId,
    title: row.title,
    slug: row.slug,
    conference: row.conference,
    year: row.year,
    abstract: row.abstract,
    authors: row.authors || [],
    pdfUrl: row.pdf_url || row.pdfUrl,
    doi: row.doi,
    order: row.order ?? 10,
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  };
}

function normalizeAchievement(row: any): Achievement {
  return {
    ...row,
    id: row.id,
    sanityId: row.sanity_id || row.sanityId,
    type: row.type,
    platformName: row.platform_name || row.platformName,
    account: row.account,
    accountUrl: row.account_url || row.accountUrl,
    highestRating: row.highest_rating || row.highestRating,
    solveCount: row.solve_count || row.solveCount,
    contestCount: row.contest_count || row.contestCount,
    contestName: row.contest_name || row.contestName,
    date: row.date,
    result: row.result,
    description: row.description,
    order: row.order ?? 10,
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  };
}

function normalizeActivity(row: any): Activity {
  return {
    ...row,
    id: row.id,
    sanityId: row.sanity_id || row.sanityId,
    title: row.title,
    description: row.description,
    iconKey: row.icon_key || row.iconKey,
    date: row.date,
    order: row.order ?? 10,
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  };
}

// Sanity Mappers to convert Sanity objects directly to app entities

function mapSanitySiteSettings(doc: any): SiteSettings {
  return {
    id: doc._id,
    sanityId: doc._id,
    siteName: doc.siteName || '',
    siteUrl: doc.siteUrl || '',
    siteDescription: doc.siteDescription || null,
    siteKeywords: doc.siteKeywords || [],
    siteImageUrl: getSanityImageUrl(doc.siteImage) || '/profile-image.jpg',
    logoInitials: doc.logoInitials || '',
    twitterHandle: doc.twitterHandle || '',
    themeColor: doc.themeColor || '#6366f1',
    updatedAt: new Date(),
  };
}

function mapSanityProfile(doc: any): Profile {
  return {
    id: doc._id,
    sanityId: doc._id,
    fullName: doc.fullName || '',
    shortName: doc.shortName || '',
    profileImageUrl: getSanityImageUrl(doc.profileImage) || '/profile_pic.jpg',
    heroImageUrl: getSanityImageUrl(doc.heroImage) || '/home2.webp',
    typewriterTitles: doc.typewriterTitles || [],
    heroBio: doc.heroBio || '',
    aboutParagraphs: doc.aboutParagraphs || [],
    infoGrid: doc.infoGrid || {},
    resumeFileUrl: getSanityFileUrl(doc.resumeFile) || '/resume.pdf',
    resumeFileName:
      doc.resumeFileName ||
      (doc.fullName ? `Resume_${doc.fullName.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf` : 'Resume.pdf'),
    driveUrl: doc.driveUrl || '',
    drivePassword: doc.drivePassword || '',
    updatedAt: new Date(),
  };
}

function mapSanitySocialLink(doc: any): SocialLink {
  return {
    id: doc._id,
    sanityId: doc._id,
    platform: doc.platform,
    label: doc.label,
    url: doc.url,
    section: doc.section || 'both',
    order: doc.order ?? 10,
    updatedAt: new Date(),
  };
}

function mapSanityEducation(doc: any): Education {
  return {
    id: doc._id,
    sanityId: doc._id,
    period: doc.period,
    title: doc.title,
    institution: doc.institution,
    description: doc.description || null,
    order: doc.order ?? 10,
    updatedAt: new Date(),
  };
}

function mapSanityExperience(doc: any): Experience {
  return {
    id: doc._id,
    sanityId: doc._id,
    period: doc.period,
    title: doc.title,
    location: doc.location,
    description: doc.description,
    order: doc.order ?? 10,
    updatedAt: new Date(),
  };
}

function mapSanitySkillCategory(doc: any): SkillCategory {
  return {
    id: doc._id,
    sanityId: doc._id,
    categoryId: doc.categoryId,
    title: doc.title,
    order: doc.order ?? 10,
    skills: doc.skills || [],
    updatedAt: new Date(),
  };
}

function mapSanityProject(doc: any): Project {
  return {
    id: doc._id,
    sanityId: doc._id,
    title: doc.title,
    slug: doc.slug?.current || doc._id,
    category: doc.category || 'all',
    description: doc.description,
    imageUrl: getSanityImageUrl(doc.mainImage) || '/demo.png',
    techStack: doc.techStack || [],
    githubUrl: doc.githubUrl || null,
    liveUrl: doc.liveUrl || null,
    featured: Boolean(doc.featured),
    order: doc.order ?? 10,
    updatedAt: new Date(),
  };
}

function mapSanityPost(doc: any): Post {
  return {
    id: doc._id,
    sanityId: doc._id,
    title: doc.title,
    slug: doc.slug?.current || doc._id,
    author: doc.author || '',
    imageUrl: getSanityImageUrl(doc.mainImage) || '/demo.png',
    category: doc.category || 'General',
    tags: doc.tags || [],
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt) : new Date(),
    excerpt: doc.excerpt || '',
    featured: Boolean(doc.featured),
    body: doc.body || [],
    updatedAt: new Date(),
  };
}

function mapSanityResearch(doc: any): ResearchItem {
  return {
    id: doc._id,
    sanityId: doc._id,
    title: doc.title,
    slug: doc.slug?.current || doc._id,
    conference: doc.conference,
    year: String(doc.year),
    abstract: doc.abstract,
    authors: doc.authors || [],
    pdfUrl: doc.pdfUrl || null,
    doi: doc.doi || null,
    order: doc.order ?? 10,
    updatedAt: new Date(),
  };
}

function mapSanityAchievement(doc: any): Achievement {
  return {
    id: doc._id,
    sanityId: doc._id,
    type: doc.type,
    platformName: doc.platformName || null,
    account: doc.account || null,
    accountUrl: doc.accountUrl || null,
    highestRating: doc.highestRating || null,
    solveCount: doc.solveCount || null,
    contestCount: doc.contestCount || null,
    contestName: doc.contestName || null,
    date: doc.date || null,
    result: doc.result || null,
    description: doc.description || null,
    order: doc.order ?? 10,
    updatedAt: new Date(),
  };
}

function mapSanityActivity(doc: any): Activity {
  return {
    id: doc._id,
    sanityId: doc._id,
    title: doc.title,
    description: doc.description,
    iconKey: doc.iconKey,
    date: doc.date,
    order: doc.order ?? 10,
    updatedAt: new Date(),
  };
}

/**
 * Service to retrieve content with seamless fallback.
 * Primary: Supabase PostgreSQL via Row Level Security (RLS)
 * Fallback: Sanity Content Lake via CDN
 */

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const { data } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
    if (data) {
      return normalizeSiteSettings(data);
    }
  } catch (err) {
    console.warn('Supabase site_settings query failed, falling back to Sanity:', err);
  }
  try {
    const sanityDoc = await getSanitySiteSettings();
    return sanityDoc ? mapSanitySiteSettings(sanityDoc) : null;
  } catch (err) {
    console.error('Failed to fetch site_settings from Sanity fallback:', err);
    return null;
  }
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const { data } = await supabase.from('profiles').select('*').limit(1).maybeSingle();
    if (data) {
      return normalizeProfile(data);
    }
  } catch (err) {
    console.warn('Supabase profiles query failed, falling back to Sanity:', err);
  }
  try {
    const sanityDoc = await getSanityProfile();
    return sanityDoc ? mapSanityProfile(sanityDoc) : null;
  } catch (err) {
    console.error('Failed to fetch profile from Sanity fallback:', err);
    return null;
  }
}

export async function getSocialLinks(section?: 'home' | 'contact'): Promise<SocialLink[]> {
  try {
    let query = supabase.from('social_links').select('*').order('order', { ascending: true });
    if (section) {
      query = query.or(`section.eq.${section},section.eq.both`);
    }
    const { data } = await query;
    if (data && data.length > 0) {
      return data.map(normalizeSocialLink);
    }
  } catch (err) {
    console.warn('Supabase social_links query failed, falling back to Sanity:', err);
  }
  try {
    const sanityDocs = await getSanitySocialLinks(section);
    return (sanityDocs || []).map(mapSanitySocialLink);
  } catch (err) {
    console.error('Failed to fetch social_links from Sanity fallback:', err);
    return [];
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const { data } = await supabase.from('education').select('*').order('order', { ascending: true });
    if (data && data.length > 0) {
      return data.map(normalizeEducation);
    }
  } catch (err) {
    console.warn('Supabase education query failed, falling back to Sanity:', err);
  }
  try {
    const sanityDocs = await getSanityEducation();
    return (sanityDocs || []).map(mapSanityEducation);
  } catch (err) {
    console.error('Failed to fetch education from Sanity fallback:', err);
    return [];
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    const { data } = await supabase.from('experience').select('*').order('order', { ascending: true });
    if (data && data.length > 0) {
      return data.map(normalizeExperience);
    }
  } catch (err) {
    console.warn('Supabase experience query failed, falling back to Sanity:', err);
  }
  try {
    const sanityDocs = await getSanityExperience();
    return (sanityDocs || []).map(mapSanityExperience);
  } catch (err) {
    console.error('Failed to fetch experience from Sanity fallback:', err);
    return [];
  }
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
  try {
    const { data } = await supabase.from('skill_categories').select('*').order('order', { ascending: true });
    if (data && data.length > 0) {
      return data.map(normalizeSkillCategory);
    }
  } catch (err) {
    console.warn('Supabase skill_categories query failed, falling back to Sanity:', err);
  }
  try {
    const sanityDocs = await getSanitySkillCategories();
    return (sanityDocs || []).map(mapSanitySkillCategory);
  } catch (err) {
    console.error('Failed to fetch skill_categories from Sanity fallback:', err);
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { data } = await supabase.from('projects').select('*').order('order', { ascending: true });
    if (data && data.length > 0) {
      return data.map(normalizeProject);
    }
  } catch (err) {
    console.warn('Supabase projects query failed, falling back to Sanity:', err);
  }
  try {
    const sanityDocs = await getSanityProjects();
    return (sanityDocs || []).map(mapSanityProject);
  } catch (err) {
    console.error('Failed to fetch projects from Sanity fallback:', err);
    return [];
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false });
    if (data && data.length > 0) {
      return data.map(normalizePost);
    }
  } catch (err) {
    console.warn('Supabase posts query failed, falling back to Sanity:', err);
  }
  try {
    const sanityDocs = await getSanityPosts();
    return (sanityDocs || []).map(mapSanityPost);
  } catch (err) {
    console.error('Failed to fetch posts from Sanity fallback:', err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data } = await supabase.from('posts').select('*').eq('slug', slug).maybeSingle();
    if (data) {
      return normalizePost(data);
    }
  } catch (err) {
    console.warn(`Supabase post [${slug}] query failed, falling back to Sanity:`, err);
  }
  try {
    const sanityDoc = await getSanityPostBySlug(slug);
    return sanityDoc ? mapSanityPost(sanityDoc) : null;
  } catch (err) {
    console.error(`Failed to fetch post [${slug}] from Sanity fallback:`, err);
    return null;
  }
}

export async function getResearch(): Promise<ResearchItem[]> {
  try {
    const { data } = await supabase.from('research').select('*').order('order', { ascending: true });
    if (data && data.length > 0) {
      return data.map(normalizeResearch);
    }
  } catch (err) {
    console.warn('Supabase research query failed, falling back to Sanity:', err);
  }
  try {
    const sanityDocs = await getSanityResearch();
    return (sanityDocs || []).map(mapSanityResearch);
  } catch (err) {
    console.error('Failed to fetch research from Sanity fallback:', err);
    return [];
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    const { data } = await supabase.from('achievements').select('*').order('order', { ascending: true });
    if (data && data.length > 0) {
      return data.map(normalizeAchievement);
    }
  } catch (err) {
    console.warn('Supabase achievements query failed, falling back to Sanity:', err);
  }
  try {
    const sanityDocs = await getSanityAchievements();
    return (sanityDocs || []).map(mapSanityAchievement);
  } catch (err) {
    console.error('Failed to fetch achievements from Sanity fallback:', err);
    return [];
  }
}

export async function getActivities(): Promise<Activity[]> {
  try {
    const { data } = await supabase.from('activities').select('*').order('order', { ascending: true });
    if (data && data.length > 0) {
      return data.map(normalizeActivity);
    }
  } catch (err) {
    console.warn('Supabase activities query failed, falling back to Sanity:', err);
  }
  try {
    const sanityDocs = await getSanityActivities();
    return (sanityDocs || []).map(mapSanityActivity);
  } catch (err) {
    console.error('Failed to fetch activities from Sanity fallback:', err);
    return [];
  }
}
