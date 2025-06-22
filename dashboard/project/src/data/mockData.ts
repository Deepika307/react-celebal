import { User, Task, CalendarEvent, ChartData, DashboardStats } from "../types";
import { addDays, subDays, startOfMonth, endOfMonth } from "date-fns";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Deepika Kantheti",
    email: "deepika@example.com",
    role: "Admin",
    status: "active",
    lastLogin: new Date(),
  },
  {
    id: "2",
    name: "Chaitali Lingam",
    email: "chaitali@example.com",
    role: "Manager",
    status: "active",
    lastLogin: subDays(new Date(), 1),
  },
  {
    id: "3",
    name: "Aarsha Adusumilli",
    email: "aarsha@example.com",
    role: "Developer",
    status: "pending",
    lastLogin: subDays(new Date(), 3),
  },
  {
    id: "4",
    name: "Vaishnovi Paladugu",
    email: "vaishnovi@example.com",
    role: "Designer",
    status: "active",
    lastLogin: subDays(new Date(), 2),
  },
  {
    id: "5",
    name: "Lalitha Amanchi",
    email: "lalitha@example.com",
    role: "Developer",
    status: "inactive",
    lastLogin: subDays(new Date(), 7),
  },
];

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design new dashboard",
    description: "Create wireframes and mockups for the new admin dashboard",
    status: "in-progress",
    priority: "high",
    assignee: mockUsers[3],
    dueDate: addDays(new Date(), 3),
    createdAt: subDays(new Date(), 5),
    tags: ["design", "ui/ux"],
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Add JWT-based authentication with role-based access control",
    status: "todo",
    priority: "high",
    assignee: mockUsers[2],
    dueDate: addDays(new Date(), 7),
    createdAt: subDays(new Date(), 2),
    tags: ["backend", "security"],
  },
  {
    id: "3",
    title: "Fix responsive issues",
    description: "Resolve mobile layout problems on the dashboard",
    status: "review",
    priority: "medium",
    assignee: mockUsers[4],
    dueDate: addDays(new Date(), 1),
    createdAt: subDays(new Date(), 8),
    tags: ["frontend", "responsive"],
  },
  {
    id: "4",
    title: "Database optimization",
    description: "Optimize slow queries and add proper indexing",
    status: "done",
    priority: "medium",
    assignee: mockUsers[2],
    dueDate: subDays(new Date(), 2),
    createdAt: subDays(new Date(), 12),
    tags: ["backend", "performance"],
  },
  {
    id: "5",
    title: "Update documentation",
    description: "Update API documentation with new endpoints",
    status: "todo",
    priority: "low",
    dueDate: addDays(new Date(), 14),
    createdAt: subDays(new Date(), 1),
    tags: ["documentation"],
  },
];

export const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Standup",
    description: "Daily standup meeting",
    start: new Date(),
    end: addDays(new Date(), 0),
    type: "meeting",
    color: "#3B82F6",
  },
  {
    id: "2",
    title: "Project Review",
    description: "Quarterly project review meeting",
    start: addDays(new Date(), 2),
    end: addDays(new Date(), 2),
    type: "meeting",
    color: "#8B5CF6",
  },
  {
    id: "3",
    title: "Client Presentation",
    description: "Present new features to client",
    start: addDays(new Date(), 5),
    end: addDays(new Date(), 5),
    type: "event",
    color: "#F59E0B",
  },
  {
    id: "4",
    title: "Code Review Deadline",
    description: "All PRs must be reviewed",
    start: addDays(new Date(), 7),
    end: addDays(new Date(), 7),
    type: "task",
    color: "#EF4444",
  },
];

export const salesData: ChartData[] = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

export const userGrowthData: ChartData[] = [
  { name: "Week 1", value: 120 },
  { name: "Week 2", value: 150 },
  { name: "Week 3", value: 180 },
  { name: "Week 4", value: 200 },
];

export const dashboardStats: DashboardStats = {
  totalUsers: mockUsers.length,
  activeProjects: 12,
  revenue: 45200,
  growth: 12.5,
};
