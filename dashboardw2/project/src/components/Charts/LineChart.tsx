import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { ChartData } from '../../types';

interface LineChartProps {
  data: ChartData[];
  title?: string;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ data, title, height = 300 }) => {
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
        <RechartsLineChart data={data}>
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
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={theme.primary}
            strokeWidth={3}
            dot={{ fill: theme.primary, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: theme.primary, strokeWidth: 2 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};