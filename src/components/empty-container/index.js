import React from "react";
import PrimaryButton from "../button/primary-button";

const EmptyContainer = ({ text, buttonText, onClick }) => {
  return (
    <div className="flex flex-col gap-4 items-center mt-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-[150px] h-[150px] text-[#B0C0EC]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>

      <p className="text-xl font-medium text-darkblue">
        Nothing to see here yet!
      </p>

      <p className="text-body max-w-[300px] text-center text-base">{text}</p>

      <PrimaryButton onClick={onClick}>{buttonText}</PrimaryButton>
    </div>
  );
};

export default EmptyContainer;
