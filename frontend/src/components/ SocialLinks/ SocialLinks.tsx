import React, { useEffect, useState } from 'react';
import { useSinglePrismicDocument } from '@prismicio/react';
import { PrismicDocument } from '@prismicio/client';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import './SocialLinks.css';

interface SocialLink {
  link: { url: string };
  icon: { url: string };
}

interface SocialData {
  sociallist: SocialLink[];
}

interface SocialPrismicDocument extends PrismicDocument {
  data: SocialData;
}

interface SocialLinksProps {
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className = '' }) => {
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

  if (!socialData || !socialData.sociallist) {
    return null;
  }

  return (
    <ul className={`social-links ${className}`.trim()}>
      {socialData.sociallist.map((social, index) => {
        const { link, icon } = social;
        if (link.url) {
          return (
            <li key={index}>
              <a
                className="social-link"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundImage: `url(${icon.url})` }}
              />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export default SocialLinks;
