import { NotificationUpdate } from "@/types/NotificationUpdate";
import { NotificationFollowRequest } from "@/types/NotificationFollowRequest";
import { convertUpdateContentToPreview } from "@/util/convertUpdateContentToPreview";

// const sampleUpdate = {
//   id: 1,
//   content:
//     "Embrace the little moments! 🌟 Whether it's a cozy coffee break, a quiet walk, or a good book, life’s beauty is found in the simple things. Let's make today count and spread positivity wherever we go. #Gratitude #SimpleJoys #StayPositive",
//   createdAt: "",
//   numberOfLikes: 0,
//   postingUser: {
//     username: "TestAccount",
//     displayName: "Test Account",
//   },
//   isEdited: false,
//   userHasLiked: false,
// };

type IconTypes = "notification" | "friendRequest" | "profile";

type DropdownTypes = NotificationFollowRequest[] | NotificationUpdate[] | [] | null;

type IconDropdownProps = {
  children: React.ReactNode;
  data: DropdownTypes;
  alertCount: number;
  type: IconTypes;
};

const createFollowRequestElement = (notification: NotificationFollowRequest) => {
  return (
    <li key={notification.createdAt}>
      <div className={notification.isRead == false ? "font-bold" : ""}>
        {notification.eNotificationType == "NOTIFICATION_FOLLOW_ACCEPTED" ? (
          <p>
            {notification.actorUser.displayName}
            <span className="text-gray-500"> (@{notification.actorUser.username})</span> has accepted your follow
            request
          </p>
        ) : notification.eNotificationType == "NOTIFICATION_FOLLOW_PUBLIC" ? (
          <p>
            {notification.actorUser.displayName}
            <span className="text-gray-500"> (@{notification.actorUser.username})</span> is now following you
          </p>
        ) : notification.eNotificationType == "NOTIFICATION_FOLLOW_REQUEST" ? (
          <p>
            {notification.actorUser.displayName}
            <span className="text-gray-500"> (@{notification.actorUser.username})</span> has requested to follow you
          </p>
        ) : (
          <></>
        )}
      </div>
    </li>
  );
};

const createNotificationElement = (notification: NotificationUpdate) => {
  return (
    <li key={notification.createdAt}>
      <div className={notification.isRead == false ? "font-bold" : ""}>
        {notification.eNotificationType == "NOTIFICATION_FOLLOWED_POSTED" ? (
          <p>
            {notification.actorUser.displayName}
            <span className="text-gray-500"> (@{notification.actorUser.username})</span> posted a new update:{" "}
            <span className="text-blue-600">{convertUpdateContentToPreview(notification.update.content)}</span>
          </p>
        ) : notification.eNotificationType == "NOTIFICATION_UPDATE_LIKED" ? (
          <p>
            {notification.actorUser.displayName}
            <span className="text-gray-500"> (@{notification.actorUser.username})</span> has liked your update{" "}
            <span className="text-blue-600">{convertUpdateContentToPreview(notification.update.content)}</span>
          </p>
        ) : (
          <></>
        )}
      </div>
    </li>
  );
};

const createDropdownComponents = (data: DropdownTypes, type: IconTypes) => {
  if (data === null || data.length === 0) {
    return <>{type}</>;
  }
  if (type === "notification") {
    const notifications = data as NotificationUpdate[];
    return <ul>{notifications.map((n) => createNotificationElement(n))}</ul>;
  } else {
    const notifications = data as NotificationFollowRequest[];
    return <ul>{notifications.map((u) => createFollowRequestElement(u))}</ul>;
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
