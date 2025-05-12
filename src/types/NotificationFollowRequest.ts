import { TUserProfile } from "./UserProfile";
import { TNotificationType } from "./NotificationType";

export type TNotificationFollowRequest = {
  actorUser: TUserProfile;
  eNotificationType: TNotificationType;
  isRead: true | false;
  createdAt: string;
};
