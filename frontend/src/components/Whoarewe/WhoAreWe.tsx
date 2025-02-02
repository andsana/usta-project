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
    <div className="whoAreWe">
      <div className="whoAreWe__container">
        <div className="whoAreWe__col-wrapper">
          <div className="whoAreWe__col">
            <h2 className="whoAreWe__col-title">{slice.primary.title}</h2>
          </div>
          <div className="whoAreWe__col">
            <div className="whoAreWe__col-content">
              {slice.items.map((item, index) => (
                <p className="whoAreWe__col-description" key={index}>{item.paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;
