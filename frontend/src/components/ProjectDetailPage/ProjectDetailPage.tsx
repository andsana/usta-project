import { useLocation, useParams } from 'react-router-dom';
import { usePrismicDocumentByUID } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import MyLink from '../MyLink/MyLink.tsx';
import './ProjectDetailPage.css';
import { translations } from '../../app/constants/translations.ts';
import { useEffect, useState } from 'react';
import NoPageMessage from '../NoPageMessage/NoPageMessage.tsx';

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
    id?: string;
    url?: string;
    alt?: string;
  };
}

interface ProjectDetailPageData {
  preview?: string;
  client?: string;
  ourrole?: string;
  // location?: string;
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

  // Состояние для проекта (из стейта или из Prismic)
  const [project, setProject] = useState<ProjectCard | null>(
    location.state.projectData || null,
  );

  // Состояние для карточек проекта
  const [projectCardsDocument, { state: projectCardsState }] =
    usePrismicDocumentByUID<ProjectCardsDocument>(
      'projectcard',
      'projectcards',
      {
        lang: language,
      },
    );

  console.log('projectCardsDocument', projectCardsDocument);

  useEffect(() => {
    if (!project && projectCardsDocument) {
      const projectData = projectCardsDocument.data.body
        .flatMap((slice) => slice.items)
        .find((item) => item.projectdetailuid === uid);

      if (projectData) {
        setProject({
          title: projectData.title,
          location: projectData.location,
          category: projectData.category,
          image: {
            url: projectData.image.url,
            alt: projectData.image.alt || projectData.title,
          },
          projectdetailuid: projectData.projectdetailuid,
        });
      }

      console.log('projectData', projectData);
    }
  }, [projectCardsDocument, project, uid]);

  // Получаем детали проекта, если проект уже загружен
  const [projectDetailPageDocument, { state: projectDetailPageState }] =
    usePrismicDocumentByUID<ProjectDetailPageDocument>(
      'projectcarddetail',
      project ? project.projectdetailuid : '',
      { lang: language },
    );

  // Проверяем на undefined перед использованием данных
  const projectDetailPageData = projectDetailPageDocument?.data;

  const filteredSdgItems = projectDetailPageData?.sdg.filter(
    (item) => item.sdgitem?.url,
  );

  const renderDetailItem = (title: string, content: string) => (
    <div className="project-detail__col-item">
      <h5>{title}</h5>
      <p>{content}</p>
    </div>
  );

  if (projectCardsState === 'loading' || projectDetailPageState === 'loading') {
    return null;
  }

  if (projectCardsState === 'failed' || projectDetailPageState === 'failed') {
    return <NoPageMessage message={translations[language].noPage} />;
  }

  if (!project || !projectDetailPageData) {
    return <NoPageMessage message={translations[language].noPage} />;
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
              {filteredSdgItems.map((item) => (
                <div className="icon-wrapper" key={item.sdgitem.id}>
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

