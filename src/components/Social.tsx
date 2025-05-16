import { useEffect, useRef, useState } from "react";
import { createFollowRequestElement } from "./Navbar/IconDropdown";
import { TNotificationFollowRequest } from "@/types/NotificationFollowRequest";
import { BASE_API } from "@/constants/baseAPI";
import fetchWithTokenRefresh from "@/util/fetchWithTokenRefresh";
import Spinner from "./Spinner";

export default function Social() {
  const [followNotifications, setFollowNotifications] = useState<TNotificationFollowRequest[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!hasMoreData) {
      return;
    }

    if (observer.current) {
      observer.current.disconnect();
    } else {
      observer.current = new IntersectionObserver((elements) => {
        console.log("Intersection Observed");
        if (elements[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
    }

    const loader = loaderRef.current;

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
    const getNotifications = async () => {
      const notificationAPI = `${BASE_API}/notification/follow/query?page=${page}`;

      try {
        const res = await fetchWithTokenRefresh(notificationAPI, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data.length === 0) {
          setHasMoreData(false);
        } else {
          setFollowNotifications((prev) => [...prev, ...data]);
        }
      } catch (e: unknown) {
        console.log(e);
      }
    };

    getNotifications();
  }, [page]);

  useEffect(() => {
    if (hasMoreData && document.body.scrollHeight <= window.innerHeight) {
      setPage((prev) => prev + 1);
    }
  }, [followNotifications, hasMoreData]);

  return (
    <div className="flex justify-center my-24">
      <div className="border rounded-lg w-[80ch]">
        <ul className="flex flex-col w-full justify-center">
          {followNotifications.length > 0 ? (
            followNotifications.map((notification) => createFollowRequestElement(notification))
          ) : (
            <div className="flex flex-col justify-center items-center">
              <div>Nothing to see here... yet.</div>
            </div>
          )}
        </ul>
        {hasMoreData && (
          <div ref={loaderRef}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
