import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSinglePrismicDocument } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { useOutsideClick } from '../../app/hooks/useOutsideClick.ts';
import { translations } from '../../app/constants/translations.ts';
import { useScreenDetector } from '../../app/hooks/useScreenDetector.ts';
import {
  createAnimatedFavicon,
  stopAnimatedFavicon,
} from '../../app/utils/animatedFavicon.ts';
import NoContentMessage from '../NoContentMessage/NoContentMessage.tsx';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.tsx';
import MyLink from '../MyLink/MyLink.tsx';
import SocialLinks from '../ SocialLinks/ SocialLinks.tsx';
import MyButton from '../MyButton/MyButton.tsx';
import './Header.css';

interface MenuItem {
  name: string;
  link: { url: string } | null;
  linkuid: { uid: string } | null;
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
  body: Slice[];
}

interface PrismicHeaderDocument extends PrismicDocument {
  data: HeaderData;
}

const Header = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const { isSmallDesktop } = useScreenDetector();
  const [headerDocument, { state }] =
    useSinglePrismicDocument<PrismicHeaderDocument>('header', {
      lang: language,
    });

  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const subNavRef = useOutsideClick<HTMLLIElement>(() => setSubMenuOpen(false));

  useEffect(() => {
    if (!isSmallDesktop) {
      setMenuOpen(false);
      setSubMenuOpen(false);
    }
  }, [isSmallDesktop]);

  useEffect(() => {
    setMenuOpen(false);
    setSubMenuOpen(false);
  }, [location]);


  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [menuOpen]);


  useEffect(() => {
    createAnimatedFavicon();
  }, [location.pathname]);

  useEffect(() => {
    if (state === 'loading') createAnimatedFavicon();
    else stopAnimatedFavicon();
  }, [state, headerDocument]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);


  const toggleSubMenu = () => setSubMenuOpen((prev) => !prev);

  const renderMenuItem = (slice: Slice) => {
    const { id, primary, items } = slice;

    if (items.length > 0) {
      return (
        <li key={id} className="header__nav-item" ref={subNavRef}>
          <button
            className="header__nav-link-sub-items"
            onClick={toggleSubMenu}
          >
            {primary.name}
            <span className={`icon-sub ${subMenuOpen ? 'open' : ''}`}></span>
          </button>

          <nav className={`header__nav sub ${subMenuOpen ? 'open' : ''}`}>
            <ul className={`header__nav-list sub ${subMenuOpen ? 'open' : ''}`}>
              {items.map((item, index) => (
                <li key={index} className="header__nav-item sub">
                  <MyLink
                    className="header__nav-link sub"
                    to={`/services/${item.submenuuid.uid}`}
                  >
                    {item.name}
                  </MyLink>
                </li>
              ))}
            </ul>
          </nav>
        </li>
      );
    }

    return (
      <li className="header__nav-item" key={id}>
        {primary.linkuid?.uid ? (
          <MyLink className="header__nav-link" to={`/${primary.linkuid.uid}`}>
            {primary.name}
          </MyLink>
        ) : primary.link?.url ? (
          <MyButton
            className="header__nav-link scroll-link"
            linkName={primary.name}
            linkUrl={primary.link.url}
            closeMenu={!isSmallDesktop ? toggleMenu : undefined}
          />
        ) : null}
      </li>
    );
  };

  if (state === 'loading') {
    return null;
  }

  if (state === 'failed') {
    return <NoContentMessage message={translations[language].noHeader} />;
  }

  return (
    headerDocument && (
      <header id="headerScroll" className="header">
        <div className="header__container">
          <MyLink
            className="header__logo"
            to={headerDocument.data.logolink.url}
          >
            <span className="header__logo-usta">usta</span>
            <span className="header__logo-international">international</span>
          </MyLink>

          <div className="header__inner">
            <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
              <ul className="header__nav-list">
                {headerDocument.data.body.map(renderMenuItem)}
              </ul>
              <div className="header__social-links">
                <SocialLinks />
              </div>
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
    )
  );
};

export default Header;
