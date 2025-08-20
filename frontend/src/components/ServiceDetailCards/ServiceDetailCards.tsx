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
      imagecard: { url: string | null; alt?: string };
      youtubecard: {
        html: string | null;
      };
    };
    items: ServiceCardsItem[];
  };
}

const ServiceDetailCards: React.FC<ServiceCardsProps> = ({ slice }) => {
  if (!slice || !slice.primary || !slice.items) return null;

  const { titlecard, imagecard, youtubecard } = slice.primary;

// 1. Определяем что показывать
  let mediaContent = null;

  if (imagecard.url) {
    mediaContent = (
      <div className="service-cards__image-wrapper">
        <img
          src={imagecard.url}
          alt={imagecard.alt || ''}
          loading="lazy"
        />
      </div>
    );
  } else if (youtubecard.html) {
    mediaContent = (
      <div
        className="service-cards__video-wrapper"
        dangerouslySetInnerHTML={{ __html: youtubecard.html }}
      />
    );
  }
  return (
    <div className="service-cards container block">
      <div className="service-cards__col-text">
        <h2 className="service-cards__title">{titlecard}</h2>
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

      {/* Медиа-контент */}
      {mediaContent && (
        <div className="service-cards__col-media">
          {mediaContent}
        </div>
      )}
    </div>
  );
};

export default ServiceDetailCards;
