import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { IoReturnUpBack } from 'react-icons/io5';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { translations } from '../../app/constants/translations.ts';
import MyLink from '../MyLink/MyLink.tsx';
import { stopAnimatedFavicon } from '../../app/utils/animatedFavicon.ts';
import './ErrorPage.css';

const ErrorPage = () => {
  const { language } = useLanguage();

  const currentUrl = `https://ustainternational.com/${language === 'en-us' ? 'en/' : ''}404`;

  // Останавливаем анимацию фавикона при монтировании компонента
  useEffect(() => {
    stopAnimatedFavicon();
  }, []);

  return (
    <>
      <Helmet>
        <title>{translations[language].errorMetaTitle}</title>
        <meta
          name="description"
          content={translations[language].errorPageDescription}
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:url" content={currentUrl} />
        <meta
          property="og:title"
          content={translations[language].errorMetaTitle}
        />
        <meta
          property="og:description"
          content={translations[language].errorPageDescription}
        />
        <link rel="canonical" href={currentUrl} />
        <meta name="language" content={language} />
      </Helmet>

      <div className="error-page container">
        <div className="error__content">
          <div className="error__image-wrapper">
            <img
              src="/assets/images/error-image.png"
              alt={translations[language].error}
              className="error__image"
            />
          </div>
          <h1 className="error__title">404</h1>
          <p className="error__description">
            {translations[language].errorPageDescription}
          </p>
          <MyLink className="error__link" to="/">
            <IoReturnUpBack />
            {translations[language].errorLink}
          </MyLink>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
