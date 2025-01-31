import { useContext, useEffect } from 'react';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { LanguageContext } from '../app/contexts/LanguageContext.tsx';
import { LoadingContext } from '../app/contexts/LoadingContext.tsx';
import { pageComponents } from '../app/constants/pageComponents.ts';

const HomePage = () => {
  const languageContext = useContext(LanguageContext);
  const loadingContext = useContext(LoadingContext);

  if (!languageContext || !loadingContext) {
    throw new Error('Contexts must be used within their respective Providers');
  }

  const { language } = languageContext;
  const { setLoading } = loadingContext;

  const [document, { state }] = usePrismicDocumentByUID('page_new', 'projects', { lang: language });

  useEffect(() => {
    setLoading(state === 'loading');
  }, [state, setLoading]);

  if (!document || !document.data) {
    return null;
  }

  return (
    <>
      <SliceZone
        slices={document.data.body}
        components={{ ...pageComponents }}
      />
      {/*<Projects slice={mockSlice} />*/}
    </>
  );
};

export default HomePage;
