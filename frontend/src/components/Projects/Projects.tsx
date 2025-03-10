import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { usePrismicDocumentByUID } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { useScreenDetector } from '../../app/hooks/useScreenDetector.ts';
import { translations } from '../../app/constants/translations.ts';
import MyLink from '../MyLink/MyLink.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import ProjectCard, { Card } from '../Projects/ProjectCard/ProjectCard.tsx';
import './Projects.css';

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
    filtershow: boolean;
    featured: boolean;
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
  const { category } = useParams();

  const ALL_PROJECTS = translations[language].allProjects;
  const ITEMS_PER_PAGE = 9;
  const isHomePage = location.pathname === '/' || location.pathname === '/en';
  const projectCardsUID = slice.primary.projectcardsuid;

  const [activeCategory, setActiveCategory] = useState<{
    value: string;
    label: string;
  }>({
    value: ALL_PROJECTS,
    label: ALL_PROJECTS,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const [document, { state }] = usePrismicDocumentByUID<ProjectCardsDocument>(
    'projectcard',
    projectCardsUID,
    { lang: language },
  );

  const uniqueCategories = useMemo(() => {
    if (!document?.data?.body[0]?.items?.length) {
      return [{ value: ALL_PROJECTS, label: ALL_PROJECTS }];
    }

    const categories = [
      ...new Set(
        document.data.body[0].items
          .map((item) => item.category)
          .filter(Boolean),
      ),
    ].map((category) => ({ value: category, label: category }));

    return [{ value: ALL_PROJECTS, label: ALL_PROJECTS }, ...categories];
  }, [document, ALL_PROJECTS]);

  useEffect(() => {
    if (category) {
      setActiveCategory({ value: category, label: category });
    } else {
      setActiveCategory({ value: ALL_PROJECTS, label: ALL_PROJECTS });
    }
  }, [category, ALL_PROJECTS]);

  const filteredProjects = useMemo(() => {
    if (!document?.data?.body[0]?.items) return [];

    return document.data.body[0].items.filter((item) => {
      if (isHomePage) {
        return item.featured;
      }
      return (
        activeCategory.value === ALL_PROJECTS ||
        item.category === activeCategory.value
      );
    });
  }, [document, isHomePage, activeCategory, ALL_PROJECTS]);

  if (state === 'loading') {
    return null;
  }

  if (!document?.data?.body[0]?.items?.length) {
    return null;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const handleChange = (
    selectedOption: { value: string; label: string } | null,
  ) => {
    if (selectedOption) {
      setActiveCategory(selectedOption);
      setCurrentPage(1);
    }
  };

  return (
    <div className="projects page container">
      <h2 className="projects__title">{slice.primary.title}</h2>
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
              <p
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
              </p>
            ))
          )}
        </div>
      )}

      <div className="projects-cards__list">
        {paginatedProjects.map((project) => (
          <ProjectCard
            key={`${project.title}-${project.location}`}
            project={project}
          />
        ))}
      </div>

      {slice.primary.buttonname && slice.primary.buttonlink.url && (
        <MyLink className="projects__button" to={slice.primary.buttonlink.url}>
          {slice.primary.buttonname}
        </MyLink>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Projects;
