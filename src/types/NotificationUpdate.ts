import { NotificationType } from "./NotificationType";
import { Update } from "./Update";
import { UserProfile } from "./UserProfile";

export type NotificationUpdate = {
  actorUser: UserProfile;
  update: Update;
  eNotificationType: NotificationType;
  isRead: true | false;
  createdAt: string;
};
