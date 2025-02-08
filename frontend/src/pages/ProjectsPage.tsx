import { useEffect } from 'react';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { useLanguage } from '../app/hooks/useLanguage.ts';
import { useLoading } from '../app/hooks/useLoading.ts';
import { pageComponents } from '../app/constants/pageComponents.ts';

const ProjectsPage = () => {
  const { language } = useLanguage();
  const { setLoading } = useLoading();

  const [document, { state }] = usePrismicDocumentByUID('page_new', 'projectcardspage', { lang: language });

  useEffect(() => {
    setLoading(state === 'loading');
  }, [state, setLoading]);

  if (!document || !document.data) {
    return null;
  }

  return (
    <div className="projectPage__container">
      <SliceZone
        slices={document.data.body}
        components={{ ...pageComponents }}
      />
      {/*<Projects slice={mockSlice} />*/}
    </div>
  );
};

export default ProjectsPage;
