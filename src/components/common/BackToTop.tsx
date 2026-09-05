import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.buttonGradient};
  border: 1px solid ${({ theme }) => `${theme.border}50`};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.2s ease, background 0.2s ease;
  will-change: transform;

  &:hover {
    background: ${({ theme }) => theme.hoverGradient};
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 42px;
    height: 42px;
  }
`;

const ArrowIcon = styled(FaArrowUp)`
  font-size: 16px;
  transition: transform 0.2s ease;

  ${BackToTopButton}:hover & {
    transform: translateY(-2px);
  }
`;

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      const shouldShow = window.scrollY > 300;
      setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(toggleVisibility);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <BackToTopButton
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          transition={{ duration: 0.2 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Back to top"
        >
          <ArrowIcon />
        </BackToTopButton>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
