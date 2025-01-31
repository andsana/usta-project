import React, { useContext, useMemo, useState } from 'react';
import Select from 'react-select';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useScreenDetector } from '../../app/hooks/useScreenDetector.ts';
import Pagination from '../Pagination/Pagination.tsx';
import './Projects.css';
import { LanguageContext } from '../../app/contexts/LanguageContext.tsx';

const translations = {
  ru: {
    noProjects: 'Проекты не найдены.',
  },
  'en-us': {
    noProjects: 'No projects found.',
  },
};

export interface Card {
  title: string;
  location: string;
  category: string;
  image: { url: string };
}

export interface ProjectsSliceProps {
  primary: {
    title: string;
    description: string;
    filterall: string;
  };
  items: Card[];
}

export interface ProjectsProps {
  slice: ProjectsSliceProps;
}

const Projects: React.FC<ProjectsProps> = ({ slice }) => {

  const { language } = useContext(LanguageContext)!;
  const ALL_PROJECTS = slice.primary.filterall;
  const ITEMS_PER_PAGE = 9;

  const uniqueCategories = [
    { value: ALL_PROJECTS, label: ALL_PROJECTS },
    ...Array.from(new Set(slice.items.map((item) => item.category))).map((category) => ({
      value: category,
      label: category,
    })),
  ];

  const [activeCategory, setActiveCategory] = useState(uniqueCategories[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const { isMobile } = useScreenDetector();

  const filteredProjects = useMemo(() => {
    return [...slice.items]
      .reverse()
      .filter((item) => activeCategory.value === ALL_PROJECTS || item.category === activeCategory.value);
  }, [slice.items, activeCategory, ALL_PROJECTS]);


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const handleChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption && selectedOption.value !== activeCategory.value) {
      setActiveCategory(selectedOption);
      setCurrentPage(1);
    }
  };

  if (!slice || !slice.items.length) {
    return <div className="no-projects-message">{translations[language].noProjects}</div>;
  }

  return (
    <div className="Projects">
      <div className="projects__container">
        <div className="project__content">
          <h1 className="projects__title">{slice.primary.title}</h1>
          <p className="project-description">{slice.primary.description}</p>
        </div>

        {uniqueCategories.length > 2 && (
          <div className="projects-filter__list">
            {isMobile ? (
              <Select
                options={uniqueCategories}
                value={activeCategory}
                onChange={handleChange}
                classNamePrefix="custom-select"
              />
            ) : (
              uniqueCategories.map((category) => (
                <div
                  key={category.value}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`project-filter ${
                    activeCategory.value === category.value ? 'active' : ''
                  }`}
                >
                  {category.label}
                </div>
              ))
            )}
          </div>
        )}

        <div className="projects-cards__list">
          {paginatedProjects.map((project, index) => (
            <div key={`${project.title}-${project.location}-${index}`} className="project-card">
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
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>
    </div>
  );
};

export default Projects;