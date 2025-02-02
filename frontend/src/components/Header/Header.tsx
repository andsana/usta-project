import { useContext, useEffect, useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import { useSinglePrismicDocument } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { LanguageContext } from '../../app/contexts/LanguageContext.tsx';
import { LoadingContext } from '../../app/contexts/LoadingContext.tsx';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.tsx';
import MyLink from '../MyLink/MyLink.tsx';
import './Header.css';

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
  const [document, { state }] = useSinglePrismicDocument<HeaderPrismicDocument>('header', { lang: language });

  useEffect(() => {
    setLoading(state === 'loading');
  }, [state, setLoading]);

  if (!document || !document.data) {
    return null;
  }

  const headerData: HeaderData = document.data;

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  console.log('Меню из Prismic:', headerData.menu_items);

  return (
    <header className="header">
      <div className="header__container">
        <MyLink to={headerData.logolink.url}>
          <img src={headerData.logo.url} alt="Logo" />
        </MyLink>
        <div className="header__inner">
          <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
            <ul className="header__nav-list">
              {headerData.menu_items && headerData.menu_items.length > 0 ? (
                headerData.menu_items.map((item: MenuItem, index: number) => (
                  <li key={index} className="header__nav-item">
                    {item.name.trim().toLowerCase() === 'о нас' || item.name.trim().toLowerCase() === 'about us' ? (
                      <a href="#whoAreWe" className="header__nav-link">
                        {item.name}
                      </a>
                    ) : (
                      <MyLink className="header__nav-link" to={item.link.url}>
                        {item.name}
                      </MyLink>
                    )}
                  </li>
                ))
              ) : null}
              {headerData.buttonlink && headerData.buttonname && (
                <a
                  className="header__nav-link"
                  href="#whoAreWe"
                >
                  {headerData.buttonname}
                </a>
              )}
            </ul>
          </nav>

          <div className="header__actions">
            <LanguageSwitcher />
            <button className="header__menu" onClick={toggleMenu}>
              {menuOpen ? <IoClose className="header__menu-icon" /> : <IoMenu className="header__menu-icon" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
