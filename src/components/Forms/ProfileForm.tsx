import { useState } from "react";
import { getUserLabel } from "../Labels/UserLabel";
import { getUserIcon } from "../Icons/UserIcon";

export const ProfileForm = ({
  formType,
  myProfile,
  props,
  language,
}: {
  formType: string;
  myProfile: any | null;
  props: Array<string | string[]>;
  language: string;
}) => {
  const [menus, setMenus] = useState({
    gender: false,
  });

  const userFormInitial = () => {
    switch (formType) {
      case "profile":
        return {
          firstname: myProfile.firstname || "",
          lastname: myProfile.lastname || "",
          email: myProfile.email || "",
          phone: myProfile.phone || "",
          gender: myProfile.gender || "",
        };
      case "address":
        return {
          address: myProfile.address || "",
          region: myProfile.region,
          province: myProfile.province,
          district: myProfile.district,
          sub_district: myProfile.sub_district,
        };
      case "password":
        return {
          old_password: "",
          new_password: "",
          repeat_new_password: "",
        };
      default:
        return {};
    }
  };

  const [user, setUser] = useState(userFormInitial());

  const handleUser = (prop: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [prop]: value,
    }));
  };

  const toggleDropDown = (menuType: string) => {
    setMenus((prevMenus) => ({
      ...prevMenus,
      gender: menuType === "gender" ? !prevMenus.gender : false,
    }));
  };

  const renderInputGroups = (items: string[]) => {
    return items.map((item, nMod) => {
      <input
        key={item}
        type="text"
        className={`w-full border border-gray-400 p-1 ${
          (nMod + 1) % 2 !== 0 ? "mr-[0.3rem]" : "ml-[0.3rem]"
        }`}
        defaultValue={(user as any)[item]}
        placeholder={getUserLabel(item, language)}
        onChange={(e) => handleUser(item, e.target.value)}
      />;
    });
  };

  const renderDropdownGroups = (values: Array<string[]>) => {
    return props.map((prop, nMod) => {
      <div
        key={typeof prop !== "string" ? prop.join("_") : prop}
        className={`relative w-full ${
          (nMod + 1) % 2 !== 0 ? "mr-[0.3rem]" : "ml-[0.3rem]"
        }`}
      >
        <button className="border border-gray-400 px-2 py-[0.44rem] w-full flex justify-between">
          {prop}
          <i className="fa-solid fa-caret-down text-zinc-600"></i>
        </button>
        <div className="absolute mt-1 theme-white w-full z-50">
          <div className="border border-black p-1">
            {values.map((val, num) => (
              <div key={`${prop}_${num}`}>
                <button className="text-start w-full hover:bg-white">
                  {val}
                </button>
                {values.length - 1 !== num ? (
                  <hr className="my-1 border border-gray-600" />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>;
    });
  };

  const checkPropPath = (items: string[]) => {
    items.map((item) => {
      if (
        item === "gender" ||
        item === "region" ||
        item === "province" ||
        item === "district" ||
        item === "sub_district"
      ) {
        
      }
    });
  };

  const renderForm = () => {
    props.map((prop, key) => (
      <div key={key} className="flex mb-3">
        <label
          htmlFor={typeof prop !== "string" ? prop.join("_") : prop}
          className="border border-gray-400 rounded rounded-r-none bg-zinc-300 p-1"
        >
          <i
            className={`${getUserIcon(
              typeof prop !== "string" ? prop[0] : prop
            )} text-[1.5rem] text-zinc-600`}
          ></i>
        </label>
        {}
      </div>
    ));
  };
};
