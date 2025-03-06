import React from 'react';
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

  const renderText = (
    text: string,
    spans?: Array<{ start: number; end: number; type: string }>,
  ) => {
    if (!spans || spans.length === 0) return text;

    return spans
      .reduce<{ elements: React.ReactNode[]; lastIndex: number }>(
        (acc, span, index) => {
          const beforeText = text.slice(acc.lastIndex, span.start);
          const boldText = text.slice(span.start, span.end);

          return {
            elements: [
              ...acc.elements,
              beforeText && <span key={`before-${index}`}>{beforeText}</span>,
              <strong key={`bold-${index}`}>{boldText}</strong>,
            ],
            lastIndex: span.end,
          };
        },
        { elements: [], lastIndex: 0 },
      )
      .elements.concat(text.slice(spans[spans.length - 1].end));
  };

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
                <li key={index}>{renderText(listItem.text, listItem.spans)}</li>
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
