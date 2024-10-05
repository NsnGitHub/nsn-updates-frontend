import Navbar from "./Navbar";

import UpdateFeed from "./UpdateFeed";
import UserProfile from "./UserProfile";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-24">
        <UserProfile />
        <div className="flex flex-col w-full justify-center items-center mt-24 gap-8">
          <UpdateFeed />
        </div>
      </div>
    </div>
  );
}
