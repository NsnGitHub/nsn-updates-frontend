import Logo from "./Logo";
import { MagnifyingGlassIcon, MoonIcon, Pencil2Icon, PersonIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { BellRingIcon, SunIcon, UserRoundPlusIcon } from "lucide-react";
import { iconSize } from "@/constants/iconSize";
import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { toggleDarkMode } from "@/lib/toggleDarkMode";
import UserProfile from "./UserProfile";
import UserProfileHeader from "./UserProfileHeader";
import Search from "./NavbarSearch";
import NavbarSearch from "./NavbarSearch";

type NavbarProps = {
  setCreatingUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Navbar({ setCreatingUpdate }: NavbarProps) {
  const [stompClient, setStompClient] = useState<Client>();

  useEffect(() => {
    // const onMessageReceived = async (message) => {
    //   const msg = JSON.parse(message.body);
    //   console.log(msg);
    // };
    // console.log("Initializing STOMP client");
    // const stompConfig = {
    //   connectHeaders: {},
    //   brokerURL: "ws://localhost:8080/ws",
    //   debug: function (str: string) {
    //     console.log("STOMP: " + str);
    //   },
    //   onConnect: () => {
    //     console.log("STOMP: Connected, now subscribing...");
    //     stompClient.subscribe("/user/queue/notification/batch", onMessageReceived);
    //   },
    // };
    // const stompClient = new Client(stompConfig);
    // stompClient.activate();
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
        <div className="absolute right-0 top-0 rounded-full bg-red-500 w-4 h-4 flex items-center justify-center">
          <span className="text-white text-xxs">4</span>
        </div>
        <UserRoundPlusIcon className={iconSize} />
      </li>
      <li className="relative">
        <div className="absolute right-0 top-0 rounded-full bg-red-500 w-4 h-4 flex items-center justify-center">
          <span className="text-white text-xxs">24</span>
        </div>
        <BellRingIcon className={iconSize} />
      </li>
      <li data-hs-theme-switch="" onClick={toggleDarkMode} className="hover:cursor-pointer">
        <MoonIcon className={iconSize} />
        <SunIcon className={`hidden ${iconSize}`} />
      </li>
      <li>
        <PersonIcon className={iconSize} />
      </li>
    </ul>
  );
}
