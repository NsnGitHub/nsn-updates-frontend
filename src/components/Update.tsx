import { useEffect, useState } from "react";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { convertDateTimeString } from "@/util/convertDateTimeString";
import UserProfileHeader from "./UserProfile/UserProfileHeader";
import { TUpdatePost } from "@/types/UpdatePost";
import fetchWithTokenRefresh from "@/util/fetchWithTokenRefresh";
import { TUserProfile } from "@/types/UserProfile";
import { Button } from "./ui/button";
import UpdateCreate from "./Navbar/UpdateCreate/UpdateCreate";

const heartIconSize = "w-5 h-5";

const likeBaseAPI = "http://localhost:8080/api/v1/like";

const likeUpdate = async (id: number) => {
  try {
    const res = await fetchWithTokenRefresh(`${likeBaseAPI}/${id}`, {
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
    const res = await fetchWithTokenRefresh(`${likeBaseAPI}/delete/${id}`, {
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
  currentUser,
  onUpdate,
}: TUpdatePost & { currentUser: TUserProfile | null; onUpdate: (update: TUpdatePost) => void }) {
  const [isHeartHovered, setIsHeartHovered] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(userHasLiked);
  const [sNumberOfLikes, setNumberOfLikes] = useState<number>(numberOfLikes);

  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    <>
      <div className="border py-8 px-8 rounded-md flex flex-col gap-8">
        <div className="flex flex-row items-center">
          {postingUser && <UserProfileHeader username={postingUser.username} displayName={postingUser.displayName} />}
          {currentUser?.username === postingUser.username ? (
            <Button
              className="ml-auto bg-gray-200 px-4 py-2 text-black hover:bg-gray-100"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          ) : (
            <></>
          )}
        </div>
        <div>
          <p className="w-[80ch] text-l">{content}</p>
        </div>
        <div className="flex flex-row w-full mt-4">
          <div
            className="flex flex-row items-center gap-1"
            onMouseEnter={() => setIsHeartHovered(true)}
            onMouseLeave={() => setIsHeartHovered(false)}
          >
            {currentUser?.username === postingUser.username ? (
              <HeartFilledIcon className={`text-red-600 ${heartIconSize}`} />
            ) : isLiked ? (
              <div
                className="hover:cursor-pointer hover:scale-120 active:scale-90"
                onClick={() => {
                  decrementLikes();
                  toggleLiked();
                  unlikeUpdate(id);
                }}
              >
                {!isHeartHovered ? (
                  <HeartFilledIcon className={`text-red-600 ${heartIconSize}`} />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
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
                {!isHeartHovered ? (
                  <HeartIcon className={heartIconSize} />
                ) : (
                  <HeartFilledIcon className={`text-red-600 ${heartIconSize}`} />
                )}
              </div>
            )}
            <span className="text-sm">{sNumberOfLikes}</span>
          </div>
          <div className="p-0 m-0 ml-auto flex justify-center items-center">
            <span className="text-sm text-gray-400">
              {convertDateTimeString(createdAt) + `${isEdited ? " • edited" : ""}`}
            </span>
          </div>
        </div>
      </div>
      {isEditing && (
        <UpdateCreate setCreatingUpdate={setIsEditing} initialContent={content} id={id} onUpdate={onUpdate} />
      )}
    </>
  );
}
