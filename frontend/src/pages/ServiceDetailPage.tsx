import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { Helmet } from 'react-helmet-async'; // Импортируем Helmet
import { useLanguage } from '../app/hooks/useLanguage.ts';
import { pageComponents } from '../app/constants/pageComponents.ts';
import { translations } from '../app/constants/translations.ts';
import ServiceDetailHeader from '../components/ServiceDetailHeader/ServiceDetailHeader.tsx';
import NoContentMessage from '../components/NoContentMessage/NoContentMessage.tsx';

const ServiceDetailPage = () => {
  const { uid } = useParams();
  const { language } = useLanguage();
  const location = useLocation();

  const [favicon, setFavicon] = useState('/spinner.gif');

  const [page, { state }] = usePrismicDocumentByUID(
    'servicedetail',
    uid || '',
    { lang: language },
  );

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
  }, [state, page, waitForImagesToLoad]);

  if (state === 'loading') {
    return null;
  }

  if (state === 'failed') {
    return <NoContentMessage message={translations[language].noPage} />;
  }

  return (
    <>
      <Helmet>
        <title>{page ? page.data.title : 'Usta International'}</title>
        <link rel="icon" href={favicon} />
      </Helmet>
      {page && (
        <div className="service-detail-container">
          <ServiceDetailHeader
            title={page.data.title}
            preview={page.data.preview}
            image={page.data.image}
          />

          <div className="service-detail-content">
            <SliceZone
              slices={page.data.body}
              components={{ ...pageComponents }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetailPage;
