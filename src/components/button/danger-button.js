import React from "react";
import Button from ".";
import { cls } from "../../utils/functions";

const DangerButton = ({ children, onClick, className, isLoading }) => {
  return (
    <Button
      className={cls(
        "bg-del text-white hover:bg-[#CA2C63] focus:ring-[#F678A4] focus:ring-1 ring-offset-1 disabled:bg-[#FCD7E4]",
        className
      )}
      onClick={onClick}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};

export default DangerButton;
