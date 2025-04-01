import { useLanguage } from '../app/hooks/useLanguage.ts';
import { useNavigate } from 'react-router-dom';
import { usePrismicDocumentByUID } from '@prismicio/react';
import { useEffect } from 'react';
import {
  createAnimatedFavicon,
  stopAnimatedFavicon,
} from '../app/utils/animatedFavicon.ts';
import { waitForImagesToLoad } from '../app/utils/waitForImagesToLoad.ts';
import { Helmet } from 'react-helmet-async';
import { translations } from '../app/constants/translations.ts';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.tsx';
import { PrismicDocument } from '@prismicio/client';

interface ArtificialGlacierMonitoringSystemPageData {
  title: string;
}

interface ArtificialGlacierMonitoringSystemDocument extends PrismicDocument {
  data: ArtificialGlacierMonitoringSystemPageData;
}

const ArtificialGlacierMonitoringSystemPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [page, { state }] =
    usePrismicDocumentByUID<ArtificialGlacierMonitoringSystemDocument>(
      'page_new',
      'artificial-glacier-monitoring-system',
      {
        lang: language,
      },
    );

  console.log('ArtificialGlacierMonitoring', page);

  const errorPageUrl = `/${language === 'en-us' ? 'en/' : ''}404`;
  const currentUrl = `https://ustainternational.com/${language === 'en-us' ? 'en/' : ''}monitoring-system-for-artificial-glaciers`;

  useEffect(() => {
    if (state === 'loading' || state === 'idle') return;

    if (!page || state === 'failed') {
      navigate(errorPageUrl);
    }
  }, [state, page, navigate, errorPageUrl]);

  useEffect(() => {
    if (state === 'loading') {
      createAnimatedFavicon();
    }

    if (state === 'loaded' && page) {
      waitForImagesToLoad();
    }

    if (state === 'failed') {
      stopAnimatedFavicon();
    }
  }, [state, page]);

  if (state === 'loading') {
    return null;
  }

  if (!page) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{page.data.title} | Usta International</title>
        <meta
          name="description"
          content={translations[language].homeDescription}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={page.data.title} />
        <meta
          property="og:description"
          content={translations[language].homeDescription}
        />
        <meta
          property="og:image"
          content="/assets/images/ustainternational.jpg"
        />
        <link rel="canonical" href={currentUrl} />
        <meta name="language" content={language} />
      </Helmet>

      <Breadcrumbs currentText={page.data.title} />

      <div className="projects page container">
        <h2 className="projects__title">{page.data.title}</h2>
      </div>
    </>
  );
};

export default ArtificialGlacierMonitoringSystemPage;
