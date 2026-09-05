import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionContainer from '../layout/SectionContainer';
import { FaRocket, FaLaptopCode, FaAward, FaUsers } from 'react-icons/fa';
import { IconWrapper } from '../common/IconWrapper';
import { useActivities } from '../../hooks/useActivities';

const getActivityIcon = (iconKey?: string) => {
  const k = (iconKey || '').toLowerCase();
  if (k.includes('code') || k.includes('laptop') || k.includes('programming')) return FaLaptopCode;
  if (k.includes('award') || k.includes('trophy')) return FaAward;
  if (k.includes('user') || k.includes('team') || k.includes('club')) return FaUsers;
  return FaRocket;
};

type ActivitiesSectionProps = {
  id: string;
  isActive: boolean;
};

const ActivitiesContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 40px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ActivitiesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ActivityCard = styled(motion.div)`
  background: ${({ theme }) => `${theme.cardBackground}f0`};
  border-radius: 15px;
  padding: 25px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.accent}
    );
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const ActivityIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.metalGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.accent};
  font-size: 24px;
  border: 2px solid ${({ theme }) => theme.primary};
  box-shadow: ${({ theme }) => theme.shadow};
`;

const ActivityTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const ActivityDescription = styled.p`
  color: ${({ theme }) => theme.text};
  text-align: center;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const ActivityDate = styled.p`
  color: ${({ theme }) => theme.secondary};
  font-size: 0.9rem;
  font-style: italic;
  margin-top: auto;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ id, isActive }) => {
  const { data: activitiesData } = useActivities();

  return (
    <SectionContainer id={id} isActive={isActive}>
      <ActivitiesContent>
        <SectionTitle
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Extracurricular Activities
        </SectionTitle>

        {activitiesData && activitiesData.length > 0 ? (
          <ActivitiesGrid
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
          >
            {activitiesData.map((activity, idx) => (
              <ActivityCard key={activity.id || activity.sanityId || idx} variants={cardVariants}>
                <ActivityIcon>
                  <IconWrapper icon={getActivityIcon(activity.iconKey)} size={24} />
                </ActivityIcon>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityDescription>{activity.description}</ActivityDescription>
                {activity.date && <ActivityDate>{activity.date}</ActivityDate>}
              </ActivityCard>
            ))}
          </ActivitiesGrid>
        ) : null}
      </ActivitiesContent>
    </SectionContainer>
  );
};

export default ActivitiesSection;
