import React, { useRef } from 'react';
import useInViewPort from '../../app/hooks/useInViewPort.ts';
import useScrollTriggeredCountUp from '../../app/hooks/useScrollTriggeredCountUp.ts';
import './ForInvestors.css';

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
      <div className="container">
        <h2 className="for-investors__title">{slice.primary.title}</h2>
        <div className="ForInvestors__cards">
          {slice.items.map((item: Card, index: number) => (
            <CardComponent key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CardComponent: React.FC<{ item: Card; index: number }> = ({
  item,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const numericValue = parseInt(item.value.replace(/\D/g, '')) || 0;
  const symbol = item.value.replace(/\d/g, '');

  const count = useScrollTriggeredCountUp(ref, numericValue, 2000);
  const inViewport = useInViewPort(ref, { threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`ForInvestors__card ${inViewport ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span className="ForInvestors__card-value">
        {count}
        {symbol}
      </span>
      <span className="ForInvestors__card-label">{item.label}</span>
    </div>
  );
};

export default ForInvestors;
