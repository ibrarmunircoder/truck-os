/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLocalStorage = (initialValue: any, key: string) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    const localValue = JSON.parse(localStorage.getItem(key));
    if (localValue) return localValue;
    if (initialValue instanceof Function) return initialValue();

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
