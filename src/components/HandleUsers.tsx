import React from "react";
import { EmpProfileProps } from "../class/Employee";

export const handleLogin = async ({
  inputRefs,
  email_or_username_selected,
  role,
  errors,
}: {
  inputRefs: {
    [key: string]: React.MutableRefObject<HTMLInputElement | null>;
  };
  email_or_username_selected: string;
  role: string;
  errors: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  try {
    let reqBody: { [key: string]: string } = {};

    Object.entries(inputRefs).forEach(([key, attr]) => {
      if (attr.current?.value === "")
        throw new Error("ข้อมูลที่กรอกไม่ครบถ้วน Incomplete data filled out");

      reqBody[key] = String(attr.current?.value);
    });

    reqBody["email_or_username_selected"] = email_or_username_selected;
    reqBody["role"] = role;

    console.log(reqBody);

    const response = await fetch(
      "http://127.0.0.1:8000/api/eqmcpt/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      }
    );

    if (!response.ok) {
      const err = (await response.json()).message;
      throw new Error(err[0]);
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", role);
    localStorage.setItem("post", data.post);
    localStorage.setItem("nav-item", "4");

    window.location.reload();
  } catch (error) {
    if (errors.current) {
      if (errors.current.className !== "") errors.current.className = "";

      const p_element = errors.current.querySelector("p");

      if (p_element)
        p_element.innerHTML = String(error).replace(/^Error: /, "");
    }
  }
};

export const handleProfile = async ({
  setMyProfile,
}: {
  setMyProfile: (myProfile: EmpProfileProps) => void;
}) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/eqmcpt/user/profile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) throw new Error("Invalid Profile");
    else setMyProfile((await response.json()).profile);
  } catch (error) {
    console.error(error);
  }
};

export const handleLogout = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/eqmcpt/user/logout",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Invalid Logout");
    } else {
      localStorage.clear();
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};
