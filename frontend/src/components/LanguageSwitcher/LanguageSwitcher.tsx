import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { MdLanguage } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import './LanguageSwitcher.css';
import { useOutsideClick } from '../../app/hooks/useOutsideClick.ts';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const closeDropdown = () => setIsDropdownOpen(false);

  const ref = useOutsideClick(closeDropdown);

  const toggleLanguage = (lang: 'en-us' | 'ru') => {
    console.log('Changing language to:', lang);
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div ref={ref} className="language-switcher">
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

    </div>

  );
};

export default LanguageSwitcher;

