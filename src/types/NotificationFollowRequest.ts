import { TUserProfile } from "./UserProfile";
import { TNotificationType } from "./NotificationType";

export type TNotificationFollowRequest = {
  id: number;
  actorUser: TUserProfile;
  eNotificationType: TNotificationType;
  isRead: true | false;
  createdAt: string;
};
