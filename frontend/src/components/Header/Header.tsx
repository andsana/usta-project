import { useState } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import { IoClose, IoMenu } from 'react-icons/io5';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.tsx';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  interface MenuItem {
    name: string;
    url: string;
  }

  const menuItems: MenuItem[] = [
    { name: 'О нас', url: '#' },
    { name: 'Проекты', url: '#' },
    { name: 'Контакты', url: '#' },
  ];

  return (
    <header className="header">
      <div className="header__container">
        <a className="header__logo" href="#">
          <img src="/public/logo.svg" alt="Logo" />
        </a>
        <div className="header__inner">
          <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
            <ul className="header__nav-list">
              {menuItems.map((item, index) => (
                <li key={index} className="header__nav-item">
                  <a className="header__nav-link" href={item.url}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <a className="header__message" href="https://t.me/usta_media" target="_blank" rel="noopener noreferrer">
              <FaTelegramPlane className="header__message-icon" />
              Написать нам
            </a>
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

