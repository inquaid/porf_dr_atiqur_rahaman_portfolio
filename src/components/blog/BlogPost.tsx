import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaArrowLeft, FaEye, FaHeart } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';
import { IconWrapper } from '../common/IconWrapper';

export interface UnifiedBlogPostData {
  title: string;
  slug: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  tags: string[];
  body?: any[];
  content?: string;
  author?: string;
}

interface BlogPostProps {
  post: UnifiedBlogPostData;
  viewsCount?: number;
  likesCount?: number;
  onLike?: () => void;
}

const BlogPostContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.accent};
  font-size: 1rem;
  text-decoration: none;
  margin-bottom: 30px;
  width: fit-content;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-5px);
    color: ${({ theme }) => theme.primary};
  }
`;

const BlogPostHeader = styled.div`
  margin-bottom: 30px;
`;

const BlogPostTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const BlogPostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const BlogPostMetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.secondary};
  font-size: 0.95rem;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => `${theme.cardBackground}c0`};
  border: 1px solid ${({ theme }) => theme.border};
  color: #ef4444;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background: #ef444415;
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  max-height: 450px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const BlogPostContent = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  line-height: 1.8;

  h2 {
    font-size: 1.8rem;
    margin: 40px 0 20px;
    color: ${({ theme }) => theme.text};
  }

  h3 {
    font-size: 1.4rem;
    margin: 30px 0 15px;
    color: ${({ theme }) => theme.text};
  }

  p {
    margin-bottom: 20px;
  }

  ul,
  ol {
    margin-bottom: 20px;
    padding-left: 20px;
  }

  li {
    margin-bottom: 10px;
  }

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.accent};
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  pre {
    background: ${({ theme }) => `${theme.cardBackground}90`};
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 20px 0;
    border: 1px solid ${({ theme }) => theme.border};
  }

  code {
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 40px;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.buttonGradient};
  color: ${({ theme }) => theme.text};
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.hoverGradient};
  }
`;

const BlogPostComponent: React.FC<BlogPostProps> = ({
  post,
  viewsCount = 0,
  likesCount = 0,
  onLike,
}) => {
  return (
    <BlogPostContainer>
      <BackButton to="/?section=blog">
        <IconWrapper icon={FaArrowLeft} size={16} /> Back to Blog
      </BackButton>

      <BlogPostHeader>
        <BlogPostTitle>{post.title}</BlogPostTitle>
        <BlogPostMeta>
          <BlogPostMetaItem>
            <IconWrapper icon={FaCalendarAlt} size={16} />
            {post.date}
          </BlogPostMetaItem>
          <BlogPostMetaItem>
            <IconWrapper icon={FaTag} size={16} />
            {post.category}
          </BlogPostMetaItem>
          <BlogPostMetaItem>
            <IconWrapper icon={FaEye} size={16} />
            {viewsCount} {viewsCount === 1 ? 'view' : 'views'}
          </BlogPostMetaItem>
          <LikeButton onClick={onLike} aria-label="Like post">
            <IconWrapper icon={FaHeart} size={14} />
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </LikeButton>
        </BlogPostMeta>
      </BlogPostHeader>

      {post.image && <FeaturedImage src={post.image} alt={post.title} />}

      <BlogPostContent>
        {post.body && Array.isArray(post.body) && post.body.length > 0 ? (
          <PortableText value={post.body} />
        ) : post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <p>{post.excerpt}</p>
        )}
      </BlogPostContent>

      {post.tags && post.tags.length > 0 && (
        <TagsContainer>
          {post.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
      )}
    </BlogPostContainer>
  );
};

export default BlogPostComponent;
