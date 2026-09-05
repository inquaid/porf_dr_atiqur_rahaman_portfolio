import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionContainer from '../layout/SectionContainer';
import { FaTrophy, FaCode, FaStar, FaChartLine, FaRegIdBadge } from 'react-icons/fa';
import { IconWrapper } from '../common/IconWrapper';
import { useAchievements } from '../../hooks/useAchievements';

type ProblemSolvingSectionProps = {
  id: string;
  isActive: boolean;
};

const ProblemSolvingContent = styled.div`
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

const SectionDescription = styled(motion.p)`
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 800px;
`;

// const ChallengesGrid = styled(motion.div)`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 30px;

//   @media (min-width: 768px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
// `;

// const ChallengeCard = styled(motion.div)`
//   background: ${({ theme }) => `${theme.cardBackground}f0`};
//   border-radius: 15px;
//   padding: 25px;
//   box-shadow: ${({ theme }) => theme.shadow};
//   border: 1px solid ${({ theme }) => theme.border};
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//     border-color: ${({ theme }) => theme.primary};
//   }
// `;

// const ChallengeHeader = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 15px;
// `;

// const ChallengeIcon = styled.div`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   background: ${({ theme }) => theme.metalGradient};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 15px;
//   flex-shrink: 0;
//   border: 2px solid ${({ theme }) => theme.primary};
//   box-shadow: ${({ theme }) => theme.shadow};
// `;

// const ChallengeTitle = styled.h3`
//   font-size: 1.4rem;
//   color: ${({ theme }) => theme.text};
// `;

// const ChallengeDescription = styled.p`
//   color: ${({ theme }) => theme.text};
//   font-size: 1rem;
//   line-height: 1.6;
//   margin-bottom: 20px;
// `;

// const ChallengeMeta = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 15px;
//   margin-bottom: 20px;
// `;

// const ChallengeMetaItem = styled.span`
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   color: ${({ theme }) => theme.accent};
//   font-size: 0.9rem;
// `;

// const SkillTag = styled.span`
//   background: ${({ theme }) => theme.buttonGradient};
//   padding: 5px 12px;
//   border-radius: 20px;
//   font-size: 0.8rem;
//   color: ${({ theme }) => theme.text};
//   margin-right: 8px;
//   margin-bottom: 8px;
//   display: inline-block;
// `;

// const SkillsContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `;

const ContestSection = styled(motion.div)`
  margin-top: 40px;
`;

const ContestTitle = styled(motion.h3)`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const ContestTimelineContainer = styled(motion.div)`
  position: relative;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    bottom: 10px;
    width: 2px;
    background: ${({ theme }) => theme.primary};
    opacity: 0.4;
  }

  @media (max-width: 600px) {
    margin-left: 10px;
  }
`;

const ContestItem = styled(motion.div)`
  position: relative;
  padding-left: 28px;

  &::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 22px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.accent};
    border: 3px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 10px ${({ theme }) => `${theme.primary}60`};
  }
`;

const ContestCard = styled.div`
  background: ${({ theme }) => `${theme.cardBackground}f0`};
  border-radius: 14px;
  padding: 18px 22px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 8px;
`;

const ContestName = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const ContestDate = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.accent};
  background: ${({ theme }) => `${theme.accent}15`};
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => `${theme.accent}30`};
  white-space: nowrap;
`;

const ContestResult = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 8px;
`;

const ContestDescription = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.85;
  margin: 0;
`;

const PlatformsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PlatformCard = styled(motion.div)`
  background: ${({ theme }) => `${theme.cardBackground}f0`};
  border-radius: 15px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const PlatformHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const PlatformIcon = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${({ theme }) => theme.metalGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
  border: 2px solid ${({ theme }) => theme.primary};
  box-shadow: ${({ theme }) => theme.shadow};
`;

const PlatformName = styled.h3`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
`;

const PlatformStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  opacity: 0.8;
`;

const StatValue = styled.span`
  color: ${({ theme }) => theme.accent};
  font-weight: 600;
  font-size: 1rem;
`;

const SectionSubtitle = styled(motion.h3)`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
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

// const challenges = [
//   {
//     id: 1,
//     title: 'Graph Algorithm Optimization',
//     description: 'Developed an optimized implementation of Dijkstra\'s algorithm for a route planning system, reducing computational complexity and improving performance by 40%.',
//     platform: 'Company Project',
//     difficulty: 'Hard',
//     skills: ['Graph Theory', 'Dynamic Programming', 'Algorithm Optimization', 'C++']
//   },
//   {
//     id: 2,
//     title: 'Database Query Optimization',
//     description: 'Restructured complex SQL queries and implemented indexing strategies, resulting in a 70% reduction in query execution time for a high-traffic web application.',
//     platform: 'Personal Project',
//     difficulty: 'Medium',
//     skills: ['SQL', 'Database Design', 'Performance Tuning', 'Indexing']
//   },
//   {
//     id: 3,
//     title: 'Distributed Systems Fault Tolerance',
//     description: 'Implemented a fault-tolerant consensus algorithm for distributed data storage, ensuring system reliability under network partition scenarios.',
//     platform: 'Research Project',
//     difficulty: 'Hard',
//     skills: ['Distributed Systems', 'Fault Tolerance', 'Go', 'System Design']
//   },
//   {
//     id: 4,
//     title: 'Image Processing Pipeline',
//     description: 'Designed and implemented an efficient image processing pipeline for real-time object detection, leveraging parallel processing techniques to meet strict latency requirements.',
//     platform: 'Hackathon',
//     difficulty: 'Medium',
//     skills: ['Computer Vision', 'Parallel Processing', 'Python', 'OpenCV']
//   }
// ];

