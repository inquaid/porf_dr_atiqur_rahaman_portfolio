import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'naf7d8as',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function seed() {
  console.log('🚀 Seeding / Updating Sanity Studio with default portfolio documents...');

  // 1. Site Settings
  const siteSettingsDoc = {
    _id: 'siteSettings_singleton',
    _type: 'siteSettings',
    siteName: 'Azmain Inquaid Haque',
    siteUrl: 'https://azmaininquaid.mind-byte.com',
    siteDescription:
      'Official portfolio of Azmain Inquaid Haque – Researcher specializing in AI/ML, UI/UX design, React, Node.js, and competitive problem solving. Based in Khulna, Bangladesh.',
    siteKeywords: [
      'Azmain Inquaid Haque',
      'Researcher',
      'AI ML Engineer',
      'UI UX Designer',
      'React Developer',
      'Competitive Programming',
      'Khulna University',
      'Portfolio',
    ],
    logoInitials: 'AI',
    twitterHandle: '@azmain_inquaid',
    themeColor: '#6366f1',
  };
  await client.createOrReplace(siteSettingsDoc);
  console.log('✅ Created siteSettings singleton');

  // 2. Profile
  const profileDoc = {
    _id: 'profile_singleton',
    _type: 'profile',
    fullName: 'Azmain Inquaid Haque',
    shortName: 'Azmain Inquaid',
    typewriterTitles: [
      'Learner & Problem Solver',
      'Researcher',
      'AI/ML Enthusiast',
      'Competitive Programmer',
      'Tech Explorer',
    ],
    heroBio:
      "I'm currently pursuing a BSc at Khulna University with a strong passion for problem solving and emerging technologies. My interests lie in Artificial Intelligence, Machine Learning, and Robotics. I enjoy tackling real-world challenges through code and constantly seek opportunities to learn and build innovative solutions.",
    aboutParagraphs: [
      "I'm a driven Computer Science and Engineering student at Khulna University with hands-on expertise spanning robotics (Arduino), AI/ML, software development, and creative digital design. My passion lies in building impactful technology solutions that bridge hardware and software to solve real-world challenges.",
      "Through academic projects and self-driven exploration, I've cultivated a versatile skill set—from programming and electronics to multimedia tools like Photoshop, Illustrator, and Premiere Pro. I thrive in collaborative environments and constantly seek new domains to innovate in, whether it's intelligent systems or interactive digital experiences.",
    ],
    infoGrid: {
      name: 'Azmain Inquaid Haque',
      email: 'azmaininquaidhaque@gmail.com',
      phone: '+8801320356909',
      location: 'Khulna, Bangladesh',
      field: 'Computer Science',
    },
    resumeFileName: 'Resume_Azmain_Inquaid_Haque.pdf',
    driveUrl:
      'https://drive.google.com/drive/folders/1AjPKExOHfQOYoltJLqh_AyYTay3sRiMj?usp=drive_link',
    drivePassword: '1234',
  };
  await client.createOrReplace(profileDoc);
  console.log('✅ Created profile singleton');

  // 3. Social Links
  const socialLinks = [
    { id: 'social_github', platform: 'GitHub', label: 'GitHub', url: 'https://github.com/inquaid', section: 'both', order: 1 },
    { id: 'social_linkedin', platform: 'LinkedIn', label: 'LinkedIn', url: 'https://www.linkedin.com/in/azmain-inquaid-haque-44a4b62b1/', section: 'both', order: 2 },
    { id: 'social_twitter', platform: 'Twitter', label: 'Twitter / X', url: 'https://x.com/azmain_inquaid', section: 'both', order: 3 },
    { id: 'social_email', platform: 'Email', label: 'Email', url: 'mailto:azmaininquaidhaque@gmail.com', section: 'both', order: 4 },
    { id: 'social_researchgate', platform: 'ResearchGate', label: 'ResearchGate', url: 'https://www.researchgate.net/profile/Azmain-Inquaid-Haque?ev=hdr_xprf', section: 'home', order: 5 },
    { id: 'social_codeforces', platform: 'Codeforces', label: 'Codeforces', url: 'https://codeforces.com/profile/luffy_18', section: 'home', order: 6 },
    { id: 'social_codechef', platform: 'CodeChef', label: 'CodeChef', url: 'https://www.codechef.com/users/turjooo', section: 'home', order: 7 },
    { id: 'social_atcoder', platform: 'AtCoder', label: 'AtCoder', url: 'https://atcoder.jp/users/turjooo', section: 'home', order: 8 },
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
      id: 'edu_bsc',
      period: '2023 - Present',
      title: 'BSc in Computer Science and Engineering',
      institution: 'Khulna University, Bangladesh',
      description: 'Currently pursuing BSc in Computer Science and Engineering.',
      order: 1,
    },
    {
      id: 'edu_hsc',
      period: '2020 - 2021',
      title: 'Higher Secondary Certificate (HSC)',
      institution: 'Satkhira Govt. College',
      description: 'Completed HSC in Science group.',
      order: 2,
    },
    {
      id: 'edu_ssc',
      period: '2018 - 2019',
      title: 'Secondary School Certificate (SSC)',
      institution: 'Satkhira Govt. High School',
      description: 'Completed SSC in Science group.',
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
      id: 'exp_tedx',
      period: 'Fall 2024',
      title: 'Creative Designer',
      location: 'TEDx Khulna University',
      description:
        "Responsible for the creative direction and visual design of event logos, promotional posters, stage banners, and multimedia assets for TEDx Khulna University.",
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
      id: 'skill_prog',
      categoryId: 'programming',
      title: 'Programming Languages',
      order: 1,
      skills: [
        { name: 'C/C++', iconKey: 'cpp', level: '85%', years: '3+ years' },
        { name: 'Python', iconKey: 'python', level: '80%', years: '2+ years' },
        { name: 'Java', iconKey: 'java', level: '75%', years: '2+ years' },
        { name: 'PHP', iconKey: 'php', level: '95%', years: '6+ years' },
        { name: 'Javascript', iconKey: 'javascript', level: '95%', years: '6+ years' },
      ],
    },
    {
      id: 'skill_front',
      categoryId: 'frontend',
      title: 'Frontend Development',
      order: 2,
      skills: [
        { name: 'HTML5', iconKey: 'html', level: '90%', years: '5+ years' },
        { name: 'CSS3', iconKey: 'css', level: '85%', years: '5+ years' },
        { name: 'React', iconKey: 'react', level: '85%', years: '3+ years' },
        { name: 'Figma', iconKey: 'figma', level: '80%', years: '2+ years' },
      ],
    },
    {
      id: 'skill_back',
      categoryId: 'backend',
      title: 'Backend & Infrastructure',
      order: 3,
      skills: [
        { name: 'SQL', iconKey: 'sql', level: '85%', years: '5+ years' },
        { name: 'PostgreSQL', iconKey: 'postgresql', level: '80%', years: '2+ years' },
        { name: 'Git & GitHub', iconKey: 'git', level: '90%', years: '4+ years' },
        { name: 'Linux / Bash', iconKey: 'linux', level: '80%', years: '3+ years' },
      ],
    },
    {
      id: 'skill_ml',
      categoryId: 'ml',
      title: 'Machine Learning',
      order: 4,
      skills: [
        { name: 'Scikit-learn', iconKey: 'scikitlearn', level: '75%', years: '2+ years' },
        { name: 'Pandas & NumPy', iconKey: 'pandas', level: '80%', years: '2+ years' },
        { name: 'OpenCV', iconKey: 'opencv', level: '75%', years: '2+ years' },
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

  // 7. Achievements (Platforms + Contests)
  const achievements = [
    {
      _id: 'achieve_cf',
      _type: 'achievement',
      type: 'platform',
      platformName: 'Codeforces',
      account: 'luffy_18',
      accountUrl: 'https://codeforces.com/profile/Luffy_18',
      highestRating: 'Specialist (1406)',
      solveCount: '700+ problems',
      contestCount: '50+ contests',
      order: 1,
    },
    {
      _id: 'achieve_cc',
      _type: 'achievement',
      type: 'platform',
      platformName: 'CodeChef',
      account: 'turjooo',
      accountUrl: 'https://www.codechef.com/users/turjooo',
      highestRating: '3★ (1653)',
      solveCount: '280+ problems',
      contestCount: '25+ contests',
      order: 2,
    },
    {
      _id: 'achieve_lc',
      _type: 'achievement',
      type: 'platform',
      platformName: 'LeetCode',
      account: 'azmaininquaidhaque',
      accountUrl: 'https://leetcode.com/u/azmaininquaidhaque/',
      highestRating: 'Top 39%',
      solveCount: '70+ problems',
      contestCount: '5+ contests',
      order: 3,
    },
    {
      _id: 'contest_uihp',
      _type: 'achievement',
      type: 'contest',
      contestName: 'UIHP-IC4',
      date: 'July 16, 2025',
      result: '1st Place (Champion)',
      description: 'Team Name: Pulsy Drive',
      order: 4,
    },
    {
      _id: 'contest_kriupc',
      _type: 'achievement',
      type: 'contest',
      contestName: 'Khulna Regional Inter University Programming Contest (KRIUPC)',
      date: 'November 10, 2024',
      result: '40th Place',
      description: 'Team Name: WrongDecision',
      order: 5,
    },
  ];

  for (const ach of achievements) {
    await client.createOrReplace(ach);
  }
  console.log(`✅ Created ${achievements.length} achievement documents`);

  // 8. Activities
  const activities = [
    {
      _id: 'act_tedx',
      _type: 'activity',
      title: 'TEDx Khulna University',
      description: 'Designed illustrations and visual branding assets for TEDx event.',
      iconKey: 'rocket',
      date: '2024',
      order: 1,
    },
    {
      _id: 'act_cp',
      _type: 'activity',
      title: 'Competitive Programming',
      description: 'Represented Khulna University in inter-university programming contests.',
      iconKey: 'code',
      date: '2024 - Present',
      order: 2,
    },
  ];

  for (const act of activities) {
    await client.createOrReplace(act);
  }
  console.log(`✅ Created ${activities.length} activity documents`);

  console.log('🎉 Sanity Studio Content Lake successfully seeded!');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
