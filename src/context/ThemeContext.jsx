import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Default to clean light mode
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('astra_theme');
    return saved ? saved : 'light';
  });

  const [isMinimalView, setIsMinimalView] = useState(() => {
    const saved = localStorage.getItem('astra_minimal_view');
    return saved ? JSON.parse(saved) : true; // Default to minimal view!
  });

  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('astra_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('astra_minimal_view', JSON.stringify(isMinimalView));
  }, [isMinimalView]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleMinimalView = () => {
    setIsMinimalView(prev => !prev);
  };

  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isDark: theme === 'dark',
        isMinimalView,
        toggleMinimalView,
        audioEnabled,
        toggleAudio
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
