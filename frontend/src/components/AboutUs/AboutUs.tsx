import React from 'react';
import './AboutUs.css';

interface AboutAsSliceProps {
  primary: {
    title: string;
    number: string
    description: string;
  };
}

interface AboutAsProps {
  slice: AboutAsSliceProps;
}

const AboutUs: React.FC<AboutAsProps> = ({ slice }) => {
  return (
    <div className="about-us">
      <div className="about-us__container">
        <h2 className="about-us__col-start">
          {slice.primary.title}
        </h2>
        <div className="about-us__col-end">
          <span className="about-us__col-end-number">{slice.primary.number}</span>
          <p className="about-us__col-end-description">{slice.primary.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;