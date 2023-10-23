import React from "react";
import { cls } from "../../utils/functions";
import Button from ".";

const SecondaryButton = ({ children, onClick, className, disabled }) => {
  return (
    <Button
      className={cls(
        "bg-backg text-darkblue disabled:cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
