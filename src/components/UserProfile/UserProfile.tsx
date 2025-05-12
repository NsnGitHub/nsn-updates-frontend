import { useEffect, useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import { getJoinMonthYearFromDateTimeString } from "@/util/convertDateTimeString";
import { Button } from "../ui/button";
import Update from "../Update";
import { TUpdatePost } from "@/types/UpdatePost";
import { TUserProfile } from "@/types/UserProfile";
import { useParams } from "react-router-dom";
import { BASE_API } from "@/constants/baseAPI";
import { TFollowStatus } from "@/types/FollowStatus";

export default function UserProfile() {
  const { username } = useParams();
  const [expandedBio, setExpandedBio] = useState<boolean>(false);
  const [user, setUser] = useState<TUserProfile | null>(null);
  const [followStatus, setFollowStatus] = useState<TFollowStatus | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userAPI = `${BASE_API}/user/${username}`;

      try {
        const res = await fetch(userAPI, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setUser(data);
        return res;
      } catch (e: unknown) {
        console.log(e);
      }
    };

    const fetchFollowStatus = async () => {
      const followRequestAPI = `${BASE_API}/follow/request/status/${username}`;

      try {
        const res = await fetch(followRequestAPI, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setFollowStatus(data?.status);
        return res;
      } catch (e: unknown) {
        console.log(e);
      }
    };

    fetchUserProfile();
    fetchFollowStatus();
  }, []);

  return (
    <div className="mt-24 flex flex-col gap-4 justify-center items-center">
      {user === null ? (
        <p>This user does not exist.</p>
      ) : (
        <div className="flex justify-center items-center w-[80ch] place-self-center border rounded-lg px-12 py-8">
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-row items-center">
              <UserProfileHeader username={user.username} displayName={user.displayName} />
              {followStatus === "FOLLOW_FALSE" ? (
                <Button className="ml-auto bg-blue-500 px-4 py-2">Follow</Button>
              ) : followStatus === "FOLLOW_TRUE" ? (
                <Button className="ml-auto bg-red-500 px-4 py-2">Unfollow</Button>
              ) : (
                <Button disabled className="ml-auto bg-blue-500 px-4 py-2">
                  Requested
                </Button>
              )}
            </div>

            {user.privacySetting == "PRIVATE" ? (
              <div>PRIVATE ACCOUNT</div>
            ) : (
              <>
                {user.bio != null && user.bio.length > 250 ? (
                  <p>
                    {`${!expandedBio ? `${user?.bio.slice(0, 250)}...` : user.bio}`}
                    <p
                      className="text-blue-500 mt-4 hover:cursor-pointer"
                      onClick={() => setExpandedBio((prev) => !prev)}
                    >
                      {!expandedBio ? "View More" : "View Less"}
                    </p>
                  </p>
                ) : (
                  <p></p>
                )}
                <div className="flex flex-row gap-4">
                  <span>{user.numberFollowing} Following</span>
                  <span>{user.numberOfFollowers} Followers</span>
                  <span className="ml-auto">{`Joined ${getJoinMonthYearFromDateTimeString(user.createdAt)}`}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {user?.privacySetting === "FOLLOWER" ? (
        <p>Follow {user.displayName} to see their posts!</p>
      ) : user?.privacySetting === "PUBLIC" ? (
        <>Posts go here</>
      ) : (
        <></>
      )}
    </div>
  );
}
