import React from 'react';
import styled from 'styled-components';

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
  title?: string;
  subtitle?: string;
  className?: string;
}

const NameHeading: React.FC<NameHeadingProps> = ({
  title = 'Welcome to my portfolio',
  subtitle = 'Researcher specializing in AI/ML and UI/UX design',
  className,
}) => {
  return (
    <HeadingContainer className={className}>
      <Heading>
        <NameSpan>Azmain Inquaid Haque</NameSpan>
        {title}
      </Heading>
      <Subtitle>{subtitle}</Subtitle>
    </HeadingContainer>
  );
};

export default NameHeading;
