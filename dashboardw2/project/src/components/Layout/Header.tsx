import React, { useState, useEffect } from "react";
import { Bell, Search, Sun, Moon, Palette } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export const Header: React.FC = () => {
  const { theme, mode, setMode, themes, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New message received", read: false },
    { id: 2, message: "System update available", read: false },
    { id: 3, message: "Your profile has been viewed", read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  // Handle notification click
  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Update unread count whenever notifications change
  useEffect(() => {
    const count = notifications.filter((n) => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  return (
    <header
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4"
      style={{ backgroundColor: theme.surface }}
    >
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: theme.textSecondary }}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                style={{
                  backgroundColor: theme.background,
                  borderColor: `${theme.textSecondary}40`,
                  color: theme.text,
                }}
              />
            </div>
          </form>
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
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Mode
                  </p>
                  <div className="flex space-x-1">
                    {(["light", "dark", "system"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`px-2 py-1 text-xs rounded capitalize ${
                          mode === m
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Theme
                  </p>
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
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {mode === "dark" ? (
              <Sun className="w-5 h-5" style={{ color: theme.text }} />
            ) : (
              <Moon className="w-5 h-5" style={{ color: theme.text }} />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5" style={{ color: theme.text }} />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs font-medium text-white flex items-center justify-center"
                  style={{ backgroundColor: theme.accent }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div
                className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                style={{ backgroundColor: theme.surface }}
              >
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-medium" style={{ color: theme.text }}>
                    Notifications
                  </h3>
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          !notification.read
                            ? "bg-blue-50 dark:bg-blue-900/30"
                            : ""
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            !notification.read ? "font-medium" : "font-normal"
                          }`}
                          style={{ color: theme.text }}
                        >
                          {notification.message}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div
                      className="p-4 text-center text-sm"
                      style={{ color: theme.textSecondary }}
                    >
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
                  <button
                    className="text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                    onClick={() => {
                      // In a real app, you would navigate to all notifications
                      alert("View all notifications");
                      setShowNotifications(true);
                    }}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
