import React from 'react';
// import { Link } from 'react-router-dom';
import './Banner.css';
import { useScreenDetector } from '../../app/hooks/useScreenDetector.ts';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface BannerSliceProps {
  primary: {
    slogan: string;
    slogandescription: string;
    // buttonname: string;
    // buttonlink: string;
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
    <div className="banner"
         style={bannerStyle}
    >
      {slice.primary.video.url && !isMobile && (
        <video
          className="banner-video"
          src={slice.primary.video.url}
          autoPlay
          loop
          muted
        />
      )}
      <div className="banner-container">
        <div className="banner__content">
          <div className="banner__content-col">
            <h1 className="banner__content-title">{slice.primary.slogan}</h1>
            <div className="banner__content-subtitle-wrapper">
              <h4 className="banner__content-subtitle">{slice.primary.slogandescription}</h4>
              <a className="banner__scroll-top" href="#whoAreWe">
                <MdKeyboardArrowDown className="banner__arrow-top" />
              </a>
            </div>
            {/*<Link to={slice.primary.buttonlink} className="banner__content-button">*/}
            {/*  {slice.primary.buttonname}*/}
            {/*</Link>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;