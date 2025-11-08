import { useCallback, useEffect, useState, useRef } from 'react';
import { calcDimensions, parseThreshold } from './helpers';

function throttle(fn, wait) {
  let lastCall = 0;
  return function () {
    if (Date.now() - lastCall > wait) {
      lastCall = Date.now()
      fn()
    }
  }
}

export function useScrollLoad<T extends HTMLElement = HTMLDivElement>({
  callback,
  enabled,
  threshold = 100,
  scroller,
}: {
  callback: (...args: any) => Promise<any> | void
  enabled: boolean
  threshold?: number | string,
  scroller?: 'parent',
}) {
  const targetRef = useRef<T>(null);

  const [isCallbackRunning, setCallbackRunning] = useState(false);

  const preventConcurrentCalls = useCallback((callback: (...args: any) => Promise<any> | void) => {
    setCallbackRunning(true);
    Promise
      .resolve(callback?.())
      .then(() => {
        setCallbackRunning(false);
      });
  }, []);

  useEffect(() => {
    const target = targetRef.current;

    if (!target || !enabled || isCallbackRunning) return;

    const parent = scroller ? target.parentElement : null;

    const { rootHeight, height, top } = calcDimensions(target, scroller);

    const marginTop = Math.ceil(height - rootHeight);

    const current = Math.ceil(top * -1) + parseThreshold(threshold);

    console.log({
      rootHeight, height, top, // marginTop, current,
    });

    if (current > marginTop) {
      console.warn('|below');
      return preventConcurrentCalls(callback);
    }

    const scrollTarget = parent ?? window;

    let scroll = parent?.scrollTop ?? window.scrollY;

    const onScroll = throttle(() => {
      scroll = parent?.scrollTop ?? window.scrollY;
    }, 250);

    scrollTarget.addEventListener('scroll', onScroll);

    const observer = new IntersectionObserver(([entry]) => {
      const current = parent?.scrollTop ?? window.scrollY;

      if (entry.isIntersecting && scroll < current) {
        preventConcurrentCalls(callback);
      }
    }, {
      rootMargin: `${marginTop}px 0% ${parseThreshold(threshold)}px`,
      threshold: 1,
      root: parent,
    });

    observer.observe(target);
    console.warn('mount', observer.rootMargin);

    return () => {
      observer?.disconnect();
      scrollTarget.removeEventListener('scroll', onScroll);
    };
  }, [callback, isCallbackRunning, enabled, threshold, scroller]);

  return { targetRef, isCallbackRunning };
}
