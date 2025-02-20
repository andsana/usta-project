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
  const renderText = (
    text: string,
    spans?: Array<{ start: number; end: number; type: string }>,
  ) => {
    if (!spans || spans.length === 0) {
      return text;
    }

    const formattedText = [];
    let lastIndex = 0;

    spans.forEach((span, index) => {
      const beforeText = text.slice(lastIndex, span.start);
      const boldText = text.slice(span.start, span.end);

      if (beforeText) {
        formattedText.push(beforeText);
      }

      formattedText.push(<strong key={index}>{boldText}</strong>);
      lastIndex = span.end;
    });

    if (lastIndex < text.length) {
      formattedText.push(text.slice(lastIndex));
    }

    return formattedText;
  };

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
                  <li key={index}>
                    {renderText(listItem.text, listItem.spans)}
                  </li>
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
