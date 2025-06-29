import React from 'react';
import { LineChart } from '../components/Charts/LineChart';
import { BarChart } from '../components/Charts/BarChart';
import { salesData, userGrowthData } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

export const Analytics: React.FC = () => {
  const { theme } = useTheme();

  const performanceData = [
    { name: 'Jan', value: 85 },
    { name: 'Feb', value: 90 },
    { name: 'Mar', value: 78 },
    { name: 'Apr', value: 95 },
    { name: 'May', value: 88 },
    { name: 'Jun', value: 92 },
  ];

  const conversionData = [
    { name: 'Desktop', value: 4200 },
    { name: 'Mobile', value: 3100 },
    { name: 'Tablet', value: 1800 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 
          className="text-2xl font-bold"
          style={{ color: theme.text }}
        >
          Analytics Dashboard
        </h1>
        <p 
          className="mt-1"
          style={{ color: theme.textSecondary }}
        >
          Track your performance and key metrics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart 
          data={salesData} 
          title="Revenue Trend" 
          height={350}
        />
        <BarChart 
          data={userGrowthData} 
          title="User Acquisition" 
          height={350}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart 
          data={performanceData} 
          title="Performance Score" 
          height={350}
        />
        <BarChart 
          data={conversionData} 
          title="Traffic by Device" 
          height={350}
        />
      </div>

      {/* Analytics Summary */}
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: theme.surface }}
      >
        <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.text }}
        >
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.primary }}
            >
              23.5%
            </div>
            <p 
              className="text-sm mt-1"
              style={{ color: theme.textSecondary }}
            >
              Conversion Rate
            </p>
          </div>
          <div className="text-center">
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.secondary }}
            >
              1.2K
            </div>
            <p 
              className="text-sm mt-1"
              style={{ color: theme.textSecondary }}
            >
              New Users
            </p>
          </div>
          <div className="text-center">
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.accent }}
            >
              4.8/5
            </div>
            <p 
              className="text-sm mt-1"
              style={{ color: theme.textSecondary }}
            >
              User Satisfaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};