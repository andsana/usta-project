import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import NoContentMessage from '../components/NoContentMessage/NoContentMessage.tsx';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.tsx';

interface Slice {
  slice_type: string;
  primary: {
    title: string;
  };
}

const ProjectsPage = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [page, { state }] = usePrismicDocumentByUID('page_new', 'projects', {
    lang: language,
  });

  let pageTitle: string = translations[language].projectsPageTitle;

  if (page) {
    const headerSlice = page.data.body.find(
      (slice: Slice) => slice.slice_type === 'projectcardsheader',
    );
    if (headerSlice?.primary?.title) {
      pageTitle = headerSlice.primary.title;
    }
  }

  const breadcrumbs = <Breadcrumbs currentText={pageTitle} />;

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
        <NoContentMessage message={translations[language].noProjects} />
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
        <SliceZone slices={page.data.body} components={{ ...pageComponents }} />
      )}
    </>
  );
};

export default ProjectsPage;
