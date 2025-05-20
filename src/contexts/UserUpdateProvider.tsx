import { TUpdatePost } from "@/types/UpdatePost";
import { createContext, useContext, useState } from "react";

type TUserUpdateContext = {
  updates: TUpdatePost[] | null;
  setUpdates: (updates: TUpdatePost[] | null) => void;
};

const UserUpdateContext = createContext<TUserUpdateContext | null>(null);

export const useUserUpdateNotification = () => {
  const context = useContext(UserUpdateContext);

  if (!context) {
    throw new Error("Context must be used within the provider");
  }

  return context;
};

export default function UserUpdateProvider({ children }: { children: React.ReactNode }) {
  const [updates, setUpdates] = useState<TUpdatePost[] | null>(null);
  return <UserUpdateContext.Provider value={{ updates, setUpdates }}>{children}</UserUpdateContext.Provider>;
}
