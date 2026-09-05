import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionContainer from '../layout/SectionContainer';
import { FaDownload } from 'react-icons/fa';
import { IconWrapper } from '../common/IconWrapper';
import { useProfile } from '../../hooks/useProfile';

type ResumeSectionProps = {
  id: string;
  isActive: boolean;
};

const ResumeContent = styled.div`
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

const DownloadButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.buttonGradient};
  color: ${({ theme }) => theme.text};
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  width: fit-content;
  margin-bottom: 40px;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: ${({ theme }) => theme.hoverGradient};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PDFContainer = styled.div`
  width: 100%;
  max-width: 850px;
  height: 800px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => `${theme.cardBackground}f0`};
`;

const PDFEmbed = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const ResumeLinkContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ResumeSection: React.FC<ResumeSectionProps> = ({ id, isActive }) => {
  const { data: profile } = useProfile();

  const resumeUrl = profile?.resumeFileUrl || '/resume.pdf';
  const resumeFileName = profile?.resumeFileName || 'Resume_Azmain_Inquaid_Haque.pdf';

  return (
    <SectionContainer id={id} isActive={isActive}>
      <ResumeContent>
        <SectionTitle
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Resume / CV
        </SectionTitle>

        <ResumeLinkContainer
          initial={{ y: 20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <DownloadButton href={resumeUrl} download={resumeFileName}>
            <IconWrapper icon={FaDownload} size={18} /> Download Resume
          </DownloadButton>

          <DownloadButton href={resumeUrl} target="_blank" rel="noopener noreferrer">
            <IconWrapper icon={FaDownload} size={18} /> Open in New Tab
          </DownloadButton>
        </ResumeLinkContainer>

        <ResumeContainer>
          <PDFContainer>
            {isActive && <PDFEmbed src={resumeUrl} title="Resume" loading="lazy" allowFullScreen />}
          </PDFContainer>
        </ResumeContainer>
      </ResumeContent>
    </SectionContainer>
  );
};

export default ResumeSection;
