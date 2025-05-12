import { useState } from "react";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { iconSize } from "@/constants/iconSize";
import { convertDateTimeString } from "@/util/convertDateTimeString";
import UserProfileHeader from "./UserProfile/UserProfileHeader";
import { TUpdatePost } from "@/types/UpdatePost";

const likeBaseAPI = "http://localhost:8080/api/v1/like";

const likeUpdate = async (id: number) => {
  try {
    const res = await fetch(`${likeBaseAPI}/${id}`, {
      method: "POST",
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
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      console.log(await res.json());
    }
  } catch (e: unknown) {
    console.log(e);
  }
};

export default function Update({
  id,
  content,
  postingUser,
  numberOfLikes,
  userHasLiked,
  createdAt,
  isEdited,
  editedAt,
}: TUpdatePost) {
  const [isHeartHovered, setIsHeartHovered] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(userHasLiked);
  const [sNumberOfLikes, setNumberOfLikes] = useState<number>(numberOfLikes);

  const toggleLiked = () => {
    setIsLiked((prev) => !prev);
  };

  const incrementLikes = () => {
    setNumberOfLikes((prev) => (prev += 1));
  };

  const decrementLikes = () => {
    setNumberOfLikes((prev) => (prev -= 1));
  };

  return (
    <div className="border py-8 px-8 rounded-md flex flex-col gap-8">
      <UserProfileHeader username={postingUser.username} displayName={postingUser.displayName} />
      <div>
        <p className="w-[80ch] text-xl">{content}</p>
      </div>
      <div className="flex flex-row w-full">
        <div
          className="flex flex-row items-center gap-1"
          onMouseEnter={() => setIsHeartHovered(true)}
          onMouseLeave={() => setIsHeartHovered(false)}
        >
          {isLiked ? (
            <div
              className="hover:cursor-pointer hover:scale-120 active:scale-90"
              onClick={() => {
                decrementLikes();
                toggleLiked();
                unlikeUpdate(id);
              }}
            >
              {!isHeartHovered ? <HeartFilledIcon className={iconSize} /> : <HeartIcon className={iconSize} />}
            </div>
          ) : (
            <div
              className="hover:cursor-pointer hover:scale-120 active:scale-90"
              onClick={() => {
                incrementLikes();
                toggleLiked();
                likeUpdate(id);
              }}
            >
              {!isHeartHovered ? <HeartIcon className={iconSize} /> : <HeartFilledIcon className={iconSize} />}
            </div>
          )}
          <span className="text-md">{sNumberOfLikes}</span>
        </div>
        <div className="p-0 m-0 ml-auto flex justify-center items-center">
          <span className="text-md text-gray-400">{convertDateTimeString(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
