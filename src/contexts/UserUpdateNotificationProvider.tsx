import { TNotificationUpdate } from "@/types/NotificationUpdate";
import { createContext, useContext, useState } from "react";

type TUserNotificationContext = {
  notifications: TNotificationUpdate[] | null;
  setNotifications: (notifications: TNotificationUpdate[] | null) => void;
};

const UserUpdateNotificationContext = createContext<TUserNotificationContext | null>(null);

export const useUserUpdateNotification = () => {
  const context = useContext(UserUpdateNotificationContext);

  if (!context) {
    throw new Error("Context must be used within the provider");
  }

  return context;
};

export default function UserUpdateNotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<TNotificationUpdate[] | null>(null);
  return (
    <UserUpdateNotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </UserUpdateNotificationContext.Provider>
  );
}
