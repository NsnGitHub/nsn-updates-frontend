import { BASE_API } from "@/constants/baseAPI";
import { UserProfile } from "@/types/UserProfile";
import fetchWithTokenRefresh from "@/util/fetchWithTokenRefresh";
import { useQuery } from "@tanstack/react-query";

type UserProfileSearchAPIResponse = UserProfile[];

const searchUserAPI = `${BASE_API}/user/search`;
const getUserProfilesByUsernameCriteria = async (usernameCriteria: string): Promise<UserProfileSearchAPIResponse> => {
  if (usernameCriteria.length == 0) {
    return [];
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetchWithTokenRefresh(`${searchUserAPI}/${usernameCriteria}`, {
    method: "GET",
    credentials: "include",
  });

  console.log(res);

  if (!res.ok) {
    const errorRes = await res.json();
    throw new Error(errorRes.message);
  }

  return res.json();
};

export const useSearchQuery = (usernameCriteria: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-profile-search", usernameCriteria],
    queryFn: () => getUserProfilesByUsernameCriteria(usernameCriteria),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(usernameCriteria),
  });

  return { data, isLoading, error };
};
