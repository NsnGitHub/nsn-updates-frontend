import React, { useState } from "react";
import TextArea from "./UpdateCreate/TextArea";
import { Cross1Icon } from "@radix-ui/react-icons";
import { BASE_API } from "@/constants/baseAPI";

type UpdateCreateProps = {
  setCreatingUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const createUpdate = async (content: string) => {
  const createUpdateAPI = `${BASE_API}/update/create`;

  try {
    const res = await fetch(createUpdateAPI, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: content }),
    });

    if (!res.ok) {
      const errorRes = await res.json();
      throw new Error(errorRes.message);
    }

    return res;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }

    throw new Error("Unknown error has occurred");
  }
};

export default function UpdateCreate({ setCreatingUpdate }: UpdateCreateProps) {
  const [updateContent, setUpdateContent] = useState("");

  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-30">
      <div className="relative w-1/2 h-1/2 bg-red-400 flex flex-col items-center gap-4 z-1000 rounded-md">
        <div className="absolute top-4 right-4 w-6 h-6 hover:cursor-pointer" onClick={() => setCreatingUpdate(false)}>
          <Cross1Icon width="1.5rem" height="1.5rem"></Cross1Icon>
        </div>
        <div className="px-16 w-full h-2/3 mt-16">
          <TextArea content={updateContent} setContent={setUpdateContent} />
        </div>
        <div className="flex flex-row items-center justify-between px-16 w-full">
          <span>{1000 - updateContent.length}</span>
          <button className="border rounded-md px-4 py-2 bg-blue-300" onClick={() => createUpdate(updateContent)}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
