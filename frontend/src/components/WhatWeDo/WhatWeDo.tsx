import React from 'react';
import './WhatWeDo.css';

interface Item {
  item: string;
}

interface WhatWeDoSliceProps {
  primary: {
    title: string;
    image: { url: string; };
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
    <div className="whatWeDo">
      <div className="whatWeDo__container">
        <div className="whatWeDo__col-wrapper">
          <div className="whatWeDo__col">
            <img className="whatWeDo__image" src={slice.primary.image.url} alt={slice.primary.title} />
          </div>
          <div className="whatWeDo__col">
            <div className="whatWeDo__col-content">
              <h3 className="whatWeDo__col-title">{slice.primary.title}</h3>
              <p className="whatWeDo__col-description">{slice.primary.paragraphfirst}</p>
              <ul className="whatWeDo__col-list">
                {slice.items.map((item, index) => (
                  <li key={index}>{item.item}</li>
                ))}
              </ul>
              <p className="whatWeDo__col-description">{slice.primary.paragraphsecond}</p>
              {slice.primary.paragraphthird &&
                <p className="whatWeDo__col-description">{slice.primary.paragraphthird}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;