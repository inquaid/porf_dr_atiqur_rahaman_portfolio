import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import ParticleBackground from './ParticleBackground';

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: ${({ theme }) => theme.primary || '#3584e4'};
  color: white;
  padding: 8px 16px;
  z-index: 10000;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  transition: top 0.3s ease;
  border-radius: 0 0 4px 0;

  &:focus {
    top: 0;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  position: relative;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: auto !important;
`;

const Content = styled.div<{ $isMobile: boolean }>`
  flex: 1;
  margin-left: ${(props) => (props.$isMobile ? '0' : 'calc(min(250px, 20vw) + 40px)')};
  padding: ${(props) => (props.$isMobile ? '80px 16px 24px' : 'clamp(24px, 4vw, 48px)')};
  padding-top: ${(props) => (props.$isMobile ? '80px' : 'clamp(24px, 4vw, 48px)')};
  transition:
    margin-left 0.3s ease,
    padding 0.3s ease;
  width: ${(props) => (props.$isMobile ? '100%' : 'auto')};
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
  min-height: 100vh;
  box-sizing: border-box;
`;

type LayoutProps = {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Layout = forwardRef<HTMLDivElement, LayoutProps>(function Layout(
  { children, activeSection, setActiveSection },
  ref
) {
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize with breakpoint detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener with throttling
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [ref]);

  return (
    <LayoutContainer ref={ref}>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <ParticleBackground />
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Content
        $isMobile={isMobile}
        id="main-content"
        role="main"
        aria-label="Main content"
        tabIndex={-1}
      >
        {children}
      </Content>
    </LayoutContainer>
  );
});

export default Layout;
