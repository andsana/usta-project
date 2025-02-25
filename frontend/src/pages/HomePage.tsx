import { useEffect } from 'react';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { pageComponents } from '../app/constants/pageComponents.ts';
import { useLanguage } from '../app/hooks/useLanguage.ts';
import NoContentMessage from '../components/NoContentMessage/NoContentMessage.tsx';
import { translations } from '../app/constants/translations.ts';
import {
  createAnimatedFavicon,
  stopAnimatedFavicon,
} from '../app/utils/animatedFavicon.ts';
import { waitForImagesToLoad } from '../app/utils/waitForImagesToLoad.ts';

const HomePage = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const [page, { state }] = usePrismicDocumentByUID('page_new', 'home', {
    lang: language,
  });

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
    return <NoContentMessage message={translations[language].noPage} />;
  }

  return (
    <>
      <Helmet>
        <title>Usta International</title>
      </Helmet>
      {page && (
        <SliceZone slices={page.data.body} components={{ ...pageComponents }} />
      )}
    </>
  );
};

export default HomePage;
