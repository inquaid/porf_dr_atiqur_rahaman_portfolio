import { sanityClient } from '../lib/sanity';
import type {
  SanityPost,
  SanityProject,
  SanityResearch,
  SanitySiteSettings,
  SanityProfile,
  SanitySocialLink,
  SanityEducation,
  SanityExperience,
  SanitySkillCategory,
  SanityAchievement,
  SanityActivity,
} from './types';

/**
 * Highly-optimized GROQ queries fetching only required fields for minimal payload.
 */

export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author,
  mainImage,
  category,
  tags,
  publishedAt,
  excerpt,
  featured
}`;

export const FEATURED_POSTS_QUERY = `*[_type == "post" && defined(slug.current) && featured == true] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  author,
  mainImage,
  category,
  tags,
  publishedAt,
  excerpt,
  featured
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author,
  mainImage,
  category,
  tags,
  publishedAt,
  excerpt,
  featured,
  body
}`;

export const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current)] | order(order asc, _createdAt desc) {
  _id,
  title,
  slug,
  category,
  description,
  mainImage,
  techStack,
  githubUrl,
  liveUrl,
  featured,
  order
}`;

export const RESEARCH_QUERY = `*[_type == "research" && defined(slug.current)] | order(order asc, year desc) {
  _id,
  title,
  slug,
  conference,
  year,
  abstract,
  authors,
  pdfUrl,
  doi,
  order
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  _id,
  siteName,
  siteUrl,
  siteDescription,
  siteKeywords,
  siteImage,
  logoInitials,
  twitterHandle,
  themeColor
}`;

export const PROFILE_QUERY = `*[_type == "profile"][0] {
  _id,
  fullName,
  shortName,
  profileImage,
  heroImage,
  typewriterTitles,
  heroBio,
  aboutParagraphs,
  infoGrid,
  resumeFile,
  resumeFileName,
  driveUrl,
  drivePassword
}`;

export const SOCIAL_LINKS_QUERY = `*[_type == "socialLink"] | order(order asc) {
  _id,
  platform,
  label,
  url,
  section,
  order
}`;

export const EDUCATION_QUERY = `*[_type == "education"] | order(order asc) {
  _id,
  period,
  title,
  institution,
  description,
  order
}`;

export const EXPERIENCE_QUERY = `*[_type == "experience"] | order(order asc) {
  _id,
  period,
  title,
  location,
  description,
  order
}`;

export const SKILL_CATEGORIES_QUERY = `*[_type == "skillCategory"] | order(order asc) {
  _id,
  categoryId,
  title,
  order,
  skills
}`;

export const ACHIEVEMENTS_QUERY = `*[_type == "achievement"] | order(order asc) {
  _id,
  type,
  platformName,
  account,
  accountUrl,
  highestRating,
  solveCount,
  contestCount,
  contestName,
  date,
  result,
  description,
  order
}`;

export const ACTIVITIES_QUERY = `*[_type == "activity"] | order(order asc) {
  _id,
  title,
  description,
  iconKey,
  date,
  order
}`;

/**
 * Fetch all published blog posts.
 */
export async function getSanityPosts(): Promise<SanityPost[]> {
  return sanityClient.fetch<SanityPost[]>(POSTS_QUERY);
}

/**
 * Fetch a single blog post by slug.
 */
export async function getSanityPostBySlug(slug: string): Promise<SanityPost | null> {
  return sanityClient.fetch<SanityPost | null>(POST_BY_SLUG_QUERY, { slug });
}

/**
 * Fetch all projects.
 */
export async function getSanityProjects(): Promise<SanityProject[]> {
  return sanityClient.fetch<SanityProject[]>(PROJECTS_QUERY);
}

/**
 * Fetch all research items.
 */
export async function getSanityResearch(): Promise<SanityResearch[]> {
  return sanityClient.fetch<SanityResearch[]>(RESEARCH_QUERY);
}

/**
 * Fetch singleton site settings.
 */
export async function getSanitySiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityClient.fetch<SanitySiteSettings | null>(SITE_SETTINGS_QUERY);
}

/**
 * Fetch singleton profile.
 */
export async function getSanityProfile(): Promise<SanityProfile | null> {
  return sanityClient.fetch<SanityProfile | null>(PROFILE_QUERY);
}

/**
 * Fetch social links, optionally filtered by section ('home' | 'contact').
 */
export async function getSanitySocialLinks(
  section?: 'home' | 'contact'
): Promise<SanitySocialLink[]> {
  const links = await sanityClient.fetch<SanitySocialLink[]>(SOCIAL_LINKS_QUERY);
  if (!section) return links;
  return links.filter((link) => link.section === 'both' || link.section === section);
}

/**
 * Fetch education history.
 */
export async function getSanityEducation(): Promise<SanityEducation[]> {
  return sanityClient.fetch<SanityEducation[]>(EDUCATION_QUERY);
}

/**
 * Fetch experience milestones.
 */
export async function getSanityExperience(): Promise<SanityExperience[]> {
  return sanityClient.fetch<SanityExperience[]>(EXPERIENCE_QUERY);
}

/**
 * Fetch skill categories with skills list.
 */
export async function getSanitySkillCategories(): Promise<SanitySkillCategory[]> {
  return sanityClient.fetch<SanitySkillCategory[]>(SKILL_CATEGORIES_QUERY);
}

/**
 * Fetch achievements and contest history.
 */
export async function getSanityAchievements(): Promise<SanityAchievement[]> {
  return sanityClient.fetch<SanityAchievement[]>(ACHIEVEMENTS_QUERY);
}

/**
 * Fetch extracurricular activities.
 */
export async function getSanityActivities(): Promise<SanityActivity[]> {
  return sanityClient.fetch<SanityActivity[]>(ACTIVITIES_QUERY);
}
