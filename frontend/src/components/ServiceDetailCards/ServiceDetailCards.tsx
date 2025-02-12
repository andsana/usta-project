import React from 'react';
import './ServiceDetailCards.css';

export interface ListItem {
  text: string;
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
  return (
    <div className="service-cards__container">
      <div className="service-cards__col-image">
        <div className="service-cards__col-image-wrapper">
          <img
            src={slice.primary.imagecard.url}
            alt={slice.primary.imagecard.alt || slice.primary.titlecard}
          />
        </div>
      </div>
      <div className="service-cards__col-text">
        <h3 className="service-cards__title">{slice.primary.titlecard}</h3>
        {slice.items.map((item, index) => (
          <div className="service-cards__col-text-item" key={index}>
            {item.subtitle && (
              <p className="service-cards__paragraph">{item.subtitle}</p>
            )}
            {
              <ul>
                {item.list.map((listItem, index) => (
                  <li key={index}>{listItem.text}</li>
                ))}
              </ul>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailCards;
