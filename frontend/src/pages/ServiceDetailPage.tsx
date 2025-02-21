import { useLocation, useParams } from 'react-router-dom';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { useLanguage } from '../app/hooks/useLanguage.ts';
import { pageComponents } from '../app/constants/pageComponents.ts';
import ServiceDetailHeader from '../components/ServiceDetailHeader/ServiceDetailHeader.tsx';
import NoPageMessage from '../components/NoPageMessage/NoPageMessage.tsx';
import { useEffect, useState } from 'react';

const translations = {
  ru: {
    noPage: 'Страница не найдена.',
  },
  'en-us': {
    noPage: 'No page found.',
  },
};

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

  // Устанавливаем фавикон в спиннер при смене страницы
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', '/spinner.svg');
    }
    setIsLoading(true);
  }, [location.pathname]);

  useEffect(() => {
    if (page) {
      document.title = page.data.title;

      const images = Array.from(document.querySelectorAll('img'));
      const imagePromises = images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve(null);
            } else {
              const onLoadOrError = () => {
                resolve(null);
                img.onload = null;
                img.onerror = null;
              };
              img.onload = onLoadOrError;
              img.onerror = onLoadOrError;
            }
          }),
      );

      Promise.all(imagePromises).then(() => {
        setIsLoading(false);
      });
    }
  }, [page]);

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', isLoading ? '/spinner.svg' : '/favicon.png');
    }
  }, [isLoading]);

  if (state === 'loading' || isLoading) {
    return null;
  }

  if (state === 'failed') {
    return <NoPageMessage message={translations[language].noPage} />;
  }

  return (
    <div>
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
    </div>
  );
};

export default ServiceDetailPage;
