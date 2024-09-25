import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useError from "@/lib/useError";

type LoginData = {
  username: string;
  password: string;
};

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({ username: "", password: "" });
  const { isError, errorMessage, handleError } = useError();

  const handleLoginDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const baseUrl = "http://localhost:8080";

    try {
      const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        handleError(errorData.message);
      }

      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
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
      <Button className="border-1 rounded-full" onClick={handleSubmit}>
        Log in
      </Button>

      <div className="flex items-center">
        <div className="flex-grow border-gray-300 border-t"></div>
        <span className="mx-8 text-gray-400">Or</span>
        <div className="flex-grow border-gray-300 border-t"></div>
      </div>

      <Button className="border-1 rounded-full bg-blue-400 hover:bg-blue-500">Register</Button>
      <Button className="border-1 rounded-full bg-gray-500 hover:bg-gray-600">Continue as guest</Button>

      {isError && <div className="text-red-500 w-full text-center text-sm">{errorMessage}</div>}
    </section>
  );
}
