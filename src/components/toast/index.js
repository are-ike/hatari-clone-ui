import React from "react";
import { cls } from "../../utils/functions";

export const types = {
  warn: "warn",
  error: "error",
  success: "success",
};

const Toast = ({ children, type }) => {
  return (
    <div
      // className={cls(
      //   " border-l-2",
      //   type === types.warn
      //     ? "border-[#F8CB2E]"
      //     : type === types.error
      //     ? "border-del"
      //     : "border-green"
      // )}
    >
      {children}
    </div>
  );
};

export default Toast;
