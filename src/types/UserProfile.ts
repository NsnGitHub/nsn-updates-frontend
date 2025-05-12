import { TUserPrivacySetting } from "./UserPrivacySetting";

export type TUserProfile = {
  username: string;
  displayName: string;
  privacySetting: TUserPrivacySetting;
  createdAt: string;
  numberOfFollowers: number;
  numberFollowing: number;
};
