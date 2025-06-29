export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: User;
  dueDate?: Date;
  createdAt: Date;
  tags: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  type: 'meeting' | 'task' | 'reminder' | 'event';
  color: string;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
  category?: string;
}

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface DashboardStats {
  totalUsers: number;
  activeProjects: number;
  revenue: number;
  growth: number;
}