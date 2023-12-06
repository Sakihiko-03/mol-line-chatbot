import { useState, useEffect } from 'react';

// This hook will set width and height to the style property --inner-height
export const useInnerSize = () => {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const setInnerHeight = () => {
      document.documentElement.style.setProperty(
        '--inner-height',
        `${window.innerHeight}px`
      );
      document.documentElement.style.setProperty(
        '--inner-width',
        `${window.innerWidth}px`
      );
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };

    setInnerHeight();
    window.addEventListener('resize', setInnerHeight);
    setIsReady(true);

    return () => window.removeEventListener('resize', setInnerHeight);
  }, []);

  return {
    height,
    width,
    isReady,
  };
};
