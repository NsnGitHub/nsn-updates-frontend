import { TUserPrivacySetting } from "@/types/UserPrivacySetting";
import React, { useEffect, useState } from "react";
import UserProfileHeader from "./UserProfile/UserProfileHeader";
import { useUser } from "@/contexts/UserProvider";
import fetchWithTokenRefresh from "@/util/fetchWithTokenRefresh";
import { BASE_API } from "@/constants/baseAPI";
import { getJoinMonthYearFromDateTimeString } from "@/util/convertDateTimeString";
import UpdateFeed from "./UpdateFeed";

export default function ProfileAndSettings() {
  const [selected, setSelected] = useState<TUserPrivacySetting>();
  const [expandedBio, setExpandedBio] = useState<boolean>(false);
  const { user, setUser } = useUser();

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const prevValue = selected;
    const value = event.target.value as TUserPrivacySetting;
    setSelected(value);

    try {
      await fetchWithTokenRefresh(`${BASE_API}/user/privacy`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          privacySetting: `${value}`,
        }),
      });
    } catch (e: unknown) {
      setSelected(prevValue);
      console.log(e);
    }
  };

  // Have profile be the most up to date when visited
  useEffect(() => {
    const getUpdatedProfileInfo = async () => {
      if (!user) {
        try {
          const res = await fetchWithTokenRefresh(`${BASE_API}/auth/ping`, {
            method: "GET",
            credentials: "include",
          });

          const data = await res.json();

          setUser(data);
          setSelected(data.privacySetting);
        } catch (e: unknown) {
          console.log(e);
        }
      } else {
        try {
          const res = await fetchWithTokenRefresh(`${BASE_API}/user/${user?.username}`, {
            method: "GET",
            credentials: "include",
          });

          const data = await res.json();

          setUser(data);
        } catch (e: unknown) {
          console.log(e);
        }
      }
    };

    getUpdatedProfileInfo();
  }, []);

  return (
    <div className="mt-24 flex flex-col gap-4 items-center">
      <div className="flex flex-col gap-4 w-[80ch] justify-center items-center border-lg px-8 py-8 border rounded-lg">
        {user && <UserProfileHeader username={user.username} displayName={user.displayName} />}
        <>
          {user != null && user.bio != null && user.bio.length > 250 ? (
            <p>
              {`${!expandedBio ? `${user?.bio.slice(0, 250)}...` : user.bio}`}
              <p className="text-blue-500 mt-4 hover:cursor-pointer" onClick={() => setExpandedBio((prev) => !prev)}>
                {!expandedBio ? "View More" : "View Less"}
              </p>
            </p>
          ) : (
            <p></p>
          )}
          <div className="flex flex-row gap-4 w-full">
            <span>{user?.numberFollowing} Following</span>
            <span>{user?.numberOfFollowers} Followers</span>
            <span className="ml-auto">{user && `Joined ${getJoinMonthYearFromDateTimeString(user.createdAt)}`}</span>
          </div>
        </>
      </div>
      <div className="flex flex-col border px-8 py-8 gap-8 rounded-lg w-[80ch]">
        <div className="text-lg font-semibold text-gray-800">Settings</div>
        <div className="flex flex-row w-full">
          <label htmlFor="privacySetting">Privacy Setting:</label>
          <select
            id="privacySetting"
            value={selected}
            onChange={handleChange}
            className="ml-auto border px-2 py-1 rounded-md"
          >
            <option value="FOLLOWER">Followers Only</option>
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>
      </div>
      <div>{user ? <UpdateFeed username={user.username} /> : <div>Error loading...</div>}</div>
    </div>
  );
}
