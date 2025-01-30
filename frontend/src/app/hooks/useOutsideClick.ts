import { useEffect, useRef, useCallback } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
) => {
  const ref = useRef<T>(null);
  const stableCallback = useCallback(callback, [callback]);

  useEffect(() => {
    let lastEventType: 'mouse' | 'touch' | null = null;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (event.type === 'touchend') lastEventType = 'touch';
      if (event.type === 'mouseup' && lastEventType === 'touch') return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        stableCallback();
      }

      lastEventType = null;
    };

    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [stableCallback]);

  return ref;
};