import React from 'react';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { LineChart } from '../components/Charts/LineChart';
import { BarChart } from '../components/Charts/BarChart';
import { dashboardStats, salesData, userGrowthData } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

export const Dashboard: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 
          className="text-2xl font-bold"
          style={{ color: theme.text }}
        >
          Dashboard Overview
        </h1>
        <p 
          className="mt-1"
          style={{ color: theme.textSecondary }}
        >
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={dashboardStats.totalUsers}
          change={12.5}
          icon={Users}
          color={theme.primary}
        />
        <StatsCard
          title="Active Projects"
          value={dashboardStats.activeProjects}
          change={8.2}
          icon={Activity}
          color={theme.secondary}
        />
        <StatsCard
          title="Revenue"
          value={`$${dashboardStats.revenue.toLocaleString()}`}
          change={15.3}
          icon={DollarSign}
          color={theme.accent}
        />
        <StatsCard
          title="Growth"
          value={`${dashboardStats.growth}%`}
          change={dashboardStats.growth}
          icon={TrendingUp}
          color="#10B981"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart 
          data={salesData} 
          title="Sales Trend" 
          height={300}
        />
        <BarChart 
          data={userGrowthData} 
          title="User Growth" 
          height={300}
        />
      </div>

      {/* Recent Activity */}
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: theme.surface }}
      >
        <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.text }}
        >
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { action: 'New user registered', time: '2 minutes ago', color: theme.primary },
            { action: 'Project "AdminPro" updated', time: '1 hour ago', color: theme.secondary },
            { action: 'Database backup completed', time: '3 hours ago', color: theme.accent },
            { action: 'New task assigned to John Doe', time: '5 hours ago', color: '#10B981' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activity.color }}
              />
              <div className="flex-1">
                <p 
                  className="text-sm"
                  style={{ color: theme.text }}
                >
                  {activity.action}
                </p>
                <p 
                  className="text-xs"
                  style={{ color: theme.textSecondary }}
                >
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};