const ProblemSolvingSection: React.FC<ProblemSolvingSectionProps> = ({ id, isActive }) => {
  const { data: achievements } = useAchievements();

  const platforms = achievements
    ? achievements
        .filter((a) => a.type === 'platform')
        .sort((a, b) => (a.order ?? 10) - (b.order ?? 10))
        .map((p) => ({
          id: p.id || p.sanityId,
          name: p.platformName || '',
          account: p.account || '',
          accountUrl: p.accountUrl || '',
          highestRating: p.highestRating || 'N/A',
          solveCount: p.solveCount || '',
          contests: p.contestCount || '',
        }))
    : [];

  const contests = achievements
    ? achievements
        .filter((a) => a.type === 'contest')
        .sort((a, b) => (a.order ?? 10) - (b.order ?? 10))
        .map((c) => ({
          id: c.id || c.sanityId,
          name: c.contestName || (c as any).title || (c as any).name || c.platformName || 'Contest Participation',
          date: c.date || '',
          result: c.result || '',
          description: c.description || '',
        }))
    : [];

  return (
    <SectionContainer id={id} isActive={isActive}>
      <ProblemSolvingContent>
        <SectionTitle
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Achievements
        </SectionTitle>

        <SectionDescription
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Throughout my career, I&apos;ve tackled a wide range of technical challenges and
          participated in various contests to sharpen my skills. Here are some highlights of my
          experience.
        </SectionDescription>

        {platforms.length > 0 && (
          <>
            <SectionSubtitle
              initial={{ y: -20, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Coding Platform Achievements
            </SectionSubtitle>

            <PlatformsGrid
              variants={containerVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              {platforms.map((platform) => (
                <PlatformCard key={platform.id} variants={itemVariants}>
                  <PlatformHeader>
                    <PlatformIcon>
                      <IconWrapper icon={FaStar} size={22} />
                    </PlatformIcon>
                    <PlatformName>{platform.name}</PlatformName>
                  </PlatformHeader>
                  <PlatformStats>
                    {platform.account && (
                      <StatItem>
                        <IconWrapper icon={FaRegIdBadge} size={14} />
                        <StatLabel>Account:</StatLabel>
                        <StatValue>
                          {platform.accountUrl ? (
                            <a
                              href={platform.accountUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: 'inherit', textDecoration: 'underline' }}
                            >
                              {platform.account}
                            </a>
                          ) : (
                            platform.account
                          )}
                        </StatValue>
                      </StatItem>
                    )}
                    {platform.highestRating && (
                      <StatItem>
                        <IconWrapper icon={FaChartLine} size={14} />
                        <StatLabel>Highest Rating:</StatLabel>
                        <StatValue>{platform.highestRating}</StatValue>
                      </StatItem>
                    )}
                    {platform.solveCount && (
                      <StatItem>
                        <IconWrapper icon={FaCode} size={14} />
                        <StatLabel>Solved:</StatLabel>
                        <StatValue>{platform.solveCount}</StatValue>
                      </StatItem>
                    )}
                    {platform.contests && (
                      <StatItem>
                        <IconWrapper icon={FaTrophy} size={14} />
                        <StatLabel>Contests:</StatLabel>
                        <StatValue>{platform.contests}</StatValue>
                      </StatItem>
                    )}
                  </PlatformStats>
                </PlatformCard>
              ))}
            </PlatformsGrid>
          </>
        )}

        {contests.length > 0 && (
          <ContestSection
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
          >
            <ContestTitle variants={itemVariants}>Awards & Contest Participation</ContestTitle>

            <ContestTimelineContainer
              variants={containerVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              {contests.map((contest) => (
                <ContestItem key={contest.id} variants={itemVariants}>
                  <ContestCard>
                    <ContestHeader>
                      <ContestName>{contest.name}</ContestName>
                      {contest.date && <ContestDate>{contest.date}</ContestDate>}
                    </ContestHeader>
                    {contest.result && (
                      <ContestResult>
                        <IconWrapper icon={FaTrophy} size={16} />
                        <span>{contest.result}</span>
                      </ContestResult>
                    )}
                    {contest.description && (
                      <ContestDescription>{contest.description}</ContestDescription>
                    )}
                  </ContestCard>
                </ContestItem>
              ))}
            </ContestTimelineContainer>
          </ContestSection>
        )}
      </ProblemSolvingContent>
    </SectionContainer>
  );
};

export default ProblemSolvingSection;
