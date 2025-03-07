import React from 'react';
import MyLink from '../MyLink/MyLink.tsx';
import './Logo.css';

interface LogoProps {
  url: string;
  ustaClass?: string;
  internationalClass?: string;
}

const Logo: React.FC<LogoProps> = ({ url, ustaClass, internationalClass }) => {
  return (
    <MyLink className="logo" to={url}>
      <span className={`logo__usta ${ustaClass}`}>usta</span>
      <span className={`logo__international ${internationalClass}`}>
        international
      </span>
    </MyLink>
  );
};

export default Logo;
