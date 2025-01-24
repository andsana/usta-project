import { useContext } from 'react';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { pageComponents } from '../app/constants/pageComponents.ts';
import { LanguageContext } from '../app/contexts/LanguageContext.tsx';

const HomePage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('LanguageContext must be used within a LanguageProvider');
  }

  const { language } = context;

  const [document] = usePrismicDocumentByUID('page_new', 'home', { lang: language });
  console.log(document);

  if (!document) {
    return <div>Loading...</div>;
  }

  console.log(document.data);

  return (
    <>
      <SliceZone
        slices={document.data.body}
        components={{ ...pageComponents }}
      />
    </>
  );
};

export default HomePage;
