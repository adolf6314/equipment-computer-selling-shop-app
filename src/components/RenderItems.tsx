import { Link } from "react-router-dom";
import { handleLogout } from "./HandleUsers";
import React from "react";

export type MenusState = {
  navMenu: boolean;
  profMenu: boolean;
  langMenu: boolean;
};

const handlePathSet = (index: number) => {
  localStorage.setItem("nav-item", String(index));
};

export const NavItem = ({
  classLink,
  itemCurrent,
  language,
}: {
  classLink: string;
  itemCurrent: number;
  language: string;
}) => {
  const navProps = {
    nPaths: ["profile", "profile", "profile", "profile"],
    nTextENs: ["Employee", "Product", "Payment", "Delivery"],
    nTextTHs: ["พนักงาน", "สินค้า", "การชำระเงิน", "การจัดส่ง"],
  };

  return (
    <>
      {navProps.nPaths.map((nPath, index) => (
        <Link
          key={index}
          to={`/eqmcpt/provider/${nPath}`}
          className={`${classLink} ${
            index === itemCurrent ? "item-current" : ""
          }`}
          onClick={() => handlePathSet(index)}
        >
          {language !== "EN"
            ? navProps.nTextTHs[index]
            : navProps.nTextENs[index]}
        </Link>
      ))}
    </>
  );
};

export const ProfileMenu = ({
  classLink,
  itemCurrent,
  language,
}: {
  classLink: string;
  itemCurrent: number;
  language: string;
}) => (
  <>
    <Link
      to="/eqmcpt/provider/profile"
      className={`${classLink} ${itemCurrent > 3 ? "item-current" : ""}`}
      onClick={() => handlePathSet(4)}
    >
      {language !== "EN" ? "ข้อมูลของฉัน" : "Profile"}
    </Link>
    <hr />
    <button className={`${classLink} w-full`} onClick={handleLogout}>
      {language !== "EN" ? "ออกจากระบบ" : "Logout"}
    </button>
  </>
);

export const LanguageMenu = ({
  classLink,
  language,
  setMenus,
  onLanguageChange,
}: {
  classLink: string;
  language: string;
  setMenus: React.Dispatch<React.SetStateAction<MenusState>>;
  onLanguageChange: (lang: string) => void;
}) => {
  const handleLangSet = (lang: string) => {
    if (language !== lang) {
      onLanguageChange(lang);
      localStorage.setItem("language", lang);
      setMenus((prevMenus) => ({
        ...prevMenus,
        langMenu: false,
      }));
    }
  };

  return (
    <>
      <button
        className={`${classLink} w-full`}
        onClick={() => handleLangSet("EN")}
      >
        EN
      </button>
      <hr />
      <button
        className={`${classLink} w-full`}
        onClick={() => handleLangSet("TH")}
      >
        TH
      </button>
    </>
  );
};

export const statusMenu = ({
  menus,
  toggleDropDown,
  prop,
  values,
  handleUser,
}: {
  menus: { [key: string]: boolean };
  toggleDropDown: (menuType: string) => void;
  prop: string;
  values: string[];
  handleUser: (prop: string, value: string) => void;
}) => {
  return menus[prop as keyof typeof menus] ? (
    <div className="absolute mt-1 p-1 theme-white w-full z-50">
      <div className="border border-black p-1">
        {values.map((value, index) => (
          <div key={index}>
            <button
              className="text-start w-full hover:bg-white"
              onClick={() => (
                <>
                  {toggleDropDown(prop)}
                  {handleUser(prop, value)}
                </>
              )}
            >
              {value}
            </button>
            {value.length - 1 !== index ? (
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
