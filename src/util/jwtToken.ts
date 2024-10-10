const authBaseAPI = "http://localhost:8080/api/v1/auth";
const checkTokenValidity = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${authBaseAPI}/ping`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      return true;
    }

    if (res.status === 401) {
      return false;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
};

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${authBaseAPI}/refresh`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      return true;
    }

    if (res.status === 401) {
      return false;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
};

export default { checkTokenValidity, refreshAccessToken };
