import { RefObject, useEffect, useState } from 'react';

import { throttle } from 'lodash';

const useScroll = (ref: RefObject<HTMLElement>) => {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const handleScroll = () => {
      setScrollPosition({
        x: element.scrollLeft,
        y: element.scrollTop,
      });
    };
    const throttleScroll = throttle(handleScroll, 500);
    element.addEventListener('scroll', throttleScroll, { passive: true, capture: false });
    return () => {
      element.removeEventListener('scroll', throttleScroll);
    };
  }, []);

  return {
    scrollPosition,
  };
};

export default useScroll;
