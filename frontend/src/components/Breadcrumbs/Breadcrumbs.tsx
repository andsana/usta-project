import React from 'react';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { translations } from '../../app/constants/translations.ts';
import MyLink from '../MyLink/MyLink.tsx';
import './Breadcrumbs.css';

interface Breadcrumb {
  text: string;
  to?: string;
}

interface BreadcrumbsProps {
  items?: Breadcrumb[];
  currentText?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items = [],
  currentText,
}) => {
  const { language } = useLanguage();

  return (
    <div className="breadcrumbs container">
      <MyLink className="breadcrumbs__link" to="/">
        {translations[language].home}
      </MyLink>
      {items.length > 0 && (
        <>
          <span className="breadcrumbs__separator">/</span>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.to ? (
                <MyLink className="breadcrumbs__link" to={item.to}>
                  {item.text}
                </MyLink>
              ) : (
                <span>{item.text}</span>
              )}
              {index < items.length - 1 && (
                <span className="breadcrumbs__separator">/</span>
              )}
            </React.Fragment>
          ))}
        </>
      )}
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
