import './ForInvestors.css';
import React, { useRef } from 'react';
import useInViewPort from '../../app/hooks/useInViewPort.ts';

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
            <CardComponent key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CardComponent: React.FC<{ item: Card; index: number }> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inViewport = useInViewPort(ref, { threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`ForInvestors__card ${inViewport ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span className="ForInvestors__card-value">{item.value}</span>
      <span className="ForInvestors__card-label">{item.label}</span>
    </div>
  );
};

export default ForInvestors;
