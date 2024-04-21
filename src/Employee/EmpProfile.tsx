import { useEffect, useState } from "react";
import { EmpNavbar } from "./EmpNavbar";
import { EmpProfileProps, setEmpProfileDetailsByLang } from "../class/Employee";
import { handleProfile } from "../components/HandleUsers";
import { Modal, closeModal, openModal } from "../components/HandleModals";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export const EmpProfile = () => {
  const [language, setLanguage] = useState(
    `${localStorage.getItem("language")}`
  );
  const [myProfile, setMyProfile] = useState<EmpProfileProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleProfile({ setMyProfile });
  }, [setMyProfile]);

  const handleProfileDetails = () => {
    const prof = myProfile
      ? setEmpProfileDetailsByLang(myProfile, language)
      : null;

    if (prof) {
      return Object.keys(prof).map((label, index) => (
        <div key={index}>
          <div className="flex flex-col py-2 sm:flex-row">
            <div className="sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4">
              <p className="text-xl">{label}</p>
            </div>
            <div className="sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4">
              <p className="text-lg text-gray-600">{(prof as any)[label]}</p>
            </div>
          </div>
          <hr />
        </div>
      ));
    }
  };

  return (
    <>
      <EmpNavbar language={language} setLanguage={setLanguage} />
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
                    onClick={() => setIsOpen(openModal(document.body))}
                  >
                    Edit Profile
                  </button>
                  <Modal isOpen={isOpen}>
                    <div className="flex justify-between">
                      <div className="text-start font-bold text-xl">
                        My Profile
                      </div>
                      <button
                        onClick={() => setIsOpen(closeModal(document.body))}
                      >
                        <CloseRoundedIcon />
                      </button>
                    </div>
                    <hr className="my-2 border border-black" />
                    <div className="flex mb-2">
                      <label
                        htmlFor="Firstname"
                        className="border border-cyan-950 bg-red-100 font-bold text-lg p-1 w-[30.2%] text-end"
                      >
                        Firstname
                      </label>
                      <input
                        type="text"
                        className="ml-1 pl-2 w-3/4 border border-cyan-950"
                      />
                    </div>
                    <div className="flex mb-2">
                      <label
                        htmlFor="Lastname"
                        className="border border-cyan-950 bg-red-100 font-bold text-lg p-1 w-[30.2%] text-end"
                      >
                        Lastname
                      </label>
                      <input
                        type="text"
                        className="ml-1 pl-2 w-3/4 border border-cyan-950"
                      />
                    </div>
                    <p>This is the content of the modal.</p>
                  </Modal>
                  <button className="bg-orange-400 hover:bg-orange-500 px-3 py-1 rounded mr-4">
                    Change Address
                  </button>
                  <button className="bg-orange-400 hover:bg-orange-500 px-3 py-1 rounded">
                    Change Password
                  </button>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
