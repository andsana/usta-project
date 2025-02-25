import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../app/hooks/useLanguage.ts';
import { pageComponents } from '../app/constants/pageComponents.ts';
import { translations } from '../app/constants/translations.ts';
import {
  createAnimatedFavicon,
  stopAnimatedFavicon,
} from '../app/utils/animatedFavicon.ts';
import { waitForImagesToLoad } from '../app/utils/waitForImagesToLoad.ts';
import ServiceDetailHeader from '../components/ServiceDetailHeader/ServiceDetailHeader.tsx';
import NoContentMessage from '../components/NoContentMessage/NoContentMessage.tsx';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.tsx';

const ServiceDetailPage = () => {
  const { uid } = useParams();
  const { language } = useLanguage();
  const location = useLocation();

  const [page, { state }] = usePrismicDocumentByUID(
    'servicedetail',
    uid || '',
    { lang: language },
  );

  const pageTitle: string = page
    ? page.data.title
    : translations[language].serviceDetailPageTitle;

  const breadcrumbs = (
    <Breadcrumbs
      items={[{ text: translations[language].services }]}
      currentText={page && pageTitle}
    />
  );

  // Устанавливаем фавикон в спиннер при смене страницы
  useEffect(() => {
    createAnimatedFavicon();
  }, [location.pathname]);

  useEffect(() => {
    if (state === 'loading') {
      createAnimatedFavicon();
    } else if (state === 'failed') {
      stopAnimatedFavicon();
    } else if (page) {
      waitForImagesToLoad();
    }
  }, [state, page]);

  if (state === 'loading') {
    return null;
  }

  if (state === 'failed') {
    return (
      <>
        {breadcrumbs}
        <NoContentMessage message={translations[language].noServiceDetails} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      {breadcrumbs}

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
