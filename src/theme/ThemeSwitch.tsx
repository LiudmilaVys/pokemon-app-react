import { useContext } from 'react';
import ThemeContext from './ThemeContext';

const ThemeSwitch = () => {
  const themeContext = useContext(ThemeContext);
  const { theme, toggleTheme } = themeContext;

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemeSwitch;
