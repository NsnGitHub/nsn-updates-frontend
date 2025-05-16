import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import extractInitials from "@/util/extractInitials";
import { useNavigate } from "react-router-dom";

type UserProfileHeader = {
  username: string;
  displayName: string;
};

export default function UserProfileHeader({ username, displayName }: UserProfileHeader) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row h-12 w-full items-center">
      <Avatar className="h-12 w-12 avatarBg">
        <AvatarFallback className="bg-transparent">{extractInitials(displayName)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col ml-4 h-12">
        <h4 className="text-lg flex flex-row justify-center items-center overflow-hidden whitespace-nowrap">
          {displayName}
        </h4>
        <span
          className="text-sm text-gray-400 hover:cursor-pointer hover:underline"
          onClick={() => navigate(`/user/${username}`)}
        >
          @{username}
        </span>
      </div>
    </div>
  );
}
