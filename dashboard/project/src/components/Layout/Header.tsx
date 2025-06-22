import React from 'react';
import { Bell, Search, Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { theme, mode, setMode, themes, setTheme } = useTheme();

  return (
    <header 
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4"
      style={{ backgroundColor: theme.surface }}
    >
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: theme.textSecondary }}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
              style={{ 
                backgroundColor: theme.background,
                borderColor: `${theme.textSecondary}40`,
                color: theme.text
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Selector */}
          <div className="relative group">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Palette className="w-5 h-5" style={{ color: theme.text }} />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="p-2">
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Mode</p>
                  <div className="flex space-x-1">
                    {(['light', 'dark', 'system'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`px-2 py-1 text-xs rounded capitalize ${
                          mode === m 
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Theme</p>
                  <div className="space-y-1">
                    {themes.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => setTheme(t)}
                        className="w-full flex items-center space-x-2 px-2 py-1 text-xs rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: t.primary }}
                        />
                        <span>{t.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mode Toggle */}
          <button
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {mode === 'dark' ? (
              <Sun className="w-5 h-5" style={{ color: theme.text }} />
            ) : (
              <Moon className="w-5 h-5" style={{ color: theme.text }} />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Bell className="w-5 h-5" style={{ color: theme.text }} />
            <span 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs font-medium text-white flex items-center justify-center"
              style={{ backgroundColor: theme.accent }}
            >
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};