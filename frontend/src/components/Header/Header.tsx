import { useContext, useEffect, useState } from 'react';
import { useSinglePrismicDocument } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { LanguageContext } from '../../app/contexts/LanguageContext.tsx';
import { LoadingContext } from '../../app/contexts/LoadingContext.tsx';
import { useOutsideClick } from '../../app/hooks/useOutsideClick.ts';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.tsx';
import MyLink from '../MyLink/MyLink.tsx';
import './Header.css';
import { useLocation } from 'react-router-dom';
import SocialLinks from '../ SocialLinks/ SocialLinks.tsx';

interface MenuItem {
  name: string;
  link: { url: string };
}

interface SubMenuItem {
  name: string;
  submenuuid: { uid: string };
}

interface Slice {
  id: string;
  slice_type: string;
  primary: MenuItem;
  items: SubMenuItem[];
}

interface HeaderData {
  logo: { url: string };
  logolink: { url: string };
  buttonname?: string;
  buttonlink?: { url: string };
  buttonicon?: { url: string };
  // socialuid: { uid: string };
  body: Slice[];
}

interface HeaderPrismicDocument extends PrismicDocument {
  data: HeaderData;
}

const Header = () => {
  const languageContext = useContext(LanguageContext);
  const loadingContext = useContext(LoadingContext);
  const location = useLocation();

  if (!languageContext || !loadingContext) {
    throw new Error('Contexts must be used within their respective Providers');
  }

  const { language } = languageContext;
  const { setLoading } = loadingContext;

  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const [document, { state }] = useSinglePrismicDocument<HeaderPrismicDocument>(
    'header',
    { lang: language },
  );

  console.log('header document', document);

  useEffect(() => {
    setLoading(state === 'loading');
  }, [state, setLoading]);

  useEffect(() => {
    setSubMenuOpen(false);
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.document.body) {
      if (menuOpen) {
        window.document.body.style.overflow = 'hidden';
      } else {
        window.document.body.style.overflow = 'auto';
      }
    }

    return () => {
      if (typeof window !== 'undefined' && window.document.body) {
        window.document.body.style.overflow = 'auto';
      }
    };
  }, [menuOpen]);

  const toggleSubMenu = () => {
    setSubMenuOpen((prevState) => !prevState);
  };

  const closeSubMenu = () => {
    setSubMenuOpen(false);
  };

  const subNavRef = useOutsideClick<HTMLLIElement>(closeSubMenu);

  if (!document || !document.data) {
    return null;
  }

  const headerData: HeaderData = document.data;

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const renderMenuItem = (slice: Slice) => {
    const { id, primary } = slice;
    const itemName = primary.name.trim().toLowerCase();

    if (itemName === 'о нас' || itemName === 'about us') {
      return (
        <li key={id} className="header__nav-item">
          <a href="#whoAreWe" className="header__nav-link" onClick={toggleMenu}>
            {primary.name}
          </a>
        </li>
      );
    }

    if (slice.items.length > 0) {
      return (
        <li key={id} className="header__nav-item" ref={subNavRef}>
          <button className="header__nav-link items" onClick={toggleSubMenu}>
            {primary.name}
            <span className={`icon-sub ${subMenuOpen ? 'open' : ''}`}></span>
          </button>

          <nav className={`header__nav sub ${subMenuOpen ? 'open' : ''}`}>
            <ul className={`header__nav-list sub ${subMenuOpen ? 'open' : ''}`}>
              {headerData.body
                .filter((slice) => slice.items.length > 0)
                .map((slice) =>
                  slice.items.map((item, index) => (
                    <li key={index} className="header__nav-item sub">
                      <MyLink
                        className="header__nav-link sub"
                        to={`/services/${item.submenuuid.uid}`}
                      >
                        {item.name}
                      </MyLink>
                    </li>
                  )),
                )}
            </ul>
          </nav>
        </li>
      );
    }

    return (
      <li key={id} className="header__nav-item">
        <MyLink className="header__nav-link" to={primary.link?.url || '#'}>
          {primary.name}
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
              {headerData.body.map(renderMenuItem)}
              {headerData.buttonlink && headerData.buttonname && (
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#whoAreWe">
                    {headerData.buttonname}
                  </a>
                </li>
              )}
            </ul>
            {menuOpen && <SocialLinks />}
          </nav>
          <div className="header__actions">
            <LanguageSwitcher />
            <button className="header__menu" onClick={toggleMenu}>
              <span className={`icon ${menuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`overlay ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      ></div>
    </header>
  );
};

export default Header;
