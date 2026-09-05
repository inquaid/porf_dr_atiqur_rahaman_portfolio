import {
  getSiteSettings,
  getProfile,
  getSocialLinks,
  getEducation,
  getExperience,
  getSkillCategories,
  getProjects,
  getPosts,
  getResearch,
  getAchievements,
  getActivities,
} from '../src/services/contentService.ts';
import dotenv from 'dotenv';

dotenv.config();

async function verifyWebsiteAccess() {
  console.log('🌐 Testing Website Public Client Access (Supabase RLS & Queries)...');

  const siteSettings = await getSiteSettings();
  console.log('✓ siteSettings:', siteSettings ? `Loaded "${siteSettings.siteName}"` : 'NULL');

  const profile = await getProfile();
  console.log('✓ profile:', profile ? `Loaded "${profile.fullName}"` : 'NULL');

  const socialLinks = await getSocialLinks();
  console.log(`✓ socialLinks: Loaded ${socialLinks.length} links`);

  const education = await getEducation();
  console.log(`✓ education: Loaded ${education.length} items`);

  const experience = await getExperience();
  console.log(`✓ experience: Loaded ${experience.length} items`);

  const skills = await getSkillCategories();
  console.log(`✓ skills: Loaded ${skills.length} categories`);

  const projects = await getProjects();
  console.log(`✓ projects: Loaded ${projects.length} projects`);

  const posts = await getPosts();
  console.log(`✓ posts: Loaded ${posts.length} posts`);

  const research = await getResearch();
  console.log(`✓ research: Loaded ${research.length} papers`);

  const achievements = await getAchievements();
  console.log(`✓ achievements: Loaded ${achievements.length} achievements`);

  const activities = await getActivities();
  console.log(`✓ activities: Loaded ${activities.length} activities`);

  const allPassed =
    siteSettings &&
    profile &&
    socialLinks.length > 0 &&
    education.length > 0 &&
    experience.length > 0 &&
    skills.length > 0 &&
    projects.length > 0 &&
    posts.length > 0 &&
    research.length > 0 &&
    achievements.length > 0 &&
    activities.length > 0;

  if (allPassed) {
    console.log('\n🎉 ALL 11 CONTENT TYPES VERIFIED VIA PUBLIC CLIENT WITH ACTIVE DATA!');
  } else {
    console.error('\n❌ Some content types failed public client verification!');
    process.exit(1);
  }
}

verifyWebsiteAccess().catch((err) => {
  console.error('Error verifying website access:', err);
  process.exit(1);
});
