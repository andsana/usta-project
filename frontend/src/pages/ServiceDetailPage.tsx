import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.tsx';

const ServiceDetailPage = () => {
  const { uid } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [page, { state }] = usePrismicDocumentByUID(
    'servicedetail',
    uid || '',
    { lang: language },
  );

  const currentUrl = `https://ustainternational.com/${language === 'en-us' ? 'en/' : ''}services/${uid}`;
  const errorPageUrl = `/${language === 'en-us' ? 'en/' : ''}404`;

  useEffect(() => {
    if (state === 'loading' || state === 'idle') return;

    if (!page || state === 'failed') {
      stopAnimatedFavicon();

      setTimeout(() => {
        navigate(errorPageUrl);
      }, 100);
    }
  }, [state, page, navigate, errorPageUrl]);

  useEffect(() => {
    if (state === 'loading') {
      createAnimatedFavicon();
    }

    if (state === 'loaded' && page) {
      waitForImagesToLoad();
    }

    if (state === 'failed' || !page) {
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
        <title>{`${page.data.title} | Usta International`}</title>
        <meta name="description" content={page.data.preview} />
        <meta property="og:url" content={currentUrl} />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content={`${page.data.title} | Usta International`}
        />
        <meta property="og:description" content={page.data.preview} />
        <meta property="og:image" content={page.data.image} />
        <link rel="canonical" href={currentUrl} />
        <meta name="language" content={language} />
      </Helmet>

      <Breadcrumbs
        items={[{ text: translations[language].services }]}
        currentText={page.data.title}
      />
      <ServiceDetailHeader
        title={page.data.title}
        preview={page.data.preview}
        image={page.data.image}
      />
      <SliceZone slices={page.data.body} components={{ ...pageComponents }} />
    </>
  );
};

export default ServiceDetailPage;
