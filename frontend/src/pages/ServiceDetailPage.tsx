import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';

import { useLanguage } from '../app/hooks/useLanguage.ts';

import { pageComponents } from '../app/constants/pageComponents.ts';
import { translations } from '../app/constants/translations.ts';

import ServiceDetailHeader from '../components/ServiceDetailHeader/ServiceDetailHeader.tsx';
import NoPageMessage from '../components/NoPageMessage/NoPageMessage.tsx';

const ServiceDetailPage = () => {
  const { uid } = useParams();
  const { language } = useLanguage();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  const [page, { state }] = usePrismicDocumentByUID(
    'servicedetail',
    uid || '',
    { lang: language },
  );

  // Обновление фавикона
  const updateFavicon = (isLoading: boolean) => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', isLoading ? '/spinner.svg' : '/favicon.png');
    }
  };

  // Ожидание загрузки изображений
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

  // Устанавливаем фавикон в спиннер при смене страницы
  useEffect(() => {
    updateFavicon(true);
    setIsLoading(true);
  }, [location.pathname]);

  useEffect(() => {
    if (page) {
      document.title = page.data.title;
      waitForImagesToLoad();
    }
  }, [page]);

  useEffect(() => {
    updateFavicon(isLoading);
  }, [isLoading]);

  if (state === 'loading') {
    return null;
  }

  if (state === 'failed') {
    return <NoPageMessage message={translations[language].noPage} />;
  }

  return (
    <>
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
