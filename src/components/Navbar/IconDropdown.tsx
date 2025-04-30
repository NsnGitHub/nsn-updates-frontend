import { UpdatePost } from "@/types/UpdatePost";
import UpdatePreview from "../UpdatePreview";
import UserFriendRequest from "../UserFriendRequest";
import { UserProfile } from "@/types/UserProfile";
import UserProfileHeader from "../UserProfileHeader";

const sampleUpdate = {
  id: 1,
  content:
    "Embrace the little moments! 🌟 Whether it's a cozy coffee break, a quiet walk, or a good book, life’s beauty is found in the simple things. Let's make today count and spread positivity wherever we go. #Gratitude #SimpleJoys #StayPositive",
  createdAt: "",
  numberOfLikes: 0,
  postingUser: {
    username: "TestAccount",
    displayName: "Test Account",
  },
  isEdited: false,
  userHasLiked: false,
};

type IconTypes = "notification" | "friendRequest" | "profile";

type DropdownTypes = UpdatePost[] | UserProfile[] | [] | null;

type IconDropdownProps = {
  children: React.ReactNode;
  data: DropdownTypes;
  alertCount: number;
  type: IconTypes;
};

const createFriendRequestElement = (userProfile: UserProfile) => {
  return (
    <ul>
      <li>Friend Request Placeholder</li>
    </ul>
  );
};

const createNotificationElement = (notification: UpdatePost) => {
  return (
    <ul>
      <li>Notification Placeholder</li>
    </ul>
  );
};

const createDropdownComponents = (data: DropdownTypes, type: IconTypes) => {
  if (data === null || data.length === 0) {
    return <>{type}</>;
  }
  if (type === "notification") {
    const notification = data as UpdatePost[];
    return <div>{notification.map((n) => createNotificationElement(n))}</div>;
  } else {
    const userProfiles = data as UserProfile[];
    return <div>{userProfiles.map((u) => createFriendRequestElement(u))}</div>;
  }
};

export default function IconDropdown({ children, data, alertCount, type }: IconDropdownProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative group inline-block h-full">
        {alertCount != 0 ? (
          <div className="absolute right-0 top-0 rounded-full bg-red-500 w-4 h-4 flex items-center justify-center">
            <span className="text-white text-xxxs">{alertCount > 99 ? "99+" : alertCount}</span>
          </div>
        ) : (
          <></>
        )}
        <div>{children}</div>
        {type === "profile" ? (
          <div className="absolute hidden group-focus:block group-hover:block bg-white border rounded shadow-sm p-0 m-0 right-0 z-1 w-24 max-h-96 left-1/2 -translate-x-1/2">
            <ul className="flex flex-col">
              <li className="hover:bg-gray-100 hover:cursor-pointer w-full py-2 flex items-center justify-center text-black">
                Profile
              </li>
              <li className="hover:bg-gray-100 hover:cursor-pointer w-full py-2 flex items-center justify-center text-black">
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <div className="absolute hidden group-focus:block group-hover:block bg-white border rounded shadow-sm p-4 right-0 z-1 w-96 max-h-96 left-1/2 -translate-x-1/2 overflow-y-scroll">
            {createDropdownComponents(data, type)}
          </div>
        )}
      </div>
    </div>
  );
}
