import './ForInvestors.css';
import React from 'react';

interface Card {
  value: string;
  label: string;
}

interface ForInvestorsSliceProps {
  primary: {
    title: string;
  };
  items: Card[];
}

interface ForInvestorsProps {
  slice: ForInvestorsSliceProps;
}

const ForInvestors: React.FC<ForInvestorsProps> = ({ slice }) => {
  return (
    <div className="ForInvestors">
      <div className="ForInvestors__container">
        <h3 className="for-investors__title">{slice.primary.title}</h3>
        <div className="ForInvestors__cards">
          {slice.items.map((item: Card, index: number) => (
            <div key={index} className="ForInvestors__card">
              <span className="ForInvestors__card-value">{item.value}</span>
              <span className="ForInvestors__card-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForInvestors;
