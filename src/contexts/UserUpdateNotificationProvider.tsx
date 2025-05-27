import { TNotificationUpdate } from "@/types/NotificationUpdate";
import { createContext, useContext, useState } from "react";

type TUpdateNotificationContext = {
  updateNotifications: TNotificationUpdate[];
  setUpdateNotifications: (notifications: TNotificationUpdate[]) => void;
  addLiveUpdateNotifications: (notifications: TNotificationUpdate[]) => void;
  addPaginatedUpdateNotifications: (notifications: TNotificationUpdate[]) => void;
};

const UserUpdateNotificationContext = createContext<TUpdateNotificationContext | null>(null);

export const useUserUpdateNotification = () => {
  const context = useContext(UserUpdateNotificationContext);

  if (!context) {
    throw new Error("Context must be used within the provider");
  }

  return context;
};

export default function UserUpdateNotificationProvider({ children }: { children: React.ReactNode }) {
  const [updateNotifications, setUpdateNotifications] = useState<TNotificationUpdate[]>([]);

  const addLiveUpdateNotifications = (notifications: TNotificationUpdate[]) => {
    setUpdateNotifications((prev) => [...notifications, ...prev]);
  };

  const addPaginatedUpdateNotifications = (notifications: TNotificationUpdate[]) => {
    setUpdateNotifications((prev) => {
      const prevIds = new Set(prev.map((n) => n.id));
      const filtered = notifications.filter((notification) => !prevIds.has(notification.id));
      return [...prev, ...filtered];
    });
  };

  return (
    <UserUpdateNotificationContext.Provider
      value={{
        updateNotifications,
        setUpdateNotifications,
        addLiveUpdateNotifications,
        addPaginatedUpdateNotifications,
      }}
    >
      {children}
    </UserUpdateNotificationContext.Provider>
  );
}
