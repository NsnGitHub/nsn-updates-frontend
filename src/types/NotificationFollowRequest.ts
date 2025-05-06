import { UserProfile } from "./UserProfile";
import { NotificationType } from "./NotificationType";

export type NotificationFollowRequest = {
  actorUser: UserProfile;
  eNotificationType: NotificationType;
  isRead: true | false;
  createdAt: string;
};
