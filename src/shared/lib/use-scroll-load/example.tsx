import { useState, useCallback } from 'react';
import { useScrollLoad } from './index';
import './example.scss';

export const ScrollLoadExample: React.FC = () => {
  const [count, setCount] = useState(10);

  const append = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCount((prev) => prev + 5);
        console.log('!callback:');
        resolve(null);
      }, 1000);
    });
  }, [setCount]);

  const { targetRef } = useScrollLoad<HTMLUListElement>({
    callback: append,
    enabled: count < 50,
    // scroller: 'parent',
  });

  return (<>
    <div id="a" />

    <div id="b">
      <ul ref={targetRef}>
        {Array.from({ length: count }).map((_, index) => {
          return <li key={index} />
        })}
      </ul>
    </div>
  </>);
};
