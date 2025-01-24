import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { pageComponents } from '../app/constants/pageComponents.ts';

const HomePage = () => {
  const location = useLocation();
  const [language, setLanguage] = useState('ru');

  useEffect(() => {
    const langFromUrl = location.pathname.startsWith('/en-us') ? 'en-us' : 'ru';
    setLanguage(langFromUrl);
  }, [location]);

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
        components={{...pageComponents}}
      />
    </>
  );
};

export default HomePage;
