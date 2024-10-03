import React from "react";
import Update from "./Update";

const updates = [
  {
    id: 7,
    content: "Hello world! It's my first post from TestUser1.",
    createdAt: "2024-09-28T04:56:42.619612Z",
    numberOfLikes: 0,
    postingUser: {
      username: "test3",
      displayName: "Test User",
    },
    isEdited: false,
    userHasLiked: false,
  },
  {
    id: 8,
    content: "Hello world! It's my first post from TestUser1.",
    createdAt: "2024-09-28T04:56:45.824652Z",
    numberOfLikes: 0,
    postingUser: {
      username: "test3",
      displayName: "Test User",
    },
    isEdited: false,
    userHasLiked: false,
  },
  {
    id: 9,
    content: "Hello world! It's my first post from TestUser1.",
    createdAt: "2024-09-28T04:56:46.381882Z",
    numberOfLikes: 0,
    postingUser: {
      username: "test3",
      displayName: "Test User",
    },
    isEdited: false,
    userHasLiked: false,
  },
  {
    id: 10,
    content: "Hello world! It's my first post from TestUser1.",
    createdAt: "2024-09-28T04:57:28.117378Z",
    numberOfLikes: 0,
    postingUser: {
      username: "test3",
      displayName: "Test User",
    },
    isEdited: false,
    userHasLiked: false,
  },
  {
    id: 11,
    content: "Hello world! It's my first post from TestUser1.",
    createdAt: "2024-09-28T04:57:28.721484Z",
    numberOfLikes: 1,
    postingUser: {
      username: "test3",
      displayName: "Test User",
    },
    isEdited: false,
    userHasLiked: true,
  },
];

export default function UpdateFeed() {
  return (
    <>
      {updates.map((updatePost) => (
        <Update update={updatePost} />
      ))}
    </>
  );
}
