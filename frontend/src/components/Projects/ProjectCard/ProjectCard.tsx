import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useLanguage } from '../../../app/hooks/useLanguage.ts';
import MyLink from '../../MyLink/MyLink.tsx';
import './ProjectCard.css';

export interface Card {
  title: string;
  location: string;
  category: string;
  categoryen?: string;
  image: {
    url: string;
    alt: string;
  };
  featured: boolean;
  projectdetailuid: {
    uid?: string;
  };
}

export interface ProjectCardProps {
  project: Card;
}

const createSlug = (input: string): string => {
  return input.replace(/\s|,/g, '-').toLowerCase();
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { language } = useLanguage();

  const slugCategory =
    language === 'ru'
      ? createSlug(project.categoryen || '')
      : createSlug(project.category || '');

  const projectCardContent = (
    <>
      <div className="project-card__image-wrapper">
        <img
          className="project-card__image"
          src={project.image.url}
          alt={project.image.alt}
          loading="lazy"
        />
      </div>

      <div className="project-card__text">
        <div className="project-card__title-wrapper">
          <h4 className="project-card__title">{project.title}</h4>
          <div className="project-card__icon-wrapper">
            <MdKeyboardArrowRight className="project-card__icon-arrow" />
          </div>
        </div>
        <div className="project-card__details">
          <span className="project-card__location">{project.location}</span>
          <span className="project-card__category">{project.category}</span>
        </div>
      </div>
    </>
  );

  return project.projectdetailuid.uid ? (
    <MyLink
      className="project-card"
      to={`/projects/${slugCategory}/${project.projectdetailuid.uid}`}
      state={{ projectData: project }}
    >
      {projectCardContent}
    </MyLink>
  ) : (
    <div className="project-card">{projectCardContent}</div>
  );
};

export default ProjectCard;
