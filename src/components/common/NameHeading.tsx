import React from 'react';
import styled from 'styled-components';
import { useProfile } from '../../hooks/useProfile';

const HeadingContainer = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const NameSpan = styled.span`
  font-size: 3rem;
  font-weight: 800;
  display: block;
  margin-bottom: 0.25rem;
  background: ${({ theme }) => theme.textGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.secondary};
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

interface NameHeadingProps {
  name?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

const NameHeading: React.FC<NameHeadingProps> = ({
  name,
  title = 'Welcome to my portfolio',
  subtitle,
  className,
}) => {
  const { data: profile } = useProfile();
  const displayName = name || profile?.fullName || '';

  return (
    <HeadingContainer className={className}>
      <Heading>
        {displayName && <NameSpan>{displayName}</NameSpan>}
        {title}
      </Heading>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </HeadingContainer>
  );
};

export default NameHeading;
