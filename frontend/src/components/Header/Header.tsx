// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useSinglePrismicDocument } from '@prismicio/react';
// import { PrismicDocument } from '@prismicio/client';
// import { useLanguage } from '../../app/hooks/useLanguage.ts';
// import { useOutsideClick } from '../../app/hooks/useOutsideClick.ts';
// import { translations } from '../../app/constants/translations.ts';
// import {
//   createAnimatedFavicon,
//   stopAnimatedFavicon,
// } from '../../app/utils/animatedFavicon.ts';
// import NoContentMessage from '../NoContentMessage/NoContentMessage.tsx';
// import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.tsx';
// import MyLink from '../MyLink/MyLink.tsx';
// import SocialLinks from '../ SocialLinks/ SocialLinks.tsx';
// import MyButton from '../MyButton/MyButton.tsx';
// import './Header.css';
// import { useScreenDetector } from '../../app/hooks/useScreenDetector.ts';
//
// interface MenuItem {
//   name: string;
//   link: { url: string } | null;
//   linkuid: { uid: string } | null;
// }
//
// interface SubMenuItem {
//   name: string;
//   submenuuid: { uid: string };
// }
//
// interface Slice {
//   id: string;
//   slice_type: string;
//   primary: MenuItem;
//   items: SubMenuItem[];
// }
//
// interface HeaderData {
//   logo: { url: string };
//   logolink: { url: string };
//   body: Slice[];
// }
//
// interface HeaderPrismicDocument extends PrismicDocument {
//   data: HeaderData;
// }
//
// const Header = () => {
//   const location = useLocation();
//   const { language } = useLanguage();
//   const { isSmallDesktop } = useScreenDetector();
//
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [subMenuOpen, setSubMenuOpen] = useState(false);
//
//   const [document, { state }] = useSinglePrismicDocument<HeaderPrismicDocument>(
//     'header',
//     { lang: language },
//   );
//
//   useEffect(() => {
//     if (!isSmallDesktop) {
//       setMenuOpen(false);
//       setSubMenuOpen(false);
//     }
//   }, [isSmallDesktop]);
//
//   // Закрыть меню при смене маршрута
//   useEffect(() => {
//     setMenuOpen(false);
//     setSubMenuOpen(false);
//   }, [location]);
//
//   // Блокируем прокрутку, если меню открыто
//   useEffect(() => {
//     window.document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
//     return () => {
//       window.document.body.style.overflow = 'auto';
//     };
//   }, [menuOpen]);
//
//   const toggleSubMenu = () => {
//     setSubMenuOpen((prev) => !prev);
//   };
//
//   const closeSubMenu = () => {
//     setSubMenuOpen(false);
//   };
//
//   const subNavRef = useOutsideClick<HTMLLIElement>(closeSubMenu);
//
//   useEffect(() => {
//     createAnimatedFavicon();
//   }, [location.pathname]);
//
//   useEffect(() => {
//     if (state === 'loading') {
//       createAnimatedFavicon();
//     } else if (state === 'failed') {
//       stopAnimatedFavicon();
//     } else if (document) {
//       stopAnimatedFavicon();
//     }
//   }, [state, document]);
//
//   if (state === 'failed') {
//     return <NoContentMessage message={translations[language].noHeader} />;
//   }
//
//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };
//
//   const renderMenuItem = (slice: Slice) => {
//     const { id, primary } = slice;
//
//     if (slice.items.length > 0) {
//       return (
//         <li key={id} className="header__nav-item" ref={subNavRef}>
//           <button className="header__nav-link items" onClick={toggleSubMenu}>
//             {primary.name}
//             <span className={`icon-sub ${subMenuOpen ? 'open' : ''}`}></span>
//           </button>
//
//           <nav className={`header__nav sub ${subMenuOpen ? 'open' : ''}`}>
//             <ul className={`header__nav-list sub ${subMenuOpen ? 'open' : ''}`}>
//               {slice.items.map((item, index) => (
//                 <li key={index} className="header__nav-item sub">
//                   <MyLink
//                     className="header__nav-link sub"
//                     to={`/services/${item.submenuuid.uid}`}
//                   >
//                     {item.name}
//                   </MyLink>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </li>
//       );
//     }
//
//     return (
//       <li key={id}>
//         {primary.linkuid && primary.linkuid.uid ? (
//           <MyLink className="header__nav-link" to={`/${primary.linkuid.uid}`}>
//             {primary.name}
//           </MyLink>
//         ) : primary.link && primary.link.url ? (
//           <MyButton
//             className="header__nav-link scroll-link"
//             linkName={primary.name}
//             linkUrl={primary.link.url}
//             closeMenu={isSmallDesktop ? toggleMenu : undefined}
//           />
//         ) : null}
//       </li>
//     );
//   };
//
//   return (
//     document && (
//       <header id="headerScroll" className="header">
//         <div className="header__container">
//           <MyLink className="header__logo" to={document.data.logolink.url}>
//             <img src={document.data.logo.url} alt="Logo" />
//           </MyLink>
//
//           <div className="header__inner">
//             <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
//               <ul className="header__nav-list">
//                 {document.data.body.map(renderMenuItem)}
//               </ul>
//               {menuOpen && (
//                 <div className="header__social-links">
//                   <SocialLinks />
//                 </div>
//               )}
//             </nav>
//
//             <div className="header__actions">
//               <LanguageSwitcher />
//               <button className="header__menu" onClick={toggleMenu}>
//                 <span className={`icon ${menuOpen ? 'open' : ''}`}></span>
//               </button>
//             </div>
//           </div>
//         </div>
//
//         <div
//           className={`overlay ${menuOpen ? 'open' : ''}`}
//           onClick={toggleMenu}
//         ></div>
//       </header>
//     )
//   );
// };
//
// export default Header;

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSinglePrismicDocument } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { useOutsideClick } from '../../app/hooks/useOutsideClick.ts';
import { translations } from '../../app/constants/translations.ts';
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
import { useScreenDetector } from '../../app/hooks/useScreenDetector.ts';

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

interface HeaderPrismicDocument extends PrismicDocument {
  data: HeaderData;
}

const Header = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const { isSmallDesktop } = useScreenDetector();
  const [document, { state }] = useSinglePrismicDocument<HeaderPrismicDocument>(
    'header',
    { lang: language },
  );

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
    window.document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => {
      window.document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  useEffect(() => {
    createAnimatedFavicon();
  }, [location.pathname]);

  useEffect(() => {
    if (state === 'loading') createAnimatedFavicon();
    else stopAnimatedFavicon();
  }, [state, document]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleSubMenu = () => setSubMenuOpen((prev) => !prev);

  const renderMenuItem = (slice: Slice) => {
    const { id, primary, items } = slice;

    if (items.length > 0) {
      return (
        <li key={id} className="header__nav-item" ref={subNavRef}>
          <button
            className="header__nav-link-sub-items items"
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
            closeMenu={isSmallDesktop ? toggleMenu : undefined}
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
    document && (
      <header id="headerScroll" className="header">
        <div className="header__container">
          <MyLink className="header__logo" to={document.data.logolink.url}>
            <img src={document.data.logo.url} alt="Logo" />
          </MyLink>

          <div className="header__inner">
            <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
              <ul className="header__nav-list">
                {document.data.body.map(renderMenuItem)}
              </ul>
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
    )
  );
};

export default Header;
