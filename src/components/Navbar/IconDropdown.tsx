import { TNotificationUpdate } from "@/types/NotificationUpdate";
import { TNotificationFollowRequest } from "@/types/NotificationFollowRequest";
import { convertUpdateContentToPreview } from "@/util/convertUpdateContentToPreview";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import extractInitials from "@/util/extractInitials";
import { useUser } from "@/contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "@/constants/baseAPI";

type IconTypes = "notification" | "friendRequest" | "profile";

type DropdownTypes = TNotificationFollowRequest[] | TNotificationUpdate[] | [] | null;

type IconDropdownProps = {
  children: React.ReactNode;
  data: DropdownTypes;
  alertCount: number;
  type: IconTypes;
};

export const createFollowRequestElement = (notification: TNotificationFollowRequest) => {
  return (
    <li key={notification.createdAt} className="m-0 py-4 border-b border-gray-200 hover:bg-gray-50">
      <div className={`flex flex-row px-4 gap-4 items-center ${notification.isRead == false ? "font-bold" : ""}`}>
        <div>
          <Avatar className="h-8 w-8 avatarBg rounded-full flex items-center justify-center text-xs flex-shrink-0">
            <AvatarFallback className="bg-transparent">
              {extractInitials(notification.actorUser.displayName)}
            </AvatarFallback>
          </Avatar>
        </div>
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

export const createNotificationElement = (notification: TNotificationUpdate) => {
  return (
    <li key={notification.createdAt} className="m-0 py-4 border-b border-gray-200 hover:bg-gray-50">
      <div className={`flex flex-row px-4 gap-4 items-center ${notification.isRead == false ? "font-bold" : ""}`}>
        <div>
          <Avatar className="m-0 p-0 h-8 w-8 avatarBg rounded-full flex items-center justify-center text-xs flex-shrink-0">
            <AvatarFallback className="bg-transparent">
              {extractInitials(notification.actorUser.displayName)}
            </AvatarFallback>
          </Avatar>
        </div>
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
    const notifications = data as TNotificationUpdate[];
    return <ul>{notifications.map((n) => createNotificationElement(n))}</ul>;
  } else {
    const notifications = data as TNotificationFollowRequest[];
    return <ul>{notifications.map((u) => createFollowRequestElement(u))}</ul>;
  }
};

export default function IconDropdown({ children, data, alertCount, type }: IconDropdownProps) {
  const { setUser } = useUser();
  const navigate = useNavigate();

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
              <li
                className="hover:bg-gray-100 hover:cursor-pointer w-full py-2 flex items-center justify-center text-black"
                onClick={async () => {
                  setUser(null);
                  navigate("/login");
                  await fetch(`${BASE_API}/auth/logout`, {
                    method: "POST",
                    credentials: "include",
                  });
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <div className="absolute hidden group-focus:block group-hover:block bg-white border rounded shadow-sm m-0 p-0 right-0 z-1 w-96 max-h-96 left-1/2 -translate-x-1/2 overflow-y-scroll">
            {createDropdownComponents(data, type)}
          </div>
        )}
      </div>
    </div>
  );
}
