import React from 'react';
import { User, Shield, Bell, Palette, Globe, Database } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Settings: React.FC = () => {
  const { theme, themes, setTheme, mode, setMode } = useTheme();

  const settingSections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Personal Information', description: 'Update your profile details' },
        { label: 'Account Security', description: 'Manage passwords and 2FA' },
        { label: 'Privacy Settings', description: 'Control your data sharing' },
      ],
    },
    {
      title: 'System Preferences',
      icon: Shield,
      items: [
        { label: 'User Permissions', description: 'Manage user roles and access' },
        { label: 'Data Backup', description: 'Configure automatic backups' },
        { label: 'API Settings', description: 'Manage API keys and integrations' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', description: 'Configure email alerts' },
        { label: 'Push Notifications', description: 'Manage browser notifications' },
        { label: 'Slack Integration', description: 'Connect your Slack workspace' },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 
          className="text-2xl font-bold"
          style={{ color: theme.text }}
        >
          Settings
        </h1>
        <p 
          className="mt-1"
          style={{ color: theme.textSecondary }}
        >
          Manage your application preferences
        </p>
      </div>

      {/* Theme Settings */}
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: theme.surface }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${theme.primary}20` }}
          >
            <Palette className="w-5 h-5" style={{ color: theme.primary }} />
          </div>
          <div>
            <h3 
              className="text-lg font-semibold"
              style={{ color: theme.text }}
            >
              Appearance
            </h3>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Customize your theme and display preferences
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: theme.text }}
            >
              Color Mode
            </label>
            <div className="flex space-x-2">
              {(['light', 'dark', 'system'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 text-sm rounded-lg border capitalize transition-colors ${
                    mode === m 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  style={{
                    backgroundColor: mode === m ? `${theme.primary}20` : theme.surface,
                    borderColor: mode === m ? theme.primary : `${theme.textSecondary}40`,
                    color: mode === m ? theme.primary : theme.text
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: theme.text }}
            >
              Color Theme
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTheme(t)}
                  className={`p-3 rounded-lg border transition-all hover:shadow-md ${
                    theme.name === t.name ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{
                    backgroundColor: t.surface,
                    borderColor: theme.name === t.name ? theme.primary : `${theme.textSecondary}40`
                  }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: t.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: t.secondary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: t.accent }}
                    />
                  </div>
                  <p className="text-sm font-medium" style={{ color: t.text }}>
                    {t.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      {settingSections.map((section, index) => {
        const Icon = section.icon;
        return (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            style={{ backgroundColor: theme.surface }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${theme.secondary}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: theme.secondary }} />
              </div>
              <h3 
                className="text-lg font-semibold"
                style={{ color: theme.text }}
              >
                {section.title}
              </h3>
            </div>
            <div className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  style={{ backgroundColor: `${theme.textSecondary}05` }}
                >
                  <div>
                    <p 
                      className="font-medium"
                      style={{ color: theme.text }}
                    >
                      {item.label}
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: theme.textSecondary }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <button 
                    className="px-3 py-1 text-sm rounded-lg hover:opacity-80 transition-opacity"
                    style={{ 
                      backgroundColor: theme.primary,
                      color: 'white'
                    }}
                  >
                    Configure
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};