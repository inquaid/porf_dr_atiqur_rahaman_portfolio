import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from './contexts/ThemeContext';
import { QueryProvider } from './contexts/QueryProvider';
import Layout from './components/layout/Layout';
import UnifiedSEO from './components/common/UnifiedSEO';
import PerformanceOptimizer from './components/layout/PerformanceOptimizer';
import BackToTop from './components/common/BackToTop';
import SplashScreen from './components/common/SplashScreen';
// Lazy load section components for better code splitting
const HomeSection = lazy(() => import('./components/sections/HomeSection'));
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection'));
const ActivitiesSection = lazy(() => import('./components/sections/ActivitiesSection'));
const ProblemSolvingSection = lazy(() => import('./components/sections/ProblemSolvingSection'));
const ResearchSection = lazy(() => import('./components/sections/ResearchSection'));
const ResumeSection = lazy(() => import('./components/sections/ResumeSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));
const BlogSection = lazy(() => import('./components/sections/BlogSection'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const StudioPage = lazy(() => import('./pages/StudioPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Section component lookup map
const SECTIONS: Record<string, React.ComponentType<{ id: string; isActive: boolean }>> = {
  home: HomeSection,
  about: AboutSection,
  projects: ProjectsSection,
  'problem-solving': ProblemSolvingSection,
  research: ResearchSection,
  skills: SkillsSection,
  activities: ActivitiesSection,
  resume: ResumeSection,
  contact: ContactSection,
  blog: BlogSection,
};

// Loading fallback component with modern styling
const SectionLoader: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      color: 'var(--text-color, #333)',
    }}
  >
    <div
      className="loading-spinner"
      aria-label="Loading content"
      role="status"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(99, 102, 241, 0.2)',
          borderTopColor: '#6366f1',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Loading...</span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

// Main portfolio component with sections
const PortfolioApp = () => {
  const [activeSection, setActiveSection] = useState('home');
  const layoutRef = useRef<HTMLDivElement>(null);

  // Set active section from URL parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sectionParam = queryParams.get('section');

    if (sectionParam) {
      setActiveSection(sectionParam);
    }
  }, []);

  // Reset scroll to top whenever active section changes
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeSection]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const ActiveComponent = SECTIONS[activeSection] || HomeSection;

  return (
    <ThemeProvider>
      <HelmetProvider>
        <UnifiedSEO section={activeSection} />
        <PerformanceOptimizer />
        <GlobalStyles />
        <Layout
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
          ref={layoutRef}
        >
          <Suspense fallback={<SectionLoader />}>
            <ActiveComponent key={activeSection} id={activeSection} isActive={true} />
          </Suspense>
        </Layout>
        <BackToTop />
      </HelmetProvider>
    </ThemeProvider>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has visited before in this session
    const visited = sessionStorage.getItem('hasVisited');
    if (visited) {
      setShowSplash(false);
      setHasVisited(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasVisited', 'true');
  };

  const isStudioRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/studio');

  return (
    <HelmetProvider>
      <QueryProvider>
        <ThemeProvider>
          <GlobalStyles />
          {showSplash && !hasVisited && !isStudioRoute ? (
            <SplashScreen onComplete={handleSplashComplete} minimumDuration={800} />
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<PortfolioApp />} />
                <Route
                  path="/blog/:slug"
                  element={
                    <Suspense fallback={<SectionLoader />}>
                      <BlogPostPage />
                    </Suspense>
                  }
                />
                <Route path="/blog" element={<Navigate to="/?section=blog" replace />} />
                <Route
                  path="/studio/*"
                  element={
                    <Suspense fallback={<SectionLoader />}>
                      <StudioPage />
                    </Suspense>
                  }
                />
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<SectionLoader />}>
                      <NotFoundPage />
                    </Suspense>
                  }
                />
              </Routes>
            </BrowserRouter>
          )}
        </ThemeProvider>
      </QueryProvider>
    </HelmetProvider>
  );
}

export default App;
