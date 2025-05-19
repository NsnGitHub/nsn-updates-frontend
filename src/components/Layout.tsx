import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import UpdateCreate from "./UpdateCreate/UpdateCreate";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [isCreatingUpdate, setCreatingUpdate] = useState<boolean>(false);

  return (
    <>
      <Navbar setCreatingUpdate={setCreatingUpdate} />
      <div className="mt-20">
        {isCreatingUpdate ? (
          <UpdateCreate setCreatingUpdate={setCreatingUpdate} initialContent="" onUpdate={() => {}} id={null} />
        ) : (
          <></>
        )}
      </div>
      {<Outlet />}
    </>
  );
}
