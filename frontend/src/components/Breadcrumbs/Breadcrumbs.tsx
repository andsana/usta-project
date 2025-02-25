import React from 'react';
import MyLink from '../MyLink/MyLink.tsx';
import './Breadcrumbs.css';

interface Breadcrumb {
  text: string;
  to: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[]; // Массив хлебных крошек
  currentText?: string; // Текущий текст, который не будет ссылкой
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, currentText }) => {
  return (
    <div className="breadcrumbs__container">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <MyLink className="breadcrumbs__link" to={item.to}>
            {item.text}
          </MyLink>
          {index < items.length - 1 && (
            <span className="breadcrumbs__separator">/</span>
          )}
        </React.Fragment>
      ))}
      {currentText && (
        <>
          <span className="breadcrumbs__separator">/</span>
          <span className="breadcrumbs__current">{currentText}</span>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
