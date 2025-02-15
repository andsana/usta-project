import React, { useContext, useEffect, useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import { useSinglePrismicDocument } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { LanguageContext } from '../../app/contexts/LanguageContext.tsx';
import { LoadingContext } from '../../app/contexts/LoadingContext.tsx';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.tsx';
import MyLink from '../MyLink/MyLink.tsx';
import './Header.css';
import { useOutsideClick } from '../../app/hooks/useOutsideClick.ts';

interface MenuItem {
  name: string;
  link: { url: string };
}

interface HeaderData {
  logo: { url: string };
  logolink: { url: string };
  menu_items: MenuItem[];
  buttonname?: string;
  buttonlink?: { url: string };
  buttonicon?: { url: string };
}

interface HeaderPrismicDocument extends PrismicDocument {
  data: HeaderData;
}

const Header = () => {
  const languageContext = useContext(LanguageContext);
  const loadingContext = useContext(LoadingContext);

  if (!languageContext || !loadingContext) {
    throw new Error('Contexts must be used within their respective Providers');
  }

  const { language } = languageContext;
  const { setLoading } = loadingContext;

  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const [document, { state }] = useSinglePrismicDocument<HeaderPrismicDocument>(
    'header',
    { lang: language },
  );

  useEffect(() => {
    setLoading(state === 'loading');
  }, [state, setLoading]);

  useEffect(() => {
    console.log('servicesOpen изменился:', servicesOpen);
  }, [servicesOpen]);

  const toggleServices = (event: React.MouseEvent) => {
    event.preventDefault();
    setServicesOpen((prevState) => !prevState);
  };

  const closeService = () => {
    setServicesOpen(false);
  };
  const subNavRef = useOutsideClick(closeService);

  if (!document || !document.data) {
    return null;
  }

  const headerData: HeaderData = document.data;

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  // Функция для рендеринга пункта меню
  const renderMenuItem = (item: MenuItem, index: number) => {
    const itemName = item.name.trim().toLowerCase();

    if (itemName === 'о нас' || itemName === 'about us') {
      return (
        <li key={index} className="header__nav-item">
          <a href="#whoAreWe" className="header__nav-link">
            {item.name}
          </a>
        </li>
      );
    }

    if (itemName === 'наши услуги' || itemName === 'our services') {
      return (
        <li key={index} className="header__nav-item">
          <span ref={subNavRef}>
            <button className="header__nav-link" onClick={toggleServices}>
              {item.name}
            </button>
          </span>
        </li>
      );
    }

    return (
      <li key={index} className="header__nav-item">
        <MyLink className="header__nav-link" to={item.link.url}>
          {item.name}
        </MyLink>
      </li>
    );
  };

  return (
    <header id="headerScroll" className="header">
      <div className="header__container">
        <MyLink className="header__logo" to={headerData.logolink.url}>
          <img src={headerData.logo.url} alt="Logo" />
        </MyLink>
        <div className="header__inner">
          <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
            <ul className="header__nav-list">
              {headerData.menu_items && headerData.menu_items.length > 0
                ? headerData.menu_items.map(renderMenuItem)
                : null}
              {headerData.buttonlink && headerData.buttonname && (
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#whoAreWe">
                    {headerData.buttonname}
                  </a>
                </li>
              )}
            </ul>
          </nav>
          <div className="header__actions">
            <LanguageSwitcher />
            <button className="header__menu" onClick={toggleMenu}>
              {menuOpen ? (
                <IoClose className="header__menu-icon" />
              ) : (
                <IoMenu className="header__menu-icon" />
              )}
            </button>
          </div>
        </div>
      </div>
      <nav className={`header__sub-nav ${servicesOpen ? 'open' : ''}`}>
        <div className="header__container">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <a className="header__nav-link" href="#">
                Architecture & Construction
              </a>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="#">
                Architecture & Construction
              </a>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="#">
                Architecture & Construction
              </a>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="#">
                Architecture & Construction
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
