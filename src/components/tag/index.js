import React from "react";
import { cls } from "../../utils/functions";

const Tag = ({ children, type, className }) => {
  return (
    <div
      className={cls(
        "rounded-[37px] px-4 py-1 w-fit bg-backg uppercase text-[10px]",
        !type ? "text-del" : "text-green", className
      )}
    >
      {children}
    </div>
  );
};

export default Tag;
