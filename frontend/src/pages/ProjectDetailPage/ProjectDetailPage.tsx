import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { usePrismicDocumentByUID } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { translations } from '../../app/constants/translations.ts';
import NoContentMessage from '../../components/NoContentMessage/NoContentMessage.tsx';
import MyLink from '../../components/MyLink/MyLink.tsx';
import './ProjectDetailPage.css';

interface ProjectCard {
  title: string;
  location: string;
  category: string;
  image: {
    url: string;
    alt: string;
  };
  projectdetailuid: string;
}

interface ProjectCardSlice {
  id: string;
  slice_type: string;
  items: ProjectCard[];
}

interface ProjectCardsData {
  body: ProjectCardSlice[];
}

interface ProjectCardsDocument extends PrismicDocument {
  data: ProjectCardsData;
}

interface Slice {
  id: string;
  slice_type: string;
  primary: {
    title?: string;
  };
  items: { paragraph: string }[];
}

interface SdgItem {
  sdgitem: {
    url?: string;
    alt?: string;
  };
}

interface ProjectDetailPageData {
  preview?: string;
  client?: string;
  ourrole?: string;
  area?: string;
  sdg: SdgItem[];
  body: Slice[];
}

interface ProjectDetailPageDocument extends PrismicDocument {
  data: ProjectDetailPageData;
}

const ProjectDetailPage = () => {
  const { language } = useLanguage();
  const { uid } = useParams();
  const location = useLocation();

  const [projectCardsDocument, { state: projectCardsState }] =
    usePrismicDocumentByUID<ProjectCardsDocument>(
      'projectcard',
      'projectcards',
      {
        lang: language,
      },
    );

  const projectStateData: ProjectCard = location.state?.projectData;
  const projectData = projectCardsDocument?.data.body
    .find((slice) => slice.items.some((item) => item.projectdetailuid === uid))
    ?.items.find((item) => item.projectdetailuid === uid);

  const project = projectStateData || projectData;

  const [projectDetailPageDocument, { state: projectDetailPageState }] =
    usePrismicDocumentByUID<ProjectDetailPageDocument>(
      'projectcarddetail',
      project ? project.projectdetailuid : '',
      { lang: language },
    );

  const projectDetailPageData = projectDetailPageDocument?.data;
  const filteredSdgItems = projectDetailPageData?.sdg.filter(
    (item) => item.sdgitem?.url,
  );

  const updateFavicon = (isLoading: boolean) => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', isLoading ? '/spinner.gif' : '/favicon.svg');
    }
  };

  // Объединение логики для обновления состояния загрузки и фавикона
  useEffect(() => {
    const isLoadingState =
      projectCardsState === 'loading' || projectDetailPageState === 'loading';

    // Обновляем фавикон в зависимости от состояния загрузки
    updateFavicon(isLoadingState);

    if (projectCardsState === 'failed' || projectDetailPageState === 'failed') {
      updateFavicon(false);
    }

    if (projectCardsState === 'loaded' && projectDetailPageState === 'loaded') {
      updateFavicon(false);
    }
  }, [projectCardsState, projectDetailPageState]);

  useEffect(() => {
    if (project) {
      document.title = project.title;
      const images = Array.from(document.querySelectorAll('img'));
      const imagePromises = images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve(null);
            else img.onload = img.onerror = () => resolve(null);
          }),
      );

      Promise.all(imagePromises).then(() => {
        updateFavicon(false);
      });
    }
  }, [project]);

  const renderDetailItem = (title: string, content: string) => (
    <div className="project-detail__col-item">
      <h5>{title}</h5>
      <p>{content}</p>
    </div>
  );

  if (
    !project ||
    !projectDetailPageData ||
    projectCardsState === 'failed' ||
    projectDetailPageState === 'failed'
  ) {
    return <NoContentMessage message={translations[language].noProject} />;
  }

  return (
    <div className="project-detail">
      <div className="project-detail__breadcrumbs container">
        <MyLink className="project-detail__breadcrumbs-link" to="/">
          Home
        </MyLink>
        <span className="project-detail__separator">/</span>
        <MyLink className="project-detail__breadcrumbs-link" to="/projects">
          Projects
        </MyLink>
        <span className="project-detail__separator">/</span>
        {project.category && (
          <MyLink
            className="projects__breadcrumbs-link"
            to={`/projects/${project.category}`}
          >
            {project.category}
          </MyLink>
        )}
        <span className="project-detail__separator">/</span>
        <span className="project-detail__breadcrumbs-current">
          {project.title}
        </span>
      </div>

      <div className="project-detail__bgimage-wrapper">
        <div
          className="project-detail__bgimage"
          style={{ backgroundImage: `url(${project.image.url})` }}
        >
          <div className="project-detail__title-wrapper">
            <div className="project-detail__title-row">
              <div className="project-detail__title-col">
                <h1 className="project-detail__title">{project.title}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="project-detail__wrapper">
          <div className="project-detail__row">
            <div className="project-detail__col">
              {project.location &&
                renderDetailItem(
                  translations[language].location,
                  project.location,
                )}
              {projectDetailPageData.client &&
                renderDetailItem(
                  translations[language].client,
                  projectDetailPageData.client,
                )}
              {projectDetailPageData.area &&
                renderDetailItem(
                  translations[language].area,
                  projectDetailPageData.area,
                )}
            </div>
            <div className="project-detail__col">
              {projectDetailPageData.ourrole &&
                renderDetailItem(
                  translations[language].ourrole,
                  projectDetailPageData.ourrole,
                )}
            </div>
          </div>

          {filteredSdgItems && filteredSdgItems.length > 0 && (
            <div className="icons-list">
              {filteredSdgItems.map((item, index: number) => (
                <div className="icon-wrapper" key={index}>
                  <img
                    className="icon"
                    src={item.sdgitem.url}
                    alt={item.sdgitem.alt || ''}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="project-detail__article container">
        {projectDetailPageData.preview && (
          <p>{projectDetailPageData.preview}</p>
        )}
        {projectDetailPageData.body.map((slice) => {
          if (slice.slice_type === 'singletitleparagraps') {
            return (
              <div key={slice.id} className="project-detail__content">
                {slice.primary.title && <h2>{slice.primary.title}</h2>}
                {slice.items.map((item, index) => (
                  <p key={index}>{item.paragraph}</p>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
