import { useCallback, useEffect, useRef, useState } from "react";
import Update from "./Update";
import { TUpdatePost } from "@/types/UpdatePost";
import fetchWithTokenRefresh from "@/util/fetchWithTokenRefresh";
import Spinner from "./Spinner";
import { useUser } from "@/contexts/UserProvider";
import { BASE_API } from "@/constants/baseAPI";
import { useUserUpdate } from "@/contexts/UserUpdateProvider";

export default function UpdateFeed({ username }: { username: string }) {
  const [updates, setUpdates] = useState<TUpdatePost[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  const { userUpdates, addPaginatedUserUpdates, deleteUserUpdate, updateUserUpdate } = useUserUpdate();

  const { user } = useUser();

  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef(null);

  const pageDataMap = useRef<Map<number, TUpdatePost[]>>(new Map());

  const onUpdate = useCallback(
    (updatedPost: TUpdatePost) => {
      updateUserUpdate(updatedPost);
    },
    [updateUserUpdate]
  );

  const onDelete = useCallback(
    (deletedPostId: number) => {
      deleteUserUpdate(deletedPostId);
    },
    [deleteUserUpdate]
  );

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
          setPage((prev) => prev + 1);
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
    const getUpdates = async () => {
      const updateAPI = `${BASE_API}/update/${username}/${page}`;

      try {
        const res = await fetchWithTokenRefresh(updateAPI, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data.length === 0) {
          setHasMoreData(false);
        } else {
          pageDataMap.current.set(page, data);

          const sortedPages = Array.from(pageDataMap.current.keys()).sort((a, b) => a - b);
          const merged = sortedPages.flatMap((i) => pageDataMap.current.get(i) || []);

          if (user?.username == username) {
            addPaginatedUserUpdates(merged);
          } else {
            setUpdates(merged);
          }
        }
      } catch (e: unknown) {
        console.log(e);
      }
    };

    getUpdates();
  }, [username, page]);

  useEffect(() => {
    if (hasMoreData && document.body.scrollHeight <= window.innerHeight) {
      setPage((prev) => prev + 1);
    }
  }, [updates, hasMoreData]);

  return (
    <div className="flex flex-col border px-8 py-8 gap-8 rounded-lg w-[80ch]">
      <div className="text-lg font-semibold text-gray-800">Updates</div>
      {user?.username !== username && updates.length > 0 ? (
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
            onUpdate={() => {}}
            onDelete={() => {}}
          />
        ))
      ) : user?.username !== username ? (
        <div className="flex flex-col justify-center">
          <div>No updates yet.</div>
        </div>
      ) : user?.username === username && userUpdates.length > 0 ? (
        userUpdates.map((updatePost: TUpdatePost) => (
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
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className="flex flex-col justify-center">
          <div>No updates yet.</div>
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
