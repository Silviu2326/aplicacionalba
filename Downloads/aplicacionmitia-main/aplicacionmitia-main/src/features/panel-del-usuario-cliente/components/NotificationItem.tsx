
import React from 'react';

export interface Notification {
  id: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}

interface NotificationItemProps {
  notification: Notification;
  onNotificationClick: (notification: Notification) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onNotificationClick }) => {
  const { message, read, createdAt } = notification;

  const handleItemClick = () => {
    onNotificationClick(notification);
  };

  return (
    <div
      onClick={handleItemClick}
      className={`p-4 border-b border-borderLight cursor-pointer transition-colors duration-200 ${
        read ? 'bg-card' : 'bg-surface hover:bg-backgroundSecondary'
      }`}
    >
      <div className="flex items-start">
        <div className={`w-3 h-3 rounded-full mt-1.5 ${read ? 'bg-transparent' : 'bg-primary'}`}></div>
        <div className="ml-3 flex-1">
          <p className={`text-sm ${read ? 'text-textMuted' : 'text-text'}`}>{message}</p>
          <p className="text-xs text-textMuted mt-1">{new Date(createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
