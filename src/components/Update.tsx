import { useState } from "react";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { iconSize } from "@/constants/iconSize";
import { convertDateTimeString } from "@/util/convertDateTimeString";
import UserProfileHeader from "./UserProfileHeader";

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

const likeBaseAPI = "http://localhost:8080/api/v1/like";

const likeUpdate = async (id: number) => {
  try {
    const res = await fetch(`${likeBaseAPI}/${id}`, {
      credentials: "include",
    });

    if (!res.ok) {
      console.log(await res.json());
    }
  } catch (e: unknown) {
    console.log(e);
  }
};

const unlikeUpdate = async (id: number) => {
  try {
    const res = await fetch(`${likeBaseAPI}/delete/${id}`, {
      credentials: "include",
    });

    if (!res.ok) {
      console.log(await res.json());
    }
  } catch (e: unknown) {
    console.log(e);
  }
};

export default function Update({ update }: UpdatePost) {
  const [isHeartHovered, setIsHeartHovered] = useState<boolean>(false);

  return (
    <div className="border py-8 px-8 rounded-md flex flex-col gap-8">
      <UserProfileHeader username={update.postingUser.username} displayName={update.postingUser.displayName} />
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
            <div
              className="hover:cursor-pointer hover:scale-120 active:scale-90"
              onClick={() => {
                update.numberOfLikes -= 1;
                update.userHasLiked = false;
                unlikeUpdate(update.id);
              }}
            >
              {!isHeartHovered ? <HeartFilledIcon className={iconSize} /> : <HeartIcon className={iconSize} />}
            </div>
          ) : (
            <div
              className="hover:cursor-pointer hover:scale-120 active:scale-90"
              onClick={() => {
                update.numberOfLikes += 1;
                update.userHasLiked = true;
                likeUpdate(update.id);
              }}
            >
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
