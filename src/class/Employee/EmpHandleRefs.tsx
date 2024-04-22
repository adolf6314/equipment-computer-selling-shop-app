import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import WcRoundedIcon from "@mui/icons-material/WcRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import SensorOccupiedRoundedIcon from "@mui/icons-material/SensorOccupiedRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import React, { ReactNode, useState } from "react";
import { getEmpRolesByLang, getEmpWorkStatusByLang } from "./EmpProps";

export const GetInputRefsIndividual = ({
  keys,
  profile,
  inputRef,
  language,
}: {
  keys: string[];
  profile: any;
  inputRef: {
    [key: string]: React.MutableRefObject<HTMLInputElement | null>;
  };
  language: string;
}) => {
  const icons: Record<string, ReactNode> = {
    Fullname: <PersonRoundedIcon sx={{ fontSize: 30 }} color="action" />,
    Username: <AccountBoxRoundedIcon sx={{ fontSize: 30 }} color="action" />,
    Email: <EmailRoundedIcon sx={{ fontSize: 30 }} color="action" />,
    Password: <LockRoundedIcon sx={{ fontSize: 30 }} color="action" />,
    "Repeat Password": <LockRoundedIcon sx={{ fontSize: 30 }} color="action" />,
    Phone: <PhoneIphoneRoundedIcon sx={{ fontSize: 30 }} color="action" />,
    Role: (
      <AdminPanelSettingsRoundedIcon sx={{ fontSize: 30 }} color="action" />
    ),
    Gender: <WcRoundedIcon sx={{ fontSize: 30 }} color="action" />,
    "Work Status": (
      <SensorOccupiedRoundedIcon sx={{ fontSize: 30 }} color="action" />
    ),
  };

  const renderMenus = ({ items }: { items: string[] }) => {
    return (
      <div className="absolute mt-1 p-1 theme-white w-full">
        <div className="border border-black p-1">
          {items.map((item, index) => (
            <div key={index}>
              <button className="text-start w-full hover:bg-white">
                {item}
              </button>
              <hr className="my-1 border border-gray-600" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderForm = () => {
    return keys.map((prof) => (
      <div key={prof} className="flex mb-3">
        <label
          htmlFor={prof}
          className="border border-gray-400 rounded rounded-r-none bg-zinc-300 p-1"
        >
          {icons[prof]}
        </label>
        {prof === "Role" || prof === "Gender" || prof === "Work Status" ? (
          <div className="relative w-full">
            <button
              className="border border-gray-400 rounded rounded-l-none px-2 py-[0.44rem] w-full flex justify-between"
              onClick={() => toggleDropDown(prof)}
            >
              {profile[prof]
                ? profile[prof][language !== "EN" ? 0 : 1]
                : "Select {prof} Type"}
              <ArrowDropDownRoundedIcon />
            </button>
            {menus.Role &&
              renderMenus({ items: getEmpRolesByLang({ language: language }) })}
            {menus.Gender &&
              renderMenus({
                items: language !== "EN" ? ["ชาย", "หญิง"] : ["Male", "Female"],
              })}
            {menus["Work Status"] &&
              renderMenus({
                items: getEmpWorkStatusByLang({ language: language }),
              })}
            <input
              ref={inputRef[prof]}
              type="hidden"
              defaultValue={profile[prof] ? profile[prof][1] : ""}
            />
          </div>
        ) : (
          <input
            ref={inputRef[prof]}
            type="text"
            className="border border-gray-400 rounded rounded-l-none w-full px-2"
            defaultValue={profile[prof] ? profile[prof] : ""}
          />
        )}
      </div>
    ));
  };

  const [menus, setMenus] = useState({
    Role: false,
    Gender: false,
    "Work Status": false,
  });

  const toggleDropDown = (menuType: string) => {
    setMenus((prevMenus) => ({
      ...prevMenus,
      Role: menuType === "Role" ? !prevMenus.Role : false,
      Gender: menuType === "Gender" ? !prevMenus.Gender : false,
      "Work Status":
        menuType === "Work Status" ? !prevMenus["Work Status"] : false,
    }));
  };

  return <>{renderForm()}</>;
};
