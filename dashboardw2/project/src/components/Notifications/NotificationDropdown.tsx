import React from "react";

export const NotificationDropdown = ({
  notifications,
}: {
  notifications: string[];
}) => (
  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50">
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {notifications.length === 0 ? (
        <li className="p-4 text-sm text-gray-500 dark:text-gray-300">
          No new notifications
        </li>
      ) : (
        notifications.map((note, index) => (
          <li
            key={index}
            className="p-4 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {note}
          </li>
        ))
      )}
    </ul>
  </div>
);
