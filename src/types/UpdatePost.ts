export type UpdatePost = {
  update: {
    id: number;
    content: string;
    createdAt: string;
    numberOfLikes: number;
    postingUser: {
      username: string;
      displayName: string;
    };
    isEdited: boolean;
    userHasLiked: boolean;
  };
};
