import { TNotificationFollowRequest } from "@/types/NotificationFollowRequest";
import { createContext, useContext, useState } from "react";

type TFollowRequestNotificationContext = {
  followRequestNotifications: TNotificationFollowRequest[];
  setFollowRequestNotifications: (notifications: TNotificationFollowRequest[]) => void;
  addLiveFollowRequestNotification: (notifications: TNotificationFollowRequest) => void;
  addPaginatedFollowRequestNotifications: (notifications: TNotificationFollowRequest[]) => void;
};

const UserFollowRequestNotificationContext = createContext<TFollowRequestNotificationContext | null>(null);

export const useUserFollowRequestNotification = () => {
  const context = useContext(UserFollowRequestNotificationContext);

  if (!context) {
    throw new Error("Context must be used within the provider");
  }

  return context;
};

export default function UserFollowRequestNotificationProvider({ children }: { children: React.ReactNode }) {
  const [followRequestNotifications, setFollowRequestNotifications] = useState<TNotificationFollowRequest[]>([]);

  const addLiveFollowRequestNotification = (notification: TNotificationFollowRequest) => {
    setFollowRequestNotifications((prev) => [notification, ...prev]);
  };

  const addPaginatedFollowRequestNotifications = (notifications: TNotificationFollowRequest[]) => {
    setFollowRequestNotifications((prev) => {
      const prevIds = new Set(prev.map((n) => n.id));
      const filtered = notifications.filter((n) => !prevIds.has(n.id));
      return [...prev, ...filtered];
    });
  };

  return (
    <UserFollowRequestNotificationContext.Provider
      value={{
        followRequestNotifications,
        setFollowRequestNotifications,
        addLiveFollowRequestNotification,
        addPaginatedFollowRequestNotifications,
      }}
    >
      {children}
    </UserFollowRequestNotificationContext.Provider>
  );
}
