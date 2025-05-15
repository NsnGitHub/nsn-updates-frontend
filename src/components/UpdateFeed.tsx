import { useCallback, useEffect, useRef, useState } from "react";
import Update from "./Update";
import { TUpdatePost } from "@/types/UpdatePost";
import fetchWithTokenRefresh from "@/util/fetchWithTokenRefresh";
import Spinner from "./Spinner";
import { useUser } from "@/contexts/UserProvider";

export default function UpdateFeed({ username }: { username: string }) {
  const [updates, setUpdates] = useState<TUpdatePost[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  const { user } = useUser();

  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef(null);

  const getUpdates = useCallback(async () => {
    const updateAPI = `http://localhost:8080/api/v1/update/${username}/${page}`;

    try {
      const res = await fetchWithTokenRefresh(updateAPI, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.length === 0) {
        setHasMoreData(false);
      } else {
        setUpdates((prev) => [...prev, ...data]);
      }
    } catch (e: unknown) {
      console.log(e);
    }
  }, [username, page]);

  useEffect(() => {
    if (!hasMoreData) {
      return;
    }

    const loader = loaderRef.current;

    if (observer.current) {
      observer.current.disconnect();
    } else {
      observer.current = new IntersectionObserver((elements) => {
        if (elements[0].isIntersecting) {
          setPage((prev) => (prev += 1));
        }
      });
    }

    if (loader) {
      observer.current.observe(loader);
    }

    return () => {
      if (loader) {
        observer.current?.unobserve(loader);
      }
    };
  }, [hasMoreData]);

  useEffect(() => {
    getUpdates();
  }, [getUpdates]);

  return (
    <div className="flex flex-col border px-4 gap-4 rounded-lg w-[80ch]">
      <div className="mt-4 text-lg font-semibold text-gray-800">Updates</div>
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
            currentUser={user}
          />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div>Looks empty in here</div>
          <div>Start following users to see their latest posts here</div>
        </div>
      )}
      {hasMoreData && (
        <div ref={loaderRef} className="my-24">
          <Spinner />
        </div>
      )}
    </div>
  );
}
