import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrismicDocumentByUID } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { useLoading } from '../../app/hooks/useLoading.ts';
import { Card } from '../Projects/ProjectCard/ProjectCard.tsx';
import './ProjectDetail.css';

const translations = {
  ru: {
    location: 'Расположение',
    client: 'Клиент',
    noProject: 'Проекты не найдены.',
  },
  'en-us': {
    location: 'Location',
    client: 'Client',
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

interface ProjectDetailData {
  preview?: string;
  client: string;
  services?: string;
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

  const [document, { state }] = usePrismicDocumentByUID<ProjectDetailDocument>('projectcarddetail', projectDetailUID ?? '', { lang: language });

  useEffect(() => {
    setLoading(state === 'loading');
  }, [state, setLoading]);

  if (!document || !document.data) {
    return <div className="no-project-message">{translations[language].noProject}</div>;
  }

  const projectDetailData: ProjectDetailData = document.data;

  return (
    <div className="project-detail">
      <>
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
            <div className="project-detail__col">
              <div className="project-detail__col-item">
                <h5>{translations[language].location}</h5>
                <p>{project.location}</p>
              </div>
              <div className="project-detail__col-item-right">
                <h5>{translations[language].client}</h5>
                <p>{projectDetailData.client}</p>
              </div>
            </div>
            <div className="project-detail__col">
              <div className="project-detail__col-item-left">
                <h5>{translations[language].client}</h5>
                <p>{projectDetailData.client}</p>
              </div>
              {projectDetailData.services && <div className="project-detail__col-item">
                <p>{projectDetailData.services}</p>
              </div>}
            </div>
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
      </>
    </div>
  );
};

export default ProjectDetail;
