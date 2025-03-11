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
import RenderText from '../../components/RenderText/RenderText.tsx';
import './ProjectDetailPage.css';

interface ProjectCard {
  title: string;
  location: string;
  category: string;
  image: { url: string; alt: string };
  projectdetailuid: {
    uid: string;
  };
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

interface RichTextBlock {
  type: 'paragraph' | 'list-item';
  text: string;
  spans?: Array<{ start: number; end: number; type: string }>;
}

interface Slice {
  id: string;
  slice_type: string;
  primary: { title?: string };
  items: { richtext: RichTextBlock[] }[];
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
    .find((item) => item.projectdetailuid.uid === uid);

  const project = projectStateData || projectData || null;

  const [projectDetailPageDocument, { state: projectDetailPageState }] =
    usePrismicDocumentByUID<ProjectDetailPageDocument>(
      'projectcarddetail',
      // project ? project.projectdetailuid.uid : '',
      uid ? uid : '',
      { lang: language },
    );

  useEffect(() => {
    if (projectCardsState === 'loading' || projectCardsState === 'idle') return;

    if (!project || projectCardsState === 'failed') {
      navigate(errorPageUrl);
    }
  }, [projectCardsState, project, navigate, errorPageUrl]);

  useEffect(() => {
    if (
      projectDetailPageState === 'loading' ||
      projectDetailPageState === 'idle'
    )
      return;

    // if (!projectDetailPageDocument && projectDetailPageState === 'failed') {
    //   return; // Даём шанс повторному запросу, не делаем редирект сразу
    // }

    if (!projectDetailPageDocument || projectDetailPageState === 'failed') {
      navigate(errorPageUrl);
    }
  }, [
    project,
    projectDetailPageState,
    projectDetailPageDocument,
    navigate,
    errorPageUrl,
  ]);

  useEffect(() => {
    // Запуск анимации, если хотя бы один документ загружается
    if (
      projectCardsState === 'loading' ||
      projectDetailPageState === 'loading'
    ) {
      createAnimatedFavicon();
    }

    // Остановка анимации, если оба документа загружены или произошла ошибка
    if (
      (projectCardsState === 'loaded' || projectCardsState === 'failed') &&
      (projectDetailPageState === 'loaded' ||
        projectDetailPageState === 'failed')
    ) {
      stopAnimatedFavicon();
    }

    // Ожидание загрузки изображений, если оба документа загружены
    if (
      projectCardsState === 'loaded' &&
      projectDetailPageState === 'loaded' &&
      projectCardsDocument &&
      projectDetailPageDocument
    ) {
      waitForImagesToLoad();
    }
  }, [
    projectCardsState,
    projectDetailPageState,
    projectCardsDocument,
    projectDetailPageDocument,
  ]);

  // Спиннер во время загрузки данных
  if (projectCardsState === 'loading' || projectDetailPageState === 'loading') {
    return null;
  }

  if (!project || !projectDetailPageDocument) {
    return null;
  }

  const currentUrl = `https://ustainternational.com/${language === 'en-us' ? 'en/' : ''}projects/${project && project.category}/${uid}`;

  const renderDetailItem = (title: string, content: string) => (
    <div className="project-detail__col-item">
      <h5>{title}</h5>
      <p>{content}</p>
    </div>
  );

  const filteredSdgItems =
    projectDetailPageDocument &&
    projectDetailPageDocument.data.sdg.filter((item) => item.sdgitem.url);

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
          {
            text: translations[language].projects,
            to: '/projects',
          },
          {
            text: project.category || '',
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

                {projectDetailPageDocument.data.preview && (
                  <p className="project-detail__preview">
                    {projectDetailPageDocument.data.preview}
                  </p>
                )}
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

      <div className="project-detail__article block">
        {/*{projectDetailPageDocument.data.preview && (*/}
        {/*  <p>{projectDetailPageDocument.data.preview}</p>*/}
        {/*)}*/}
        {projectDetailPageDocument.data.body.map((slice) => {
          if (slice.slice_type === 'singletitleparagraps') {
            return (
              <div key={slice.id} className="project-detail__content">
                {slice.primary.title && (
                  <h2 className="project-detail__content-title">
                    {slice.primary.title}
                  </h2>
                )}

                {slice.items.map((item, index) => {
                  const paragraphs = item.richtext.filter(
                    (block) => block.type === 'paragraph',
                  );
                  const listItems = item.richtext.filter(
                    (block) => block.type === 'list-item',
                  );

                  return (
                    <div key={index}>
                      {paragraphs.map((block, blockIndex) => (
                        <p key={blockIndex}>
                          <RenderText text={block.text} spans={block.spans} />
                        </p>
                      ))}
                      {listItems.length > 0 && (
                        <ul className="project-detail__content-list">
                          {listItems.map((block, blockIndex) => (
                            <li key={blockIndex}>
                              <RenderText
                                text={block.text}
                                spans={block.spans}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
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
