import { UserPrivacySetting } from "./UserPrivacySetting";

export type UserProfile = {
  username: string;
  displayName: string;
  privacySetting: UserPrivacySetting;
  createdAt: string;
  numberOfFollowers: number;
  numberFollowing: number;
};
