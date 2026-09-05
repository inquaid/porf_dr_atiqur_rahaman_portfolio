import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { useProfile } from '../../hooks/useProfile';
import { useEducation } from '../../hooks/useEducation';

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

const DEFAULT_LOCALE = 'en_US';
const DEFAULT_THEME_COLOR = '#6366f1';

const getSectionTitle = (sectionKey: string): string => {
  switch (sectionKey.toLowerCase()) {
    case 'home':
      return 'Home';
    case 'about':
      return 'About';
    case 'projects':
      return 'Projects';
    case 'skills':
      return 'Skills';
    case 'problem-solving':
      return 'Problem Solving';
    case 'research':
      return 'Research';
    case 'activities':
      return 'Activities';
    case 'resume':
      return 'Resume';
    case 'contact':
      return 'Contact';
    case 'blog':
      return 'Blog';
    default:
      return sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1).replace('-', ' ');
  }
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
  const { data: educationData } = useEducation();

  const activeSiteName =
    siteSettings?.siteName ||
    profile?.fullName ||
    'Academic & Professional Portfolio';

  const defaultOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'https://portfolio.local';
  const activeSiteUrl = siteSettings?.siteUrl || defaultOrigin;

  const sectionLabel = getSectionTitle(section);
  const activeTitle =
    section === 'home'
      ? `${activeSiteName} | Academic & Professional Portfolio`
      : `${sectionLabel} | ${activeSiteName}`;

  const activeDescription =
    siteSettings?.siteDescription ||
    profile?.heroBio ||
    `Official academic and professional portfolio of ${activeSiteName}.`;

  const activeKeywords =
    Array.isArray(siteSettings?.siteKeywords) && siteSettings.siteKeywords.length > 0
      ? siteSettings.siteKeywords.join(', ')
      : `${activeSiteName}, portfolio, academic, researcher, publications, projects`;

  const sectionDescription =
    section === 'home'
      ? activeDescription
      : `${sectionLabel} section - portfolio of ${activeSiteName}.`;

  const finalTitle = title ?? activeTitle;
  const finalDescription = description ?? sectionDescription;
  const finalKeywords = keywords ? `${keywords}, ${activeKeywords}` : activeKeywords;

  const fallbackImage =
    siteSettings?.siteImageUrl || profile?.profileImageUrl || '/profile-image.jpg';
  const fullImageUrl = (image || fallbackImage).startsWith('http')
    ? image || fallbackImage
    : `${activeSiteUrl.replace(/\/$/, '')}/${(image || fallbackImage).replace(/^\//, '')}`;

  const canonicalUrl = url
    ? url.startsWith('http')
      ? url
      : `${activeSiteUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`
    : typeof window !== 'undefined'
      ? window.location.href
      : activeSiteUrl;

  const twitterHandle = siteSettings?.twitterHandle || '';
  const themeColor = siteSettings?.themeColor || DEFAULT_THEME_COLOR;
  const primaryInstitution = educationData?.[0]?.institution || '';

  // Person Schema for structured data
  const personSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${activeSiteUrl}/#person`,
    name: profile?.fullName || activeSiteName,
    givenName: profile?.shortName || activeSiteName,
    jobTitle: profile?.typewriterTitles?.[0] || 'Researcher & Academic',
    url: activeSiteUrl,
    image: fullImageUrl,
    description: activeDescription,
  };

  if (profile?.infoGrid?.email) {
    personSchema.email = profile.infoGrid.email;
  }
  if (profile?.infoGrid?.location) {
    personSchema.address = {
      '@type': 'PostalAddress',
      addressLocality: profile.infoGrid.location,
    };
  }
  if (primaryInstitution) {
    personSchema.alumniOf = {
      '@type': 'CollegeOrUniversity',
      name: primaryInstitution,
    };
  }
  if (Array.isArray(profile?.typewriterTitles) && profile.typewriterTitles.length > 0) {
    personSchema.knowsAbout = profile.typewriterTitles;
  }

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${activeSiteUrl}/#website`,
    url: activeSiteUrl,
    name: activeSiteName,
    description: activeDescription,
    publisher: {
      '@id': `${activeSiteUrl}/#person`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${activeSiteUrl}/?search={search_term_string}`,
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
        item: activeSiteUrl,
      },
      ...(section !== 'home'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: sectionLabel,
              item: `${activeSiteUrl}/?section=${section}`,
            },
          ]
        : []),
    ],
  };

  const authorName = author || profile?.fullName || activeSiteName;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      {authorName && <meta name="author" content={authorName} />}
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content={themeColor} />
      <meta name="application-name" content={activeSiteName} />

      {/* Language */}
      <html lang="en" />
      <meta name="content-language" content="en" />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={activeSiteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${activeSiteName} - Portfolio`} />
      <meta property="og:site_name" content={activeSiteName} />
      <meta property="og:locale" content={DEFAULT_LOCALE} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={`${activeSiteName} - Portfolio`} />

      {/* Article specific (for blog posts) */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={authorName} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
  );
};

export default UnifiedSEO;

// Empty fallback configs exported for backwards compatibility
export const SITE_CONFIG = {
  locale: DEFAULT_LOCALE,
  themeColor: DEFAULT_THEME_COLOR,
};
export const SECTION_SEO: Record<string, { title: string; description: string; keywords: string }> = {};
