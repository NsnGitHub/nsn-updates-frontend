import { HouseIcon, SettingsIcon, TelescopeIcon } from "lucide-react";
import { iconSize } from "@/constants/iconSize";

const listContainer = "flex flex-row gap-2 items-center justify-center border-b px-8 py-4";

export default function Sidebar() {
  return (
    <>
      <ul className="flex flex-col w-64 h-screen mt-20 border-r text-xl fixed top-0 left-0 transition-all duration-300 ease-in-out overflow-hidden">
        <li className={`${listContainer} border-t`}>
          <HouseIcon className={iconSize} />
          <span>Home</span>
        </li>
        <li className={listContainer}>
          <TelescopeIcon className={iconSize} />
          <span>Explore</span>
        </li>
        <li className={listContainer}>
          <SettingsIcon className={iconSize} />
          <span>Settings</span>
        </li>
      </ul>
    </>
  );
}
