import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionContainer from '../layout/SectionContainer';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { IconWrapper } from '../common/IconWrapper';
import { useProfile } from '../../hooks/useProfile';
import { useEducation } from '../../hooks/useEducation';
import { useExperience } from '../../hooks/useExperience';

type AboutSectionProps = {
  id: string;
  isActive: boolean;
};

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Biography = styled(motion.div)`
  background: ${({ theme }) => `${theme.cardBackground}e8`};
  border-radius: 15px;
  padding: 25px;
  border: 1px solid ${({ theme }) => theme.primary};
  margin-bottom: 30px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const BioText = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  margin-right: 10px;
  min-width: 120px;
`;

const InfoValue = styled.span`
  color: ${({ theme }) => theme.text};
`;

const TimelineContainer = styled(motion.div)`
  margin-top: 30px;
`;

const TimelineTitle = styled(motion.h3)`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  margin-bottom: 25px;
  position: relative;

  &:not(:last-child):before {
    content: '';
    position: absolute;
    left: 25px;
    top: 40px;
    height: calc(100% - 15px);
    width: 2px;
    background: ${({ theme }) => theme.primary};
    opacity: 0.5;
  }
`;

const TimelineIconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.metalGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  flex-shrink: 0;
  border: 2px solid ${({ theme }) => theme.primary};
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 1;
`;

const TimelineContent = styled.div`
  background: ${({ theme }) => `${theme.cardBackground}e8`};
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow};
  flex-grow: 1;
  border: 1px solid ${({ theme }) => theme.border};
`;

const TimelinePeriod = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 5px;
`;

const TimelineTitle2 = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text};
`;

const TimelineLocation = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 10px;
`;

const TimelineDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const AboutSection: React.FC<AboutSectionProps> = ({ id, isActive }) => {
  const { data: profile } = useProfile();
  const { data: educationData } = useEducation();
  const { data: experienceData } = useExperience();

  const aboutParagraphs = profile?.aboutParagraphs?.length
    ? profile.aboutParagraphs
    : profile?.heroBio
      ? [profile.heroBio]
      : [];

  const infoGrid = profile?.infoGrid || {};
  const displayName = infoGrid.name || profile?.fullName;

  return (
    <SectionContainer id={id} isActive={isActive}>
      <AboutContent>
        <SectionTitle
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </SectionTitle>

        <Biography
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {aboutParagraphs.map((para, idx) => (
            <BioText key={`bio-para-${idx}`}>{para}</BioText>
          ))}

          <InfoGrid>
            {displayName && (
              <InfoItem>
                <InfoLabel>Name:</InfoLabel>
                <InfoValue>{displayName}</InfoValue>
              </InfoItem>
            )}
            {infoGrid.email && (
              <InfoItem>
                <InfoLabel>Email:</InfoLabel>
                <InfoValue>{infoGrid.email}</InfoValue>
              </InfoItem>
            )}
            {infoGrid.location && (
              <InfoItem>
                <InfoLabel>Location:</InfoLabel>
                <InfoValue>{infoGrid.location}</InfoValue>
              </InfoItem>
            )}
            {infoGrid.field && (
              <InfoItem>
                <InfoLabel>Field:</InfoLabel>
                <InfoValue>{infoGrid.field}</InfoValue>
              </InfoItem>
            )}
          </InfoGrid>
        </Biography>

        <TimelineContainer
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          <TimelineTitle variants={itemVariants}>Education</TimelineTitle>

          {educationData && educationData.length > 0 ? (
            educationData.map((item, index) => (
              <TimelineItem key={`education-${item.id || index}`} variants={itemVariants}>
                <TimelineIconContainer>
                  <IconWrapper icon={FaGraduationCap} size={20} />
                </TimelineIconContainer>
                <TimelineContent>
                  <TimelinePeriod>{item.period}</TimelinePeriod>
                  <TimelineTitle2>{item.title}</TimelineTitle2>
                  <TimelineLocation>{item.institution}</TimelineLocation>
                  {item.description && (
                    <TimelineDescription>{item.description}</TimelineDescription>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))
          ) : null}

          <TimelineTitle variants={itemVariants} style={{ marginTop: 40 }}>
            Experience
          </TimelineTitle>

          {experienceData && experienceData.length > 0 ? (
            experienceData.map((item, index) => (
              <TimelineItem key={`experience-${item.id || index}`} variants={itemVariants}>
                <TimelineIconContainer>
                  <IconWrapper icon={FaBriefcase} size={20} />
                </TimelineIconContainer>
                <TimelineContent>
                  <TimelinePeriod>{item.period}</TimelinePeriod>
                  <TimelineTitle2>{item.title}</TimelineTitle2>
                  <TimelineLocation>{item.location}</TimelineLocation>
                  <TimelineDescription>{item.description}</TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))
          ) : null}
        </TimelineContainer>
      </AboutContent>
    </SectionContainer>
  );
};

export default AboutSection;
