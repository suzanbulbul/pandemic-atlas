import React from "react";
import cn from "classnames";

export const ModalVariant = {
  SUCCESS: {
    bgLight: "bg-green-100",
    bgColor: "bg-green-500",
  },
  WARNING: {
    bgLight: "bg-yellow-100",
    bgColor: "bg-yellow-500",
  },
  ERROR: {
    bgLight: "bg-red-100",
    bgColor: "bg-red-500",
  },
  DISABLED: {
    bgLight: "bg-gray-100",
    bgColor: "bg-gray-500",
  },
  DEFAULT: {
    bgLight: "bg-blue-100",
    bgColor: "bg-blue-500",
  },
};

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
  closeTitle: string;
  saveTitle: string;
  children: React.ReactNode;
  variant?: "SUCCESS" | "WARNING" | "ERROR" | "DEFAULT" | "DISABLED";
}

const Modal = ({
  show,
  onSave,
  onClose,
  icon,
  title,
  desc,
  closeTitle,
  saveTitle,
  children,
  variant = "DEFAULT",
}: ModalProps) => {
  if (!show) {
    return;
  }

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-fullsm:mx-0 sm:h-10 sm:w-10">
                  <div
                    className={cn(
                      "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10",
                      `${ModalVariant[variant].bgLight}`
                    )}
                  >
                    {icon}
                  </div>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center p-4">{children}</div>
            <div className="flex w-full gap-3 border-t px-5 py-4 ">
              <button
                onClick={onClose}
                className="mt-3  w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
              >
                {closeTitle}
              </button>
              <button
                type="submit"
                onClick={onSave}
                className={cn(
                  " w-full rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3",
                  `${ModalVariant[variant].bgColor}`
                )}
              >
                {saveTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
