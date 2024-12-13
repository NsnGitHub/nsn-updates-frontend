import Navbar from "./Navbar";
import UpdateCreate from "./UpdateCreate";

import UpdateFeed from "./UpdateFeed";
import UserProfile from "./UserProfile";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-20">
        <UpdateCreate />
      </div>
      {/* <div className="flex flex-col mt-24">
        <UserProfile />
        <div className="flex flex-col w-full justify-center items-center mt-24 gap-8">
          <UpdateFeed />
        </div>
      </div> */}
    </>
  );
}
