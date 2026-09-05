import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { useProfile } from '../../hooks/useProfile';

const gradientMove = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const SplashContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #0a0a14, #12122a, #0a1420, #150a25);
  background-size: 400% 400%;
  animation: ${gradientMove} 10s ease infinite;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Logo = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 800;
  color: white;
  font-family: 'Oswald', sans-serif;
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4);
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Name = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Oswald', sans-serif;
  letter-spacing: 2px;
  animation: ${float} 2s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 30px;
`;

const LoadingProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
  border-radius: 2px;
`;

const LoadingText = styled(motion.p)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-top: 15px;
  font-family: 'Roboto', sans-serif;
`;

interface SplashScreenProps {
  onComplete: () => void;
  minimumDuration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, minimumDuration = 2000 }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { data: siteSettings } = useSiteSettings();
  const { data: profile } = useProfile();

  const initials =
    siteSettings?.logoInitials ||
    (profile?.shortName || profile?.fullName || '')
      .split(' ')
      .filter((w) => !/^(dr|prof|md|phd)\.?$/i.test(w))
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() ||
    'AR';
  const splashName = (profile?.shortName || profile?.fullName || 'PORTFOLIO').toUpperCase();

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / minimumDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [minimumDuration]);

  useEffect(() => {
    if (isComplete) {
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
  }, [isComplete, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <SplashContainer
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <LogoContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Logo
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.3,
              }}
            >
              {initials}
            </Logo>
            <Name
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {splashName}
            </Name>
          </LogoContainer>

          <LoadingBar>
            <LoadingProgress
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </LoadingBar>

          <LoadingText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {progress < 100 ? 'Loading experience...' : 'Welcome!'}
          </LoadingText>
        </SplashContainer>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
