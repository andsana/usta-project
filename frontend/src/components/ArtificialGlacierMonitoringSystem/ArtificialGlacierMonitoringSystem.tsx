import React from 'react';
import './ArtificialGlacierMonitoringSystem.css';
import Map from '../MapComponent/MapComponent.tsx';

interface RichTextBlock {
  type: 'image' | 'embed';
  url?: string;
  oembed?: {
    html: string;
  };
}

interface Item {
  description: string;
}

interface ArtificialGlacierMonitoringSystemSliceProps {
  primary: {
    pagetitle: string;
    richtext: RichTextBlock[];
    maptitle: string;
    buttonname: string;
    buttonlink: string;
  };

  items: Item[];
}

interface ArtificialGlacierMonitoringSystemProps {
  slice: ArtificialGlacierMonitoringSystemSliceProps;
}

const ArtificialGlacierMonitoringSystem: React.FC<
  ArtificialGlacierMonitoringSystemProps
> = ({ slice }) => {
  if (!slice) {
    return null;
  }

  console.log('slice', slice); // проверка данных

  const oembeds = slice.primary.richtext.filter(
    (block) => block.type === 'embed' && block.oembed && block.oembed.html,
  );

  const images = slice.primary.richtext.filter(
    (block) => block.type === 'image' && block.url,
  );

  return (
    <div className="page container">
      <h2>{slice.primary.pagetitle}</h2>

      <div className="artificialGlacierMonitoringSystem__content">
        <div className="col">
          {slice.items.map((item, index) => (
            <p
              className="artificialGlacierMonitoringSystem__description"
              key={index}
            >
              {item.description}
            </p>
          ))}
        </div>

        <div className="col">
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
              <div
                className="artificialGlacierMonitoringSystem__image-wrapper"
                key={blockIndex}
              >
                <img
                  className="artificialGlacierMonitoringSystem__image"
                  src={block.url}
                  alt="pic"
                  loading="lazy"
                />
              </div>
            ))}
        </div>
      </div>

      <h2>{slice.primary.maptitle}</h2>
      <Map />
    </div>
  );
};

export default ArtificialGlacierMonitoringSystem;
