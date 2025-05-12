import UserProfileHeader from "./UserProfile/UserProfileHeader";
import { iconSize } from "@/constants/iconSize";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function UserFriendRequest() {
  return (
    <div className="flex">
      <UserProfileHeader username="TestAccount" displayName="Test Account" />
      <button className="flex ml-auto justify-center">
        <CheckIcon className={`${iconSize} text-green-600`} />
      </button>
      <button className="flex justify-center ml-2">
        <Cross2Icon className={`${iconSize} text-red-600`} />
      </button>
    </div>
  );
}
