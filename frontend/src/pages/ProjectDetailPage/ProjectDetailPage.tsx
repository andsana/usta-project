import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePrismicDocumentByUID } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { translations } from '../../app/constants/translations.ts';
import {
  createAnimatedFavicon,
  stopAnimatedFavicon,
} from '../../app/utils/animatedFavicon.ts';
import { waitForImagesToLoad } from '../../app/utils/waitForImagesToLoad.ts';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.tsx';
import './ProjectDetailPage.css';

interface ProjectCard {
  title: string;
  location: string;
  category: string;
  image: { url: string; alt: string };
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
  primary: { title?: string };
  items: { paragraph: string }[];
}

interface SdgItem {
  sdgitem: { url?: string; alt?: string };
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
  const location = useLocation();
  const navigate = useNavigate();
  const { uid } = useParams();
  const { language } = useLanguage();

  const errorPageUrl = `/${language === 'en-us' ? 'en/' : ''}404`;

  const projectStateData = location.state?.projectData as ProjectCard | null;

  const [projectCardsDocument, { state: projectCardsState }] =
    usePrismicDocumentByUID<ProjectCardsDocument>(
      'projectcard',
      'projectcards',
      { lang: language },
    );

  const projectData = projectCardsDocument?.data.body
    .flatMap((slice) => slice.items)
    .find((item) => item.projectdetailuid === uid);

  const project = projectStateData || projectData || null;

  const [projectDetailPageDocument, { state: projectDetailPageState }] =
    usePrismicDocumentByUID<ProjectDetailPageDocument>(
      'projectcarddetail',
      project?.projectdetailuid || '',
      { lang: language },
    );

  useEffect(() => {
    createAnimatedFavicon();
  }, [location.pathname]);

  useEffect(() => {
    if (projectCardsState === 'loading') {
      createAnimatedFavicon();
    } else if (projectCardsState !== 'failed') {
      stopAnimatedFavicon();
    } else if (projectCardsDocument) {
      waitForImagesToLoad();
    }
  }, [projectCardsState, projectCardsDocument]);

  useEffect(() => {
    if (projectDetailPageState === 'loading') {
      createAnimatedFavicon();
    } else if (projectDetailPageState !== 'failed') {
      stopAnimatedFavicon();
    } else if (projectDetailPageDocument) {
      waitForImagesToLoad();
    }
  }, [projectDetailPageState, projectDetailPageDocument]);

  if (projectCardsState === 'loading' || projectDetailPageState === 'loading')
    return null;
  if (projectCardsState === 'failed' || projectDetailPageState === 'failed') {
    navigate(errorPageUrl);
  }

  if (!project || !projectDetailPageDocument) {
    navigate(errorPageUrl);
    return null;
  }

  const currentUrl = `https://ustainternational.com/${language === 'en-us' ? 'en/' : ''}projects/${project.category}/${uid}`;

  const renderDetailItem = (title: string, content: string) => (
    <div className="project-detail__col-item">
      <h5>{title}</h5>
      <p>{content}</p>
    </div>
  );

  const filteredSdgItems = projectDetailPageDocument.data.sdg.filter(
    (item) => item.sdgitem.url,
  );

  return (
    <div className="project-detail">
      <Helmet>
        <title>{`${project.title} | Usta International`}</title>
        <meta
          name="description"
          content={projectDetailPageDocument.data.preview}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={currentUrl} />
        <meta
          property="og:title"
          content={`${project.title} | Usta International`}
        />
        <meta
          property="og:description"
          content={projectDetailPageDocument.data.preview}
        />
        <meta property="og:image" content={project.image.url} />
        <link rel="canonical" href={currentUrl} />
        <meta name="language" content={language} />
      </Helmet>

      <Breadcrumbs
        items={[
          { text: 'Projects', to: '/projects' },
          {
            text: project?.category || '',
            to: `/projects/${project.category}`,
          },
        ]}
        currentText={project.title}
      />

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
              {projectDetailPageDocument.data.client &&
                renderDetailItem(
                  translations[language].client,
                  projectDetailPageDocument.data.client,
                )}
              {projectDetailPageDocument.data.area &&
                renderDetailItem(
                  translations[language].area,
                  projectDetailPageDocument.data.area,
                )}
            </div>
            <div className="project-detail__col">
              {projectDetailPageDocument.data.ourrole &&
                renderDetailItem(
                  translations[language].ourrole,
                  projectDetailPageDocument.data.ourrole,
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

      <div className="project-detail__article block container">
        {projectDetailPageDocument.data.preview && (
          <p>{projectDetailPageDocument.data.preview}</p>
        )}
        {projectDetailPageDocument.data.body.map((slice) => {
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
