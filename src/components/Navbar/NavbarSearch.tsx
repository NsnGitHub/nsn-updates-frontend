import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import UserProfileHeader from "../UserProfileHeader";
import { useState } from "react";
import { useSearchQuery } from "@/lib/userQuery";
import { useDebounce } from "@/lib/useDebounce";
import Spinner from "../Spinner";

export default function NavbarSearch() {
  const [searchContent, setSearchContent] = useState<string>("");
  const debouncedSearchContent = useDebounce(searchContent);
  const { data, isLoading, error } = useSearchQuery(debouncedSearchContent);

  const handleSearchContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  return (
    <li className="transition-all ease-in-out duration-1000 w-1/6 focus-within:w-full">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute w-6 h-6 left-2 top-2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          onChange={handleSearchContentChange}
          className="pl-10 focus-visible:ring-transparent m-0"
        />
        {debouncedSearchContent ? (
          <div className="absolute top-12 left-0 w-full h-fit max-h-96 -z-50 overflow-x-scroll flex flex-col gap-2 px-2 py-2 border rounded-md bg-white">
            {isLoading ? (
              <Spinner />
            ) : data?.length == 0 ? (
              <div className="h-12 flex justify-center items-center">No results found</div>
            ) : (
              <div className="flex flex-col gap-6 p-2">
                {data?.map((res, index) => (
                  <UserProfileHeader
                    key={"res.username" + index}
                    username={res.username}
                    displayName={res.displayName}
                  ></UserProfileHeader>
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
