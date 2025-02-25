import { useEffect, useState } from "react";

export const useScreenDetector = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 961;
  const isSmallDesktop = width >= 961 && width < 1025;
  const isDesktop = width >= 1025;

  return { isMobile, isTablet, isSmallDesktop, isDesktop };
};