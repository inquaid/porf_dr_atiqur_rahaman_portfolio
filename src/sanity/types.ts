export interface SanitySlug {
  current: string;
  _type?: 'slug';
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

export interface SanityFile {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface SanitySiteSettings {
  _id: string;
  siteName: string;
  siteUrl: string;
  siteDescription: string;
  siteKeywords?: string[];
  siteImage?: SanityImage;
  logoInitials?: string;
  twitterHandle?: string;
  themeColor?: string;
}

export interface SanityProfileInfoGrid {
  name: string;
  email: string;
  phone: string;
  location: string;
  field: string;
}

export interface SanityProfile {
  _id: string;
  fullName: string;
  shortName: string;
  profileImage?: SanityImage;
  heroImage?: SanityImage;
  typewriterTitles: string[];
  heroBio: string;
  aboutParagraphs: string[];
  infoGrid?: SanityProfileInfoGrid;
  resumeFile?: SanityFile;
  resumeFileName?: string;
  driveUrl?: string;
  drivePassword?: string;
}

export interface SanitySocialLink {
  _id: string;
  platform: string;
  label: string;
  url: string;
  section: 'home' | 'contact' | 'both';
  order?: number;
}

export interface SanityEducation {
  _id: string;
  period: string;
  title: string;
  institution: string;
  description?: string;
  order?: number;
}

export interface SanityExperience {
  _id: string;
  period: string;
  title: string;
  location: string;
  description: string;
  order?: number;
}

export interface SanitySkillItem {
  name: string;
  iconKey: string;
  level?: string;
  years?: string;
}

export interface SanitySkillCategory {
  _id: string;
  categoryId: string;
  title: string;
  order?: number;
  skills: SanitySkillItem[];
}

export interface SanityAchievement {
  _id: string;
  type: 'platform' | 'contest';
  platformName?: string;
  account?: string;
  accountUrl?: string;
  highestRating?: string;
  solveCount?: string;
  contestCount?: string;
  contestName?: string;
  date?: string;
  result?: string;
  description?: string;
  order?: number;
}

export interface SanityActivity {
  _id: string;
  title: string;
  description: string;
  iconKey: string;
  date: string;
  order?: number;
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: SanitySlug;
  author?: string;
  mainImage?: SanityImage;
  category?: string;
  tags?: string[];
  publishedAt: string;
  excerpt: string;
  featured?: boolean;
  body?: any[];
}

export interface SanityProject {
  _id: string;
  title: string;
  slug: SanitySlug;
  category: string;
  description: string;
  mainImage: SanityImage;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
}

export interface SanityResearch {
  _id: string;
  title: string;
  slug: SanitySlug;
  conference: string;
  year: string;
  abstract: string;
  authors?: string[];
  pdfUrl?: string;
  doi?: string;
  order?: number;
}
