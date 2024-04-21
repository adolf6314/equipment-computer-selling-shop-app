import { ReactNode } from "react";

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
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-50 bg-white w-[32rem] p-2 rounded">
        <div className="p-2 border border-black">{children}</div>
      </div>
    </div>
  );
};
