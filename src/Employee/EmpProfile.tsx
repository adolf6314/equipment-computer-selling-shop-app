import { useEffect, useState } from "react";
import { EmpNavbar } from "./EmpNavbar";
import { handleProfile } from "../components/HandleUsers";
import { getUserLabel } from "../components/labels/UserLabel";
import { getUserValue } from "../components/items_in_props/Values";
import { Modal } from "@mui/material";
import { ProfileForm } from "../components/forms/ProfileForm";
import {
  Address,
  Profile,
} from "../components/props/ProfileFormProps";
import { LoaderCircle } from "../class/Loader";

export const EmpProfile = () => {
  const [language, setLanguage] = useState(
    `${localStorage.getItem("language")}`
  );
  const [myProfile, setMyProfile] = useState<Profile | null>(null);
  const [myAddress, setMyAddress] = useState<Address | null>(null);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState("");

  useEffect(() => {
    handleProfile({ setMyProfile: setMyProfile, setMyAddress: setMyAddress });
  }, [setMyProfile, setMyAddress]);

  const handleProfileDetails = () => {
    return Object.keys(myProfile!).map((label, index) => (
      <div key={index}>
        <div className="flex flex-col py-2 sm:flex-row">
          <div className="sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4">
            <p className="text-xl">
              {language !== "EN" ? getUserLabel(label, language) : label}
            </p>
          </div>
          <div className="sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4">
            <p className="text-lg text-gray-600">
              {getUserValue((myProfile as any)[label], language)}
            </p>
          </div>
        </div>
        <hr />
      </div>
    ));
  };

  const handleOpen = (type: string) => {
    setModal(type);
    setOpen(true);
  };

  const handleClose = () => {
    setModal("");
    setOpen(false);
  };

  return (
    <>
      <EmpNavbar language={language} setLanguage={setLanguage} />
      {myProfile ? (
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
                        {modal !== "" && (
                          <div className="relative z-50 bg-white w-[32rem] p-2 rounded">
                            <div className="p-2 border border-black">
                              <div className="flex justify-between">
                                <div className="font-bold text-xl">
                                  {modal === "profile"
                                    ? { TH: "ข้อมูลของฉัน", EN: "My Profile" }[
                                        language
                                      ]
                                    : modal === "address"
                                    ? { TH: "ที่อยู่ของฉัน", EN: "My Address" }[
                                        language
                                      ]
                                    : {
                                        TH: "เปลี่ยนรหัสผ่าน",
                                        EN: "Change Password",
                                      }[language]}
                                </div>
                                <button onClick={handleClose}>
                                  <i className="fa-solid fa-xmark fa-lg"></i>
                                </button>
                              </div>
                              <hr className="border border-black mt-1 mb-3" />
                              <ProfileForm
                                propStyle={
                                  modal === "profile"
                                    ? [
                                        ["firstname", "lastname"],
                                        "email",
                                        "phone",
                                        "gender",
                                      ]
                                    : modal === "address"
                                    ? [
                                        "address",
                                        ["region", "province"],
                                        "district",
                                        "sub_district",
                                      ]
                                    : [
                                        "old_password",
                                        "new_password",
                                        "repeat_new_password",
                                      ]
                                }
                                properties={
                                  modal === "profile"
                                    ? myProfile!
                                    : modal === "address"
                                    ? myAddress!
                                    : {
                                        old_password: "",
                                        new_password: "",
                                        repeat_new_password: "",
                                      }
                                }
                                language={language}
                                handleClose={handleClose}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </Modal>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoaderCircle height="100vh" color="gray" />
      )}
    </>
  );
};
