import React from 'react';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { useLocation, useNavigate } from 'react-router-dom';

interface MyButtonProps {
  linkUrl?: string;
  linkName: string;
  className?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  linkUrl,
  linkName,
  className,
}) => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const homePath = language === 'en-us' ? '/en' : '/';

  const handleClick = () => {
    if (!linkUrl) return;

    if (location.pathname === homePath) {
      if (linkUrl) {
        const element = document.getElementById(linkUrl);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(homePath, {
        state: { scrollTo: linkUrl },
      });
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      {linkName}
    </button>
  );
};

export default MyButton;
