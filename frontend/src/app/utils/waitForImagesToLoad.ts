// app/utils/waitForImagesToLoad.ts

import { stopAnimatedFavicon } from './animatedFavicon.ts';

export const waitForImagesToLoad = () => {
  const images = Array.from(document.querySelectorAll('img'));

  if (images.length === 0) {
    stopAnimatedFavicon();
    return;
  }

  const imagePromises = images.map(
    (img) =>
      new Promise((resolve) => {
        if (img.complete) {
          resolve(null);
        } else {
          img.onload = img.onerror = () => resolve(null);
        }
      }),
  );

  Promise.all(imagePromises).then(() => stopAnimatedFavicon());
};
