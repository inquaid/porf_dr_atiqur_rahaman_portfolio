import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionContainer from '../layout/SectionContainer';
import {
  FaCode,
  FaJava,
  FaDatabase,
  FaLaptopCode,
  FaPhp,
  FaHtml5,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaLinux,
  FaWindows,
} from 'react-icons/fa';
import {
  SiCplusplus,
  SiJavascript,
  SiCss3,
  SiGnubash,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiOpencv,
  SiAutocad,
  SiArduino,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobepremierepro,
  SiCanva,
  SiThealgorithms,
  SiLibreoffice,
} from 'react-icons/si';
import { GrCertificate } from 'react-icons/gr';
import { IconWrapper } from '../common/IconWrapper';
import { VscTerminalPowershell } from 'react-icons/vsc';
import { AiOutlinePython } from 'react-icons/ai';
import { useSkills } from '../../hooks/useSkills';

type SkillsSectionProps = {
  id: string;
  isActive: boolean;
};

// type SkillType = {
//   name: string;
//   icon: React.ComponentType;
//   level: string;
//   years: string;
// };

const SkillsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, ${({ theme }) => theme.accent}22, transparent 70%);
    border-radius: 50%;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: -20px;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, ${({ theme }) => theme.primary}22, transparent 70%);
    border-radius: 50%;
    z-index: -1;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 30px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 3px;
    background: ${({ theme }) => theme.accent};
    border-radius: 2px;
    box-shadow: 0 0 8px ${({ theme }) => theme.accent}88;
  }
`;

const CategoryContainer = styled(motion.div)`
  margin-bottom: 40px;
  padding: 25px;
  border-radius: 15px;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.background}, ${theme.background})`};
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  will-change: transform;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const CategoryTitle = styled(motion.h3)`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 25px;
    margin-right: 10px;
    background: ${({ theme }) => theme.accent};
    border-radius: 4px;
    box-shadow: 0 0 10px ${({ theme }) => theme.accent}88;
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 24px;
  }
`;

const SkillTag = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px;
  background: ${({ theme }) => theme.metalGradient};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  will-change: transform;

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
    transform: translateY(-8px) perspective(600px) rotateX(10deg);
    box-shadow:
      0 15px 30px rgba(0, 0, 0, 0.2),
      0 5px 15px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.accent};

    &::before {
      top: -30%;
      left: -30%;
      opacity: 0.8;
    }
  }
`;

const SkillIcon = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.accent};
  font-size: 28px;
  height: 40px;
  width: 40px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  svg {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
`;

const SkillName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 10px;
`;

interface SkillLevelProps {
  levelValue: string;
}

const SkillLevel = styled.div<SkillLevelProps>`
  width: 100%;
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-top: auto;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.accent}
    );
    border-radius: 3px;
    box-shadow: 0 0 6px ${({ theme }) => theme.accent}88;
    width: ${(props) => props.levelValue || '80%'};
    transition: width 1s ease;
  }
`;

// const SkillDetails = styled(motion.div)`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   padding: 15px;
//   background: rgba(0, 0, 0, 0.8);
//   color: white;
//   backdrop-filter: blur(5px);
//   border-top: 1px solid ${({ theme }) => theme.accent};
//   transform: translateY(100%);
//   transition: transform 0.3s ease;
// `;

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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
      duration: 0.5,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      when: 'beforeChildren',
    },
  },
};

const getSkillIcon = (keyOrName: string) => {
  const k = (keyOrName || '').toLowerCase();
  if (k.includes('c++') || k.includes('cpp')) return SiCplusplus;
  if (k.includes('python')) return AiOutlinePython;
  if (k.includes('java') && !k.includes('script')) return FaJava;
  if (k.includes('php')) return FaPhp;
  if (k.includes('javascript') || k.includes('js')) return SiJavascript;
  if (k.includes('html')) return FaHtml5;
  if (k.includes('css')) return SiCss3;
  if (k.includes('figma')) return FaFigma;
  if (k.includes('sql') || k.includes('database') || k.includes('postgres')) return FaDatabase;
  if (k.includes('git') && !k.includes('github')) return FaGitAlt;
  if (k.includes('github')) return FaGithub;
  if (k.includes('bash')) return SiGnubash;
  if (k.includes('powershell') || k.includes('terminal')) return VscTerminalPowershell;
  if (k.includes('scikit') || k.includes('learn')) return SiScikitlearn;
  if (k.includes('pandas')) return SiPandas;
  if (k.includes('numpy')) return SiNumpy;
  if (k.includes('opencv')) return SiOpencv;
  if (k.includes('linux')) return FaLinux;
  if (k.includes('windows')) return FaWindows;
  if (k.includes('autocad') || k.includes('cad')) return SiAutocad;
  if (k.includes('arduino')) return SiArduino;
  if (k.includes('photoshop')) return SiAdobephotoshop;
  if (k.includes('illustrator')) return SiAdobeillustrator;
  if (k.includes('premiere')) return SiAdobepremierepro;
  if (k.includes('canva')) return SiCanva;
  if (k.includes('problem')) return FaLaptopCode;
  if (k.includes('leadership') || k.includes('certificate')) return GrCertificate;
  if (k.includes('algorithm')) return SiThealgorithms;
  if (k.includes('office') || k.includes('libre')) return SiLibreoffice;
  return FaCode;
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ id, isActive }) => {
  const { data: skillCategoriesData } = useSkills();

  return (
    <SectionContainer id={id} isActive={isActive}>
      <SkillsContent>
        <SectionTitle
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skills & Expertise
        </SectionTitle>

        {skillCategoriesData && skillCategoriesData.length > 0 ? (
          skillCategoriesData.map((category, categoryIndex) => {
            const skillsList = Array.isArray(category.skills) ? category.skills : [];
            return (
              <CategoryContainer
                key={category.id || category.sanityId || categoryIndex}
                variants={categoryVariants}
                initial="hidden"
                animate={isActive ? 'visible' : 'hidden'}
                transition={{ delay: categoryIndex * 0.2 }}
              >
                <CategoryTitle>{category.title}</CategoryTitle>

                <SkillsGrid
                  variants={containerVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                >
                  {skillsList.map((skill: any, index: number) => {
                    const skillName = typeof skill === 'string' ? skill : skill.name;
                    const skillLevel = typeof skill === 'object' && skill.level ? skill.level : '80%';
                    const skillIcon = getSkillIcon(skill.iconKey || skillName);

                    return (
                      <SkillTag
                        key={`${category.id || categoryIndex}-${index}`}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <SkillIcon>
                          <IconWrapper icon={skillIcon} size={24} />
                        </SkillIcon>
                        <SkillName>{skillName}</SkillName>
                        <SkillLevel levelValue={skillLevel} />
                      </SkillTag>
                    );
                  })}
                </SkillsGrid>
              </CategoryContainer>
            );
          })
        ) : null}
      </SkillsContent>
    </SectionContainer>
  );
};

export default SkillsSection;
