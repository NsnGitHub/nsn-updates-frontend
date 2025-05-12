import { useEffect, useState } from "react";
import Update from "./Update";
import { UpdatePost } from "@/types/UpdatePost";

export default function UpdateFeed() {
  const [updates, setUpdates] = useState<UpdatePost[]>([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      const baseAPI = "http://localhost:8080/api/v1/update";

      try {
        const res = await fetch(baseAPI, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        console.log(data);

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
        updates.map((updatePost: UpdatePost) => (
          <Update
            key={updatePost.id}
            id={updatePost.id}
            content={updatePost.content}
            postingUser={updatePost.postingUser}
            numberOfLikes={updatePost.numberOfLikes}
            userHasLiked={updatePost.userHasLiked}
            createdAt={updatePost.createdAt}
            isEdited={updatePost.isEdited}
            editedAt={updatePost?.editedAt}
          />
        ))
      ) : (
        <div>No posts to display</div>
      )}
    </>
  );
}
