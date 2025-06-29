import React from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTheme } from '../../contexts/ThemeContext';
import { Task } from '../../types';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: Task['status']) => void;
  onTaskClick?: (task: Task) => void;
}

const columns: { id: Task['status']; title: string; color: string }[] = [
  { id: 'todo', title: 'To Do', color: '#6B7280' },
  { id: 'in-progress', title: 'In Progress', color: '#3B82F6' },
  { id: 'review', title: 'Review', color: '#F59E0B' },
  { id: 'done', title: 'Done', color: '#10B981' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  tasks, 
  onTaskMove, 
  onTaskClick 
}) => {
  const { theme } = useTheme();
  const [activeTask, setActiveTask] = React.useState<Task | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];
    
    if (columns.find(col => col.id === newStatus)) {
      onTaskMove(taskId, newStatus);
    }
    
    setActiveTask(null);
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      style={{ backgroundColor: theme.surface }}
    >
      <h2 
        className="text-xl font-semibold mb-6"
        style={{ color: theme.text }}
      >
        Project Board
      </h2>
      
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map(column => {
            const columnTasks = tasks.filter(task => task.status === column.id);
            
            return (
              <SortableContext
                key={column.id}
                id={column.id}
                items={columnTasks.map(task => task.id)}
                strategy={verticalListSortingStrategy}
              >
                <KanbanColumn
                  id={column.id}
                  title={column.title}
                  color={column.color}
                  tasks={columnTasks}
                  onTaskClick={onTaskClick}
                />
              </SortableContext>
            );
          })}
        </div>
        
        <DragOverlay>
          {activeTask && (
            <KanbanCard task={activeTask} isDragging />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};