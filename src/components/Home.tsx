import { useState } from "react";
import Navbar from "./Navbar";
import UpdateCreate from "./UpdateCreate";

import UpdateFeed from "./UpdateFeed";
import UserProfile from "./UserProfile";

export default function Home() {
  const [isCreatingUpdate, setCreatingUpdate] = useState<boolean>(false);

  return (
    <>
      <Navbar setCreatingUpdate={setCreatingUpdate} />
      <div className="mt-20">{isCreatingUpdate ? <UpdateCreate setCreatingUpdate={setCreatingUpdate} /> : <></>}</div>
      <div className="flex flex-col mt-24">
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />

        <div className="flex flex-col w-full justify-center items-center mt-24 gap-8">
          <UpdateFeed />
        </div>
      </div>
    </>
  );
}
