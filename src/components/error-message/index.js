import React from "react";
import SecondaryButton from "../button/secondary-button";

const ErrorMessage = ({ message, refetch }) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[150px] h-[150px] text-del"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>

      <p className="text-xl font-medium text-darkblue">Something went wrong</p>
      <p className="text-body max-w-[300px] text-center text-base">{message}</p>
      <SecondaryButton onClick={refetch}>Try again</SecondaryButton>
    </div>
  );
};

export default ErrorMessage;
