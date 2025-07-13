
import React from 'react';
import { Notification, NotificationItem } from './NotificationItem';

interface NotificationCenterPanelProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onMarkAllAsRead: () => void;
  onClose: () => void;
}

export const NotificationCenterPanel: React.FC<NotificationCenterPanelProps> = ({
  notifications,
  onNotificationClick,
  onMarkAllAsRead,
  onClose,
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="absolute top-16 right-0 w-80 bg-card shadow-lg rounded-lg z-50 border border-border">
      <div className="p-4 flex justify-between items-center border-b border-borderLight">
        <h3 className="font-bold text-text">Notificaciones ({unreadCount})</h3>
        <button
          onClick={onMarkAllAsRead}
          className="text-sm text-primary hover:text-primaryHover disabled:text-muted"
          disabled={unreadCount === 0}
        >
          Marcar todas como leídas
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-center text-textMuted p-6">No tienes notificaciones.</p>
        ) : (
          notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onNotificationClick={onNotificationClick}
            />
          ))
        )}
      </div>
      <div className="p-2 text-center border-t border-borderLight">
        <button onClick={onClose} className="text-sm text-textMuted hover:text-text">
          Cerrar
        </button>
      </div>
    </div>
  );
};
