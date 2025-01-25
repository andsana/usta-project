import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';
import { useScreenDetector } from '../../app/hooks/useScreenDetector.ts';


interface BannerSliceProps {
  primary: {
    slogan: string;
    buttonname: string;
    buttonlink: string;
    image: { url: string };
    video: { url?: string };
  };
}

interface BannerProps {
  slice: BannerSliceProps;
}

const Banner: React.FC<BannerProps> = ({ slice }) => {
  const { isMobile } = useScreenDetector();

  if (!slice) {
    return null;
  }

  console.log('slice', slice);

  const bannerStyle = slice.primary.video.url && !isMobile
    ? { backgroundImage: 'none' }
    : { backgroundImage: `url(${slice.primary.image.url})` };

  return (
        <div className="home__banner"
             style={bannerStyle}
        >
          {slice.primary.video.url && !isMobile && (
            <video
              className="home__banner-video"
              src={slice.primary.video.url}
              autoPlay
              loop
              muted
            />
          )}
          <div className="home__banner-container">
            <div className="home__banner__content">
              <div className="home__banner__content-col">
                <h1>{slice.primary.slogan}</h1>
                <Link to={slice.primary.buttonlink} className="home__banner__content-button">
                  {slice.primary.buttonname}
                </Link>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Banner;