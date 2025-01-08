import { BASE_API } from "@/constants/baseAPI";
import { useNavigate } from "react-router-dom";

const refreshAPI = `${BASE_API}/auth/refresh`;

const refreshToken = async () => {
  const res = await fetch(refreshAPI, {
    method: "GET",
    credentials: "include",
  });

  if (res.ok) {
    return true;
  }

  return false;
};

const fetchWithTokenRefresh = async (url: string, options: {} = {}) => {
  let res = await fetch(url, { ...options });

  if (res.status == 401) {
    const refreshRes = await refreshToken();

    if (!refreshRes) {
      const navigate = useNavigate();
      navigate("/login");
    }

    res = await fetch(url, { ...options });
  }

  return res;
};

export default fetchWithTokenRefresh;
