import React from "react";
import { cls } from "../../utils/functions";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cls("h-12 px-6 font-medium rounded", className)}
    >
      {children}
    </button>
  );
};

export default Button;
