import { useState } from "react";

const useError = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleError = (errorMessage: string) => {
    setIsError(true);
    setErrorMessage(errorMessage);
  };

  const resetError = () => {
    setIsError(false);
    setErrorMessage("");
  };

  return { isError, errorMessage, handleError, resetError };
};

export default useError;
