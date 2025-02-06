import React, { useContext, useMemo, useState } from 'react';
import Select from 'react-select';
import { useScreenDetector } from '../../app/hooks/useScreenDetector.ts';
import Pagination from '../Pagination/Pagination.tsx';
import { LanguageContext } from '../../app/contexts/LanguageContext.tsx';
import ProjectCard, { Card } from './ProjectCard/ProjectCard.tsx';
import MyLink from '../MyLink/MyLink.tsx';
import './Projects.css';

const translations = {
  ru: {
    noProjects: 'Проекты не найдены.',
    allProjects: 'Смотреть все',
  },
  'en-us': {
    noProjects: 'No projects found.',
    allProjects: 'See all',
  },
};

export interface ProjectsSliceProps {
  primary: {
    title: string;
    description?: string;
    filtershow: true;
    buttonname?: string;
    buttonlink: { url?: string };
  };
  items: Card[];
}

export interface ProjectsProps {
  slice: ProjectsSliceProps;
}

const Projects: React.FC<ProjectsProps> = ({ slice }) => {

  const { language } = useContext(LanguageContext)!;
  const ALL_PROJECTS = translations[language].allProjects;
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
          <h2 className="projects__title">{slice.primary.title}</h2>
          {slice.primary.description &&
            (<p className="project-description">{slice.primary.description}</p>)}
        </div>

        {slice.primary.filtershow && (uniqueCategories.length > 2 && (
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
        ))}
        <div className="projects-cards__list">
          {paginatedProjects.map((project) => (
            <ProjectCard key={`${project.title}-${project.location}`} project={project} />
          ))}
        </div>

        {(slice.primary.buttonname && slice.primary.buttonlink.url) &&
          <MyLink className="projects__button" to={slice.primary.buttonlink.url}>
            {slice.primary.buttonname}
          </MyLink>}

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>
    </div>
  );
};

export default Projects;