import { TUpdatePost } from "@/types/UpdatePost";
import { convertUpdateContentToPreview } from "@/util/convertUpdateContentToPreview";

export default function UpdatePreview({ postingUser, content }: TUpdatePost) {
  return (
    <div>
      <b>{postingUser.displayName} shared an update</b>
      <p>"{convertUpdateContentToPreview(content)}"</p>
    </div>
  );
}
