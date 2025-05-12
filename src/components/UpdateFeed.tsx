import { useEffect, useState } from "react";
import Update from "./Update";
import { TUpdatePost } from "@/types/UpdatePost";

export default function UpdateFeed() {
  const [updates, setUpdates] = useState<TUpdatePost[]>([]);

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
        updates.map((updatePost: TUpdatePost) => (
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
        <div className="flex flex-col justify-center items-center">
          <div>Looks empty in here</div>
          <div>Start following users to see their latest posts here</div>
        </div>
      )}
    </>
  );
}
