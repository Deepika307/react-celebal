import React, { useState } from 'react';
import { KanbanBoard } from '../components/Kanban/KanbanBoard';
import { mockTasks } from '../data/mockData';
import { Task } from '../types';
import { useTheme } from '../contexts/ThemeContext';

export const KanbanPage: React.FC = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleTaskMove = (taskId: string, newStatus: Task['status']) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleTaskClick = (task: Task) => {
    alert(`Task: ${task.title}\n${task.description}\nStatus: ${task.status}\nPriority: ${task.priority}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 
          className="text-2xl font-bold"
          style={{ color: theme.text }}
        >
          Kanban Board
        </h1>
        <p 
          className="mt-1"
          style={{ color: theme.textSecondary }}
        >
          Manage your project tasks with drag-and-drop
        </p>
      </div>

      <KanbanBoard
        tasks={tasks}
        onTaskMove={handleTaskMove}
        onTaskClick={handleTaskClick}
      />
    </div>
  );
};