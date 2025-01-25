import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

interface BannerSliceProps {
  primary: {
    slogan: string;
    buttonname: string;
    buttonlink: string;
    image: { url: string };
    video?: { url: string };
  };
}

interface BannerProps {
  slice: BannerSliceProps;
}

const Banner: React.FC<BannerProps> = ({ slice }) => {
  if (!slice) {
    console.log('Слайс не найден');
    return null;
  }
  
  const bannerStyle = slice.primary.video
    ? { background: `url(${slice.primary.image.url}) no-repeat center center / cover` }
    : { backgroundImage: `url(${slice.primary.image.url})` };

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__banner" style={bannerStyle}>
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
      </div>
    </div>
  );
};

export default Banner;