import { Update } from "./Update";

export type UpdatePost = Update & {
  isEdited: boolean;
  editedAt: string | null;
  userHasLiked: boolean;
};
