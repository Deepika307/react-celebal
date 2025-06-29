import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useTheme } from '../../contexts/ThemeContext';
import { Task } from '../../types';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  id, 
  title, 
  color, 
  tasks, 
  onTaskClick 
}) => {
  const { theme } = useTheme();
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef}
      className={`rounded-lg p-4 transition-colors ${
        isOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
      style={{ 
        backgroundColor: isOver ? `${theme.primary}10` : theme.background,
        border: `2px dashed ${isOver ? theme.primary : 'transparent'}`
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h3 
            className="font-medium"
            style={{ color: theme.text }}
          >
            {title}
          </h3>
        </div>
        <span 
          className="text-sm px-2 py-1 rounded-full"
          style={{ 
            backgroundColor: `${color}20`,
            color: color
          }}
        >
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <KanbanCard 
            key={task.id} 
            task={task} 
            onClick={() => onTaskClick?.(task)}
          />
        ))}
      </div>
    </div>
  );
};