import { useEffect, useState } from "react";
import { EmpNavbar } from "./EmpNavbar";
import { handleProfile } from "../components/HandleUsers";
import { getEmpLabels } from "../class/User/Employee";
import { getValue } from "../class/User/User";
import { Modal } from "@mui/material";
import {
  ArrowDropDownRounded,
  CloseRounded,
  PersonRounded,
} from "@mui/icons-material";
import { buttonCLR } from "../class/Button";

export const EmpProfile = () => {
  const [language, setLanguage] = useState(
    `${localStorage.getItem("language")}`
  );
  const [myProfile, setMyProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState("");

  useEffect(() => {
    handleProfile({ setMyProfile });
  }, [setMyProfile]);

  const handleProfileDetails = () => {
    return Object.keys(myProfile!).map((label, index) => (
      <div key={index}>
        <div className="flex flex-col py-2 sm:flex-row">
          <div className="sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4">
            <p className="text-xl">
              {language !== "EN"
                ? getEmpLabels({ index: label, language: language })
                : label}
            </p>
          </div>
          <div className="sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4">
            <p className="text-lg text-gray-600">
              {getValue({
                value: (myProfile as any)[label],
                language: language,
              })}
            </p>
          </div>
        </div>
        <hr />
      </div>
    ));
  };

  const handleOpen = (index: string) => {
    setModal(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [menus, setMenus] = useState({
    gender: false,
    status: false,
  });

  const toggleDropdown = (menuType: string) => {
    setMenus((prevMenus) => ({
      ...prevMenus,
      gender: menuType === "gender" ? !prevMenus.gender : false,
      status: menuType === "status" ? !prevMenus.status : false,
    }));
  };

  return (
    <>
      <EmpNavbar language={language} setLanguage={setLanguage} />
      {myProfile && (
        <div className="mx-auto max-w-11xl px-2 mt-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mb-2">
              <div className="px-2">
                <div className="bg-white shadow-md rounded-md p-4 bg-clip-border whitespace-normal break-words">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/Deang.png`}
                      alt="Picture"
                      className="rounded"
                      width={200}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
              <div className="px-2">
                <div className="bg-white shadow-md rounded-md p-4 bg-clip-border whitespace-normal break-words">
                  {handleProfileDetails()}
                  <div className="flex pt-3 pb-2">
                    <button
                      className="bg-orange-400 hover:bg-orange-500 px-3 py-1 rounded mr-4"
                      onClick={() => handleOpen("profile")}
                    >
                      Edit Profile
                    </button>
                    <button
                      className="bg-orange-400 hover:bg-orange-500 px-3 py-1 rounded mr-4"
                      onClick={() => handleOpen("address")}
                    >
                      Change Address
                    </button>
                    <button
                      className="bg-orange-400 hover:bg-orange-500 px-3 py-1 rounded"
                      onClick={() => handleOpen("password")}
                    >
                      Change Password
                    </button>

                    <Modal open={open} onClose={handleClose}>
                      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                        <div className="fixed inset-0 transition-opacity">
                          <div className="absolute inset-0 bg-black opacity-50"></div>
                        </div>
                        <div className="relative z-50 bg-white w-[32rem] p-2 rounded">
                          <div className="p-2 border border-black">
                            <div className="flex justify-between">
                              <div className="font-bold text-xl">
                                {modal === "profile"
                                  ? "My Profile"
                                  : modal === "address"
                                  ? "My Address"
                                  : "Change Password"}
                              </div>
                              <button onClick={handleClose}>
                                <CloseRounded />
                              </button>
                            </div>
                            <hr className="border border-black mt-1 mb-3" />
                            <div key="test" className="flex mb-3">
                              <label
                                htmlFor="test"
                                className="border border-gray-400 rounded rounded-r-none bg-zinc-300 p-1"
                              >
                                TestDropdown
                              </label>
                              <div className="relative flex w-full">
                                <button
                                  className="border border-gray-400 rounded rounded-l-none px-2 py-[0.44rem] w-full flex justify-between"
                                  onClick={() => toggleDropdown("gender")}
                                >
                                  Powder
                                  <ArrowDropDownRounded
                                    className={menus.gender ? "rotate-180" : ""}
                                  />
                                </button>
                                {menus.gender && (
                                  <div className="absolute mt-1 p-1 theme-white w-full z-50">
                                    <div className="border border-black p-1">
                                      {["male", "female"].map(
                                        (value, index) => (
                                          <div key={index}>
                                            <button className="text-start w-full hover:bg-white">
                                              {value}
                                            </button>
                                            {value.length - 1 !== index ? (
                                              <hr className="my-1 border border-gray-600" />
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                                <button
                                  className="border border-gray-400 rounded rounded-l-none px-2 py-[0.44rem] w-full flex justify-between"
                                  onClick={() => toggleDropdown("gender")}
                                >
                                  Powder
                                  <ArrowDropDownRounded
                                    className={menus.gender ? "rotate-180" : ""}
                                  />
                                </button>
                                {menus.gender && (
                                  <div className="absolute mt-1 p-1 theme-white w-full z-50">
                                    <div className="border border-black p-1">
                                      {["male", "female"].map(
                                        (value, index) => (
                                          <div key={index}>
                                            <button className="text-start w-full hover:bg-white">
                                              {value}
                                            </button>
                                            {value.length - 1 !== index ? (
                                              <hr className="my-1 border border-gray-600" />
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <button
                              className={`${buttonCLR({
                                color: "Success",
                              })} mt-1 mb-3 w-full py-1`}
                            >
                              Confirm
                            </button>
                            <button
                              className={`${buttonCLR({
                                color: "Danger",
                              })} w-full py-1`}
                              onClick={handleClose}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
