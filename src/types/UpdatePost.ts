import { TUpdate } from "./Update";

export type TUpdatePost = TUpdate & {
  isEdited: boolean;
  editedAt: string | null;
  userHasLiked: boolean;
};
