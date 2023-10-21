import React, { useRef } from "react";

const Modal = ({ open, setOpen, children, header }) => {
  const underlay = useRef();
const me = 'i'
  return (
    open && (
      <div
        ref={underlay}
        onClick={(e) => {
          if (e.target === underlay.current) {
            setOpen(false);
          }
        }}
        className="bg-black bg-opacity-50 h-screen w-screen flex items-center justify-center fixed inset-0"
      >
        <div className="bg-white rounded-lg w-[370px] p-4">
          <div className="flex justify-between">
            <p>{header}</p>
            <button onClick={() => setOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
