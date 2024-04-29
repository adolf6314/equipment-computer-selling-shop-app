import { useState } from "react";
import { getUserLabel } from "../Labels/UserLabel";
import { getUserIcon } from "../Icons/UserIcon";
import { getGenders } from "../ItemsInProps/Genders";
import { getRoles } from "../ItemsInProps/Roles";

export const ProfileForm = ({
  formType,
  oldValues,
  properties,
  language,
}: {
  formType: string;
  oldValues: any | null;
  properties: Array<string | string[]>;
  language: string;
}) => {
  const [menus, setMenus] = useState<{ [key: string]: boolean }>({
    gender: false,
  });

  const userFormInitial = () => {
    switch (formType) {
      case "profile":
        return {
          firstname: oldValues.firstname || "",
          lastname: oldValues.lastname || "",
          email: oldValues.email || "",
          phone: oldValues.phone || "",
          gender: oldValues.gender || "",
        };
      case "address":
        return {
          address: oldValues.address || "",
          region: oldValues.region,
          province: oldValues.province,
          district: oldValues.district,
          sub_district: oldValues.sub_district,
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

  const propsValuesInitial: Record<string, string[]> = {
    gender: Array.from(getGenders("", language)),
    role: Array.from(getRoles("", language)),
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
      role: menuType === "role" ? !prevMenus.role : false,
    }));
  };

  const inputGroup = (props: string[]) => {
    // return one or two input elements
    return (
      <>
        {props.map((prop, nMod) => (
          <input
            key={prop}
            type="text"
            className={`border border-gray-400 px-2 py-1 ${
              props.length < 2
                ? "w-[27.4rem]"
                : (nMod + 1) % 2 !== 0
                ? "mr-[0.3rem] w-[13rem]"
                : "ml-[0.3rem] w-[13.8rem]"
            }`}
            defaultValue={(user as any)[prop]}
            placeholder={getUserLabel(prop, language)}
            onChange={(e) => handleUser(prop, e.target.value)}
          />
        ))}
      </>
    );
  };

  const dropdownGroup = (props: string[]) => {
    // return one or two dropdown items
    return (
      <>
        {props.map((prop, nMod) => (
          <div
            key={prop}
            className={`relative ${
              props.length < 2
                ? "w-[27.36rem]"
                : (nMod + 1) % 2 !== 0
                ? "mr-[0.3rem] w-[13rem]"
                : "ml-[0.3rem] w-[13.8rem]"
            }`}
          >
            <button
              className="border border-gray-400 px-2 py-[0.4rem] w-full flex items-center justify-between"
              onClick={() => toggleDropDown(prop)}
            >
              {prop}
              <i className="fa-solid fa-caret-down text-zinc-600"></i>
            </button>
            {menus[prop] && (
              <div className="absolute mt-1 theme-white w-full z-50">
                <div className="border border-black p-1">
                  {propsValuesInitial[prop].map((val, num) => (
                    <div key={`${prop}_${num}`}>
                      <button className="text-start w-full hover:bg-white">
                        {val}
                      </button>
                      {propsValuesInitial[prop].length - 1 !== num ? (
                        <hr className="my-1 border border-gray-600" />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  const propPathCheck = (props: string | string[]) => {
    props = typeof props !== "string" ? props : [props];

    if (
      props[0] === "gender" ||
      props[0] === "region" ||
      props[0] === "province" ||
      props[0] === "district" ||
      props[0] === "sub_district"
    )
      return dropdownGroup(props);

    return inputGroup(props);
  };

  return (
    <>
      {properties.map((prop, key) => (
        <div key={key} className="flex mb-3">
          <div
            className={`${getUserIcon(
              typeof prop !== "string" ? prop[0] : prop
            )} w-[2.5rem] text-zinc-600 text-2xl border border-r-0 border-gray-400 rounded 
            rounded-r-none bg-zinc-300 h-[2.4rem] flex items-center justify-center`}
          ></div>
          {propPathCheck(prop)}
        </div>
      ))}
    </>
  );
};
