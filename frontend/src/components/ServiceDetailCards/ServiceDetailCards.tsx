import React from 'react';
import RenderText from '../RenderText/RenderText.tsx';
import './ServiceDetailCards.css';

export interface ListItem {
  text: string;
  spans?: Array<{ start: number; end: number; type: string }>;
}

export interface ServiceCardsItem {
  subtitle?: string | null;
  list: ListItem[];
}

export interface ServiceCardsProps {
  slice: {
    primary: {
      titlecard: string;
      imagecard: { url: string; alt?: string };
    };
    items: ServiceCardsItem[];
  };
}

const ServiceDetailCards: React.FC<ServiceCardsProps> = ({ slice }) => {
  if (!slice || !slice.primary || !slice.items) return null;

  return (
    <div className="service-cards container block">
      <div className="service-cards__col-text">
        <h2 className="service-cards__title">{slice.primary.titlecard}</h2>
        {slice.items.map((item, index) => (
          <div className="service-cards__col-text-item" key={index}>
            {item.subtitle && (
              <p className="service-cards__paragraph">{item.subtitle}</p>
            )}
            <ul>
              {item.list.map((listItem, index) => (
                <li key={index}>
                  <RenderText text={listItem.text} spans={listItem.spans} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="service-cards__col-image">
        <div className="service-cards__col-image-wrapper">
          <img
            src={slice.primary.imagecard.url}
            alt={slice.primary.imagecard.alt || slice.primary.titlecard}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailCards;
