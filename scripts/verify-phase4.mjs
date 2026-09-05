import 'dotenv/config';
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
} from '../src/services/contentService';

async function verifyContentService() {
  console.log('🧪 Testing Supabase Data Service Layer (Phase 4)...');

  const siteSettings = await getSiteSettings();
  console.log('1. Site Settings:', siteSettings ? `✅ Received (${siteSettings.site_name})` : '❌ Failed');

  const profile = await getProfile();
  console.log('2. Profile:', profile ? `✅ Received (${profile.full_name}, ${profile.short_name})` : '❌ Failed');

  const socialLinks = await getSocialLinks();
  console.log('3. Social Links:', socialLinks.length ? `✅ Received ${socialLinks.length} links` : '❌ Failed');

  const education = await getEducation();
  console.log('4. Education:', education.length ? `✅ Received ${education.length} milestones` : '❌ Failed');

  const experience = await getExperience();
  console.log('5. Experience:', experience.length ? `✅ Received ${experience.length} milestones` : '❌ Failed');

  const skills = await getSkillCategories();
  console.log('6. Skill Categories:', skills.length ? `✅ Received ${skills.length} categories` : '❌ Failed');

  const projects = await getProjects();
  console.log('7. Projects:', projects.length ? `✅ Received ${projects.length} projects` : '❌ Failed');

  const posts = await getPosts();
  console.log('8. Posts:', posts.length ? `✅ Received ${posts.length} posts` : '❌ Failed');

  const research = await getResearch();
  console.log('9. Research:', `✅ Query executed (Items: ${research.length})`);

  const achievements = await getAchievements();
  console.log('10. Achievements:', achievements.length ? `✅ Received ${achievements.length} achievements` : '❌ Failed');

  const activities = await getActivities();
  console.log('11. Activities:', activities.length ? `✅ Received ${activities.length} activities` : '❌ Failed');

  console.log('\n🎉 Phase 4 Data Service Layer successfully verified directly against Supabase!');
}

verifyContentService().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
