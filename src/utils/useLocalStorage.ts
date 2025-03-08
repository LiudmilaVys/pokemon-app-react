'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useLocalStorage = (
  key: string,
  initialValue: string
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    const storedValue = localStorage.getItem(key);
    return storedValue || initialValue || '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
