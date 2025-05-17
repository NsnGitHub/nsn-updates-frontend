import { useState } from "react";
import TextArea from "./TextArea";
import { Cross1Icon } from "@radix-ui/react-icons";
import { BASE_API } from "@/constants/baseAPI";
import fetchWithTokenRefresh from "@/util/fetchWithTokenRefresh";
import { TUpdatePost } from "@/types/UpdatePost";

type UpdateCreateProps = {
  initialContent: string | "";
  id: number | null;
  setCreatingUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: (update: TUpdatePost) => void;
};

const createUpdate = async (content: string, id: number | null, fn: (update: TUpdatePost) => void) => {
  const createUpdateAPI = `${BASE_API}/update/put`;

  try {
    const res = await fetchWithTokenRefresh(createUpdateAPI, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        content: content,
      }),
    });

    if (!res.ok) {
      const errorRes = await res.json();
      throw new Error(errorRes.message);
    }

    const data = await res.json();

    if (data.id) {
      fn(data);
    }

    // return res;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }

    throw new Error("Unknown error has occurred");
  }
};

export default function UpdateCreate({ initialContent, id, setCreatingUpdate, onUpdate }: UpdateCreateProps) {
  const [updateContent, setUpdateContent] = useState<string | "">(initialContent);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-30">
      <div className="relative w-1/2 h-1/2 bg-gray-200 flex flex-col items-center gap-4 z-1000 rounded-md">
        <div className="absolute top-4 right-4 w-6 h-6 hover:cursor-pointer" onClick={() => setCreatingUpdate(false)}>
          <Cross1Icon width="1.5rem" height="1.5rem"></Cross1Icon>
        </div>
        <div className="px-16 w-full h-2/3 mt-16">
          <TextArea content={updateContent} setContent={setUpdateContent} />
        </div>
        <div className="flex flex-row items-center justify-between px-16 w-full">
          <span>{1000 - updateContent.length}</span>
          <button
            className="rounded-md px-4 py-2 bg-blue-500 text-white"
            onClick={() => createUpdate(updateContent, id, onUpdate)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
