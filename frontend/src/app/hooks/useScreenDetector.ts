import { useEffect, useState } from 'react';

export const useScreenDetector = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isSmallDesktop = width >= 1024;
  // const isDesktop = width >= 1280; // Десктопы

  return { isMobile, isTablet, isSmallDesktop };
};
