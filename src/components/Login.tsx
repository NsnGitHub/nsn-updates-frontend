import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginData = {
  username: string;
  password: string;
};

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({ username: "", password: "" });
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleError = () => {
    setIsError(true);
    setErrorMessage(`Something about a wrong password for user ${loginData.username}`);
  };

  const handleLoginDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <section className="w-1/3 h-1/2 flex flex-col gap-8 rounded-lg px-16 py-16 border m-8">
      <Input
        type="text"
        placeholder="Username"
        name="username"
        value={loginData.username}
        onChange={handleLoginDataChange}
      ></Input>
      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={loginData.password}
        onChange={handleLoginDataChange}
      ></Input>
      <Button className="border-1 rounded-full" onClick={handleError}>
        Log in
      </Button>

      <div className="flex items-center">
        <div className="flex-grow border-gray-300 border-t"></div>
        <span className="mx-8 text-gray-400">Or</span>
        <div className="flex-grow border-gray-300 border-t"></div>
      </div>

      <Button className="border-1 rounded-full bg-blue-400 hover:bg-blue-500">Register</Button>

      {isError && <div className="text-red-500 w-full text-center text-sm">{errorMessage}</div>}
    </section>
  );
}
