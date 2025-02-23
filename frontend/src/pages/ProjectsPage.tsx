import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { useLanguage } from '../app/hooks/useLanguage.ts';
import { pageComponents } from '../app/constants/pageComponents.ts';
import { translations } from '../app/constants/translations.ts';
import NoContentMessage from '../components/NoContentMessage/NoContentMessage.tsx';

interface Slice {
  slice_type: string;
  primary: {
    title: string;
  };
}

const ProjectsPage = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const [page, { state }] = usePrismicDocumentByUID('page_new', 'projects', {
    lang: language,
  });

  // Обновление фавикона
  const updateFavicon = (isLoading: boolean) => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', isLoading ? '/spinner.gif' : '/favicon.svg');
    }
  };

  const waitForImagesToLoad = () => {
    const images = Array.from(document.querySelectorAll('img'));
    const imagePromises = images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) {
            resolve(null);
          } else {
            img.onload = img.onerror = () => resolve(null);
          }
        }),
    );

    Promise.all(imagePromises).then(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    updateFavicon(true);
  }, [location.pathname]);

  useEffect(() => {
    if (page) {
      const titleSlice = page.data.body.find(
        (slice: Slice) => slice.slice_type === 'projectcardsheader',
      );

      document.title =
        titleSlice?.primary.title || translations[language].projectsPageTitle;
      waitForImagesToLoad();
    }
  }, [page, language]);

  useEffect(() => {
    updateFavicon(isLoading);
  }, [isLoading]);

  if (state === 'loading') {
    return null;
  }

  if (state === 'failed') {
    return <NoContentMessage message={translations[language].noProjects} />;
  }

  return (
    <>
      {page && (
        <div className="projectPage__container">
          <SliceZone
            slices={page.data.body}
            components={{ ...pageComponents }}
          />
        </div>
      )}
    </>
  );
};
export default ProjectsPage;
