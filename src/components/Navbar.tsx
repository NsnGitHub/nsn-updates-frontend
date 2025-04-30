import Logo from "./Logo";
import { MoonIcon, Pencil2Icon, PersonIcon } from "@radix-ui/react-icons";
import { BellRingIcon, SunIcon, UserRoundPlusIcon } from "lucide-react";
import { iconSize } from "@/constants/iconSize";
import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { toggleDarkMode } from "@/lib/toggleDarkMode";
import NavbarSearch from "./Navbar/NavbarSearch";
import IconDropdown from "./Navbar/IconDropdown";

type NavbarProps = {
  setCreatingUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const wsAPI = "http://localhost:8080/api/v1/ws";
const notificationAPI = "http://localhost:8080/api/v1/notification";

const refreshUserWs = async () => {
  try {
    const res = await fetch(wsAPI, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorRes = await res.json();
      throw new Error(errorRes.message);
    }

    const data = await res.json();
    const token = data.userWs;
    localStorage.setItem("userWs", token);

    return token;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }

    throw new Error("Unknown error has occurred");
  }
};

export default function Navbar({ setCreatingUpdate }: NavbarProps) {
  const stompClientRef = useRef<Client | null>(null);
  const [friendRequestCount, setFriendRequestCount] = useState<number>(0);
  const [notificationCount, setNotificaitonCount] = useState<number>(0);

  useEffect(() => {
    const getInitialUnreadNotificationCount = async () => {
      try {
        const res = await fetch(`${notificationAPI}/unread/count`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorRes = await res.json();
          throw new Error(errorRes.message);
        }

        const data = await res.json();

        setFriendRequestCount(data.unreadFollowCount || 0);
        setNotificaitonCount(data.unreadUpdateCount || 0);

        return;
      } catch (e: unknown) {
        if (e instanceof Error) {
          throw e;
        }

        throw new Error("Unknown error has occurred");
      }
    };

    const onFriendRequestMessageReceived = async (message: any) => {
      const msg = JSON.parse(message.body);
      console.log(msg);

      setFriendRequestCount((prevCount) => prevCount + 1);
    };

    const onNotificationMessageReceived = async (message: any) => {
      const msg = JSON.parse(message.body);
      console.log(msg);

      setNotificaitonCount((prevCount) => prevCount + 1);
    };

    const reconnectStomp = async () => {
      const token = localStorage.getItem("userWs") || "";

      const stompClient = new Client({
        connectHeaders: {
          userWs: token,
        },
        brokerURL: "ws://localhost:8080/ws",
        debug: function (str: string) {
          console.log("STOMP: " + str);
        },
        onConnect: () => {
          console.log("STOMP: Connected, now subscribing...");
          stompClient?.subscribe("/user/queue/notification/batch", onNotificationMessageReceived);
          stompClient?.subscribe("/user/queue/notification/follow", onFriendRequestMessageReceived);
        },
        onStompError: async () => {
          console.warn("STOMP ERROR - attempting to reconnect");
          try {
            const newToken = await refreshUserWs();
            stompClient.connectHeaders = {
              userWs: newToken,
            };
            stompClient.activate();
          } catch (e: any) {
            console.log("Failed to refresh WS token.");
          }
        },
        onWebSocketError: async () => {
          console.warn("STOMP WS ERROR - attempting to reconnect");
          try {
            const newToken = await refreshUserWs();
            stompClient.connectHeaders = {
              userWs: newToken,
            };
            stompClient.activate();
          } catch (e: any) {
            console.log("Failed to refresh WS token.");
          }
        },
        reconnectDelay: 10000,
      });

      stompClientRef.current = stompClient;
      stompClient.activate();
    };

    getInitialUnreadNotificationCount();

    console.log("Initializing STOMP client");
    reconnectStomp();

    return () => {
      stompClientRef.current?.deactivate();
    };
  }, []);

  return (
    <ul className="flex flex-row items-center gap-12 px-12 py-2 fixed top-0 left-0 w-full h-20 bg-background">
      <li>
        <Logo />
      </li>
      <NavbarSearch />
      <li className="ml-auto hover:cursor-pointer" onClick={() => setCreatingUpdate(true)}>
        <Pencil2Icon className={iconSize} />
      </li>
      <li className="relative">
        <IconDropdown alertCount={friendRequestCount} data={[]} type="friendRequest">
          <UserRoundPlusIcon className={iconSize} />
        </IconDropdown>
      </li>
      <li className="relative">
        <IconDropdown alertCount={notificationCount} data={[]} type="notification">
          <BellRingIcon className={iconSize} />
        </IconDropdown>
      </li>
      <li data-hs-theme-switch="" onClick={toggleDarkMode} className="hover:cursor-pointer">
        <MoonIcon className={iconSize} />
        <SunIcon className={`hidden ${iconSize}`} />
      </li>
      <li>
        <IconDropdown alertCount={0} data={null} type="profile">
          <PersonIcon className={iconSize} />
        </IconDropdown>
      </li>
    </ul>
  );
}
