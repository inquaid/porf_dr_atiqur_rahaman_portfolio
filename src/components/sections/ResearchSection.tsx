import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionContainer from '../layout/SectionContainer';
import { FaBook } from 'react-icons/fa';
import { IconWrapper } from '../common/IconWrapper';
import { useResearch } from '../../hooks/useResearch';
import { useProfile } from '../../hooks/useProfile';

type ResearchSectionProps = {
  id: string;
  isActive: boolean;
};

const ResearchContent = styled.div`
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
  margin-bottom: 40px;
  max-width: 800px;
`;

const PublicationsList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
`;

const PublicationItem = styled(motion.div)`
  background: ${({ theme }) => `${theme.cardBackground}f0`};
  border-radius: 12px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const PublicationTitle = styled.h4`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
`;

const PublicationAuthors = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 10px;
`;

const PublicationVenue = styled.div`
  font-style: italic;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 15px;
`;

const PublicationAbstract = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

const PublicationLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.buttonGradient};
  color: ${({ theme }) => theme.text};
  padding: 8px 15px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 15px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.hoverGradient};
    transform: translateY(-2px);
  }
`;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const ResearchSection: React.FC<ResearchSectionProps> = ({ id, isActive }) => {
  const { data: sanityResearch } = useResearch();
  const { data: profile } = useProfile();

  const displayPublications =
    sanityResearch && sanityResearch.length > 0
      ? sanityResearch.map((r, idx) => ({
          id: r._id || r.id || idx + 1,
          title: r.title,
          authors: Array.isArray(r.authors)
            ? r.authors.join(', ')
            : r.authors || profile?.fullName || '',
          venue: [r.conference, r.year].filter(Boolean).join(', '),
          abstract: r.abstract,
          link: r.pdfUrl || r.doi || '#',
        }))
      : [];

  return (
    <SectionContainer id={id} isActive={isActive}>
      <ResearchContent>
        <SectionTitle
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Research
        </SectionTitle>

        <SectionDescription
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          My research interests span multiple areas of computer science. Here are my current
          research areas and selected publications.
        </SectionDescription>

        <PublicationsList
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.h3
            variants={itemVariants}
            style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'inherit' }}
          >
            Selected Publications
          </motion.h3>

          {displayPublications.map((pub) => (
            <PublicationItem key={pub.id} variants={itemVariants}>
              <PublicationTitle>{pub.title}</PublicationTitle>
              <PublicationAuthors>{pub.authors}</PublicationAuthors>
              <PublicationVenue>{pub.venue}</PublicationVenue>
              <PublicationAbstract>{pub.abstract}</PublicationAbstract>
              {pub.link && pub.link !== '#' && (
                <PublicationLink href={pub.link} target="_blank" rel="noopener noreferrer">
                  <IconWrapper icon={FaBook} size={16} /> View Publication
                </PublicationLink>
              )}
            </PublicationItem>
          ))}
        </PublicationsList>
      </ResearchContent>
    </SectionContainer>
  );
};

export default ResearchSection;
