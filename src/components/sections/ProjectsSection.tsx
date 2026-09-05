import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionContainer from '../layout/SectionContainer';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaCode,
} from 'react-icons/fa';
import {
  SiTensorflow,
  SiDocker,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiDlib,
  SiOpencv,
  SiCmake,
  SiMysql,
  SiChocolatey,
} from 'react-icons/si';
import { IconWrapper } from '../common/IconWrapper';
import { LuScanFace } from 'react-icons/lu';
import { GiPickle, GiPillow } from 'react-icons/gi';
import { PiFileCpp, PiFileHtmlLight } from 'react-icons/pi';
import { RiJavascriptLine } from 'react-icons/ri';
import { IoLogoCss3 } from 'react-icons/io';
import { TbBrandPowershell } from 'react-icons/tb';
import { useProjects } from '../../hooks/useProjects';
import { urlFor } from '../../lib/sanity';

type ProjectsSectionProps = {
  id: string;
  isActive: boolean;
};

const ProjectsContent = styled.div`
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

const ProjectDescription = styled(motion.p)`
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 800px;
`;

const ProjectsGrid = styled(motion.div)`
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

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => `${theme.cardBackground}e0`};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  will-change: transform;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ProjectImage = styled.div<{ image: string }>`
  height: 200px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
`;

const ProjectContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const ProjectText = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 15px;
  flex-grow: 1;
`;

const ProjectTechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.metalGradient};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.accent};
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    color: ${({ theme }) => theme.primary};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: ${(props) =>
    props.active ? ({ theme }) => theme.primary : ({ theme }) => theme.buttonGradient};
  color: ${(props) => (props.active ? '#fff' : ({ theme }) => theme.text)};
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hoverGradient};
    transform: translateY(-2px);
  }
`;

const getIconForTech = (tech: string) => {
  switch (tech.toLowerCase()) {
    case 'react':
      return <IconWrapper icon={FaReact} />;
    case 'node.js':
      return <IconWrapper icon={FaNodeJs} />;
    case 'python':
      return <IconWrapper icon={FaPython} />;
    case 'tensorflow':
      return <IconWrapper icon={SiTensorflow} />;
    case 'typescript':
      return <IconWrapper icon={SiTypescript} />;
    case 'mongodb':
      return <IconWrapper icon={SiMongodb} />;
    case 'postgresql':
      return <IconWrapper icon={SiPostgresql} />;
    case 'docker':
      return <IconWrapper icon={SiDocker} />;
    case 'java':
      return <IconWrapper icon={FaJava} />;
    case 'dlib':
      return <IconWrapper icon={SiDlib} />;
    case 'face_recognition':
      return <IconWrapper icon={LuScanFace} />;
    case 'opencv':
      return <IconWrapper icon={SiOpencv} />;
    case 'pillow':
      return <IconWrapper icon={GiPillow} />;
    case 'pickle':
      return <IconWrapper icon={GiPickle} />;
    case 'cpp':
      return <IconWrapper icon={PiFileCpp} />;
    case 'cmake':
      return <IconWrapper icon={SiCmake} />;
    case 'mysql':
      return <IconWrapper icon={SiMysql} />;
    case 'javascript':
      return <IconWrapper icon={RiJavascriptLine} />;
    case 'html':
      return <IconWrapper icon={PiFileHtmlLight} />;
    case 'css':
      return <IconWrapper icon={IoLogoCss3} />;
    case 'chocolatey':
      return <IconWrapper icon={SiChocolatey} />;
    case 'batch':
      return <IconWrapper icon={TbBrandPowershell} />;
    default:
      return <IconWrapper icon={FaCode} />;
  }
};

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

const categories = [
  { id: 'all', label: 'All Projects' },
];

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ id, isActive }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { data: sanityProjects } = useProjects();

  const allProjects =
    sanityProjects && sanityProjects.length > 0
      ? sanityProjects.map((p, idx) => ({
          id: p._id || p.id || `proj-${idx}`,
          title: p.title,
          description: p.description,
          image:
            typeof p.mainImage === 'string'
              ? p.mainImage
              : p.mainImage
              ? urlFor(p.mainImage).width(800).auto('format').url()
              : '/demo.png',
          techStack: p.techStack || [],
          github: p.githubUrl || null,
          liveDemo: p.liveUrl || null,
          category: p.category || 'all',
        }))
      : [];

  const filteredProjects =
    activeFilter === 'all'
      ? allProjects
      : allProjects.filter((project) => project.category === activeFilter);

  return (
    <SectionContainer id={id} isActive={isActive}>
      <ProjectsContent>
        <SectionTitle
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </SectionTitle>

        <ProjectDescription
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Here are some of the projects I&apos;ve worked on.
        </ProjectDescription>

        <FilterContainer>
          {categories.map((category) => (
            <FilterButton
              key={category.id}
              active={activeFilter === category.id}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </FilterButton>
          ))}
        </FilterContainer>

        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} variants={itemVariants} whileHover={{ y: -5 }}>
              <ProjectImage image={project.image} />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectText>{project.description}</ProjectText>
                <ProjectTechStack>
                  {project.techStack.map((tech, index) => (
                    <TechTag key={`${project.id}-${index}`}>
                      {getIconForTech(tech)} {tech}
                    </TechTag>
                  ))}
                </ProjectTechStack>
                <ProjectLinks>
                  {project.github && (
                    <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                      <IconWrapper icon={FaGithub} /> GitHub
                    </ProjectLink>
                  )}
                  {project.liveDemo && (
                    <ProjectLink href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                      <IconWrapper icon={FaExternalLinkAlt} /> Live Demo
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContent>
    </SectionContainer>
  );
};

export default ProjectsSection;
