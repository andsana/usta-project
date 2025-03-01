import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import './Logo.css';

interface LogoProps {
  url: string;
}

const Logo: React.FC<LogoProps> = ({ url }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const homePath = language === 'en-us' ? '/en' : '/';

  const handleClick = (e: React.MouseEvent) => {
    if (location.pathname === homePath) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      e.preventDefault();
      navigate(homePath);
    }
  };

  return (
    <Link to={url} className="logo" onClick={handleClick}>
      <span className="logo__usta">usta</span>
      <span className="logo__international">international</span>
    </Link>
  );
};

export default Logo;
