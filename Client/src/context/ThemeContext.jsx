import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  /**
   * Priority order:
   * 1. Value stored in localStorage (user's explicit choice)
   * 2. System prefers-color-scheme on first visit
   * 3. Default: 'light'
   */
  const getInitialTheme = () => {
    const stored = localStorage.getItem('crackit-theme');
    if (stored === 'dark' || stored === 'light') return stored;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply data-theme attribute to <html> element on every theme change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('crackit-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/** Convenience hook */
export const useTheme = () => useContext(ThemeContext);
