import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import UserProfileHeader from "../UserProfile/UserProfileHeader";
import { useState } from "react";
import { useSearchQuery } from "@/lib/userQuery";
import { useDebounce } from "@/lib/useDebounce";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

export default function NavbarSearch() {
  const [searchContent, setSearchContent] = useState<string>("");
  const debouncedSearchContent = useDebounce(searchContent);
  const { data, isLoading, error } = useSearchQuery(debouncedSearchContent);

  const navigate = useNavigate();

  const handleSearchContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  return (
    <li className="transition-all ease-in-out duration-500 w-1/6 focus-within:w-full">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute w-6 h-6 left-2 top-2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          onChange={handleSearchContentChange}
          className="pl-10 focus-visible:ring-transparent m-0"
        />
        {debouncedSearchContent ? (
          <div className="absolute top-12 left-0 w-full h-fit max-h-96 -z-50 overflow-x-scroll flex flex-col gap-2 border rounded-md bg-white">
            {isLoading ? (
              <Spinner />
            ) : data?.length == 0 ? (
              <div className="h-12 flex justify-center items-center">No results found</div>
            ) : (
              <div className="flex flex-col gap-0 p-0 hover:cursor-pointer [&>*:nth-child(even)]:bg-gray-50">
                {data?.map((res, index) => (
                  <div key={"res.username" + index} className="p-4" onClick={() => navigate(`/user/${res.username}`)}>
                    <UserProfileHeader username={res.username} displayName={res.displayName}></UserProfileHeader>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </li>
  );
}
