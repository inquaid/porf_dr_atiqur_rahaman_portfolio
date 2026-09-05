import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  contain: strict;
`;

const GradientLayer = styled.div<{ $isDarkMode: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.$isDarkMode
      ? 'radial-gradient(ellipse at 20% 15%, #150a25 0%, #0a0a14 50%, #070d18 100%)'
      : 'radial-gradient(ellipse at 20% 15%, #ede9fe 0%, #f8fafc 50%, #e0e7ff 100%)'};
  transition: background 0.3s ease;
`;

const GridLayer = styled.div<{ $isDarkMode: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(
      ${(props) => (props.$isDarkMode ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.04)')}
        1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      ${(props) => (props.$isDarkMode ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.04)')}
        1px,
      transparent 1px
    );
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 95%);
  -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 95%);
`;

const AmbientGlow = styled.div<{
  $top: string;
  $left: string;
  $size: string;
  $color: string;
}>`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  border-radius: 50%;
  background: ${(props) => props.$color};
  pointer-events: none;
`;

const ParticleBackground: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <BackgroundWrapper aria-hidden="true">
      {/* Static GPU-cached background layers: 0% CPU/GPU overhead */}
      <GradientLayer $isDarkMode={isDarkMode} />
      <GridLayer $isDarkMode={isDarkMode} />

      {/* Static ambient accent glow orbs with no CSS animations */}
      <AmbientGlow
        $top="-5%"
        $left="10%"
        $size="500px"
        $color={
          isDarkMode
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)'
        }
      />
      <AmbientGlow
        $top="55%"
        $left="65%"
        $size="450px"
        $color={
          isDarkMode
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)'
        }
      />
    </BackgroundWrapper>
  );
};

export default React.memo(ParticleBackground);
