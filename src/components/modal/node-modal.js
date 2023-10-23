import React from "react";
import Modal from ".";
import { cls } from "../../utils/functions";

const NodeModal = ({ open, setOpen, children, header }) => {
  return (
    <Modal setOpen={setOpen} open={open} isNodeModal>
      <div
        className={cls(
          open ? "bottom-[5vh]" : "bottom-[-100vh]",
          "absolute duration-300 bg-white rounded-xl w-[95%] p-6 "
        )}
      >
        <div className="flex justify-between items-center mb-4">
          <p className="font-medium text-lg">{header}</p>
          <button onClick={() => setOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default NodeModal;
