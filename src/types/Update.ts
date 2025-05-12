export type TUpdate = {
  id: number;
  content: string;
  createdAt: string;
  numberOfLikes: number;
  postingUser: {
    username: string;
    displayName: string;
  };
};
