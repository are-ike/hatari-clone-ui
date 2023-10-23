import React from "react";
import { cls } from "../../utils/functions";

const Button = ({ children, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cls("h-12 px-6 font-medium rounded duration-300", className)}
    >
      {children}
    </button>
  );
};

export default Button;
