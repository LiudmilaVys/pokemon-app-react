'use client';

import { ReactNode, useEffect, useState } from 'react';
import { THEME_KEY } from '../utils/constants';
import useLocalStorage from '../utils/useLocalStorage';
import ThemeContext from './ThemeContext';

type ThemeProviderProps = { children: ReactNode };

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState('light');
  const [savedTheme, setSavedTheme] = useLocalStorage(THEME_KEY, 'light');
  const toggleTheme = () => {
    setSavedTheme(theme === 'light' ? 'dark' : 'light');
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme !== savedTheme) {
      setTheme(savedTheme);
    }
  }, [savedTheme, theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
