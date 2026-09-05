import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { useProfile } from '../../hooks/useProfile';

interface UnifiedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  section?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

// Site configuration - centralized for easy updates
const SITE_CONFIG = {
  siteName: 'Azmain Inquaid Haque',
  siteUrl: 'https://azmaininquaid.mind-byte.com',
  defaultTitle: 'Azmain Inquaid Haque | Researcher & Problem Solver',
  defaultDescription:
    'Official portfolio of Azmain Inquaid Haque – Researcher specializing in AI/ML, UI/UX design, React, Node.js, and competitive problem solving. Based in Khulna, Bangladesh.',
  defaultKeywords:
    'Azmain Inquaid Haque, Azmain Haque, Inquaid, Haque, Turjo, turjooo, Researcher, AI ML Engineer, UI UX Designer, React Developer, Node.js Developer, TypeScript, Problem Solver, Competitive Programming, Software Engineer, Bangladesh Developer, Khulna University, Portfolio, Web Developer',
  defaultImage: '/profile-image.jpg',
  twitterHandle: '@AzmainHaque',
  locale: 'en_US',
  themeColor: '#6366f1',
};

// Section-specific SEO data
const SECTION_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: 'Azmain Inquaid Haque | Researcher & Problem Solver',
    description:
      'Welcome to the portfolio of Azmain Inquaid Haque - a passionate Researcher creating innovative solutions with modern technologies.',
    keywords: 'Azmain Inquaid Haque, portfolio, developer, full-stack, home',
  },
  about: {
    title: 'About | Azmain Inquaid Haque',
    description:
      'Learn about Azmain Inquaid Haque - a Computer Science student at Khulna University with expertise in AI/ML, web development, and competitive programming.',
    keywords: 'about Azmain, background, education, Khulna University, computer science',
  },
  projects: {
    title: 'Projects | Azmain Inquaid Haque',
    description:
      'Explore innovative projects by Azmain Inquaid Haque including web applications, AI/ML solutions, and open-source contributions.',
    keywords: 'projects, portfolio, web applications, AI projects, React projects, Node.js',
  },
  skills: {
    title: 'Skills | Azmain Inquaid Haque',
    description:
      'Technical skills of Azmain Inquaid Haque including React, Node.js, TypeScript, Python, AI/ML, and more.',
    keywords: 'skills, React, Node.js, TypeScript, Python, AI, ML, frontend, backend',
  },
  'problem-solving': {
    title: 'Problem Solving | Azmain Inquaid Haque',
    description:
      'Competitive programming achievements and problem-solving skills of Azmain Inquaid Haque on platforms like Codeforces and CodeChef.',
    keywords:
      'competitive programming, Codeforces, CodeChef, algorithms, data structures, problem solving',
  },
  research: {
    title: 'Research | Azmain Inquaid Haque',
    description:
      'Research work and academic contributions by Azmain Inquaid Haque in AI, Machine Learning, and Computer Science.',
    keywords: 'research, AI research, machine learning, academic, publications',
  },
  activities: {
    title: 'Activities | Azmain Inquaid Haque',
    description:
      'Extracurricular activities, community involvement, and leadership roles of Azmain Inquaid Haque.',
    keywords: 'activities, community, leadership, volunteering, events',
  },
  resume: {
    title: 'Resume | Azmain Inquaid Haque',
    description:
      'Professional resume and CV of Azmain Inquaid Haque - Researcher with expertise in modern web technologies.',
    keywords: 'resume, CV, experience, qualifications, career',
  },
  contact: {
    title: 'Contact | Azmain Inquaid Haque',
    description:
      'Get in touch with Azmain Inquaid Haque for collaboration, freelance projects, or professional inquiries.',
    keywords: 'contact, hire, freelance, collaboration, email',
  },
  blog: {
    title: 'Blog | Azmain Inquaid Haque',
    description:
      'Technical blog posts and articles by Azmain Inquaid Haque covering web development, AI/ML, and software engineering.',
    keywords: 'blog, articles, tutorials, web development, AI, programming',
  },
};

