import React, { useEffect, useRef, useState } from "react";
import { buttonCLR } from "../class/Button";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../components/HandleUsers";

export const EmpLogin = () => {
  const navigate = useNavigate();
  const [email_or_username_selected, set_email_or_username_selected] =
    useState("username");
  const errorLogin = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<{
    [key: string]: React.MutableRefObject<HTMLInputElement | null>;
  }>({
    email_or_username_result: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  });

  const handleUsernameChange = (inputType: string) => {
    if (inputType !== email_or_username_selected)
      set_email_or_username_selected(inputType);
  };

  useEffect(() => {
    // if (localStorage.getItem("role"))
    //   if (localStorage.getItem("role") === "employee")
    //     navigate("/eqmcpt/provider/profile");
  }, []);

  return (
    <div className="theme-white h-screen">
      <div className="container mx-auto max-w-screen-xl pt-5">
        <div className="max-w-md mx-auto shadow-lg rounded-lg overflow-hidden bg-[#212529] text-[#dee2e6]">
          <div className="px-4 py-2 text-center">
            <h3 className="font-semibold text-xl mb-1">Sign In</h3>
            <hr />
          </div>
          <div className="px-4 py-2">
            <div className="flex mt-3">
              <button
                id="username"
                className={
                  email_or_username_selected === "username"
                    ? "bg-white text-black p-1"
                    : "border p-1"
                }
                onClick={() => handleUsernameChange("username")}
              >
                Username
              </button>
              <button
                id="email"
                className={
                  email_or_username_selected === "email"
                    ? "bg-white text-black p-1"
                    : "border p-1"
                }
                onClick={() => handleUsernameChange("email")}
              >
                email
              </button>
              <input
                ref={inputRefs.current["email_or_username_result"]}
                type="text"
                className="ml-1 pl-2 w-3/4 text-black"
              />
            </div>
            <div className="flex my-3 text-black">
              <label
                htmlFor="password"
                className="border bg-white text-right p-1 w-[30.2%]"
              >
                Password
              </label>
              <input
                ref={inputRefs.current["password"]}
                type="password"
                className="ml-1 pl-2 w-[69%]"
              />
            </div>
            <div ref={errorLogin} className="hidden">
              <p className="border bg-red-400 text-center py-1"></p>
            </div>
            <button
              className={`${buttonCLR({ color: "Success" })} mt-3 w-full py-1`}
              onClick={() =>
                handleLogin({
                  inputRefs: inputRefs.current,
                  email_or_username_selected: email_or_username_selected,
                  role: "employee",
                  errors: errorLogin,
                })
              }
            >
              Confrim
            </button>
            <button
              className={`${buttonCLR({ color: "Danger" })} my-3 w-full py-1`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
