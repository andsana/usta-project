import { useEffect } from 'react';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();

  const [page, { state }] = usePrismicDocumentByUID('page_new', 'home', {
    lang: language,
  });

  const errorPageUrl = `/${language === 'en-us' ? 'en/' : ''}404`;
  const currentUrl = `https://ustainternational.com/${language === 'en-us' ? '/en/' : ''}`;

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
    navigate(errorPageUrl);
    return null;
  }

  if (!page) {
    navigate(errorPageUrl);
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
