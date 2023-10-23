import React from "react";
import Button from ".";
import { cls } from "../../utils/functions";

const PrimaryButton = ({ children, onClick, className, disabled }) => {
  return (
    <Button
      className={cls(
        "bg-primary text-white disabled:cursor-not-allowed disabled:bg-btnDisabled hover:bg-btnHover",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
