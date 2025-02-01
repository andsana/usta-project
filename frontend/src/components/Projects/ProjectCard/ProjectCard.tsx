import React from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import './ProjectCard.css';

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
  return (
    <div key={`${project.title}-${project.location}`} className="project-card">
      <div className="project-card__image-wrapper">
        <img src={project.image.url} alt={project.title} className="project-card__image" />
      </div>
      <div className="project-card__title-wrapper">
        <div className="project-card__icon-wrapper">
          <HiOutlineArrowRight className="project-card__icon-arrow" />
        </div>
        <h3 className="project-card__title">{project.title}</h3>
      </div>
      <div className="project-card__details">
        <span className="project-card__location">{project.location}</span>
        <span className="project-card__separator"></span>
        <span className="project-card__category">{project.category}</span>
      </div>
    </div>
  );
};

export default ProjectCard;