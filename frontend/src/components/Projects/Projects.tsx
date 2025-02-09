import React, { useEffect, useState } from 'react';
import { usePrismicDocumentByUID } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { useLoading } from '../../app/hooks/useLoading.ts';
import Select from 'react-select';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { useScreenDetector } from '../../app/hooks/useScreenDetector.ts';
import MyLink from '../MyLink/MyLink.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import ProjectCard, { Card } from '../Projects/ProjectCard/ProjectCard.tsx';
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

interface ProjectCardSlice {
  items: Card[];
}

interface ProjectCardsData {
  body: ProjectCardSlice[];
}

interface ProjectCardsDocument extends PrismicDocument {
  data: ProjectCardsData;
}

export interface ProjectHeaderSlice {
  primary: {
    title: string;
    description?: string;
    filtershow: true;
    buttonname?: string;
    buttonlink: { url?: string };
    projectcardsuid: string;
  };
}

export interface ProjectHeader {
  slice: ProjectHeaderSlice;
}

const Projects: React.FC<ProjectHeader> = ({ slice }) => {
  const { isMobile } = useScreenDetector();
  const { language } = useLanguage();
  const { setLoading } = useLoading();

  const ALL_PROJECTS = translations[language].allProjects;
  const ITEMS_PER_PAGE = 9;
  const isHomePage = location.pathname === '/' || location.pathname === '/en';
  const projectCardsUID = slice.primary.projectcardsuid;

  const [activeCategory, setActiveCategory] = useState<{ value: string; label: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [document, { state }] = usePrismicDocumentByUID<ProjectCardsDocument>('projectcard', projectCardsUID, { lang: language });

  useEffect(() => {
    setLoading(state === 'loading');
  }, [state, setLoading]);

  if (!document || !document.data) {
    return <div className="no-project-message">{translations[language].noProjects}</div>;
  }

  const uniqueCategories = [
    { value: ALL_PROJECTS, label: ALL_PROJECTS },
    ...Array.from(new Set(document.data.body[0].items.map((item) => item.category) ?? []))
      .map((category) => ({ value: category, label: category })),
  ];

  if (!activeCategory && uniqueCategories.length > 0) {
    setActiveCategory(uniqueCategories[0]);
  }

  const filteredProjects: Card[] = document.data.body[0].items.filter((item) => {
    if (isHomePage) {
      return item.featured;  // Упростили проверку
    }
    return activeCategory?.value === ALL_PROJECTS || item.category === activeCategory?.value;
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const handleChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption && selectedOption.value !== activeCategory?.value) {
      setActiveCategory(selectedOption);
      setCurrentPage(1);
    }
  };

  return (
    <div className="Projects">
      <div className="projects__container">
        {!isHomePage && <div className="projects__breadcrumbs">
          <MyLink className="projects__breadcrumbs-home" to="/">Home</MyLink>
          <span className="projects__separator">/</span>
          <span className="projects__breadcrumbs-current">Projects</span>
        </div>}

        <div className="project__content">
          <h2 className="projects__title">{slice.primary.title}</h2>
          {slice.primary.description && <p className="project-description">{slice.primary.description}</p>}
        </div>

        {slice.primary.filtershow && uniqueCategories.length > 2 && (
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
                  className={`project-filter ${activeCategory?.value === category.value ? 'active' : ''}`}
                >
                  {category.label}
                </div>
              ))
            )}
          </div>
        )}

        <div className="projects-cards__list">
          {paginatedProjects.map((project) => (
            <ProjectCard key={`${project.title}-${project.location}`} project={project} />
          ))}
        </div>

        {slice.primary.buttonname && slice.primary.buttonlink.url && (
          <MyLink className="projects__button" to={slice.primary.buttonlink.url}>
            {slice.primary.buttonname}
          </MyLink>
        )}

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>
    </div>
  );
};

export default Projects;