import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import SectionContainer from '../layout/SectionContainer';
import Typewriter from '../common/Typewriter';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaCode,
  FaResearchgate,
  FaGoogleDrive,
} from 'react-icons/fa';
import {
  SiCodeforces,
  SiLeetcode,
  SiCodechef,
  SiCoder,
  SiKaggle,
} from 'react-icons/si';
import { IconWrapper } from '../common/IconWrapper';
import { useProfile } from '../../hooks/useProfile';
import { useSocialLinks } from '../../hooks/useSocialLinks';

const getSocialIcon = (platform: string) => {
  const p = (platform || '').toLowerCase();
  if (p.includes('github')) return FaGithub;
  if (p.includes('linkedin')) return FaLinkedin;
  if (p.includes('twitter') || p.includes('x')) return FaTwitter;
  if (p.includes('facebook')) return FaFacebook;
  if (p.includes('instagram')) return FaInstagram;
  if (p.includes('youtube')) return FaYoutube;
  if (p.includes('email') || p.includes('mail')) return FaEnvelope;
  if (p.includes('researchgate')) return FaResearchgate;
  if (p.includes('codeforces')) return SiCodeforces;
  if (p.includes('codechef')) return SiCodechef;
  if (p.includes('leetcode')) return SiLeetcode;
  if (p.includes('atcoder')) return SiCoder;
  if (p.includes('kaggle')) return SiKaggle;
  if (p.includes('drive')) return FaGoogleDrive;
  return FaCode;
};

type HomeSectionProps = {
  id: string;
  isActive: boolean;
};

const HomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 40px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  max-width: 600px;
`;

const ImageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;

  @media (max-width: 992px) {
    margin-top: 40px;
    max-width: 350px;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 3px solid rgba(255, 255, 255, 0.1);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
`;

const ImageBorder = styled(motion.div)`
  padding: 10px;
  border-radius: 20px;
  background: ${({ theme }) => theme.metalGradient};
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 20%,
      rgba(255, 255, 255, 0) 80%
    );
    transform: rotate(45deg);
    pointer-events: none;
    z-index: 1;
    transition: all 0.5s ease;
  }

  &:hover {
    &::before {
      top: -30%;
      left: -30%;
      opacity: 0.8;
    }
  }
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.textGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Name = styled.span`
  display: block;
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
  min-height: 3.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    min-height: 3rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.text};
  max-width: 600px;
`;

// const ButtonContainer = styled(motion.div)`
//   display: flex;
//   gap: 20px;
//   margin-bottom: 40px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 15px;
//   }
// `;

// const PrimaryButton = styled(motion.a)`
//   background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
//   color: #fff;
//   padding: 12px 30px;
//   border-radius: 30px;
//   font-weight: 500;
//   text-decoration: none;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
//   }
// `;

// const SecondaryButton = styled(motion.a)`
//   background: ${({ theme }) => theme.buttonGradient};
//   color: ${({ theme }) => theme.text};
//   padding: 12px 30px;
//   border-radius: 30px;
//   font-weight: 500;
//   text-decoration: none;
//   box-shadow: ${({ theme }) => theme.shadow};
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-3px);
//     background: ${({ theme }) => theme.hoverGradient};
//   }
// `;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  max-width: 350px;
`;

const SocialLink = styled(motion.a)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${({ theme }) => theme.buttonGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadow};

  &:hover {
    transform: translateY(-5px);
    background: ${({ theme }) => theme.hoverGradient};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalBox = styled(motion.div)`
  background: ${({ theme }) => theme.buttonGradient};
  border-radius: 16px;
  padding: 32px;
  min-width: 320px;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ModalTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.3rem;
  margin: 0;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ModalButton = styled.button`
  padding: 10px 28px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.accent}
  );
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ModalError = styled.p`
  color: #ff4d4d;
  font-size: 0.9rem;
  margin: 0;
