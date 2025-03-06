import React from 'react';
import MyLink from '../MyLink/MyLink.tsx';
import './Logo.css';

interface LogoProps {
  url: string;
}

const Logo: React.FC<LogoProps> = ({ url }) => {
  return (
    <MyLink className="logo" to={url}>
      <span className="logo__usta">usta</span>
      <span className="logo__international">international</span>
    </MyLink>
  );
};

export default Logo;
