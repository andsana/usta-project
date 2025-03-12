import { useCallback, useState } from 'react';
import { MdLanguage } from 'react-icons/md';
import { useOutsideClick } from '../../app/hooks/useOutsideClick.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const closeDropdown = () => setIsDropdownOpen(false);
  const ref = useOutsideClick<HTMLDivElement>(closeDropdown);

  const toggleLanguage = useCallback(
    (lang: 'en-us' | 'ru') => {
      setLanguage(lang);
      setIsDropdownOpen(false);

      const currentPath = location.pathname;
      let newPath: string;

      if (lang === 'en-us') {
        if (currentPath === '/') {
          newPath = '/en';
        } else {
          newPath = currentPath.startsWith('/en')
            ? currentPath
            : `/en${currentPath}`;
        }
      } else {
        newPath = currentPath.replace(/^\/en/, '') || '/';
      }

      navigate(newPath);
    },
    [setLanguage, navigate, location.pathname],
  );

  const toggleDropdown = useCallback(
    () => setIsDropdownOpen((prev) => !prev),
    [],
  );

  return (
    <div ref={ref} className="language-switcher">
      <button onClick={toggleDropdown} className="language-switcher__button">
        <MdLanguage className="language-switcher__icon" />
        <span className="language-switcher__text">
          {language === 'en-us' ? 'EN' : 'RU'}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="language-switcher__dropdown">
          {language === 'en-us' ? (
            <button
              className="language-switcher__option"
              onClick={() => toggleLanguage('ru')}
            >
              RU
            </button>
          ) : (
            <button
              className="language-switcher__option"
              onClick={() => toggleLanguage('en-us')}
            >
              EN
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
