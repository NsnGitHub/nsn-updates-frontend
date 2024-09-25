import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useError from "@/lib/useError";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type PrivacySetting = "PUBLIC" | "PRIVATE" | "FOLLOWER";

type RegisterData = {
  username: string;
  password: string;
  displayName: string;
  email: string;
  privacySetting: PrivacySetting;
};

const privacySelector = "bg-white text-black hover:bg-blue-300 focus:bg-blue-400";
const privacySelectorActive = "bg-blue-400 text-black";

export default function Register() {
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: "",
    password: "",
    displayName: "",
    email: "",
    privacySetting: "PUBLIC",
  });

  const [registerDataValidationError, setRegisterDataValidationError] = useState<RegisterData>({
    username: "",
    password: "",
    displayName: "",
    email: "",
    privacySetting: "PUBLIC",
  });

  const { isError, errorMessage } = useError();

  const handleRegisterDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    validateRegisterData();
  };

  const validateRegisterData = () => {
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    const displayNameRegex = /^[a-zA-Z ]{3,15}$/;
    const passwordRegex = /^[\x21-\x7E]{5,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const errors: RegisterData = {
      username: "",
      displayName: "",
      password: "",
      email: "",
      privacySetting: registerData.privacySetting,
    };

    if (!usernameRegex.test(registerData.username)) {
      errors.username = "Username must be between 3 and 15 characters and can only contain letters and digits";
    }

    if (!displayNameRegex.test(registerData.displayName)) {
      errors.displayName = "Display name must be between 3 and 15 characters and can only contain letters and spaces";
    }

    if (!emailRegex.test(registerData.email)) {
      errors.email = "Email is not in a valid format";
    }

    if (!passwordRegex.test(registerData.password)) {
      errors.password =
        "Password must be at least 5 characters long and can contain any printable ASCII character except space";
    }

    setRegisterDataValidationError(errors);
  };

  return (
    <section className="w-1/3 h-1/2 flex flex-col gap-8 rounded-lg px-16 py-16 border m-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <Input
          className={registerDataValidationError.username ? "focus-visible:ring-destructive" : ""}
          type="text"
          placeholder="Username"
          name="username"
          value={registerData.username}
          onChange={handleRegisterDataChange}
        ></Input>
        {registerDataValidationError.username && <p className="text-red-500">{registerDataValidationError.username}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="displayName">Display Name</label>
        <Input
          className={registerDataValidationError.displayName ? "focus-visible:ring-destructive" : ""}
          type="text"
          placeholder="Display Name"
          name="displayName"
          value={registerData.displayName}
          onChange={handleRegisterDataChange}
        ></Input>
        {registerDataValidationError.displayName && (
          <p className="text-red-500">{registerDataValidationError.displayName}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <Input
          className={registerDataValidationError.password ? "focus-visible:ring-destructive" : ""}
          type="password"
          placeholder="Password"
          name="password"
          value={registerData.password}
          onChange={handleRegisterDataChange}
        ></Input>
        {registerDataValidationError.password && <p className="text-red-500">{registerDataValidationError.password}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <Input
          className={registerDataValidationError.email ? "focus-visible:ring-destructive" : ""}
          type="text"
          placeholder="Email"
          name="email"
          value={registerData.email}
          onChange={handleRegisterDataChange}
        ></Input>
        {registerDataValidationError.email && <p className="text-red-500">{registerDataValidationError.email}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="privacy">Privacy Setting</label>

        <div className="flex flex-row">
          <Button
            onClick={() => setRegisterData({ ...registerData, privacySetting: "PUBLIC" })}
            className={`rounded-none w-1/3 border rounded-l-md ${privacySelector} ${
              registerData.privacySetting == "PUBLIC" ? privacySelectorActive : ""
            }`}
          >
            Public
          </Button>
          <Button
            onClick={() => setRegisterData({ ...registerData, privacySetting: "FOLLOWER" })}
            className={`rounded-none w-1/3 border-t border-b ${privacySelector} ${
              registerData.privacySetting == "FOLLOWER" ? privacySelectorActive : ""
            }`}
          >
            Followers
          </Button>
          <Button
            onClick={() => setRegisterData({ ...registerData, privacySetting: "PRIVATE" })}
            className={`rounded-none w-1/3 border rounded-r-md ${privacySelector} ${
              registerData.privacySetting == "PRIVATE" ? privacySelectorActive : ""
            }`}
          >
            Private
          </Button>
        </div>
      </div>

      <Button className="border-1 rounded-full" onClick={handleSubmit}>
        Register
      </Button>

      {isError && <div className="text-red-500 w-full text-center text-sm">{errorMessage}</div>}
    </section>
  );
}
