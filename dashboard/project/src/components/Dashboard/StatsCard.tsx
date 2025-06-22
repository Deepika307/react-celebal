import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color,
}) => {
  const { theme } = useTheme();
  const cardColor = color || theme.primary;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
      style={{ backgroundColor: theme.surface }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-sm font-medium"
            style={{ color: theme.textSecondary }}
          >
            {title}
          </p>
          <p className="text-2xl font-bold mt-1" style={{ color: theme.text }}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {change !== undefined && (
            <p
              className={`text-sm mt-1 ${
                change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change >= 0 ? "+" : ""}
              {change}%
            </p>
          )}
        </div>
        <div
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${cardColor}20` }}
        >
          <Icon className="w-6 h-6" style={{ color: cardColor }} />
        </div>
      </div>
    </div>
  );
};
