import { TNotificationType } from "./NotificationType";
import { TUpdate } from "./Update";
import { TUserProfile } from "./UserProfile";

export type TNotificationUpdate = {
  id: number;
  actorUser: TUserProfile;
  update: TUpdate;
  eNotificationType: TNotificationType;
  isRead: true | false;
  createdAt: string;
};
