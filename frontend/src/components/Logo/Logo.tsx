import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

interface LogoProps {
  url: string;
}

const Logo: React.FC<LogoProps> = ({ url }) => {
  return (
    <Link className="logo" to={url}>
      <span className="logo__usta">usta</span>
      <span className="logo__international">international</span>
    </Link>
  );
};

export default Logo;
