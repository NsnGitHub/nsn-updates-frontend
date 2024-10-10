import { useEffect, useState } from "react";
import Update from "./Update";

type Update = {
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

export default function UpdateFeed() {
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      const baseAPI = "http://localhost:8080/api/v1/update";

      try {
        const res = await fetch(baseAPI, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setUpdates(data);
        return res;
      } catch (e: unknown) {
        console.log(e);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <>
      {updates.length > 0 ? (
        updates.map((updatePost) => <Update key={updatePost.id} update={updatePost} />)
      ) : (
        <div>No posts to display</div>
      )}
    </>
  );
}
