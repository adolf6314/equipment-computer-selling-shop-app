import React from "react";
import { getRoles } from "./items_in_props/Roles";
import { getGenders } from "./items_in_props/Genders";
import { getAddress } from "./items_in_props/Address";

export const handleLogin = async ({
  user,
  role,
  errors,
}: {
  user: any;
  role: string;
  errors: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  try {
    let reqBody: { [key: string]: string } = {};

    Object.entries(user).forEach(([key, val]) => {
      if (val === "")
        throw new Error("ข้อมูลที่กรอกไม่ครบถ้วน Incomplete data filled out");

      reqBody[key] = String(val);
    });

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
  setMyAddress,
}: {
  setMyProfile: (myProfile: any) => void;
  setMyAddress: (myAddress: any) => void;
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
    else {
      const { profile, address } = await response.json();

      if (profile.role) profile.role = getRoles(profile.role);
      if (profile.gender) profile.gender = getGenders(profile.gender);

      profile["address"] = getAddress(address);

      setMyProfile(profile);
      setMyAddress(address);
    }
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
