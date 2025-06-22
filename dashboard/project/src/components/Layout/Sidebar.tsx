import React from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  KanbanSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "kanban", label: "Kanban", icon: KanbanSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  collapsed,
  setCollapsed,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col relative`}
      style={{ backgroundColor: theme.surface }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
        style={{ backgroundColor: theme.surface }}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" style={{ color: theme.text }} />
        ) : (
          <ChevronLeft className="w-4 h-4" style={{ color: theme.text }} />
        )}
      </button>

      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: theme.primary }}
          >
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <h1 className="text-xl font-bold" style={{ color: theme.text }}>
              AdminSpace
            </h1>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  style={{
                    backgroundColor: isActive
                      ? `${theme.primary}20`
                      : undefined,
                    color: isActive ? theme.primary : theme.text,
                  }}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: theme.secondary }}
            >
              DK
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium truncate"
                style={{ color: theme.text }}
              >
                Deepika Kantheti
              </p>
              <p
                className="text-xs truncate"
                style={{ color: theme.textSecondary }}
              >
                Administrator
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
