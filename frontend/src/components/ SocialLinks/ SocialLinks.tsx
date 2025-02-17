import { useEffect, useState } from 'react';
import { useSinglePrismicDocument } from '@prismicio/react';
import {
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';
import { PrismicDocument } from '@prismicio/client';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import './SocialLinks.css';

interface SocialLink {
  name: string;
  link: { url: string };
}

interface SocialData {
  sociallist: SocialLink[];
}

interface SocialPrismicDocument extends PrismicDocument {
  data: SocialData;
}

const SocialLinks = () => {
  const { language } = useLanguage();
  const [socialData, setSocialData] = useState<SocialData | null>(null);

  const [document] = useSinglePrismicDocument<SocialPrismicDocument>(
    'social_networks',
    { lang: language },
  );

  useEffect(() => {
    if (document) {
      setSocialData(document.data);
    }
  }, [document]);

  console.log('social document', document);

  const getIcon = (name: string) => {
    switch (name) {
      case 'telegram':
        return <FaTelegramPlane />;
      case 'whatsapp':
        return <FaWhatsapp />;
      case 'instagram':
        return <FaInstagram />;
      case 'youtube':
        return <FaYoutube />;
      default:
        return null;
    }
  };

  if (!socialData || !socialData.sociallist) {
    return null; // Возвращаем null, если данных нет
  }

  return (
    <ul className="social-links">
      {socialData.sociallist.map((social) => {
        const { name, link } = social;
        if (link.url) {
          return (
            <li key={name}>
              <a
                className="social-link"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getIcon(name)}
              </a>
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export default SocialLinks;
