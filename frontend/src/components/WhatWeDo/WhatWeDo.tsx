import React from 'react';
import MyLink from '../MyLink/MyLink.tsx';
import './WhatWeDo.css';

interface Item {
  item: string;
  serviceuid: { uid: string };
}

interface RichTextBlock {
  type: 'image' | 'embed';
  url?: string;
  oembed?: {
    html: string;
  };
}

interface WhatWeDoSliceProps {
  primary: {
    title: string;
    richtext: RichTextBlock[];
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

  const oembeds = slice.primary.richtext.filter(
    (block) => block.type === 'embed' && block.oembed && block.oembed.html,
  );

  const images = slice.primary.richtext.filter(
    (block) => block.type === 'image' && block.url,
  );

  return (
    <div className="what-we-do block container">
      {/*<div className="what-we-do__col-content">*/}
      {oembeds.length > 0 &&
        oembeds.map((block, blockIndex) => (
          <div
            className="what-we-do__col what-we-do__col-embed"
            key={blockIndex}
            dangerouslySetInnerHTML={{ __html: block.oembed!.html }}
          />
        ))}

      {images.length > 0 &&
        images.map((block, blockIndex) => (
          <div className="what-we-do__col what-we-do__col-image-wrapper">
            <img src={block.url} alt="pic" key={blockIndex} loading="lazy" />
          </div>
        ))}

      <div id="#services" className="what-we-do__col info">
        <h2 className="what-we-do__col-title">{slice.primary.title}</h2>
        <p className="what-we-do__col-description">
          {slice.primary.paragraphfirst}
        </p>
        <ul className="what-we-do__col-list">
          {slice.items.map((item, index) => (
            <li key={index}>
              <MyLink
                className="what-we-do__col-list__link"
                key={index}
                to={`/services/${item.serviceuid.uid}`}
              >
                {item.item}
              </MyLink>
            </li>
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
      {/*</div>*/}
    </div>
  );
};

export default WhatWeDo;
