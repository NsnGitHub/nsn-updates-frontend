import { TNotificationType } from "./NotificationType";
import { TUpdate } from "./Update";
import { TUserProfile } from "./UserProfile";

export type TNotificationUpdate = {
  actorUser: TUserProfile;
  update: TUpdate;
  eNotificationType: TNotificationType;
  isRead: true | false;
  createdAt: string;
};
