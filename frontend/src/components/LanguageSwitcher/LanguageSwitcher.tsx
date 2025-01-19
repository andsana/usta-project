import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { MdLanguage } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleLanguage = (lang: 'en-us' | 'ru') => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="language-switcher">
      <div onClick={toggleDropdown} className="language-switcher__button">
        <MdLanguage className="language-switcher__icon" />
        <span className="language-switcher__text">{language === 'en-us' ? 'EN' : 'RU'}</span>
        <MdKeyboardArrowDown className="language-switcher__arrow" />
      </div>

      {isDropdownOpen && (
        <div className="language-switcher__dropdown">
          <button className="language-switcher__option" onClick={() => toggleLanguage('ru')}>
            RU
          </button>
          <button className="language-switcher__option" onClick={() => toggleLanguage('en-us')}>
            EN
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

