import { useState, useEffect } from "react";

const params: TMediaParams = {
  mobile: matchMedia('(max-width: 767px)'),
  tablet: matchMedia('(min-width: 768px) and (max-width: 1279px)'),
  desktop: matchMedia('(min-width: 1280px)'),
};

type TMediaParams = {
  [index: string]: MediaQueryList,
};

type TMediaResult = {
  [index: keyof typeof params]: boolean,
};

const useMedia = (): TMediaResult => {
  const [obj, setObj] = useState<TMediaResult>(getResult());

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent): void => {
      if (event.matches) setObj(getResult());
    };

    for (const name in params) {
      params[name].addEventListener('change', onChange);
    }
  }, []);

  return obj;
};

const getResult = (): TMediaResult => {
  const res = {};

  for (const key in params) {
    res[key] = params[key].matches;
  }

  return res;
};

export default useMedia;
