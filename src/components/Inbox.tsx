import { useEffect, useRef, useState } from "react";
import Update from "./Update";
import { TUpdatePost } from "@/types/UpdatePost";
import fetchWithTokenRefresh from "@/util/fetchWithTokenRefresh";
import Spinner from "./Spinner";
import { useUser } from "@/contexts/UserProvider";
import { BASE_API } from "@/constants/baseAPI";

export default function Inbox() {
  const [updates, setUpdates] = useState<TUpdatePost[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  const { user } = useUser();

  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef(null);

  const pageDataMap = useRef<Map<number, TUpdatePost[]>>(new Map());

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
      const updateAPI = `${BASE_API}/update/inbox/${page}`;

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

          setUpdates(merged);
        }
      } catch (e: unknown) {
        console.log(e);
      }
    };

    getUpdates();
  }, [page]);

  useEffect(() => {
    if (hasMoreData && document.body.scrollHeight <= window.innerHeight) {
      setPage((prev) => prev + 1);
    }
  }, [updates, hasMoreData]);

  return (
    <div className="flex flex-col border px-8 py-8 gap-8 rounded-lg w-[80ch]">
      <div className="text-lg font-semibold text-gray-800">From Your Following</div>
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
            onUpdate={null}
            onDelete={null}
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
