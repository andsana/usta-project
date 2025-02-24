import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  const [favicon, setFavicon] = useState('/spinner.gif');

  const [page, { state }] = usePrismicDocumentByUID('page_new', 'projects', {
    lang: language,
  });

  // Вычисляем заголовок страницы
  const pageTitle: string = page
    ? page.data.body.find(
        (slice: Slice) => slice.slice_type === 'projectcardsheader',
      ).primary.title
    : 'Usta International';

  // Обновление фавикона
  const updateFavicon = (isLoading: boolean) => {
    const newFavicon = isLoading ? '/spinner.gif' : '/favicon.svg';
    setFavicon(newFavicon); // Обновляем состояние favicon
    const faviconElement = document.querySelector('link[rel="icon"]');
    if (faviconElement) {
      faviconElement.setAttribute('href', newFavicon);
    }
  };

  const waitForImagesToLoad = useCallback(() => {
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

    Promise.all(imagePromises).then(() => updateFavicon(false));
  }, []);

  // Устанавливаем фавикон в спиннер при смене страницы
  useEffect(() => {
    updateFavicon(true); // Показываем спиннер
  }, [location.pathname]);

  useEffect(() => {
    if (state === 'loading') {
      updateFavicon(true);
    } else if (state === 'failed') {
      updateFavicon(false);
    } else if (page) {
      waitForImagesToLoad();
    }
  }, [state, page, waitForImagesToLoad, pageTitle]);

  if (state === 'loading') {
    return null;
  }

  if (state === 'failed') {
    return <NoContentMessage message={translations[language].noPage} />;
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="icon" href={favicon} />
      </Helmet>
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
