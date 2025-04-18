import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrismicDocument } from '@prismicio/client';
import { useSinglePrismicDocument } from '@prismicio/react';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import {
  createAnimatedFavicon,
  stopAnimatedFavicon,
} from '../../app/utils/animatedFavicon.ts';
import Logo from '../Logo/Logo.tsx';
import MyLink from '../MyLink/MyLink.tsx';
import MyButton from '../MyButton/MyButton.tsx';
import SocialLinks from '../ SocialLinks/ SocialLinks.tsx';
import './Footer.css';

interface Item {
  linkname: string;
  linkuid: { uid: string } | null;
  link: { url: string } | null;
}

interface Slice {
  id: string;
  primary: {
    title: string;
  };
  items: Item[];
}

interface FooterData {
  logo: { url: string };
  logolink: { url: string };
  copyright: string;
  iconstitle: string;
  mailtitle: string;
  emailaddress: string;
  body: Slice[];
}

interface FooterPrismicDocument extends PrismicDocument {
  data: FooterData;
}

const Footer = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const errorPageUrl = `/${language === 'en-us' ? 'en/' : ''}404`;

  const [document, { state }] = useSinglePrismicDocument<FooterPrismicDocument>(
    'footer',
    { lang: language },
  );

  useEffect(() => {
    if (state === 'loading') createAnimatedFavicon();
    else stopAnimatedFavicon();
  }, [state, document]);

  useEffect(() => {
    if (state === 'loading' || state === 'idle') return;

    if (!document || state === 'failed') {
      navigate(errorPageUrl);
    }
  }, [state, document, navigate, errorPageUrl]);

  if (state === 'loading') {
    return null;
  }

  if (!document) {
    return null;
  }

  return (
    <footer id="#footer" className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__column">
            <Logo
              url={document.data.logolink.url}
              ustaClass="footer__logo-usta"
              internationalClass="footer__logo-international"
            />
          </div>

          {document.data.body.map((slice) => (
            <div key={slice.id} className="footer__column footer__menu-section">
              <h6>{slice.primary.title}</h6>
              <ul>
                {slice.items.map((item) => (
                  <li key={item.linkname}>
                    {item.linkuid && item.linkuid.uid ? (
                      <MyLink
                        className="footer-link"
                        to={
                          item.linkuid.uid === 'projects'
                            ? `/${item.linkuid.uid}`
                            : `/services/${item.linkuid.uid}`
                        }
                      >
                        {item.linkname}
                      </MyLink>
                    ) : item.link && item.link.url ? (
                      <MyButton
                        className={'footer-link'}
                        linkName={item.linkname}
                        linkUrl={item.link.url}
                      />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer__column footer__contact">
            <h6>{document.data.iconstitle}</h6>
            <div className="footer__social-links">
              <SocialLinks />
            </div>
            <div className="footer__contact-mail">
              <span>{document.data.mailtitle}: </span>
              <a
                className="footer-link"
                href={`mailto:${document.data.emailaddress}`}
              >
                {document.data.emailaddress}
              </a>
            </div>
          </div>
        </div>
        <span className="footer__copyright">{document.data.copyright}</span>
      </div>
    </footer>
  );
};

export default Footer;
