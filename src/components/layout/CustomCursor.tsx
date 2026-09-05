import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
`;

const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  margin-top: -5px;
  margin-left: -5px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  box-shadow: 0 0 8px ${({ theme }) => `${theme.primary}80`};
`;

const CursorRing = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  margin-top: -16px;
  margin-left: -16px;
  border: 1.5px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  will-change: transform;
  background: ${({ theme }) => `${theme.primary}10`};
`;

const CustomCursor: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Motion values bypass React re-renders on mousemove
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Fast, responsive spring for cursor dot
  const dotX = useSpring(rawX, { damping: 28, stiffness: 600, mass: 0.1 });
  const dotY = useSpring(rawY, { damping: 28, stiffness: 600, mass: 0.1 });

  // Smooth, trailing spring for cursor ring
  const ringX = useSpring(rawX, { damping: 22, stiffness: 220, mass: 0.4 });
  const ringY = useSpring(rawY, { damping: 22, stiffness: 220, mass: 0.4 });

  useEffect(() => {
    // Skip on touch devices
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(pointer: coarse)').matches ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isActive) setIsActive(true);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select');
      setHovered(!!isInteractive);
    };

    const handleMouseLeave = () => setIsActive(false);
    const handleMouseEnter = () => setIsActive(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [rawX, rawY, isActive]);

  // Don't render on mobile or touch devices
  if (
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  ) {
    return null;
  }

  return (
    <CursorContainer>
      <CursorDot
        style={{
          x: dotX,
          y: dotY,
          opacity: isActive ? 1 : 0,
        }}
        animate={{
          scale: clicked ? 0.6 : hovered ? 1.4 : 1,
        }}
        transition={{
          duration: 0.15,
          ease: 'easeOut',
        }}
      />

      <CursorRing
        style={{
          x: ringX,
          y: ringY,
          opacity: isActive ? 1 : 0,
        }}
        animate={{
          scale: clicked ? 1.3 : hovered ? 1.6 : 1,
        }}
        transition={{
          duration: 0.15,
          ease: 'easeOut',
        }}
      />
    </CursorContainer>
  );
};

export default CustomCursor;
