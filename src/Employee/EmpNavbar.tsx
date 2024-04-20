import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import "../css/EmpNavbar.css";
import { useState } from "react";
import {
  LanguageMenu,
  MenusState,
  NavItem,
  ProfileMenu,
} from "../components/RenderItems";

export const EmpNavbar = ({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (lang: string) => void;
}) => {
  const [menus, setMenus] = useState<MenusState>({
    navMenu: false,
    profMenu: false,
    langMenu: false,
  });
  const itemCurrent = parseInt(localStorage.getItem("nav-item") ?? "0");
  const toggleMenu = (menuType: string) => {
    setMenus((prevMenus) => ({
      ...prevMenus,
      navMenu: menuType === "nav" ? !prevMenus.navMenu : false,
      profMenu: menuType === "prof" ? !prevMenus.profMenu : false,
      langMenu: menuType === "lang" ? !prevMenus.langMenu : false,
    }));
  };

  return (
    <>
      <nav className="bg-[#212529]">
        <div className="mx-auto max-w-11xl px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/eqmcpt/provider/dashboard" className="text-xl">
                <span className="text-white font-bold">EQMCPT-</span>
                <span className="text-[#00d9fa] italic">SHOP</span>
              </Link>
            </div>
            <div className="my-auto items-center">
              <div className="flex text-lg text-white">
                <div className="hidden md:block my-2">
                  <NavItem
                    classLink="nav-item"
                    itemCurrent={itemCurrent}
                    language={language}
                  />
                </div>
                <button onClick={() => toggleMenu("prof")}>
                  <PersonIcon
                    sx={{ fontSize: 40 }}
                    className="pt-1 pb-2 px-2 bg-black bg-opacity-15 rounded-md hover:bg-opacity-75 mt-[0.1rem] mr-3"
                  />
                </button>
                <button onClick={() => toggleMenu("lang")}>
                  <div className="py-[0.36rem] px-[0.6rem] bg-black bg-opacity-15 rounded-md hover:bg-opacity-75">
                    {language}
                  </div>
                </button>
                <div className="smc:hidden">
                  <button onClick={() => toggleMenu("nav")}>
                    <MenuIcon
                      sx={{ fontSize: 40 }}
                      className="pt-1 pb-2 px-2 ml-3 bg-black bg-opacity-15 rounded-md hover:bg-opacity-75"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="smc:hidden">
        {(menus.navMenu || menus.profMenu || menus.langMenu) && (
          <div className="mx-auto max-w-11xl px-2 sm:px-6 lg:px-8 bg-[#212529]">
            {menus.navMenu && (
              <NavItem
                classLink="dropd-item"
                itemCurrent={itemCurrent}
                language={language}
              />
            )}
            {menus.profMenu && (
              <ProfileMenu
                classLink="dropd-item text-start"
                itemCurrent={itemCurrent}
                language={language}
              />
            )}
            {menus.langMenu && (
              <LanguageMenu
                classLink="dropd-item text-start"
                language={language}
                setMenus={setMenus}
                onLanguageChange={setLanguage}
              />
            )}
          </div>
        )}
      </div>
      <div
        className={`hidden md:block absolute top-[3.55rem] ${
          menus.profMenu ? "w-[8rem] right-[5.42rem]" : "w-[4rem] right-[2rem]"
        }`}
      >
        {(menus.profMenu || menus.langMenu) && (
          <div className="bg-[#212529] rounded px-2 py-2">
            {menus.profMenu && (
              <ProfileMenu
                classLink="dropd-item text-center"
                itemCurrent={itemCurrent}
                language={language}
              />
            )}
            {menus.langMenu && (
              <LanguageMenu
                classLink="dropd-item"
                language={language}
                setMenus={setMenus}
                onLanguageChange={setLanguage}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
