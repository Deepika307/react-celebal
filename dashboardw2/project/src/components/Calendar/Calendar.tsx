import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, MoreHorizontal } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  addDays,
  isWithinInterval,
} from "date-fns";
import { useTheme } from "../../contexts/ThemeContext";
import { CalendarEvent } from "../../types";

interface CalendarProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onAddEvent?: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  events,
  onEventClick,
  onAddEvent,
}) => {
  const { theme } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        isSameDay(event.start, date) ||
        (event.end &&
          isWithinInterval(date, {
            start: event.start,
            end: addDays(event.end, 1),
          }))
    );
  };

  const handleAddEvent = (date: Date) => {
    if (onAddEvent) {
      onAddEvent(date);
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
      style={{ backgroundColor: theme.surface }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold" style={{ color: theme.text }}>
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-4 h-4" style={{ color: theme.text }} />
            </button>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronRight className="w-4 h-4" style={{ color: theme.text }} />
            </button>
          </div>
        </div>
        <button
          onClick={() => handleAddEvent(new Date())}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: theme.primary }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium"
              style={{ color: theme.textSecondary }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const dayEvents = getEventsForDate(day);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <div
                key={day.toISOString()}
                className={`p-2 min-h-[80px] border border-gray-100 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  !isCurrentMonth ? "opacity-40" : ""
                }`}
                onClick={() => handleAddEvent(day)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-medium ${
                      isToday ? "text-white" : ""
                    }`}
                    style={{
                      color: isToday ? "white" : theme.text,
                      backgroundColor: isToday ? theme.primary : "transparent",
                      borderRadius: isToday ? "50%" : "0",
                      width: isToday ? "20px" : "auto",
                      height: isToday ? "20px" : "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {format(day, "d")}
                  </span>
                </div>
                <div className="space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="px-2 py-1 rounded text-xs font-medium text-white cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: event.color }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
