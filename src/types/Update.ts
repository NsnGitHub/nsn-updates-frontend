export type Update = {
  id: number;
  content: string;
  createdAt: string;
  numberOfLikes: number;
  postingUser: {
    username: string;
    displayName: string;
  };
};
