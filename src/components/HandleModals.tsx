import React, { useEffect, useRef } from "react";
import { GetInputRefsIndividual } from "../class/Employee/EmpHandleRefs";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { buttonCLR } from "../class/Button";

export const openModal = (body: HTMLElement) => {
  body.style.overflow = "hidden";
  return true;
};

export const closeModal = (body: HTMLElement) => {
  body.style.overflow = "auto";
  return false;
};

export const Modal = ({
  isOpen,
  setIsOpen,
  body,
  profile,
  title,
  language,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  body: HTMLElement;
  profile: any;
  title: string;
  language: string;
}) => {
  const inputRefs = useRef<{
    [key: string]: React.MutableRefObject<HTMLInputElement | null>;
  }>({});
  const keys = useRef<string[]>([]);

  useEffect(() => {
    keys.current = Object.keys(profile).filter(
      (item) => !["Role", "Address"].includes(item)
    );
    
    keys.current.forEach((prof) => {
      inputRefs.current[prof] = React.createRef<HTMLInputElement>();
    });
  }, [inputRefs, profile]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-50 bg-white w-[32rem] p-2 rounded">
        <div className="p-2 border border-black">
          <div className="flex justify-between">
            <div className="text-start font-bold text-xl">{title}</div>
            <button onClick={() => setIsOpen(closeModal(body))}>
              <CloseRoundedIcon />
            </button>
          </div>
          <hr className="border border-black mt-1 mb-3" />
          <GetInputRefsIndividual
            keys={keys.current}
            profile={profile}
            inputRef={inputRefs.current}
            language={language}
          />
          <button
            className={`${buttonCLR({
              color: "Success",
            })} mt-1 mb-3 w-full py-1`}
          >
            Confirm
          </button>
          <button
            className={`${buttonCLR({ color: "Danger" })} w-full py-1`}
            onClick={() => setIsOpen(closeModal(body))}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
