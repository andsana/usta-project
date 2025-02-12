import { useParams } from 'react-router-dom';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { useEffect } from 'react';
import { useLanguage } from '../app/hooks/useLanguage.ts';
import { useLoading } from '../app/hooks/useLoading.ts';
import { pageComponents } from '../app/constants/pageComponents.ts';
import ServiceDetailHeader from '../components/ServiceDetailHeader/ServiceDetailHeader.tsx';

const ServiceDetailPage = () => {
  const { uid } = useParams();
  const { language } = useLanguage();
  const { setLoading } = useLoading();

  const [document, { state }] = usePrismicDocumentByUID('servicedetail', uid || '', { language });
  console.log('servicedetail', document);

  useEffect(() => {
    setLoading(state === 'loading');
  }, [state, setLoading]);

  if (!document) return <p>Страница не найдена</p>;

  return (
    <div className="service-detail-container">
      {/* Верхний блок с заголовком и картинкой */}
      <ServiceDetailHeader
        title={document.data.title}
        preview={document.data.preview}
        image={document.data.image}
      />

      {/* Блок слайсов (контент) */}
      <div className="service-detail-content">
        <SliceZone
          slices={document.data.body}
          components={{ ...pageComponents }}
        />
      </div>
    </div>
  );
};

export default ServiceDetailPage;
