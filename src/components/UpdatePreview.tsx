import { UpdatePost } from "@/types/UpdatePost";
import { convertUpdateContentToPreview } from "@/util/convertUpdateContentToPreview";

export default function UpdatePreview({ update }: UpdatePost) {
  return (
    <div>
      <b>{update.postingUser.displayName} shared an update</b>
      <p>"{convertUpdateContentToPreview(update.content)}"</p>
    </div>
  );
}
