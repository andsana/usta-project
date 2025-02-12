import React from 'react';
import MyLink from '../MyLink/MyLink.tsx';
import './Breadcrumbs.css';

interface BreadcrumbsProps {
  title: string;
  middleText: string;
  middleLink?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  title,
  middleText,
  middleLink,
}) => {
  return (
    <div className="breadcrumbs__container">
      <MyLink className="breadcrumbs__link" to="/">
        Home
      </MyLink>
      <span className="breadcrumbs__separator">/</span>

      {middleLink ? (
        <>
          <MyLink className="breadcrumbs__link" to={middleLink}>
            {middleText}
          </MyLink>
          <span className="breadcrumbs__separator">/</span>
        </>
      ) : (
        <span className="breadcrumbs__span">{middleText}</span>
      )}

      <span className="breadcrumbs__separator">/</span>
      <span className="breadcrumbs__current">{title}</span>
    </div>
  );
};

export default Breadcrumbs;
