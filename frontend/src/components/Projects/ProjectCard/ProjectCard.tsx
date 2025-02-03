import React, { useContext } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import MyLink from '../../MyLink/MyLink.tsx';
import { transliterate } from '../../../app/utils/transliterate.ts';
import './ProjectCard.css';
import { LanguageContext } from '../../../app/contexts/LanguageContext.tsx';

export interface Card {
  title: string;
  location: string;
  category: string;
  image: { url: string };
}

interface ProjectCardProps {
  project: Card;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error('LanguageContext must be used within a LanguageProvider');
  }

  const { language } = languageContext;

  const slugTitle = language === 'ru' ? transliterate(project.title).replace(/\s|,/g, '-').toLowerCase() : project.title.replace(/\s|,/g, '-').toLowerCase();
  const slugLocation = language === 'ru' ? transliterate(project.location).replace(/\s|,/g, '-').toLowerCase() : project.location.replace(/\s|,/g, '-').toLowerCase();
  const slugCategory = language === 'ru' ? transliterate(project.category).replace(/\s|,/g, '-').toLowerCase() : project.category.replace(/\s|,/g, '-').toLowerCase();

  const slug = `${slugTitle}-${slugLocation}`;

  return (
    <MyLink className="project-card" to={`/projects/${slugCategory}/${slug}`} key={slug}>
      <div className="project-card__image-wrapper">
        <img src={project.image.url} alt={project.title} className="project-card__image" />
      </div>
      <div className="project-card__title-wrapper">
        <div className="project-card__icon-wrapper">
          <MdKeyboardArrowRight className="project-card__icon-arrow" />
        </div>
        <h4 className="project-card__title">{project.title}</h4>
      </div>
      <div className="project-card__details">
        <span className="project-card__location">{project.location}</span>
        <span className="project-card__separator"></span>
        <span className="project-card__category">{project.category}</span>
      </div>
    </MyLink>
  );
};

export default ProjectCard;