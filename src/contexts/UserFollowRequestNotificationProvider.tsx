import { TNotificationFollowRequest } from "@/types/NotificationFollowRequest";
import { createContext, useContext, useState } from "react";

type TUserNotificationContext = {
  notifications: TNotificationFollowRequest[] | null;
  setNotifications: (notifications: TNotificationFollowRequest[] | null) => void;
};

const UserFollowRequestNotificationContext = createContext<TUserNotificationContext | null>(null);

export const useUserFollowRequestNotification = () => {
  const context = useContext(UserFollowRequestNotificationContext);

  if (!context) {
    throw new Error("Context must be used within the provider");
  }

  return context;
};

export default function UserFollowRequestNotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<TNotificationFollowRequest[] | null>(null);
  return (
    <UserFollowRequestNotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </UserFollowRequestNotificationContext.Provider>
  );
}
