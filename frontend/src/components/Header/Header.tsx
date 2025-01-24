import { useContext, useState } from 'react';
import { IoChatbubblesOutline, IoClose, IoMenu } from 'react-icons/io5';
import { useSinglePrismicDocument } from '@prismicio/react';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.tsx';
import { LanguageContext } from '../../app/contexts/LanguageContext.tsx';
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

const Header = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('LanguageContext must be used within a LanguageProvider');
  }

  const { language } = context;

  const [menuOpen, setMenuOpen] = useState(false);

  const [document] = useSinglePrismicDocument('header', { lang: language });

  const headerData = document?.data as HeaderData | undefined;

  if (!headerData) {
    return <div>Loading header...</div>;
  }

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
                headerData.menu_items.map((item: MenuItem, index) => (
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
