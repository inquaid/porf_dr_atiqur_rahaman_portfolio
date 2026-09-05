import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import {
  FaHome,
  FaUser,
  FaCode,
  FaChartBar,
  FaBookmark,
  FaFileAlt,
  FaEnvelope,
  FaBlog,
  FaLightbulb,
  FaResearchgate,
} from 'react-icons/fa';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { IconWrapper } from '../common/IconWrapper';
import { useProfile } from '../../hooks/useProfile';

// Profile picture reference - using absolute path from public folder
const PLACEHOLDER_PROFILE = '/profile_pic.jpg';

type SidebarProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const SidebarContainer = styled.div<{ isOpen?: boolean }>`
  position: fixed;
  left: clamp(10px, 3vw, 30px);
  top: 50%;
  transform: translateY(-50%);
  width: min(250px, 20vw);
  height: 80vh;
  background: ${({ theme }) => theme.metalGradient};
  border-radius: clamp(8px, 1.5vw, 15px);
  padding: clamp(10px, 2vw, 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 100;
  transition: all 0.1s ease;
  // transition: left 0.1s ease, top 0.1s ease, width 0.1s ease, height 0.1s ease, transform 0.1s ease, border-radius 0.1s ease;

  @media (max-width: 768px) {
    ${(props) =>
      props.isOpen
        ? `
      left: 0;
      top: 0; 
      width: 100%;
      height: 100vh;
      transform: none;
      border-radius: 0;
      z-index: 1000;
    `
        : `
      left: 0;
      top: 0;
      width: auto;
      height: auto;
      transform: none;
      background: transparent;
      box-shadow: none;
      padding: 0;
    `}
  }
`;

const HamburgerButton = styled.button<{ isOpen?: boolean }>`
  display: none;
  background: ${({ theme }) => theme.metalGradient};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 1001;
  position: fixed;
  top: 20px;
  left: 20px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

// Animated hamburger icon with CSS
const HamburgerIcon = styled.div<{ isOpen: boolean }>`
  width: 22px;
  height: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    height: 2px;
    width: 100%;
    background: ${({ theme }) => theme.text};
    border-radius: 2px;
    transition: all 0.25s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    transform-origin: center;
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
      }
      span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    `}
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 99;
`;

const ProfileContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin: 30px 0;
  }
`;

const ProfileImage = styled.div<{ image: string }>`
  width: clamp(80px, 8vw, 100px);
  height: clamp(80px, 8vw, 100px);
  border-radius: 50%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border: 3px solid ${({ theme }) => theme.primary};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: clamp(6px, 1vw, 10px);
`;

const ProfileName = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: clamp(1rem, 1.2vw, 1.2rem);
`;

const NavButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  max-height: 60vh;
  padding-right: 5px;

  @media (max-width: 768px) {
    max-height: 70vh;
  }
`;

type NavButtonProps = {
  active: boolean;
};

const NavButton = styled(motion.button)<NavButtonProps>`
  display: flex;
  align-items: center;
  padding: clamp(8px, 1.2vw, 12px) clamp(15px, 2vw, 20px);
  margin-bottom: clamp(5px, 0.8vw, 8px);
  border-radius: clamp(5px, 0.8vw, 8px);
  background: ${(props) =>
    props.active ? ({ theme }) => theme.hoverGradient : ({ theme }) => theme.buttonGradient};
  color: ${(props) => (props.active ? ({ theme }) => theme.accent : ({ theme }) => theme.text)};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.active ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  white-space: nowrap;
  font-size: clamp(0.85rem, 1vw, 1rem);

  &:hover {
    background: ${({ theme }) => theme.hoverGradient};
    transform: translateY(-2px);
  }
`;

const ButtonIcon = styled.div`
  margin-right: clamp(6px, 1vw, 10px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThemeToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.buttonGradient};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.1s ease;

  &:hover {
    background: ${({ theme }) => theme.hoverGradient};
    transform: translateY(-2px);
  }
`;

const CloseButton = styled.button`
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.buttonGradient};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ theme }) => theme.shadow};
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hoverGradient};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

// Staggered animation variants for nav items
const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.1 } },
};

const navItems = [
  { id: 'home', label: 'Home', icon: FaHome },
  { id: 'about', label: 'About Me', icon: FaUser },
  { id: 'projects', label: 'Projects', icon: FaCode },
  { id: 'problem-solving', label: 'Achievements', icon: FaLightbulb },
  { id: 'research', label: 'Research', icon: FaResearchgate },
  { id: 'skills', label: 'Skills', icon: FaChartBar },
  { id: 'activities', label: 'Extracurricular', icon: FaBookmark },
  { id: 'resume', label: 'Resume/CV', icon: FaFileAlt },
  { id: 'contact', label: 'Contact', icon: FaEnvelope },
  { id: 'blog', label: 'Blog', icon: FaBlog },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Close sidebar on desktop view
      if (!mobile && isOpen) {
        setIsOpen(false);
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const { data: profile } = useProfile();
  const profileName = profile?.shortName || profile?.fullName || 'Azmain Inquaid';
  const avatarImage = profile?.profileImageUrl || profile?.heroImageUrl || PLACEHOLDER_PROFILE;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <HamburgerButton onClick={toggleSidebar} isOpen={isOpen}>
        <HamburgerIcon isOpen={isOpen}>
          <span />
          <span />
          <span />
        </HamburgerIcon>
      </HamburgerButton>

      <AnimatePresence mode="wait">
        {(isOpen || !isMobile) && (
          <>
            {isOpen && isMobile && (
              <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
              />
            )}

            <SidebarContainer
              as={motion.div}
              isOpen={isOpen}
              initial={isMobile ? { x: '-100%', opacity: 0.5 } : {}}
              animate={isMobile ? { x: 0, opacity: 1 } : {}}
              exit={isMobile ? { x: '-100%', opacity: 0 } : {}}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
                mass: 0.8,
              }}
            >
              {isOpen && isMobile && (
                <CloseButton onClick={toggleSidebar}>
                  <motion.div
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                  >
                    ✕
                  </motion.div>
                </CloseButton>
              )}

              <ProfileContainer>
                <ProfileImage image={avatarImage} />
                <ProfileName>{profileName}</ProfileName>
              </ProfileContainer>

              <NavButtons
                as={motion.div}
                variants={isMobile ? navContainerVariants : undefined}
                initial={isMobile ? 'hidden' : undefined}
                animate={isMobile ? 'visible' : undefined}
                exit={isMobile ? 'exit' : undefined}
              >
                {navItems.map((item) => (
                  <NavButton
                    key={item.id}
                    active={activeSection === item.id}
                    onClick={() => handleNavClick(item.id)}
                    whileTap={{ scale: 0.97 }}
                    variants={isMobile ? navItemVariants : undefined}
                  >
                    <ButtonIcon>
                      <IconWrapper icon={item.icon} size={18} />
                    </ButtonIcon>
                    {item.label}
                  </NavButton>
                ))}
              </NavButtons>

              {!isMobile && (
                <ThemeToggle onClick={toggleTheme}>
                  {isDarkMode ? (
                    <IconWrapper icon={MdLightMode} size={20} />
                  ) : (
                    <IconWrapper icon={MdDarkMode} size={20} />
                  )}
                </ThemeToggle>
              )}
            </SidebarContainer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
