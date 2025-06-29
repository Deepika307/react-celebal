import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeMode } from '../types';

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  themes: Theme[];
  setTheme: (theme: Theme) => void;
}

const lightTheme: Theme = {
  name: 'Light',
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#F59E0B',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#6B7280'
};

const darkTheme: Theme = {
  name: 'Dark',
  primary: '#60A5FA',
  secondary: '#A78BFA',
  accent: '#FBBF24',
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F8FAFC',
  textSecondary: '#CBD5E1'
};

const oceanTheme: Theme = {
  name: 'Ocean',
  primary: '#0891B2',
  secondary: '#0D9488',
  accent: '#F97316',
  background: '#F0F9FF',
  surface: '#FFFFFF',
  text: '#164E63',
  textSecondary: '#0891B2'
};

const forestTheme: Theme = {
  name: 'Forest',
  primary: '#059669',
  secondary: '#7C3AED',
  accent: '#DC2626',
  background: '#F0FDF4',
  surface: '#FFFFFF',
  text: '#064E3B',
  textSecondary: '#047857'
};

const themes = [lightTheme, darkTheme, oceanTheme, forestTheme];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [selectedTheme, setSelectedTheme] = useState<Theme>(lightTheme);

  const theme = mode === 'dark' ? darkTheme : selectedTheme;

  useEffect(() => {
    const root = document.documentElement;
    const isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Set CSS custom properties for dynamic theming
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-surface', theme.surface);
    root.style.setProperty('--color-text', theme.text);
    root.style.setProperty('--color-text-secondary', theme.textSecondary);
  }, [mode, theme]);

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        mode, 
        setMode, 
        themes, 
        setTheme: setSelectedTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};