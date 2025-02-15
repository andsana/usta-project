import { useCallback, useState } from 'react';
import { MdKeyboardArrowDown, MdLanguage } from 'react-icons/md';
import './LanguageSwitcher.css';
import { useOutsideClick } from '../../app/hooks/useOutsideClick.ts';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../app/hooks/useLanguage.ts';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeDropdown = () => setIsDropdownOpen(false);
  const ref = useOutsideClick(closeDropdown);

  const toggleLanguage = useCallback((lang: 'en-us' | 'ru') => {
    setLanguage(lang);
    setIsDropdownOpen(false);

    const currentPath = location.pathname;
    let newPath: string;

    if (lang === 'en-us') {
      if (currentPath === '/') {
        newPath = '/en';
      } else {
        newPath = currentPath.startsWith('/en') ? currentPath : `/en${currentPath}`;
      }
    } else {
      newPath = currentPath.replace(/^\/en/, '') || '/';
    }

    navigate(newPath);
  }, [setLanguage, navigate, location.pathname]);

  const toggleDropdown = useCallback(() => setIsDropdownOpen((prev) => !prev), []);

  return (
    <div ref={ref} className="language-switcher">
      <div onClick={toggleDropdown} className="language-switcher__button">
        <MdLanguage className="language-switcher__icon" />
        <span className="language-switcher__text">
          {language === 'en-us' ? 'En' : 'Ru'}
        </span>
        <MdKeyboardArrowDown className="language-switcher__arrow" />
      </div>

      {isDropdownOpen && (
        <div className="language-switcher__dropdown">
          <button
            className="language-switcher__option"
            onClick={() => toggleLanguage('ru')}
          >
            RU
          </button>
          <button
            className="language-switcher__option"
            onClick={() => toggleLanguage('en-us')}
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;