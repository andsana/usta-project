import { useContext, useEffect, useState } from 'react';
import { IoChatbubblesOutline, IoClose, IoMenu } from 'react-icons/io5';
import { useSinglePrismicDocument } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { LanguageContext } from '../../app/contexts/LanguageContext.tsx';
import { LoadingContext } from '../../app/contexts/LoadingContext.tsx';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.tsx';
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

  return (
    <header className="header">
      <div className="header__container">
        {/* Логотип с правильной ссылкой */}
        <a className="header__logo" href={headerData.logolink.url}>
          <img src={headerData.logo.url} alt="Logo" />
        </a>
        <div className="header__inner">
          <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
            <ul className="header__nav-list">
              {/* Элементы меню */}
              {headerData.menu_items && headerData.menu_items.length > 0 ? (
                headerData.menu_items.map((item: MenuItem, index: number) => (
                  <li key={index} className="header__nav-item">
                    <a className="header__nav-link" href={item.link.url}>
                      {item.name}
                    </a>
                  </li>
                ))
              ) : null} {/* Если меню пустое, ничего не рендерим */}
            </ul>
            {/* Проверка на существование ссылки и текста кнопки */}
            {headerData.buttonlink && headerData.buttonname && (
              <a
                className="header__message"
                href={headerData.buttonlink.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Проверка наличия иконки */}
                {headerData.buttonicon && (
                  <img
                    src={headerData.buttonicon.url}
                    alt=""
                    className="header__button-icon"
                  />
                )}
                <IoChatbubblesOutline className="header__message-icon" />
                {headerData.buttonname}
              </a>
            )}
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
