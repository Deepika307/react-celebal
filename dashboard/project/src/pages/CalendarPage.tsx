import React, { useState } from 'react';
import { Calendar } from '../components/Calendar/Calendar';
import { mockEvents } from '../data/mockData';
import { CalendarEvent } from '../types';
import { useTheme } from '../contexts/ThemeContext';

export const CalendarPage: React.FC = () => {
  const { theme } = useTheme();
  const [events] = useState<CalendarEvent[]>(mockEvents);

  const handleEventClick = (event: CalendarEvent) => {
    alert(`Event: ${event.title}\n${event.description || 'No description'}`);
  };

  const handleAddEvent = (date: Date) => {
    const title = prompt('Enter event title:');
    if (title) {
      // In a real app, you would add the event to your state/database
      alert(`Would add event "${title}" on ${date.toDateString()}`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 
          className="text-2xl font-bold"
          style={{ color: theme.text }}
        >
          Calendar
        </h1>
        <p 
          className="mt-1"
          style={{ color: theme.textSecondary }}
        >
          Manage your events and schedule
        </p>
      </div>

      <Calendar
        events={events}
        onEventClick={handleEventClick}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
};