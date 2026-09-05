import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import BlogPostComponent, { UnifiedBlogPostData } from '../components/blog/BlogPost';
import { ThemeProvider } from '../contexts/ThemeContext';
import GlobalStyles from '../styles/GlobalStyles';
import UnifiedSEO from '../components/common/UnifiedSEO';
import NameHeading from '../components/common/NameHeading';
import { useBlogPost } from '../hooks/useBlogPosts';
import { useMetrics } from '../hooks/useMetrics';
import { useProfile } from '../hooks/useProfile';
import { urlFor } from '../lib/sanity';

// Global style to ensure proper scroll behavior
const ScrollBehaviorReset = createGlobalStyle`
  html, body {
    scroll-behavior: auto !important;
    overscroll-behavior: none;
    overflow-anchor: none;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
  }
  
  * {
    scroll-behavior: auto !important;
    scrollbar-width: thin;
  }
  
  #root {
    margin-top: 0;
    padding-top: 0;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 20px;
`;

const NotFoundTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const NotFoundText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.secondary};
`;

const BackButton = styled.button`
  background: ${({ theme }) => theme.buttonGradient};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 30px;
  padding: 12px 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: ${({ theme }) => theme.hoverGradient};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: profile } = useProfile();
  const { data: sanityPost, isLoading } = useBlogPost(slug);
  const { metrics, recordView, recordLike } = useMetrics(slug, 'post');

  // Record view metric on page mount
  useEffect(() => {
    if (slug) {
      recordView();
    }
  }, [slug, recordView]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const authorName = sanityPost?.author || profile?.fullName || '';

  const post: UnifiedBlogPostData | null = sanityPost
    ? {
        title: sanityPost.title,
        slug: typeof sanityPost.slug === 'string' ? sanityPost.slug : (sanityPost.slug as any)?.current || '',
        category: sanityPost.category || 'Engineering',
        date: new Date(sanityPost.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        image:
          typeof sanityPost.mainImage === 'string'
            ? sanityPost.mainImage
            : sanityPost.mainImage
            ? urlFor(sanityPost.mainImage).width(1200).auto('format').url()
            : '/demo.png',
        excerpt: sanityPost.excerpt,
        tags: sanityPost.tags || [],
        body: sanityPost.body || undefined,
        author: authorName,
      }
    : null;

  return (
    <ThemeProvider>
      <GlobalStyles />
      <ScrollBehaviorReset />
      {post && (
        <UnifiedSEO
          title={`${post.title}${authorName ? ` | ${authorName}` : ''}`}
          description={post.excerpt || `${post.title} - Academic article`}
          keywords={post.tags.join(', ')}
          image={post.image}
          type="article"
          author={authorName || undefined}
          publishedTime={post.date}
          section="blog"
        />
      )}
      <PageContainer>
        {isLoading ? (
          <NotFoundContainer>
            <NotFoundTitle>Loading Article...</NotFoundTitle>
            <NotFoundText>Fetching dynamic content from Edge CDN.</NotFoundText>
          </NotFoundContainer>
        ) : post ? (
          <>
            <NameHeading
              name={authorName}
              title={post.title}
              subtitle={authorName ? `Written by ${authorName} on ${post.date}` : `Published on ${post.date}`}
            />
            <BlogPostComponent
              post={post}
              viewsCount={metrics?.viewsCount || 0}
              likesCount={metrics?.likesCount || 0}
              onLike={() => recordLike()}
            />
          </>
        ) : (
          <NotFoundContainer>
            <NotFoundTitle>Blog Post Not Found</NotFoundTitle>
            <NotFoundText>
              The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
            </NotFoundText>
            <BackButton onClick={() => navigate('/?section=blog')}>Back to Blog</BackButton>
          </NotFoundContainer>
        )}
      </PageContainer>
    </ThemeProvider>
  );
};

export default BlogPostPage;
