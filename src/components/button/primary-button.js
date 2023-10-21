import React from "react";
import Button from ".";
import { cls } from "../../utils/functions";

const PrimaryButton = ({ children, onClick, className }) => {
  return (
    <Button
      className={cls("bg-primary text-white", className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
