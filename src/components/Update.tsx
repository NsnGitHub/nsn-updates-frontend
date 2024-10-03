import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { iconSize } from "@/constants/iconSize";
import extractInitials from "@/util/extractInitials";
import convertDateTimeString from "@/util/convertDateTimeString";

type UpdatePost = {
  update: {
    id: number;
    content: string;
    createdAt: string;
    numberOfLikes: number;
    postingUser: {
      username: string;
      displayName: string;
    };
    isEdited: boolean;
    userHasLiked: boolean;
  };
};

export default function Update({ update }: UpdatePost) {
  const [isHeartHovered, setIsHeartHovered] = useState<boolean>(false);

  const initials = extractInitials(update.postingUser.displayName);

  return (
    <div className="border py-8 px-8 rounded-md flex flex-col gap-8">
      <div className="flex flex-row h-12">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ml-4 h-12">
          <h4 className="text-lg">{update.postingUser.displayName}</h4>
          <span className="text-sm text-gray-400">@{update.postingUser.username}</span>
        </div>
      </div>
      <div>
        <p className="w-[80ch] text-xl">{update.content}</p>
      </div>
      <div className="flex flex-row w-full">
        <div
          className="flex flex-row items-center gap-1"
          onMouseEnter={() => setIsHeartHovered(true)}
          onMouseLeave={() => setIsHeartHovered(false)}
        >
          {update.userHasLiked ? (
            <div className="hover:cursor-pointer hover:scale-120 active:scale-90">
              {!isHeartHovered ? <HeartFilledIcon className={iconSize} /> : <HeartIcon className={iconSize} />}
            </div>
          ) : (
            <div className="hover:cursor-pointer hover:scale-120 active:scale-90">
              {!isHeartHovered ? <HeartIcon className={iconSize} /> : <HeartFilledIcon className={iconSize} />}
            </div>
          )}
          <span className="text-md">{update.numberOfLikes}</span>
        </div>
        <div className="p-0 m-0 ml-auto flex justify-center items-center">
          <span className="text-md text-gray-400">{convertDateTimeString(update.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
