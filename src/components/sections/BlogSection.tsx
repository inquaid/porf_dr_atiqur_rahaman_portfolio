import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionContainer from '../layout/SectionContainer';
import { FaCalendarAlt, FaTag, FaArrowRight } from 'react-icons/fa';
import { IconWrapper } from '../common/IconWrapper';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { urlFor } from '../../lib/sanity';
import { prefetchBlogPost } from '../../utils/performance';

type BlogSectionProps = {
  id: string;
  isActive: boolean;
};

const BlogContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionDescription = styled(motion.p)`
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 800px;
`;

const BlogGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BlogCard = styled(motion.div)`
  background: ${({ theme }) => `${theme.cardBackground}e0`};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  will-change: transform;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const BlogImage = styled.div<{ image: string }>`
  height: 200px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const BlogContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
`;

const BlogMetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.secondary};
  font-size: 0.9rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const BlogExcerpt = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 15px;
  flex-grow: 1;
`;

const BlogLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.accent};
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-top: auto;

  &:hover {
    transform: translateX(5px);
    color: ${({ theme }) => theme.primary};
  }
`;

const FeaturedPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 20px;
`;

const FeaturedBlogPost = styled(motion.div)`
  background: ${({ theme }) => `${theme.cardBackground}f0`};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FeaturedContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FeaturedTag = styled.span`
  display: inline-block;
  padding: 5px 12px;
  border-radius: 20px;
  background: ${({ theme }) => `${theme.primary}20`};
  color: ${({ theme }) => theme.primary};
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 15px;
  align-self: flex-start;
`;

const FeaturedTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.text};
`;

const FeaturedExcerpt = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const FeaturedMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const FeaturedImage = styled.div<{ image: string }>`
  height: 300px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;

  @media (min-width: 992px) {
    height: 100%;
    min-height: 300px;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const BlogSection: React.FC<BlogSectionProps> = ({ id, isActive }) => {
  const { data: sanityPosts } = useBlogPosts();

  const displayPosts =
    sanityPosts && sanityPosts.length > 0
      ? sanityPosts.map((p) => ({
          id: p._id,
          title: p.title,
          slug: typeof p.slug === 'string' ? p.slug : (p.slug as any)?.current || '',
          category: p.category || 'Engineering',
          excerpt: p.excerpt,
          date: new Date(p.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          image:
            typeof p.mainImage === 'string'
              ? p.mainImage
              : p.mainImage
              ? urlFor(p.mainImage).width(800).auto('format').url()
              : '/demo.png',
          featured: Boolean(p.featured),
        }))
      : [];

  const featuredPosts = displayPosts.filter((p) => p.featured);
  const regularPosts = displayPosts;

  return (
    <SectionContainer id={id} isActive={isActive}>
      <BlogContentWrapper>
        <SectionTitle
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest Articles & Insights
        </SectionTitle>

        <SectionDescription
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          I write about technology, software development, AI, and systems engineering. Explore my latest articles below.
        </SectionDescription>

        {featuredPosts.length > 0 && (
          <FeaturedPostsContainer>
            {featuredPosts.slice(0, 1).map((post, index) => (
              <FeaturedBlogPost
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FeaturedContent>
                  <FeaturedTag>{post.category}</FeaturedTag>
                  <FeaturedTitle>{post.title}</FeaturedTitle>
                  <FeaturedMeta>
                    <BlogMetaItem>
                      <IconWrapper icon={FaCalendarAlt} size={14} />
                      {post.date}
                    </BlogMetaItem>
                  </FeaturedMeta>
                  <FeaturedExcerpt>{post.excerpt}</FeaturedExcerpt>
                  <BlogLink
                    to={`/blog/${post.slug}`}
                    onMouseEnter={() => prefetchBlogPost(post.slug)}
                    onFocus={() => prefetchBlogPost(post.slug)}
                  >
                    Read Full Article <IconWrapper icon={FaArrowRight} size={14} />
                  </BlogLink>
                </FeaturedContent>
                <FeaturedImage image={post.image} />
              </FeaturedBlogPost>
            ))}
          </FeaturedPostsContainer>
        )}

        <BlogGrid
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          {regularPosts.map((post) => (
            <BlogCard key={post.id} variants={itemVariants} whileHover={{ y: -5 }}>
              <BlogImage image={post.image} />
              <BlogContent>
                <BlogMeta>
                  <BlogMetaItem>
                    <IconWrapper icon={FaCalendarAlt} size={14} />
                    {post.date}
                  </BlogMetaItem>
                  <BlogMetaItem>
                    <IconWrapper icon={FaTag} size={14} />
                    {post.category}
                  </BlogMetaItem>
                </BlogMeta>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <BlogLink
                  to={`/blog/${post.slug}`}
                  onMouseEnter={() => prefetchBlogPost(post.slug)}
                  onFocus={() => prefetchBlogPost(post.slug)}
                >
                  Read More <IconWrapper icon={FaArrowRight} size={14} />
                </BlogLink>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      </BlogContentWrapper>
    </SectionContainer>
  );
};

export default BlogSection;
