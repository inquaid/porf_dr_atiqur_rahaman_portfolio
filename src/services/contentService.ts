import { supabase } from '../lib/supabase';
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

/**
 * Service to retrieve content directly from Supabase PostgreSQL.
 * All public read operations are secured via PostgreSQL Row Level Security (RLS).
 */

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
    if (error) {
      console.error('Error fetching site_settings from Supabase:', error.message);
      return null;
    }
    return data ? normalizeSiteSettings(data) : null;
  } catch (err) {
    console.error('Failed to fetch site_settings:', err);
    return null;
  }
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1).maybeSingle();
    if (error) {
      console.error('Error fetching profiles from Supabase:', error.message);
      return null;
    }
    return data ? normalizeProfile(data) : null;
  } catch (err) {
    console.error('Failed to fetch profiles:', err);
    return null;
  }
}

export async function getSocialLinks(section?: 'home' | 'contact'): Promise<SocialLink[]> {
  try {
    let query = supabase.from('social_links').select('*').order('order', { ascending: true });
    if (section) {
      query = query.or(`section.eq.${section},section.eq.both`);
    }
    const { data, error } = await query;
    if (error) {
      console.error('Error fetching social_links from Supabase:', error.message);
      return [];
    }
    return (data || []).map(normalizeSocialLink);
  } catch (err) {
    console.error('Failed to fetch social_links:', err);
    return [];
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const { data, error } = await supabase.from('education').select('*').order('order', { ascending: true });
    if (error) {
      console.error('Error fetching education from Supabase:', error.message);
      return [];
    }
    return (data || []).map(normalizeEducation);
  } catch (err) {
    console.error('Failed to fetch education:', err);
    return [];
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    const { data, error } = await supabase.from('experience').select('*').order('order', { ascending: true });
    if (error) {
      console.error('Error fetching experience from Supabase:', error.message);
      return [];
    }
    return (data || []).map(normalizeExperience);
  } catch (err) {
    console.error('Failed to fetch experience:', err);
    return [];
  }
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
  try {
    const { data, error } = await supabase.from('skill_categories').select('*').order('order', { ascending: true });
    if (error) {
      console.error('Error fetching skill_categories from Supabase:', error.message);
      return [];
    }
    return (data || []).map(normalizeSkillCategory);
  } catch (err) {
    console.error('Failed to fetch skill_categories:', err);
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase.from('projects').select('*').order('order', { ascending: true });
    if (error) {
      console.error('Error fetching projects from Supabase:', error.message);
      return [];
    }
    return (data || []).map(normalizeProject);
  } catch (err) {
    console.error('Failed to fetch projects:', err);
    return [];
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false });
    if (error) {
      console.error('Error fetching posts from Supabase:', error.message);
      return [];
    }
    return (data || []).map(normalizePost);
  } catch (err) {
    console.error('Failed to fetch posts:', err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).maybeSingle();
    if (error) {
      console.error(`Error fetching post [${slug}] from Supabase:`, error.message);
      return null;
    }
    return data ? normalizePost(data) : null;
  } catch (err) {
    console.error(`Failed to fetch post [${slug}]:`, err);
    return null;
  }
}

export async function getResearch(): Promise<ResearchItem[]> {
  try {
    const { data, error } = await supabase.from('research').select('*').order('order', { ascending: true });
    if (error) {
      console.error('Error fetching research from Supabase:', error.message);
      return [];
    }
    return (data || []).map(normalizeResearch);
  } catch (err) {
    console.error('Failed to fetch research:', err);
    return [];
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    const { data, error } = await supabase.from('achievements').select('*').order('order', { ascending: true });
    if (error) {
      console.error('Error fetching achievements from Supabase:', error.message);
      return [];
    }
    return (data || []).map(normalizeAchievement);
  } catch (err) {
    console.error('Failed to fetch achievements:', err);
    return [];
  }
}

export async function getActivities(): Promise<Activity[]> {
  try {
    const { data, error } = await supabase.from('activities').select('*').order('order', { ascending: true });
    if (error) {
      console.error('Error fetching activities from Supabase:', error.message);
      return [];
    }
    return (data || []).map(normalizeActivity);
  } catch (err) {
    console.error('Failed to fetch activities:', err);
    return [];
  }
}
