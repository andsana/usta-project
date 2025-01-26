import React, { useEffect, useRef, useState } from 'react';
import useInViewPort from './useInViewPort';

const easeOutExpo = (t: number) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

const useScrollTriggeredCountUp = (
  ref: React.RefObject<HTMLElement>,
  end: number,
  duration = 2000,
) => {
  const [count, setCount] = useState(0);
  const isCounting = useRef(false);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  const inViewport = useInViewPort(ref, { threshold: 0.7 });

  useEffect(() => {
    if (inViewport && !isCounting.current) {
      isCounting.current = true;
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = easeOutExpo(frame / totalFrames);
        setCount(Math.round(end * progress));

        if (frame === totalFrames) {
          clearInterval(counter);
          isCounting.current = false;
        }
      }, frameRate);
    } else if (!inViewport) {
      isCounting.current = false;
      setCount(0);
    }
  }, [inViewport, end, frameRate, totalFrames]);

  return count;
};

export default useScrollTriggeredCountUp;
