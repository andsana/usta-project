import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrismicDocumentByUID } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { useLoading } from '../../app/hooks/useLoading.ts';
import MyLink from '../MyLink/MyLink.tsx';
import { Card } from '../Projects/ProjectCard/ProjectCard.tsx';
import './ProjectDetail.css';

const translations = {
  ru: {
    location: 'Страна',
    client: 'Клиент',
    ourrole: 'Наша роль',
    area: 'Площадь',
    noProject: 'Проект не найдены.',
  },
  'en-us': {
    location: 'Country',
    client: 'Client',
    ourrole: 'Our role',
    area: 'Area',
    noProject: 'No project found.',
  },
};

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

interface ProjectDetailData {
  preview?: string;
  client?: string;
  ourrole?: string;
  location?: string;
  area?: string;
  sdg: SdgItem[];
  body: Slice[];
}

interface ProjectDetailDocument extends PrismicDocument {
  data: ProjectDetailData;
}

const ProjectDetail = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const { setLoading } = useLoading();

  const project: Card = location.state.projectData;
  const projectDetailUID = project.projectdetailuid;

  const [document, { state }] = usePrismicDocumentByUID<ProjectDetailDocument>(
    'projectcarddetail',
    projectDetailUID ?? '',
    { lang: language },
  );

  useEffect(() => {
    setLoading(state === 'loading');
  }, [state, setLoading]);

  if (!document || !document.data) {
    return (
      <div className="no-project-message">
        {translations[language].noProject}
      </div>
    );
  }

  const projectDetailData: ProjectDetailData = document.data;
  const filteredSdg = projectDetailData.sdg.filter((item) => item.sdgitem?.url);

  console.log('projectDetailData.sdg', projectDetailData.sdg);
  console.log('projectDetailData.sdg.length = ', projectDetailData.sdg.length);

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
              {projectDetailData.location && (
                <div className="project-detail__col-item">
                  <h5>{translations[language].location}</h5>
                  <p>{project.location}</p>
                </div>
              )}
              {projectDetailData.client && (
                <div className="project-detail__col-item-left">
                  <h5>{translations[language].client}</h5>
                  <p>{projectDetailData.client}</p>
                </div>
              )}
              {projectDetailData.area && (
                <div className="project-detail__col-item">
                  <h5>{translations[language].area}</h5>
                  <p>{projectDetailData.area}</p>
                </div>
              )}
            </div>
            <div className="project-detail__col">
              {projectDetailData.client && (
                <div className="project-detail__col-item-right">
                  <h5>{translations[language].client}</h5>
                  <p>{projectDetailData.client}</p>
                </div>
              )}
              {projectDetailData.ourrole && (
                <div className="project-detail__col-item">
                  <h5>{translations[language].ourrole}</h5>
                  <p>{projectDetailData.ourrole}</p>
                </div>
              )}
            </div>
          </div>

          {filteredSdg.length > 0 && (
            <div className="icons-list">
              {filteredSdg.map((item) => (
                <div className="icon-wrapper" key={item.sdgitem.id}>
                  <img className="icon" src={item.sdgitem.url} alt={item.sdgitem.alt || ''} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="project-detail__article container">
        {projectDetailData.preview && <p>{projectDetailData.preview}</p>}
        {projectDetailData.body.map((slice) => {
          if (slice.slice_type === 'singletitleparagraps') {
            return (
              <div key={slice.id} className="project-detail__content">
                {slice.primary.title && <h2>{slice.primary.title}</h2>}
                {slice.items.map((item, index: number) => (
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

export default ProjectDetail;
