import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(-2deg); }
  75% { transform: translateY(5px) rotate(2deg); }
`;

const glitch = keyframes`
  0%, 100% { 
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  20% {
    clip-path: inset(20% 0 60% 0);
    transform: translate(-2px, 2px);
  }
  40% {
    clip-path: inset(40% 0 40% 0);
    transform: translate(2px, -2px);
  }
  60% {
    clip-path: inset(60% 0 20% 0);
    transform: translate(-1px, 1px);
  }
  80% {
    clip-path: inset(80% 0 5% 0);
    transform: translate(1px, -1px);
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled(motion.div)`
  text-align: center;
  z-index: 1;
  max-width: 600px;
`;

const ErrorCode = styled(motion.div)`
  font-size: clamp(8rem, 20vw, 15rem);
  font-weight: 900;
  font-family: 'Oswald', sans-serif;
  background: ${({ theme }) => theme.textGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  position: relative;
  animation: ${float} 4s ease-in-out infinite;

  &::before,
  &::after {
    content: '404';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.textGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &::before {
    animation: ${glitch} 3s infinite;
    opacity: 0.8;
  }

  &::after {
    animation: ${glitch} 3s infinite reverse;
    opacity: 0.6;
  }
`;

const WarningIcon = styled(motion.div)`
  font-size: 4rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 20px;
  opacity: 0.8;
`;

const Title = styled(motion.h1)`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: ${({ theme }) => theme.text};
  margin: 20px 0 15px;
  font-family: 'Oswald', sans-serif;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 40px;
  line-height: 1.6;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion(Link))`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 30px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;
`;

const PrimaryButton = styled(ActionButton)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.accent}
  );
  color: white;
  box-shadow: 0 5px 20px rgba(99, 102, 241, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.5);
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: ${({ theme }) => theme.buttonGradient};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => `${theme.border}50`};

  &:hover {
    transform: translateY(-3px);
    background: ${({ theme }) => theme.hoverGradient};
  }
`;

const FloatingShape = styled(motion.div)<{ $top: string; $left: string; $size: number }>`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  background: ${({ theme }) => `${theme.primary}10`};
  border: 1px solid ${({ theme }) => `${theme.primary}20`};
`;

const NotFoundPage: React.FC = () => {
  const shapes = [
    { top: '10%', left: '10%', size: 80 },
    { top: '20%', left: '80%', size: 60 },
    { top: '70%', left: '15%', size: 100 },
    { top: '80%', left: '75%', size: 70 },
    { top: '40%', left: '5%', size: 50 },
    { top: '50%', left: '90%', size: 90 },
  ];

  return (
    <PageContainer>
      {shapes.map((shape, i) => (
        <FloatingShape
          key={i}
          $top={shape.top}
          $left={shape.left}
          $size={shape.size}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.5,
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            y: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}

      <ContentWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <WarningIcon
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <FaExclamationTriangle />
        </WarningIcon>

        <ErrorCode
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          404
        </ErrorCode>

        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Page Not Found
        </Title>

        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
          Don&apos;t worry, let&apos;s get you back on track.
        </Description>

        <ButtonContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <PrimaryButton to="/" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <FaHome /> Go Home
          </PrimaryButton>
          <SecondaryButton
            to="/?section=projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSearch /> View Projects
          </SecondaryButton>
        </ButtonContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default NotFoundPage;
