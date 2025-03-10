import { useEffect } from 'react';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { pageComponents } from '../app/constants/pageComponents.ts';
import { useLanguage } from '../app/hooks/useLanguage.ts';
import { translations } from '../app/constants/translations.ts';
import {
  createAnimatedFavicon,
  stopAnimatedFavicon,
} from '../app/utils/animatedFavicon.ts';
import { waitForImagesToLoad } from '../app/utils/waitForImagesToLoad.ts';

const HomePage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [page, { state }] = usePrismicDocumentByUID('page_new', 'home', {
    lang: language,
  });

  const errorPageUrl = `/${language === 'en-us' ? 'en/' : ''}404`;
  const currentUrl = `https://ustainternational.com/${language === 'en-us' ? '/en/' : ''}`;

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
        <title>{translations[language].homeTitle}</title>
        <meta
          name="description"
          content={translations[language].homeDescription}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={translations[language].homeTitle} />
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
      <SliceZone slices={page.data.body} components={{ ...pageComponents }} />
    </>
  );
};

export default HomePage;
