import React from 'react';
import './WhoAreWe.css';

interface Item {
  paragraph: string;
}

interface WhoAreWeSliceProps {
  primary: {
    title: string;
  };
  items: Item[];
}

interface WhoAreWeProps {
  slice: WhoAreWeSliceProps;
}

const WhoAreWe: React.FC<WhoAreWeProps> = ({ slice }) => {

  if (!slice) {
    return null;
  }

  return (
    <div id="whoAreWe" className="who-are-we__container">
      <div className="who-are-we__col-wrapper">
        <div className="who-are-we__col">
          <h2 className="who-are-we__col-title">{slice.primary.title}</h2>
        </div>
        <div className="who-are-we__col">
          <div className="who-are-we__col-content">
            {slice.items.map((item, index) => (
              <p className="who-are-we__col-description" key={index}>{item.paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;