`;

const ModalCancelButton = styled.button`
  padding: 8px 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ModalButtonRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
`;

const HomeSection: React.FC<HomeSectionProps> = ({ id, isActive }) => {
  const { data: profile } = useProfile();
  const { data: dynamicSocialLinks } = useSocialLinks('home');

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const fullName = profile?.fullName || '';
  const heroBio = profile?.heroBio || '';
  const typewriterTitles = profile?.typewriterTitles?.length
    ? profile.typewriterTitles
    : ['Researcher', 'Academic', 'Computer Scientist'];
  const heroImage = profile?.heroImageUrl || '/home2.webp';
  const driveUrl = profile?.driveUrl || '';
  const drivePassword = profile?.drivePassword || '';

  useEffect(() => {
    if (showPasswordModal) {
      passwordInputRef.current?.focus();
    }
  }, [showPasswordModal]);

  const handleDriveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!driveUrl) return;
    if (!drivePassword) {
      window.open(driveUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setPassword('');
    setError(false);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    if (password === drivePassword) {
      setShowPasswordModal(false);
      setError(false);
      window.open(driveUrl, '_blank', 'noopener,noreferrer');
    } else {
      setError(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handlePasswordSubmit();
    if (e.key === 'Escape') setShowPasswordModal(false);
  };

  return (
    <>
      <SectionContainer id={id} isActive={isActive}>
        <HomeContainer>
          <HomeContent>
            <Heading>
              <Name>{fullName}</Name>
            </Heading>
            <Title
              initial={{ opacity: 0, y: -20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typewriter
                texts={typewriterTitles}
                typingSpeed={80}
                deletingSpeed={40}
                delayBetween={2500}
              />
            </Title>

            <Description
              initial={{ opacity: 0, y: -20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {heroBio}
            </Description>

            <SocialLinks
              initial={{ opacity: 0, y: -20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {dynamicSocialLinks && dynamicSocialLinks.length > 0
                ? dynamicSocialLinks.map((link) => {
                    const isDrive =
                      link.platform?.toLowerCase().includes('drive') ||
                      link.url?.includes('drive.google.com');
                    if (isDrive) {
                      return (
                        <SocialLink
                          key={link.id || link.sanityId}
                          as="button"
                          onClick={handleDriveClick}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ border: 'none', cursor: 'pointer' }}
                          title={link.label}
                        >
                          <IconWrapper icon={getSocialIcon(link.platform)} size={22} />
                        </SocialLink>
                      );
                    }
                    return (
                      <SocialLink
                        key={link.id || link.sanityId}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={link.label}
                      >
                        <IconWrapper icon={getSocialIcon(link.platform)} size={22} />
                      </SocialLink>
                    );
                  })
                : null}
              {(!dynamicSocialLinks || dynamicSocialLinks.length === 0) && (
                <SocialLink
                  as="button"
                  onClick={handleDriveClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ border: 'none', cursor: 'pointer' }}
                  title="Google Drive"
                >
                  <IconWrapper icon={FaGoogleDrive} size={22} />
                </SocialLink>
              )}
            </SocialLinks>
          </HomeContent>

          <ImageContainer
            initial={{ opacity: 0, x: 50 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <ImageBorder whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
              <ProfileImage src={heroImage} alt={fullName} />
            </ImageBorder>
          </ImageContainer>
        </HomeContainer>
      </SectionContainer>

      <AnimatePresence>
        {showPasswordModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPasswordModal(false)}
          >
            <ModalBox
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <ModalTitle>Enter Password</ModalTitle>
              <ModalInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                onKeyDown={handleKeyDown}
                ref={passwordInputRef}
              />
              {error && <ModalError>Wrong password. Try again.</ModalError>}
              <ModalButtonRow>
                <ModalCancelButton onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </ModalCancelButton>
                <ModalButton onClick={handlePasswordSubmit}>Submit</ModalButton>
              </ModalButtonRow>
            </ModalBox>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeSection;
