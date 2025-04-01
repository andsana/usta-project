import { useLanguage } from '../app/hooks/useLanguage.ts';
import { useNavigate } from 'react-router-dom';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { useEffect } from 'react';
import {
  createAnimatedFavicon,
  stopAnimatedFavicon,
} from '../app/utils/animatedFavicon.ts';
import { waitForImagesToLoad } from '../app/utils/waitForImagesToLoad.ts';
import { Helmet } from 'react-helmet-async';
import { translations } from '../app/constants/translations.ts';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.tsx';
import { pageComponents } from '../app/constants/pageComponents.ts';

interface Slice {
  slice_type: string;
  primary: {
    pagetitle: string;
  };
}

const ArtificialGlacierMonitoringSystemPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [page, { state }] = usePrismicDocumentByUID(
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

  const slice = page.data.body.find(
    (slice: Slice) => slice.slice_type === 'glacier_monitoring',
  );

  const pageTitle = slice?.primary.pagetitle
    ? `${slice.primary.pagetitle} | Usta International`
    : translations[language].artificialGlacierMonitoringSystemPageTitle;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={translations[language].homeDescription}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={pageTitle} />
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

      <Breadcrumbs currentText={slice?.primary.pagetitle} />
      <SliceZone slices={page.data.body} components={{ ...pageComponents }} />
    </>
  );
};

export default ArtificialGlacierMonitoringSystemPage;
