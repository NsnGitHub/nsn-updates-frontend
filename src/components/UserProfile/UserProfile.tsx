import { useEffect, useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import { getJoinMonthYearFromDateTimeString } from "@/util/convertDateTimeString";
import { Button } from "../ui/button";
import Update from "../Update";
import { TUpdatePost } from "@/types/UpdatePost";
import { TUserProfile } from "@/types/UserProfile";

export default function UserProfile() {
  const [expandedBio, setExpandedBio] = useState<boolean>(false);
  const [user, setUser] = useState<TUserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const baseAPI = `http://localhost:8080/api/v1/update/user/${sampleUser.username}`;

      try {
        const res = await fetch(baseAPI, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setUserUpdates(data);
        return res;
      } catch (e: unknown) {
        console.log(e);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center w-[80ch] place-self-center border rounded-lg px-12 py-8">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-row items-center">
            <UserProfileHeader username={sampleUser.username} displayName={sampleUser.displayName} />
            <Button className="ml-auto bg-blue-500 px-4 py-2">Follow</Button>
          </div>

          {sampleUser.privacySetting == "PRIVATE" ? (
            <div>PRIVATE ACCOUNT</div>
          ) : (
            <>
              {sampleUser.bio.length > 250 ? (
                <p>
                  {`${!expandedBio ? `${sampleUser.bio.slice(0, 250)}...` : sampleUser.bio}`}
                  <p
                    className="text-blue-500 mt-4 hover:cursor-pointer"
                    onClick={() => setExpandedBio((prev) => !prev)}
                  >
                    {!expandedBio ? "View More" : "View Less"}
                  </p>
                </p>
              ) : (
                <p>{sampleUser.bio}</p>
              )}
              <div className="flex flex-row gap-4">
                <span>{sampleUser.numberFollowing} Following</span>
                <span>{sampleUser.numberOfFollowers} Followers</span>
                <span className="ml-auto">{`Joined ${getJoinMonthYearFromDateTimeString(sampleUser.createdAt)}`}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
