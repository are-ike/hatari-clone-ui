import React, { useRef } from "react";
import { cls } from "../../utils/functions";

const Modal = ({
  open,
  setOpen,
  children,
  header,
  className,
  isNodeModal = false,
}) => {
  const underlay = useRef();

  return (
    <div
      ref={underlay}
      onClick={(e) => {
        if (e.target === underlay.current) {
          setOpen(false);
        }
      }}
      className={cls(
        "duration-200 z-[100] bg-darkblue bg-opacity-20 h-screen w-screen flex items-center justify-center fixed inset-0",
        !open && "opacity-0 pointer-events-none",
        isNodeModal && !open && "delay-[200ms]"
      )}
    >
      {!isNodeModal ? (
        <div className={cls("bg-white rounded-lg w-[370px] p-4", className)}>
          {header && (
            <div className="flex justify-between mb-4">
              <p className="font-medium text-lg">{header}</p>
              <button onClick={() => setOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Modal;
