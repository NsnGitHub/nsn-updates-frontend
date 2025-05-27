import { TUpdatePost } from "@/types/UpdatePost";
import { createContext, useContext, useState } from "react";

type TUserUpdateContext = {
  userUpdates: TUpdatePost[];
  setUserUpdates: (updates: TUpdatePost[]) => void;
  addNewUserUpdate: (update: TUpdatePost) => void;
  addPaginatedUserUpdates: (updates: TUpdatePost[]) => void;
  deleteUserUpdate: (updateId: number) => void;
  updateUserUpdate: (update: TUpdatePost) => void;
};

const UserUpdateContext = createContext<TUserUpdateContext | null>(null);

export const useUserUpdate = () => {
  const context = useContext(UserUpdateContext);

  if (!context) {
    throw new Error("Context must be used within the provider");
  }

  return context;
};

export default function UserUpdateProvider({ children }: { children: React.ReactNode }) {
  const [userUpdates, setUserUpdates] = useState<TUpdatePost[]>([]);

  const addNewUserUpdate = (update: TUpdatePost) => {
    setUserUpdates((prev) => [update, ...prev]);
  };

  const addPaginatedUserUpdates = (updates: TUpdatePost[]) => {
    setUserUpdates((prev) => {
      const prevIds = new Set(prev.map((u) => u.id));
      const filtered = updates.filter((u) => !prevIds.has(u.id));
      return [...prev, ...filtered];
    });
  };

  const deleteUserUpdate = (updateId: number) => {
    const deletedPostId = updateId;
    setUserUpdates((prev) => prev.filter((u) => u.id! !== deletedPostId));
  };

  const updateUserUpdate = (update: TUpdatePost) => {
    const updatedPostId = update.id;
    setUserUpdates((prev) => prev.map((u) => (u.id === updatedPostId ? update : u)));
  };

  return (
    <UserUpdateContext.Provider
      value={{
        userUpdates,
        setUserUpdates,
        addNewUserUpdate,
        addPaginatedUserUpdates,
        deleteUserUpdate,
        updateUserUpdate,
      }}
    >
      {children}
    </UserUpdateContext.Provider>
  );
}
