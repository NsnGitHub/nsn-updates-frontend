import { BASE_API } from "@/constants/baseAPI";
import { TUserProfile } from "@/types/UserProfile";
import fetchWithTokenRefresh from "@/util/fetchWithTokenRefresh";
import { createContext, useContext, useEffect, useState } from "react";

type TUserContext = {
  user: TUserProfile | null;
  setUser: (user: TUserProfile | null) => void;
};

const UserContext = createContext<TUserContext | null>(null);

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Context must be used within the provider");
  }

  return context;
}

const pingAPI = `${BASE_API}/auth/ping`;

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TUserProfile | null>(null);

  useEffect(() => {
    const ping = async () => {
      try {
        const res = await fetchWithTokenRefresh(pingAPI, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data) {
          setUser(data);
        }
      } catch (e: unknown) {
        console.log(e);
      }
    };

    ping();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
