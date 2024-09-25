import Logo from "./Logo";
import { MagnifyingGlassIcon, MoonIcon, Pencil2Icon, PersonIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { BellRingIcon, SunIcon, UserRoundPlusIcon } from "lucide-react";

const iconSize = "w-7 h-7";

export default function Navbar() {
  return (
    <ul className="flex flex-row items-center gap-12 px-12 py-2">
      <li>
        <Logo />
      </li>
      <li>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute w-6 h-6 left-2 top-2 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-10 focus-visible:ring-transparent m-0" />
        </div>
      </li>
      <li className="ml-auto">
        <Pencil2Icon className={`${iconSize}`} />
      </li>
      <li className="relative">
        <div className="absolute right-0 top-0 rounded-full bg-red-500 w-4 h-4 flex items-center justify-center">
          <span className="text-white text-xs">2</span>
        </div>
        <UserRoundPlusIcon className={`${iconSize}`} />
      </li>
      <li className="relative">
        <div className="absolute right-0 top-0 rounded-full bg-red-500 w-4 h-4 flex items-center justify-center">
          <span className="text-white text-xs">5</span>
        </div>
        <BellRingIcon className={`${iconSize}`} />
      </li>
      <li>
        <MoonIcon className={`${iconSize}`} />
        <SunIcon className={`hidden ${iconSize}`} />
      </li>
      <li>
        <PersonIcon className={`${iconSize}`} />
      </li>
    </ul>
  );
}
