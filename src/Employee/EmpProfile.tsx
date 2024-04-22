import { useEffect, useState } from "react";
import { EmpNavbar } from "./EmpNavbar";
import {
  EmpProfileProps,
  setEmpProfileDetailsByLang,
} from "../class/Employee/EmpProps";
import { handleProfile } from "../components/HandleUsers";
import { Modal, openModal } from "../components/HandleModals";

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
                      onClick={() => setIsOpen(openModal(document.body))}
                    >
                      Edit Profile
                    </button>
                    <Modal
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      body={document.body}
                      profile={myProfile}
                      title="My Profile"
                      language={language}
                    />
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
      )}
    </>
  );
};
