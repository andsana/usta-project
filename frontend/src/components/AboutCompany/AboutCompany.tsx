import React from 'react';
import './AboutCompany.css';

interface AboutCompanySliceProps {
  primary: {
    title: string;
    paragraphfirst?: string;
    paragraphsecond?: string;
    paragraphthird?: string;
    image?: { url?: string };
  };
  items?: string[];
}

interface AboutCompanyProps {
  slice: AboutCompanySliceProps;
}

const AboutCompany: React.FC<AboutCompanyProps> = ({ slice }) => {

  if (!slice) {
    console.error('slice is undefined or null');
    return <div>Loading...</div>;
  }

  return (
    <div className="about-company">
      <div className="about-company__container">
        <div className="about-company__col-wrapper">
          <div className="about-company__col">
            <h2 className="about-company__col-title-company">{slice.primary.title}</h2>
          </div>
          <div className="about-company__col">
            <div className="about-company__col-content-company">
              {slice.items?.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="about-company__col-wrapper">
          <div className="about-company__col">
            {slice.primary.image?.url && <img className="about-company__image" src={slice.primary.image.url}
                                             alt={slice.primary.title} />}
          </div>
          <div className="about-company__col">
            <div className="about-company__col-content">
              <h3 className="about-company__col-title">{slice.primary.title}</h3>
              <p className="about-company__col-description">{slice.primary.paragraphfirst}</p>
              <ul className="about-company__col-list">
                {slice.items?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="about-company__col-description">{slice.primary.paragraphsecond}</p>
              {slice.primary.paragraphthird &&
                <p className="about-company__col-description">{slice.primary.paragraphthird}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;


