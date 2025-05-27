import { useCallback, useState } from "react";
import Navbar from "./Navbar/Navbar";
import UpdateCreate from "./UpdateCreate/UpdateCreate";
import { Outlet } from "react-router-dom";
import { useUserUpdate } from "@/contexts/UserUpdateProvider";
import { TUpdatePost } from "@/types/UpdatePost";

export default function Layout() {
  const [isCreatingUpdate, setCreatingUpdate] = useState<boolean>(false);
  const { addNewUserUpdate } = useUserUpdate();

  const onCreate = useCallback(
    (update: TUpdatePost) => {
      addNewUserUpdate(update);
    },
    [addNewUserUpdate]
  );

  return (
    <>
      <Navbar setCreatingUpdate={setCreatingUpdate} />
      <div className="mt-20">
        {isCreatingUpdate ? (
          <UpdateCreate
            setCreatingUpdate={setCreatingUpdate}
            initialContent=""
            onUpdate={null}
            onCreate={onCreate}
            id={null}
          />
        ) : (
          <></>
        )}
      </div>
      {<Outlet />}
    </>
  );
}