const UnifiedSEO: React.FC<UnifiedSEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  section = 'home',
  author,
  publishedTime,
  modifiedTime,
}) => {
  const { data: siteSettings } = useSiteSettings();
  const { data: profile } = useProfile();

  const activeSiteName = siteSettings?.siteName || SITE_CONFIG.siteName;
  const activeSiteUrl = siteSettings?.siteUrl || SITE_CONFIG.siteUrl;
  const activeTitle = `${activeSiteName} | Portfolio`;
  const activeDescription = siteSettings?.siteDescription || SITE_CONFIG.defaultDescription;
  const activeKeywords = Array.isArray(siteSettings?.siteKeywords)
    ? siteSettings.siteKeywords.join(', ')
    : SITE_CONFIG.defaultKeywords;

  // Get section-specific SEO data
  const sectionSEO = SECTION_SEO[section] ?? SECTION_SEO.home;

  // Use provided values or fall back to section-specific, then defaults
  const finalTitle = title ?? sectionSEO?.title ?? activeTitle;
  const finalDescription = description ?? sectionSEO?.description ?? activeDescription;
  const finalKeywords = keywords
    ? `${keywords}, ${activeKeywords}`
    : `${sectionSEO?.keywords ?? ''}, ${activeKeywords}`;

  const fallbackImage = siteSettings?.siteImageUrl || profile?.profileImageUrl || SITE_CONFIG.defaultImage;
  const fullImageUrl = (image || fallbackImage).startsWith('http')
    ? image || fallbackImage
    : `${activeSiteUrl}${image || fallbackImage}`;

  const canonicalUrl = url
    ? url.startsWith('http')
      ? url
      : `${activeSiteUrl}${url}`
    : typeof window !== 'undefined'
      ? window.location.href
      : activeSiteUrl;

  // Person Schema for structured data
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${activeSiteUrl}/#person`,
    name: profile?.fullName || activeSiteName,
    givenName: profile?.shortName || activeSiteName,
    familyName: '',
    jobTitle: 'Researcher',
    url: activeSiteUrl,
    image: fullImageUrl,
    description: activeDescription,
    email: profile?.infoGrid?.email || 'contact@example.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile?.infoGrid?.location || 'Khulna',
      addressRegion: 'Khulna Division',
      addressCountry: 'BD',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Khulna University',
      url: 'https://ku.ac.bd/',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'React',
      'Node.js',
      'TypeScript',
      'Python',
      'UI/UX Design',
      'Competitive Programming',
    ],
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.siteUrl}/#website`,
    url: SITE_CONFIG.siteUrl,
    name: SITE_CONFIG.siteName,
    description: SITE_CONFIG.defaultDescription,
    publisher: {
      '@id': `${SITE_CONFIG.siteUrl}/#person`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.siteUrl}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.siteUrl,
      },
      ...(section !== 'home'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' '),
              item: `${SITE_CONFIG.siteUrl}/?section=${section}`,
            },
          ]
        : []),
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author} />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content={SITE_CONFIG.themeColor} />
      <meta name="application-name" content={SITE_CONFIG.siteName} />

      {/* Language */}
      <html lang="en" />
      <meta name="content-language" content="en" />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={SITE_CONFIG.siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_CONFIG.siteName} - Portfolio`} />
      <meta property="og:site_name" content={SITE_CONFIG.siteName} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />

      {/* Profile specific OG tags */}
      <meta property="profile:first_name" content="Azmain Inquaid" />
      <meta property="profile:last_name" content="Haque" />
      <meta property="profile:username" content="azmaininquaid" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
      <meta name="twitter:creator" content={SITE_CONFIG.twitterHandle} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={`${SITE_CONFIG.siteName} - Portfolio`} />

      {/* Article specific (for blog posts) */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
  );
};

export default UnifiedSEO;

// Export site config for use in other components
export { SITE_CONFIG, SECTION_SEO };
