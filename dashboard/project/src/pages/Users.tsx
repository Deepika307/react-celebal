import React from 'react';
import { Badge, Calendar, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { DataTable } from '../components/Tables/DataTable';
import { mockUsers } from '../data/mockData';
import { User } from '../types';
import { useTheme } from '../contexts/ThemeContext';

export const Users: React.FC = () => {
  const { theme } = useTheme();

  const columns = [
    {
      key: 'name' as keyof User,
      label: 'Name',
      sortable: true,
      render: (value: string, user: User) => (
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
            style={{ backgroundColor: theme.primary }}
          >
            {value.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: 'email' as keyof User,
      label: 'Email',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4" style={{ color: theme.textSecondary }} />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: 'role' as keyof User,
      label: 'Role',
      sortable: true,
      render: (value: string) => (
        <span 
          className="px-2 py-1 text-xs font-medium rounded-full"
          style={{ 
            backgroundColor: `${theme.secondary}20`,
            color: theme.secondary
          }}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'status' as keyof User,
      label: 'Status',
      sortable: true,
      render: (value: string) => {
        const colors = {
          active: '#10B981',
          inactive: '#EF4444',
          pending: '#F59E0B',
        };
        return (
          <span 
            className="px-2 py-1 text-xs font-medium rounded-full text-white"
            style={{ backgroundColor: colors[value as keyof typeof colors] }}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      key: 'lastLogin' as keyof User,
      label: 'Last Login',
      sortable: true,
      render: (value: Date | undefined) => (
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" style={{ color: theme.textSecondary }} />
          <span>{value ? format(value, 'MMM d, yyyy') : 'Never'}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 
          className="text-2xl font-bold"
          style={{ color: theme.text }}
        >
          Users Management
        </h1>
        <p 
          className="mt-1"
          style={{ color: theme.textSecondary }}
        >
          Manage and monitor all system users
        </p>
      </div>

      <DataTable
        data={mockUsers}
        columns={columns}
        searchable
        pageSize={10}
      />
    </div>
  );
};