import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'oxu258yz',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function seed() {
  console.log('🚀 Checking Sanity Studio documents...');
  const profileCount = await client.fetch('count(*[_type == "profile"])');
  if (profileCount > 0) {
    console.log(`⚠️ Documents already exist in Sanity (${profileCount} profiles). Skipping default seed to preserve your custom data.`);
    return;
  }

  // 1. Site Settings
  const siteSettingsDoc = {
    _id: 'siteSettings_singleton',
    _type: 'siteSettings',
    siteName: 'Prof. Dr. GM Atiqur Rahaman',
    siteUrl: process.env.VITE_SITE_URL || 'https://portfolio.local',
    siteDescription: 'Official academic and research portfolio of Prof. Dr. GM Atiqur Rahaman.',
    siteKeywords: [
      'Prof. Dr. GM Atiqur Rahaman',
      'Professor',
      'Researcher',
      'Computer Science',
      'Portfolio',
    ],
    logoInitials: 'AR',
    themeColor: '#6366f1',
  };
  await client.createOrReplace(siteSettingsDoc);
  console.log('✅ Created siteSettings singleton');

  // 2. Profile
  const profileDoc = {
    _id: 'profile_singleton',
    _type: 'profile',
    fullName: 'Prof. Dr. GM Atiqur Rahaman',
    shortName: 'GM Atiqur Rahaman',
    typewriterTitles: [
      'Professor & Researcher',
      'Computer Scientist',
      'Academician',
    ],
    heroBio: 'Professor and Researcher with a dedication to advancing computer science research and education.',
    aboutParagraphs: [
      'Academic and researcher focused on cutting-edge computer science domains, machine learning, and higher education mentoring.',
    ],
    infoGrid: {
      name: 'Prof. Dr. GM Atiqur Rahaman',
      field: 'Computer Science & Engineering',
    },
    resumeFileName: 'Resume_Prof_Dr_GM_Atiqur_Rahaman.pdf',
  };
  await client.createOrReplace(profileDoc);
  console.log('✅ Created profile singleton');

  // 3. Social Links
  const socialLinks = [
    {
      id: 'social_scholar',
      platform: 'scholar',
      label: 'Google Scholar',
      url: 'https://scholar.google.com',
      section: 'all',
      order: 1,
    },
    {
      id: 'social_rg',
      platform: 'researchgate',
      label: 'ResearchGate',
      url: 'https://www.researchgate.net',
      section: 'all',
      order: 2,
    },
    {
      id: 'social_linkedin',
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com',
      section: 'all',
      order: 3,
    },
    {
      id: 'social_github',
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com',
      section: 'all',
      order: 4,
    },
  ];

  for (const item of socialLinks) {
    await client.createOrReplace({
      _id: item.id,
      _type: 'socialLink',
      platform: item.platform,
      label: item.label,
      url: item.url,
      section: item.section,
      order: item.order,
    });
  }
  console.log(`✅ Created ${socialLinks.length} social link documents`);

  // 4. Education
  const educationItems = [
    {
      id: 'edu_phd',
      period: 'Completed',
      title: 'Ph.D. in Computer Science & Engineering',
      institution: 'University',
      description: 'Doctoral research and dissertation in Computer Science.',
      order: 1,
    },
    {
      id: 'edu_msc',
      period: 'Completed',
      title: 'M.Sc. in Computer Science & Engineering',
      institution: 'University',
      description: 'Master of Science in Computer Science & Engineering.',
      order: 2,
    },
    {
      id: 'edu_bsc',
      period: 'Completed',
      title: 'B.Sc. in Computer Science & Engineering',
      institution: 'University',
      description: 'Bachelor of Science in Computer Science & Engineering.',
      order: 3,
    },
  ];

  for (const item of educationItems) {
    await client.createOrReplace({
      _id: item.id,
      _type: 'education',
      period: item.period,
      title: item.title,
      institution: item.institution,
      description: item.description,
      order: item.order,
    });
  }
  console.log(`✅ Created ${educationItems.length} education milestone documents`);

  // 5. Experience
  const expItems = [
    {
      id: 'exp_prof',
      period: 'Present',
      title: 'Professor',
      location: 'Department of Computer Science & Engineering',
      description: 'Teaching, research supervision, academic leadership, and curriculum development.',
      order: 1,
    },
  ];

  for (const item of expItems) {
    await client.createOrReplace({
      _id: item.id,
      _type: 'experience',
      period: item.period,
      title: item.title,
      location: item.location,
      description: item.description,
      order: item.order,
    });
  }
  console.log(`✅ Created ${expItems.length} experience documents`);

  // 6. Skill Categories
  const skillCategories = [
    {
      id: 'skill_research',
      categoryId: 'research',
      title: 'Research & Expertise',
      order: 1,
      skills: [
        { name: 'Machine Learning', iconKey: 'scikitlearn', level: '95%', years: '10+ years' },
        { name: 'Artificial Intelligence', iconKey: 'python', level: '90%', years: '10+ years' },
        { name: 'Data Science & Analytics', iconKey: 'pandas', level: '90%', years: '8+ years' },
      ],
    },
    {
      id: 'skill_prog',
      categoryId: 'programming',
      title: 'Programming & Technologies',
      order: 2,
      skills: [
        { name: 'Python', iconKey: 'python', level: '90%', years: '8+ years' },
        { name: 'C/C++', iconKey: 'cpp', level: '85%', years: '10+ years' },
        { name: 'Java', iconKey: 'java', level: '80%', years: '8+ years' },
      ],
    },
  ];

  for (const cat of skillCategories) {
    await client.createOrReplace({
      _id: cat.id,
      _type: 'skillCategory',
      categoryId: cat.categoryId,
      title: cat.title,
      order: cat.order,
      skills: cat.skills,
    });
  }
  console.log(`✅ Created ${skillCategories.length} skill category documents`);

  // 7. Activities
  const activities = [
    {
      _id: 'act_review',
      _type: 'activity',
      title: 'Peer Review & Editorial Activities',
      description: 'Peer reviewer for prominent international journals and conferences.',
      iconKey: 'code',
      date: 'Ongoing',
      order: 1,
    },
  ];

  for (const act of activities) {
    await client.createOrReplace({
      _id: act.id,
      _type: 'activity',
      title: act.title,
      description: act.description,
      iconKey: act.iconKey,
      date: act.date,
      order: act.order,
    });
  }
  console.log(`✅ Created ${activities.length} activity documents`);

  console.log('🎉 Sanity Studio Content Lake successfully seeded!');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
