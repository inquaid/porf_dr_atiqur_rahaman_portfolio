/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, ThemeType } from '../styles/Theme';

type ThemeContextType = {
  theme: ThemeType;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check if user has previously selected a theme
  const storedTheme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    storedTheme ? storedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
