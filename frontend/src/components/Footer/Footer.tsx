import { useEffect } from 'react';
import { PrismicDocument } from '@prismicio/client';
import { useSinglePrismicDocument } from '@prismicio/react';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { useLoading } from '../../app/hooks/useLoading.ts';
import SocialLinks from '../ SocialLinks/ SocialLinks.tsx';
import MyLink from '../MyLink/MyLink.tsx';
import './Footer.css';
import MyButton from '../MyButton/MyButton.tsx';

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
  const { language } = useLanguage();
  const { setLoading } = useLoading();

  const [document, { state }] = useSinglePrismicDocument<FooterPrismicDocument>(
    'footer',
    { lang: language },
  );

  useEffect(() => {
    setLoading(state === 'loading');
  }, [state, setLoading]);

  if (!document || !document.data) {
    return null;
  }

  const {
    logo,
    logolink,
    copyright,
    iconstitle,
    mailtitle,
    emailaddress,
    body,
  } = document.data;

  return (
    <footer id="#footer" className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <MyLink className="footer__logo" to={logolink.url}>
            <img src={logo.url} alt="Logo" />
          </MyLink>
          <div className="footer__content-inner">
            {body.map((slice) => (
              <div key={slice.id} className="footer__menu-section">
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
            <div className="footer__contact">
              <div className="footer__contact-social">
                <h6>{iconstitle}</h6>
                <SocialLinks />
              </div>
              <div className="footer__contact-mail">
                <strong>{mailtitle}: </strong>
                <a className="footer-link" href={`mailto:${emailaddress}`}>
                  {emailaddress}
                </a>
              </div>
            </div>
          </div>
        </div>
        <span className="footer__copyright">{copyright}</span>
      </div>
    </footer>
  );
};

export default Footer;
