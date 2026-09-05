/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

// Shared Section Title with gradient effect
export const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 2.8rem);
  margin-bottom: 1.5rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.accent} 50%,
    ${({ theme }) => theme.secondary} 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 5s ease infinite;
  position: relative;
  display: inline-block;

  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.accent}
    );
    border-radius: 2px;
  }
`;

// Shared Section Subtitle
export const SectionSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
`;

// Shared Card Component
export const Card = styled(motion.div)`
  background: ${({ theme }) => `${theme.cardBackground}f0`};
  border-radius: 16px;
  padding: clamp(1.25rem, 3vw, 1.75rem);
  border: 1px solid ${({ theme }) => `${theme.primary}20`};
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  position: relative;
  overflow: hidden;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.accent}
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => `${theme.primary}40`};

    &::before {
      transform: scaleX(1);
    }
  }
`;

// Shared Glass Card with light blur
export const GlassCard = styled(Card)`
  background: ${({ theme }) => `${theme.cardBackground}d0`};
  border: 1px solid ${({ theme }) => `${theme.primary}15`};
`;

// Shared Tag/Chip Component
export const Tag = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  background: ${({ theme }) => `${theme.primary}15`};
  color: ${({ theme }) => theme.primary};
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid ${({ theme }) => `${theme.primary}25`};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => `${theme.primary}25`};
    transform: translateY(-1px);
  }
`;

// Shared Button Styles
export const PrimaryButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.accent}
  );
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px ${({ theme }) => `${theme.primary}40`};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: transparent;
  color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => `${theme.primary}10`};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Shared Animation Variants
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const slideInLeftVariants: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

export const slideInRightVariants: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

export const scaleInVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

// Hover animation for cards
export const cardHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

// Shared Grid Layout
export const ResponsiveGrid = styled.div<{ $minWidth?: string; $gap?: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${(props) => props.$minWidth || '300px'}, 1fr));
  gap: ${(props) => props.$gap || '1.5rem'};
  width: 100%;
`;

// Section Content Wrapper
export const SectionContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

// Loading Skeleton
export const Skeleton = styled.div<{ $width?: string; $height?: string }>`
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || '20px'};
  background: linear-gradient(
    90deg,
    ${({ theme }) => `${theme.cardBackground}60`} 25%,
    ${({ theme }) => `${theme.cardBackground}90`} 50%,
    ${({ theme }) => `${theme.cardBackground}60`} 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// Divider
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => `${theme.primary}30`},
    transparent
  );
  margin: 2rem 0;
`;
