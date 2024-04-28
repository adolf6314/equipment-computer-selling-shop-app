import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import WcRoundedIcon from "@mui/icons-material/WcRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { ReactNode, useState } from "react";
import { getEmpLabels } from "../class/User/Employee";
import { getGenders, getValue } from "../class/User/User";

export const GetEditForm = ({
  profile,
  language,
}: {
  profile: any;
  language: string;
}) => {
  const icons: Record<string, ReactNode> = {
    firstname: <PersonRoundedIcon sx={{ fontSize: 30 }} color="action" />,
    lastname: <PersonRoundedIcon sx={{ fontSize: 30 }} color="action" />,
    username: <AccountBoxRoundedIcon sx={{ fontSize: 30 }} color="action" />,
    email: <EmailRoundedIcon sx={{ fontSize: 30 }} color="action" />,
    phone: <PhoneIphoneRoundedIcon sx={{ fontSize: 30 }} color="action" />,
    gender: <WcRoundedIcon sx={{ fontSize: 30 }} color="action" />,
  };
  const placholder: Record<string, string> = {
    firstname: getEmpLabels({ index: "firstname", language: language }),
    lastname: getEmpLabels({ index: "lastname", language: language }),
    email: getEmpLabels({ index: "email", language: language }),
    phone: getEmpLabels({ index: "phone", language: language }),
    gender: language !== "EN" ? "เลือกเพศ" : "Select gender type",
  };
  const [user, setUser] = useState({
    firstname: profile.firstname,
    lastname: profile.lastname,
    email: profile.email,
    phone: profile.phone,
    gender: profile.gender,
  });
  const [menus, setMenus] = useState({
    gender: false,
  });

  const handleUser = (prop: string, val: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [prop]: val,
    }));
  };

  const renderMenus = ({ key, items }: { key: string; items: string[] }) => {
    return menus[key as keyof typeof menus] ? (
      <div className="absolute mt-1 p-1 theme-white w-full z-50">
        <div className="border border-black p-1">
          {items.map((item, index) => (
            <div key={index}>
              <button
                className="text-start w-full hover:bg-white"
                onClick={() => (
                  <>
                    {handleUser(key, item)}
                    {toggleDropDown(key)}
                  </>
                )}
              >
                {item}
              </button>
              {items.length - 1 !== index ? (
                <hr className="my-1 border border-gray-600" />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null;
  };

  const renderForm = () => {
    return Object.keys(user).map((prop) => (
      <div key={prop} className="flex mb-3">
        <label
          htmlFor={prop}
          className="border border-gray-400 rounded rounded-r-none bg-zinc-300 p-1"
        >
          {icons[prop]}
        </label>
        {prop === "gender" ? (
          <div className="relative w-full">
            <button
              className="border border-gray-400 rounded rounded-l-none px-2 py-[0.44rem] w-full flex justify-between"
              onClick={() => toggleDropDown(prop)}
            >
              {getValue({ value: (user as any)[prop], language: language })}
              <ArrowDropDownRoundedIcon
                className={menus[prop] ? "rotate-180" : ""}
              />
            </button>
            {menus.gender &&
              renderMenus({
                key: prop,
                items: Array.from(
                  getGenders({ index: "", language: language })
                ),
              })}
          </div>
        ) : (
          <input
            type="text"
            className="border border-gray-400 rounded rounded-l-none w-full px-2"
            defaultValue={(user as any)[prop] ? (user as any)[prop] : ""}
            placeholder={placholder[prop]}
            onChange={(e) => handleUser(prop, e.target.value)}
          />
        )}
      </div>
    ));
  };

  const toggleDropDown = (menuType: string) => {
    setMenus((prevMenus) => ({
      ...prevMenus,
      gender: menuType === "gender" ? !prevMenus.gender : false,
    }));
  };

  return <>{renderForm()}</>;
};
