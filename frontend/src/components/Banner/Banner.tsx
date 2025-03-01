import React from 'react';
import { useScreenDetector } from '../../app/hooks/useScreenDetector.ts';
import MyLink from '../MyLink/MyLink.tsx';
import './Banner.css';

interface Service {
  servicename: string;
  serviceuid: {
    uid: string;
  };
}

interface BannerSlice {
  primary: {
    slogan: string;
    slogandescription: string;
    image: { url: string };
    video: { url?: string };
  };
  items: Service[];
}

interface BannerProps {
  slice: BannerSlice;
}

const Banner: React.FC<BannerProps> = ({ slice }) => {
  const { isMobile } = useScreenDetector();

  if (!slice) {
    return null;
  }

  console.log('slice', slice);

  const bannerStyle =
    slice.primary.video.url && !isMobile
      ? { backgroundImage: 'none' }
      : { backgroundImage: `url(${slice.primary.image.url})` };

  return (
    <div className="banner" style={bannerStyle}>
      {slice.primary.video.url && !isMobile && (
        <>
          <video
            className="banner-video"
            src={slice.primary.video.url}
            autoPlay
            loop
            muted
          />
          <div className="banner__video-overlay" />
        </>
      )}
      <div className="banner__container">
        <div className="banner__content-col">
          <h1 className="banner__content-title">{slice.primary.slogan}</h1>
          <div className="banner__content-subtitle-wrapper">
            <h4 className="banner__content-subtitle">
              {slice.primary.slogandescription}
            </h4>
          </div>
        </div>
      </div>

      <div className="banner__services">
        {slice.items.map((item, index) => (
          <MyLink
            className="banner__service"
            key={index}
            to={`/services/${item.serviceuid.uid}`}
          >
            {(() => {
              const words = item.servicename.split(' ');

              if (words.length === 1) {
                return <span className="last-word">{item.servicename}</span>;
              }

              const lastWord = words.pop();
              const firstPart = words.join(' ');

              return (
                <span>
                  {firstPart}{' '}
                  {lastWord && <span className="last-word">{lastWord}</span>}
                </span>
              );
            })()}
          </MyLink>
        ))}
      </div>
    </div>
  );
};

export default Banner;
