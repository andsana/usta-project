import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { useLanguage } from '../app/hooks/useLanguage.ts';
import { pageComponents } from '../app/constants/pageComponents.ts';
import { translations } from '../app/constants/translations.ts';
import {
  createAnimatedFavicon,
  stopAnimatedFavicon,
} from '../app/utils/animatedFavicon.ts';
import { waitForImagesToLoad } from '../app/utils/waitForImagesToLoad.ts';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.tsx';

interface HeaderSlice {
  slice_type: string;
  primary: {
    title: string;
  };
}

const ProjectsPage = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [page, { state }] = usePrismicDocumentByUID('page_new', 'projects', {
    lang: language,
  });

  const errorPageUrl = `/${language === 'en-us' ? 'en/' : ''}404`;
  const currentUrl = `https://ustainternational.com/${language === 'en-us' ? 'en/' : ''}projects`;

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
  }

  if (!page) {
    navigate(errorPageUrl);
    return null;
  }

  const headerSlice = page.data.body.find(
    (slice: HeaderSlice) => slice.slice_type === 'projectcardsheader',
  );

  const pageTitle = headerSlice?.primary.title
    ? `${headerSlice.primary.title} | Usta International`
    : translations[language].projectsPageTitle;

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

      <Breadcrumbs currentText={headerSlice?.primary.title} />
      <SliceZone slices={page.data.body} components={{ ...pageComponents }} />
    </>
  );
};
export default ProjectsPage;
