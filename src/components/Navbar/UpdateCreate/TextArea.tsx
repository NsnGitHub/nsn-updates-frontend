import useError from "@/lib/useError";
import React from "react";

type TextAreaProps = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

export default function TextArea({ content, setContent }: TextAreaProps) {
  const { isError, errorMessage, handleError, resetError } = useError();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newText = e.target.value;

    if (newText.includes("<script>")) {
      newText = newText.replace("<script>", "");
      handleError("No script tags allowed");
    } else if (newText.includes("@")) {
      newText = newText.replace("@", "");
      handleError("No @ signs allowed");
    } else {
      resetError();
    }

    setContent(newText);
  };

  return (
    <div className="w-full h-full">
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="What's happening?"
        className="resize-none w-full h-full outline-none rounded-md p-4"
      />
      {isError ? (
        <div className="w-full h-2 text-xs text-red-600">{errorMessage}</div>
      ) : (
        <div className="w-full h-2"></div>
      )}
    </div>
  );
}
