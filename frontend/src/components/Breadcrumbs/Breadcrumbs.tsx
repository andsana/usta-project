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
    <div className="breadcrumbs container">
      <MyLink className="breadcrumbs__link" to="/">
        Home
      </MyLink>
      <span className="separator">/</span>

      {middleLink ? (
        <>
          <MyLink className="breadcrumbs__link" to={middleLink}>
            {middleText}
          </MyLink>
          <span className="separator">/</span>
        </>
      ) : (
        <span className="breadcrumbs__span">{middleText}</span>
      )}

      <span className="separator">/</span>
      <span className="breadcrumbs__current">{title}</span>
    </div>
  );
};

export default Breadcrumbs;
