import React from 'react';
import './WhatWeDo.css';

interface Item {
  item: string;
}

interface WhatWeDoSliceProps {
  primary: {
    title: string;
    image: { url: string };
    paragraphfirst: string;
    paragraphsecond: string;
    paragraphthird?: string;
  };
  items: Item[];
}

interface WhatWeDoProps {
  slice: WhatWeDoSliceProps;
}

const WhatWeDo: React.FC<WhatWeDoProps> = ({ slice }) => {
  if (!slice) {
    return null;
  }

  return (
    <div className="what-we-do block container">
      <div className="what-we-do__wrapper">
        <div className="what-we-do__col">
          <img
            className="what-we-do__image"
            src={slice.primary.image.url}
            alt={slice.primary.title}
          />
        </div>
        <div className="what-we-do__col">
          <div className="what-we-do__col-content">
            <h2 className="what-we-do__col-title">{slice.primary.title}</h2>
            <p className="what-we-do__col-description">
              {slice.primary.paragraphfirst}
            </p>
            <ul className="what-we-do__col-list">
              {slice.items.map((item, index) => (
                <li key={index}>{item.item}</li>
              ))}
            </ul>
            <p className="what-we-do__col-description">
              {slice.primary.paragraphsecond}
            </p>
            {slice.primary.paragraphthird && (
              <p className="what-we-do__col-description">
                {slice.primary.paragraphthird}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
