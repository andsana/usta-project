import { useEffect, useState } from 'react';
import { useSinglePrismicDocument } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { useLoading } from '../../app/hooks/useLoading.ts';
import { useOutsideClick } from '../../app/hooks/useOutsideClick.ts';
import MyLink from '../MyLink/MyLink.tsx';
import SocialLinks from '../ SocialLinks/ SocialLinks.tsx';
import MyButton from '../MyButton/MyButton.tsx';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.tsx';
import './Header.css';

interface MenuItem {
  name: string;
  link: { url?: string };
  uid: { uid?: string };
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
  body: Slice[];
}

interface HeaderPrismicDocument extends PrismicDocument {
  data: HeaderData;
}

const Header = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const { setLoading } = useLoading();

  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const [document, { state }] = useSinglePrismicDocument<HeaderPrismicDocument>(
    'header',
    { lang: language },
  );

  useEffect(() => {
    setLoading(state === 'loading');
  }, [state, setLoading]);

  // Закрыть меню при смене маршрута
  useEffect(() => {
    setMenuOpen(false);
    setSubMenuOpen(false);
  }, [location]);

  // Блокируем прокрутку, если меню открыто
  useEffect(() => {
    window.document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => {
      window.document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const toggleSubMenu = () => {
    setSubMenuOpen((prev) => !prev);
  };

  const closeSubMenu = () => {
    setSubMenuOpen(false);
  };

  const subNavRef = useOutsideClick<HTMLLIElement>(closeSubMenu);

  if (!document || !document.data) return null;

  const { logo, logolink, body } = document.data;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const renderMenuItem = (slice: Slice) => {
    const { id, primary } = slice;

    if (slice.items.length > 0) {
      return (
        <li key={id} className="header__nav-item" ref={subNavRef}>
          <button className="header__nav-link items" onClick={toggleSubMenu}>
            {primary.name}
            <span className={`icon-sub ${subMenuOpen ? 'open' : ''}`}></span>
          </button>

          <nav className={`header__nav sub ${subMenuOpen ? 'open' : ''}`}>
            <ul className={`header__nav-list sub ${subMenuOpen ? 'open' : ''}`}>
              {slice.items.map((item, index) => (
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
      <li key={id}>
        {primary.uid.uid ? (
          <MyLink className="header__nav-link" to={primary.uid.uid}>
            {primary.name}
          </MyLink>
        ) : (
          <MyButton
            className="header__nav-link"
            linkName={primary.name}
            linkUrl={primary.link.url}
          />
        )}
      </li>
    );
  };

  return (
    <header id="headerScroll" className="header">
      <div className="header__container">
        <MyLink className="header__logo" to={logolink.url}>
          <img src={logo.url} alt="Logo" />
        </MyLink>

        <div className="header__inner">
          <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
            <ul className="header__nav-list">{body.map(renderMenuItem)}</ul>
            {menuOpen && (
              <div className="header__social-links">
                <SocialLinks />
              </div>
            )}
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
