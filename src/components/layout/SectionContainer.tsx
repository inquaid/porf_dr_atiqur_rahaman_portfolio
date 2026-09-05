import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

type SectionContainerProps = {
  id: string;
  isActive?: boolean;
  children: React.ReactNode;
};

const Container = styled(motion.section)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: clamp(10px, 2vw, 20px);
  position: relative;
`;

const ContentWrapper = styled.div`
  background: ${({ theme }) => `${theme.cardBackground}c0`};
  border-radius: clamp(10px, 1.5vw, 15px);
  padding: clamp(15px, 3vw, 30px);
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => `${theme.border}40`};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const SectionContainer: React.FC<SectionContainerProps> = ({ id, children }) => {
  return (
    <Container
      id={id}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sectionVariants}
    >
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

export default SectionContainer;
