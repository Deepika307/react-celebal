import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { ChartData } from '../../types';

interface BarChartProps {
  data: ChartData[];
  title?: string;
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({ data, title, height = 300 }) => {
  const { theme } = useTheme();

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
      style={{ backgroundColor: theme.surface }}
    >
      {title && (
        <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.text }}
        >
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={`${theme.textSecondary}30`} />
          <XAxis 
            dataKey="name" 
            stroke={theme.textSecondary}
            fontSize={12}
          />
          <YAxis 
            stroke={theme.textSecondary}
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: theme.surface,
              border: `1px solid ${theme.textSecondary}40`,
              borderRadius: '8px',
              color: theme.text
            }}
          />
          <Bar 
            dataKey="value" 
            fill={theme.primary}
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};