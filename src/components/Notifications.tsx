import { useEffect, useRef, useState } from "react";
import { createNotificationElement } from "./Navbar/IconDropdown";
import Spinner from "./Spinner";
import { BASE_API } from "@/constants/baseAPI";
import fetchWithTokenRefresh from "@/util/fetchWithTokenRefresh";
import { TNotificationUpdate } from "@/types/NotificationUpdate";

export default function Notifications() {
  const [notifications, setNotifications] = useState<TNotificationUpdate[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef(null);

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
    const getNotifications = async () => {
      const notificationAPI = `${BASE_API}/notification/update/query?page=${page}`;

      try {
        const res = await fetchWithTokenRefresh(notificationAPI, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data.length === 0) {
          setHasMoreData(false);
        } else {
          setNotifications((prev) => [...prev, ...data]);
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
  }, [notifications, hasMoreData]);

  return (
    <div className="flex justify-center my-24">
      <div className="border rounded-lg w-[80ch]">
        <ul className="flex flex-col w-full justify-center">
          {notifications.length > 0 ? (
            notifications.map((notification) => createNotificationElement(notification))
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
