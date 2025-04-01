import React from 'react';
import './WhoAreWe.css';

interface RichTextBlock {
  type: 'paragraph' | 'image' | 'embed';
  text?: string;
  url?: string;
  oembed?: {
    html: string;
  };
}

interface WhoAreWeSliceProps {
  primary: {
    title: string;
  };
  items: { richtext: RichTextBlock[] }[];
}

interface WhoAreWeProps {
  slice: WhoAreWeSliceProps;
}

const WhoAreWe: React.FC<WhoAreWeProps> = ({ slice }) => {
  if (!slice) {
    return null;
  }

  return (
    <div id="#about-us" className="who-are-we container block">
      <h2 className="who-are-we__col-title">{slice.primary.title}</h2>
      <div className="who-are-we__content">
        {slice.items.map((item, index) => {
          // Фильтруем элементы по типам
          const paragraphs = item.richtext.filter(
            (block) => block.type === 'paragraph' && block.text,
          );

          const oembeds = item.richtext.filter(
            (block) =>
              block.type === 'embed' && block.oembed && block.oembed.html,
          );

          const images = item.richtext.filter(
            (block) => block.type === 'image' && block.url,
          );

          return (
            <React.Fragment key={index}>
              {paragraphs.length > 0 &&
                paragraphs.map((block, blockIndex) => (
                  <p className="who-are-we__description" key={blockIndex}>
                    {block.text}
                  </p>
                ))}

              {oembeds.length > 0 &&
                oembeds.map((block, blockIndex) => (
                  <div
                    className="who-are-we__embed"
                    key={blockIndex}
                    dangerouslySetInnerHTML={{ __html: block.oembed!.html }}
                  />
                ))}

              {images.length > 0 &&
                images.map((block, blockIndex) => (
                  <div className="who-are-we__image-wrapper">
                    <img
                      src={block.url}
                      alt="pic"
                      key={blockIndex}
                      loading="lazy"
                    />
                  </div>
                ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WhoAreWe;
