import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, User, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { useTheme } from '../../contexts/ThemeContext';
import { Task } from '../../types';

interface KanbanCardProps {
  task: Task;
  onClick?: () => void;
  isDragging?: boolean;
}

const priorityColors = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
};

export const KanbanCard: React.FC<KanbanCardProps> = ({ task, onClick, isDragging }) => {
  const { theme } = useTheme();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragging = isDragging || isSortableDragging;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
        dragging ? 'opacity-50 rotate-5' : ''
      }`}
      style={{
        backgroundColor: theme.surface,
        borderColor: `${theme.textSecondary}20`,
        ...style
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 
          className="font-medium text-sm"
          style={{ color: theme.text }}
        >
          {task.title}
        </h4>
        <div className="flex items-center space-x-1">
          <Flag 
            className="w-3 h-3" 
            style={{ color: priorityColors[task.priority] }}
          />
        </div>
      </div>
      
      <p 
        className="text-xs mb-3 line-clamp-2"
        style={{ color: theme.textSecondary }}
      >
        {task.description}
      </p>
      
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          {task.dueDate && (
            <div 
              className="flex items-center space-x-1"
              style={{ color: theme.textSecondary }}
            >
              <Calendar className="w-3 h-3" />
              <span>{format(task.dueDate, 'MMM d')}</span>
            </div>
          )}
          {task.assignee && (
            <div 
              className="flex items-center space-x-1"
              style={{ color: theme.textSecondary }}
            >
              <User className="w-3 h-3" />
              <span>{task.assignee.name.split(' ')[0]}</span>
            </div>
          )}
        </div>
      </div>
      
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {task.tags.slice(0, 2).map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 text-xs rounded-full"
              style={{ 
                backgroundColor: `${theme.primary}20`,
                color: theme.primary
              }}
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 2 && (
            <span 
              className="px-2 py-1 text-xs rounded-full"
              style={{ 
                backgroundColor: `${theme.textSecondary}20`,
                color: theme.textSecondary
              }}
            >
              +{task.tags.length - 2}
            </span>
          )}
        </div>
      )}
    </div>
  );
};