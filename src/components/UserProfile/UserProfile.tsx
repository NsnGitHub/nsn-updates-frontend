import { useEffect, useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import { getJoinMonthYearFromDateTimeString } from "@/util/convertDateTimeString";
import { Button } from "../ui/button";
import { TUserProfile } from "@/types/UserProfile";
import { useParams } from "react-router-dom";
import { BASE_API } from "@/constants/baseAPI";
import { TFollowStatus } from "@/types/FollowStatus";
import fetchWithTokenRefresh from "@/util/fetchWithTokenRefresh";
import UpdateFeed from "../UpdateFeed";

export default function UserProfile() {
  const { username } = useParams();
  const [expandedBio, setExpandedBio] = useState<boolean>(false);
  const [targetUser, setTargetUser] = useState<TUserProfile | null>(null);
  const [followStatus, setFollowStatus] = useState<TFollowStatus | null>(null);

  const followAPI = `${BASE_API}/follow`;

  const onFollowButtonClick = async () => {
    if (followStatus === "FOLLOW_PENDING" || targetUser == null) {
      return;
    }

    if (followStatus === "FOLLOW_FALSE") {
      if (targetUser.privacySetting === "FOLLOWER") {
        setFollowStatus("FOLLOW_PENDING");
      } else {
        setFollowStatus("FOLLOW_TRUE");
      }

      try {
        await fetchWithTokenRefresh(`${followAPI}/request`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetUsername: targetUser.username,
          }),
        });
      } catch (e: unknown) {
        // If any errors, reset the state
        setFollowStatus("FOLLOW_FALSE");
      }
    }

    if (followStatus === "FOLLOW_TRUE") {
      setFollowStatus("FOLLOW_FALSE");

      try {
        await fetchWithTokenRefresh(`${followAPI}/delete`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetUsername: targetUser.username,
          }),
        });
      } catch (e: unknown) {
        // If any errors, reset the state
        setFollowStatus("FOLLOW_TRUE");
      }
    }
  };

  useEffect(() => {
    const fetchWithTokenRefreshUserProfile = async () => {
      const userAPI = `${BASE_API}/user/${username}`;

      try {
        const res = await fetchWithTokenRefresh(userAPI, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setTargetUser(data);
        return res;
      } catch (e: unknown) {
        console.log(e);
      }
    };

    const fetchWithTokenRefreshFollowStatus = async () => {
      const followRequestAPI = `${BASE_API}/follow/request/status/${username}`;

      try {
        const res = await fetchWithTokenRefresh(followRequestAPI, {
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

    fetchWithTokenRefreshUserProfile();
    fetchWithTokenRefreshFollowStatus();
  }, [username]);

  return (
    <div className="mt-24 flex flex-col gap-4 justify-center items-center">
      {targetUser === null ? (
        <p>This user does not exist.</p>
      ) : (
        <div className="flex justify-center items-center w-[80ch] border rounded-lg px-8 py-8">
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-row items-center">
              <UserProfileHeader username={targetUser.username} displayName={targetUser.displayName} />
              {followStatus === "FOLLOW_FALSE" ? (
                <Button className="ml-auto bg-blue-500 px-4 py-2" onClick={() => onFollowButtonClick()}>
                  Follow
                </Button>
              ) : followStatus === "FOLLOW_TRUE" ? (
                <Button className="ml-auto bg-red-500 px-4 py-2" onClick={() => onFollowButtonClick()}>
                  Unfollow
                </Button>
              ) : (
                <Button disabled className="ml-auto bg-blue-500 px-4 py-2">
                  Requested
                </Button>
              )}
            </div>

            {targetUser.privacySetting == "PRIVATE" ? (
              <div>PRIVATE ACCOUNT</div>
            ) : (
              <>
                {targetUser.bio != null && targetUser.bio.length > 250 ? (
                  <p>
                    {`${!expandedBio ? `${targetUser?.bio.slice(0, 250)}...` : targetUser.bio}`}
                    <p
                      className="text-blue-500 mt-4 hover:cursor-pointer"
                      onClick={() => setExpandedBio((prev) => !prev)}
                    >
                      {!expandedBio ? "View More" : "View Less"}
                    </p>
                  </p>
                ) : (
                  <></>
                )}
                <div className="flex flex-row gap-4 w-full">
                  <span>{targetUser.numberFollowing} Following</span>
                  <span>{targetUser.numberOfFollowers} Followers</span>
                  <span className="ml-auto">{`Joined ${getJoinMonthYearFromDateTimeString(
                    targetUser.createdAt
                  )}`}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {targetUser !== null && targetUser.privacySetting === "FOLLOWER" && followStatus != "FOLLOW_TRUE" ? (
        <p>Follow {targetUser.displayName} to see their posts!</p>
      ) : (targetUser && targetUser.privacySetting === "PUBLIC") || (targetUser && followStatus === "FOLLOW_TRUE") ? (
        <UpdateFeed username={targetUser.username} />
      ) : (
        <></>
      )}
    </div>
  );
}
