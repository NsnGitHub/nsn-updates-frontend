import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import extractInitials from "@/util/extractInitials";

type UserProfileHeader = {
  username: string;
  displayName: string;
};

export default function UserProfileHeader({ username, displayName }: UserProfileHeader) {
  return (
    <div className="flex flex-row h-12 w-full">
      <Avatar className="h-12 w-12 -z-10">
        <AvatarFallback>{extractInitials(displayName)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col ml-4 h-12">
        <h4 className="text-lg flex flex-row justify-center items-center overflow-hidden whitespace-nowrap">
          {displayName}
        </h4>
        <span className="text-sm text-gray-400">@{username}</span>
      </div>
    </div>
  );
}
