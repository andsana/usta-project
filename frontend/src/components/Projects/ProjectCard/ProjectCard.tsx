import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useLanguage } from '../../../app/hooks/useLanguage.ts';
import { transliterate } from '../../../app/utils/transliterate.ts';
import MyLink from '../../MyLink/MyLink.tsx';
import './ProjectCard.css';

export interface Card {
  title: string;
  location: string;
  category: string;
  image: {
    url: string;
    alt: string;
  };
  featured: boolean;
  projectdetailuid?: string;
}

export interface ProjectCardProps {
  project: Card;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { language } = useLanguage();

  const createSlug = (input: string) =>
    input.replace(/\s|,/g, '-').toLowerCase();
  const slugProjectdetailuid = project.projectdetailuid
    ? createSlug(project.projectdetailuid)
    : '';

  const slugCategory =
    language === 'ru'
      ? createSlug(transliterate(project.category || ''))
      : createSlug(project.category || '');

  const projectCardContent = (
    <>
      <div className="project-card__text">
        <div className="project-card__title-wrapper">
          <div className="project-card__icon-wrapper">
            <MdKeyboardArrowRight className="project-card__icon-arrow" />
          </div>
          <h4 className="project-card__title">{project.title}</h4>
        </div>
        <p className="project-card__details">
          <span className="project-card__location">{project.location}</span>
          <span className="project-card__separator"></span>
          {project.category}
        </p>
      </div>

      <div className="project-card__image-wrapper">
        <img
          className="project-card__image"
          src={project.image.url}
          alt={project.image.alt}
          loading="lazy"
        />
      </div>
    </>
  );

  return slugProjectdetailuid ? (
    <MyLink
      className="project-card"
      to={`/projects/${slugCategory}/${slugProjectdetailuid}`}
      state={{ projectData: project }}
    >
      {projectCardContent}
    </MyLink>
  ) : (
    <div className="project-card">{projectCardContent}</div>
  );
};

export default ProjectCard;
